import React, { useEffect } from 'react';

export default function ColourPicker(props){

  useEffect(() => {
    document.getElementById('col1Select').addEventListener("input", colourInputChange, false);
    document.getElementById('col2Select').addEventListener("input", colourInputChange, false);
    document.getElementById('col3Select').addEventListener("input", colourInputChange, false);
  }, []);

  return (
    <div id="drawing-tools-wrapper">
      <button id="col-swap-button" onClick={() => colourSwap()}>
        <SwapIcon />
      </button>
      <span id="word-change">CHANGE</span>
      <span id="word-colour">COLOUR</span>
      <div id="col-select-wrapper">
        <input type="color" id="col1Select" className="col-select first" name="col1Select" defaultValue={props.colours[0]} />
        <input type="color" id="col2Select" className="col-select second" name="col23Select" defaultValue={props.colours[1]} />
        <input type="color" id="col3Select" className="col-select third" name="col33Select" defaultValue={props.colours[2]} />
      </div>
    </div>      
  )

  function colourSwap(e){
    console.log(props.colours)
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
    props.setCurrentColours([
      props.colours[1],
      props.colours[2],
      props.colours[0]
    ]);
  }
  function colourInputChange(e){
    let colNum = 0;
    let cl = e.target.classList;
      switch(true){
        case cl.contains('first'):
        colNum = 0;
        break;
        case cl.contains('second'):
        colNum = 1;
        break;
        case cl.contains('third'):
        colNum = 2;
        break;
        default:
        break;
      }
    let newColours = props.colours;
    newColours[colNum] = e.target.value;
    props.setCurrentColours(newColours);
  }
}

/* expecting a 5:1 aspect ratio */
function SwapIcon(){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg" >
        {/* Arrow Head */}
        <marker id="arrowhead" markerWidth="10" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3.5, 0 6" />
        </marker>
        {/* <rect width="100%" height="100%" fill="red" /> */}
        {/* <rect width="100%" height="1%" y="50%" fill="blue" />
        <rect width="1%" height="100%" x="25%" fill="blue" /> */}
        {/* Line */}
        <path fill="none" strokeWidth="8" markerEnd="url(#arrowhead)" 
              d=" M 25, 50
                  L 0,13.4 100,13.4 50,86.6
                  " />
        {/* <path fill="none" stroke="black" strokeWidth="2" marker-end="url(#arrowhead)"
              d=" M 35,15
                  L 17.5,15 17.5,5 82.5,5 82.5,15 65,15" /> */}
    </svg>
  )
}

