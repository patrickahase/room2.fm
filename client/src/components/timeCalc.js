import React from 'react';
import SunCalc from 'suncalc'; 

var date = Date.now(); 
//date = date.now();
//var nowhours = date.getUTCHours() + 10; 

const lat = -37.803193437556054; //latitude and longitude set to Arts House Nth Melbourne
const long = 144.94984320919224;

//write and export a function in this doc which checks how long til next sunset

var cycleEndDates = [ //change this to maybe refer to cyclePresets info
  'Wed Aug 31 2022 17:58:51 GMT+1000 (Australian Eastern Standard Time)',
  'Sat Sep 03 2022 18:01:21 GMT+1000 (Australian Eastern Standard Time)',
  'Tue Sep 06 2022 18:03:50 GMT+1000 (Australian Eastern Standard Time)',
  'Fri Sep 09 2022 18:06:18 GMT+1000 (Australian Eastern Standard Time)',
  'Mon Sep 12 2022 18:08:47 GMT+1000 (Australian Eastern Standard Time)',
  'Thu Sep 15 2022 18:11:16 GMT+1000 (Australian Eastern Standard Time)',
  'Sun Sep 18 2022 18:13:45 GMT+1000 (Australian Eastern Standard Time)',
  'Wed Sep 21 2022 18:16:15 GMT+1000 (Australian Eastern Standard Time)',
  'Sat Sep 24 2022 18:18:46 GMT+1000 (Australian Eastern Standard Time)'
]

function getCycleSun (end) {
  var cycleEndTime = new Date(end);
  var endSun = SunCalc.getTimes(cycleEndTime, lat, long);
  return endSun.sunset;
}

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

export const sunSetText = <><p>The track changes at sunset. Today, the sun sets at {sunsethours}:{sunsetmins}pm, in {countdownMilli} milliseconds. *turn this value into a more legible countdown* Maybe countdown could happen based on how many sunsets b/w now and next change</p>
</>

export const currentMoonShape = getCycleMoon(date);
export const firstMoonShape = getCycleMoon(cycleEndDates[0]);
export const secondMoonShape = getCycleMoon(cycleEndDates[1]);
export const thirdMoonShape = getCycleMoon(cycleEndDates[2]);
export const fourthMoonShape = getCycleMoon(cycleEndDates[3]);
export const fifthMoonShape = getCycleMoon(cycleEndDates[4]);
export const sixthMoonShape = getCycleMoon(cycleEndDates[5]);
export const seventhMoonShape = getCycleMoon(cycleEndDates[6]);
export const eighthMoonShape = getCycleMoon(cycleEndDates[7]);
export const ninthMoonShape = getCycleMoon(cycleEndDates[8]);

/* SunCalc values for sunset changeover (maybe use these values for transitioning b/w tracks) — 
goldenHour | evening golden hour starts
sunsetStart | sunset starts (bottom edge of the sun touches the horizon)
sunset | sunset (sun disappears below the horizon, evening civil twilight starts)
dusk | dusk (evening nautical twilight starts)
*/
