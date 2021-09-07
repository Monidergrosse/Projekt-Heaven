import * as natives from 'natives';
export default class AnimationDictonary {
  constructor(public name: string) {
    natives.requestAnimDict(name);
  }
}