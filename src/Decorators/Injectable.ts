 
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import "reflect-metadata";

export function Injectable(): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata("isInjectable", true, target);
  };
}
