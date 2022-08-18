import React, { useEffect, useState } from 'react';

const IP_API = 'https://ipinfo.io/json?token=9f90c3a3f131ff' 
const NATIVE_LAND_API = 'https://native-land.ca/api/index.php'
var youlat;
var youlong; 

export default function WhereAreYou () {
  const [whereTerritories, getTerritories] = useState([]);
  
  useEffect(() => {
    getPotentialLocations()
    .then(data =>
      getTerritories(data)
    );
   }, [])

  return (
  <>
  {whereTerritories}
  </>
  )
}

async function getPotentialLocations() {  
  const ipData = await getLocationDataFromIp()
  if (!ipData) return <>
  <span>We couldn't access your IP, and couldn't find information information about indigenous nations at your location, but this does not mean that there aren't any.
    Do you know whose land you're on?*
  </span>
  </>
  const territories = await getTerritoriesFromLngLat(youlat, youlong)
  
  if (territories.length === 1) {
    return (
    <><span>Your IP suggests that you may be on <a href={territories[0].properties.description} target='_blank'>{territories[0].properties.Name}</a> country, otherwise known as {ipData.commonName}.*</span></>
    )
  } else if (territories.length > 1) {
    return <><span>Your IP suggests that you may be on <a href={territories[0].properties.description} target='_blank'> {territories[0].properties.Name}</a> and/or <a href={territories[1].properties.description} target='_blank'> {territories[1].properties.Name}</a> country, otherwise known as {ipData.commonName}.*</span></>
  } else {
    return <><span>Your IP suggests that you may be in {ipData.commonName}. We cannot find information about indigenous nations at this location, but this does not mean that there aren't any. Do you know whose land you're on?*</span></>
  }
  
  }
  
  function getLocationDataFromIp() {
    
  return fetch(IP_API)
  .then((response) => response.json())
  .then((data) => {
  const latLng = extractLngLat(data)
  console.log(latLng)
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


