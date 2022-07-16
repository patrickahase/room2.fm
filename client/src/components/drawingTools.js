import React, { Component } from 'react';


export class DrawingTools extends Component {
  constructor(props) {
    super(props)
    this.state = {
    frameColour: "#ffffff88"
    }
    
  }
  render() {
    return (
      <>
      
              <div id="drawing-buttons-wrapper">
                {/* <button>bigger brush</button>
                <button>smaller brush</button>
                <button>eraser</button>
                <button>undo</button>
                <button>redo</button> */}
                <button id="increase-brush-button" className="RightUIButton"> BRUSH + <div id="brush-up-icon" /></button>
                <button id="decrease-brush-button" className="RightUIButton"> BRUSH - <div id="brush-down-icon" /></button>
                <button id="erase-brush-button" className="RightUIButton" onClick={this.props.toggleEraser}> ERASER <div id="eraser-icon" /></button>
                <button id="undo-button" className="RightUIButton" onClick={this.props.undoDrawing}> UNDO <div id="undo-icon" /></button>
                <button id="redo-button" className="RightUIButton" onClick={this.props.redoDrawing}> REDO <div id="redo-icon" /></button>
              
              </div>
      </>
    )
  }
  componentDidMount() {
    // increase brush size on click if within limit
    document.getElementById("increase-brush-button").addEventListener('click', () => {
      if(this.props.brushSize < 20){ this.props.setBrushSize(this.props.brushSize + 2 ) }
    });
    // decrease brush size on click if within limit
    document.getElementById("decrease-brush-button").addEventListener('click', () => {
      if(this.props.brushSize > 2){ this.props.setBrushSize(this.props.brushSize - 2 ) }
    });
  }
  componentDidUpdate(prevProps){
    if (prevProps.colours[0] !== this.props.colours[0]) {
      var c = this.props.colours[0].substring(1);      // strip #
      var rgb = parseInt(c, 16);   // convert rrggbb to decimal
      var r = (rgb >> 16) & 0xff;  // extract red
      var g = (rgb >>  8) & 0xff;  // extract green
      var b = (rgb >>  0) & 0xff;  // extract blue
      
      var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
      
      if (luma < 40) {
          this.setState({ frameColour: "#ffffff88" })
      } else {
          this.setState({ frameColour: "#00000088" })
      }
    }
  }

  /* getCSSRule(ruleName) {
    ruleName = ruleName.toLowerCase();
    var result = null;
    var find = Array.prototype.find;

    find.call(document.styleSheets, styleSheet => {
        result = find.call(styleSheet.cssRules, cssRule => {
            return cssRule instanceof CSSStyleRule 
                && cssRule.selectorText.toLowerCase() === ruleName;
        });
        return result != null;
    });
    return result;
  } */
}

export default DrawingTools

/* expecting a 1:1 aspect ratio */
function IncreaseBrushSize(props){
  return (<>
  <svg
      width="83%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg" >
        <rect id="increase-brush-circle" width="100%" height="100%" x="0" y="0" fill="url(#increase-brush-gradient" />
        <defs>
          <radialGradient id="increase-brush-gradient">
            <stop offset="60%" stopColor={props[0]} />
            <stop offset="60%" stopColor={props[0]} />
            <stop offset="65%" stopColor={props[1]} />
            <stop offset="85%" stopColor="transparent" />            
          </radialGradient>
        </defs>        
    </svg>
  <svg
      width="17%"
      height="100%"
      viewBox="0 0 20 100"
      xmlns="http://www.w3.org/2000/svg" >
        {/* <rect id="increase-brush-circle" width="100%" height="100%" x="0" y="0" cX="50%" cY="50%" fill="url(#increase-brush-gradient" /> */}
        <polyline points="10,20 10,80" fill="none" stroke="black" strokeWidth="4" />   
        <polyline points="0,30 10,20 20,30" fill="none" stroke="black" strokeWidth="4" />   
    </svg>  
  </>    
  )
}
/* expecting a 1:1 aspect ratio */
function DecreaseBrushSize(props){
  return (<>
    <svg
      width="83%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg" >
        <rect id="decrease-brush-circle" width="100%" height="100%" x="0" y="0" cx="50%" cy="50%" fill="url(#decrease-brush-gradient)">
        </rect>
        <defs>
          <radialGradient id="decrease-brush-gradient">
            <stop offset="30%" stopColor={props[0]} />
            <stop offset="30%" stopColor={props[0]} />
            <stop offset="35%" stopColor={props[1]} />
            <stop offset="55%" stopColor="transparent" />            
          </radialGradient>
        </defs>
        
    </svg>
    <svg
      width="17%"
      height="100%"
      viewBox="0 0 20 100"
      xmlns="http://www.w3.org/2000/svg" >
        {/* <rect id="increase-brush-circle" width="100%" height="100%" x="0" y="0" cX="50%" cY="50%" fill="url(#increase-brush-gradient" /> */}
        <polyline points="10,20 10,80" fill="none" stroke="black" strokeWidth="4" />   
        <polyline points="0,70 10,80 20,70" fill="none" stroke="black" strokeWidth="4" />   
    </svg>  
  </>
  )
}
