import * as http from "http";
import { Framework } from "../../src/Framework";
import { Handler, Lifecycle } from "../../src/types";
import { IContainer } from "../../src/Interfaces/Container.interface";
import { Container } from "../../src/Container/Container";
import { IFramework } from "../../src/Interfaces/Framework.interface";
import { IRouter } from "../../src/Interfaces/Router.interface";
import { IParserService } from "../../src/Interfaces/ParserService.interface";
import { Injectable } from "../../src/Decorators/Injectable";

jest.mock("../../src/Routing/Router.ts");
jest.mock("../../src/Parsing/Parser.ts");

describe("Tests for FastFramework", () => {
  let container: IContainer;
  let fastFrameworkInstance: IFramework;
  let serverMock: { listen: jest.Mock };
  let handler: Handler;

  const path = "/users";

  @Injectable()
  class parserMock implements IParserService {
    parse = jest.fn();
  }

  @Injectable()
  class routerMock implements IRouter {
    public use = jest.fn();
    public get = jest.fn();
    public post = jest.fn();
    public del = jest.fn();
    public put = jest.fn();
    public patch = jest.fn();
    public handleRequest = jest.fn();
  }

  beforeEach(() => {
    container = new Container();

    container.register<IParserService>("Parser", parserMock, Lifecycle.Singleton);
    container.register<IRouter>("Router", routerMock, Lifecycle.Singleton);
    container.register<IFramework>("Framework", Framework, Lifecycle.Singleton);

    container.resolve<IParserService>("Parser");
    container.resolve<IRouter>("Router");
    fastFrameworkInstance = container.resolve<IFramework>("Framework");

    serverMock = {
      listen: jest.fn(),
    };

    jest
      .spyOn(http, "createServer")
      .mockReturnValue(serverMock as unknown as http.Server);
  });

  it("Should be an instance of FastFramework", () => {
    expect(fastFrameworkInstance).toBeInstanceOf(Framework);
  });

  it("Should initialize with the provided Router", () => {
    expect(fastFrameworkInstance["router"]).toBe(routerMock);
  });

  it("Should have a get method", () => {
    expect(fastFrameworkInstance.get).toBeDefined();
  });

  it("Should have a post method", () => {
    expect(fastFrameworkInstance.post).toBeDefined();
  });

  it("Should have a delete method", () => {
    expect(fastFrameworkInstance.del).toBeDefined();
  });

  it("Should have a put method", () => {
    expect(fastFrameworkInstance.put).toBeDefined();
  });

  it("Should have a patch method", () => {
    expect(fastFrameworkInstance.patch).toBeDefined();
  });

  it("Should have a listen method", () => {
    expect(fastFrameworkInstance.listen).toBeDefined();
  });

  /* it("Should call router.get method with correct arguments", () => {
		fastFrameworkInstance.get(path, handler);

		expect(routerMock.).toHaveBeenCalledWith(path, handler);
		expect(routerMock.get).toHaveBeenCalledTimes(1);
	});

	it("Should call router.post method with correct arguments", () => {
		fastFrameworkInstance.post(path, handler);

		expect(routerMock.post).toHaveBeenCalledWith(path, handler);
		expect(routerMock.post).toHaveBeenCalledTimes(1);
	});

	it("Should call router.delete method with correct arguments", () => {
		fastFrameworkInstance.del(path, handler);

		expect(routerMock.del).toHaveBeenCalledWith(path, handler);
		expect(routerMock.del).toHaveBeenCalledTimes(1);
	});

	it("Should call router.put method with correct arguments", () => {
		fastFrameworkInstance.put(path, handler);

		expect(routerMock.put).toHaveBeenCalledWith(path, handler);
		expect(routerMock.put).toHaveBeenCalledTimes(1);
	});

	it("Should call router.patch method with correct arguments", () => {
		fastFrameworkInstance.patch(path, handler);

		expect(routerMock.patch).toHaveBeenCalledWith(path, handler);
		expect(routerMock.patch).toHaveBeenCalledTimes(1);
	});

	it("Should create an HTTP server and listen on the specified port", () => {
		const port = 3000;
		const reqMock = {};
		const resMock = {};

		fastFrameworkInstance.listen(port);

		expect(http.createServer).toHaveBeenCalledTimes(1);

		expect(serverMock.listen).toHaveBeenCalledWith(port);

		const createServerCallback = (http.createServer as jest.Mock).mock
			.calls[0][0];

		createServerCallback(reqMock, resMock);

		expect(routerMock.handleRequest).toHaveBeenCalledWith(reqMock, resMock);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	}); */
});
