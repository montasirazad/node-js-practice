/** --------------Middleware--------------
 *
 * Middleware: Functions that have access to req & res object and next function
 * Middleware can do
 * 1. Execute any code.
 * 2. can change req and res object.
 * 3. can end request/response cycle.
 * 4. call next middleware by next()
 * 5. throw & catch errors.
 *
 * Types of middleware =>
 *   1. application level middleware
 *   2. router level middleware.
 *   3. error-handling middleware.
 *   4. built in middleware.
 *   5. third-party middleware.
 */

const express = require("express");
const app = express();
const port = 5000;

const logger = (req, res, next) => {
  console.log(
    `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`,
  );
  next();
  // if anything is put in next() it would be considered as error message. Ex: next('There is an error')
};

app.use(logger);
app.get("/about", (req, res) => {
  res.send("About page");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
