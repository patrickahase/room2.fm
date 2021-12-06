import React, { Component } from 'react'

export class ColourPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.click = this.click.bind(this);
  }
  render() {
    return (
      <>
      <button id="col-swap-button" onClick={this.click}>
        <SwapIcon />
      </button>
<<<<<<< HEAD
      <div id="word-change">CHANGE\</div>
      <span id="word-colour">/COLOUR</span>
      <div id="col-select-wrapper">
        <input type="color" id="col1Select" className="col-select first" name="col1Select" defaultValue={this.props.colours.colour1} />
        <input type="color" id="col2Select" className="col-select second" name="col23Select" defaultValue={this.props.colours.colour2} />
        <input type="color" id="col3Select" className="col-select third" name="col33Select" defaultValue={this.props.colours.colour3} />
=======
      <div id="col-select-wrapper">
        <input type="color" id="col1Select" className="col-select first" name="col1Select" defaultValue={this.props.colour1} />
        <input type="color" id="col2Select" className="col-select second" name="col23Select" defaultValue={this.props.colour2} />
        <input type="color" id="col3Select" className="col-select third" name="col33Select" defaultValue={this.props.colour3} />
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
      </div>
      </>      
    )
  }
  componentDidMount(){
    document.getElementById('col1Select').addEventListener("input", this.colorInputChange.bind(this), false);
    document.getElementById('col2Select').addEventListener("input", this.colorInputChange.bind(this), false);
    document.getElementById('col3Select').addEventListener("input", this.colorInputChange.bind(this), false);
  }
  click(){
<<<<<<< HEAD
    let selectors = document.getElementsByClassName("col-select");
=======
    let selectors = document.getElementsByClassName("col-select"); 
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
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
<<<<<<< HEAD
=======
        this.props.changeBrushColour(selectors[i].value);
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
        break;
        default:
        break;
      }
    }
<<<<<<< HEAD
    this.props.changeColourOrder();
=======
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
  }
  colorInputChange(e){
    let colNum = e.target.id.charAt(3);
    document.documentElement.style.setProperty('--comp-col-0'+colNum, e.target.value);
  }
  
}

export default ColourPicker

/* expecting a 5:1 aspect ratio */
<<<<<<< HEAD
function SwapIcon(){
=======
function SwapIcon(props){
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
  return (
    <svg
      width="100%"
      height="100%"
<<<<<<< HEAD
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg" >
        {/* Arrow Head */}
        <marker id="arrowhead" markerWidth="10" markerHeight="7"refX="7" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
        {/* <rect width="100%" height="100%" fill="red" /> */}
        {/* <rect width="100%" height="1%" y="50%" fill="blue" />
        <rect width="1%" height="100%" x="25%" fill="blue" /> */}
        {/* Line */}
        <path fill="none" strokeWidth="4" markerEnd="url(#arrowhead)" 
              d=" M 25, 50
                  L 0,13.4 100,13.4 50,86.6
                  " />
        {/* <path fill="none" stroke="black" strokeWidth="2" marker-end="url(#arrowhead)"
              d=" M 35,15
                  L 17.5,15 17.5,5 82.5,5 82.5,15 65,15" /> */}
    </svg>
  )
}

=======
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
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
