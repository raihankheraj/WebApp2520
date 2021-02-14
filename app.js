/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs");


let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//pass temp database to home page
app.get("/", (req, res) => res.render("pages/index", {data: ""}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here 
  let values = req.body;
  let data = values.movies.split(",");
  res.render("pages/index", {data: data});
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here

  let data = [];
  data.push(req.query.movie1);
  data.push(req.query.movie2);

  res.render("pages/index", {data: data});
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let searchMovie = req.params.movieName;

  fs.readFile("movieDescriptions.txt", "UTF-8", (err, data) => {
    if(err) {
      console.log(err);
      return;
    }else {
        let tokens = data.split("\n");
        for (const movie of tokens) {
          let sections = movie.split(":");
          
          if(searchMovie == sections[0]) {
            res.render("pages/searchResult", {data: sections});
            return;
          }
        }
        res.render("pages/searchResult", {data: ""});
    }
  })

});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});