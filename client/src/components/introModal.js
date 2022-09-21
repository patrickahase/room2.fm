import React, { useEffect, useState, Component } from 'react';
import A11yDialog from 'a11y-dialog';
import { acknowledgementOfCountryText, introText, instructionsText, /* warningText */ } from '../content/modalText';
import WhereAreYou from './whereModal';

export default function IntroModal(props) {
  
  // run init on load
  useEffect(() => {
    const container = document.getElementById("AOC-modal");
    const dialog = new A11yDialog(container);
    dialog.show();
    props.setIntroModal(dialog);
  },[]);

  let modalPages = [
    //page 1 Logo - no continue button on this one if the site needs to get closed
    <div id="logo-wrapper">
      <div id="text-logo">
        <pre id="pre-logo-wrapper">
          <div id="logo-line-1">__________________________________________________________________<u className="text-gradient-1">/\\\\\\\\\</u>_____        <br/></div>
          <div id="logo-line-2">&nbsp;________________________________________________________________<u className="text-gradient-2">/\\\///////\\\</u>___       <br/></div>
          <div id="logo-line-3">&nbsp;&nbsp;_______________________________________________________________<u className="text-gradient-3">\///</u>______<u className="text-gradient-3">\//\\\</u>__      <br/></div>
          <div id="logo-line-4">&nbsp;&nbsp;&nbsp;__<u className="text-gradient-4">/\\/\\\\\\\</u>______<u className="text-gradient-4">/\\\\\</u>________<u className="text-gradient-4">/\\\\\</u>_______<u className="text-gradient-4">/\\\\\</u>__<u className="text-gradient-4">/\\\\\</u>_____________<u className="text-gradient-4">/\\\/</u>___     <br/></div>
          <div id="logo-line-5">&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-5">\/\\\/////\\\</u>___<u className="text-gradient-5">/\\\///\\\</u>____<u className="text-gradient-5">/\\\///\\\</u>___<u className="text-gradient-5">/\\\///\\\\\///\\\</u>________<u className="text-gradient-5">/\\\//</u>_____    <br/></div>
          <div id="logo-line-6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-6">\/\\\</u>___<u className="text-gradient-6">\///</u>___<u className="text-gradient-6">/\\\</u>__<u className="text-gradient-6">\//\\\</u>__<u className="text-gradient-6">/\\\</u>__<u className="text-gradient-6">\//\\\</u>_<u className="text-gradient-6">\/\\\</u>_<u className="text-gradient-6">\//\\\</u>__<u className="text-gradient-6">\/\\\</u>_____<u className="text-gradient-6">/\\\//</u>________   <br/></div>
          <div id="logo-line-7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-7">\/\\\</u>_________<u className="text-gradient-7">\//\\\</u>__<u className="text-gradient-7">/\\\</u>__<u className="text-gradient-7">\//\\\</u>__<u className="text-gradient-7">/\\\</u>__<u className="text-gradient-7">\/\\\</u>__<u className="text-gradient-7">\/\\\</u>__<u className="text-gradient-7">\/\\\</u>___<u className="text-gradient-7">/\\\/</u>___________  <br/></div>
          <div id="logo-line-8">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-8">\/\\\</u>__________<u className="text-gradient-8">\///\\\\\/</u>____<u className="text-gradient-8">\///\\\\\/</u>___<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">/\\\\\\\\\\\\\\\</u>_ <br/></div>
          <div id="logo-line-9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-9">\///</u>_____________<u className="text-gradient-9">\/////</u>________<u className="text-gradient-9">\/////</u>_____<u className="text-gradient-9">\///</u>___<u className="text-gradient-9">\///</u>___<u className="text-gradient-9">\///</u>__<u className="text-gradient-9">\///////////////</u>__<br/></div>
        </pre>            
      </div>
    </div>,
  
    //page 2 AOC
    <div id="modal-page-wrapper">
      <div id="modal-text-wrapper" className="modal-text-wrapper-aoc" style={{textAlign: 'center'}}>
          <div id="modal-text" style={{alignItems: 'center', justifyContent: 'space-around'}}>
            <p id="aoc-text">
              This website was produced and is maintained on the unceded territory of the Bunurong Boon Wurrung and Wurundjeri Woi 
              Wurrung peoples of the Eastern Kulin Nation, the Traditional Custodians of the land. We recognise their ongoing legacy 
              of connection to land, waters and culture and pay respect to their Elders past and present. We extend this respect to 
              all other First Nations peoples and Traditional Custodians whose land the material pathways that allow our digital 
              connectivity are built upon.
            </p>
            
            <WhereAreYou />
       
          </div>          
      </div>
      <button id="modal-continue-button" onClick={() => nextModalPage()}> Continue </button>
    </div>,
    
    //page 3 Welcome
    <div id="modal-page-wrapper">
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm live
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            <p>
              room2.fm is a digital space for collective reflection, sharing, and vulnerability. Today @ 2pm =&gt; 7pm (AEST) we will be 
              hosting sets from: <br />
              <p style={{fontSize: '1.95rem', padding: '1rem'}}>
                amby downs &amp; Joel Spring <br />
                Hei Zhi Ma, Panda Wong, &amp; Wei Huang <br />
                Mohamed Chamas &amp; Aarti Jadu <br />
                E Fishpool &amp; Sam Miers <br />
                w/ interstitial sounds by J <br />
              </p>
              There is no right or wrong way for you to listen, respond to, or feel the work presented @ room2. We encourage you to trust 
              your senses and intuition and respond sincerely and in whatever way feels true to your experience.
            </p>
            <p className="ModalTextSmall">
              This website has been optimised to run with the window maximised on Firefox or Chrome on a desktop or laptop screen. 
              If you are having issues, please try using one of these browsers.
            </p>
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => nextModalPage()}> Continue </button>
    </div>,
  
    //page 4 Instructions
    <div id="modal-page-wrapper">
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm live
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            <p>You can share your response to the prompts, music and visuals in a number of ways:</p>
            <p>
              Periodically, prompts will come up in the lower middle of the screen. You can write or draw your response in the white box at the bottom 
              of the screen before clicking the ‘submit response’ button to share it with others. Your responses to these prompts will be completely 
              anonymised and not attributable to you in any way. Above the ‘submit response’ button, you can select the colour palette you will be able 
              to draw responses with.
            </p>
            <p>
              You can use the chat box on the right of the screen to directly speak to others participating. Select a username and click ‘Join Room’ to 
              engage. Be yourself, be someone else, be whomever you want to be!
            </p>
            <p>
              Prompt responses from the online and in person event will be intermingled and viewed no matter how you tune into room2
            </p>
              <span className="ModalTextSmall">
              This website was produced on the unceded territory of the Bunurong Boon Wurrung and Wurundjeri Woi Wurrung peoples of 
              the Eastern Kulin Nation and we pay respect to their Elders past and present.
              <br />
              <br />
              If you would like a high-contrast version of the response text with no distortion please click 'Focus Mode' button.    
              <br />
              <br /> 
              room2.fm was created by <a href="https://patrickhase.xyz" target="_blank" rel="noreferrer">Patrick Hase</a> and <a href="https://soundcloud.com/anuraag69" target="_blank" rel="noreferrer">Anuraag Bhatia</a>. This 
              iteration contains additional development work and creative consultation from <a href="https://becfary.com/" target="_blank" rel="noreferrer">
              BF/Local Time</a> and was commissioned as part of <a href="https://bleedonline.net/" target="_blank" rel="noreferrer">BLEED</a>. 
              Additional credits can be viewed in the site's head tag.
              <br />
              <br />
              We welcome your thoughts, feedback, or questions - please send them through to room2fm@gmail.com
            </span>
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => props.toggleModal()}> Enter </button>
    </div>,

    // modal for welcome to country
    <div id="modal-page-wrapper">
      <div id="modal-text-wrapper" className="modal-text-wrapper-aoc" style={{textAlign: 'center'}}>
          <div id="modal-text" style={{alignItems: 'center', justifyContent: 'space-around'}}>
            <p id="aoc-text">
              This website was produced and is maintained on the unceded territory of the Bunurong Boon Wurrung and Wurundjeri Woi 
              Wurrung peoples of the Eastern Kulin Nation, the Traditional Custodians of the land. We recognise their ongoing legacy 
              of connection to land, waters and culture and pay respect to their Elders past and present. We extend this respect to 
              all other First Nations peoples and Traditional Custodians whose land the material pathways that allow our digital 
              connectivity are built upon.
            </p>
            
            <WhereAreYou />
       
          </div>          
      </div>
    </div>
  ]
  let mobileModalPages = [
    //page 1 Logo - no continue button on this one if the site needs to get closed
    <div id="logo-wrapper">
      <div id="text-logo">
        <pre id="pre-logo-wrapper">
          <div id="logo-line-1">__________________________________________________________________<u className="text-gradient-1">/\\\\\\\\\</u>_____        <br/></div>
          <div id="logo-line-2">&nbsp;________________________________________________________________<u className="text-gradient-2">/\\\///////\\\</u>___       <br/></div>
          <div id="logo-line-3">&nbsp;&nbsp;_______________________________________________________________<u className="text-gradient-3">\///</u>______<u className="text-gradient-3">\//\\\</u>__      <br/></div>
          <div id="logo-line-4">&nbsp;&nbsp;&nbsp;__<u className="text-gradient-4">/\\/\\\\\\\</u>______<u className="text-gradient-4">/\\\\\</u>________<u className="text-gradient-4">/\\\\\</u>_______<u className="text-gradient-4">/\\\\\</u>__<u className="text-gradient-4">/\\\\\</u>_____________<u className="text-gradient-4">/\\\/</u>___     <br/></div>
          <div id="logo-line-5">&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-5">\/\\\/////\\\</u>___<u className="text-gradient-5">/\\\///\\\</u>____<u className="text-gradient-5">/\\\///\\\</u>___<u className="text-gradient-5">/\\\///\\\\\///\\\</u>________<u className="text-gradient-5">/\\\//</u>_____    <br/></div>
          <div id="logo-line-6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-6">\/\\\</u>___<u className="text-gradient-6">\///</u>___<u className="text-gradient-6">/\\\</u>__<u className="text-gradient-6">\//\\\</u>__<u className="text-gradient-6">/\\\</u>__<u className="text-gradient-6">\//\\\</u>_<u className="text-gradient-6">\/\\\</u>_<u className="text-gradient-6">\//\\\</u>__<u className="text-gradient-6">\/\\\</u>_____<u className="text-gradient-6">/\\\//</u>________   <br/></div>
          <div id="logo-line-7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-7">\/\\\</u>_________<u className="text-gradient-7">\//\\\</u>__<u className="text-gradient-7">/\\\</u>__<u className="text-gradient-7">\//\\\</u>__<u className="text-gradient-7">/\\\</u>__<u className="text-gradient-7">\/\\\</u>__<u className="text-gradient-7">\/\\\</u>__<u className="text-gradient-7">\/\\\</u>___<u className="text-gradient-7">/\\\/</u>___________  <br/></div>
          <div id="logo-line-8">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-8">\/\\\</u>__________<u className="text-gradient-8">\///\\\\\/</u>____<u className="text-gradient-8">\///\\\\\/</u>___<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">/\\\\\\\\\\\\\\\</u>_ <br/></div>
          <div id="logo-line-9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-9">\///</u>_____________<u className="text-gradient-9">\/////</u>________<u className="text-gradient-9">\/////</u>_____<u className="text-gradient-9">\///</u>___<u className="text-gradient-9">\///</u>___<u className="text-gradient-9">\///</u>__<u className="text-gradient-9">\///////////////</u>__<br/></div>
        </pre>            
      </div>
    </div>,
  
    //page 2 AOC
    <div id="modal-page-wrapper">
      <div id="modal-text-wrapper" className="modal-text-wrapper-aoc" style={{textAlign: 'center'}}>
          <div id="modal-text" style={{alignItems: 'center', justifyContent: 'space-around'}}>
            <p id="aoc-text">
              This website was produced and is maintained on the unceded territory of the Bunurong Boon Wurrung and Wurundjeri Woi 
              Wurrung peoples of the Eastern Kulin Nation, the Traditional Custodians of the land. We recognise their ongoing legacy 
              of connection to land, waters and culture and pay respect to their Elders past and present. We extend this respect to 
              all other First Nations peoples and Traditional Custodians whose land the material pathways that allow our digital 
              connectivity are built upon.
            </p>           
          </div>          
      </div>
      <button id="modal-continue-button" onClick={() => nextModalPage()}> Continue </button>
    </div>,
  
    //page 4 Instructions
    <div id="modal-page-wrapper">
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm live
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            <p>
              This mobile version of room2.fm is for use at the live event hosted at Arts House. If you are logging in remotely 
              please do so on a desktop or laptop computer for the full room2 experience.
            </p>
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => props.toggleModal()}> Enter </button>
    </div>
  ]

  return (
    <div id="AOC-modal"
         className="ModalWrapper"
         aria-labelledby="modal-title"
         aria-hidden="false" >

      <div data-a11y-dialog-hide className="ModalOverlay" ></div>

      <div role="document" className="ModalBox">
        {props.mobile
          ? <>{mobileModalPages[props.currentModalPage]}</>
          : <>
            {modalPages[props.currentModalPage]}
          </>}
      </div>
    </div>
  )

  function nextModalPage(){
    props.setCurrentModalPage(props.currentModalPage + 1);
    document.getElementById("modal-text-wrapper").scrollTop = 0;
  }
}