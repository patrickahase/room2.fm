import React, { useEffect } from 'react';
import A11yDialog from 'a11y-dialog';

export default function IntroModal(props) {

  const modalStyle = {
    modalWrapper: {
      position: 'absolute',
      left: '0vw',
      top: '0vw',
      width: '100%',
      height: '100%',
      padding: '1.5rem',
      backgroundColor: 'var(--comp-col-01)',
      color: 'var(--comp-col-02)'
    },
    modalBox: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      borderTop: 'solid 2px var(--comp-col-02)'
    },
    AOCTitle: {
      fontSize: '2.5rem',
      flexGrow: 1
    },
    AOCText: {
      fontSize: '1.25rem',
      paddingBottom: '2rem'
    },
    AOCButton: {
      fontSize: '1.5em',
      backgroundColor: 'var(--comp-col-03)',
      color: 'var(--comp-col-01)',
      border: 'none',
      padding: '0.4rem'
    }
  }

  // run on init
  useEffect(() => {
    const container = document.getElementById("intro-modal");
    const dialog = new A11yDialog(container);
    dialog.show();
    props.setIntroModal(dialog);
  }, []);

  const modalPages = [
    /* AOC */
    <>
      <h2 style={modalStyle.AOCTitle}>Acknowledgement</h2>
      <p style={modalStyle.AOCText}>
        This website was produced and is maintained on the unceded territory of the Wurundjeri Woi Wurrung and Bunurong Boon 
        Wurrung peoples of the Eastern Kulin Nation, the Traditional Custodians of the land. We recognise their ongoing legacy 
        of connection to land, waters and culture and pay respect to their Elders past and present. We extend this respect to 
        all other First Nations peoples and Traditional Custodians whose land the material pathways that allow our digital 
        connectivity are built upon.
      </p>
      <button style={modalStyle.AOCButton}
              /* onClick={() => {props.setCurrentModalPage(props.currentModalPage + 1)}}> */
              onClick={() => {props.toggleModal()}}>
        <b>CONTINUE</b>
      </button>
    </>,

    <div></div>,

    <div></div>
  ]

  return (
    <div id="intro-modal"
         className="ModalWrapper"
         aria-labelledby="modal-title"
         aria-hidden="false"
         style={modalStyle.modalWrapper}
         >

      <div data-a11y-dialog-hide className="ModalOverlay" ></div>

      <div role="document" className="ModalBox" style={modalStyle.modalBox}>
        {modalPages[props.currentModalPage]}
      </div>
    </div>
  )

  
}
