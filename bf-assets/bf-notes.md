# 23/08/22
~~- pulse animation on the current moon is an option for the final half-hour~~
~~- need to change the opacity for the nine cycles, so that the one that's full opacity is the one before that in the array~~
~~- final half-hour; trigger a function with setInterval that checks whether the time changeover has passed; if it has, pop up/trigger a marquee that says the track has changed, refresh page to show the new one?~~

# to-do
~~- add more accurate info to the countdown, incl edge cases and also add more ~~
~~- add SunCalc to credits~~
~~- add startTime to each object, then use startTime for countdowns/durations~~
~~- add tide is rising / tide is falling to the introModal text~~
~~- can now access props.currentCycle in introModal; update this in the countdown calc~~

# optional to-do 
- add geolocation to Native Land info
- tide rising/falling could be illustrated thru a transparency gradient on the timeline
- add current text time relative to sunset, eg. the sun sets in _ hours today
- add something to the text time inviting visitors to check in with their own local time? currently no prompts in the opening pages
~~- maybe the NEXT moon in the nine cycle array could also pulse, when it's about to change over? maybe too much pulsing tho~~

# Notes
- 29/08/22 beginning of async 
- 25/09/22 live event begin

- Archive 
    > weather will be an 'archived' version rather than continually updated

- Tides (Narrm/Port Phillip Bay)
    > "the tide is currently rising"/falling
- Weather 
    > Current temp/conditions
    > Forecast - rainfall and humidity, maybe checking what the forecast will be at the next changeover
- ~~Moon phases (Suncalc) ~~
- Sunrise/sunset and other time values 
- Countdown to next composition? 
    > check the schedule so we can write this in
    > change over will happen at sunset - maybe a changeover window eg. from dusk to twilight
something like "there's x time left to listen/comment on this track. it'll change over in x time, when the moon will be in x phase." 
    > maybe at transition times there won't be a specific countdown but just something like "the track will change soon"; how specific/accurate do we want the changeover to be? 
- 'where are we' / Native Land info 
- calculate distance b/w visitor and Arts House Nth Melb **maybe not including this, too much primacy of the live event**
    > how do we feel about requesting geolocation tho 
        **feel good about this option, maybe add Where Are We to AoC modal**

# 19/08/22 meet w/ PH 
- haven't done sunset calc stuff yet but have noted some ideas in the modal
    > talk about possibilities for changeover 
- moon calendar 
    > styling 
    > writing moon illos into an array


# 03/08/22 meeting w/ Raag and PH 
- Done so far: setting times to UTC+10, moon phase calculations, checking sunrise times, added a weather API/library but haven't started using this yet 
- Have been looking at tide tables and BOM data, this could be loaded in (eg. "the tide is rising/falling"/"by the time of the next composition the tide will be lower/higher than this"/tying it in to moon phases)
- To talk about
    > possibilities for using weather data
    > sussing out some of the prompts
    > looking at the changeover schedule and talking about how to program that + possible countdown
    > thoughts on geolocation (eg. for native land info and distance from Arts House)
- Relational to the audience 
    > possibly tying some of the environmental data into some prompts, eg: 
        > Can you see the sun/moon? 
        > What direction are you facing? 
        > Can you feel the warmth/humidity/cold? 
        > Are you hydrated? 
        > Wind/barometric pressure
        > Are you sheltered/insulated?

- Procedural values could drive some of the visuals  
    > maybe putting the dates of the changeovers in an array of timestamped date object and then calculations can be done from those values
- async is happening at the beginning of 'Spring', time of transition and warming up - this could be brought into the interface in some way; maybe 
- New moon: 27 Aug + 26 Sep; the async streams cover *almost* a full moon cycle from new moon to new moon
    > maybe tracking the moon phase b/w different phases of the cycle. 
- Location settings to Arts House GPS (eg. for weather info, sunrise/set info)


# Time log - total 11ish hours
- 06/07 1ish hour setting up pages + copying in some code + cloned PH's github repo 
- 10/07 1ish hour copying some code from dot net homepage
- 1ish hour working on timezone stuff 
- 26/07 installed suncalc as a node module, starting to work suncalc into introModal but haven't been able to test it yet
- 28/07 2ish hours fixing bad hook and adding sunrise and sunset times; working on evaluating for UTC+10; separating time calculations into a separate file in components
- 28/07 another 1.5ish hours spent working on moon phase illustration
- 29/07 adding another moon phase illustration for 3 days in the future + looking at tide calendars
- 29/07 1-2 hours working on weather data, looking at tide charts and finding BOM docs, working on Open Weather API for now
- 03/08 meeting + 1ish hour coding
- 04/08 working on JSON 
- 05/08 1ish hour

# From PH
- had a chat to Raag - they want to catch up in the next couple of weeks
- the main takeaway though is we're shooting for 9 tracks that instead of changing everyday will change every 3 days, partially to make a more managable social media schedule for everyone
- also refactored app.js so it's running only the stuff we need - the place to change the modalIsOpen is now on line 14 but i'm happy to keep that true for now 