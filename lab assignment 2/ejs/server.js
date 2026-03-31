const express=require("express");
const app=express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", function (req, res) {
  
  return res.render("index");
});

app.listen(3000, function () {
  console.log("Server Started at localhost:3000");
});
