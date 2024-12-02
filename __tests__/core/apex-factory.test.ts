import "reflect-metadata";

import { ConcreteApexCore, ApexFactory } from "@core";

describe("ApexFactory", () => {
  let apexFactoryInstance: ApexFactory;

  beforeEach(() => {
    apexFactoryInstance = new ApexFactory();
  });

  it("should return a valid SwiftApplication instance", () => {
    const apexInstance = apexFactoryInstance.create();

    expect(apexInstance).toBeInstanceOf(ConcreteApexCore);
  });

  it("should return a valid SwiftApplication instance with the correct dependencies", () => {
    const apexInstance = apexFactoryInstance.create();

    expect(apexInstance.router).toBeDefined();
  });
});
