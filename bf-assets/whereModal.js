import React from 'react';

const IP_API = 'https://ipinfo.io/json'
const NATIVE_LAND_API = 'https://native-land.ca/api/index.php'
export const whereYou = 'string';

function extractLngLat(data) {
  if (!data) return null
  if (!data.loc || typeof data.loc !== 'string') return null
  const locArray = data.loc.split(',')
  if (locArray.length !== 2) return null
  const lat = parseFloat(locArray[0])
  const lng = parseFloat(locArray[1])
  if (lat == null || lng == null) return null
  return {
    lat,
    lng,
  }
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

function getLocationDataFromIp() {
  return fetch(IP_API)
    .then((res) => res.json())
    .then((data) => {
      const latLng = extractLngLat(data)
      return latLng
        ? {
            ...latLng,
            commonName: extractLocationString(data) ?? '',
          }
        : null
    })
}

function getTerritoriesFromLngLat(loc) {
  return fetch(
    `${NATIVE_LAND_API}?maps=territories&position=${loc.lat},${loc.lng}`
  )
    .then((res) => res.json())
    .catch((e) => {
      console.error(e)
      return []
    })
}



function isDefined (v ) {
  return v != null
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
    .filter(isDefined)
}

function getPotentialLocations() {
  const ipData = await getLocationDataFromIp()
  if (!ipData) return null
  const territories = await getTerritoriesFromLngLat(ipData)
  return {
    territories: toTerritoryInfo(territories),
    commonName: ipData.commonName,
  }
}

function TerritoryLink({ territoryInfo }) {
  return territoryInfo.link ? (
    <a href={territoryInfo.link} target="_blank">
      {territoryInfo.name}
    </a>
  ) : (
    <>{territoryInfo.name}</>
  )
}

function Territories({ territories }) {
  if (!territories.length) return null
  if (territories.length === 1) {
    return (
      <>
        {territories[0]}  country
      </>
    )
  }
  
}

function LocationDescription({ territories, commonName }) {
  if (territories.length === 0) {
    return (
      <p>
        Your IP suggests that you may be in {commonName}. We cannot find
        information about indigenous nations at this location, this does not
        mean that there are not any.*
      </p>
    )
  }
  return (
    <p>
      Your IP suggests that you may be on 
      {territories} , otherwise known as {commonName}
      .*
    </p>
  )
}