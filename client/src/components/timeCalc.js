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

var moontimes = SunCalc.getMoonIllumination(date, lat, long);
var phase = moontimes.phase; 
phase = Math.round(phase * 100);
var phasedeg = 3.6 * phase;
var dividerstyle = {transform: "rotate3d(0, 1, 0, " + phasedeg + "deg)",}

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

export const moonShape = <>
<div class="moonsphere">
<div class=
{phasedeg > 180 
    ? "moonlight hemisphere"
    : "moondark hemisphere"
  }
></div>
  
<div class=
  {phasedeg > 180 
  ? "moondark hemisphere"
  : "moonlight hemisphere"
  }
></div>
  
<div class="moondivider" style={dividerstyle}></div>
</div>
</>

//above is adapted from this code https://dev.to/thormeier/use-your-i-moon-gination-lets-build-a-moon-phase-visualizer-with-css-and-js-aih