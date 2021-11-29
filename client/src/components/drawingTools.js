import React, { Component } from 'react';
import ColourPicker from './colourPicker';

export class DrawingTools extends Component {
  render() {
    return (
      <div id="drawing-tools-wrapper">                
                <ColourPicker 
                  colour1={this.props.colour1}
                   
                  colour3={this.props.colour3}
                  changeBrushColour={this.props.changeBrushColour}
                />
                <button id="increase-brush-button" className="RightUIButton" onClick={this.props.changeBrushSize}> <IncreaseBrushSize colour1={this.props.colour1} colour2={this.props.colour3} /> </button>
                <button id="decrease-brush-button" className="RightUIButton" onClick={this.props.changeBrushSize}> <DecreaseBrushSize colour1={this.props.colour1} colour2={this.props.colour3} /> </button>
                {/* <button id="erase-brush-button" className="RightUIButton" onClick={this.toggleEraser}>
                  E
                </button>
                <button id="undo-button" className="RightUIButton" onClick={this.undoDrawing}>
                ⮌
                </button>
                <button id="redo-button" className="RightUIButton" onClick={this.redoDrawing}>
                ⮎
                </button> */}
              </div>
    )
  }
  componentDidMount() {
    this.getCSSRule('.GrowthArrow').style.strokeDasharrXay = document.getElementsByClassName("GrowthArrow")[0].getTotalLength();
    this.getCSSRule('.GrowthArrow').style.strokeDashoffset = document.getElementsByClassName("GrowthArrow")[0].getTotalLength();
  }
  getCSSRule(ruleName) {
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
  }
}

export default DrawingTools

/* expecting a 1:1 aspect ratio */
function IncreaseBrushSize(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg" >
        {/* Arrow Head */}
        <marker id="growth-arrowhead" markerWidth="5" markerHeight="5"refX="0" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" />
        </marker>
        <rect id="increase-brush-circle" width="100%" height="100%" x="0" y="0" cX="50%" cY="50%" fill="url(#increase-brush-gradient" />
        <defs>
          <radialGradient id="increase-brush-gradient">
            <stop offset="60%" stop-color={props.colour2} />
            <stop offset="60%" stop-color={props.colour1} />
            <stop offset="65%" stop-color={props.colour1} />
            <stop offset="85%" stop-color={props.colour2} />            
          </radialGradient>
        </defs>
       {/*  <rect width="100%" height="100%" fill="red" />   */}    
        <path fill="none" strokeWidth="1" stroke="black" className="GrowthArrow" marker-end="url(#growth-arrowhead)"
                      d=" M 50,50
                          L 25,25
                          " />
        <path fill="none" strokeWidth="1" stroke="black" className="GrowthArrow" 
                      d=" M 50,50
                          L 75,25
                          " />
        <path fill="none" strokeWidth="1" stroke="black" className="GrowthArrow" 
                      d=" M 50,50
                          L 75,75
                          " />
        <path fill="none" strokeWidth="1" stroke="black" className="GrowthArrow" 
                      d=" M 50,50
                          L 25,75
                          " />
        
    </svg>
  )
}
/* expecting a 1:1 aspect ratio */
function DecreaseBrushSize(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg" >
        <rect id="decrease-brush-circle" width="100%" height="100%" x="0" y="0" cX="50%" cY="50%" fill="url(#decrease-brush-gradient">
        </rect>
        <defs>
          <radialGradient id="decrease-brush-gradient">
            <stop offset="30%" stop-color={props.colour2} />
            <stop offset="30%" stop-color={props.colour1} />
            <stop offset="35%" stop-color={props.colour1} />
            <stop offset="55%" stop-color={props.colour2} />            
          </radialGradient>
        </defs>
        
    </svg>
  )
}
