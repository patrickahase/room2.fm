import React, { useEffect } from 'react'

export default function SettingsMenu(props) {

  useEffect(() => {
    document.getElementById("settings-menu-wrapper").addEventListener("mouseleave", () => {
      setDisplay("settings-dropdown", "none");
    });
  },[]);

  return (
    <div id="settings-menu-wrapper" className='Collider'>
      <button className="SettingsMenuButton" id="settings-menu-button" onClick={() => {setDisplay("settings-dropdown", "flex")}}>MENU</button>
      <div id="settings-dropdown">
        <button className="SettingsMenuButton" id="settings-info-button" onClick={() => props.toggleModal()}>INFO</button>
        <button className="SettingsMenuButton" id="settings-focus-button" onClick={() => props.toggleFocus()}>FOCUS MODE</button>   
      </div>
      
    </div>
  )
  function setDisplay(id, displayMode){
    document.getElementById(id).style.display = displayMode;
  }
  function changeActiveButton(e){
    Array.from(document.getElementsByClassName("SettingsMenuButton")).forEach(button => {
      button.classList.remove("Active");
    });
    e.target.classList.add("Active");
    setDisplay("graphics-dropdown", "none");
  }
}

