const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const { query } = require("express");
const app= express();

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    var query=req.body.cityname;
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=27ebc3aa5cea326c9e9486343a429b6a&units=metric" ;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function (data){
           var weatherdata=JSON.parse(data);
           var temp=weatherdata.main.temp;
           var des=weatherdata.weather[0].description;
           res.write("<p>The weather is currently "+des+"</p>");
           res.write("<h1>The temperature is " +temp+" degress celcius.</h1>");
           var imgid=weatherdata.weather[0].icon;
           var imgurl="http://openweathermap.org/img/wn/"+imgid+"@2x.png";
           res.write("<img src="+imgurl+">");
        })

    })
});



app.listen(3000, function(){
    console.log("Server is running at port 3000");
});