import React, { useState, useEffect, useRef } from 'react';
import './MobileApp.css';
import { fabric } from 'fabric';
import IntroModal from './components/introModal';
import DrawingTools from './components/drawingTools';
import DrawingCanvas from './components/drawingCanvas';

export default function MobileApp() {

  // response update loop timing
  const liveUpdateTime = 5000;

  // modal state
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [currentModalPage, setCurrentModalPage] = useState(0);
  const [introModal, setIntroModal] = useState(null);

  // prompt state
  const [currentPrompt, setCurrentPrompt] = useState("this is a test prompt");

  // current input
  const [inputIsDraw, setInputIsDraw] = useState(false);
  // drawing canvas state
  // drawing settings
  const [brushColour, setBrushColour] = useState("#2436ff");
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

  // my init function to run on app load
  useEffect(() => {
    document.addEventListener('mouseup', saveCanvasState);
    document.addEventListener('touchend', saveCanvasState);
    document.addEventListener('touchcancel', saveCanvasState);
    liveMobileUpdate();
  }, []);

  // update brush colour and cursor on colour change
  useEffect(() => {
    if(drawingCanvasRef.current && !isEraser){
      updateCanvasBrush();
    }  
  }, [brushColour]);

  useEffect(() => {
    if(drawingCanvasRef.current){
      updateCanvasBrush();      
    }    
  }, [brushSize]);

  return (
    <div className="MobileWrapper">

      <div id="prompt-wrapper">
        <p>{currentPrompt}</p>
      </div>

      <div>
        <button id="draw-input-select" className="InputSelectButton" onClick={() => setDrawInput(true)}><b>DRAW</b></button>
        <button id="text-input-select" className="InputSelectButton ActiveInputButton" onClick={() => setDrawInput(false)}><b>WRITE</b></button>
      </div>

      
      <div id="input-frame">
        <div id="input-wrapper">
          <div id="drawing-wrapper">
            <DrawingCanvas 
              brushColour={brushColour}
              brushSize={brushSize}
              setDrawingCanvas={setDrawingCanvas}
              setCurrentCanvasState={setCurrentCanvasState}
              setIsDrawing={setIsDrawing} />
            
            <DrawingTools 
              undoDrawing={undoDrawing}
              redoDrawing={redoDrawing}
              toggleEraser={toggleEraser}
              brushColour={brushColour}
              setBrushColour={setBrushColour}
              setBrushSize={setBrushSize} />
          </div>
          <textarea id="text-input" name="text based prompt response" placeholder="Please type your response here..." />
        </div>
      </div>
      
      

      <button id="submit-response-button" onClick={() => {submitResponse()}}>
        <b>SUBMIT RESPONSE</b>
      </button>

      <IntroModal
        setIntroModal={setIntroModal}
        currentModalPage={currentModalPage}
        setCurrentModalPage={setCurrentModalPage}
        toggleModal={toggleModal} />
    </div>
  )

  // gets triggered when either the intro or info modal are brought up
  function toggleModal(){
    // add and remove event listener that triggers after drawing to save canvas to undo stack
    if(modalIsOpen){
      //document.addEventListener('mouseup', saveCanvasState);
      introModal.hide();
      document.getElementsByClassName("ModalWrapper")[0].style.display = "none";
    } else {
      //document.removeEventListener('mouseup', saveCanvasState);
      introModal.show();
      document.getElementsByClassName("ModalWrapper")[0].style.display = "unset";
    }
    // toggle state
    setModalIsOpen(!modalIsOpen);
  }

  function setDrawInput(changeToDraw){
    if(changeToDraw){
      setInputIsDraw(true);
      document.getElementById("input-wrapper").style.left= "0%";
      document.getElementById("input-wrapper").style.animation = "leftSwipe 1s 1";
      boxShadowAnim(document.getElementById("text-input"), false);
      //document.getElementById("mobile-wrapper").style.height= "100%";
      document.getElementById("draw-input-select").classList.add("ActiveInputButton");
      document.getElementById("text-input-select").classList.remove("ActiveInputButton");
    } else {
      setInputIsDraw(false);
      document.getElementById("input-wrapper").style.left= "-100%";
      document.getElementById("input-wrapper").style.animation = "rightSwipe 1s 1";
      boxShadowAnim(document.getElementById("text-input"), true);
      //document.getElementById("mobile-wrapper").style.height= "calc(100% + 33vw)";
      document.getElementById("draw-input-select").classList.remove("ActiveInputButton");
      document.getElementById("text-input-select").classList.add("ActiveInputButton");
    }
  }
  function updateCanvasBrush(){
    /* drawingCanvasRef.current.freeDrawingBrush.color = brushColour;
    drawingCanvasRef.current.freeDrawingBrush.width = 60; */
    /* if(isEraser){
      drawingCanvasRef.current.freeDrawingCursor = getCustomEraserCursor();
    } else {
      drawingCanvasRef.current.freeDrawingCursor = getCustomCursor();
    } */
  }
  // toggle eraser on/off - save brush if toggled on - reset old brush if toggled off
  function toggleEraser(){
    if(isEraser){
      drawingCanvasRef.current.freeDrawingBrush = savedBrush;
      drawingCanvasRef.current.freeDrawingBrush.width = brushSize;
      drawingCanvasRef.current.freeDrawingBrush.color = brushColour;
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
      let reloadState = drawingCanvasRef.current.toDatalessJSON();
      setCurrentCanvasState(reloadState);
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

  function liveMobileUpdate(){
    fetch(`https://room2.fm/api/getLiveMobileUpdate`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(res => updateFromMobileServerResponse(res.data));
    setTimeout(liveMobileUpdate, liveUpdateTime);
  }
  //update state from latest server info
  function updateFromMobileServerResponse(serverResponse){
    setCurrentPrompt(serverResponse[0][0].currentPrompt); 
  }

  function submitResponse(){
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
      fetch(`https://room2.fm/api/insertLiveImageReflection`, {
        method: 'PUT',
        body: formData
      })
      .then(res => res.json())
      .then(() => {responseSubmittedAnim();});
    } else if(inputIsDraw === false && textInput.value.length > 0) {
      // text input
      let responseText = textInput.value;
      if(responseText.length > 0){
        textInput.value = '';
        fetch(`https://room2.fm/api/insertLiveTextReflection`, {
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({reflection: responseText})
        })
      .then(res => res.json())
      .then(() => {responseSubmittedAnim();});   
      }
    }
  }

  function responseSubmittedAnim(){
    let subButton = document.getElementById("submit-response-button");
    subButton.classList.add("ResponseSubmitted");
    subButton.firstChild.innerHTML = "RESPONSE SUBMITTED";
    setTimeout(() => {
      subButton.classList.remove("ResponseSubmitted");
      subButton.firstChild.innerHTML = "SUBMIT RESPONSE";
    }, 4000);
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

  function boxShadowAnim(element, reverse){
    let animDirection = 'normal';
    if(reverse){animDirection = 'reverse';}
    element.animate([
      {boxShadow: '-4px 0px 5px rgba(0,0,0,0.2)'},
      {boxShadow: '-4px 0px 5px rgba(0,0,0,0.2)', offset: 0.9},
      {boxShadow: '-4px 0px 5px rgba(0,0,0,0)'}
    ], {
      duration: 1000,
      direction: animDirection
    })
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
            fill="${brushColour}"
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
