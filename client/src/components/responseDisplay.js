import React, { useEffect, useRef, useState } from 'react'

export default function ResponseDisplay(props) {
  
  //length between displaying the responses
  const responseLoopDelay = 1000;

  // time for fade in/out and for how long the response is visible in ms
  const responseFadeTime = 1500;
  const responseHangTime = 15000;

  const [responsesToDisplay, setResponsesToDisplay] = useState([]);
  const responsesToDisplayRef = useRef();
  useEffect(() => {
    responsesToDisplayRef.current = responsesToDisplay;
    displayNextResponse();
  }, [responsesToDisplay]);
  const responsesDisplaying = useRef(false);

  const displaysOnScreen = 3;

  // when new response data arrives add it to the responsesToDisplay List
  useEffect(() => {
    if(props.responseData.length > 0){
      let newResponseList = responsesToDisplayRef.current.concat(props.responseData);
      setResponsesToDisplay(newResponseList);
    }
  }, [props.responseData]);

  return (
    <div id="response-wrapper"></div>
  )

  function displayNextResponse(){
    if(document.getElementsByClassName("Response").length < displaysOnScreen && responsesToDisplayRef.current.length){
      let newResponseList = responsesToDisplayRef.current;
      let newResponse = newResponseList.shift();
      if(newResponse[1] === "text"){
        createTextResponseDisplay(newResponse[0]);
        setResponsesToDisplay(newResponseList);
      } else if(newResponse[1] === "image"){
        createImageResponseDisplay(newResponse[0]);
        setResponsesToDisplay(newResponseList);
      }
      if(newResponseList.length){
        displayNextResponse();
      }      
    } else if (document.getElementsByClassName("Response").length >= displaysOnScreen) {
      setTimeout(displayNextResponse, responseLoopDelay);
    }
  }

  function createImageResponseDisplay(imageResponse){
    let newResponseBox = document.createElement('img');
    let collision = false;
    newResponseBox.classList.add('Response');
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
        console.log("loop");
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
    newResponseBox.classList.add('Response');
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
      console.log("hit");
    }
  return collision;
}
