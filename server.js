import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import cors from "cors";
import articleRoutes from "./routes/articleRoutes.js";
import bodyParser from "body-parser";

const app = express();
app.set("view engine", "ejs");
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/", articleRoutes);

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("server is started");
}
main().catch((err) => console.log("connection error: " + err));

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
