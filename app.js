const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set(express.static('public'));
app.set("view engine", "ejs");


app.listen(3000, function() {
    console.log("Server is running on port 3000")
})