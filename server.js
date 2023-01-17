require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

const url = "mongodb://localhost/pizza";
 const flash = require("express-flash");
const session = require("express-session");
const MongoDbStore = require("connect-mongo")(session);
//app.use(express.json());
mongoose.set("strictQuery", false);
mongoose.connect(url, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .on("error", function (err) {
    console.log("connection failed");
  });

let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});


app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 15 },
  })
);

app.use(express.static("public"));

app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(3000, () => {
  console.log("Listening on 3000");
});
