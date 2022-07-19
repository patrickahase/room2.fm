import React, { useEffect } from 'react'

export default function ResponseDisplay(props) {
  
  //length between displaying the responses
  const responseLoopDelay = 1000;

  // run loop once new response data arrives
  useEffect(() => {
    displayResponsesLoop(props.responseData);
  }, [props.responseData]);

  return (
    <div id="response-wrapper"></div>
  )

  // loop through the responses
  function displayResponsesLoop(responseData){
    let responses = responseData;
    responseData.pop();
    if (responseData.length > 0){ 
      setTimeout(displayResponses, responseLoopDelay, responseData) }
  }
}
