const { application } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const FactTemplate = require("./models/facts");

app.use(express.static("./public"));
app.use(bodyParser.json());

mongoose.connect(
    process.env.SAVEURL,
    
  
     { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }
  );


app.post("/submit-fact-api", (req, res) => {

var JokeSubmit = new FactTemplate({
    _id: new mongoose.Types.ObjectId(),
    fact: req.body.fact,
    source: req.body.source,
});

JokeSubmit.save().then(res => {
    console.log(res);
}).catch(err => console.log(err));

res.status(200).json({
   message: req.body
})
});

app.get("/random-fact-api", (req, res) => {
FactTemplate.countDocuments().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)
    FactTemplate.findOne().skip(random).exec(
      function (err, result) {
        console.log(result.fact) 

  
res.status(200).json({
fact: result.fact,
source: result.source
})
})
})
});

app.get("/submit-fact-api", (req, res) => {
  res.status(200).json({error: "Call this page with a POST method instead."})
  })

module.exports = app;