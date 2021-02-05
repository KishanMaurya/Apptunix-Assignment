const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { readdirSync } = require("fs");
const flash= require('express-flash') 
const session = require('express-session')
require("dotenv").config();
const path = require("path")
// const __dirname = path.resolve();

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

//session
app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave:false,
  saveUninitialized:false,
}))
app.use(flash())

// middlewares


app.use(express.static('public'))
app.use(bodyParser.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('views',path.join(__dirname , '/resources/views'))
app.set('view engine' , 'ejs')
// routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})