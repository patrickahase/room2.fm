import { useEffect, useState, useRef } from 'react';
import IntroModalDesktop from './components/introModalDesktop';
import Marquee from './components/marquee';
import BGVis from './components/bgVis';
import SettingsMenu from './components/settingsMenu';
import ResponseDisplay from './components/responseDisplay';
import DrawingToolsDesktop from './components/drawingToolsDesktop';
import DrawingCanvas from './components/drawingCanvas';
import AudioControls from './components/audioControls';
import ColourPicker from './components/colourPicker';
import './SyncDesktopApp.css';

export default function SyncDesktopApp() {

  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  // is the intro modal open
  //const [modalIsOpen, setModalIsOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  var modalIsOpenRef = useRef(modalIsOpen);
  useEffect(() => {modalIsOpenRef.current = modalIsOpen}, [modalIsOpen]);
  // intro modal instance
  const [introModal, setIntroModal] = useState(null);
  const [currentModalPage, setCurrentModalPage] = useState(1);
  const [showOverlay, setShowOverlay] = useState(true);

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

  // if false it's assumed to be text instead
  const[inputIsDraw, setInputIsDraw] = useState(false);
  const [responseData, setResponseData] = useState([
    ["https://thelongesthumstore.sgp1.digitaloceanspaces.com/room2-purpose-live/1666089854386.png", "image"],
    ["ry", "text"],
  ]);
  var responseDataRef = useRef(responseData);
  useEffect(() => {responseDataRef.current = responseData}, [responseData]);
  // current prompt
  const [currentPrompt, setCurrentPrompt] = useState('What do you hope for?');

  //init 
  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', () => {
      setWindowSize([window.innerWidth, window.innerHeight])});
    document.addEventListener('mouseup', saveCanvasState);
    document.addEventListener('touchend', saveCanvasState);
    document.addEventListener('touchcancel', saveCanvasState);
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
    <div id="sync-desktop-wrapper">
      {modalIsOpen
        ? <IntroModalDesktop 
            setIntroModal={setIntroModal}
            currentModalPage={currentModalPage}
            setCurrentModalPage={setCurrentModalPage}
            toggleModal={toggleModal} />
        : <>
          <div id="room2-wrapper">

            <div id="banner-wrapper">
              <div id="banner-logo-wrapper">
                <div id="banner-x"></div>      
                <img className="BannerLogo" src={"./assets/slowdiscpixel.gif"} />
              </div>
              <Marquee
                text={"room2 sync documentation for PhD "} />
            </div>

            <div id="vis-wrapper">

              <div id="bg-shader-wrapper">
                <BGVis
                  shaderID={8}
                  width={windowSize[0]*0.75}
                  height={windowSize[1]*0.68}
                />
              </div> 

              <div id="bg-response-wrapper">
                <ResponseDisplay
                  height={windowSize[1]*0.68}
                  responseData={responseData}
                  currentPrompt={currentPrompt} />

                <div id="menu-prompt-wrapper">
                  <SettingsMenu
                    toggleFocus={toggleFocus} 
                    toggleModal={toggleModal} />
                  <div id="current-prompt-wrapper" className="Collider PromptCycle">
                    <div id="prompt-end-timer-wrapper">
                      <div id="prompt-end-timer" />
                      <div id="prompt-end-timer-overlay" />
                    </div>           
                    <div id="current-prompt">
                      {currentPrompt}                    
                    </div>           
                    <div id="input-select-wrapper">
                      <span id="input-select">I would like to&nbsp;
                      <button id="draw-input-select" className="InputSelectButton" onClick={() => setInput(true)}>draw</button>&nbsp;/&nbsp;
                      <button id="text-input-select" className="InputSelectButton ActiveInputButton" onClick={() => setInput(false)}>write</button>
                      &nbsp;a response</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="interface-wrapper">

              <DrawingToolsDesktop
                  undoDrawing={undoDrawing}
                  redoDrawing={redoDrawing}
                  toggleEraser={toggleEraser}
                  colours={currentColours}
                  brushSize={brushSize}
                  setBrushSize={setBrushSize} />
              
              <div id="input-wrapper">          
                <textarea id="text-input" name="text based prompt response" placeholder="Please type your response here..." />
                <DrawingCanvas 
                  brushColour={currentColours[selectedColour]}
                  brushSize={brushSize}
                  setDrawingCanvas={setDrawingCanvas}
                  setCurrentCanvasState={setCurrentCanvasState}
                  setIsDrawing={setIsDrawing} />
              </div>

              <div id="right-ui-wrapper">
                <div id="col-pick-wrapper">                
                  <ColourPicker 
                    colours={currentColours}
                    updateCanvasBrush={updateCanvasBrush}
                    setSelectedColour={setSelectedColour}
                    setCurrentColours={setCurrentColours} />              
                </div>   
                <button id="response-submit-button" onClick={() => submitResponse()}>
                  SUBMIT RESPONSE                
                </button>
                <AudioControls />            
              </div>
            </div>

          </div>
          {/* dead simple text chat */}
          <div id="chat">
            <p>3rd party chat function removed</p>
          </div>
          {/* <iframe title="text chat" id="chat" src='https://deadsimplechat.com/34MeFCATo'></iframe>         */}
        </>}
    </div>
  )

  // gets triggered when either the intro or info modal are brought up
  function toggleModal(){
    // add and remove event listener that triggers after drawing to save canvas to undo stack
    if(modalIsOpen){
      document.addEventListener('mouseup', saveCanvasState);
      introModal.hide();
      getCSSRule(".ModalWrapper").style.display = "none";
    } else {
      document.removeEventListener('mouseup', saveCanvasState);
      introModal.show();
      getCSSRule(".ModalWrapper").style.display = "flex";
    }
    // toggle state
    setModalIsOpen(!modalIsOpen);
  }

  function toggleFocus(){
    let textResponseRule = getCSSRule('#sync-desktop-wrapper .TextResponseBox');
    let imageResponseRule = getCSSRule('#sync-desktop-wrapper .ImageResponseBox');
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
      document.getElementById("input-wrapper").style.top= "-100%";
      getCSSRule('#sync-desktop-wrapper #input-wrapper::after').style.top = "calc(50% + 4px)";
      document.getElementById("draw-input-select").classList.add("ActiveInputButton");
      document.getElementById("text-input-select").classList.remove("ActiveInputButton");
    } else {
      setInputIsDraw(false);
      document.getElementById("input-wrapper").style.top= "0%";
      getCSSRule('#sync-desktop-wrapper #input-wrapper::after').style.top = "4px";
      document.getElementById("draw-input-select").classList.remove("ActiveInputButton");
      document.getElementById("text-input-select").classList.add("ActiveInputButton");
    }
  }

  //// here is the typical way responses are sent to the server : now simulated
  function submitResponse() {
    // set up array to push other responses to
    let returnedResponses = [];
    // check if a text or an image response
    if (inputIsDraw) {
      //image input
      let imageInput = document.getElementById("drawing-canvas");
      var dataURL = imageInput.toDataURL({
        format: "png",
        left: 0,
        top: 0,
        width: imageInput.width,
        height: imageInput.height,
      });
      //const formData = new FormData();
      //let imageFile = dataURLtoFile(dataURL, "response.png");
      drawingCanvas.clear();
      // simulate response
      returnedResponses.push([
        dataURL,
        'image',
      ]);
      setResponseData(returnedResponses);

      // we add one to cycle pos to keep start from 1
      // formData.append(
      //   "upload",
      //   imageFile,
      //   "cycle_" + currentCycle + "_response.png"
      // );
      // fetch(`https://room2.fm/api/insertImageReflectionGetResponses`, {
      //   method: "PUT",
      //   body: formData,
      // })
      //   .then((res) => res.json())
      //   .then((res) => {
      //     try {
      //       for (const response of res.data[1]) {
      //         returnedResponses.push([
      //           response.RESPONSE,
      //           response.RESPONSE_TYPE,
      //         ]);
      //       }
      //       setResponseData(returnedResponses);
      //     } catch (e) {
      //       // if response not the data
      //       console.log(e);
      //     }
      //   });
    } else {
      // text input
      let textInput = document.getElementById("text-input");
      let responseText = textInput.value;
      textInput.value = "";
      returnedResponses.push([
        responseText,
        'text',
      ]);
      setResponseData(returnedResponses);
      // if (responseText.length > 0) {
      //   textInput.value = "";
      //   fetch(`https://room2.fm/api/insertTextReflectionGetResponses`, {
      //     headers: { "Content-type": "application/json" },
      //     method: "POST",
      //     mode: "cors",
      //     body: JSON.stringify({
      //       reflection: responseText,
      //       cycleTable: currentCycle,
      //     }),
      //   })
      //     .then((res) => res.json())
      //     .then((res) => {
      //       try {
      //         for (const response of res.data[1]) {
      //           returnedResponses.push([
      //             response.RESPONSE,
      //             response.RESPONSE_TYPE,
      //           ]);
      //         }
      //         setResponseData(returnedResponses);
      //       } catch (e) {
      //         // if response not the data
      //         console.log(e);
      //       }
      //     });
      // }
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
      //drawingCanvasRef.current.freeDrawingBrush = new fabric.EraserBrush(drawingCanvasRef.current);
      drawingCanvasRef.current.freeDrawingBrush.width = brushSize;
      drawingCanvasRef.current.freeDrawingBrush.color = "#ffffff"
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

// function PromptSpan(props){

//   useEffect(() => {
//     document.getElementById("prompt-span").innerHTML = props.prompt;
//   }, []);

//   return(
//     <pre id="prompt-span"></pre>
//   )
// }

