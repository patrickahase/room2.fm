import React, { useEffect } from 'react';

export default function DrawingToolsDesktop(props){

  useEffect(() => {
    if(props.mobile){
      props.setCurrentColours([props.colours[2]], "#000000", "#000000")
    }
  }, []);

  return (
    <div id="drawing-buttons-wrapper">
      <button id="increase-brush-button" className="DrawingUIButton" onClick={() => {if(props.brushSize < 60){ props.setBrushSize(props.brushSize + 2 ) }}}> BRUSH + <div id="brush-up-icon"><BrushUpIcon strokeColour="black" /></div></button>
      <button id="decrease-brush-button" className="DrawingUIButton" onClick={() => {if(props.brushSize > 2){ props.setBrushSize(props.brushSize - 2 ) }}}> BRUSH - <div id="brush-down-icon"><BrushDownIcon strokeColour="black" /></div></button>
      <button id="erase-brush-button" className="DrawingUIButton" onClick={() => props.toggleEraser()}> ERASER <div id="eraser-icon"><EraserIcon strokeColour="black" /></div></button>
      <button id="undo-button" className="DrawingUIButton" onClick={props.undoDrawing}> UNDO <div id="undo-icon"><UndoIcon strokeColour="black" /></div></button>
      <button id="redo-button" className="DrawingUIButton" onClick={props.redoDrawing}> REDO <div id="redo-icon"><RedoIcon strokeColour="black" /></div></button>              
    </div>)
}
function UndoIcon(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="AudioPlayerIcon">
        <defs>
          <marker id="arrowhead" markerWidth="5" markerHeight="5" strokeWidth="0" fill={props.strokeColour}
          refX="0" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" />
          </marker>
        </defs>
        <path fill="none" strokeLinecap="round" strokeWidth="6" stroke={props.strokeColour} markerEnd="url(#arrowhead)"
              d=" M 30,80
                  L 65,80
                  A 15 15 0 1 0 65,28
                  L 30,28
                  " />
    </svg>
  )
}
function RedoIcon(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="AudioPlayerIcon">
        <defs>
          <marker id="arrowhead2" markerWidth="5" markerHeight="5" strokeWidth="0" fill={props.strokeColour}
          refX="0" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" />
          </marker>
        </defs>
        <path fill="none" strokeLinecap="round" strokeWidth="6" stroke={props.strokeColour} markerEnd="url(#arrowhead2)"
              d=" M 70,80
                  L 35,80
                  A 15 15 0 0 1 35,28
                  L 70,28
                  " />
    </svg>
  )
}
function EraserIcon(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="AudioPlayerIcon"
      fill='none'
      stroke={props.strokeColour}
      strokeWidth='3'
      >
        <rect x="10" y="60" width="40" height="20" />
        <polygon points="10,60 50,60 85,20 45,20" fill="yellow" strokeLinejoin="bevel" />
        <polygon points="50,80 50,60 85,20 85,40" fill="yellow" strokeLinejoin="bevel" />
      
    </svg>
  )
}
function BrushUpIcon(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="AudioPlayerIcon"
      fill='none'
      stroke={props.strokeColour}
      strokeWidth='4'
      strokeLinejoin="round"
      >
        <path fill="none" strokeLinecap="round"
              d="M 15,90 L 65,90 L 65,55 L 25,55 L 25,90 L 35,90 L 35,75 M 45,90 L 45,75" />
        <polygon points="25,55 35,45 35,15 40,10 50,10 55,15 55,45 65,55" fill="yellow" />
        <path fill="none" strokeLinecap="round"
              d="M 65,25 L 81,25 M 73,17 L 73,33" />
    </svg>
  )
}
function BrushDownIcon(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="AudioPlayerIcon"
      fill='none'
      stroke={props.strokeColour}
      strokeWidth='4'
      strokeLinejoin="round"
      >
        <path fill="none" strokeLinecap="round"
              d="M 15,90 L 65,90 L 65,55 L 25,55 L 25,90 L 35,90 L 35,75 M 45,90 L 45,75" />
        <polygon points="25,55 35,45 35,15 40,10 50,10 55,15 55,45 65,55" fill="yellow" />
        <path fill="none" strokeLinecap="round"
              d="M 65,25 L 81,25" />
    </svg>
  )
}

