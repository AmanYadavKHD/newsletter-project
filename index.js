

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    const firstName = req.body.first;
    const lastName = req.body.second;
    const email = req.body.third;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }


            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/2b7bd8426c";

const options = {
    method: "POST",
    auth: "aman:c39772da0c48e88e648edd3ab7de720f-us21"
}

const request = https.request(url, options, function (response) {
    if(response.statusCode==200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
        console.log(JSON.parse(data));
    })

})

app.post("/failure",function(req,res){
    res.redirect("/")
})


request.write(jsonData);
request.end();


});
app.listen(process.env.PORT|| 3000, function () {
    console.log("Server is running on the port.")
});

//api key
//c39772da0c48e88e648edd3ab7de720f-us21

//list id
//2b7bd8426c