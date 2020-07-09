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

let defaultArticles = [{
        title: "Receive money in any currency with no fees",
        suptitle: "By Claire Robinson",
        text: "The world is getting smaller and we’re becoming more mobile. So why should you be forced to only receive money in a single",
        image: "currency"
    },
    {
        title: "Treat yourself without worrying about money",
        suptitle: "By Wilson Hutton",
        text: "Our simple budgeting feature allows you to separate out your spending and set realistic limits each month. That means you",
        image: "restaurant"
    },
    {
        title: "Take your Easybank card wherever you go",
        suptitle: "By Wilson Hutton",
        text: "We want you to enjoy your travels. This is why we don\'t charge any fees on purchases while you\' re abroad.We\'ll even show you",
        image: "plane"
    },
    {
        title: "Our invite-only Beta accounts are now live!",
        suptitle: "By Claire Robinson",
        text: "After a lot of hard work by the whole team, we’re excited to launch our closed beta. It’s easy to request an invite through the site",
        image: "confetti"
    }
]

app.get('/', function(req, res) {
    Article.find({}, function(err, articles) {
        if (articles.length === 0) {
            Article.insertMany(defaultArticles, function(err) {
                if (!err) {
                    console.log("Succesfully inserted default articles");
                    res.redirect('/')
                } else {
                    console.log(err);
                }
            })
        } else {
            res.render('index', { articles: articles })
        }
    })
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

app.get('/articles/:articleId', function(req, res) {
    let articleId = req.params.articleId;
    Article.findById(articleId, function(err, article) {
        console.log(article)
        if (!err) {
            res.render('articles', { article: article })
        }
    })

});

// app.get('/articles', function(req, res) {
//     res.render('articles')
// })


app.listen(3000, function() {
    console.log("Server is running on port 3000")
})