const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();
const app = express()

const apiKey = process.env.API_KEY;
console.log(process.env)

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
//set template engine
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      res.render('index',{weather: weather, error:null})
      // if(weather.main == undefined){
      //   res.render('index', {weather: null, error: 'Error, please try again'});
      // } else {
      //   let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      //   res.render('index', {weather: weatherText, error: null});
      // }
    }
  });
})


app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
})
