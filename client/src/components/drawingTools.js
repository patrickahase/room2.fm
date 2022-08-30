import React, { useEffect } from 'react';

export default function DrawingTools(props){
  return (<>
    {props.mobile
      ?<>
        <div id="drawing-buttons-wrapper">
          <button id="erase-brush-button" className="DrawingUIButton" onClick={() => props.toggleEraser()}> ERASER <div id="eraser-icon"><EraserIcon /></div></button>
          <button id="undo-button" className="DrawingUIButton" onClick={props.undoDrawing}> UNDO <div id="undo-icon"><UndoIcon /></div></button>
          <button id="redo-button" className="DrawingUIButton" onClick={props.redoDrawing}> REDO <div id="redo-icon"><RedoIcon /></div></button>
          <span id="brush-col-label">Brush<br />Colour</span>
          <input type="color" id="mobile-col-select" className="DrawingUIButton" name="col1Select" defaultValue={props.colours[0]} />              
        </div>
        <div id="brush-size-wrapper">
            <div id="brush-size-slider-wrapper">
              <span style={{position: 'relative', top: '-0.1rem'}}>-</span>
              <input type="range" id="brush-size-slider" name="brush-size-slider" min="4" max="40" />
              <span style={{position: 'relative', top: '-0.1rem'}}>+</span>
            </div>
            <span>Brush Size</span>
          </div>
      </>
      :<>
        <div id="drawing-buttons-wrapper">
          <button id="increase-brush-button" className="DrawingUIButton" onClick={() => {if(props.brushSize < 60){ props.setBrushSize(props.brushSize + 2 ) }}}> BRUSH + <div id="brush-up-icon" /></button>
          <button id="decrease-brush-button" className="DrawingUIButton" onClick={() => {if(props.brushSize > 2){ props.setBrushSize(props.brushSize - 2 ) }}}> BRUSH - <div id="brush-down-icon" /></button>
          <button id="erase-brush-button" className="DrawingUIButton" onClick={() => props.toggleEraser()}> ERASER <div id="eraser-icon" /></button>
          <button id="undo-button" className="DrawingUIButton" onClick={props.undoDrawing}> UNDO <div id="undo-icon" /></button>
          <button id="redo-button" className="DrawingUIButton" onClick={props.redoDrawing}> REDO <div id="redo-icon" /></button>              
        </div>
      </>
    }    
    </>)
}
function UndoIcon(){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="AudioPlayerIcon">
        <defs>
          <marker id="arrowhead" markerWidth="5" markerHeight="5" strokeWidth="0" fill="white"
          refX="0" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" />
          </marker>
        </defs>
        <path fill="none" strokeLinecap="round" strokeWidth="6" stroke="white" marker-end="url(#arrowhead)"
              d=" M 30,80
                  L 65,80
                  A 15 15 0 1 0 65,28
                  L 30,28
                  " />
    </svg>
  )
}
function RedoIcon(){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="AudioPlayerIcon">
        <defs>
          <marker id="arrowhead2" markerWidth="5" markerHeight="5" strokeWidth="0" fill="white"
          refX="0" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" />
          </marker>
        </defs>
        <path fill="none" strokeLinecap="round" strokeWidth="6" stroke="white" marker-end="url(#arrowhead2)"
              d=" M 70,80
                  L 35,80
                  A 15 15 0 0 1 35,28
                  L 70,28
                  " />
    </svg>
  )
}
function EraserIcon(){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="AudioPlayerIcon"
      fill='none'
      stroke='white'
      strokeWidth='3'
      >
        <rect x="10" y="60" width="40" height="20" />
        <polygon points="10,60 50,60 85,20 45,20" fill="yellow" stroke-linejoin="bevel" />
        <polygon points="50,80 50,60 85,20 85,40" fill="yellow" stroke-linejoin="bevel" />
      
    </svg>
  )
}

