import React, { useEffect } from 'react';

export default function DrawingTools(props){

  useEffect(() => {
    // increase brush size on click if within limit
    document.getElementById("increase-brush-button").addEventListener('click', () => {
      if(props.brushSize < 20){ props.setBrushSize(props.brushSize + 2 ) }
    });
    // decrease brush size on click if within limit
    document.getElementById("decrease-brush-button").addEventListener('click', () => {
      if(props.brushSize > 2){ props.setBrushSize(props.brushSize - 2 ) }
    });
  }, []);

  return (
    <>
      <div id="drawing-buttons-wrapper">
        <button id="increase-brush-button" className="DrawingUIButton"> BRUSH + <div id="brush-up-icon" /></button>
        <button id="decrease-brush-button" className="DrawingUIButton"> BRUSH - <div id="brush-down-icon" /></button>
        <button id="erase-brush-button" className="DrawingUIButton" onClick={props.toggleEraser}> ERASER <div id="eraser-icon" /></button>
        <button id="undo-button" className="DrawingUIButton" onClick={props.undoDrawing}> UNDO <div id="undo-icon" /></button>
        <button id="redo-button" className="DrawingUIButton" onClick={props.redoDrawing}> REDO <div id="redo-icon" /></button>              
      </div>
    </>
  )
}
