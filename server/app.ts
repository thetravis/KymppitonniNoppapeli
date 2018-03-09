import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as dotenv from "dotenv";
import * as path from "path";
import * as request from "request";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use((req, res, next) => {
  // default handler for the requests 
  next();
});

app.use(
  express.static(path.join(__dirname, "../client/"), { maxAge: 31557600000 })
);


export default app;