import * as alt from "alt-client";
import * as natives from "natives";
import Color from "../Objects/Color";
import Vector3 from '../Objects/Vector3';
import Transform from '../Objects/Transform';
import Texture from "../Objects/Texture";
import Vector2 from '../Objects/Vector2';
import Scaleform from './Scaleform';

export default class Render {
  private renderCallbacks: Array<() => void> = [];
  private tickHandle: number = -1;
  public Id: number;

  public constructor(renderId: number) { this.Id = renderId; }

  private render() {
    natives.setTextRenderId(this.Id);
    this.renderCallbacks.forEach(callback => callback());
    natives.setTextRenderId(Render.defaultRenderId);
  }

  public registerRender(callback: () => void) {
    this.renderCallbacks.push(callback);
    if (this.renderCallbacks.length == 1)
      this.tickHandle = alt.everyTick(this.render.bind(this));
  }

  public clearRender(callback: () => void) {
    this.renderCallbacks = this.renderCallbacks.filter(_ => _ != callback);
    if (this.renderCallbacks.length == 0 && this.tickHandle != -1) {
      alt.clearEveryTick(this.tickHandle);
      this.tickHandle = -1;
    }
  }


  public drawLine(position1: Vector3, position2: Vector3, color: Color) {
    natives.drawLine(
      position1.x, position1.y, position1.z,
      position2.x, position2.y, position2.z,
      color.r, color.g, color.b, color.a
    );
  }

  public drawPoly(position1: Vector3, position2: Vector3, position3: Vector3, color: Color) {
    natives.drawPoly(
      position1.x, position1.y, position1.z,
      position2.x, position2.y, position2.z,
      position3.x, position3.y, position3.z,
      color.r, color.g, color.b, color.a
    );
  }

  public drawBox(position1: Vector3, position2: Vector3, color: Color) {
    natives.drawBox(
      position1.x, position1.y, position1.z,
      position2.x, position2.y, position2.z,
      color.r, color.g, color.b, color.a
    );
  }

  public drawMarker(type: MarkerTypes, transform: Transform, color: Color, direction: Vector3, texture: Texture, faceCamera?: boolean, bobUpAndDown?: boolean, drawOnEnts?: boolean) {
    natives.drawMarker(
      type,
      transform.position.x, transform.position.y, transform.position.z,
      direction.x, direction.y, direction.z,
      transform.rotation.x, transform.rotation.y, transform.rotation.z,
      transform.scale.x, transform.scale.y, transform.scale.z,
      color.r, color.g, color.b, color.a,
      bobUpAndDown == true,
      faceCamera == true,
      2,
      true,
      texture.dictonary.name,
      texture.name,
      drawOnEnts == true
    );
  }

  public drawRect(position: Vector2, width: number, height: number, color: Color) {
    natives.drawRect(
      position.x, position.y,
      width, height,
      color.r, color.g, color.b, color.a,
      false
    );
  }

  public drawTexture(texture: Texture, position: Vector2, width: number, height: number, rotation: number, color: Color = new Color(255, 255, 255, 255)) {
    natives.drawSprite(
      texture.name, texture.dictonary.name,
      position.x, position.y,
      width, height,
      rotation,
      color.r, color.g, color.b, color.a,
      false
    );
  }

  public setDrawOrigin(position: Vector3) {
    natives.setDrawOrigin(position.x, position.y, position.z, 0);
  }

  public resetDrawOrigin() {
    natives.clearDrawOrigin();
  }

  public drawScaleformMovie(scaleform: Scaleform, position: Vector2, width: number, height: number, color: Color = new Color(255, 255, 255, 255)) {
    natives.drawScaleformMovie(
      scaleform.Id,
      position.x, position.y,
      width, height,
      color.r, color.g, color.b, color.a,
      0
    );
  }

  public drawScaleformMovieFullscreen(scaleform: Scaleform, color: Color = new Color(255, 255, 255, 255)) {
    natives.drawScaleformMovieFullscreen(
      scaleform.Id,
      color.r, color.g, color.b, color.a,
      0
    );
  }

  public drawScaleformMovieFullscreenMasked(scaleform: Scaleform, mask: Scaleform, position: Vector2, width: number, height: number, color: Color = new Color(255, 255, 255, 255)) {
    natives.drawScaleformMovieFullscreenMasked(
      scaleform.Id,
      mask.Id,
      color.r, color.g, color.b, color.a
    );
  }

  public drawScaleformMovie3d(scaleform: Scaleform, transform: Transform) {
    natives.drawScaleformMovie3d(
      scaleform.Id,
      transform.position.x, transform.position.y, transform.position.z,
      transform.rotation.x, transform.rotation.y, transform.rotation.z,
      0, 0, 0,
      transform.scale.x, transform.scale.y, transform.scale.z,
      0
    );
  }

  public drawScaleformMovie3dSolid(scaleform: Scaleform, transform: Transform) {
    natives.drawScaleformMovie3dSolid(
      scaleform.Id,
      transform.position.x, transform.position.y, transform.position.z,
      transform.rotation.x, transform.rotation.y, transform.rotation.z,
      0, 0, 0,
      transform.scale.x, transform.scale.y, transform.scale.z,
      0
    );
  }

  public drawTvChannel(position: Vector2, scale: Vector2, rotation: number, color: Color) {
    natives.drawTvChannel(
      position.x, position.y,
      scale.x, scale.y,
      rotation,
      color.r, color.g, color.b, color.a
    );
  }

  public setDrawBehindPausemenu(value: boolean) {
    natives.setScriptGfxDrawBehindPausemenu(value);
  }

  public setDrawOrder(value: number) {
    natives.setScriptGfxDrawOrder(value);
  }



  public destroy() {
    alt.clearEveryTick(this.tickHandle);
    this.tickHandle = -1;
  }




  public static get defaultRenderId(): number {
    return 1;
  }
}

enum MarkerTypes {
  MarkerTypeUpsideDownCone = 0,
  MarkerTypeVerticalCylinder = 1,
  MarkerTypeThickChevronUp = 2,
  MarkerTypeThinChevronUp = 3,
  MarkerTypeCheckeredFlagRect = 4,
  MarkerTypeCheckeredFlagCircle = 5,
  MarkerTypeVerticleCircle = 6,
  MarkerTypePlaneModel = 7,
  MarkerTypeLostMCDark = 8,
  MarkerTypeLostMCLight = 9,
  MarkerTypeNumber0 = 10,
  MarkerTypeNumber1 = 11,
  MarkerTypeNumber2 = 12,
  MarkerTypeNumber3 = 13,
  MarkerTypeNumber4 = 14,
  MarkerTypeNumber5 = 15,
  MarkerTypeNumber6 = 16,
  MarkerTypeNumber7 = 17,
  MarkerTypeNumber8 = 18,
  MarkerTypeNumber9 = 19,
  MarkerTypeChevronUpx1 = 20,
  MarkerTypeChevronUpx2 = 21,
  MarkerTypeChevronUpx3 = 22,
  MarkerTypeHorizontalCircleFat = 23,
  MarkerTypeReplayIcon = 24,
  MarkerTypeHorizontalCircleSkinny = 25,
  MarkerTypeHorizontalCircleSkinny_Arrow = 26,
  MarkerTypeHorizontalSplitArrowCircle = 27,
  MarkerTypeDebugSphere = 28,
  MarkerTypeDallorSign = 29,
  MarkerTypeHorizontalBars = 30,
  MarkerTypeWolfHead = 31
};