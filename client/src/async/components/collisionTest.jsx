import React, { useEffect, useState } from 'react';

export default function CollisionTest() {

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
      <div id="red-box" className="Collider" style={redBox}></div>
    </div>
  )

  function generateNewBox(){
    let newBox = document.createElement("div");
    let collision = false;
    newBox.style.position = 'absolute';
    newBox.style.left = Math.random() * 80 + '%';
    newBox.style.top = Math.random() * 80 + '%';
    newBox.style.width = '20vw';
    newBox.style.height = '20vh';
    newBox.style.backgroundColor = 'green';
    newBox.style.zIndex = 2;
    document.getElementById("collision-wrapper").appendChild(newBox);
    let colliderArray = Array.from(document.getElementsByClassName("Collider"));
    // colliderArray[0] is always the middle so we never remove that
    if(colliderArray.length > 3) { colliderArray[1].remove(); }
    for (let i = 0; i < colliderArray.length; i++) {
      if(detect2DBoxCollision(newBox.getBoundingClientRect(), colliderArray[i].getBoundingClientRect()) && !collision){
        collision = true;
      }
    }
    if(collision){
      newBox.remove();
      window.requestAnimationFrame(generateNewBox);
      console.log("loop");
    } else {
      newBox.classList.add("Collider");
      newBox.classList.add("Destroyable");
    }  
  }

  function detect2DBoxCollision(box1, box2){
    let collision = false;
    if(box1.left < box2.right &&
       box1.right > box2.left &&
       box1.top < box1.bottom &&
       box1.bottom > box2.top) {
        collision = true;
        console.log("hit");
      }
    return collision;
  }

}
