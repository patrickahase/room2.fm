# room2.fm

This is my refactoring of the room2 code base to set it up for continued use

# Credits
 - Curtis Jurgensen's custom cursor codepen was really helpful - https://codepen.io/curtisj44/pen/yGxJNX
 - Matthew Jones for his article on state management for undo/redo with fabric = https://exceptionnotfound.net/drawing-with-fabricjs-and-typescript-part-7-undo-redo/

# To Do
- Do I need pixi-react-fiber? Uninstall if not
- Update pre-load - how much do I need?
- Replace Artist Presets object with data from server
- Add onmousehold style for buttons

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
- Add some animations to the volume notch controls
- Handle click and hold events ?
- Distinguish volume notch?

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
- update sql so it returns one object with the three emojis

## Database
- plan new scheme
