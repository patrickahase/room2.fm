# room2.fm

This is my refactoring of the room2 code base to set it up for continued use

# Credits
 - Curtis Jurgensen's custom cursor codepen was really helpful - https://codepen.io/curtisj44/pen/yGxJNX
 - Matthew Jones for his article on state management for undo/redo with fabric = https://exceptionnotfound.net/drawing-with-fabricjs-and-typescript-part-7-undo-redo/

# To Do For Bleed Test
- Re up chat limit - currently 6
- Fix UI icons size and pos
- Top Menu?
- Timer function?
- Get rid of emoji triangle?
- ~~fix controls.room2.fm~~
- new bg vis?
- explainer overlay
- writing text default size
- collision - just make it re calculate on hit
- ~~update ssl to cover www~~
- ~~change the routes to the live server!!!!~~
- ~~Response type select~~
- ~~DB to accept either response type then display~~
- ~~WebGL BG~~
- ~~Set up vultr and audio stream~~
- ~~Hook up volume~~
- ~~Prompt change countdown? (maybe response type select means not an issue~~
- ~~Keep drawing if input change~~


# To Do
- ~~Do I need pixi-react-fiber? Uninstall if not~~
- Update pre-load - how much do I need?
- ~~Replace Artist Presets object with data from server~~
- Add onmousehold style for buttons
- timer function? something with raf perhaps?
- ~~lift state up from desktop~~
- ~~add in last prompt tracker~~
- massage random
- do i need some kind of state lock on response array?
- better prompt type detection on client recieve
- random image distribution
- reconnect submit button (and change to turnery on input change)
- add sound design?
- comment out console logs
- update db login for new db
- look for empty responses

## Modal
- Modal for Mobile ~ Decided to wait until later to make sure mobile layout is consistant - perhaps the modal continue button will need to match the prompt response button in some way ~
- Modal button styling - animation and different cursor?

## ~~Text Chat~~

## Marquee Banner
- CD Gif border style?
- Banner border?
- Responsive text size

## Emoji Triangle
- Is this useful still good design? Does anyone actually get something out of using it - especially if the time scale changes
- Is equilateral the right answer?
- Colour Balance of the Y-Axis Gradient

## Lissajous Display

## Sound Controls
- ~~Add some animations to the volume notch controls~~
- ~~handle drag?~~
- ~~Handle click and hold events ?~~
- ~~Distinguish volume notch?~~

## Drawing Input
- ~~Look into undo and erase functions with fabric js~~
- ~~save initial state to undo stack~~
- fix not always undoing to first state - tied into redo somehow
- maybe the brush buttons just need an arrow next to them


## Colour Selection
- Finish Styling UI
- Change in colour 1 changes brush (and cursor) colour too
- fix colour change input - messing with svgs

## Text Input

## Intro Overlay

## Options Menu
- restart stream connection option

## Server
- change room2ClientAPI to async / await
- update sql queries to new scheme
- ~~update sql so it returns one object with the three emojis~~
- ~~write seperate get call for retrieving emojis - don't need to send them every update~~
- error handling when can't connect

## Database
- plan new scheme
