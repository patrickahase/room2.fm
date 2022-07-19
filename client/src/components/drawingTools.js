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
}

export default DrawingTools
