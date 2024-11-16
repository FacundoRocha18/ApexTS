import { HttpMethods } from "../http";
import { Controller } from "../types";

export class Route {
  private handlers: { [key: string]: Controller } = {};

  constructor(private url: string) {}

  public addController(httpMethod: HttpMethods, controller: Controller): void {
    if (!httpMethod || !controller) {
      throw new Error("Invalid parameters: method and handler are required.");
    }

    this.handlers[httpMethod] = controller;
  }

  public getController(httpMethod: HttpMethods): Controller | undefined {
    return this.handlers[httpMethod];
  }

  public isUrlRegistered(url: string): boolean {
    const requestParts = url.split("/");
    const registeredParts = this.url.split("/");

    if (requestParts.length !== registeredParts.length) {
      return false;
    };

    return requestParts.every((part, index) => {
      const registeredPart = registeredParts[index];
      return registeredPart.startsWith(":") || registeredPart === part;
    });
  }

  public get URL(): string {
    return this.url;
  }
}
