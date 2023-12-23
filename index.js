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

const allowedOrigins = ['http://127.0.0.1:4050', 'https://youshacoin.netlify.app', '*'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  optionsSuccessStatus: 200,
  allowedHeaders: 'Content-Type, Authorization', // Add any custom headers you want to allow
}));


// const corsOptions = {
//   origin: '*',
//   credentials: true
// }
// app.use(cors(corsOptions));
// app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/orders", orders);
app.use("/api/accounts", account);
app.use("/api/products", productsRoute);

app.get("/", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  res.send("Welcome our to Yousha...");
});


// app.get("/products", (req, res) => {
//   res.send(products);
// });

const uri = process.env.DB_URI;
const port = process.env.PORT || 7275;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

// npm install -g node@16.20.1
// npm install -g node@16.16.0

mongoose
  .connect(uri, { retryWrites: true, w: 'majority' })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
