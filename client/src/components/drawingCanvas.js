import React, { Component, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

export default function DrawingCanvas(props){

  
  const [canvas, setCanvas] = useState(null);
  let canvasRef = useRef(null);
  useEffect(() => {canvasRef.current = canvas}, [canvas]);

  useEffect(() => {
    let newCanvas = new fabric.Canvas('drawing-canvas', { isDrawingMode: true });
    let canvasWrapper = document.getElementById("drawing-canvas-wrapper"); 
    newCanvas.setWidth(canvasWrapper.offsetWidth);
    newCanvas.setHeight(canvasWrapper.offsetHeight);
    newCanvas.freeDrawingBrush.color = props.brushColour;    
    newCanvas.freeDrawingBrush.width = props.brushSize;
    newCanvas.freeDrawingCursor = getCustomCursor();
    newCanvas.on('mouse:down', () => props.setIsDrawing(true));
    setCanvas(newCanvas);
    console.log("check")
    window.addEventListener('resize', updateCanvasDimensions);
    props.setDrawingCanvas(newCanvas);
    props.setCurrentCanvasState(newCanvas.toDatalessJSON());
  }, [setCanvas]);

  useEffect(() => {
    if(canvasRef.current){
      canvasRef.current.freeDrawingBrush.color = props.brushColour;
      canvasRef.current.freeDrawingCursor = getCustomCursor();
    }    
  }, [props.brushColour]);

  useEffect(() => {
    if(canvasRef.current){
      canvasRef.current.freeDrawingBrush.width = props.brushSize;
      canvasRef.current.freeDrawingCursor = getCustomCursor();
    }    
  }, [props.brushSize]);

  return (
    <div id="drawing-canvas-wrapper">
      <canvas id="drawing-canvas" />
    </div>
  )

  function updateCanvasDimensions() {
    let canvasWrapper = document.getElementById("drawing-canvas-wrapper");
    canvasRef.current.setWidth(canvasWrapper.offsetWidth);
    canvasRef.current.setHeight(canvasWrapper.offsetHeight);    
  }

  function getCustomCursor() {
    const circle = 
      `<svg height="${props.brushSize}"
            fill="${props.brushColour}"
            viewBox="0 0 ${props.brushSize * 2} ${props.brushSize * 2}"
            width="${props.brushSize}"
            xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%"
                cy="50%"
                r="${props.brushSize}" />
      </svg>`;      
    return `url(data:image/svg+xml;base64,${window.btoa(circle)}) ${props.brushSize / 2} ${props.brushSize / 2}, move`;
  }
}

export class DrawingCanvasas extends Component {
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
      </div>
    )
  }
  componentDidMount() { 
    this.fabricInit();
   }
   
  componentWillUnmount() {  }
  componentDidUpdate(prevProps) {
    /* update brush colour */
    if (prevProps.brushColour !== this.props.brushColour) {
      let newCanvasSetting = this.state.canvas;
      newCanvasSetting.freeDrawingBrush.color = this.props.brushColour;
      newCanvasSetting.freeDrawingCursor = this.getCustomCursor();
    }
    /* update brush size */
    if (prevProps.brushSize !== this.props.brushSize) {
      let newCanvasSetting = this.state.canvas;
      newCanvasSetting.freeDrawingBrush.width = this.props.brushSize;
      newCanvasSetting.freeDrawingCursor = this.getCustomCursor();
    }  
  }
  fabricInit(){
    let canvas = new fabric.Canvas('drawing-canvas', { isDrawingMode: true });
    let canvasWrapperRef = document.getElementById("drawing-canvas-wrapper"); 
    canvas.setWidth(canvasWrapperRef.offsetWidth);
    canvas.setHeight(canvasWrapperRef.offsetHeight);
    canvas.freeDrawingBrush.color = this.props.brushColour;    
    canvas.freeDrawingBrush.width = this.props.brushSize;
    canvas.freeDrawingCursor = this.getCustomCursor();
    canvas.on('mouse:down', () => this.setDrawing());
    this.setState({ canvas: canvas },
      () => { window.addEventListener('resize', this.updateCanvasDimensions); });
    this.props.setDrawingCanvas(canvas);
    this.props.setCurrentCanvasState(canvas.toDatalessJSON());
  }
  updateCanvasDimensions() {
    let canvasWrapperRef = document.getElementById("drawing-canvas-wrapper");
    if(canvasWrapperRef){
      this.state.canvas.setWidth(canvasWrapperRef.offsetWidth);
      this.state.canvas.setHeight(canvasWrapperRef.offsetHeight);
      this.setState({ canvasWidth: canvasWrapperRef.offsetWidth, 
        canvasHeight: canvasWrapperRef.offsetHeight });
    }       
  }
  setDrawing(){
    /* console.log("canvas-click") */
    this.props.setIsDrawing(true);    
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
        
        return `url(data:image/svg+xml;base64,${ window.btoa(circle) }) ${ this.props.brushSize / 2 } ${ this.props.brushSize / 2 }, move`;
      };
}

/* export default DrawingCanvas */



