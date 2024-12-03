import "reflect-metadata";

import { ApexCore, ApexCoreApplication, ApexFactory } from "@core";

describe("ApexFactory", () => {
  let apexFactoryInstance: ApexFactory;
	let apexApplicationInstance: ApexCore;

  beforeEach(() => {
    apexFactoryInstance = new ApexFactory();

		apexApplicationInstance = apexFactoryInstance.create();
  });

  it("should return a valid SwiftApplication instance", () => {
    expect(apexApplicationInstance).toBeInstanceOf(ApexCoreApplication);
  });

  it("should return a valid SwiftApplication instance with the correct dependencies", () => {
    expect(apexApplicationInstance.router).toBeDefined();
  });
});
