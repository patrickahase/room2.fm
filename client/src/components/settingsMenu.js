import React from 'react'

export default function SettingsMenu(props) {
  return (
    <div id="settings-menu-wrapper" className='Collider'>

      <button id="settings-menu-button">MENU</button>
      <div id="settings-dropdown">

        <button id="settings-info-button">INFO</button>

        <button id="settings-graphics-button">GRAPHICS</button>
        <div id="graphics-dropdown">
          <button className="GraphicsButton">LOW</button>
          <button className="GraphicsButton">MEDIUM</button>
          <button className="GraphicsButton">HIGH</button>
        </div>

        <button id="settings-focus-button" onClick={props.toggleFocus}>FOCUS</button>

      </div>      
    </div>
  )
}



/* import React, { Component } from 'react'

export class SettingsMenu extends Component {
  render() {
    return (
      <div id="settings-menu-wrapper">
      <button id="settings-menu-button">MENU</button>
      <div id="settings-dropdown">
        <button id="settings-info-button" onClick={this.props.overlayToggle}>INFO</button>
        <button id="settings-graphics-button">GRAPHICS</button>
          <div id="graphics-dropdown">
            <button className="GraphicsButton">LOW</button>
            <button className="GraphicsButton">MEDIUM</button>
            <button className="GraphicsButton">HIGH</button>
          </div>
        <button id="settings-focus-button" onClick={this.props.toggleFocus}>FOCUS</button>
      </div>
      
      </div>
    )
  }
}

export default SettingsMenu */
