import React from 'react';
import SunCalc from 'suncalc'; 
import {cycleDates } from '../content/cyclePresets'

const currentDate = Date.now(); 

const lat = -37.803193437556054; //latitude and longitude set to Arts House Nth Melbourne
const long = 144.94984320919224;

export default function CountdownCalc (props) {
  var remainingMilli = cycleDates[props.currentCycle].endTime - currentDate;
  
  var countdownDays = Math.round(remainingMilli / 1000 / 60 / 60 / 24);
  //need to work on countdowncalc so that edge cases (eg. before midnight on night of changeover) is more accurate
  if (countdownDays >= 3) {
    return (
      <>
      <span>
        The track/prompt/visual cycle will change the day after tomorrow.
      </span>
      </>
    )
  } else if (countdownDays === 2) {
    return (
      <>
      <span>
        The track/prompt/visual cycle will change tomorrow.
      </span>
      </>
    )
  } else if (countdownDays <= 1) {
    return (
      <>
      <span>
        The track/prompt/visual cycle will change today.
      </span>
      </>
    )
  }
}

var cycleStartDates = [
  Date.parse("2022-08-28T17:55+10:00"),
  Date.parse("2022-08-31T17:58:51+10:00"),
  Date.parse("2022-09-03T18:01:21+10:00"),
  Date.parse("2022-09-06T18:03:50+10:00"),
  Date.parse("2022-09-09T18:06:18+10:00"),
  Date.parse("2022-09-12T18:08:47+10:00"),
  Date.parse("2022-09-15T18:11:16+10:00"),
  Date.parse("2022-09-18T18:13:45+10:00"),
  Date.parse("2022-09-21T18:16:15+10:00")
]; //manually entered these dates so test dates don't mess with it

function getCycleSun (end) {
  var cycleEndTime = new Date(end);
  var endSun = SunCalc.getTimes(cycleEndTime, lat, long);
  return (
  <>
  <span>
  {endSun.sunset.getHours()}
  </span>
  </>
  )
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

export const sunsetText = getCycleSun(currentDate);

export const currentMoonShape = getCycleMoon(currentDate);

export const moonShapeArray = cycleStartDates.map(i =>
  {return getCycleMoon(i)}
)

/* SunCalc values for sunset changeover (maybe use these values for transitioning b/w tracks) — 
goldenHour | evening golden hour starts
sunsetStart | sunset starts (bottom edge of the sun touches the horizon)
sunset | sunset (sun disappears below the horizon, evening civil twilight starts)
dusk | dusk (evening nautical twilight starts)
*/
