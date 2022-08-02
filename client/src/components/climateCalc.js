import React from 'react';

const currentweather = fetch('https://api.openweathermap.org/data/2.5/weather?lat=-37.803193437556054&lon=144.94984320919224&appid=cbbd43ae50e58b735aaa5e361b1f3405&units=metric').then(function(resp) { return resp.json() }) // using Open Weather API to get weather data for Arts House GPS coords, then convert data to json
.then(function(data) {
drawWeather(data); // calling drawWeather function on the JSON object
}); 

//maybe % chance of rain could be used for % chance of animation/visual elements programmed in
// humidity % could be opacity

const forecastweather = fetch('https://api.openweathermap.org/data/2.5/forecast?lat=-37.803193437556054&lon=144.94984320919224&appid=cbbd43ae50e58b735aaa5e361b1f3405&units=metric').then(function(resp) { return resp.json() }) // using Open Weather API to get weather data for Arts House GPS coords, then convert data to json
.then(function(data) {
drawWeather(data); // calling drawWeather function on the JSON object
});  
//can use the forecast weather to check for conditions at next changeover