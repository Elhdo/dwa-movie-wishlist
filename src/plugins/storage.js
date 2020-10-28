export const STORAGE = {
  NONE: 'none',
  LOCAL: 'localStorage',
  SESSION: 'sessionStorage',
}

class Storage {
  constructor(type) {
    this.type = type
    this.storage = window[type]
  }

  hasStorage() {
    return this.type !== STORAGE.NONE
  }

  getItem(key) {
    return this.hasStorage && this.storage.getItem(key)
  }

  setItem(key, value) {
    return this.hasStorage && this.storage.setItem(key, value)
  }

  removeItem(key) {
    return this.hasStorage && this.storage.removeItem(key)
  }
  hasItem(key) {
    return this.hasStorage() && Boolean(this.storage.getItem(key))
  }
}

// Singleton logic
// Be sure to export always the same uniue instance
// could be achieved with a simple shared object
let instance

const useStorage = (type = STORAGE.NONE) => {
  if (instance) {
    return instance
  }

  instance = new Storage(type)

  return instance
}

export const getStorage = () => instance
export default {
  install(Vue, type) {
    Vue.prototype.$storage = useStorage(type)
  },
}
