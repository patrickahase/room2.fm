import React from 'react';
import SunCalc from 'suncalc'; 
//import {realCycleDates } from '../content/cyclePresets'

var date = Date.now(); 
//date = date.now();
//var nowhours = date.getUTCHours() + 10; 

const lat = -37.803193437556054; //latitude and longitude set to Arts House Nth Melbourne
const long = 144.94984320919224;

//write and export a function in this doc which checks how long til next sunset
var cycleStartDates = [
  Date.parse("2022-08-28T17:55+10:00"),
  Date.parse("2022-08-31T17:58:51+10:00"),
  Date.parse("2022-09-03T18:01:21+10:00"),
  Date.parse("2022-09-06T18:03:50+10:00"),
  Date.parse("2022-09-09T18:06:18+10:00"),
  Date.parse("2022-09-12T18:08:47+10:00"),
  Date.parse("2022-09-15T18:11:16+10:00"),
  Date.parse("2022-09-18T18:13:45+10:00"),
  Date.parse("2022-09-21T18:16:15+10:00"),
  Date.parse("2022-09-24T18:18:46+10:00")
]; //manually entered these dates so test dates don't mess with it

function getCycleSun (end) {
  var cycleEndTime = new Date(end);
  var endSun = SunCalc.getTimes(cycleEndTime, lat, long);
  return endSun.sunset;
}



/*function CountdownCalc (props) {
  console.log(props.currentCycle);
}*/

//CountdownCalc();



function getCycleMoon (end) {
  var cycleEndTime = new Date(end);
  var endMoon = SunCalc.getMoonIllumination(cycleEndTime, lat, long);
  var phase = endMoon.phase; 
  phase = Math.round(phase * 100);
  var phasedeg = 3.6 * phase;
  var dividerstyle = {transform: "rotate3d(0, 1, 0, " + phasedeg + "deg)",}
  return (
  <>
    <div className="moonsphere">
    <div className=
    {phasedeg > 180 
        ? "moondark hemisphere"
        : "moonlight hemisphere"
      }
    ></div>
      
    <div className=
      {phasedeg > 180 
      ? "moonlight hemisphere"
      : "moondark hemisphere"
      }
    ></div>
      
    <div className="moondivider" style={dividerstyle}></div>
    </div>
    </>
  )
}

var suncalctimes = SunCalc.getTimes(date, lat, long);  
var sunsetMilliseconds = Date.parse(suncalctimes.sunset);
var countdownMilli = sunsetMilliseconds - date;

var sunsethours = checknum(suncalctimes.sunset.getUTCHours() + 10);
var sunsetmins = suncalctimes.sunset.getMinutes();

//checking whether hours evaluations are above 24, if so removing 24 to get their AM time value in hours; also reevaluates date object if UTC date is yesterday
function checknum (num) {
    if (num > 24) {
      num = num - 24;
    } else {
      num = num; 
    }
      return num
  }

export const sunSetText = <>
  <p>The track changes at sunset. 
    Today, the sun sets at {sunsethours}:{sunsetmins}pm, in {countdownMilli} milliseconds. 
    *turn this value into a more legible countdown* 
    Maybe countdown could happen based on how many sunsets b/w now and next change
  Track changed tonight and will change again in three day's time
  Track changes today, tomorrow or day after tomorrow
  </p>
</>

export const currentMoonShape = getCycleMoon(date);

export const moonShapeArray = cycleStartDates.map(i =>
  {return getCycleMoon(i)}
)
/* SunCalc values for sunset changeover (maybe use these values for transitioning b/w tracks) — 
goldenHour | evening golden hour starts
sunsetStart | sunset starts (bottom edge of the sun touches the horizon)
sunset | sunset (sun disappears below the horizon, evening civil twilight starts)
dusk | dusk (evening nautical twilight starts)
*/
