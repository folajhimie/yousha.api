const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./src/routes/register");
const login = require("./src/routes/login");
const orders = require("./src/routes/orders");
const account = require("./src/routes/account")

const productsRoute = require("./src/routes/products");

// const products = require("./products");

const app = express();

require("dotenv").config();

app.use(express.json());

const corsOptions = {
  origin: '*',
  credentials: true
}
app.use(cors(corsOptions));
// app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/orders", orders);
app.use("/api/accounts", account);
app.use("/api/products", productsRoute);

app.get("/", (req, res) => {
  res.send("Welcome our to Yousha...");
});

// app.get("/products", (req, res) => {
//   res.send(products);
// });

const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

// npm install -g node@16.20.1
// npm install -g node@16.16.0

mongoose
  .connect(uri, { retryWrites: true, w: 'majority' })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
