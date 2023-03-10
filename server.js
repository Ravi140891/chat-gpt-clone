const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoute");
const errorHandler = require("./middlewares/errorMiddleware");

dotenv.config();

//mongo connection

connectDb();

const app = express();

//middlewares

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//API Routes

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
