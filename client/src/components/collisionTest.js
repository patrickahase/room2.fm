import React, { useEffect } from 'react';

export default function CollisionTest() {

  let colliderArray = [];
  let first = false;
  
  const wrapperStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black'
  }

  const buttonStyle = {
    position: 'absolute',
    zIndex: 3
  }
  
  const redBox = {
    position: 'absolute',
    width: '50vw',
    height: '50vh',
    left: '25vw',
    top: '25vh',
    backgroundColor: 'red',
    zIndex: 1
  }

  const greenBox = {
    position: 'absolute',
    width: '50vw',
    height: '50vh',
    left: '5vw',
    top: '5vh',
    backgroundColor: 'green',
    zIndex: 2
  }

  return (
    <div id="collision-wrapper"style={wrapperStyle}>
      <button style={buttonStyle} onClick={generateNewBox}>divgen</button>
      {/* <div id="red-box" style={redBox}></div> */}
    </div>
  )

  function generateNewBox(){
    let newBox = document.createElement("div");
    newBox.style.position = 'absolute';
    newBox.style.left = Math.random() * 95 + '%';
    newBox.style.top = Math.random() * 95 + '%';
    newBox.style.width = '5vw';
    newBox.style.height = '5vh';
    newBox.style.backgroundColor = 'green';
    newBox.style.zIndex = 2;
    document.getElementById("collision-wrapper").appendChild(newBox);
    console.log(colliderArray);
    for (let i = 0; i < colliderArray.length; i++) { 
      console.log("check");
      detect2DBoxCollision(newBox.getBoundingClientRect(), colliderArray[i]);
    }    
    colliderArray.push(newBox.getBoundingClientRect());
  }

  function detect2DBoxCollision(box1, box2){
    let collision = false;
    if(box1.left < box2.right &&
       box1.right > box2.left &&
       box1.top < box1.bottom &&
       box1.bottom > box2.top) {
        collision = true;
        console.log("hit")
      }
    return collision;
  }

}
