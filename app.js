///jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static("public"));
//home route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }

    }]

  };
  var jsonData = JSON.stringify(data);

  const url = "https:us14.api.mailchimp.com/3.0/lists/0867fe9a60"
  //  const url ="https:mandrillapp.com/api/1.0/lists/0867fe9a60"   //https:mandrillapp.com/api/1.0/lists/0867fe9a60
  const options = {
    method: "POST",
    auth: "Mayur:4214f4a36b722e652a689384a5b8901d-us14"
  }

  // request(options, function(error, response, body) {
  //   if (error) {
  //     res.send("There was an error");
  //   } else {
  //     if (response.statusCode === 200) {
  //       res.send("Successfully subscribed!1");
  //     } else {
  //       res.send("There was an error!");
  //     }
  //   }
  // });

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/succes.html");


    } else {
      res.sendFile(__dirname + "/failure.html");

    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));

    });
  });
  request.write(jsonData);

  request.end();



});

app.post("/failure", function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});

///API key
///4214f4a36b722e652a689384a5b8901d-us14
//Audeence // list ID
///0867fe9a60.
/////"https://us14.api.mailchimp.com/3.0/ping/lists/0867fe9a60"
