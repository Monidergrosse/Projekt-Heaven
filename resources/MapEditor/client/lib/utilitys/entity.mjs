import * as alt from 'alt-client';
import * as native from 'natives';

export class Entity {
  _scriptId;
  _model;
  _pos;
  _rot;
  _dynamic;
  get scriptId() {
    return this._scriptId;
  }
  get model() {
    this._model = native.getEntityModel(this._scriptId);
    return this._model;
  }
  get pos() {
    this._pos = native.getEntityCoords(this._scriptId, true);
    return this._pos;
  }
  get rot() {
    this._rot = native.getEntityRotation(this._scriptId, 2);
    return this._rot;
  }
  get dynamic() {
    return this._dynamic;
  }
  set model(model) {
    this._model = model;
  }
  set pos(pos) {
    this._pos = pos;
    native.setEntityCoords(this._scriptId, _pos.x, _pos.y, _pos.z, false, false, false, true);
  }
  set rot(rot) {
    this._rot = rot;
    native.setEntityRotation(this._scriptId, _rot.x, _rot.y, _rot.z, 2, true);
  }
  set dynamic(dynamic) {
    this._dynamic = dynamic;
    native.setEntityDynamic(this._scriptId, this._dynamic);
  }

  constructor(...args) {
    switch (args.length) {
      case 0:
        throw "Nedds 1 or 4 args!";
        break;
      case 1:
        this._scriptId = args[0];
        break;
      case 4:
        if(typeof(args[0]) == "string")
          args[0] = alt.hash(args[0]);
        this._model = args[0];
        this._pos = args[1];
        this._rot = args[2];
        this._dynamic = args[3];
        this._scriptId = native.createObjectNoOffset(this._model, this._pos.x, this._pos.y, this._pos.z, true, true, this._dynamic);
        native.setEntityRotation(this._scriptId, this._rot.x, this._rot.y, this._rot.z, 2, true);
        break;
    }
  }

  destroy() {
    native.deleteObject(this._scriptId);
    delete(this);
  }
}
