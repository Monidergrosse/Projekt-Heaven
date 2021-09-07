import * as natives from 'natives';
export default class AnimationDictonary {
    constructor(name) {
        this.name = name;
        natives.requestAnimDict(name);
    }
}
