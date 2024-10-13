import "reflect-metadata";

import { Container } from "../../../src/di/Container";
import { Lifecycle } from "../../../src/types";

class TestService {
  constructor(public value: string) {}
}

class DependentService {
  constructor(public testService: TestService) {}
}

describe("Container", () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  test("should register a service", () => {
    container.register("TestService", TestService);
    const service = container.resolve<TestService>("TestService");

    expect(service).toBeInstanceOf(TestService);
  });

  test("should resolve a service with dependencies", () => {
    container.register("TestService", TestService);

    Reflect.defineMetadata(
      "design:paramtypes",
      [TestService],
      DependentService,
    );
    container.register("DependentService", DependentService);

    const service = container.resolve<DependentService>("DependentService");

    expect(service).toBeInstanceOf(DependentService);
    expect(service.testService).toBeInstanceOf(TestService);
  });

  test("should return the same instance for singleton services", () => {
    container.register("TestService", TestService, Lifecycle.Singleton);

    const instance1 = container.resolve<TestService>("TestService");
    const instance2 = container.resolve<TestService>("TestService");

    expect(instance1).toBe(instance2);
  });

  test("should throw an error if service is not registered", () => {
    expect(() => container.resolve("NonExistentService")).toThrow(
      "Service 'NonExistentService' not registered in the container.",
    );
  });

  test("should throw an error for invalid tokens", () => {
    class InvalidTokenService {
      constructor(public value: string) {}
    }

    container.register("InvalidTokenService", InvalidTokenService);
    container.register("String", String);

    Reflect.defineMetadata("design:paramtypes", "fail", InvalidTokenService);

    expect(() => container.resolve("InvalidTokenService")).toThrow(
      "Invalid token",
    );
  });
});
