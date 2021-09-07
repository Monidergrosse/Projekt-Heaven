import transform from 'lodash.transform';
import isEqual from 'lodash.isequal';
import isArray from 'lodash.isarray';
import isObject from 'lodash.isobject';
import { filterObject } from './Extentions.mjs'

export default class Client {
  socket;
  innerEvents = {VariableChanged: {"*": []}};
  _variables = {};
  callbacks = {};

  constructor(socket) {
    this.socket = socket;
    this.socket.on('Emit', (...args) => this._callEvent(...args));
    this.socket.on('SetVariable', (...args) => this._setVariable(...args));
    this.socket.on('DelVariable', (...args) => this._delVariable(...args));
  }

  emit(event, ...args) {
    this.socket.emit("Emit", event, ...args);
  }
  on(event, cb, eventType) {
    if(this.innerEvents.hasOwnProperty(event)) {
      if(eventType) {
        this.innerEvents[event][eventType] = this.innerEvents[event][eventType] ? this.innerEvents[event][eventType] : [];
        this.innerEvents[event][eventType].push(cb);
      }
      else
        this.innerEvents[event]["*"].push(cb);
    }
    else {
      this.callbacks[event] = this.callbacks[event] ? callbacks[event] : [];
      this.callbacks[event].push(cb);
    }
  }
  off(event, cb) {
    if(this.innerEvents.hasOwnProperty(event))
      this.innerEvents[event].pop(cb);
    else {
      if(cb) {
        if(this.callbacks[event])
        this.callbacks[event].pop(cb);
      } else
        this.callbacks[event] = undefined;
    }
  }
  _callEvent(event, ...args) {
    if(this.callbacks[event])
      this.callbacks[event].forEach(cb => cb(...args));
  }

  _setVariable(key, value) {
    let old = this._variables[key] ? JSON.parse(JSON.stringify(this._variables[key])) : undefined;
    this._variables[key] = this._variables[key] ? combineValues(this._variables[key], value) : value;
    this.innerEvents.VariableChanged["*"].forEach(cb => cb(key, old, value));
    if(this.innerEvents.VariableChanged[key])
      this.innerEvents.VariableChanged[key].forEach(cb => cb(old, value));
  }
  _delVariable(key) {
    delete(this._variables[key]);
  }
  get variables() {
    let copy = JSON.parse(JSON.stringify(this._variables)); //Object.assign(Object.create(Object.getPrototypeOf(this._variables)), this._variables);
    setTimeout(() => this.checkVariablesDiff(copy, this._variables), 0);
    return this._variables;
  }
  set variables(value) {
    this.checkVariablesDiff(this._variables, value);
    this._variables = value;
  }
  checkVariablesDiff(_old, _new) {
    let changes = difference(_old, _new);
    let deleted = filterObject(_old, (key) => !_new.hasOwnProperty(key));
    Object.keys(changes).forEach((key) => this.socket.emit("SetVariable", key, changes[key]));
    Object.keys(deleted).forEach((key) => this.socket.emit("DelVariable", key));
  }
}

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 * @param  {object} target
 * @param  {object} source
 * @return {object} `merged`
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
function combineValues(target, source) {
  if (!isObject(target) || !isObject(source)) return source;
  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];
    target[key] = (isArray(targetValue) && isArray(sourceValue) ? targetValue.concat(sourceValue): (isObject(targetValue) && isObject(sourceValue) ? combineValues(Object.assign({}, targetValue), sourceValue) : sourceValue));
  });
  return target;
}

/**
 * Find difference between two objects
 * @param  {object} origObj - Source object to compare newObj against
 * @param  {object} newObj  - New object with potential changes
 * @return {object} differences
 */
function difference (origObj, newObj) {
  function changes(newObj, origObj) {
    let arrayIndexCounter = 0;
    return transform(newObj, function (result, value, key) {
      if (!isEqual(value, origObj[key])) {
        let resultKey = isArray(origObj) ? arrayIndexCounter++ : key;
        result[resultKey] = (isObject(value) && isObject(origObj[key])) ? changes(value, origObj[key]) : value;
      }
    })
  }
  return changes(newObj, origObj);
}