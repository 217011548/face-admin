import markPng from './location-red.png'
// Get Address
export const getAddreByCenter = (address, city = 'All') => {
  return new Promise((resolve, reject) => {
    const geocoder = new AMap.Geocoder({
      radius: 500,
      batch: false,
      city,
      citylimit: true
    })
    geocoder.getLocation(address, function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        resolve(result.geocodes[0])
      } else {
        reject(result)
      }
    })
  })
}
// get the Address By Lng & lat
export const getAddreByLnglat = (postion = [], city = 'All') => {
  return new Promise((resolve, reject) => {
    AMap.service('AMap.Geocoder', function () {
      const geocoder = new AMap.Geocoder({
        radius: 500,
        batch: false,
        citylimit: true
      })
      geocoder.getAddress(postion, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result)
        } else {
          reject(result)
        }
      })
    })
  })
}
// Get info window
export const clearInfoWindow = map => {
  map.clearInfoWindow()
}
// Get user location 
export function showCityInfo () {
  return new Promise((resolve, reject) => {

    var citysearch = new AMap.CitySearch()
    // Get location from IP
    citysearch.getLocalCity(function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        resolve(result)
      } else {
        // return result.info
        reject(result.info)
      }
    })
  })
}
//Get High Accuracy location 
export function showCurrentArea () {
  return new Promise((resolve, reject) => {
    var geolocation = new AMap.Geolocation({

      enableHighAccuracy: true,

      timeout: 20000,

      buttonOffset: new AMap.Pixel(10, 20),

      zoomToAccuracy: true,

      buttonPosition: 'RB'
    })
    geolocation.getCurrentPosition(function (status, result) {
      if (status === 'complete' && result.info === 'SUCCESS') {
        resolve([status, result])
      } else {
        reject(status)
      }
    })
  })
}
// Search 
export const getLocaltionByWord = (address, city = '全国') => {
  return new Promise((resolve, reject) => {
    AMap.service(['AMap.PlaceSearch'], function () {
      const placeSearch = new AMap.PlaceSearch({
        extensions: 'all',
        city,
        citylimit: false
      })
      placeSearch.search(address, function (status, result) {
        if (
          status === 'complete' &&
          (result.info === 'OK' || result.info === 'TIP_KEYWORDS')
        ) {
          resolve(result)
        } else {
          reject(result)
        }
      })
    })
  })
}
// create marker
export const createMarker = (amap, lnglat) => {
  const size = new AMap.Size(48, 48)
  const imageSize = new AMap.Size(48, 48)
  const locationIcon = new AMap.Icon({
    size: size,
    image: markPng,
    imageSize: imageSize
  })
  const marker = new AMap.Marker({
    map: amap,
    icon: locationIcon, 
    zIndex: 101,
    animation: 'AMAP_ANIMATION_DROP', 
    position: new AMap.LngLat(...lnglat),
    offset: new AMap.Pixel(-24, -47) 
  })
  return marker
}
// create infowindow
export const createInfoWindow = (title, content, map, show) => {
  const info = document.createElement('div')
  if (!show) {
    info.className = 'info'
    const top = document.createElement('div')
    const titleD = document.createElement('div')
    const closeX = document.createElement('img')
    top.className = 'info-top'
    titleD.innerHTML = title
    closeX.src = 'http://webapi.amap.com/images/close2.gif'
    closeX.onclick = function () {
      map.clearInfoWindow()
    }
    top.appendChild(titleD)
    top.appendChild(closeX)
    info.appendChild(top)
  }
 
  const middle = document.createElement('div')
  middle.className = 'info-middle'
  middle.style.backgroundColor = 'white'
  middle.innerHTML = content
  info.appendChild(middle)

 
  const bottom = document.createElement('div')
  bottom.className = 'info-bottom'
  bottom.style.position = 'relative'
  bottom.style.top = '0px'
  bottom.style.margin = '0 auto'
  const sharp = document.createElement('img')
  sharp.src = 'http://webapi.amap.com/images/sharp.png'
  bottom.appendChild(sharp)
  info.appendChild(bottom)
  return info
}

export const generateInfoContentFor = (map, marker, address) => {
  const infoContent = []
  infoContent.push("<div class='fc6'>" + address + '</div>')
  const infoWindow = new AMap.InfoWindow({
    isCustom: true, 
    content: createInfoWindow('位置', infoContent.join('<br/>'), map),
    offset: new AMap.Pixel(15, -60)
  })
  infoWindow.open(map, marker.getPosition())
}
