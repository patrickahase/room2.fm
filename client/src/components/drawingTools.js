import React, { useEffect } from 'react';

export default function DrawingTools(props){

  const drawingToolsStyle = {
    drawingToolsWrapper: {
      backgroundColor: 'var(--comp-col-02)',
      padding: '0 0.5rem 0.5rem 0.5rem',
      position: 'relative'
    },
    brushSizeWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0.5rem 0'
    },
    sizeSliderWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem'
    },
    sliderIcon: {
      height: '12px',
      width: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    sizeSlider: {
      flexGrow: '1'
    },
    buttonsWrapper: {
      display: 'flex',
      height: '3.25rem',
      justifyContent: 'space-between'
    },
    drawingButton: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      border: 'solid 2px var(--comp-col-01)',
      borderRadius: '6px 0px',
      backgroundColor: 'var(--comp-col-02)',
      width: '21%',
      padding: 0
    },
    buttonLabel: {
      fontSize: '12px',
      pointerEvents: 'none',
      color: 'var(--comp-col-01)',
      width: '100%',
      textAlign: 'center'
    },
    buttonIcon: {
      height: '1%',
      width: '100%',
      flexGrow: '1',
      pointerEvents: 'none'
    },
    colourButton: {
      width: '30.5%',
      borderRadius: '6px 0px',
      position: 'relative'
    },
    colourLabel: {
      marginTop: '2px',
      fontSize: '12px',
      textAlign: 'center',
      position: 'absolute',
      width: '100%',
      color: 'var(--comp-col-02)',
      pointerEvents: 'none',
    },
    colourSelector: {
      width: '100%',
      height: '100%',
      border: 'none',
      borderRadius: '6px 0px',
      padding: 0,
      zIndex: '0'
    },
  }

  return (
    <div style={drawingToolsStyle.drawingToolsWrapper}>

      <div style={drawingToolsStyle.brushSizeWrapper}>          
        <div style={drawingToolsStyle.sizeSliderWrapper}>
          <div style={drawingToolsStyle.sliderIcon}><MinusIcon strokeColour="black" /></div>
          <input type="range" style={drawingToolsStyle.sizeSlider} name="brush-size-slider" min="2" max="60" defaultValue="8" onInput={e => props.setBrushSize(e.target.value)} />
          <div style={drawingToolsStyle.sliderIcon}><PlusIcon strokeColour="black" /></div>
        </div>
        <span style={drawingToolsStyle.buttonLabel}>Brush Size</span>
      </div>

      <div style={drawingToolsStyle.buttonsWrapper}>
        <button style={drawingToolsStyle.drawingButton} onClick={e => props.toggleEraser(e)}>
          <span style={drawingToolsStyle.buttonLabel}>Eraser</span>
          <div style={drawingToolsStyle.buttonIcon}><EraserIcon strokeColour="black" /></div>
        </button>
        <button style={drawingToolsStyle.drawingButton} onClick={() => props.undoDrawing()}>
          <span style={drawingToolsStyle.buttonLabel}>Undo</span>
          <div style={drawingToolsStyle.buttonIcon}><UndoIcon strokeColour="black" /></div>
        </button>
        <button style={drawingToolsStyle.drawingButton} onClick={() => props.redoDrawing()}>
          <span style={drawingToolsStyle.buttonLabel}>Redo</span>
          <div style={drawingToolsStyle.buttonIcon}><RedoIcon strokeColour="black" /></div>
        </button>
        <div style={drawingToolsStyle.colourButton}>
          <span style={drawingToolsStyle.colourLabel}>Brush colour</span>
          <input type="color" style={drawingToolsStyle.colourSelector} className="DrawingUIButton" name="col1Select" defaultValue={props.brushColour} onInput={e => props.setBrushColour(e.target.value)} />
        </div>        
      </div>        
    </div>)
}
function UndoIcon(props){
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      x="0"
      y="0"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrowhead" markerWidth="5" markerHeight="5" strokeWidth="0" fill={props.strokeColour}
          refX="0" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" />
          </marker>
        </defs>
        <path fill="none" strokeLinecap="round" strokeWidth="4" stroke={props.strokeColour} markerEnd="url(#arrowhead)"
              d=" M 30,70
                  L 55,70
                  A 15 15 0 1 0 55,30
                  L 40,30
                  " />
    </svg>
  )
}
function RedoIcon(props){
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      x="0"
      y="0"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrowhead2" markerWidth="5" markerHeight="5" strokeWidth="0" fill={props.strokeColour}
          refX="0" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" />
          </marker>
        </defs>
        <path fill="none" strokeLinecap="round" strokeWidth="4" stroke={props.strokeColour} markerEnd="url(#arrowhead2)"
              d=" M 70,70
                  L 45,70
                  A 15 15 0 0 1 45,30
                  L 60,30
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
function MinusIcon(props){
  return (
    <svg
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      fill='black'
      stroke={props.strokeColour}
      >
        <path fill="none" strokeWidth="2"
              d=" M 0,5
                  L 10,5 " />
      
    </svg>
  )
}
function PlusIcon(props){
  return (
    <svg
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      fill='black'
      stroke={props.strokeColour}
      >
        <path fill="none" strokeWidth="2"
              d=" M 0,5
                  L 10,5
                  M 5,0
                  L 5,10
                  " />
      
    </svg>
  )
}

