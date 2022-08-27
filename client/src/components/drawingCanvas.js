import React, { useEffect, useRef, useState } from 'react';
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
    //newCanvas.freeDrawingBrush = new fabric.EraserBrush(newCanvas);
    newCanvas.freeDrawingBrush.width = props.brushSize;
    newCanvas.freeDrawingCursor = getCustomCursor();
    newCanvas.on('mouse:down', () => props.setIsDrawing(true));
    setCanvas(newCanvas);
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
    if(document.getElementById("drawing-canvas-wrapper")){
      let canvasWrapper = document.getElementById("drawing-canvas-wrapper");
      canvasRef.current.setWidth(canvasWrapper.offsetWidth);
      canvasRef.current.setHeight(canvasWrapper.offsetHeight); 
    }   
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
