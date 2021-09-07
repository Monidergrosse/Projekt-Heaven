import * as alt from "alt-client";
import * as natives from "natives";
import Color from "../Objects/Color";
export default class Render {
    constructor(renderId) {
        this.renderCallbacks = [];
        this.tickHandle = -1;
        this.Id = renderId;
    }
    render() {
        natives.setTextRenderId(this.Id);
        this.renderCallbacks.forEach(callback => callback());
        natives.setTextRenderId(Render.defaultRenderId);
    }
    registerRender(callback) {
        this.renderCallbacks.push(callback);
        if (this.renderCallbacks.length == 1)
            this.tickHandle = alt.everyTick(this.render.bind(this));
    }
    clearRender(callback) {
        this.renderCallbacks = this.renderCallbacks.filter(_ => _ != callback);
        if (this.renderCallbacks.length == 0 && this.tickHandle != -1) {
            alt.clearEveryTick(this.tickHandle);
            this.tickHandle = -1;
        }
    }
    drawLine(position1, position2, color) {
        natives.drawLine(position1.x, position1.y, position1.z, position2.x, position2.y, position2.z, color.r, color.g, color.b, color.a);
    }
    drawPoly(position1, position2, position3, color) {
        natives.drawPoly(position1.x, position1.y, position1.z, position2.x, position2.y, position2.z, position3.x, position3.y, position3.z, color.r, color.g, color.b, color.a);
    }
    drawBox(position1, position2, color) {
        natives.drawBox(position1.x, position1.y, position1.z, position2.x, position2.y, position2.z, color.r, color.g, color.b, color.a);
    }
    drawMarker(type, transform, color, direction, texture, faceCamera, bobUpAndDown, drawOnEnts) {
        natives.drawMarker(type, transform.position.x, transform.position.y, transform.position.z, direction.x, direction.y, direction.z, transform.rotation.x, transform.rotation.y, transform.rotation.z, transform.scale.x, transform.scale.y, transform.scale.z, color.r, color.g, color.b, color.a, bobUpAndDown == true, faceCamera == true, 2, true, texture.dictonary.name, texture.name, drawOnEnts == true);
    }
    drawRect(position, width, height, color) {
        natives.drawRect(position.x, position.y, width, height, color.r, color.g, color.b, color.a, false);
    }
    drawTexture(texture, position, width, height, rotation, color = new Color(255, 255, 255, 255)) {
        natives.drawSprite(texture.name, texture.dictonary.name, position.x, position.y, width, height, rotation, color.r, color.g, color.b, color.a, false);
    }
    setDrawOrigin(position) {
        natives.setDrawOrigin(position.x, position.y, position.z, 0);
    }
    resetDrawOrigin() {
        natives.clearDrawOrigin();
    }
    drawScaleformMovie(scaleform, position, width, height, color = new Color(255, 255, 255, 255)) {
        natives.drawScaleformMovie(scaleform.Id, position.x, position.y, width, height, color.r, color.g, color.b, color.a, 0);
    }
    drawScaleformMovieFullscreen(scaleform, color = new Color(255, 255, 255, 255)) {
        natives.drawScaleformMovieFullscreen(scaleform.Id, color.r, color.g, color.b, color.a, 0);
    }
    drawScaleformMovieFullscreenMasked(scaleform, mask, position, width, height, color = new Color(255, 255, 255, 255)) {
        natives.drawScaleformMovieFullscreenMasked(scaleform.Id, mask.Id, color.r, color.g, color.b, color.a);
    }
    drawScaleformMovie3d(scaleform, transform) {
        natives.drawScaleformMovie3d(scaleform.Id, transform.position.x, transform.position.y, transform.position.z, transform.rotation.x, transform.rotation.y, transform.rotation.z, 0, 0, 0, transform.scale.x, transform.scale.y, transform.scale.z, 0);
    }
    drawScaleformMovie3dSolid(scaleform, transform) {
        natives.drawScaleformMovie3dSolid(scaleform.Id, transform.position.x, transform.position.y, transform.position.z, transform.rotation.x, transform.rotation.y, transform.rotation.z, 0, 0, 0, transform.scale.x, transform.scale.y, transform.scale.z, 0);
    }
    drawTvChannel(position, scale, rotation, color) {
        natives.drawTvChannel(position.x, position.y, scale.x, scale.y, rotation, color.r, color.g, color.b, color.a);
    }
    setDrawBehindPausemenu(value) {
        natives.setScriptGfxDrawBehindPausemenu(value);
    }
    setDrawOrder(value) {
        natives.setScriptGfxDrawOrder(value);
    }
    destroy() {
        alt.clearEveryTick(this.tickHandle);
        this.tickHandle = -1;
    }
    static get defaultRenderId() {
        return 1;
    }
}
var MarkerTypes;
(function (MarkerTypes) {
    MarkerTypes[MarkerTypes["MarkerTypeUpsideDownCone"] = 0] = "MarkerTypeUpsideDownCone";
    MarkerTypes[MarkerTypes["MarkerTypeVerticalCylinder"] = 1] = "MarkerTypeVerticalCylinder";
    MarkerTypes[MarkerTypes["MarkerTypeThickChevronUp"] = 2] = "MarkerTypeThickChevronUp";
    MarkerTypes[MarkerTypes["MarkerTypeThinChevronUp"] = 3] = "MarkerTypeThinChevronUp";
    MarkerTypes[MarkerTypes["MarkerTypeCheckeredFlagRect"] = 4] = "MarkerTypeCheckeredFlagRect";
    MarkerTypes[MarkerTypes["MarkerTypeCheckeredFlagCircle"] = 5] = "MarkerTypeCheckeredFlagCircle";
    MarkerTypes[MarkerTypes["MarkerTypeVerticleCircle"] = 6] = "MarkerTypeVerticleCircle";
    MarkerTypes[MarkerTypes["MarkerTypePlaneModel"] = 7] = "MarkerTypePlaneModel";
    MarkerTypes[MarkerTypes["MarkerTypeLostMCDark"] = 8] = "MarkerTypeLostMCDark";
    MarkerTypes[MarkerTypes["MarkerTypeLostMCLight"] = 9] = "MarkerTypeLostMCLight";
    MarkerTypes[MarkerTypes["MarkerTypeNumber0"] = 10] = "MarkerTypeNumber0";
    MarkerTypes[MarkerTypes["MarkerTypeNumber1"] = 11] = "MarkerTypeNumber1";
    MarkerTypes[MarkerTypes["MarkerTypeNumber2"] = 12] = "MarkerTypeNumber2";
    MarkerTypes[MarkerTypes["MarkerTypeNumber3"] = 13] = "MarkerTypeNumber3";
    MarkerTypes[MarkerTypes["MarkerTypeNumber4"] = 14] = "MarkerTypeNumber4";
    MarkerTypes[MarkerTypes["MarkerTypeNumber5"] = 15] = "MarkerTypeNumber5";
    MarkerTypes[MarkerTypes["MarkerTypeNumber6"] = 16] = "MarkerTypeNumber6";
    MarkerTypes[MarkerTypes["MarkerTypeNumber7"] = 17] = "MarkerTypeNumber7";
    MarkerTypes[MarkerTypes["MarkerTypeNumber8"] = 18] = "MarkerTypeNumber8";
    MarkerTypes[MarkerTypes["MarkerTypeNumber9"] = 19] = "MarkerTypeNumber9";
    MarkerTypes[MarkerTypes["MarkerTypeChevronUpx1"] = 20] = "MarkerTypeChevronUpx1";
    MarkerTypes[MarkerTypes["MarkerTypeChevronUpx2"] = 21] = "MarkerTypeChevronUpx2";
    MarkerTypes[MarkerTypes["MarkerTypeChevronUpx3"] = 22] = "MarkerTypeChevronUpx3";
    MarkerTypes[MarkerTypes["MarkerTypeHorizontalCircleFat"] = 23] = "MarkerTypeHorizontalCircleFat";
    MarkerTypes[MarkerTypes["MarkerTypeReplayIcon"] = 24] = "MarkerTypeReplayIcon";
    MarkerTypes[MarkerTypes["MarkerTypeHorizontalCircleSkinny"] = 25] = "MarkerTypeHorizontalCircleSkinny";
    MarkerTypes[MarkerTypes["MarkerTypeHorizontalCircleSkinny_Arrow"] = 26] = "MarkerTypeHorizontalCircleSkinny_Arrow";
    MarkerTypes[MarkerTypes["MarkerTypeHorizontalSplitArrowCircle"] = 27] = "MarkerTypeHorizontalSplitArrowCircle";
    MarkerTypes[MarkerTypes["MarkerTypeDebugSphere"] = 28] = "MarkerTypeDebugSphere";
    MarkerTypes[MarkerTypes["MarkerTypeDallorSign"] = 29] = "MarkerTypeDallorSign";
    MarkerTypes[MarkerTypes["MarkerTypeHorizontalBars"] = 30] = "MarkerTypeHorizontalBars";
    MarkerTypes[MarkerTypes["MarkerTypeWolfHead"] = 31] = "MarkerTypeWolfHead";
})(MarkerTypes || (MarkerTypes = {}));
;
