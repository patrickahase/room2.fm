import React, { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';

import './App.css';

import DesktopApp from './components/desktopApp';
import MobileApp from './components/mobileApp';
import {artistPresets} from './content/preloadArrays.js';


export default function App(){
  // is accessed on mobile
  const onMobile = window.matchMedia('all and (any-hover: none)').matches;
  //const onMobile = false;
  // current window size
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  // is the intro modal open
  //const [modalIsOpen, setModalIsOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  // current modal page - 0 is shut
  const [currentModalPage, setCurrentModalPage] = useState(1);
  // intro modal instance
  const [introModal, setIntroModal] = useState(null);
  // current artist
  const [currentArtist, setCurrentArtist] = useState(<>Take a deep breath, then continue to breathe along with the rhythm of the track.<br/>Draw or write your interpretation of the textures you hear.</>);
  // current text prompt
  const [currentPrompt, setCurrentPrompt] = useState(<>Take a deep breath, then continue to breathe along with the rhythm of the track.<br/>Draw or write your interpretation of the textures you hear.</>);
  // if false it's assumed to be text instead
  const[inputIsDraw, setInputIsDraw] = useState(false);
  // other responses from database
  const [responseData, setResponseData] = useState([]);
  // last response id from database
  const [lastResponseID, setLastResponseID] = useState(0);
  var lastResponseIDRef = useRef(lastResponseID);
  useEffect(() => {lastResponseIDRef.current = lastResponseID}, [lastResponseID]);
  // response update loop timing
  const liveUpdateTime = 5000;
  // current drawing colours
  const [currentColours, setCurrentColours] = useState([
    "#222323",
    "#5252ff",
    "#b5e877"
  ]);
  const[selectedColour, setSelectedColour] = useState(0);
  var selectedColourRef = useRef(selectedColour);
  useEffect(() => {selectedColourRef.current = selectedColour}, [selectedColour]);
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

  //audio source for text react
  const [audioCtx, setAudioCtx] = useState(null);
  const [analysing, setAnalysing] = useState(false);
  // handle prompt change
  const[isCountdown, setIsCountdown] = useState(false);

  const [responseTime, setResponseTime] = useState(0);

  // my init function to run on app load
  useEffect(() => {
    // set up to update window dimensions on resize event
    setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', () => {
      setWindowSize([window.innerWidth, window.innerHeight])});
/* !!! Remove for modal trigger */
    document.addEventListener('mouseup', saveCanvasState);
    document.addEventListener('touchend', saveCanvasState);
    document.addEventListener('touchcancel', saveCanvasState);
    if(!onMobile){
      liveUpdate();
    }
  }, []);

  // update brush colour and cursor on colour change
  useEffect(() => {
    if(drawingCanvasRef.current && !isEraser){
      updateCanvasBrush();
    }    
  }, [selectedColour]);

  useEffect(() => {
    if(drawingCanvasRef.current){
      updateCanvasBrush();      
    }    
  }, [brushSize]);

  return (
    <div id="global-wrapper">
      {onMobile
      ? 
        <MobileApp
          responseTime={responseTime}
          mobile={onMobile}  
          modalIsOpen={modalIsOpen}
          setIntroModal={setIntroModal}
          currentModalPage={currentModalPage}
          setCurrentModalPage={setCurrentModalPage}
          toggleModal={toggleModal}
          currentPrompt={currentPrompt}
          currentArtist={currentArtist}
          submitResponse={submitResponse}
          setInput={setInput}
          setIsDrawing={setIsDrawing}
          colours={currentColours}
          setCurrentColours={setCurrentColours}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          toggleEraser={toggleEraser}
          setDrawingCanvas={setDrawingCanvas}
          setCurrentCanvasState={setCurrentCanvasState}
          undoDrawing={undoDrawing}
          redoDrawing={redoDrawing} />
      : 
        <DesktopApp 
          mobile={onMobile}
          modalIsOpen={modalIsOpen}
          currentModalPage={currentModalPage}
          setCurrentModalPage={setCurrentModalPage}
          toggleModal={toggleModal}
          setIntroModal={setIntroModal}
          toggleFocus={toggleFocus}
          currentPrompt={currentPrompt}
          currentArtist={currentArtist}
          width={windowSize[0]}
          height={windowSize[1]}
          submitResponse={submitResponse}
          responseData={responseData}
          setInput={setInput}
          setIsDrawing={setIsDrawing}
          colours={currentColours}
          selectedColour={selectedColour}
          setSelectedColour={setSelectedColour}
          setCurrentColours={setCurrentColours}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          toggleEraser={toggleEraser}
          updateCanvasBrush={updateCanvasBrush}
          setDrawingCanvas={setDrawingCanvas}
          setCurrentCanvasState={setCurrentCanvasState}
          undoDrawing={undoDrawing}
          redoDrawing={redoDrawing}
          audioCtx={audioCtx}
          setAudioCtx={setAudioCtx}
          analysing={analysing}
          />
      }
    </div>
  )

  // gets triggered when either the intro or info modal are brought up
  function toggleModal(){
    // add and remove event listener that triggers after drawing to save canvas to undo stack
    if(modalIsOpen){
      document.addEventListener('mouseup', saveCanvasState);
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

  // get latest info from server
  function liveUpdate(){
    fetch(`https://room2.fm/api/getLiveUpdate`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ lastResponseID: lastResponseIDRef.current})
    })
      .then(res => res.json())
      .then(res => updateFromServerResponse(res.data));
    setTimeout(liveUpdate, liveUpdateTime)
  }

  //update state from latest server info
  function updateFromServerResponse(serverResponse){
    // set up array to push other responses to
    let returnedResponses = [];
    if(currentArtist !== serverResponse[0][0].currentArtist){
      console.log("check")
      setCurrentArtist(serverResponse[0][0].currentArtist);
    }
   

    setCurrentPrompt(serverResponse[0][0].currentPrompt);
    if(serverResponse[1].length){
      serverResponse[1].forEach(response => {
        returnedResponses.push([response.RESPONSE, response.RESPONSE_TYPE]);
        setLastResponseID(response.id);
      });
      setResponseData(returnedResponses);
    }    
  }

  function submitResponse(){
    let responseTimer;
    let textInput = document.getElementById('text-input');
    // check if a text or an image response
    if(inputIsDraw === true && undoStack.length > 0){
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
      formData.append('upload', imageFile);
      responseTimer = Date.now();
      fetch(`https://room2.fm/api/insertLiveImageReflection`, {
        method: 'PUT',
        body: formData
      })
      .then(res => res.json())
      .then(() => {setResponseTime(responseTimer - Date.now())});
    } else if(inputIsDraw === false && textInput.value.length > 0) {
      // text input
      let responseText = textInput.value;
      if(responseText.length > 0){
        textInput.value = '';
        responseTimer = Date.now();
        fetch(`https://room2.fm/api/insertLiveTextReflection`, {
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({reflection: responseText})
        })
      .then(res => res.json())
      .then(() => {setResponseTime(responseTimer - Date.now())});   
      }
    }
  }

  // to change between draw and write - true = draw - false = text
  function setInput(changeToDraw){
    if(changeToDraw){
      setInputIsDraw(true);
      if(onMobile){
        document.getElementById("input-wrapper").style.left= "0%";
        document.getElementById("mobile-wrapper").style.height= "100%";
      }
      else{
        document.getElementById("input-wrapper").style.top= "-100%";
        getCSSRule('#input-wrapper::after').style.top = "calc(50% + 4px)";
      }
      document.getElementById("draw-input-select").classList.add("ActiveInputButton");
      document.getElementById("text-input-select").classList.remove("ActiveInputButton");
    } else {
      setInputIsDraw(false);
      if(onMobile){
        document.getElementById("input-wrapper").style.left= "-100%";
        document.getElementById("mobile-wrapper").style.height= "calc(100% + 33vw)";
      }
      else{
        document.getElementById("input-wrapper").style.top= "0%";
        getCSSRule('#input-wrapper::after').style.top = "4px";
      }
      document.getElementById("draw-input-select").classList.remove("ActiveInputButton");
      document.getElementById("text-input-select").classList.add("ActiveInputButton");
    }
  }

  function updateCanvasBrush(){
    drawingCanvasRef.current.freeDrawingBrush.color = currentColours[selectedColourRef.current];
    drawingCanvasRef.current.freeDrawingBrush.width = brushSize;
    if(isEraser){
      drawingCanvasRef.current.freeDrawingCursor = getCustomEraserCursor();
    } else {
      drawingCanvasRef.current.freeDrawingCursor = getCustomCursor();
    }
  }

  // toggle eraser on/off - save brush if toggled on - reset old brush if toggled off
  function toggleEraser(){
    if(isEraser){
      drawingCanvasRef.current.freeDrawingBrush = savedBrush;
      drawingCanvasRef.current.freeDrawingBrush.width = brushSize;
      drawingCanvasRef.current.freeDrawingBrush.color = currentColours[selectedColour];
      drawingCanvasRef.current.freeDrawingCursor = getCustomCursor();
      document.getElementById("erase-brush-button").classList.remove("Active");
    } else {
      setSavedBrush(drawingCanvasRef.current.freeDrawingBrush);
      drawingCanvasRef.current.freeDrawingBrush = new fabric.EraserBrush(drawingCanvasRef.current);
      drawingCanvasRef.current.freeDrawingBrush.width = brushSize;
      drawingCanvasRef.current.freeDrawingCursor = getCustomEraserCursor();
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
    console.log(undoStack);
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
  // on prompt update give a timer
  function startPromptCountdown(newPrompt){
    if(!isCountdown){
      setIsCountdown(true);
      let promptTimer = document.getElementById("prompt-end-timer-wrapper").children[0];
      let promptTimerOverlay = document.getElementById("prompt-end-timer-wrapper").children[1];
      promptTimerOverlay.style.transition = "60s linear";
      promptTimerOverlay.style.width = "100%";
      let countdown = 60;
      promptTimer.innerHTML = "this prompt will change in " + countdown + " seconds...";
      let x = setInterval(() => {    
        countdown -= 1;
        promptTimer.innerHTML = "this prompt will change in " + countdown + " seconds...";
        if (countdown < 1) {
          clearInterval(x);
          promptTimerOverlay.style.transition = "0s linear";
          promptTimerOverlay.style.width = "0%";
          promptTimer.innerHTML = "";
          setCurrentPrompt(newPrompt);
          setIsCountdown(false);   
        }
      }, 1000);
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

  function getCustomEraserCursor() {
    const circle = 
      `<svg height="${brushSize}"
            viewBox="0 0 ${brushSize * 2} ${brushSize * 2}"
            width="${brushSize}"
            xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%"
                cy="50%"
                fill="#000000"
                r="${brushSize}" />
        <circle cx="50%"
                cy="50%"
                fill="#ffffff"
                r="${brushSize-2}" />
      </svg>`;      
    return `url(data:image/svg+xml;base64,${window.btoa(circle)}) ${brushSize / 2} ${brushSize / 2}, move`;
  }

  function getCustomCursor() {
    const circle = 
      `<svg height="${brushSize}"
            fill="${currentColours[selectedColourRef.current]}"
            viewBox="0 0 ${brushSize * 2} ${brushSize * 2}"
            width="${brushSize}"
            xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%"
                cy="50%"
                r="${brushSize}" />
      </svg>`;      
    return `url(data:image/svg+xml;base64,${window.btoa(circle)}) ${brushSize / 2} ${brushSize / 2}, move`;
  }
}

