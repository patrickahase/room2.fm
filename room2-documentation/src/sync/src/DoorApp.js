import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function DoorApp() {

  const doorStyle = {
    width:'100%',
    height:'100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#222323'
  }

  return (
    /*  */
    <div style={doorStyle}>
      <img src="https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/room2-async-tracks/room2-logo-cap.PNG" alt="room2 logo" style={{maxWidth: '100%'}}></img>
    </div>
  )
}
