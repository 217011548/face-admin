import Vue from 'vue'
import Location from './index'
const MapConstructor = Vue.extend(Location)

MapConstructor.prototype.close = function () {
  this.mapShow = false
  this.closed = true
}

const getInstance = () => {
  return new MapConstructor({
    el: document.createElement('div')
  })
}

const removeDom = el => {
  if (el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

const Map = (opts = {}) => {
  const $map = document.querySelectorAll('.dialog-map')
  Array.from($map).map($m => {
    removeDom($m)
  })
  return new Promise((resolve, reject) => {
    const instance = getInstance()
    instance.closed = false
    instance.keyword = ''
    instance.code = opts.code || ''
    instance.obj = opts.obj || {} 
    instance.hasLngLat = opts.hasLngLat 
    instance.mapCenter =
      opts.mapCenter[0] && opts.mapCenter[1] ? opts.mapCenter : []
    instance.isResolve = false
    console.log(opts)
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.mapShow = true
      Vue.nextTick(() => {
        instance._initMap()
      })
    })
    instance.$watch('isResolve', val => {
      // instance.close()
      instance.$destroy()
      if (val === -1) {
        reject(val)
      } else if (val === 1) {
        resolve(instance.addrObj)
      }
    })
  })
}

export default Map
