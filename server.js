require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/client");

const cors = require("cors");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

connectDB();

// Middleware
app.use(express.json()); // This is the body parser.
app.use(cors());

app.get("/", (req, res) => {
  res.send("JWT lecture");
});

// Routes
app.use("/user", authRoute);
app.use("/posts", postRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
