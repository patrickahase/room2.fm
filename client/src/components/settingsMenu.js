import React, { Component } from 'react'

export class SettingsMenu extends Component {
  render() {
    return (
      <div id="settings-menu-wrapper">
      <button id="settings-menu-button">MENU</button>
      <div id="settings-dropdown">
        <button id="settings-info-button">INFO</button>
        {/* <button id="settings-graphics-button">GRAPHICS</button>
          <div id="graphics-dropdown">
            <button className="GraphicsButton">LOW</button>
            <button className="GraphicsButton">MEDIUM</button>
            <button className="GraphicsButton">HIGH</button>
          </div> */}
        <button id="settings-focus-button">FOCUS</button>
      </div>
      
      </div>
    )
  }
}

export default SettingsMenu
