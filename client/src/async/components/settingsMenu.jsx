export default function SettingsMenu(props) {

  return (
    <div id="settings-menu-wrapper" className='Collider'>
      <button className="SettingsMenuButton" id="settings-info-button" onClick={() => props.toggleModal()}>INFO</button>
      <button className="SettingsMenuButton" id="settings-focus-button" onClick={() => props.toggleFocus()}>FOCUS MODE</button>   
    </div>
  )
}

