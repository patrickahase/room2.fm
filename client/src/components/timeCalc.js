import React from 'react';
import SunCalc from 'suncalc'; 

var date = new Date(); //local date
var nowhours = date.getUTCHours() + 10; 

if (nowhours > 24) {date.setDate(date.getUTCDate() + 1)}; 

const lat = -37.803193437556054; //latitude and longitude set to Arts House Nth Melbourne
const long = 144.94984320919224;

var suncalctimes = SunCalc.getTimes(date, lat, long);  

let suntimes = [
    checknum(suncalctimes.sunrise.getUTCHours() + 10),
    suncalctimes.sunrise.getMinutes()
  ]
  //maybe set up a list of dates and times in one of the 'content' docs that refers to the date/time of the changeover - like a calendar array
  

//checking whether hours evaluations are above 24, if so removing 24 to get their AM time value in hours; also reevaluates date object if UTC date is yesterday
function checknum (num) {
    if (num > 24) {
      num = num - 24;
      //date.setDate(date.getUTCDate() + 1); //or run this in an if/else statement above
    } else {
      num = num; 
    }
      return num
  }

  export const sunriseText = <>
<span>The track changes at sunrise. Today, the sun rose at {suntimes[0]}:{suntimes[1]}am.</span>
</>


  