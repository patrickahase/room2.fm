import React, { useEffect, useRef, useState } from 'react'

export default function ResponseDisplay(props) {
  
  const responseStyle = {
    wrapper: {
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      position: 'fixed'
    },
    imageResponse: {
      opacity: 0,
      position: 'absolute',
      transition: '1.5s',
      maxWidth: '20%'      
    },
    textResponse: {
      opacity: 0,
      position: 'absolute',
      transition: '1.5s',
      fontSize: '2rem',
      color: 'var(--comp-col-02)',
      textShadow: '-1px 0 var(--comp-col-01), 0 1px var(--comp-col-01), 1px 0 var(--comp-col-01), 0 -1px var(--comp-col-01)',
      fontFamily: 'GT America'
    }
  }

  // time for fade in/out and for how long the response is visible in ms
  const responseFadeTime = 1500;
  const responseHangTime = 25000;

  // array for new responses
  const [responsesToDisplay, setResponsesToDisplay] = useState([]);
  const responsesToDisplayRef = useRef([]);
  useEffect(() => {
    responsesToDisplayRef.current = responsesToDisplay;
    displayNextResponse();
  }, [responsesToDisplay]);
  
  // array for past responses
  const [displayedResponses, setDisplayedResponses] = useState([]);
  const displayedResponsesRef = useRef([]);
  useEffect(() => {responsesToDisplayRef.current = responsesToDisplay;}, [displayedResponses]);

  useEffect(() => {
    displayedResponsesRef.current = [];
  }, [props.currentPrompt]);

  // max responses to display on the screen
  const displaysOnScreen = 3;

  const responsesOnScreenRef = useRef(0);

  // when new response data arrives add it to the responsesToDisplay List
  useEffect(() => {
    if(props.responseData.length > 0){
      let newResponseList = responsesToDisplayRef.current.concat(props.responseData);
      setResponsesToDisplay(newResponseList);      
    }
  }, [props.responseData]);

  return (
    <div id="response-wrapper" style={responseStyle.wrapper}></div>
  )

  function displayNextResponse(){
    // check if there's responses left to display
    if(responsesToDisplayRef.current.length > 0){
      // check to see how many responses are on screen
      if(responsesOnScreenRef.current < displaysOnScreen){
        responsesOnScreenRef.current = responsesOnScreenRef.current + 1;
        let newResponseList = responsesToDisplayRef.current;
        let oldResponseList = displayedResponsesRef.current;
        let newResponse = newResponseList.shift();
        oldResponseList.push(newResponse);
        if(newResponse[1] === "text"){
          createTextResponseDisplay(newResponse[0]);
          setResponsesToDisplay(newResponseList);
          setDisplayedResponses(oldResponseList);
        } else if(newResponse[1] === "image"){
          createImageResponseDisplay(newResponse[0]);
          setResponsesToDisplay(newResponseList);
          setDisplayedResponses(oldResponseList);
        }
        if(responsesToDisplayRef.current.length > 0){
          displayNextResponse();
        }      
      } 
    } else if (displayedResponsesRef.current.length > 0 && responsesOnScreenRef.current === 0) {
      setTimeout(displayOldResponse, 2000);
    }
  }
  
  function displayOldResponse(){
    // check to see how many responses are on screen
    if(responsesOnScreenRef.current === 0){
      responsesOnScreenRef.current = responsesOnScreenRef.current + 1;
      let oldResponseList = displayedResponsesRef.current;
      let newResponse = oldResponseList.shift();
      oldResponseList.push(newResponse);
      setDisplayedResponses(oldResponseList);
      if(newResponse[1] === "text"){
        createTextResponseDisplay(newResponse[0]);
      } else if(newResponse[1] === "image"){
        createImageResponseDisplay(newResponse[0]);
      }    
    } 
  }

  function createImageResponseDisplay(imageResponse){
    let newResponseBox = document.createElement('img');
    let collision = false;
    newResponseBox.classList.add('Response');
    Object.assign(newResponseBox.style, responseStyle.imageResponse);
    let xRandom = Math.random();
    let yRandom = Math.random();
    newResponseBox.addEventListener("load", (e) => {
      // add to the page
      document.getElementById('response-wrapper').appendChild(newResponseBox);
      let responseBoxDimensions = newResponseBox.getBoundingClientRect();
      newResponseBox.style.left = (80 * xRandom) + "%";
      newResponseBox.style.top = ((90 - (responseBoxDimensions.height/props.height)*100) * yRandom) + "%";
      let colliderArray = Array.from(document.getElementsByClassName("Collider"));
      for (let i = 0; i < colliderArray.length; i++) {
        if(detect2DBoxCollision(newResponseBox.getBoundingClientRect(), colliderArray[i].getBoundingClientRect()) && !collision){
          collision = true;
        }
      }
      if(collision){
       // console.log("hit", imageResponse);
        newResponseBox.remove();
        window.requestAnimationFrame(() => createImageResponseDisplay(imageResponse));
      } else {
        newResponseBox.classList.add("Collider");
        responseFadeInOut(newResponseBox);
      } 
    });
    newResponseBox.src = imageResponse;
  }

  function createTextResponseDisplay(textResponse){
    let newResponseBox = document.createElement('p');
    let collision = false;
    newResponseBox.innerHTML = textResponse;
    newResponseBox.classList.add('Response');
    Object.assign(newResponseBox.style, responseStyle.textResponse);
    let xRandom = Math.random();
    let yRandom = Math.random();
    document.getElementById('response-wrapper').appendChild(newResponseBox);
    let responseBoxDimensions = newResponseBox.getBoundingClientRect();
    newResponseBox.style.left = (80 * xRandom) + "%";
    newResponseBox.style.top = ((90 - (responseBoxDimensions.height / props.height)*100) * yRandom) + "%";
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
      responseElement.style.opacity = 1;
      setTimeout(() => {responseElement.style.opacity = 0;}, responseHangTime);
      setTimeout(() => {
        responseElement.remove();
        responsesOnScreenRef.current = responsesOnScreenRef.current - 1;
        displayNextResponse();
      }, responseFadeTime + responseHangTime + 100);
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
