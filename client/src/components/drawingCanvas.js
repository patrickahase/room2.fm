import React, { Component } from 'react';
import { fabric } from 'fabric';

export class DrawingCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.getCustomCursor = this.getCustomCursor.bind(this);
    this.updateCanvasDimensions = this.updateCanvasDimensions.bind(this);
  }
  render() {
    return (
      <div id="drawing-canvas-wrapper">
        <canvas id="drawing-canvas" />
        <svg
          width="10px"
          height="10px"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
          id="drawing-cursor">
          <circle  r="5" fill="white"/>
        </svg>
      </div>
    )
  }
  componentDidMount() { 
    this.fabricInit();
   }
  componentWillUnmount() {  }
  fabricInit(){
    let canvas = new fabric.Canvas('drawing-canvas', { isDrawingMode: true });
    let canvasWrapperRef = document.getElementById("drawing-canvas-wrapper"); 
    canvas.setWidth(canvasWrapperRef.offsetWidth);
    canvas.setHeight(canvasWrapperRef.offsetHeight);
    canvas.freeDrawingBrush.color = this.props.brushColour;    
    canvas.freeDrawingBrush.width = this.props.brushSize;
    canvas.freeDrawingCursor = `url(${ this.getCustomCursor() }) ${ this.props.brushSize / 2 } ${ this.props.brushSize / 2 }, move`;
    this.setState({ canvas: canvas }, 
      () => { window.addEventListener('resize', this.updateCanvasDimensions); });
  }
  updateCanvasDimensions() {
    let canvasWrapperRef = document.getElementById("drawing-canvas-wrapper");      
    this.state.canvas.setWidth(canvasWrapperRef.offsetWidth);
    this.state.canvas.setHeight(canvasWrapperRef.offsetHeight);
    this.setState({ canvasWidth: canvasWrapperRef.offsetWidth, 
      canvasHeight: canvasWrapperRef.offsetHeight });    
  }

  /* Custom Cursor - Curtis Jurgensen - https://codepen.io/curtisj44/pen/yGxJNX*/
  getCustomCursor = () => {
    const circle = `
          <svg
            height="${ this.props.brushSize }"
            fill="${ this.props.brushColour }"
            viewBox="0 0 ${ this.props.brushSize * 2 } ${ this.props.brushSize * 2 }"
            width="${ this.props.brushSize }"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50%"
              cy="50%"
              r="${ this.props.brushSize }" 
            />
          </svg>
        `;
        
        return `data:image/svg+xml;base64,${ window.btoa(circle) }`;
      };
}

export default DrawingCanvas



