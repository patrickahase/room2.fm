import React, { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';

import './App.css';

import DesktopApp from './components/desktopApp';
import { cyclePresets, cycleDates } from './content/cyclePresets';
import { artsHouseDate } from './components/timeCalc';

export default function App() {
  // is accessed on mobile
  const onMobile = window.matchMedia('all and (any-hover: none)').matches;
  // current window size
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  // is the intro modal open
  const [modalIsOpen, setModalIsOpen] = useState(true);
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
  const [isEraser, setIsEraser] = useState(false);
  const [savedBrush, setSavedBrush] = useState(null);
  // undo/redo settings
  const maxUndo = 10;
  const [drawingCanvas, setDrawingCanvas] = useState(null);
  var drawingCanvasRef = useRef(drawingCanvas);
  const [currentCanvasState, setCurrentCanvasState] = useState(null);
  var currentCanvasStateRef = useRef(currentCanvasState);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  var undoStackRef = useRef(undoStack);
  var redoStackRef = useRef(redoStack);
  // is focus mode active
  const [focusMode, setFocusMode] = useState(false);

  // my init function to run on app load
  useEffect(() => {
    // set up to update window dimensions on resize event
    setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', () => {
      setWindowSize([window.innerWidth, window.innerHeight])});
    //updateCyclePosition();
  }, []);

  useEffect(() => {isDrawingRef.current = isDrawing}, [isDrawing]);
  useEffect(() => {drawingCanvasRef.current = drawingCanvas}, [drawingCanvas]);
  useEffect(() => {currentCanvasStateRef.current = currentCanvasState}, [currentCanvasState]);
  useEffect(() => {undoStackRef.current = undoStack}, [undoStack]);
  useEffect(() => {redoStackRef.current = redoStack}, [redoStack]);

  return (
    <div id="global-wrapper">
      {onMobile
      ?<div>I'm on Mobile</div>
      :<DesktopApp      
        width={windowSize[0]}
        height={windowSize[1]}
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
        setIsDrawing={setIsDrawing}
        cyclePreset={cyclePresets[cyclePos]}
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
    } else {
      document.removeEventListener('mouseup', saveCanvasState);
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
      drawingCanvas.freeDrawingBrush = savedBrush;
      document.getElementById("erase-brush-button").classList.remove("Active");
    } else {
      setSavedBrush(drawingCanvas.freeDrawingBrush);
      drawingCanvas.freeDrawingBrush = new fabric.EraserBrush(drawingCanvas);
      drawingCanvas.freeDrawingBrush.width = brushSize;
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
  function updateCyclePosition(){
    // first grab current UTC
    let currentDate = Date.now();
    console.log(currentDate);
    console.log(Date.UTC(currentDate));
    // then compare to list of changeover times
    for(let i = 0; i < cycleDates.length; i++){
      if(currentDate < cycleDates[i].endTime){
        setCurrentCycle(i);
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
      formData.append('upload', imageFile, 'cycle_'+ (cyclePos+1) +'_response.png');
      fetch(`http://localhost:33061/api/insertImageReflectionGetResponses`, {
        method: 'PUT',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        try{
          for(const response of res.data) {
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
        /* fetch(`http://localhost:33061/api/insertTextReflectionGetResponses`, { */
        fetch(`http://localhost:33061/api/testLookup`, {
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
          mode: 'cors',
          // we add one to cycle pos to keep start from 1
          body: JSON.stringify({reflection: responseText, cycleTable: cyclePos+1})
        })
      .then(res => res.json())
      .then(res => {
        try{
          for(const response of res.data) {
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
