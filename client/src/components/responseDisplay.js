import React, { Component } from 'react'

export class ResponseDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      waitForNewResponseBox: 5000,
      textHangTime: 15000,
      textFadeTime: 1500,
    }
    this.createResponseTextBox = this.createResponseTextBox.bind(this);
  }
  render() {
    return (
      <div id="response-wrapper">              
              
      </div>
    )
  }
  componentDidMount(){
  }
  componentDidUpdate() {
    if (this.props.responsesToDisplay) {
      // if less than 10 present - otherwise we just wait to spawn on 10th deletion (!! -1)
      if (document.getElementsByClassName('TextResponseBox').length < 9){
        setTimeout(() => {
          let nextResponse = this.props.getNextResponse();
          if (nextResponse) {
            if(nextResponse.startsWith('room2-image-responses')){
              this.createResponseImageBox(nextResponse);
            } else {
              this.createResponseTextBox(nextResponse);
            } 
          }
                   
        }, this.state.waitForNewResponseBox);
      }      
    }
  }
  createResponseTextBox(textResponse){
      let newResponseBox = document.createElement('span');
      newResponseBox.innerHTML = textResponse;
      let xRoll = Math.random();
      let yRoll = Math.random();
      let wRoll = Math.random();
      let hRoll = Math.random();
      // this should have min width/height of 25%
      newResponseBox.style.left = (xRoll * 75) + '%';
      newResponseBox.style.maxWidth = (25 + (75-(xRoll * 75))*wRoll) + '%';
      newResponseBox.style.top = (yRoll * 75) + '%';
      newResponseBox.style.minHeight = (25 + (75-(yRoll * 75))*hRoll) + '%';
      newResponseBox.classList.add('TextResponseBox');
      // add fade in/out
      setTimeout(() => {
        newResponseBox.classList.add('FadeIn');
        setTimeout(() => {
        newResponseBox.classList.add('FadeOut');
        }, this.state.textHangTime)
        setTimeout(() => {
          document.getElementById('response-wrapper').removeChild(newResponseBox);
          if (this.props.responsesToDisplay) { this.createResponseTextBox(this.props.getNextResponse()); }
        }, this.state.textFadeTime + this.state.textHangTime + 100)
      }, 100);
      document.getElementById('response-wrapper').appendChild(newResponseBox);
  }
  createResponseImageBox(imageResponse){
      let newResponseBox = document.createElement('img');
      newResponseBox.addEventListener("load", () => {
        let xRoll = Math.random();
        let yRoll = Math.random();
        let ratio = newResponseBox.naturalWidth/newResponseBox.naturalHeight;
        let boxWidth = this.clamp(newResponseBox.naturalWidth*xRoll, this.props.width*0.25, this.props.width*0.75);
        let boxHeight = boxWidth/ratio;
        let widthPerc = boxWidth/(this.props.width*0.75)*100;
        let heightPerc = boxHeight/(this.props.height*0.68)*100;
        newResponseBox.style.left = (100-widthPerc)/2*yRoll + '%';
        newResponseBox.style.width = widthPerc + '%';
        newResponseBox.style.top = (100-heightPerc)/2*yRoll + '%';
        newResponseBox.style.height = heightPerc + '%';
        newResponseBox.classList.add('ImageResponseBox');
        // add fade in/out
        setTimeout(() => {
          newResponseBox.classList.add('FadeIn');
          setTimeout(() => {
          newResponseBox.classList.add('FadeOut');
          }, this.state.textHangTime)
          setTimeout(() => {
            document.getElementById('response-wrapper').removeChild(newResponseBox);
            if (this.props.responsesToDisplay) { this.createResponseTextBox(this.props.getNextResponse()); }
          }, this.state.textFadeTime + this.state.textHangTime + 100)
        }, 100);
        document.getElementById('response-wrapper').appendChild(newResponseBox);
      });
      newResponseBox.src = 'https://humstore.thelongesthum.world/'+imageResponse;
      
  }
  clamp = (num, min, max) => Math.min(Math.max(num, min), max);
}

export default ResponseDisplay
