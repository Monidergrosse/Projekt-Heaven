export function filterObject(obj, predicate) {
  var result = {};
  Object.keys(obj).filter(key => obj.hasOwnProperty(key) && predicate(key, obj[key])).forEach(key => result[key] = obj[key]);
  return result;
};