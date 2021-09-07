var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as alt from 'alt-client';
import MugshotBoard from './Objects/MugshotBoard';
import Entity from './Utility/NativeObjectWrappers/Entity';
let player = new Entity(alt.Player.local.scriptID);
let mugshotBoard = new MugshotBoard(player);
alt.on('keydown', (key) => __awaiter(void 0, void 0, void 0, function* () {
    if (key == "G".charCodeAt(0)) {
        if (mugshotBoard.Active) {
            yield mugshotBoard.stop();
        }
        else {
            yield mugshotBoard.start("", "", "Test", "", -1);
        }
    }
}));
