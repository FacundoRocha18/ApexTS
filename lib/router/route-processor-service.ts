import { IRouteProcessorService, IRouter, Router } from "../router";
import { IHttpRequest, IHttpResponse } from "../types";
import { IParserService, ParserService } from "../parser";
import { inject, injectable } from "tsyringe";

@injectable()
export class RouteProcessorService implements IRouteProcessorService {
  constructor(
    @inject(Router) private router: IRouter,
    @inject(ParserService) private parserService: IParserService,
  ) {}

  private ensureIsValidUrl(url: string) {
    if (url !== undefined || url !== "" || url !== null) {
      return true;
    }
  }

  private ensureIsValidMethod(method: string) {
    if (method !== undefined || method !== "" || method !== null) {
      return true;
    }
  }

  public processRoute(
    req: IHttpRequest,
    res: IHttpResponse,
    url: string,
    method: string,
  ): void {
    if (!this.ensureIsValidUrl(url)) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.write("Error: Invalid URL");
      res.end();
      return;
    }

    if (!this.ensureIsValidMethod(method)) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.write("Error: Invalid Method");
      res.end();
      return;
    }

    if (method !== "POST" && method !== "PUT") {
      this.router.resolveRoute(req, res, url, method);
      return;
    }

    this.parserService.convertRequestBodyToJson({
      req,
      res,
      path: url,
      method,
      callback: () => this.router.resolveRoute(req, res, url, method),
    });
  }
}
