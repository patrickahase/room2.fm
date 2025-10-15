import { useEffect } from 'react';
import A11yDialog from 'a11y-dialog';

export default function IntroModal(props) {
  
  // run init on load
  useEffect(() => {
    const container = document.getElementById("AOC-modal");
    const dialog = new A11yDialog(container);
    dialog.show();
    props.setIntroModal(dialog);    
    //window.addEventListener("keydown", secretKey);
  },[]);

  let modalPages = [
    //page 1 Logo - no continue button on this one if the site needs to get closed
    <>
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
    </div>
    <p>Documentation for Patrick McMahon's Research</p>
    <nav>
      <a>async</a>
      <a>sync</a>
    </nav>
    </>,
  
    //page 2 AOC
    <div id="modal-page-wrapper">
      <div id="modal-text-wrapper" className="modal-text-wrapper-aoc" style={{textAlign: 'center'}}>
          <div id="modal-text" style={{alignItems: 'center', justifyContent: 'space-around'}}>
            <p style={{fontSize: "1.75rem"}}>
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
  
    //page 3 Welcome
    <div id="modal-page-wrapper">
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm async
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            <p>
              The current cycle's track is:
              <br />
              <span style={{fontSize: '1.95rem'}}>{props.cyclePreset.trackDetails}</span>
            </p>
            <p>{props.cyclePreset.artistDetails}</p>
            <p>
              room2.fm is a digital space for collective reflection, sharing, and vulnerability. Upon entering you will be presented with 
              an audio track and a written prompt which you can respond to via your choice of writing or drawing. You can then anonymously 
              submit your response to the room2 server after which you will be able to view responses others have also shared.
            </p>
            <p>
              There is no right or wrong way for you to listen, respond to, or feel a piece of music or sound. We encourage you to 
              trust your ears and intuition and respond sincerely and in whatever way feels true to your experience.
            </p>
            <p className="ModalTextSmall">
              This iteration of room2.fm is part of the wider <a href="https://bleedonline.net/" target="_blank" rel="noreferrer">BLEED</a> program.
              <br />
              <br />
              This website has been optimised to run with the window maximised on Chrome and Firefox on a desktop or laptop screen. 
              If you are having issues, please try using one of these browsers or changing the graphics settings.
              <br />
              <br />
              If you would like a high-contrast version of the response text with no distortion please click 'Focus Mode' button.
          </p>
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => {nextModalPage(); props.toggleModal();}}> Enter </button>
    </div>,
  
    //page 4 Instructions
    <div id="modal-page-wrapper">
      <div id="modal-title-wrapper">
        <div id="modal-title">
          room2.fm async
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            <p style={{fontSize: '1.2rem'}}>
            The current cycle's track is:
            <br />
            <span style={{fontSize: '1.95rem'}}>{props.cyclePreset.trackDetails}</span> 
            <br />
            <br />
            <span>
              room2.fm is a digital space for collective reflection, sharing, and vulnerability. For four weeks across the course 
              of <a href="https://bleedonline.net/" target="_blank" rel="noreferrer">BLEED</a> room2 will be presenting nine  
              cycles of music accompanied by reflective writen prompts and generative graphics. The cycles will change approximately 
              every three days, while the sun is setting in Narrm — with times set to 'Australian Eastern Standard Time' or GMT+10, and 
              location and climate info set to the approximate coordinates of Arts House in North Melbourne on Boon Wurrung and Wurundjeri Country.
            </span>            
            <br />  
            <br />
            <span>
              The only information we record from your visit to room2 is the response itself and the time it was submitted.
            </span>
            </p>

            <span className="ModalTextSmall">
              This website has been optimised to run with the window maximised on Chrome and Firefox on a desktop or laptop screen. 
              If you are having issues, please try using one of these browsers or changing the graphics settings.
              <br />
              <br />
              If you would like a high-contrast version of the response text with no distortion please click 'Focus Mode' button.   
              <br />
              <br /> 
              This website was produced on the unceded territory of the Bunurong Boon Wurrung and Wurundjeri Woi Wurrung peoples of 
              the Eastern Kulin Nation and we pay respect to their Elders past and present.
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
      <button id="modal-continue-button" onClick={() => props.toggleModal()}> Return</button>
    </div>,
    //page 3 Welcome
    <div id="modal-page-wrapper">
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm async
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            <p>
              
              <span>
                While listening to the audio you will be asked to respond to the prompt through either writing or drawing before anonymously 
                submitting it to the room2 server. Once you've shared your own response you will be able to see the previous responses of other
                users.
              </span>
              <br />  
              <br />
              <span>
                There is no right or wrong way for you to listen, respond to, or feel a piece of music or sound. We encourage you to 
                trust your ears and intuition and respond sincerely and in whatever way feels true to your experience.
              </span>
              <br />
              <br />
              
              <br />    
              <br />
            </p>
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => {nextModalPage(); props.toggleModal();}}> Continue </button>
    </div>,
  
    //page 4 Instructions
    <div id="modal-page-wrapper">
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm async
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            The current cycle's track is:
            <br />
            <p style={{fontSize: '1.95rem'}}>{props.cyclePreset.trackDetails} by <a href={props.cyclePreset.artistLink} target="_blank" rel="noreferrer">{props.cyclePreset.artistDetails}</a></p>        
            <br />       
            <br />
            <span className="ModalTextSmall">
    This website has been optimised to run with the window maximised on Chrome and Firefox on a desktop or laptop screen. 
    If you are having issues, please try one of these browsers.
    <br />
    <br />
    If you would like a high-contrast version of the response text with no distortion please click 'Focus Mode' button.   
    <br />
    <br /> 
    room2.fm was created by <a href="https://patrickhase.xyz" target="_blank" rel="noreferrer">Patrick Hase</a> and Anuraag Bhatia. This 
    iteration contains additional development work and creative consultation from <a href="https://becfary.com/" target="_blank" rel="noreferrer">
    BF/Local Time</a> and was commissioned as part of <a href="https://bleedonline.net/" target="_blank" rel="noreferrer">BLEED</a>. Additional credits 
    can be viewed in the head tag.
    <br />
    <br />
    We welcome your thoughts, feedback, or questions - please send them through to room2fm@gmail.com
</span> 
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => props.toggleModal()}> Continue </button>
    </div>
  ]

  return (
    <div id="AOC-modal"
         className="ModalWrapper"
         aria-labelledby="modal-title"
         aria-hidden="false" >

      <div data-a11y-dialog-hide className="ModalOverlay" ></div>

      <div role="document" className="ModalBox">
        {modalPages[props.currentModalPage]}
      </div>
    </div>
  )

  function nextModalPage(){
    props.setCurrentModalPage(props.currentModalPage + 1);
    document.getElementById("modal-text-wrapper").scrollTop = 0;
    //window.removeEventListener("keydown", secretKey);
  }

}


