import * as natives from "natives";
import Model from "./Model";
import Render from "./Render";

export default class Rendertarget {
  public Render: Render;
  public Name: string;

  constructor(name: string, linkedModel?: Model) {
    if (Rendertarget.isRegistered(name))
      throw new Error(`Ther is alreddy a Rendertarget registered as ${name}`);
    this.Name = name;
    natives.registerNamedRendertarget(name, false);
    if (linkedModel != null && linkedModel != undefined)
      natives.linkNamedRendertarget(linkedModel.Hash);
    this.Render = new Render(natives.getNamedRendertargetRenderId(name));
  }

  get isRegistered(): boolean {
    return Rendertarget.isRegistered(this.Name);
  }

  isLinked(model: Model): boolean {
    return Rendertarget.isLinked(this.Name, model);
  }

  destroy() {
    Rendertarget.destroy(this.Name);
    this.Render.destroy();
  }



  static isRegistered(name: string): boolean {
    return natives.isNamedRendertargetRegistered(name);
  }

  static isLinked(name: string, model: Model): boolean {
    return natives.isNamedRendertargetLinked(model.Hash);
  }

  static destroy(name: string) {
    natives.releaseNamedRendertarget(name);
  }
}