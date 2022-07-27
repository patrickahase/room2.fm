# Brainstorming possibilities 
- Tides (Narrm/Port Phillip Bay)
    > "the tide is currently rising"/falling
- Weather 
    > Current temp/conditions
    > Forecast 
    https://openweathermap.org/api/forecast30 (paid; the 5-day and current weather is free)
- Moon phases (Suncalc) 
- Sunrise/sunset and other time values 
- Countdown to next composition? 
    > maybe check the schedule so we can write this in
something like "there's x time left to listen/comment on this track. it'll change over in x time, when the moon will be in x phase." 
- 'where are we' / Native Land info 
- calculate distance b/w visitor and Arts House Nth Melb 
    > how do we feel about requesting geolocation tho 

- could set everything up in an array pre-filled with the values for each day of the async 

# Notes
- 29/08/22 beginning of async 
- 25/09/22 live event(s?) begin
- Beginning of 'Spring', time of transition and warming up 
- New moon: 27 Aug + 26 Sep; the async streams cover *almost* a full moon cycle from new moon to new moon
- Location settings to Arts House GPS (eg. for weather info, sunrise/set info)
- Relational to the audience 
- Procedural values could drive some of the visuals 
- approx 4 weeks of async web stuff leading up to the event. ~~6-8 sounds/tracks will be programmed cyclically and run for 24ish hour periods.~~
- Raag is writing the prompts 
- Tracks changing over at sunrise? 
    > now changing every 3 days, maybe still at sunrise tho 

# Time log
- 06/07 1ish hour setting up pages + copying in some code + cloned PH's github repo 
- 10/07 1ish hour copying some code from dot net homepage
- 1ish hour working on timezone stuff 
- 26/07 installed suncalc as a node module, starting to work suncalc into introModal but haven't been able to test it yet 

# From PH
- had a chat to Raag - they want to catch up in the next couple of weeks
- the main takeaway though is we're shooting for 9 tracks that instead of changing everyday will change
every 3 days, partially to make a more managable social media schedule for everyone
- also refactored app.js so it's running only the stuff we need - the place to change the modalIsOpen is now
on line 14 but i'm happy to keep that true for now 