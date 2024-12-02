import { Constructor } from '@factory';

export interface Factory {
  create(serviceConstructor: Constructor, dependencies: any[]): any;
}