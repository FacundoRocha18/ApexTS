import { IRouter } from "../../lib/router";
import {
  getTestController,
  postTestController,
  putTestController,
  deleteTestController,
  patchTestController,
} from "../tests/tests-controller";

export const testsRoutes = (router: IRouter) => {
  router.get("/get-test", getTestController);

  router.post("/post-test", postTestController);

  router.put("/put-test", putTestController);

  router.del("/delete-test", deleteTestController);

  router.patch("/patch-test", patchTestController);
};
