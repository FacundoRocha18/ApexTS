import { container } from "tsyringe";
import { DatabaseService } from "@database";

export function InjectRepository(entity: any) {
  return function (target: any, propertyKey: string | symbol) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        const databaseService: DatabaseService = container.resolve(DatabaseService);

        if (!databaseService.getDataSource().isInitialized) {
          throw new Error("Database not initialized. Call the 'initialize' method first.");
        }

        return databaseService.getDataSource().getRepository(entity);
      },
      enumerable: true,
      configurable: true,
    });
  };
}
