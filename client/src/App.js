import React, { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';

import './App.css';

import DesktopApp from './components/desktopApp';

export default function App() {
  // is accessed on mobile
  const [onMobile, setOnMobile] = useState(window.matchMedia('all and (any-hover: none)').matches);
  // current window size
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  // is the intro modal open
  const [modalIsOpen, setModalIsOpen] = useState(true);
  // details about current day preset - song, visuals, prompt etc
  const [dayDetails, setDayDetails] = useState({
    introStatement: "if you're seeing this the server is having some trouble",
    prompt: "if you're seeing this the server is having some trouble",
    trackDetails: "if you're seeing this the server is having some trouble",
    trackLink: "",
    artistLink: "",
    trackSrc: "",
    shaderName: "",
    dbTable: ""
  });
  // other responses from database
  const [responseData, setResponseData] = useState([]);
  // current drawing colours
  const [currentColours, setCurrentColours] = useState([
    "#222323",
    "#5252ff",
    "#b5e877"
  ]);
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
    /* window.addEventListener('mousemove', () => {
      console.log(isDrawing)}); */
      /* document.addEventListener('mouseup', () => saveCanvasState()); */
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
        colours={currentColours}
        setCurrentColours={setCurrentColours}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        toggleEraser={toggleEraser}
        setDrawingCanvas={setDrawingCanvas}
        setCurrentCanvasState={setCurrentCanvasState}
        undoDrawing={undoDrawing}
        redoDrawing={redoDrawing}
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
}
