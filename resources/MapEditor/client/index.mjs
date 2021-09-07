import * as alt from 'alt-client';
import * as native from 'natives';
import * as utility from './lib/utility.mjs';
import { Entity } from './lib/utilitys/entity.mjs';

const disabledControls = [
    30, // A & D
    31, // W & S
    20, // Spacebar
    21, // Left Shift
    36, // Left Ctrl
    22, // Space
    44, // Q
    38, // E
    71, // W - Vehicle
    72, // S - Vehicle
    59, // A & D - Vehicle
    60, // L Shift & L CTRL - Vehicle
    42, // D PAD Up || ]
    43, // D PAD Down || [
    85,
    86,
    15, // Mouse Wheel Up
    14, // Mouse Wheel Down
    228,
    229,
    172,
    173,
    37,
    44,
    178,
    244,
    220,
    221,
    218,
    219,
    16,
    17
];

let Screen = {};

const mapEditor = {
  active: false,
  camera: null,
  cameraMouse: false,
  cameraHandler: null,
  speed: 0.5,
  view: new alt.WebView('http://resource/client/view/index.html'),

  init: () => {
    mapEditor.view.on("newObject", () => {
      //native.createPed(0, alt.hash("mp_f_freemode_01"), alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 0, false, false);
      new Entity("hei_prop_heist_cutscene_doorc_l", alt.Player.local.pos, new alt.Vector3(0, 0, 0), false);
    });
    mapEditor.view.on("Screen:setSize", (width, height) => {
      Screen.width = width;
      Screen.height = height;
    });
  },

  enter: () => {
    mapEditor.active = true;
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    native.setEntityVisible(alt.Player.local.scriptID, false, false);
    native.setEntityInvincible(alt.Player.local.scriptID, true);
    if (!mapEditor.camera) {
      native.destroyAllCams();
      const pos = { ...alt.Player.local.pos };
      mapEditor.camera = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', pos.x, pos.y, pos.z, 0, 0, 0, 70);
      native.setCamActive(mapEditor.camera, true);
      native.renderScriptCams(true, false, 0, true, false);
      native.setCamAffectsAiming(mapEditor.camera, false);
    }
    mapEditor.cameraHandler = alt.setInterval(mapEditor.handleCamera, 0);
    mapEditor.view.focus();
    mapEditor.view.emit('show');
    alt.showCursor(true);
    native.setCursorLocation(0.5, 0.5);
  },

  exit: () => {
    mapEditor.active = false;
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
    native.setEntityVisible(alt.Player.local.scriptID, true, false);
    native.setEntityInvincible(alt.Player.local.scriptID, false);
    if (mapEditor.camera) {
      native.renderScriptCams(false, false, 255, true, false);
      native.setCamActive(mapEditor.camera, false);
      native.destroyCam(mapEditor.camera, false);
      native.destroyAllCams(true);
      mapEditor.camera = null;
    }
    if (mapEditor.cameraHandler != null) {
      alt.clearInterval(mapEditor.cameraHandler);
      mapEditor.cameraHandler = null;
    }
    mapEditor.view.unfocus();
    mapEditor.view.emit('hide');
    alt.showCursor(false);
  },

  handleCamera: () => {
    if (native.isPauseMenuActive()) return;
    disabledControls.forEach(control => native.disableControlAction(0, control, true));
    native.disableFirstPersonCamThisFrame();
    native.blockWeaponWheelThisFrame();

    //Camera state
    if(native.isControlJustPressed(0, 25)) { //right mouse button down
      let objectListWidth = Screen.width / 100 * 15;
      if((alt.getCursorPos().x < Screen.width - ( objectListWidth + 20 ) || alt.getCursorPos().x > Screen.width - 20) &&
         (alt.getCursorPos().y > 20 || alt.getCursorPos().y < Screen.height - 20)) {
        alt.showCursor(false);
        mapEditor.cameraMouse = true;
      }
    }
    if(native.isControlJustReleased(0, 25)) { //right mouse button up
      if(mapEditor.cameraMouse) {
        alt.showCursor(true);
        native.setCursorLocation(0.5, 0.5);
        mapEditor.cameraMouse = false;
      }
    }

    if(native.isControlJustReleased(0, 24)) { //left mouse button down
    }
    if(native.isControlJustPressed(0, 24)) { //left mouse button up
    }

    //Camera Speed
    if (native.isDisabledControlJustPressed(0, 15)) { //Mouse wheel up
      if(mapEditor.speed < 5)
        mapEditor.speed += 0.1;
    }

    if (native.isDisabledControlJustPressed(0, 14)) { //Mouse wheel down
      if(mapEditor.speed > 0.1)
        mapEditor.speed -= 0.1;
    }
    mapEditor.speed = Math.round(mapEditor.speed * 10) / 10;


    // Camera Rotaiton
    let rightAxisX = native.getDisabledControlNormal(0, 220);
    let rightAxisY = native.getDisabledControlNormal(0, 221);
    if(!mapEditor.cameraMouse){
      rightAxisX = 0;
      rightAxisY = 0;
    }

    // Camera Movement
    const leftAxisX = native.getDisabledControlNormal(0, 218);
    const leftAxisY = native.getDisabledControlNormal(0, 219);

    // Calculations
    const upVector = { x: 0, y: 0, z: 1 };
    const pos = utility.getCameraPosition(mapEditor.camera);
    const rot = utility.getCameraRotation(mapEditor.camera);
    const rr = utility.rotationToDirection(rot);
    const preRightVector = utility.getCrossProduct(utility.getNormalizedVector(rr), utility.getNormalizedVector(upVector));

    const movementVector = {
        x: rr.x * leftAxisY * mapEditor.speed,
        y: rr.y * leftAxisY * mapEditor.speed,
        z: rr.z * leftAxisY * (mapEditor.speed / 1.5)
    };

    const rightVector = {
        x: preRightVector.x * leftAxisX * mapEditor.speed,
        y: preRightVector.y * leftAxisX * mapEditor.speed,
        z: preRightVector.z * leftAxisX * mapEditor.speed
    };

    const newPos = {
        x: pos.x - movementVector.x + rightVector.x,
        y: pos.y - movementVector.y + rightVector.y,
        z: pos.z - movementVector.z + rightVector.z
    };

    if (native.isDisabledControlPressed(0, 22)) { //Spacebar
      newPos.z += mapEditor.speed;
    }

    if (native.isDisabledControlPressed(0, 21)) { //Left Shift
      newPos.z -= mapEditor.speed;
    }

    native.setCamCoord(mapEditor.camera, newPos.x, newPos.y, newPos.z);
    native.setCamRot(mapEditor.camera, rot.x + rightAxisY * -5.0, 0.0, rot.z + rightAxisX * -5.0, 2);

    alt.emitServer('Noclip:Update', newPos);
  }
};

mapEditor.init();

alt.on('keydown', (key) => {
  if (key === 'L'.charCodeAt(0)) {
    if(!mapEditor.active)
      mapEditor.enter();
    else
      mapEditor.exit();
  }
});
