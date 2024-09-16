const express = require("express");
const cors = require("cors");
const path = require("path");
const hbs = require("hbs");

const bodyParser = require("body-parser"); //parse the req.body.parameter or parse the incoming request
const sellerRouter = require("./routes/seller.route");
const commonRouter = require("./routes/common.route");
const userRouter = require("./routes/user.route");
const buyerRouter=require("./routes/buyer.route");
const port = 9000;
const app = express();

app.use(cors({ origin: "*" }));
//set view-engine
app.set("view-engine", "hbs");
app.set("views", "views");

const dbConnect = require("./db/dbConnect");
dbConnect();

// parse incoming body data in the form of application/json
app.use(bodyParser.json());


//common router endpoint
app.use("/common", commonRouter);

//Seller router endpoint
app.use("/seller", sellerRouter);

//user router endpoint
app.use("/user", userRouter);

//buyer router endpoint
app.use("/buyer", buyerRouter);


app.listen(port, function () {
  console.log(`listening on port http://localhost:${port}`);
});
