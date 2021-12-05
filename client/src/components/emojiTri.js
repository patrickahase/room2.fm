import React, { Component } from 'react';

export class EmojiTri extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dragging: false,
    }
    this.getMousePosition = this.getMousePosition.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
  }
  render() {
    return (
      <div id="emoji-tri-wrapper">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          id="emoji-tri-svg-wrapper"
        >
          {/* Emoji Triangle gradient background - uses triangle clip path on div with css gradients stacked */}
          <clipPath id="emoji-tri-clip-path" clipPathUnits="objectBoundingBox">
            {/* Gradient Triangle - height = width * 0.866 */}
            <polygon points="0,0 1,0 0.5,1" />
          </clipPath>
          <foreignObject x="10" y="15.36" width="80" height="69.28" clipPath="url(#emoji-tri-clip-path)">
            <div id="emoji-tri-gradients" xmlns="http://www.w3.org/1999/xhtml" />
          </foreignObject>
          {/* 1.6vw */}
          <foreignObject x="0" y="0" width="20" height="20">
            <img id="emoji-1" alt={this.props.artistPresets[0].emoji01alt} src={this.props.artistPresets[0].emoji01} />
          </foreignObject>
          <foreignObject x="80" y="0" width="20" height="20">
            <img id="emoji-2" alt={this.props.artistPresets[0].emoji02alt} src={this.props.artistPresets[0].emoji02} />
          </foreignObject>
          <foreignObject x="40" y="80" width="20" height="20">
            <img id="emoji-3" alt={this.props.artistPresets[0].emoji03alt} src={this.props.artistPresets[0].emoji03} />
          </foreignObject>
          {/* Selector */}
          <circle  id="selector-circle" className="Draggable" cx="0" cy="0" r="7" transform={"translate(50 45)"} fill="url(#stroke-gradient)" />
          <defs>
            {/* Gradient for the selector */}
            <radialGradient id="stroke-gradient">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="90%" stopColor="white" />
              <stop offset="95%" stopColor="black" />
            </radialGradient>
          </defs>
        </svg>              
      </div>
    )
  }
  componentDidMount() {
    this.svgWrapper = document.getElementById('emoji-tri-svg-wrapper');
    this.svgWrapper.addEventListener('mousedown', this.startDrag);
    this.svgWrapper.addEventListener('mousedown', this.drag);
  }
  componentWillUnmount() {
    this.svgWrapper.removeEventListener('mousedown', this.startDrag);
    this.svgWrapper.removeEventListener('mousedown', this.drag);
  }
  startDrag() {
    // set new cursor 
    document.body.classList.add("dragactive");
    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.endDrag);
  }
  drag = (e) => {
    if (!this.state.dragging){
      window.requestAnimationFrame(() => {
        this.setDragPosition(e);
        this.setState({dragging: false});
      })
      this.setState({dragging: true});
    }    
  }
  setDragPosition(e){
    e.preventDefault();
    var coord = this.getMousePosition(e);
    // set Y border                
    let clampY = this.clamp(coord.y, 15.36, 84.64);
    // set X border based on Y pos
    let offsetX = 40 * this.norm(clampY, 84.64, 15.36);
    let clampX = this.clamp(coord.x, 50 - offsetX, 50 + offsetX);            
    document.getElementById('selector-circle').transform.baseVal.getItem(0).setTranslate(clampX, clampY);
  }
  endDrag() {
    document.body.classList.remove("dragactive");
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.endDrag); 
  }
  getMousePosition(e) {
    var CTM = this.svgWrapper.getScreenCTM();
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d
    };
  }
  clamp(num, min, max){
    return Math.min(Math.max(num, min), max)
  }
  norm(num, min, max){
    return (num - min) / (max - min)
  }
}

export default EmojiTri
