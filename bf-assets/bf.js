var lat = -37.803193437556054; //latitude and longitude set to Arts House Nth Melbourne
var long = 144.94984320919224;
var timemoji = document.getElementById('timemoji');
var timepar = document.getElementById('texttime');
var date = new Date(); 
var roomoffset = -600; 
// var newoffset; 
var newhours; 
var suntimes = SunCalc.getTimes(date, lat, long);
var currentMoonEmoji;
var htmoon = document.getElementById('moonmoji');

const weather = fetch('https://api.openweathermap.org/data/2.5/weather?lat=-37.803193437556054&lon=144.94984320919224&appid=cbbd43ae50e58b735aaa5e361b1f3405').then(function(resp) { return resp.json() }) // using Open Weather API to get weather data for Arts House GPS coords, then convert data to json
.then(function(data) {
console.log(data); //JSON object data is shown in the console
drawWeather(data); // calling drawWeather function on the JSON object
}); 

function drawWeather(d) { //using current date and time to find the current temperature
var celcius = Math.round(parseFloat(d.main.temp)-273.15); // weather info is converted to Celcius
var celciusmax = Math.round(parseFloat(d.main.temp_max)-273.15);
}; 

let celestialEmojis = {
    "sun": "☀️",
    "sunRiseSunSet": "&#x1F305;",
    "newMoon": "&#x1f311;",
    "waxingCrescentMoon": "&#x1f312;",
    "firstquarterMoon": "&#x1f313;",
    "waxingGibbousMoon": "&#x1f314;",
    "fullMoon": "&#x1f315;",
    "waningGibbousMoon": "&#x1f316;",
    "lastquarterMoon": "&#x1f317;",
    "waningCrescentMoon": "&#x1f318;",
  }

var moontimes = SunCalc.getMoonIllumination(date, lat, long);
var phase = moontimes.phase; 
phase = Math.round(phase * 100);

var htmoon = document.getElementById('moonmoji');
// I made an object to refer to the emojis as I'm using them for the timeline too
if (phase == 0) { currentMoonEmoji = celestialEmojis.newMoon;}; 
if (phase > 0 && phase < 25) { currentMoonEmoji = celestialEmojis.waxingCrescentMoon;};
if (phase == 25) { currentMoonEmoji = celestialEmojis.firstquarterMoon;};
if (phase > 25 && phase < 50) { currentMoonEmoji = celestialEmojis.waxingGibbousMoon;};
if (phase == 50) { currentMoonEmoji = celestialEmojis.fullMoon;};
if (phase > 50 && phase < 75) { currentMoonEmoji = celestialEmojis.waningGibbousMoon;};
if (phase == 75) { currentMoonEmoji = celestialEmojis.lastquarterMoon;};
if (phase > 75) { currentMoonEmoji = celestialEmojis.waningCrescentMoon;};

htmoon.innerHTML = currentMoonEmoji;

function tz () {
  if (date.getTimezoneOffset() != roomoffset) {
  newhours = date.getUTCHours() + 10; //evaluating times in UTC then adding 10 hours for UTC+10/AEST; won't need daylight savings time for the time window room2 is running
  checknum(newhours); 
  date.setHours(newhours); 
  console.log(date.getHours()); 
  sunrise (); 
} else {
  sunrise (); 
}

}

tz(); 

function sunrise () {
  var sunrisetime = suntimes.sunrise;
  var sunrisehours = checknum (sunrisetime.getUTCHours() + 10); 
  var sunrisemins = sunrisetime.getUTCMinutes();
  document.getElementById('timepar').innerHTML = sunrisehours + ":" + sunrisemins; 
  // console.log(sunrisetime);

}

//checking whether hours evaluations are above 24, if so removing 24 to get their AM time value in hours
function checknum (num) {
  if (num > 24) {
    num = num - 24; 
  } else {
    num = num; 
  }
  return num
}

