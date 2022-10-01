import React, { useEffect } from 'react'

export default function IntroModal(props) {

  const modalStyle = {
    modalWrapper: {
      position: 'absolute',
      left: '0vw',
      top: '0vw',
      width: '100%',
      height: '100%',
      padding: '6vh 2rem'
    },
    modalBox: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }

  // run on init
  useEffect(() => {
    const container = document.getElementById("intro-modal");
    const dialog = new A11yDialog(container);
    dialog.show();
    props.setIntroModal(dialog);
  }, []);

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

  const modalPages = [
    <div></div>,
    <div></div>,
    <div></div>
  ]
}
