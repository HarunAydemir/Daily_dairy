//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. " +
  "Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum" +
  " lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra" +
  " justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique." +
  " Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1/blogDB");

const postschema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postschema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      posts: posts
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.Titlecontent,
    content: req.body.Postcontent
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get('/posts/:postId', function (req, res) {

  const requestPostId = req.params.postId;

  Post.findOne({
    _id: requestPostId
  }, function (err, post) {
    res.render("post", {
      titlePost: post.title,
      pagePost: post.content
    });
  });
});

app.get("/contact", function (req, res) {

  Contactcontent = contactContent;
  res.render("contact");

});

app.get("/about", function (req, res) {

  Aboutcontent = aboutContent;
  res.render("about");

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});