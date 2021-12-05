import React, { Component } from 'react';
import AudioControls from './audioControls';
import DrawingCanvas from './drawingCanvas';
import EmojiTri from './emojiTri';
import IntroModal from './introModal';
import Marquee from './marquee';
import { fabric } from 'fabric';
import DrawingTools from './drawingTools';
import SettingsMenu from './settingsMenu';
import VideoStreamPlayer from './videoStreamPlayer';

export class DesktopApp extends Component {
  constructor(props) {
    super(props)
    this.state = {

      // ui & painter palette
      colours: {
        colour1: "#222323",
        colour2: "#ff4adc",
        colour3: "#3dff98"},      
      
      // drawing settings
      brushSize: 8,

      // undo/redo settings
      maxUndo: 10,
      drawingCanvas: null,
      redoStack: [],
      stateStack: [],
      currentCanvasState: null,
      isDrawing: false,
      isEraser: false,
      savedBrush: null,
      isMuted: false,

      //video stream player
      streamPlayer: null,

      // emoji triangle values
      emojiX: 0.5,
      emojiY: 0.5,
    }
    this.setCanvas = this.setCanvas.bind(this);
    this.saveCanvasState = this.saveCanvasState.bind(this);
    this.setIsDrawing = this.setIsDrawing.bind(this);
    this.toggleEraser = this.toggleEraser.bind(this);
    this.undoDrawing = this.undoDrawing.bind(this);
    this.redoDrawing = this.redoDrawing.bind(this);
    this.setStreamPlayer = this.setStreamPlayer.bind(this);
  }
  render() {
    return (
      <div id="desktop-wrapper">
        {this.props.modalIsOpen
          ? <IntroModal mobile={this.props.mobile} toggleModal={this.props.toggleModal} />
          : <>
            {/* Top Banner */}
            <Marquee />  
            {/* Background Visuals */}          
            <div id="bg-vis-wrapper">              
              {/* <BGVis /> */}
              <VideoStreamPlayer
                setStreamPlayer={this.setStreamPlayer} />
            </div>
            {/* Response Overlay */}
            <div id="response-wrapper">              
              {/* <Responses /> */}
            </div> 
            {/* Menu Overlay */}
            <SettingsMenu />
            {/* Prompt Overlay */}
            <div id="current-prompt">
              {this.props.currentPrompt}
            </div>           
            {/* Emoji Triangle */}
            <EmojiTri 
              height={this.props.height}
              artistPresets={this.props.artistPresets}
            />            
            {/* Input Section */}
            <div id="input-wrapper">              
              {this.props.drawingInput 
                ? <>{/* Drawing Input */}
                  <DrawingCanvas 
                    brushColour={this.state.colours.colour1}
                    brushSize={this.state.brushSize}
                    setCanvas={this.setCanvas}
                    setIsDrawing={this.setIsDrawing}
                    />
                </>
                : <></>/* Text Input */
                }
            </div>
            {/* Right UI Panel */}
            <div id="right-ui-wrapper">
              <DrawingTools
                colours={this.state.colours}
                changeColourOrder={this.changeColourOrder.bind(this)}
                changeBrushSize={this.changeBrushSize.bind(this)} />              
              <button id="response-submit-button">
                SUBMIT RESPONSE
              </button>
              {/* Audio Settings */}
              <AudioControls
                muteAudio={this.muteAudio.bind(this)}
                isMuted={this.state.isMuted}
                changeVolume={this.changeVolume.bind(this)}
              />             
            </div> 
            {/* dead simple text chat */}
            <iframe title="text chat" id="chat" src='https://deadsimplechat.com/34MeFCATo'></iframe>
          </>}
      </div>
    )
  }
  componentDidMount() {  
    // update css style sheet
    document.addEventListener('mouseup', this.saveCanvasState);
    this.initEmTriDB();
  }
  changeColourOrder(){
    let newColourOrder = {
      colour1: this.state.colours.colour3,
      colour2: this.state.colours.colour1,
      colour3: this.state.colours.colour2,
    };
    this.setState({ colours: newColourOrder });
  }
  changeBrushSize(newSize){
    this.setState({ brushSize: newSize });
  }
  changeBrushSize = (e) =>{
    if(e.target.id === "increase-brush-circle"){
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
      });
    } else {
      canvas.freeDrawingBrush = this.state.savedBrush;
      this.setState({ isEraser: false });
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
  setStreamPlayer(streamPlayer){
    this.setState({ streamPlayer: streamPlayer })
  }
  muteAudio(){
    if(this.state.isMuted){
      this.setState({ isMuted: false });
      this.state.streamPlayer.muted(false);
    } else {
      this.setState({ isMuted: true });
      this.state.streamPlayer.muted(true);
    }    
  }
  changeVolume(newVolume){
    this.state.streamPlayer.volume(newVolume);
  }
  /* Desktop DB Connections */
  // init db and then triger update loop
  initEmTriDB(){
    fetch(`/api/getScheduleInit`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(res => console.log(res.data));
  }
}

export default DesktopApp
