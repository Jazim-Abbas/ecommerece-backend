const cors = require("cors");
const config = require("config");
const express = require("express");
const fs = require("fs");
require("express-async-errors");
const { graphqlUploadExpress } = require("graphql-upload");
const dbConnect = require("./db/connect");
const allRoutes = require("./routes");
const graphqlRoute = require("./graphql");
const catchUnhandleExceptions = require("./middlewares/exception-handling");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.static("uploads"));
app.use(express.json());
app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }),
  graphqlRoute
);
app.use("/", allRoutes);
app.use(catchUnhandleExceptions);

async function bootstrap() {
  console.log("Please wait for the server and db to run");

  try {
    if (!fs.existsSync("./uploads")) {
      console.log("upload dir not exists");
      fs.mkdirSync("./uploads");
    }

    await dbConnect();

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`App is listening on the port ${PORT}...`);
    });
  } catch (err) {
    console.log("Some error while bootstrap the app ...", err);
  }
}

bootstrap();
