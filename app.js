const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


mongoose.connect('mongodb://localhost:27017/easyBankArticleDB', { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = new mongoose.Schema({
    title: String,
    suptitle: String,
    text: String,
    image: String
});

const Article = mongoose.model('Article', articleSchema);

let article = new Article({

})

let articles = [{
        title: "Receive money in any currency with no fees",
        suptitle: "By Claire Robinson",
        text: "The world is getting smaller and we’re becoming more mobile. So why should you be forced to only receive money in a single …",
        image: "currency"
    },
    {
        title: "Receive money in any currency with no fees",
        suptitle: "By Claire Robinson",
        text: "The world is getting smaller and we’re becoming more mobile. So why should you be forced to only receive money in a single …",
        image: "restaurant"
    },
    {
        title: "Receive money in any currency with no fees",
        suptitle: "By Claire Robinson",
        text: "The world is getting smaller and we’re becoming more mobile. So why should you be forced to only receive money in a single …",
        image: "plane"
    },
    {
        title: "Receive money in any currency with no fees",
        suptitle: "By Claire Robinson",
        text: "The world is getting smaller and we’re becoming more mobile. So why should you be forced to only receive money in a single …",
        image: "plane"
    }
]

app.get('/', function(req, res) {
    res.render('index', { articles: articles })
})

app.get('/createArticle', function(req, res) {
    res.render('createArticle')
});

app.post('/createArticle', function(req, res) {
    let article = new Article({
        title: req.body.articleTitle,
        suptitle: req.body.articleSuptitle,
        text: req.body.articleText
    });
    article.save();
    res.redirect('/');
});


app.listen(3000, function() {
    console.log("Server is running on port 3000")
})