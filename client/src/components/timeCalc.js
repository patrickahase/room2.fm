import React from 'react';
import SunCalc from 'suncalc'; 

var date = new Date(); 
var nowhours = date.getUTCHours() + 10; 
export const artsHouseDate = getArtsHouseDate();

function getArtsHouseDate () {  
  if (nowhours > 24) {
    date.setDate(date.getUTCDate() + 1);
    nowhours = nowhours - 24;
  };
  date.setHours(nowhours);
  date.setMinutes(date.getUTCMinutes());
  
  return date;
}

var newdate = new Date();
var nextdate = newdate.setDate(artsHouseDate.getDate() + 3);

const lat = -37.803193437556054; //latitude and longitude set to Arts House Nth Melbourne
const long = 144.94984320919224;

var suncalctimes = SunCalc.getTimes(artsHouseDate, lat, long);  

let suntimes = [
    checknum(suncalctimes.sunrise.getUTCHours() + 10),
    suncalctimes.sunrise.getMinutes()
  ]

var sunsethours = checknum(suncalctimes.sunset.getUTCHours() + 10);
var sunsetmins = suncalctimes.sunset.getMinutes();
var moontimes = SunCalc.getMoonIllumination(artsHouseDate, lat, long);
var phase = moontimes.phase; 
phase = Math.round(phase * 100);
var phasedeg = 3.6 * phase;
var dividerstyle = {transform: "rotate3d(0, 1, 0, " + phasedeg + "deg)",}

var nextmoon = SunCalc.getMoonIllumination(nextdate, lat, long); 
var nextphase = nextmoon.phase; 
nextphase = Math.round(nextphase * 100);
var nextphasedeg = 3.6 * nextphase; 
var nextdividerstyle = {transform: "rotate3d(0, 1, 0, " + nextphasedeg + "deg)",}

var liveDate = new Date('Sun Sep 25 2022');
var liveSun = SunCalc.getTimes(liveDate, lat, long);
var liveMoon = SunCalc.getMoonIllumination(liveDate, lat, long);
var livePhase = liveMoon.phase;
livePhase = Math.round(livePhase * 100);
var livePhaseDeg = 3.6 * phase;
var liveDividerStyle = {transform: "rotate3d(0, 1, 0, " + livePhaseDeg + "deg)",}

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
<p>Today, the sun rose at {suntimes[0]}:{suntimes[1]}am.</p>
</>

export const sunSetText = <><p>It's {date.getHours()}:{date.getMinutes()}. The track changes at sunset. Today, the sun sets at {sunsethours}:{sunsetmins}pm.</p>
</>

export const moonShape = <>
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

//above is adapted from this code https://dev.to/thormeier/use-your-i-moon-gination-lets-build-a-moon-phase-visualizer-with-css-and-js-aih

export const nextMoonShape = <>
<div className="moonsphere">
<div className=
{nextphasedeg > 180 
    ? "moondark hemisphere"
    : "moonlight hemisphere"
  }
></div>
  
<div className=
  {nextphasedeg > 180 
  ? "moonlight hemisphere"
  : "moondark hemisphere"
  }
></div>
  
<div className="moondivider" style={nextdividerstyle}></div>
</div>
</>

export const liveMoonShape = <>
<div className="moonsphere">
<div className=
{nextphasedeg > 180 
    ? "moondark hemisphere"
    : "moonlight hemisphere"
  }
></div>
  
<div className=
  {nextphasedeg > 180 
  ? "moonlight hemisphere"
  : "moondark hemisphere"
  }
></div>
  
<div className="moondivider" style={liveDividerStyle}></div>
</div>
</>

//using this to play w/ JSON for arranging calendar
//can't put zeroes in front of times because those numbers are being treated as 'octal literals'? 
var calendar = {
  "dates":[
  {"Sun Aug 28 2022":{},}, //listing the day before as object 0 in the array, day 0 of the async
  {"Mon Aug 29 2022":{"tides":[{"time": 341, "height": 80, "high": true}, {"time": 1025, "height": 28, "high": false}, {"time": 1652, "height": 89, "high": true}, {"time": 2305, "height": 42, "high": false}]}},
  {"Tue Aug 30 2022":{},},
  {"Wed Aug 31 2022":{},},


  {"Sun Sep 25 2022":{},},
]
}

/* SunCalc values for sunset changeover (maybe use these values for transitioning b/w tracks) — 
goldenHour | evening golden hour starts
sunsetStart | sunset starts (bottom edge of the sun touches the horizon)
sunset | sunset (sun disappears below the horizon, evening civil twilight starts)
dusk | dusk (evening nautical twilight starts)
*/
