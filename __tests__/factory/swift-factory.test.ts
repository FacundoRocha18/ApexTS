import "reflect-metadata";

import { SwiftFactory } from "../../src";
import { SwiftApplication } from "../../src/application/swift-application";

describe("Swift Factory", () => {
  let swiftFactory: SwiftFactory;

  beforeEach(() => {
    swiftFactory = new SwiftFactory();
  });

  it("should return a valid SwiftApplication instance", () => {
    const swiftApplication = swiftFactory.create();

    expect(swiftApplication).toBeInstanceOf(SwiftApplication);
  });

  it("should return a valid SwiftApplication instance with the correct dependencies", () => {
    const swiftApplication = swiftFactory.create();

    expect(swiftApplication.router).toBeDefined();
  });
});
