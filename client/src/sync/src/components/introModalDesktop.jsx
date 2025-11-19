import { useEffect } from 'react';
import A11yDialog from 'a11y-dialog';

export default function IntroModalDesktop(props) {
  
  // run init on load
  useEffect(() => {
    const container = document.getElementById("AOC-modal");
    const dialog = new A11yDialog(container);
    dialog.show();
    props.setIntroModal(dialog);
  },[]);

  let modalPages = [
    //page 1 Logo - no continue button on this one if the site needs to get closed
    <>
      <div id="modal-title-wrapper">
        <h2 id="modal-title">
          Welcome to room2 sync...
        </h2>
        <hr />
      </div>
      <div id="modal-text-wrapper">
        <div id="modal-text">
        <p>
          This website is a limited documentation of the aysnc configuration of the room2 project, which was 
          co-created by Patrick McMahon and Anuraag Bhatia. This documentation was created as part of Patrick 
          McMahon's PhD submission, as a way to provide access to the UI.
        </p>
        <p>
          The original work was a multi-user experience, built around its own ephemerality and the anonymity of 
          its users' submissions. As such this documentation does not contain nor capture user responses, or even 
          connect to the original server.
        </p>
        <p>
          The simulation involves several prompts which change over a five minute period, at a much faster rate than 
          occured during a typical sync event, and responses submitted by myself (Patrick) to give a sense of what visiting 
          sync while it was open would have been like. There is no streamed sound component, however I was listening to 
          <a href="https://on.soundcloud.com/E2WOFlRr6Xcj4h24ZH" target='_blank' rel="noreferrer"> this mix</a> from 
          Anuraag in another tab while making my responses.
        </p>
        <p>
          Other than this modal page, and the simulated prompts and user responses, I have tried to keep the site as it 
          was, however elements have been modified and removed as appropriate, such as the afforementioned audio stream 
          and the third part chat component have been removed. Other small changes were necessary due to updated package 
          dependencies, and other technical requirements of the documentation format.
        </p>        
        </div>
      </div>
      <button id="modal-continue-button" onClick={() => nextModalPage()}> Continue </button>
    </>,
  
    //page 2 AOC
    <>
      <div id="modal-text-wrapper" >
          <div id="modal-text">
            <p style={{fontSize: "2rem"}}>
              This website was produced and is maintained on the unceded territory of the Wurundjeri Woi Wurrung and Bunurong Boon 
              Wurrung peoples of the Eastern Kulin Nation, the Traditional Custodians of the land. We recognise their ongoing legacy 
              of connection to land, waters and culture and pay respect to their Elders past and present. We extend this respect to 
              all other First Nations peoples and Traditional Custodians whose land the material pathways that allow our digital 
              connectivity are built upon.
            </p>       
          </div>          
      </div>
      <button id="modal-continue-button" onClick={() => nextModalPage()}> Continue </button>
    </>,
    
    //page 3 Welcome
    <>
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm live
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            <p>
              room2.fm is a digital space for collective reflection, sharing, and vulnerability. <br/>
              Today @ 2pm =&gt; 7pm (AEST) we will be hosting works from:
            </p>
              <p style={{fontSize: '1.95rem', padding: '1rem'}}>
                **** ***** &amp; **** ***** <br />
                ***** **** &amp; *** (*** *** **) &amp; *** ***** <br />
                ******* ****** &amp; ***** **** <br />
                * ******** &amp; *** *****
              </p>
            <p>
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
    </>,
  
    //page 4 Instructions
    <>
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm live
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            <p>During room2 prompts will periodically come up in the lower middle of the screen. You can share your response to the prompts, music and visuals in a number of ways:</p>
            <p>
            You can write or draw your response in the white box at the bottom of the screen before clicking the ‘submit response’ button to share it with others. Your responses to 
            these prompts will be completely anonymised and not attributable to you in any way. Above the ‘submit response’ button, you can select the colour palette you will be able 
            to draw responses with.
            </p>
            <p>
              You can use the chat box on the right of the screen to directly speak to others participating. Select a username and click ‘Join Room’ to 
              engage. Be yourself, be someone else, be whomever you want to be!
            </p>
            <hr />
            <p className="ModalTextSmall">
              If you would like a high-contrast version of the response text with no distortion please click 'Focus Mode' button.    
            </p>
            <p className="ModalTextSmall">
              room2.fm was created by <a href="https://patrickhase.xyz" target="_blank" rel="noreferrer">Patrick Hase</a> and 
              <a href="https://soundcloud.com/anuraag69" target="_blank" rel="noreferrer">Anuraag Bhatia</a>. We welcome your thoughts, 
              feedback, or questions - please send them through to *******@*****.com
            </p>
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => props.toggleModal()}> Enter </button>
    </>
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
  }
}