//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


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

let posts = [];


app.get("/", function (req, res) {

  Posts = posts;
  res.render("home");

});

app.get("/contact", function (req, res) {

  Contactcontent = contactContent;
  res.render("contact");

});

app.get("/about", function (req, res) {

  Aboutcontent = aboutContent;
  res.render("about");

});


app.get("/compose", function (req, res) {

  res.render("compose");

});



app.get('/posts/:postname', function (req, res) {

  const requestPost = _.lowerCase(req.params.postname);

  posts.forEach(post => {
    const storedtitle = _.lowerCase(post.title);

    if (requestPost === storedtitle) {
      titlePost = post.title;
      pagePost = post.content;

      res.render("post");
    }
  })
});

app.post("/compose", function (req, res) {



  const post = {
    title: req.body.Titlecontent,
    content: req.body.Postcontent
  };

  posts.push(post);
  res.redirect("/");

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});