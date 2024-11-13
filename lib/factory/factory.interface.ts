export interface IFactory {
  create(serviceConstructor: Constructor, dependencies: any[]): any;
}

export type Constructor = new (...args: any[]) => any;
