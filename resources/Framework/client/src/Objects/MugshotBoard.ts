import Entity, { PedBone } from '../Utility/NativeObjectWrappers/Entity';
import Model from '../Utility/NativeObjectWrappers/Model';
import Rendertarget from '../Utility/NativeObjectWrappers/Rendertarget';
import Scaleform from '../Utility/NativeObjectWrappers/Scaleform';
import Animation from '../Utility/Objects/Animation';
import AnimationDictonary from '../Utility/Objects/AnimationDictonary';
import Vector2 from '../Utility/Objects/Vector2';
import Vector3 from '../Utility/Objects/Vector3';

export default class MugshotBoard {
  public Active: boolean = false;
  private board?: Entity;
  private text?: Entity;
  private scaleform?: Scaleform;
  private rendertarget?: Rendertarget;

  private static loopRaisedAnimation: Animation = new Animation(new AnimationDictonary("mp_character_creation@lineup@male_a"), "loop_raised");
  private static policeIdBoardModel: Model = new Model('prop_police_id_board');
  private static policeIdTextModel: Model = new Model('prop_police_id_text');

  constructor(private player: Entity) {
  }

  async start(title: string, topText: string, midText: string, bottomText: string, rank: number) {
    this.Active = true;
    this.board = new Entity(MugshotBoard.policeIdBoardModel, new Vector3(0, 0, 0), new Vector3(0, 0, 0), false);
    this.text = new Entity(MugshotBoard.policeIdTextModel, new Vector3(0, 0, 0), new Vector3(0, 0, 0), false);
    this.scaleform = new Scaleform("mugshot_board_01");
    this.rendertarget = new Rendertarget("ID_Text", this.text.Model);
    console.log("start 1");
    await this.scaleform.awaitLoad();
    console.log("start 2");
    this.scaleform.addParameters("SET_BOARD", [title, midText, bottomText, topText, 0, (rank > -1) ? rank : null]);
    this.rendertarget.Render.registerRender(() => {
      if (!this.rendertarget || !this.scaleform) return;
      this.rendertarget.Render.drawScaleformMovie(this.scaleform, new Vector2(0.405, 0.37), 0.81, 0.74);
    });
    this.player.attachEntityToEntityBone(this.board, this.player.getPedBoneIndex(PedBone.PH_R_Hand), new Vector3(0, 0, 0), new Vector3(0, 0, 0), 2);
    this.player.attachEntityToEntityBone(this.text, this.player.getPedBoneIndex(PedBone.PH_R_Hand), new Vector3(0, 0, 0), new Vector3(0, 0, 0), 2);
    this.player.startAnimation(MugshotBoard.loopRaisedAnimation, 8, -8);
  }

  async stop() {
    this.Active = false;
    this.board?.destroy();
    this.text?.destroy();
    this.scaleform?.destroy();
    this.rendertarget?.destroy();
    this.player.stopAnimation(MugshotBoard.loopRaisedAnimation);
  }
}