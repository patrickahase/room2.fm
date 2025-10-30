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
          co-created by Patrick McMahon and Anuraag Bhatia.
        </p>
        <p>
          This documentation was created as part of Patrick McMahon's PhD submission, as a way to provide access 
          to the UI. As the original work was a multi-user experience, built around its own ephemerality 
          and the anonymity of its submissions, this documentation does not connect to the original server,
          nor capture responses from any other users. The responses seen within have all been submitted by 
          myself (Patrick) to give a simulation of what visiting async while it was open would have been like.
        </p>
        <p>
          Other than this modal page, and the simulated server responses, I have tried to keep the site as it was,
          however the third party chat bar on the right hand side has been removed, and other small changes were 
          necessary due to updated package dependencies, and to be able to simultaneously serve the async configuration.
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
                * ******** &amp; *** ***** <br />
                w/ interstitial sounds by * <br />
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
            <p>
            Prompt responses from the online and in-person event will be intermingled and viewable for both digital and face-to-face participants.
            </p>
              <span className="ModalTextSmall">
              If you would like a high-contrast version of the response text with no distortion please click 'Focus Mode' button.    
              <br />
              <br /> 
              room2.fm was created by <a href="https://patrickhase.xyz" target="_blank" rel="noreferrer">Patrick Hase</a> and <a href="https://soundcloud.com/anuraag69" target="_blank" rel="noreferrer">Anuraag Bhatia</a>.
              <br />
              <br />
              We welcome your thoughts, feedback, or questions - please send them through to room2fm@gmail.com
            </span>
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