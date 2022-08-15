export const cyclePresets = [
  {
    introStatement: "if you're seeing this the server is having some trouble",
    prompt: "if you're seeing this the server is having some trouble",
    trackDetails: "if you're seeing this the server is having some trouble",
    trackLink: "",
    artistLink: "",
    trackSrc: "",
    shaderName: "",
    dbTable: "",
    colours: [
      "#222323",
      "#5252ff",
      "#b5e877"
    ]
  },
  {
    introStatement: "if you're seeing this the server is having some trouble",
    prompt: "if you're seeing this the server is having some trouble",
    trackDetails: "if you're seeing this the server is having some trouble",
    trackLink: "",
    artistLink: "",
    trackSrc: "",
    shaderName: "",
    dbTable: "",
    colours: [
      "#222323",
      "#5252ff",
      "#b5e877"
    ]
  },
  {
    introStatement: "if you're seeing this the server is having some trouble",
    prompt: "if you're seeing this the server is having some trouble",
    trackDetails: "if you're seeing this the server is having some trouble",
    trackLink: "",
    artistLink: "",
    trackSrc: "",
    shaderName: "",
    dbTable: "",
    colours: [
      "#222323",
      "#5252ff",
      "#b5e877"
    ]
  },
  {
    introStatement: "if you're seeing this the server is having some trouble",
    prompt: "if you're seeing this the server is having some trouble",
    trackDetails: "if you're seeing this the server is having some trouble",
    trackLink: "",
    artistLink: "",
    trackSrc: "",
    shaderName: "",
    dbTable: "",
    colours: [
      "#222323",
      "#5252ff",
      "#b5e877"
    ]
  },
]

// these dates are for testing
//check whether parse will work w/ suncalc 
//endTime is the end of the cycle
//this cycle will only check once, but maybe also checking if it's half an hour before an endTime
export const cycleDates = [
  {
    endTime: Date.parse("2022-08-06T17:52+10:00"),
    tidalData: [
      {
        tideEnd: Date.parse("2022-08-06T13:15+10:00"),
        tideUp: 1.0,
        tideHeight: 0.8
      },
      {
        tideEnd: Date.parse("2022-08-06T13:17+10:00"),
        tideUp: -1.0,
        tideHeight: 0.2
      },
      {
        tideEnd: Date.parse("2022-08-06T13:19+10:00"),
        tideUp: 1.0,
        tideHeight: 0.9
      },
      {
        tideEnd: Date.parse("2022-08-06T13:21+10:00"),
        tideUp: -1.0,
        tideHeight: 0.3
      },
    ]
  },
  {
    endTime: Date.parse("2022-08-07T17:52+10:00"),
    tidalData: [
      {
        tideEnd: Date.parse("2022-08-06T12:52+10:00"),
        tideUp: true,
        tideHeight: 0.8
      },
      {
        tideEnd: Date.parse("2022-08-06T12:52+10:00"),
        tideUp: false,
        tideHeight: 0.2
      },
      {
        tideEnd: Date.parse("2022-08-06T12:52+10:00"),
        tideUp: true,
        tideHeight: 0.9
      },
      {
        tideEnd: Date.parse("2022-08-06T12:52+10:00"),
        tideUp: false,
        tideHeight: 0.3
      },
    ]
  },
  {
    endTime: Date.parse("2022-09-08T17:52+10:00"),
    tidalData: [
      {
        tideEnd: Date.parse("2022-09-06T12:52+10:00"),
        tideUp: true,
        tideHeight: 0.8
      },
      {
        tideEnd: Date.parse("2022-09-06T12:52+10:00"),
        tideUp: false,
        tideHeight: 0.2
      },
      {
        tideEnd: Date.parse("2022-09-06T12:52+10:00"),
        tideUp: true,
        tideHeight: 0.9
      },
      {
        tideEnd: Date.parse("2022-09-06T12:52+10:00"),
        tideUp: false,
        tideHeight: 0.3
      },
    ]
  },
]

//https://docs.google.com/document/d/1q8UpFuTYy_0QZwoyxDSckXssbbEfQcUgIek9xCErQZ0/edit
//dates and times above to be added to the array w/ tidal data