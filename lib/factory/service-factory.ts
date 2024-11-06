import { IFactory, Constructor } from "../factory";

export class ServiceFactory implements IFactory {
  public create(
    serviceConstructor: Constructor,
    dependencies: any[] = [],
  ): any {
    return new serviceConstructor(...dependencies);
  }
}
