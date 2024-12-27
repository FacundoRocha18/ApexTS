import "reflect-metadata";

import { ApexCore, ApexCoreApplication, ApexFactory } from "@core";

describe("ApexFactory", () => {
  let apexFactoryInstance: ApexFactory;
  let apexApplicationInstance: ApexCore;

  beforeEach(async () => {
    apexFactoryInstance = new ApexFactory();

    apexApplicationInstance = await apexFactoryInstance.initializeApplication({
			synchronize: false,
			entities: [],
			migrations: [],
			subscribers: [],
		});
  });

  it("should return a valid SwiftApplication instance", () => {
    expect(apexApplicationInstance).toBeInstanceOf(ApexCoreApplication);
  });

  it("should return a valid SwiftApplication instance with the correct dependencies", () => {
    expect(apexApplicationInstance.router).toBeDefined();
  });
});
