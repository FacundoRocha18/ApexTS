import { IHttpRequest, IHttpResponse } from "../../lib";

export const patchTest = (req: IHttpRequest, res: IHttpResponse) => {
  const responseData = {
    field1: "value1",
    field2: "value2",
    field3: "value3",
  };

  res.statusCode = 201;
  res.json(responseData);
};
