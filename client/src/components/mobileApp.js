import React, {useEffect} from 'react';
import IntroModal from './introModal';
import DrawingCanvas from './drawingCanvas';
import DrawingTools from './drawingTools';


export default function MobileApp(props){
  useEffect(() => {
    console.log(props.responseTime) 
  }, [props.responseTime]);
  return (
    <div id="mobile-wrapper">
      {props.modalIsOpen
        ? <IntroModal 
            mobile={props.mobile}
            setIntroModal={props.setIntroModal}
            toggleModal={props.toggleModal}
            currentModalPage={props.currentModalPage}
            setCurrentModalPage={props.setCurrentModalPage} />
        : <>

        {/* prompt */}
        {/* <div id="mobile-header-wrapper">          
          <p>//room2.fm\\</p>
          <button className="InputSelectButton" onClick={props.submitResponse}>info</button>
        </div> */}
        <div id="current-prompt-wrapper">          
          <p id="current-prompt">
            {props.currentPrompt}
            {/* <span>{props.responseTime}</span> */}
          </p>
        </div>
        {/* Submit Button */}
        <button id="mobile-response-submit-button" className="InputSelectButton" onClick={props.submitResponse}>
          <span>SUBMIT RESPONSE</span>                
        </button>
        {/* input select */}
        <div id="input-select-wrapper">
          <button id="draw-input-select" className="InputSelectButton" onClick={() => props.setInput(true)}>draw</button>
          <button id="text-input-select" className="InputSelectButton ActiveInputButton" onClick={() => props.setInput(false)}>write</button>
        </div>
        {/* end timer */}
        {/* <div id="prompt-end-timer-wrapper">
          <div id="prompt-end-timer">this prompt will change in 60 seconds...</div>
          <div id="prompt-end-timer-overlay" />
        </div> */}
        {/* input section */}
        <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
          <div id="input-wrapper"> 
            <DrawingCanvas 
                brushColour={props.colours[0]}
                brushSize={props.brushSize}
                setDrawingCanvas={props.setDrawingCanvas}
                setCurrentCanvasState={props.setCurrentCanvasState}
                setIsDrawing={props.setIsDrawing} />             
            <textarea id="text-input" name="text based prompt response" placeholder="Please type your response here..." />
          </div>
          <DrawingTools
            undoDrawing={props.undoDrawing}
            redoDrawing={props.redoDrawing}
            toggleEraser={props.toggleEraser}
            colours={props.colours}
            setCurrentColours={props.setCurrentColours}
            setBrushSize={props.setBrushSize}
            mobile={props.mobile} />
        </div>
        
        </>}
    </div>
  )
}
