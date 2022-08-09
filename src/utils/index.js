
// copy target
export const deep = (obj) => JSON.parse(JSON.stringify(obj))

// convert the date time format
export const dft = (v, format = 'YYYY-MM-DD', defaultValue = '') => {
  if (!v) {
    return defaultValue
  } else if (v === 'now') {
    return dayjs().format(format)
  }
  return dayjs(v).format(format)
}
export const deDupArray = (array=[], key = 'id') => {
  const obj = {};
  const result = [];
  array = deep(array);
  const len = array.length;
  for (let i = len; i--;) {
    const item = array[i];
    if (!obj[item[key]] && item[key]) {
      result.unshift(item);
      obj[item[key]] = true;
    }
  }
  return result;
};
export function getBaseDateValue (v, type, key = 'name') {
    let list = getBaseDataByType(type) || []
    let item = list.find(i => i.value + '' === v + '') || {}
    return item[key] || '-'
  }
  

export const richTextFormat=(value)=>{
	if(!value) return '-'
	value = value.replace(/<\/?.+?>/g,'')
  	value = value.replace(/\s+/g,'')
	  if (value.length > 30) {
    	return value.slice(0, 30) + "...";
  	}
  	return value;
}
