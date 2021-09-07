import * as alt from 'alt-client';
import * as natives from 'natives';
import AnimationDictonary from './AnimationDictonary';

export default class Animation {
  constructor(public dictonary: AnimationDictonary, public name: string) { }
}