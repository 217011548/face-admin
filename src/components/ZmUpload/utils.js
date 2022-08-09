import extend from 'extend'
export const eachOwn = (obj, fn) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(obj[key], key, obj)
    }
  }
}
export const expandToDefaultProps = (options = {}) => {
  let props = {}
  eachOwn(options, (value, key) => {
    props[key] = {
      default: value
    }
  })
  return props
}
const restructureVueCtor = (originalCtor, additionalOptions = {}) => extend(true, originalCtor, additionalOptions)
export const restructureDefaultPropsOfVueCtorFromOptions = (originalCtor, options = {}) => restructureVueCtor(originalCtor, {
  props: expandToDefaultProps(options)
})
export const getDateValue = (value, weeks) => {
  let res = []
  if (value.length) {
    value.forEach(item => {
      let findItem = weeks.find(_item => {
        return _item.id === item
      })
      findItem && res.push(findItem.name)
    })
  }
  return res.length ? '(' + res.join('、') + ')' : ''
}
/**
   * call or apply
   * @param context context
   * @param fn function
   * @param argsArr args
   */
export const callOrApply = (context, fn, argsArr) => {
  if (argsArr.length <= 2) {
    fn.call(context, argsArr[0], argsArr[1])
  } else {
    fn.apply(context, argsArr)
  }
}

export const isIE = /msie/i.test(navigator.userAgent) && !window.opera
