import React, { Component } from 'react'

export class ResponseDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      waitForNewResponseBox: 5000,
      textHangTime: 15000,
      textFadeTime: 1500,
      responseBoundaryArray: [],
      editingBoundaryArray: false
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
    this.responseTest();
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
  responseTest(){
    setTimeout(() => {
      this.createResponseTextBox("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo urna molestie at elementum eu facilisis. Id eu nisl nunc mi ipsum faucibus. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Malesuada bibendum arcu vitae elementum.")
      this.responseTest();
    }, 5000);
  }
  createResponseTextBox(textResponse){
    let responseWrapper = document.getElementById('response-wrapper');
    let newResponseBox = document.createElement('span');
    newResponseBox.innerHTML = textResponse;
    let xRoll = this.randomInt(0, 75);
    let yRoll = this.randomInt(0, 75);
    let wRoll = this.randomInt(25, 75-xRoll);
    /* let hRoll = this.randomInt(25, 75-yRoll); */
    // this should have min width/height of 25%
    newResponseBox.style.maxWidth = wRoll + '%';
    /* newResponseBox.style.maxHeight = hRoll + '%'; */
    /* newResponseBox.style.visibility = 'hidden'; */
    newResponseBox.classList.add('TextResponseBox');
    responseWrapper.appendChild(newResponseBox);
    // check for collision and return object with boundaries
    /* let updatedBoundaries = this.detectCollision(xRoll, xRoll + (newResponseBox.offsetWidth/responseWrapper.offsetWidth)*100, yRoll, yRoll + (newResponseBox.offsetHeight/responseWrapper.offsetHeight)*100); */
    // update position and width/height
    newResponseBox.style.left = xRoll + "%";
    newResponseBox.style.top = yRoll + "%";
    /* newResponseBox.style.maxWidth = (updatedBoundaries.right - updatedBoundaries.left) + '%';
    newResponseBox.style.maxHeight = (updatedBoundaries.bottom - updatedBoundaries.top) + '%';
    newResponseBox.style.visibility = ''; */
    // add fade in/out
    setTimeout(() => {
      newResponseBox.classList.add('FadeIn');
      setTimeout(() => {
      newResponseBox.classList.add('FadeOut');
      /* this.removeBoundary(); */
      }, this.state.textHangTime)
      setTimeout(() => {
        responseWrapper.removeChild(newResponseBox);
        if (this.props.responsesToDisplay) { this.createResponseTextBox(this.props.getNextResponse()); }
      }, this.state.textFadeTime + this.state.textHangTime + 100)
    }, 100);
      
      // we actually want to do this as a percentage which means converting the width and height?
      // but we can leave the top and left
      
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
          /* this.removeBoundary(); */
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
  // this is based on percentages
  detectCollision(leftEdge, rightEdge, topEdge, bottomEdge){
    let newResponseBoundary = {
      left: leftEdge,
      right: rightEdge,
      top: topEdge,
      bottom: bottomEdge
    }
    let width = rightEdge - leftEdge;
    let height = bottomEdge - topEdge;    
    let oldBoundaryArray = this.state.responseBoundaryArray;
    //needs to go again if changed
    oldBoundaryArray.forEach(responseBox => {
      let isColliding = true;
      while(isColliding){
        // if right side overlaps
        if(rightEdge > responseBox.left){
          //what is overlap amount
          let rightOverlap = rightEdge - responseBox.left;
          // can i make this side shorter?
          if(width - rightOverlap >= 25 ){
            //yes then let's do it
            newResponseBoundary.right -= rightOverlap;
          } else {
            // can't make it smaller
          }
        } else {
          // if left side overlaps
          if(leftEdge < responseBox.right){
            //what is overlap amount
            let leftOverlap = responseBox.right - leftEdge;
            // can i make this side shorter?
            if(width - leftOverlap >= 25 ){
              //yes then let's do it
              newResponseBoundary.left -= leftOverlap;
            } else {
              // can't make it smaller
            }
          } else {
            // if bottom side overlaps
            if(bottomEdge > responseBox.top){
              //what is overlap amount
              let bottomOverlap = bottomEdge - responseBox.top;
              // can i make this side shorter?
              if(height - bottomOverlap >= 25 ){
                //yes then let's do it
                newResponseBoundary.bottom -= bottomOverlap;
              } else {
                // can't make it smaller
              }
            } else {
              // if topside overlaps
              if(topEdge < responseBox.bottom){
                //what is overlap amount
                let topOverlap = responseBox.bottom - topEdge;
                // can i make this side shorter?
                if(width - topOverlap >= 25 ){
                  //yes then let's do it
                  newResponseBoundary.top -= topOverlap;
                } else {
                  // can't make it smaller
                }
              } else {
                // NO HIT!!
                isColliding = false
              }
            }
          }
      }

      }
      
      
      // return true if new response overlaps old ones
      /* if(responseBox.right > leftEdge && responseBox.left < rightEdge && responseBox.bottom > topEdge && responseBox.top < bottomEdge){
        console.log("hit");
      } */
    });
    return newResponseBoundary
    /* this.addBoundary(newResponseBoundary);
    this.setState({responseBoundaryArray: oldBoundaryArray}) */
  }
  addBoundary(newResponseBoundary){
    if(!this.state.editingBoundaryArray){
      this.setState({ editingBoundaryArray: true }, () => {
        let newBoundaryArray = this.state.responseBoundaryArray;
        newBoundaryArray.push(newResponseBoundary)
        this.setState({ responseBoundaryArray: newBoundaryArray }, () =>{
          this.setState({ editingBoundaryArray: false })
        })
      })
    } else { setTimeout(this.addBoundary(newResponseBoundary), 77); }
  }
  removeBoundary(){
    if(this.state.responseBoundaryArray.length > 0){
      if(!this.state.editingBoundaryArray){
        this.setState({ editingBoundaryArray: true }, () => {
          let newBoundaryArray = this.state.responseBoundaryArray.slice(1);
          this.setState({ responseBoundaryArray: newBoundaryArray }, () =>{
            this.setState({ editingBoundaryArray: false });
          })
        })
      } else { setTimeout(this.removeBoundary(), 69); }
    }    
  }
  randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
  clamp = (num, min, max) => Math.min(Math.max(num, min), max);
}

export default ResponseDisplay
