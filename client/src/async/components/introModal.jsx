import { useEffect } from 'react';
import A11yDialog from 'a11y-dialog';

export default function IntroModal(props) {
  
  // run init on load
  useEffect(() => {
    const container = document.getElementById("AOC-modal");
    const dialog = new A11yDialog(container);
    dialog.show();
    props.setIntroModal(dialog);
  },[]);

  let modalPages = [
  
    //page 1 Declaration
    <div id="modal-page-wrapper">
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2 async...
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper" className="modal-text-wrapper-aoc" style={{textAlign: 'center'}}>
        <div id="modal-text" style={{alignItems: 'center', justifyContent: 'center'}}>
          <p style={{fontSize: "1.75rem"}}>
            This website is a limited documentation of the aysnc configuration of the room2 project, which was 
            co-created by Patrick McMahon and Anuraag Bhatia.
          </p>
          <p style={{fontSize: "1.75rem"}}>
            This documentation was created as part of Patrick McMahon's PhD submission, as a way to provide access 
            to the UI. As the original work was a multi-user experience, built around its own ephemerality 
            and the anonymity of its submissions, this documentation does not connect to the original server,
            nor capture responses from any other users. The responses seen within have all been submitted by 
            myself (Patrick) to give a simulation of what visiting async while it was open would have been like.
          </p>
          <p style={{fontSize: "1.75rem"}}>
            Other than this modal page, and the simulated server responses, I have tried to keep the site as it was,
            however other small changes were necessary due to updated package dependencies, and to be able to simultaneously 
            serve the sync configuration.
          </p>
        </div>          
      </div>
      <button id="modal-continue-button" onClick={() => nextModalPage()}> Continue </button>
    </div>,
    
    //page 2 AOC
    <div id="modal-page-wrapper">
      <div id="modal-text-wrapper" className="modal-text-wrapper-aoc" style={{textAlign: 'center'}}>
          <div id="modal-text" style={{alignItems: 'center', justifyContent: 'space-around'}}>
            <p style={{fontSize: "2rem"}}>
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
          <hr />
          <p>
            This website has been optimised to run with the window maximised on Chrome and Firefox on a landscape desktop or laptop screen. 
            If you are having issues, please try using one of these browsers.
            <br />
            <br />
            If you would like a high-contrast version of the response text with no distortion please click 'Focus Mode' button.
          </p>
        </div>
      </div>        
      <button id="modal-continue-button" onClick={() => {props.toggleModal();}}> Enter </button>
    </div>,
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
    let textWrapper = document.getElementById("modal-text-wrapper");
    if(textWrapper){
      textWrapper.scrollTop = 0;
    }
    //window.removeEventListener("keydown", secretKey);
  }

}


