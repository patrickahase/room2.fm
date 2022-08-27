import React, { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';

import './App.css';

import DesktopApp from './components/desktopApp';
import { cyclePresets, cycleDates } from './content/cyclePresets';

export default function App() {
  // is accessed on mobile
  const onMobile = window.matchMedia('all and (any-hover: none)').matches;
  // current window size
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  // intro modal instance
  const [introModal, setIntroModal] = useState(null);
  // is the intro modal open
  const [modalIsOpen, setModalIsOpen] = useState(true);
  // has the track updated
  const [trackHasUpdated, setTrackHasUpdated] = useState(false);
  // check update interval
  let checkEndInterval;
  // current cycle - gets updated on page load
  const [currentCycle, setCurrentCycle] = useState(0);
  // tide data - gets updated on page load
  const [tideData, setTideData] = useState({
    tideUp: -1.0,
    tideHeight: 0.8
  });
  // get current position in cycle
  const cyclePos = 0;
  /* const cyclePos = asyncCycleCalc(); */
  /* if false it's assumed to be text instead */
  const[inputIsDraw, setInputIsDraw] = useState(false);
  // other responses from database
  const [responseData, setResponseData] = useState([]);
  // current drawing colours
  const [currentColours, setCurrentColours] = useState(cyclePresets[currentCycle].colours);
  // drawing settings
  const [brushSize, setBrushSize] = useState(8);
  const [isDrawing, setIsDrawing] = useState(false);
  var isDrawingRef = useRef(isDrawing);
  useEffect(() => {isDrawingRef.current = isDrawing}, [isDrawing]);
  const [isEraser, setIsEraser] = useState(false);
  const [savedBrush, setSavedBrush] = useState(null);
  // undo/redo settings
  const maxUndo = 10;
  const [drawingCanvas, setDrawingCanvas] = useState(null);
  var drawingCanvasRef = useRef(drawingCanvas);
  useEffect(() => {drawingCanvasRef.current = drawingCanvas}, [drawingCanvas]);
  const [currentCanvasState, setCurrentCanvasState] = useState(null);
  var currentCanvasStateRef = useRef(currentCanvasState);
  useEffect(() => {currentCanvasStateRef.current = currentCanvasState}, [currentCanvasState]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  var undoStackRef = useRef(undoStack);
  var redoStackRef = useRef(redoStack);
  useEffect(() => {undoStackRef.current = undoStack}, [undoStack]);
  useEffect(() => {redoStackRef.current = redoStack}, [redoStack]);
  // is focus mode active
  const [focusMode, setFocusMode] = useState(false);

  // my init function to run on app load
  useEffect(() => {
    // set up to update window dimensions on resize event
    setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', () => {
      setWindowSize([window.innerWidth, window.innerHeight])});
    updateCyclePosition();
  }, []);

  
  useEffect(() => {
    setCurrentColours(cyclePresets[currentCycle].colours);
  }, [currentCycle])

  return (
    <div id="global-wrapper">
      {onMobile
      ?
        <div id="mobile-wrapper">
          <span id="mobile-text">
            Unfortunately room2.fm is currently not able to operate on mobile devices due to technical restrictions. 
            Please try again on a desktop or laptop computer if you are able to.
          </span>
        </div>
      :
        <DesktopApp      
          width={windowSize[0]}
          height={windowSize[1]}
          modalIsOpen={modalIsOpen}
          trackHasUpdated={trackHasUpdated}
          toggleModal={toggleModal}
          setIntroModal={setIntroModal}
          setIsDrawing={setIsDrawing}
          cyclePreset={cyclePresets[currentCycle]}
          currentCycle={currentCycle}
          setCurrentCycle={setCurrentCycle}
          tideData={tideData}
          setInput={setInput}
          colours={currentColours}
          setCurrentColours={setCurrentColours}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          toggleEraser={toggleEraser}
          setDrawingCanvas={setDrawingCanvas}
          setCurrentCanvasState={setCurrentCanvasState}
          undoDrawing={undoDrawing}
          redoDrawing={redoDrawing}
          submitResponse={submitResponse}
          responseData={responseData}
          toggleFocus={toggleFocus}
          />
      }
    </div>
  )
  
  // gets triggered when either the intro or info modal are brought up
  function toggleModal(){
    // add and remove event listener that triggers after drawing to save canvas to undo stack
    if(modalIsOpen){
      document.addEventListener('mouseup', saveCanvasState);
      //console.log(introModal)
      introModal.hide();
      document.getElementById("AOC-modal").style.display = "none";
    } else {
      document.removeEventListener('mouseup', saveCanvasState);
      introModal.show();
      document.getElementById("AOC-modal").style.display = "unset";
    }
    // toggle state
    setModalIsOpen(!modalIsOpen);
  }
  // to change between draw and write - true = draw - false = text
  function setInput(changeToDraw){
    if(changeToDraw){
      setInputIsDraw(true);
      document.getElementById("drawing-canvas-wrapper").style.zIndex = "6";
      document.getElementById("draw-input-select").classList.add("ActiveInputButton");
      document.getElementById("drawing-tools-wrapper").style.right = "-25vh";
      document.getElementById("drawing-buttons-wrapper").style.left = "-15vh";
      document.getElementById("text-input-select").classList.remove("ActiveInputButton");
    } else {
      setInputIsDraw(false);
      document.getElementById("drawing-canvas-wrapper").style.zIndex = "4";
      document.getElementById("draw-input-select").classList.remove("ActiveInputButton");
      document.getElementById("drawing-tools-wrapper").style.right = "";
      document.getElementById("drawing-buttons-wrapper").style.left = "";
      document.getElementById("text-input-select").classList.add("ActiveInputButton");
    }
  }

  // toggle eraser on/off - save brush if toggled on - reset old brush if toggled off
  function toggleEraser(){
    if(isEraser){
      drawingCanvasRef.current.freeDrawingBrush = savedBrush;
      document.getElementById("erase-brush-button").classList.remove("Active");
    } else {
      setSavedBrush(drawingCanvasRef.current.freeDrawingBrush);
      console.log(drawingCanvasRef.current.freeDrawingBrush);
      drawingCanvasRef.current.freeDrawingBrush = new fabric.EraserBrush(drawingCanvasRef.current);
      drawingCanvasRef.current.freeDrawingBrush.width = brushSize;
      /* drawingCanvasRef.current.freeDrawingBrush.color = "#00000000"; */
      document.getElementById("erase-brush-button").classList.add("Active");
    }
    setIsEraser(!isEraser);
  }
  // undo/redo functions
  // run on mouse up to save current canvas state to undo stack and then toggle isDrawing off
  function saveCanvasState(){
    // only run if mouse up is occuring after a drawing action
    if(isDrawingRef.current){
      // get version of undo stack to change
      let newUndoStack = undoStackRef.current;
      // drop oldest undo if over max undo count
      if(newUndoStack.length === maxUndo){ newUndoStack.shift(); }
      // add last current state stored before updating it to store the new state
      newUndoStack.push(currentCanvasStateRef.current);
      setCurrentCanvasState(drawingCanvasRef.current.toDatalessJSON());
      // update undo stack into state, remove redo stack and then toggle isDrawing off
      setUndoStack(newUndoStack);
      setRedoStack([]);
      setIsDrawing(false);
    }
  }
  function undoDrawing(){
    // if states left to undo
    if(undoStack.length > 0){
      // store state to come back to
      let newCanvasState = currentCanvasState;
      // push current state to redo stack
      let newRedoStack = redoStackRef.current;
      newRedoStack.splice(newRedoStack.length, 0, drawingCanvasRef.current.toDatalessJSON());
      setRedoStack(newRedoStack);
      // pop previous state from state stack
      let newUndoStack = undoStackRef.current;
      let newState = newUndoStack.pop();
      // update to previous states and both stacks
      setCurrentCanvasState(newState);
      setUndoStack(newUndoStack);
      // update actual canvas
      drawingCanvas.loadFromJSON(newCanvasState);
    }
  }
  function redoDrawing(){
    // if states left to redo
    if(redoStack.length > 0){
      // pop new state from redo stack
      let newRedoStack = redoStackRef.current;
      let newCanvasState = newRedoStack.pop();
      // push current state to undo stack
      let newUndoStack = undoStackRef.current;
      newUndoStack.push(currentCanvasStateRef.current);
      setUndoStack(newUndoStack);
      // update current state
      setCurrentCanvasState(drawingCanvas.toDatalessJSON());
      setRedoStack(newRedoStack);
      // update actual canvas
      drawingCanvas.loadFromJSON(newCanvasState);      
    }
  }
  
  // if it overshoots it won't return anything
  //checking if it's within half an hour of sunset - write a function in here
  function updateCyclePosition(){
    // first grab current UTC
    let currentDate = Date.now();
    var halfHour = 30 * 60 * 1000; 
    // then compare to list of changeover times
    for(let i = 0; i < cycleDates.length; i++){
      // check current time vs the end of the cycle, if before the end time then set the cycle int and break the for loop
      if(currentDate < cycleDates[i].endTime){
        setCurrentCycle(i); 
        if (cycleDates[i].endTime - currentDate < halfHour) {
          checkEndInterval = setInterval(checkEnd(cycleDates[i].endTime), 300000);
        } 
        for(let k = 0; k < cycleDates[i].tidalData.length; k++){
          if(currentDate < cycleDates[i].tidalData[k].tideEnd){
            setTideData({
              tideUp: cycleDates[i].tidalData[k].tideUp,
              tideHeight: cycleDates[i].tidalData[k].tideHieght
            })
            break; 
          }
        }
        break; 
      }
    }
  }

  function checkEnd(end) {
    var updatedTime = Date.now();
    if (updatedTime >= end) {
      clearInterval(checkEndInterval);
      setTrackHasUpdated(true);
      return (
      <>
      <span>
        The selected track has been updated. Refresh the page to listen and respond to the new music and prompts.
      </span>
      </>
      )
    }

  }
  function submitResponse(){
    // set up array to push other responses to
    let returnedResponses = [];
    // check if a text or an image response
    if(inputIsDraw){
      //image input
      let imageInput = document.getElementById('drawing-canvas');
      var dataURL = imageInput.toDataURL({
        format: 'png',
        left: 0,
        top: 0,
        width: imageInput.width,
        height: imageInput.height
      });
      const formData = new FormData();
      let imageFile = dataURLtoFile(dataURL, 'response.png');
      drawingCanvas.clear();
      // we add one to cycle pos to keep start from 1
      formData.append('upload', imageFile, 'cycle_'+ (currentCycle) +'_response.png');
      fetch(`https://room2.fm/api/insertImageReflectionGetResponses`, {
        method: 'PUT',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        try{
          for(const response of res.data[0]) {
            console.log(response);
            returnedResponses.push([response.RESPONSE, response.RESPONSE_TYPE]);
          }
          setResponseData(returnedResponses);
        } catch(e) {
          // if response not the data
          console.log(e);
        }
        });
    } else {
      // text input
      let textInput = document.getElementById('text-input');
      let responseText = textInput.value;
      if(responseText.length > 0){
        textInput.value = '';
        fetch(`https://room2.fm/api/insertTextReflectionGetResponses`, {
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
          mode: 'cors',
          // we add one to cycle pos to keep start from 1
          body: JSON.stringify({reflection: responseText, cycleTable: currentCycle})
        })
      .then(res => res.json())
      .then(res => {
        try{
          for(const response of res.data[0]) {
            console.log(response);
            returnedResponses.push([response.RESPONSE, response.RESPONSE_TYPE]);         
          }
          setResponseData(returnedResponses);
        } catch(e) {
          // if response not the data
          console.log(e);
        }
        });      
      }
    }
  }

  function toggleFocus(){
    let textResponseRule = getCSSRule('.TextResponseBox');
    let imageResponseRule = getCSSRule('.ImageResponseBox');
    if(!focusMode){
      setFocusMode(true);
      textResponseRule.style.backgroundColor = "rgb(31, 33, 28)";
      textResponseRule.style.border = "solid white 1px";
      imageResponseRule.style.backgroundColor = "white";
      imageResponseRule.style.border = "solid rgb(31, 33, 28) 1px";
    } else {
      setFocusMode(false);
      textResponseRule.style.backgroundColor = "";
      textResponseRule.style.border = "";
      imageResponseRule.style.backgroundColor = "";
      imageResponseRule.style.border = "";
    }
  }

  function dataURLtoFile(dataurl, filename){
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime
    });
  }

  function getCSSRule(ruleName) {
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
