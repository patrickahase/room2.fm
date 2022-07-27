import React, { useEffect } from 'react'

export default function ResponseDisplay(props) {
  
  //length between displaying the responses
  const responseLoopDelay = 1000;

  // run loop once new response data arrives
  useEffect(() => {
    if(props.responseData.length > 0){
      displayResponsesLoop(props.responseData);
    }
  }, [props.responseData]);

  return (
    <div id="response-wrapper"></div>
  )

  // loop through the responses
  function displayResponsesLoop(responseData){
    let responseToDisplay = responseData.pop();
    if(responseToDisplay[1] === 'image'){
      createImageResponseDisplay(responseToDisplay[0]);
    } else {
      createTextResponseDisplay(responseToDisplay[0]);
    }
    if (responseData.length > 0){ 
      setTimeout(displayResponsesLoop, responseLoopDelay, responseData) }
  }

  function createImageResponseDisplay(imageResponse){
    let newResponseBox = document.createElement('img');
    newResponseBox.classList.add('ImageResponseBox');
    let xRandom = Math.random();
    let yRandom = Math.random();
    newResponseBox.addEventListener("load", (e) => {
      // add to the page
      document.getElementById('response-wrapper').appendChild(newResponseBox);
      let responseBoxDimensions = e.target.getBoundingClientRect();
      newResponseBox.style.left = (75 * xRandom) + "%";
      newResponseBox.style.top = ((100 - (props.height / responseBoxDimensions.height)) * yRandom) + "%";
      console.log(responseBoxDimensions);
      
    });
    newResponseBox.src = 'https://humstore.thelongesthum.world/'+imageResponse;
  }

  function createTextResponseDisplay(textResponse){

  }
}

function detect2DBoxCollision(box1, box2){
  let collision = false;

  return collision;
}
