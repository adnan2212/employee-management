const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const root = require("./routes/root");
const register = require("./routes/register");
const auth = require("./routes/auth");
const refresh = require("./routes/refresh");
const logout = require("./routes/logout");
const employees = require("./routes/api/employees");
const PORT = process.env.PORT || 3000;

//custom middleware logger
app.use(logger);

//Handle options credentials check - before CORS!
//and fetch cookies credentials requirement
app.use(credentials);

//cross origin resource sharing
app.use(cors());

//built-in middleware to handle urlencoded data
//in other words, form data:
//"content-type: application/x-ww-form-urlencoded"
app.use(express.urlencoded({ extended: false }));

//built-in middleware to handle json data
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", root);
app.use("/register", register);
app.use("/auth", auth);
app.use("/refresh", refresh);
app.use("/logout", logout);

app.use(verifyJWT);
app.use("/employees", employees);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not Found" });
  } else {
    res.type("txt").send("404 not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
