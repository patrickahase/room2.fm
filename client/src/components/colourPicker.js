import React, { useEffect } from 'react';

export default function ColourPicker(props){

  useEffect(() => {
    document.getElementById('col1Select').addEventListener("input", colourInputChange, false);
    document.getElementById('col2Select').addEventListener("input", colourInputChange, false);
    document.getElementById('col3Select').addEventListener("input", colourInputChange, false);
  }, []);

  return (
    <>
      <div id="col-select-wrapper">
        <input type="color" id="col1Select" className="col-select first" name="col1Select" defaultValue={props.colours[0]} />
        <input type="color" id="col2Select" className="col-select second" name="col23Select" defaultValue={props.colours[1]} />
        <input type="color" id="col3Select" className="col-select third" name="col33Select" defaultValue={props.colours[2]} />
      </div>
      <div id="col-swap-wrapper">
        <span id="word-change">CHANGE</span>
        <button id="col-swap-button" onClick={() => colourSwap()}>
          <SwapIcon />
        </button>        
        <span id="word-colour">COLOUR</span>
      </div>
    </>      
  )

  function colourSwap(e){
    let selectors = document.getElementsByClassName("col-select");
    for (let i = 0; i < 3; i++){
      let cl = selectors[i].classList;
      switch(true){
        case cl.contains('first'):
        cl.remove('first');
        cl.add('third');
        break;
        case cl.contains('second'):
        cl.remove('second');
        cl.add('first');
        break;
        case cl.contains('third'):
        cl.remove('third');
        cl.add('second');
        break;
        default:
        break;
      }
    }
    props.setSelectedColour(oldCol => {
      if(oldCol < 2){ return oldCol +1; }
      else { return 0; }
    });
  }
  function colourInputChange(e){    
    let colNum = parseInt(e.target.id.charAt(3));
    document.documentElement.style.setProperty('--comp-col-0'+colNum, e.target.value);
    let newColours = props.colours;
    newColours[colNum - 1] = e.target.value;
    props.setCurrentColours(newColours);
    props.updateCanvasBrush();
  }
}

/* expecting a 5:1 aspect ratio */
function SwapIcon(){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      stroke-linejoin="round"
      xmlns="http://www.w3.org/2000/svg" >
        {/* Arrow Head */}
        <marker id="arrowhead" markerWidth="10" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3.5, 0 6" />
        </marker>
        <path fill="none" strokeWidth="6" markerEnd="url(#arrowhead)" 
              d=" M 25, 50
                  L 5,18.4 95,18.4 50,76.6
                  " />
    </svg>
  )
}

