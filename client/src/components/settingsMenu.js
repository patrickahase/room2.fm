import React, { useEffect } from 'react'

export default function SettingsMenu(props) {

  useEffect(() => {
    document.getElementById("graphics-dropdown-wrapper").addEventListener("mouseleave", () => {
      setDisplay("graphics-dropdown", "none");
    });
  },[]);

  return (
    <div id="settings-menu-wrapper" className='Collider'>
      <button className="SettingsMenuButton" id="settings-info-button" onClick={() => props.toggleModal()}>INFO</button>
      <button className="SettingsMenuButton" id="settings-focus-button" onClick={() => props.toggleFocus}>FOCUS MODE</button>   
      <div id="graphics-dropdown-wrapper">
        <button className="SettingsMenuButton" id="settings-graphics-button" onClick={() => {setDisplay("graphics-dropdown", "flex")}}>GRAPHICS SETTINGS</button>    
        <div id="graphics-dropdown">
          <button className="SettingsMenuButton Active" onClick={e => 
            {changeActiveButton(e);
            props.setGraphicsSettings(1);}}
          >HIGH</button>
          <button className="SettingsMenuButton" onClick={e => 
            {changeActiveButton(e)
            props.setGraphicsSettings(10);}}
          >MEDIUM</button>
          <button className="SettingsMenuButton" onClick={e => 
            {changeActiveButton(e)
            props.setGraphicsSettings(20);}}
          >LOW</button>
        </div>
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

