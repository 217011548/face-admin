import {
  Notification
}
  from 'element-ui'

const defaultOptions = {
  title: 'Remind',
  type: 'info'
}

const callNotification = (options = {}) => {
  return Notification(Object.assign({}, defaultOptions, options))
}

const mergeOptions = (toOptions = {}, targetOptions) => {
  if (targetOptions && typeof targetOptions !== 'object') {
    targetOptions = {
      message: String(targetOptions)
    }
  }
  return Object.assign({}, toOptions, targetOptions)
}

const shortcut = {
  'success': {
    type: 'success',
    duration: 5000
  },
  'info': {
    type: 'info',
    duration: 10000
  },
  'warning': {
    type: 'warning',
    duration: 15000
  },
  'warn': {
    type: 'warning',
    duration: 15000
  },
  'danger': {
    type: 'danger',
    duration: 30000
  }
}
let addShortcutsToSomeObj = (someObj) => {
  Object.keys(shortcut).forEach(key => {
    someObj[key] = (options = {}) => {
      return callNotification(mergeOptions(shortcut[key], options))
    }
  })
}

let Notify = {}
addShortcutsToSomeObj(Notify)

let {
  success,
  info,
  warning,
  warn,
  danger
} = Notify

export {
  success,
  info,
  warning,
  warn,
  danger
}

export default {
  install (Vue, options = {}) {
    addShortcutsToSomeObj(Vue.prototype)
  }
}
