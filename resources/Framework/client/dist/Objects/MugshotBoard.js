var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Entity, { PedBone } from '../Utility/NativeObjectWrappers/Entity';
import Model from '../Utility/NativeObjectWrappers/Model';
import Rendertarget from '../Utility/NativeObjectWrappers/Rendertarget';
import Scaleform from '../Utility/NativeObjectWrappers/Scaleform';
import Animation from '../Utility/Objects/Animation';
import AnimationDictonary from '../Utility/Objects/AnimationDictonary';
import Vector2 from '../Utility/Objects/Vector2';
import Vector3 from '../Utility/Objects/Vector3';
export default class MugshotBoard {
    constructor(player) {
        this.player = player;
        this.Active = false;
    }
    start(title, topText, midText, bottomText, rank) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Active = true;
            this.board = new Entity(MugshotBoard.policeIdBoardModel, new Vector3(0, 0, 0), new Vector3(0, 0, 0), false);
            this.text = new Entity(MugshotBoard.policeIdTextModel, new Vector3(0, 0, 0), new Vector3(0, 0, 0), false);
            this.scaleform = new Scaleform("mugshot_board_01");
            this.rendertarget = new Rendertarget("ID_Text", this.text.Model);
            console.log("start 1");
            yield this.scaleform.awaitLoad();
            console.log("start 2");
            this.scaleform.addParameters("SET_BOARD", [title, midText, bottomText, topText, 0, (rank > -1) ? rank : null]);
            this.rendertarget.Render.registerRender(() => {
                if (!this.rendertarget || !this.scaleform)
                    return;
                this.rendertarget.Render.drawScaleformMovie(this.scaleform, new Vector2(0.405, 0.37), 0.81, 0.74);
            });
            this.player.attachEntityToEntityBone(this.board, this.player.getPedBoneIndex(PedBone.PH_R_Hand), new Vector3(0, 0, 0), new Vector3(0, 0, 0), 2);
            this.player.attachEntityToEntityBone(this.text, this.player.getPedBoneIndex(PedBone.PH_R_Hand), new Vector3(0, 0, 0), new Vector3(0, 0, 0), 2);
            this.player.startAnimation(MugshotBoard.loopRaisedAnimation, 8, -8);
        });
    }
    stop() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            this.Active = false;
            (_a = this.board) === null || _a === void 0 ? void 0 : _a.destroy();
            (_b = this.text) === null || _b === void 0 ? void 0 : _b.destroy();
            (_c = this.scaleform) === null || _c === void 0 ? void 0 : _c.destroy();
            (_d = this.rendertarget) === null || _d === void 0 ? void 0 : _d.destroy();
            this.player.stopAnimation(MugshotBoard.loopRaisedAnimation);
        });
    }
}
MugshotBoard.loopRaisedAnimation = new Animation(new AnimationDictonary("mp_character_creation@lineup@male_a"), "loop_raised");
MugshotBoard.policeIdBoardModel = new Model('prop_police_id_board');
MugshotBoard.policeIdTextModel = new Model('prop_police_id_text');
