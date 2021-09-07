import * as natives from "natives";
import Render from "./Render";
export default class Rendertarget {
    constructor(name, linkedModel) {
        if (Rendertarget.isRegistered(name))
            throw new Error(`Ther is alreddy a Rendertarget registered as ${name}`);
        this.Name = name;
        natives.registerNamedRendertarget(name, false);
        if (linkedModel != null && linkedModel != undefined)
            natives.linkNamedRendertarget(linkedModel.Hash);
        this.Render = new Render(natives.getNamedRendertargetRenderId(name));
    }
    get isRegistered() {
        return Rendertarget.isRegistered(this.Name);
    }
    isLinked(model) {
        return Rendertarget.isLinked(this.Name, model);
    }
    destroy() {
        Rendertarget.destroy(this.Name);
        this.Render.destroy();
    }
    static isRegistered(name) {
        return natives.isNamedRendertargetRegistered(name);
    }
    static isLinked(name, model) {
        return natives.isNamedRendertargetLinked(model.Hash);
    }
    static destroy(name) {
        natives.releaseNamedRendertarget(name);
    }
}
