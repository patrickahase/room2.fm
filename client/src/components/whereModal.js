import React, { useEffect, useState } from 'react';

const IP_API = 'https://ipinfo.io/json?token=9f90c3a3f131ff' 
const NATIVE_LAND_API = 'https://native-land.ca/api/index.php'
var youlat;
var youlong; 

export default function WhereAreYou () {
  const [whereTerritories, getTerritories] = useState([]);
  
  const [isChecking, setIsChecking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <p>Where are you visiting from?</p>    
    {isChecking
      ?<>{isLoading
        ? <WhereThrobber />
        : <>{whereTerritories}</> 
        }</>
      :<button id="ip-check-button" onClick={() => runCheck()}>Check with my IP</button>      
    }    
  </div>)

  function runCheck(){
    setIsChecking(true);
    getPotentialLocations()
    .then(data => {
      setIsLoading(false);
      getTerritories(data);
    }      
    );
  }
}



async function getPotentialLocations() {  
  const ipData = await getLocationDataFromIp();
  if (!ipData) return <>
  <span>We couldn't access your IP, and couldn't find information information about indigenous nations at your location, but this does not mean that there aren't any.
    Do you know whose land you're on?*
  </span>
  <br />
  <span className="ModalTextSmall">
  <span className="astrix">*</span> 
    The information presented here is derived from the maps at <a href="https://native-land.ca/" target="_blank" rel="noreferrer">Native Land Digital</a>, cross-referenced with data from <a href="https://ipinfo.io/" target="_blank" rel="noreferrer">ipinfo.io</a>. 
    Note that this is based on your internet service provider's location, and may be incorrect for your actual physical location. 
    This is not authoritative or representative and should be approached critically.
    Code is adapted from <i>Where Are We</i>, which you can learn more about on <a href="https://github.com/e-e-e/where-are-we" target="_blank" rel="noreferrer">GitHub</a>. Your IP data is not stored.
  </span>
  </>
  const territories = await getTerritoriesFromLngLat(youlat, youlong)

  if (territories.length === 1) {
    return (
    <>
    <span>Your IP suggests that you may be on <a href={territories[0].properties.description} target='_blank' rel="noreferrer">{territories[0].properties.Name}</a> country, otherwise known as {ipData.commonName}.*</span>
    <br />
    <span className="ModalTextSmall">
    <span className="astrix">*</span> 
    The information presented here is derived from the maps at <a href="https://native-land.ca/" target="_blank" rel="noreferrer">Native Land Digital</a>, cross-referenced with data from <a href="https://ipinfo.io/" target="_blank" rel="noreferrer">ipinfo.io</a>. 
    Note that this is based on your internet service provider's location, and may be incorrect for your actual physical location. 
    This is not authoritative or representative and should be approached critically.
    Code is adapted from <i>Where Are We</i>, which you can learn more about on <a href="https://github.com/e-e-e/where-are-we" target="_blank" rel="noreferrer">GitHub</a>. Your IP data is not stored.
    </span>
    </>
    )
  } else if (territories.length > 1) {
    return <>
    <span>Your IP suggests that you may be on <a href={territories[0].properties.description} target='_blank' rel="noreferrer"> {territories[0].properties.Name}</a> and/or <a href={territories[1].properties.description} target='_blank' rel="noreferrer"> {territories[1].properties.Name}</a> country, otherwise known as {ipData.commonName}.*</span>
    <br />
    <span className="ModalTextSmall">
    <span className="astrix">*</span> 
    The information presented here is derived from the maps at <a href="https://native-land.ca/" target="_blank" rel="noreferrer">Native Land Digital</a>, cross-referenced with data from <a href="https://ipinfo.io/" target="_blank" rel="noreferrer">ipinfo.io</a>. 
    Note that this is based on your internet service provider's location, and may be incorrect for your actual physical location. 
    This is not authoritative or representative and should be approached critically.
    Code is adapted from <i>Where Are We</i>, which you can learn more about on <a href="https://github.com/e-e-e/where-are-we" target="_blank" rel="noreferrer">GitHub</a>. Your IP data is not stored.
    </span>
    </>
  } else {
    return <>
    <span>Your IP suggests that you may be in {ipData.commonName}. We cannot find information about indigenous nations at this location, but this does not mean that there aren't any. Do you know whose land you're on?*</span>
    <br />
    <span className="ModalTextSmall">
    <span className="astrix">*</span> 
    The information presented here is derived from the maps at <a href="https://native-land.ca/" target="_blank" rel="noreferrer">Native Land Digital</a>, cross-referenced with data from <a href="https://ipinfo.io/" target="_blank" rel="noreferrer">ipinfo.io</a>. 
    Note that this is based on your internet service provider's location, and may be incorrect for your actual physical location. 
    This is not authoritative or representative and should be approached critically.
    Code is adapted from <i>Where Are We</i>, which you can learn more about on <a href="https://github.com/e-e-e/where-are-we" target="_blank" rel="noreferrer">GitHub</a>. Your IP data is not stored.
    </span>
    </>
  }
  
  }
  
  function getLocationDataFromIp() {
    
  return fetch(IP_API)
  .then((response) => response.json())
  .then((data) => {
  const latLng = extractLngLat(data)
  //console.log(latLng)
  return latLng
    ? {
        ...latLng,
        commonName: extractLocationString(data) ?? '',
      }
    : null
  })
  }
  
  function extractLngLat(data) {
  if (!data) return null
  if (!data.loc || typeof data.loc !== 'string') return null
  const locArray = data.loc.split(',')
  if (locArray.length !== 2) return null
  youlat = parseFloat(locArray[0])
  youlong = parseFloat(locArray[1])
  
  if (youlat == null || youlong == null) return null
  return {
  youlat,
  youlong,
  }
  }
  
  function getTerritoriesFromLngLat(x, y) {
  return fetch(
  `${NATIVE_LAND_API}?maps=territories&position=${x},${y}`
  )
  .then((res) => res.json())
  .catch((e) => {
  console.error(e)
  return []
  })
  }

  function toTerritoryInfo(features) {
    return features
      .map((feature) => {
        const name = feature.properties.Name
        const link = feature.properties.description
        return name
          ? {
              name,
              link,
            }
          : undefined
      })
  }
  
  
  function extractLocationString(data) {
  if (!data) return null
  if (!data.city && !data.region) return null
  const strings = []
  data.city && strings.push(data.city)
  data.region && strings.push(data.region)
  data.country && strings.push(data.country)
  return strings.join(', ')
  }

  function WhereThrobber(){
    return (
      <div id="modal-throbber">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          transform="">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b5e877"/>
                <stop offset="100%" stopColor="#5252ff"/>
              </linearGradient>
            </defs>
            
            <circle cx="50" cy="50" r="40" stroke="url(#grad1)" strokeWidth="10" fill="transparent">
              <animateTransform
                attributeName="transform"
                begin="0s"
                dur="1s"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </circle>                
        </svg>
      </div>
      
    )
  }
