import React, { Component } from 'react'

export class ColourPicker extends Component {
  render() {
    return (
      <>
      <button id="col-swap-button" onClick={this.click}>
        <SwapIcon />
      </button>
      <div id="col-select-wrapper">
        <input type="color" id="col1Select" className="col-select first" name="col1Select" defaultValue="#222323" />
        <input type="color" id="col2Select" className="col-select second" name="col23Select" defaultValue="#ff4adc" />
        <input type="color" id="col3Select" className="col-select third" name="col33Select" defaultValue="#3dff98" />
      </div>
      </>      
    )
  }
  click(){
    let selectors = document.getElementsByClassName("col-select");
    for (let i = 0; i < 3; i++){
      let cl = selectors[i].classList;
      switch(true){
        case cl.contains('first'):
        cl.remove('first');
        cl.add('second');
        break;
        case cl.contains('second'):
        cl.remove('second');
        cl.add('third');
        break;
        case cl.contains('third'):
        cl.remove('third');
        cl.add('first');
        break;
        default:
        break;
      }
    }
  }
}

export default ColourPicker

/* expecting a 5:1 aspect ratio */
function SwapIcon(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 25"
      xmlns="http://www.w3.org/2000/svg">
        {/* Arrow Head */}
        <marker id="arrowhead" markerWidth="10" markerHeight="7"refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
        {/* Line */}
        <path fill="none" stroke="black" strokeWidth="2" marker-end="url(#arrowhead)"
              d=" M 35,15
                  L 17.5,15 17.5,5 82.5,5 82.5,15 65,15" />
    </svg>
  )
}
