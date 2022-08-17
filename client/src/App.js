import './App.css';
import React, { Component, useEffect, useState, useRef } from 'react';
import DesktopApp from './components/desktopApp';
import MobileApp from './components/mobileApp';
import {artistPresets} from './content/preloadArrays.js';
import { fabric } from 'fabric';

export default function App(){
  // is accessed on mobile
  const onMobile = window.matchMedia('all and (any-hover: none)').matches;
  // current window size
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  // is the intro modal open
  //const [modalIsOpen, setModalIsOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // current text prompt
  const [currentPrompt, setCurrentPrompt] = useState("Test Prompt")
  // if false it's assumed to be text instead
  const[inputIsDraw, setInputIsDraw] = useState(false);
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

  // handle prompt change
  const[isCountdown, setIsCountdown] = useState(false);

  // my init function to run on app load
  useEffect(() => {
    // set up to update window dimensions on resize event
    setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', () => {
      setWindowSize([window.innerWidth, window.innerHeight])});
  }, []);

  return (
    <div id="global-wrapper">
      {onMobile
      ? 
        <MobileApp
          mobile={onMobile}  
          modalIsOpen={modalIsOpen}
          toggleModal={toggleModal}
          currentPrompt={currentPrompt}
          artistPresets={artistPresets[0]}
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
          toggleModal={toggleModal}
          toggleFocus={toggleFocus}
          currentPrompt={currentPrompt}
          artistPresets={artistPresets[0]}
          width={windowSize[0]}
          height={windowSize[1]}
          submitResponse={submitResponse}
          responseData={responseData}
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

  // to change between draw and write - true = draw - false = text
  function setInput(changeToDraw){
    if(changeToDraw){
      setInputIsDraw(true);
      document.getElementById("drawing-canvas-wrapper").style.zIndex = "6";
      document.getElementById("draw-input-select").classList.add("ActiveInputButton");
      document.getElementById("text-input-select").classList.remove("ActiveInputButton");
    } else {
      setInputIsDraw(false);
      document.getElementById("drawing-canvas-wrapper").style.zIndex = "4";
      document.getElementById("draw-input-select").classList.remove("ActiveInputButton");
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
      /* formData.append('upload', imageFile, 'cycle_'+ (cyclePos+1) +'_response.png'); */
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
          /* body: JSON.stringify({reflection: responseText, cycleTable: cyclePos+1}) */
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

export class App2 extends Component {
  constructor() {
    super()
    this.state = {
      // is on mobile
      mobile: window.matchMedia('all and (any-hover: none)').matches,

      width: window.innerWidth,
      height: window.innerHeight,

      // turn on/off different layers
      modalIsOpen: true,

      // schedule data
      currentArtist: null,
      currentPrompt: null,
      promptType: 'draw',
      promptCountdown: false,
      emoji1: require("./content/emojis/alien.png"),
      emoji2: require("./content/emojis/alien.png"),
      emoji3: require("./content/emojis/alien.png"),
      // how often it updates
      // let's start at 5 sec
      scheduleLoopTime: 5000,

      // Response Data
      responsesToDisplay: false,
      unseenResponses: [],
      lastResponseID: 0,
      drawingResponse: false,

      // undo/redo settings
      maxUndo: 10,
      drawingCanvas: null,
      redoStack: [],
      stateStack: [],
      currentCanvasState: null,

      // ui & painter palette
      colours: {
        colour1: "#222323",
        colour2: "#5252ff",
        colour3: "#b5e877"},      
      
      // drawing settings
      brushSize: 8,

      isDrawing: false,
      isEraser: false,
      savedBrush: null,

      focusMod: false
    }
    // bind func's to this
    this.setCanvas = this.setCanvas.bind(this);
    this.saveCanvasState = this.saveCanvasState.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateEmojis = this.updateEmojis.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.getNextResponse = this.getNextResponse.bind(this);
    this.submitResponse = this.submitResponse.bind(this);
    this.setIsDrawing = this.setIsDrawing.bind(this);
    this.toggleEraser = this.toggleEraser.bind(this);
    this.undoDrawing = this.undoDrawing.bind(this);
    this.redoDrawing = this.redoDrawing.bind(this);
    this.setDrawInput = this.setDrawInput.bind(this);
    this.setWriteInput = this.setWriteInput.bind(this);
    this.startPromptCountdown = this.startPromptCountdown.bind(this);
  }
  render() {
    return (
      <div id="global-wrapper">
        {this.state.mobile
        ? <MobileApp
            modalIsOpen={false}
            toggleModal={this.toggleModal}
            mobile={this.state.mobile}
            currentPrompt={this.state.currentPrompt}
            drawingInput={this.state.drawingInput}
          />
        : <DesktopApp 
            modalIsOpen={this.state.modalIsOpen}
            toggleModal={this.toggleModal}
            toggleFocus={this.toggleFocus.bind(this)}
            mobile={this.state.mobile}
            currentPrompt={this.state.currentPrompt}
            promptType={this.state.promptType}
            currentArtist={this.state.currentArtist}
            height={this.state.height}
            width={this.state.width}
            artistPresets={artistPresets}
            emoji1={this.state.emoji1}
            emoji2={this.state.emoji2}
            emoji3={this.state.emoji3}
            submitResponse={this.submitResponse}
            getNextResponse={this.getNextResponse}
            responsesToDisplay={this.state.responsesToDisplay}
            setCanvas={this.setCanvas}
            changeBrushSize={this.changeBrushSize.bind(this)}
            colours={this.state.colours}
            brushSize={this.state.brushSize}
            setIsDrawing={this.setIsDrawing}
            changeColourOrder={this.changeColourOrder.bind(this)}
            changeColours={this.changeColours.bind(this)}
            undoDrawing={this.undoDrawing.bind(this)}
            redoDrawing={this.redoDrawing.bind(this)}
            toggleEraser={this.toggleEraser.bind(this)}
            setDrawInput={this.setDrawInput}
            setWriteInput={this.setWriteInput}
            drawingResponse={this.state.drawingResponse}
          />
        }
      </div>
    )
  }
  componentDidMount() {  
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    // run start up processes based on mob/desk
    if (this.state.mobile){
      //MOBILE
    } else {
      //DESKTOP
      //this.initSchedule();
    }
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  toggleModal() {
    if(this.state.modalIsOpen){
      this.setState({ modalIsOpen: false });
      //this.updateSchedule();
      document.addEventListener('mouseup', this.saveCanvasState);
    } else {
      this.setState({ modalIsOpen: true });
      document.removeEventListener('mouseup', this.saveCanvasState);
    }
  }
  /* Desktop DB Connections */
  // init db and then triger update loop
  initSchedule(){
    fetch(`https://room2.fm/api/getScheduleInit`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'GET',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(res => this.setStateFromDB(res.data));
  }
  updateSchedule(){
    fetch(`https://room2.fm/api/getScheduleUpdate`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ lastResponseID: this.state.lastResponseID})
    })
      .then(res => res.json())
      .then(res => {
        this.setStateFromDB(res.data);
      });
    setTimeout(this.updateSchedule, this.state.scheduleLoopTime);
  }
  setStateFromDB(data) {
    /* console.log(data); */
    let scheduleData = data[0][0];
    let responseData = data[1];
    // if new artist
    if(scheduleData.currentArtist !== this.state.currentArtist){
      // if artist changed get new emojis
      this.updateEmojis(scheduleData.emoji1, scheduleData.emoji2, scheduleData.emoji3);
      this.setState({
        currentArtist: scheduleData.currentArtist
      })
    }
    // if new prompt
    if(scheduleData.currentPrompt !== this.state.currentPrompt){
      if(document.getElementById("prompt-end-timer-wrapper")){
        this.startPromptCountdown(scheduleData.currentPrompt);
      } else {
        this.setState({  
          currentPrompt: scheduleData.currentPrompt,
          promptType: scheduleData.promptType
        })
      }     
    }
    // if new responses    
    if (responseData.length){
      let newResponses = [];
      responseData.forEach(response => newResponses.push([response.RESPONSE, response.RESPONSE_TYPE]));
      this.setState(prevState => ({
        unseenResponses: prevState.unseenResponses.concat(newResponses),
        responsesToDisplay: true,
        lastResponseID: responseData[responseData.length-1].id
      }))
    } 
  }
  updateEmojis(emoji1, emoji2, emoji3){
    fetch(`https://room2.fm/api/getEmojisUpdate`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({emoji1: emoji1, emoji2: emoji2, emoji3: emoji3})
    })
      .then(res => res.json())
      .then(res => { this.setState({
        emoji1: { alt: res.data[0].altText, src: res.data[0].emojiString },
        emoji2: { alt: res.data[1].altText, src: res.data[1].emojiString },
        emoji3: { alt: res.data[2].altText, src: res.data[2].emojiString }
      }) });
  }
  /* submitTextResponse(){
    let textInput = document.getElementById('text-input');
    let responseText = textInput.value;
    textInput.value = '';
    fetch(`http://localhost:33061/api/insertTextResponse`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({reflectText: responseText})
    })
    .then(response => console.log(response.json()));
  }
  submitImageResponse(){
    let imageInput = document.getElementById('drawing-canvas');
    var dataURL = imageInput.toDataURL({
      format: 'png',
      left: 0,
      top: 0,
      width: imageInput.width,
      height: imageInput.height
    });
    const formData = new FormData();
    let imageFile = this.dataURLtoFile(dataURL, 'response.png');
    this.state.drawingCanvas.clear();
    formData.append('upload', imageFile, 'response.png');
    fetch('http://localhost:33061/api/insertImageResponse', {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(result => { console.log('Success:', result); })
    .catch(error => { console.error('Error:', error); });
  } */

  submitResponse(){
    if(this.state.drawingResponse){
      // image response
      if(this.state.stateStack.length > 0){
        let imageInput = document.getElementById('drawing-canvas');
        var dataURL = imageInput.toDataURL({
          format: 'png',
          left: 0,
          top: 0,
          width: imageInput.width,
          height: imageInput.height
        });
        const formData = new FormData();
        let imageFile = this.dataURLtoFile(dataURL, 'response.png');
        this.state.drawingCanvas.clear();
        formData.append('upload', imageFile, 'response.png');
        fetch('https://room2.fm/api/insertImageResponse', {
          method: 'PUT',
          body: formData
        })
        .then(response => response.json())
        .then(result => { console.log('Success:', result); })
        .catch(error => { console.error('Error:', error); });
        this.resetUndoStack();
      }      
    } else {
      // text response
      let textInput = document.getElementById('text-input');
      let responseText = textInput.value;
      if(responseText.length > 0){
        textInput.value = '';
        fetch(`https://room2.fm/api/insertTextResponse`, {
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({reflectText: responseText})
        })
        .then(response => console.log(response.json()));
      }      
    }    
  }
  getNextResponse(){
    let oldestResponse = null;
    if(this.state.unseenResponses.length === 0){
      this.setState({ responsesToDisplay: false });
    } else {
      let updatedResponseArray = this.state.unseenResponses;
      oldestResponse = updatedResponseArray.shift();
      this.setState({unseenResponses: updatedResponseArray});      
    }
    return oldestResponse;   
  }
  setDrawInput(){
    this.setState({drawingResponse: true});
    document.getElementById("drawing-canvas-wrapper").style.zIndex = "4";
    document.getElementById("text-input").style.zIndex = "3";
    document.getElementsByClassName("ActiveInputButton")[0].classList.remove("ActiveInputButton");
    document.getElementById("draw-input-select").classList.add("ActiveInputButton");
  }
  setWriteInput(){
    this.setState({drawingResponse: false});
    document.getElementById("drawing-canvas-wrapper").style.zIndex = "3";
    document.getElementById("text-input").style.zIndex = "4";
    document.getElementsByClassName("ActiveInputButton")[0].classList.remove("ActiveInputButton");
    document.getElementById("text-input-select").classList.add("ActiveInputButton");
  }
  changeColourOrder(){
    let newColourOrder = {
      colour1: this.state.colours.colour2,
      colour2: this.state.colours.colour3,
      colour3: this.state.colours.colour1,
    };
    this.setState({ colours: newColourOrder });
  }
  changeColours(colourSelect, newColour){
    let newColours = this.state.colours;
    newColours[colourSelect] = newColour;
    this.setState({ colours: newColours });
  }
  /* changeBrushSize(newSize){
    this.setState({ brushSize: newSize });
  } */
  changeBrushSize = (e) =>{
    if(e.target.id === "increase-brush-button"){
      if(this.state.brushSize < 20){        
        this.setState(prevState => ({ brushSize: prevState.brushSize + 2}))
      }      
    }  else if(this.state.brushSize > 2) {
        this.setState(prevState => ({ brushSize: prevState.brushSize - 2}))
    } 
  }
  toggleEraser(){
    let canvas = this.state.drawingCanvas;
    if(!this.state.isEraser){
      this.setState({ isEraser: true, savedBrush: canvas.freeDrawingBrush }, () => {
        canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
        canvas.freeDrawingBrush.width = this.state.savedBrush.width;
        document.getElementById("erase-brush-button").classList.add("Active");
      });
    } else {
      canvas.freeDrawingBrush = this.state.savedBrush;
      this.setState({ isEraser: false });
      document.getElementById("erase-brush-button").classList.remove("Active");
    }
  }
  /* undo/redo functions */
  setCanvas(canvas){
    // set canvas reference and save initial state for undo/redo
    this.setState({ drawingCanvas: canvas, currentCanvasState: canvas.toDatalessJSON() });
  }
  setIsDrawing(){
    this.setState({ isDrawing: true });
  }
  saveCanvasState(){
    if(this.state.isDrawing){
      let newStateStack = this.state.stateStack;
      let currentCanvasState = this.state.currentCanvasState;
      if(newStateStack.length === this.state.maxUndo){
        // drop the oldest state if at max undo count
        newStateStack.shift();
      }
      // add current canvas state to stack
      newStateStack.push( currentCanvasState );
      //update current state
      this.setState({ currentCanvasState: this.state.drawingCanvas.toDatalessJSON(), 
                      stateStack: newStateStack, 
                      redoStack: [],
                      isDrawing: false });
    }    
  }
  undoDrawing(){
    // if states left to undo
    if(this.state.stateStack.length > 0){
      let newCanvasState = this.state.currentCanvasState;
      let currentCanvasState = this.state.drawingCanvas.toDatalessJSON();
      // push current state to redo stack
      let newRedoStack = this.state.redoStack;
      newRedoStack.push(currentCanvasState);
      // pop previous state from state stack
      let newStateStack = this.state.stateStack;
      let newState = newStateStack.pop();
      // update to previous states and both stacks
      this.setState({ currentCanvasState: newState, redoStack: newRedoStack, stateStack: newStateStack});
      // update actual canvas
      this.state.drawingCanvas.loadFromJSON(newCanvasState);      
    }    
  }
  redoDrawing(){
    // if states left to redo
    if(this.state.redoStack.length > 0){
      // pop new state from redo stack
      let newRedoStack = this.state.redoStack;
      let newCanvasState = newRedoStack.pop();
      let currentCanvasState = this.state.drawingCanvas.toDatalessJSON();
      // push current state to undo stack
      let newStateStack = this.state.stateStack;
      newStateStack.push(currentCanvasState);
      // update to previous states and both stacks
      this.setState({ currentCanvasState: currentCanvasState, redoStack: newRedoStack, stateStack: newStateStack});
      // update actual canvas
      this.state.drawingCanvas.loadFromJSON(newCanvasState);      
    }  
  }
  resetUndoStack(){
    this.setState({ redoStack: [], stateStack: []});
  }
  startPromptCountdown(newPrompt){
    if(!this.state.promptCountdown){
      this.setState({promptCountdown: true}, () => {
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
            this.setState({currentPrompt: newPrompt, promptCountdown: false})        
          }
        }, 1000);
      })
    }    
  }
  toggleFocus(){
    if(!this.state.focusMode){
      this.setState({focusMode: true});
      this.getCSSRule('.TextResponseBox').style.backgroundColor = "rgb(31, 33, 28)";
      this.getCSSRule('.TextResponseBox').style.border = "solid white 1px";
      this.getCSSRule('.ImageResponseBox').style.backgroundColor = "rgb(31, 33, 28)";
      this.getCSSRule('.ImageResponseBox').style.border = "solid white 1px";
    } else {
      this.setState({focusMode: false});
      this.getCSSRule('.TextResponseBox').style.backgroundColor = "";
      this.getCSSRule('.TextResponseBox').style.border = "";
      this.getCSSRule('.ImageResponseBox').style.backgroundColor = "";
      this.getCSSRule('.ImageResponseBox').style.border = "";
    }
  }

  dataURLtoFile(dataurl, filename){
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
  getCSSRule(ruleName) {
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
/* 
export default App */

