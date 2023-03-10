const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middelwares/errorMiddleware");
import path from "path";
import { fileURLToPath } from "url";

//routes path
const authRoutes = require("./routes/authRoutes");

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

//dotenv
dotenv.config();

//mongo connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

//listen server
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE} mode on port no ${PORT}`
  );
});
