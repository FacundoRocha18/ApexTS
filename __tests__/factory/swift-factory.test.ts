import "reflect-metadata";

import { SwiftApplication } from "@application";
import { SwiftFactory } from "@factory";

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
