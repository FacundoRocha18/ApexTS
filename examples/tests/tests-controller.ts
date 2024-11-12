import { IHttpRequest, IHttpResponse } from "../../lib";

export const getTest = (req: IHttpRequest, res: IHttpResponse): void => {
  const { query } = req.queryParams || {};

  if (query === "ping") {
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(`Query: ${query} Response: pong`));
    return;
  }

  res.statusCode = 200;
  res.json("GET endpoint working");
};

export const postTest = (req: IHttpRequest, res: IHttpResponse) => {
  const body = req.body;

  res.statusCode = 201;
  res.json(body);
};

export const putTest = (req: IHttpRequest, res: IHttpResponse) => {
  const responseData = {
    message: "",
  };

  res.statusCode = 201;
  res.json(responseData);
};

export const deleteTest = (req: IHttpRequest, res: IHttpResponse) => {
  res.statusCode = 201;
  res.json({ message: "Deleted successfully." });
};

export const patchTest = (req: IHttpRequest, res: IHttpResponse) => {
  const responseData = {
    field1: "value1",
    field2: "value2",
    field3: "value3",
  };

  res.statusCode = 201;
  res.json(responseData);
};
