import React from 'react';

const IP_API = 'https://ipinfo.io/json'
//'https://ipinfo.io/json?token=9f90c3a3f131ff' 
const NATIVE_LAND_API = 'https://native-land.ca/api/index.php'
var youlat;
var youlong; 
var lat = -37.803193437556054; //latitude and longitude set to Arts House Nth Melbourne
var long = 144.94984320919224;

//const whereAreYou = function goes here

async function getPotentialLocations() {  
  const ipData = await getLocationDataFromIp()
  const territories = await getTerritoriesFromLngLat(youlat, youlong)
  if (ipData) {
    return <>
  <span>
    
    Your IP suggests that you may be on <a href='" + territories[0].properties.description + "' target='_blank'>" + territories[0].properties.Name + "</a> country, otherwise known as " + ipData.commonName + ".*"; 
  </span>
  </>
  }
  else {

  }
  
  console.log(territories);
  
  if (territories.length === 1) {
    document.getElementById('countryinfo').innerHTML = "Your IP suggests that you may be on <a href='" + territories[0].properties.description + "' target='_blank'>" + territories[0].properties.Name + "</a> country, otherwise known as " + ipData.commonName + ".*"; 
  } else if (territories.length > 1) {
    document.getElementById('countryinfo').innerHTML = "Your IP suggests that you may be on <a href='" + territories[0].properties.description + "' target='_blank'>" + territories[0].properties.Name + "</a> and/or <a href='" + territories[1].properties.description + "' target='_blank'>"+ territories[1].properties.Name + "</a> country, otherwise known as " + ipData.commonName + ".*"; 
  } else {
    document.getElementById('countryinfo').innerHTML = "Your IP suggests that you may be in " + ipData.commonName + ". We cannot find information about indigenous nations at this location, this does not mean that there are not any.*"       
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
  .catch(err => geolocate())
  
  }
  
  function extractLngLat(data) {
  if (!data) return null
  if (!data.loc || typeof data.loc !== 'string') return null
  const locArray = data.loc.split(',')
  if (locArray.length !== 2) return null
  youlat = parseFloat(locArray[0])
  youlong = parseFloat(locArray[1])
  getdistance(youlat, youlong, netlat, netlong);
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
  
  
  function extractLocationString(data) {
  if (!data) return null
  if (!data.city && !data.region) return null
  const strings = []
  data.city && strings.push(data.city)
  data.region && strings.push(data.region)
  data.country && strings.push(data.country)
  return strings.join(', ')
  }
  
  function geolocate () {
    
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setcoords);
    if (GeolocationPositionError = true) {
      geolocatedterritories(youlat, youlong);
      
    }
    function setcoords(position) {
    youlat = position.coords.latitude; 
    youlong = position.coords.longitude; 
  
    geolocatedterritories(youlat, youlong);
    if (youlat == null || youlong == null) return null
    return {
    youlat,
    youlong,
    }
    } 
      } else {
    youlat = null; 
    youlong = null;
    
  }
  }
  
    
  
      async function geolocatedterritories (locatedlat, locatedlong) {
      const territories = await getTerritoriesFromLngLat(locatedlat, locatedlong);
      return territories;
  /*if (territories.length === 1) {
    document.getElementById('countryinfo').innerHTML = "Your geolocation suggests that you may be on <a href='" + territories[0].properties.description + "' target='_blank'>" + territories[0].properties.Name + "</a> country.*"; 
    loadingpar.classList.add('noshow');
    document.getElementById('countryinfo').classList.remove('noshow');
    document.getElementById('disclaimer').classList.remove('noshow');
    document.getElementById('modal-button').classList.remove('noshow');
    
  } else if (territories.length > 1) {
    document.getElementById('countryinfo').innerHTML = "Your geolocation suggests that you may be on <a href='" + territories[0].properties.description + "' target='_blank'>" + territories[0].properties.Name + "</a> and/or <a href='" + territories[1].properties.description + "' target='_blank'>"+ territories[1].properties.Name + "</a> country.*"; 
    loadingpar.classList.add('noshow');
    document.getElementById('countryinfo').classList.remove('noshow');
    document.getElementById('disclaimer').classList.remove('noshow');
    document.getElementById('modal-button').classList.remove('noshow');
  
  } else if (territories.length === 0) {
    
    document.getElementById('countryinfo').innerHTML = "We cannot find information about indigenous nations at this location, this does not mean that there are not any.*"       
    loadingpar.classList.add('noshow');
    document.getElementById('countryinfo').classList.remove('noshow');
    document.getElementById('disclaimer').classList.remove('noshow');
    document.getElementById('modal-button').classList.remove('noshow');
  } else {
    document.getElementById('modal-button').classList.remove('noshow');
    loadingpar.classList.add('noshow');
  }*/
  }