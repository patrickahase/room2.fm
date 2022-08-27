import React, { useEffect, useRef, useState } from 'react'

export default function ResponseDisplay(props) {

  // time for fade in/out and for how long the response is visible in ms
  const responseFadeTime = 1500;
  const responseHangTime = 12000;

  const [responsesToDisplay, setResponsesToDisplay] = useState([]);
  const responsesToDisplayRef = useRef();
  const responsesDisplaying = useRef(false);

  const displaysOnScreen = 4;

  // useeffect to run only after the first time responses to display is updated to contain responses, not the following times it's order is updated
  useEffect(() => {
    if(responsesToDisplay.length > 0 && !responsesDisplaying.current){
      for(let i = 0; i < displaysOnScreen; i++){
        setTimeout(displayNextResponse, responseFadeTime*i);
      }      
      responsesDisplaying.current = true;
    }
    responsesToDisplayRef.current = responsesToDisplay;
  }, [responsesToDisplay]);

  // run loop once new response data arrives
  useEffect(() => {
    if(props.responseData.length > 0){
      setResponsesToDisplay(props.responseData);
      responsesToDisplayRef.current = props.responseData;
    }
  }, [props.responseData]);

  return (
    <div id="response-wrapper"></div>
  )

  function displayNextResponse(){
    let modOrderResponses = Array.from(responsesToDisplayRef.current);
    let nextResponse = modOrderResponses.pop();
    if(nextResponse[1] === 'image'){
      createImageResponseDisplay(nextResponse[0]);
    } else {
      createTextResponseDisplay(nextResponse[0]);
    }
    setResponsesToDisplay([nextResponse].concat(modOrderResponses));
  }

  function createImageResponseDisplay(imageResponse){
    let newResponseBox = document.createElement('img');
    let collision = false;
    newResponseBox.classList.add('ImageResponseBox');
    let xRandom = Math.random();
    let yRandom = Math.random();
    newResponseBox.addEventListener("load", (e) => {
      // add to the page
      document.getElementById('response-wrapper').appendChild(newResponseBox);
      let responseBoxDimensions = newResponseBox.getBoundingClientRect();
      newResponseBox.style.left = (80 * xRandom) + "%";
      newResponseBox.style.top = ((100 - (props.height / responseBoxDimensions.height)) * yRandom) + "%";
      let colliderArray = Array.from(document.getElementsByClassName("Collider"));
      for (let i = 0; i < colliderArray.length; i++) {
        if(detect2DBoxCollision(newResponseBox.getBoundingClientRect(), colliderArray[i].getBoundingClientRect()) && !collision){
          collision = true;
        }
      }
      if(collision){
        newResponseBox.remove();
        window.requestAnimationFrame(() => createImageResponseDisplay(imageResponse));
      } else {
        newResponseBox.classList.add("Collider");
        responseFadeInOut(newResponseBox);
      } 
    });
    newResponseBox.src = 'https://humstore.thelongesthum.world/'+imageResponse;
  }

  function createTextResponseDisplay(textResponse){
    let newResponseBox = document.createElement('p');
    let collision = false;
    newResponseBox.innerHTML = textResponse;
    newResponseBox.classList.add('TextResponseBox');
    let xRandom = Math.random();
    let yRandom = Math.random();
    document.getElementById('response-wrapper').appendChild(newResponseBox);
    let responseBoxDimensions = newResponseBox.getBoundingClientRect();
    newResponseBox.style.left = (80 * xRandom) + "%";
    newResponseBox.style.top = ((100 - (props.height / responseBoxDimensions.height)) * yRandom) + "%";
    let colliderArray = Array.from(document.getElementsByClassName("Collider"));
    for (let i = 0; i < colliderArray.length; i++) {
      if(detect2DBoxCollision(newResponseBox.getBoundingClientRect(), colliderArray[i].getBoundingClientRect()) && !collision){
        collision = true;
      }
    }
    if(collision){
      newResponseBox.remove();
      window.requestAnimationFrame(() => createTextResponseDisplay(textResponse));
    } else {
      newResponseBox.classList.add("Collider");
      responseFadeInOut(newResponseBox);
    } 
  }

  function responseFadeInOut(responseElement){
    responseElement.style.transition = responseFadeTime + "ms";
    setTimeout(() =>{
      // responseElement.classList.add('FadeIn');
      responseElement.style.opacity = 1;
      setTimeout(() => {responseElement.style.opacity = 0;}, responseHangTime);
      setTimeout(() => {responseElement.remove(); displayNextResponse();}, responseFadeTime + responseHangTime + 100);
    }, 100);
  }
}

function detect2DBoxCollision(box1, box2){
  let collision = false;
  if(box1.left < box2.right &&
     box1.right > box2.left &&
     box1.top < box2.bottom &&
     box1.bottom > box2.top) {
      collision = true;
    }
  return collision;
}
