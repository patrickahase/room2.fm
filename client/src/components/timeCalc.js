import React from 'react';
import SunCalc from 'suncalc'; 

var date = Date.now(); 
//date = date.now();
//var nowhours = date.getUTCHours() + 10; 

const lat = -37.803193437556054; //latitude and longitude set to Arts House Nth Melbourne
const long = 144.94984320919224;

//write and export a function in this doc which checks how long til next sunset

var cycleEndDates = [
  'August 31, 2022 18:00 GMT+10:00', 
  'September 3, 2022 18:00 GMT+10:00',
  'September 6, 2022 18:00 GMT+10:00',
  'September 9, 2022 18:00 GMT+10:00',
  'September 12, 2022 18:00 GMT+10:00',
  'September 15, 2022 18:00 GMT+10:00',
  'September 18, 2022 18:00 GMT+10:00',
  'September 21, 2022 18:00 GMT+10:00',
  'September 24, 2022 18:00 GMT+10:00'
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

console.log(getCycleSun(cycleEndDates[0]))

var newdate = new Date();
//var nextdate = newdate.setDate(artsHouseDate.getDate() + 3);

var suncalctimes = SunCalc.getTimes(date, lat, long);  
var sunsetMilliseconds = Date.parse(suncalctimes.sunset);
var countdownMilli = sunsetMilliseconds - date;

var sunsethours = checknum(suncalctimes.sunset.getUTCHours() + 10);
var sunsetmins = suncalctimes.sunset.getMinutes();
var moontimes = SunCalc.getMoonIllumination(date, lat, long);
var phase = moontimes.phase; 
phase = Math.round(phase * 100);
var phasedeg = 3.6 * phase;
var dividerstyle = {transform: "rotate3d(0, 1, 0, " + phasedeg + "deg)",}

/*var nextmoon = SunCalc.getMoonIllumination(nextdate, lat, long); 
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
var liveDividerStyle = {transform: "rotate3d(0, 1, 0, " + livePhaseDeg + "deg)",}*/

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

export const sunSetText = <><p>The track changes at sunset. Today, the sun sets at {sunsethours}:{sunsetmins}pm, in {countdownMilli} milliseconds. *turn this value into a more legible countdown*</p>
</>

export const currentMoonShape = <>
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

export const firstMoonShape = getCycleMoon(cycleEndDates[0]);
export const secondMoonShape = getCycleMoon(cycleEndDates[1]);
export const thirdMoonShape = getCycleMoon(cycleEndDates[2]);
export const fourthMoonShape = getCycleMoon(cycleEndDates[3]);
export const fifthMoonShape = getCycleMoon(cycleEndDates[4]);
export const sixthMoonShape = getCycleMoon(cycleEndDates[5]);
export const seventhMoonShape = getCycleMoon(cycleEndDates[6]);
export const eighthMoonShape = getCycleMoon(cycleEndDates[7]);
export const ninthMoonShape = getCycleMoon(cycleEndDates[8]);



//above is adapted from this code https://dev.to/thormeier/use-your-i-moon-gination-lets-build-a-moon-phase-visualizer-with-css-and-js-aih
/*
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
*/
/* SunCalc values for sunset changeover (maybe use these values for transitioning b/w tracks) — 
goldenHour | evening golden hour starts
sunsetStart | sunset starts (bottom edge of the sun touches the horizon)
sunset | sunset (sun disappears below the horizon, evening civil twilight starts)
dusk | dusk (evening nautical twilight starts)
*/

//export const artsHouseDate = getArtsHouseDate();

/*function getArtsHouseDate () {  
  if (nowhours > 24) {
    date.setDate(date.getUTCDate() + 1);
    nowhours = nowhours - 24;
  };
  date.setHours(nowhours);
  date.setMinutes(date.getUTCMinutes());
  
  return date;
}*/
