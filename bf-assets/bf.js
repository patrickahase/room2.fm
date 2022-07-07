var lat = -37.803193437556054; 
var long = 144.94984320919224;

const weather = fetch('https://api.openweathermap.org/data/2.5/weather?lat=-37.803193437556054&lon=144.94984320919224&appid=cbbd43ae50e58b735aaa5e361b1f3405').then(function(resp) { return resp.json() }) // using Open Weather API to get weather data for Arts House GPS coords, then convert data to json
.then(function(data) {
console.log(data); //JSON object data is shown in the console
drawWeather(data); // calling drawWeather function on the JSON object
}); 

function drawWeather(d) { //using current date and time to find the current temperature
var celcius = Math.round(parseFloat(d.main.temp)-273.15); // weather info is converted to Celcius
var celciusmax = Math.round(parseFloat(d.main.temp_max)-273.15);
}; 

