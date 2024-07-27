//v7 imports
import todo from "./api/v1/controllers/user/routes"; 
/**
 *
 *
 * @export
 * @param {any} app
 */

export default function routes(app) {

  app.use("/api/v1/todo", todo);  





  return app;
}
