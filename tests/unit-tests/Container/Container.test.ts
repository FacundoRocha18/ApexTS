import "reflect-metadata";

import { Container } from "../../../src/Container/Container";
import { Lifecycle } from "../../../src/types";
import { Injectable } from "../../../src/Decorators/Injectable";

interface ITestService {}

interface IDependentService {}

interface IInvalidTokenService {}

@Injectable()
class TestService implements ITestService {
  constructor() {}
}

@Injectable()
class DependentService implements IDependentService {
  constructor(public testService: ITestService) {}
}

describe("Container", () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it("should register a service", () => {
    container.register<ITestService>(
      "TestService",
      TestService,
      Lifecycle.Singleton,
    );
    const service: ITestService =
      container.resolve<ITestService>("TestService");

    expect(service).toBeInstanceOf(TestService);
  });

  it("should resolve a service with dependencies", () => {
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

  it("should return the same instance for singleton services", () => {
    container.register("TestService", TestService, Lifecycle.Singleton);

    const instance1 = container.resolve<TestService>("TestService");
    const instance2 = container.resolve<TestService>("TestService");

    expect(instance1).toBe(instance2);
  });

  it("should throw an error if service is not registered", () => {
    expect(() => container.resolve("NonExistentService")).toThrow(
      "Service 'NonExistentService' not registered in the container.",
    );
  });

  it("should throw an error for invalid tokens", () => {
    @Injectable()
    class InvalidTokenService implements IInvalidTokenService {
      constructor() {}
    }

    container.register<IInvalidTokenService>(
      "InvalidTokenService",
      InvalidTokenService,
      Lifecycle.Singleton,
    );

    Reflect.defineMetadata("design:paramtypes", null, InvalidTokenService);

    const service: IInvalidTokenService =
      container.resolve<IInvalidTokenService>("InvalidTokenService");

    expect(service).toThrow("Invalid token");
  });
});
