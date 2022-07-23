// import './node_modules/promise-polyfill/dist/polyfill.js'

const IP_API = 'https://ipinfo.io/json?token=9f90c3a3f131ff' 
const NATIVE_LAND_API = 'https://native-land.ca/api/index.php'
var youlat;
var youlong; 
var btn = document.getElementById('wherebutton'); 
var loadingpar = document.getElementById('currentmoji'); 
loadingpar.innerHTML = currentMoonEmoji; 

btn.addEventListener('click', getPotentialLocations);

async function getPotentialLocations() {
btn.classList.add('noshow');
loadingpar.classList.remove('noshow');

const ipData = await getLocationDataFromIp()

if (!ipData) return null
const territories = await getTerritoriesFromLngLat(youlat, youlong)
console.log(territories);
if (territories.length === 1) {
  document.getElementById('countryinfo').innerHTML = "Your IP suggests that you may be on <a href='" + territories[0].properties.description + "' target='_blank'>" + territories[0].properties.Name + "</a> country, otherwise known as " + ipData.commonName + ".*"; 
  console.log(territories.length);
  loadingpar.classList.add('noshow');
  document.getElementById('countryinfo').classList.remove('noshow');
  document.getElementById('disclaimer').classList.remove('noshow');
  document.getElementById('continuebtn').classList.remove('noshow');
} else if (territories.length > 1) {
  document.getElementById('countryinfo').innerHTML = "Your IP suggests that you may be on <a href='" + territories[0].properties.description + "' target='_blank'>" + territories[0].properties.Name + "</a> and/or <a href='" + territories[1].properties.description + "' target='_blank'>"+ territories[1].properties.Name + "</a> country, otherwise known as " + ipData.commonName + ".*"; 
  loadingpar.classList.add('noshow');
  document.getElementById('countryinfo').classList.remove('noshow');
  document.getElementById('disclaimer').classList.remove('noshow');
  document.getElementById('continuebtn').classList.remove('noshow');
} else {
  document.getElementById('countryinfo').innerHTML = "Your IP suggests that you may be in " + ipData.commonName + ". We cannot find information about indigenous nations at this location, this does not mean that there are not any.*"       
  loadingpar.classList.add('noshow');
  document.getElementById('countryinfo').classList.remove('noshow');
  document.getElementById('disclaimer').classList.remove('noshow');
  document.getElementById('continuebtn').classList.remove('noshow');
} 

/*return {
territories: toTerritoryInfo(territories),
commonName: ipData.commonName,
}*/


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
getdistance(youlat, youlong, lat, long);
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

/*function toTerritoryInfo (features) {
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
}).filter(isDefined)

}

function isDefined (v) {
return v != null
}*/


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
    document.getElementById('local-conditions').innerHTML = "We're not sure how far away you are from our server";
    
  }
  function setcoords(position) {
  youlat = position.coords.latitude; 
  youlong = position.coords.longitude; 
  getdistance(youlat, youlong, lat, long);
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
  getdistance(youlat, youlong, lat, long);
  loadingpar.classList.add('noshow');
  document.getElementById('continuebtn').classList.remove('noshow');
 
}
}

  function getdistance(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      d = Math.round(d);
      document.getElementById('geolocate').innerHTML = "You're about " + d + "km from Arts House, where room2 live will happen on SUN 25 September, 14:00 – 19:00 AEST";
    }
    
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    async function geolocatedterritories (locatedlat, locatedlong) {
    const territories = await getTerritoriesFromLngLat(locatedlat, locatedlong);

if (territories.length === 1) {
  document.getElementById('countryinfo').innerHTML = "Your geolocation suggests that you may be on <a href='" + territories[0].properties.description + "' target='_blank'>" + territories[0].properties.Name + "</a> country.*"; 
  loadingpar.classList.add('noshow');
  document.getElementById('countryinfo').classList.remove('noshow');
  document.getElementById('disclaimer').classList.remove('noshow');
  document.getElementById('continuebtn').classList.remove('noshow');
  
} else if (territories.length > 1) {
  document.getElementById('countryinfo').innerHTML = "Your geolocation suggests that you may be on <a href='" + territories[0].properties.description + "' target='_blank'>" + territories[0].properties.Name + "</a> and/or <a href='" + territories[1].properties.description + "' target='_blank'>"+ territories[1].properties.Name + "</a> country.*"; 
  loadingpar.classList.add('noshow');
  document.getElementById('countryinfo').classList.remove('noshow');
  document.getElementById('disclaimer').classList.remove('noshow');
  document.getElementById('continuebtn').classList.remove('noshow');

} else if (territories.length === 0) {
  
  document.getElementById('countryinfo').innerHTML = "We cannot find information about indigenous nations at this location, this does not mean that there are not any.*"       
  loadingpar.classList.add('noshow');
  document.getElementById('countryinfo').classList.remove('noshow');
  document.getElementById('disclaimer').classList.remove('noshow');
  document.getElementById('continuebtn').classList.remove('noshow');
} else {
  document.getElementById('continuebtn').classList.remove('noshow');
  loadingpar.classList.add('noshow');
}
}

function closeaoc() {
  document.getElementById('AOC').classList.add('noshow');
}