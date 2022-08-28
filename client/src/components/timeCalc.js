import React from 'react';
import SunCalc from 'suncalc'; 
import {cycleDates } from '../content/cyclePresets'

const currentDate = Date.now(); 
const lat = -37.803193437556054; //latitude and longitude set to Arts House Nth Melbourne
const long = 144.94984320919224;
const sunTimes = SunCalc.getTimes(currentDate, lat, long);
const sunsetMilli = Date.parse(sunTimes.sunsetStart);
const sunriseMilli = Date.parse(sunTimes.sunrise);
const duskMilli = Date.parse(sunTimes.dusk);
var twentyfour = 1000 * 60 * 60 * 24;
const yesterday = currentDate - twentyfour;
const yesterdayTimes = SunCalc.getTimes(yesterday, lat, long);
const yesterdaySunset = Date.parse (yesterdayTimes.sunset);

export default function CountdownCalc (props) {
  var remainingMilli = cycleDates[props.currentCycle].endTime - currentDate;
  var countdownDays = remainingMilli / 1000 / 60 / 60 / 24;
  countdownDays = countdownDays.toFixed(2);
  // b/w sunset and midnight is approx 6 hours = 0.25 of a day
  //need to work on countdowncalc so that edge cases (eg. before midnight on night of changeover) is more accurate
  if (countdownDays >= 2.75) {
    return (
      <>
      <span>
        The track/prompt/visual cycle will change in about three days' time, as the sun is setting.
      </span>
      </>
    )
  } else if (countdownDays <= 2.74 && countdownDays >= 1.75) {
    return (
      <>
      <span>
        The track/prompt/visual cycle will change the day after tomorrow, as the sun is setting.
      </span>
      </>
    )
  }
    else if (countdownDays <= 1.74 && countdownDays >= 0.75) {
    return (
      <>
      <span>
        The track/prompt/visual cycle will change tomorrow, as the sun is setting.
      </span>
      </>
    )
  } else if (countdownDays <= 0.74) {
    return (
      <>
      <span>
        The track/prompt/visual cycle will change today, as the sun is setting.
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

function getSunset () {
  if (currentDate > sunsetMilli) {
    //nighttime
      if (currentDate <= duskMilli) {
        return (
          <>
            <span>
            The sun is setting.
            </span>
          </>
        )
      } else {
        var nightDiffMilli = currentDate - sunsetMilli;
        var nightDiffMin = nightDiffMilli / 1000 / 60;
        var nightDiff = checkhours(nightDiffMin);
        return (
          <>
          <span>
          Tonight, the sun set {nightDiff} ago.
          </span>
          </>
        )
      }
  } else if (currentDate < sunsetMilli && currentDate > sunriseMilli) {
    //daytime
    var dayDiffMilli = sunsetMilli - currentDate;
    var dayDiffMin = dayDiffMilli / 1000 / 60;
    var dayDiff = checkhours(dayDiffMin);
    return (
      <>
        <span>
          The sun will set in {dayDiff}.
        </span>
        </>
    )
  } else {
    //morning
    var yesterdayDiffMilli = currentDate - yesterdaySunset;
    var yesterdayDiffMin = yesterdayDiffMilli / 1000 / 60;
    var yesterdayDiff = checkhours(yesterdayDiffMin);
    return (
      <>
        <span>
        The sun set {yesterdayDiff} ago.
        </span>
        </>
    )
  }
}

function checkhours(num) {
  if (num < 60) {
    return (
      <>
      <span>
        less than an hour
      </span>
      </>
      )
  } else if (num > 60 && num < 90) {
    return (
      <>
      <span>
    about an hour
    </span>
    </>
    )
  } else {
    var hours = Math.round(num / 60);
    hours = textNum(hours);
    return(
    <>
    <span>
      about {hours} hours
    </span>
    </>
    )
  }
}

function textNum (num) {
  if (num === 1) {
    return (
      <>
      one
      </>
    )
  } else if (num === 2) {
    return (
      <>
      two 
      </>
    )
  } else if (num === 3) {
    return (
      <>
      three
      </>
    )
  } else if (num === 4) {
    return (
      <>
      four
      </>
    ) 
  } else if (num === 5) {
    return (
      <>
      five
      </>
    )
  } else if (num === 6) {
    return (
      <>
      six
      </>
    )
  } else if (num === 7) {
    return (
      <>
      seven
      </>
    )
  } else if (num === 8) {
    return (
      <>
      eight
      </>
    )
  } else if (num === 9) {
    return (
      <>
      nine
      </>
    )
  } else if (num === 10) {
    return (
      <>
      ten
      </>
    )
  } else if (num === 11) {
    return (
      <>
      eleven
      </>
    )
  } else if (num === 12) {
    return (
      <>
      twelve
      </>
    )
  } else {
    return (
      <>
      {num}
      </>
    )
  }
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

export const sunsetText = getSunset();

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
