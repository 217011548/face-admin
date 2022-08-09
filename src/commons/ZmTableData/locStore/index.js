import Storage from '@/utils/Storage'
const sLoc = new Storage()
const loc = new Storage({locKey: 'localStorage'})
const STORE_TYPE = {
  loc, sLoc
}

class LocStore {
  constructor (name, defaultType = '', storeType = 'loc') {
    this.name = name
    this.defaultType = defaultType
    this.store = STORE_TYPE[storeType]
  }

  get () {
    return this.store.get(this.name, this.defaultType)
  }

  set (val) {
    this.store.set(this.name, val)
  }
  remove () {
    this.store.remove(this.name)
  }
}

export default LocStore
