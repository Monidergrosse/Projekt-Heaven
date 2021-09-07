import * as natives from 'natives';
import Animation from '../Objects/Animation';
import Vector3 from '../Objects/Vector3';
import Model from './Model';

export default class Entity {
  private scriptId: number;
  private dynamic: boolean;
  get Id(): number {
    return this.scriptId;
  }
  get Model(): Model {
    return new Model(natives.getEntityModel(this.scriptId));
  }
  get Position(): Vector3 {
    return natives.getEntityCoords(this.scriptId, true);
  }
  get Rotation(): Vector3 {
    return natives.getEntityRotation(this.scriptId, 2);
  }
  get Dynamic() {
    return this.dynamic;
  }
  set Position(position: Vector3) {
    natives.setEntityCoords(this.scriptId, position.x, position.y, position.z, false, false, false, true);
  }
  set Rotation(rotation) {
    natives.setEntityRotation(this.scriptId, rotation.x, rotation.y, rotation.z, 2, true);
  }
  set Dynamic(dynamic) {
    this.dynamic = dynamic;
    natives.setEntityDynamic(this.scriptId, dynamic);
  }

  constructor(scriptId: number)
  constructor(model: Model, posision: Vector3, rotation: Vector3, dynamic: boolean)
  constructor(arg1?: number | Model, arg2?: Vector3, arg3?: Vector3, arg4?: boolean) {
    if (typeof arg1 === 'number') {
      this.scriptId = arg1;
      this.dynamic = false;
    } else if (arg1 instanceof Model && arg2 instanceof Vector3 && arg3 instanceof Vector3 && typeof arg4 === 'boolean') {
      let model = arg1, posision = arg2, rotation = arg3, dynamic = arg4;
      this.scriptId = natives.createObjectNoOffset(model.Hash, posision.x, posision.y, posision.z, true, true, dynamic);
      this.dynamic = dynamic;
      natives.setEntityRotation(this.scriptId, rotation.x, rotation.y, rotation.z, 2, true);
    } else {
      this.dynamic = false;
      this.scriptId = -1;
    }
  }

  attachEntityToEntityBone(entity: Entity, boneIndex: number, position: Vector3, rotation: Vector3, vertexIndex: number, softPinning?: boolean, collision?: boolean, isPed?: boolean, fixedRot?: boolean) {
    natives.attachEntityToEntity(
      entity.Id,
      this.Id,
      boneIndex,
      position.x, position.y, position.z,
      rotation.x, rotation.y, rotation.z,
      false,
      softPinning == true,
      collision == true,
      isPed == true,
      vertexIndex,
      fixedRot == true
    );
  }

  // Ped start

  getPedBoneIndex(bone: number): number {
    return natives.getPedBoneIndex(this.Id, bone);
  }

  startAnimation(animation: Animation, blendInSpeed?: number, blendOutSpeed?: number, duration?: number, flags?: number, playbackRate?: number, lock?: { x: boolean, y: boolean, z: boolean }) {
    natives.taskPlayAnim(
      this.Id,
      animation.dictonary.name,
      animation.name,
      blendInSpeed ?? 0,
      blendOutSpeed ?? 0,
      duration ?? -1,
      flags ?? 1,
      playbackRate ?? 0,
      lock?.x ?? false,
      lock?.y ?? false,
      lock?.z ?? false
    );
  }

  stopAnimation(animation: Animation) {
    natives.stopAnimTask(
      this.Id,
      animation.dictonary.name,
      animation.name,
      -4
    );
  }

  // Ped end

  destroy() {
    natives.deleteObject(this.scriptId);
  }
}

/*
console.log(`SKEL_ROOT = 0x0,
 SKEL_Pelvis = 0x2e28,
SKEL_L_Thigh = 0xe39f,
  SKEL_L_Calf = 0xf9bb,
SKEL_L_Foot = 0x3779,
SKEL_L_Toe0 = 0x83c,
IK_L_Foot = 0xfedd,
 PH_L_Foot = 0xe175,
 MH_L_Knee = 0xb3fe,
 SKEL_R_Thigh = 0xca72,
  SKEL_R_Calf = 0x9000,
SKEL_R_Foot = 0xcc4d,
SKEL_R_Toe0 = 0x512d,
IK_R_Foot = 0x8aae,
 PH_R_Foot = 0x60e6,
 MH_R_Knee = 0x3fcf,
 RB_L_ThighRoll = 0x5c57,
RB_R_ThighRoll = 0x192a,
SKEL_Spine_Root = 0xe0fd,
SKEL_Spine0 = 0x5c01,
SKEL_Spine1 = 0x60f0,
SKEL_Spine2 = 0x60f1,
SKEL_Spine3 = 0x60f2,
SKEL_L_Clavicle = 0xfcd9,
SKEL_L_UpperArm = 0xb1c5,
SKEL_L_Forearm = 0xeeeb,
SKEL_L_Hand = 0x49d9,
SKEL_L_Finger00 = 0x67f2,
SKEL_L_Finger01 = 0xff9,
SKEL_L_Finger02 = 0xffa,
SKEL_L_Finger10 = 0x67f3,
SKEL_L_Finger11 = 0x1049,
SKEL_L_Finger12 = 0x104a,
SKEL_L_Finger20 = 0x67f4,
SKEL_L_Finger21 = 0x1059,
SKEL_L_Finger22 = 0x105a,
SKEL_L_Finger30 = 0x67f5,
SKEL_L_Finger31 = 0x1029,
SKEL_L_Finger32 = 0x102a,
SKEL_L_Finger40 = 0x67f6,
SKEL_L_Finger41 = 0x1039,
SKEL_L_Finger42 = 0x103a,
PH_L_Hand = 0xeb95,
 IK_L_Hand = 0x8cbd,
 RB_L_ForeArmRoll = 0xee4f,
  RB_L_ArmRoll = 0x1470,
  MH_L_Elbow = 0x58b7,
SKEL_R_Clavicle = 0x29d2,
SKEL_R_UpperArm = 0x9d4d,
SKEL_R_Forearm = 0x6e5c,
SKEL_R_Hand = 0xdead,
SKEL_R_Finger00 = 0xe5f2,
SKEL_R_Finger01 = 0xfa10,
SKEL_R_Finger02 = 0xfa11,
SKEL_R_Finger10 = 0xe5f3,
SKEL_R_Finger11 = 0xfa60,
SKEL_R_Finger12 = 0xfa61,
SKEL_R_Finger20 = 0xe5f4,
SKEL_R_Finger21 = 0xfa70,
SKEL_R_Finger22 = 0xfa71,
SKEL_R_Finger30 = 0xe5f5,
SKEL_R_Finger31 = 0xfa40,
SKEL_R_Finger32 = 0xfa41,
SKEL_R_Finger40 = 0xe5f6,
SKEL_R_Finger41 = 0xfa50,
SKEL_R_Finger42 = 0xfa51,
PH_R_Hand = 0x6f06,
 IK_R_Hand = 0x188e,
 RB_R_ForeArmRoll = 0xab22,
  RB_R_ArmRoll = 0x90ff,
  MH_R_Elbow = 0xbb0,
 SKEL_Neck_1 = 0x9995,
SKEL_Head = 0x796e,
 IK_Head = 0x322c,
FACIAL_facialRoot = 0xfe2c,
 FB_L_Brow_Out_000 = 0xe3db,
 FB_L_Lid_Upper_000 = 0xb2b6,
FB_L_Eye_000 = 0x62ac,
  FB_L_CheekBone_000 = 0x542e,
FB_L_Lip_Corner_000 = 0x74ac,
FB_R_Lid_Upper_000 = 0xaa10,
FB_R_Eye_000 = 0x6b52,
  FB_R_CheekBone_000 = 0x4b88,
FB_R_Brow_Out_000 = 0x54c,
  FB_R_Lip_Corner_000 = 0x2ba6,
FB_Brow_Centre_000 = 0x9149,
FB_UpperLipRoot_000 = 0x4ed2,
FB_UpperLip_000 = 0xf18f,
FB_L_Lip_Top_000 = 0x4f37,
  FB_R_Lip_Top_000 = 0x4537,
  FB_Jaw_000 = 0xb4a0,
FB_LowerLipRoot_000 = 0x4324,
FB_LowerLip_000 = 0x508f,
FB_L_Lip_Bot_000 = 0xb93b,
  FB_R_Lip_Bot_000 = 0xc33b,
  FB_Tongue_000 = 0xb987,
 RB_Neck_1 = 0x8b93,
 IK_Root = 0xdd1c`.split(",\n").map(_ => _.trim()).map(_ => _.split(' = ')[0] + ' = ' + Number.parseInt(_.split(' = ')[1])).join(',\n'))
*/

export enum PedBone {
  SKEL_ROOT = 0,
  SKEL_Pelvis = 11816,
  SKEL_L_Thigh = 58271,
  SKEL_L_Calf = 63931,
  SKEL_L_Foot = 14201,
  SKEL_L_Toe0 = 2108,
  IK_L_Foot = 65245,
  PH_L_Foot = 57717,
  MH_L_Knee = 46078,
  SKEL_R_Thigh = 51826,
  SKEL_R_Calf = 36864,
  SKEL_R_Foot = 52301,
  SKEL_R_Toe0 = 20781,
  IK_R_Foot = 35502,
  PH_R_Foot = 24806,
  MH_R_Knee = 16335,
  RB_L_ThighRoll = 23639,
  RB_R_ThighRoll = 6442,
  SKEL_Spine_Root = 57597,
  SKEL_Spine0 = 23553,
  SKEL_Spine1 = 24816,
  SKEL_Spine2 = 24817,
  SKEL_Spine3 = 24818,
  SKEL_L_Clavicle = 64729,
  SKEL_L_UpperArm = 45509,
  SKEL_L_Forearm = 61163,
  SKEL_L_Hand = 18905,
  SKEL_L_Finger00 = 26610,
  SKEL_L_Finger01 = 4089,
  SKEL_L_Finger02 = 4090,
  SKEL_L_Finger10 = 26611,
  SKEL_L_Finger11 = 4169,
  SKEL_L_Finger12 = 4170,
  SKEL_L_Finger20 = 26612,
  SKEL_L_Finger21 = 4185,
  SKEL_L_Finger22 = 4186,
  SKEL_L_Finger30 = 26613,
  SKEL_L_Finger31 = 4137,
  SKEL_L_Finger32 = 4138,
  SKEL_L_Finger40 = 26614,
  SKEL_L_Finger41 = 4153,
  SKEL_L_Finger42 = 4154,
  PH_L_Hand = 60309,
  IK_L_Hand = 36029,
  RB_L_ForeArmRoll = 61007,
  RB_L_ArmRoll = 5232,
  MH_L_Elbow = 22711,
  SKEL_R_Clavicle = 10706,
  SKEL_R_UpperArm = 40269,
  SKEL_R_Forearm = 28252,
  SKEL_R_Hand = 57005,
  SKEL_R_Finger00 = 58866,
  SKEL_R_Finger01 = 64016,
  SKEL_R_Finger02 = 64017,
  SKEL_R_Finger10 = 58867,
  SKEL_R_Finger11 = 64096,
  SKEL_R_Finger12 = 64097,
  SKEL_R_Finger20 = 58868,
  SKEL_R_Finger21 = 64112,
  SKEL_R_Finger22 = 64113,
  SKEL_R_Finger30 = 58869,
  SKEL_R_Finger31 = 64064,
  SKEL_R_Finger32 = 64065,
  SKEL_R_Finger40 = 58870,
  SKEL_R_Finger41 = 64080,
  SKEL_R_Finger42 = 64081,
  PH_R_Hand = 28422,
  IK_R_Hand = 6286,
  RB_R_ForeArmRoll = 43810,
  RB_R_ArmRoll = 37119,
  MH_R_Elbow = 2992,
  SKEL_Neck_1 = 39317,
  SKEL_Head = 31086,
  IK_Head = 12844,
  FACIAL_facialRoot = 65068,
  FB_L_Brow_Out_000 = 58331,
  FB_L_Lid_Upper_000 = 45750,
  FB_L_Eye_000 = 25260,
  FB_L_CheekBone_000 = 21550,
  FB_L_Lip_Corner_000 = 29868,
  FB_R_Lid_Upper_000 = 43536,
  FB_R_Eye_000 = 27474,
  FB_R_CheekBone_000 = 19336,
  FB_R_Brow_Out_000 = 1356,
  FB_R_Lip_Corner_000 = 11174,
  FB_Brow_Centre_000 = 37193,
  FB_UpperLipRoot_000 = 20178,
  FB_UpperLip_000 = 61839,
  FB_L_Lip_Top_000 = 20279,
  FB_R_Lip_Top_000 = 17719,
  FB_Jaw_000 = 46240,
  FB_LowerLipRoot_000 = 17188,
  FB_LowerLip_000 = 20623,
  FB_L_Lip_Bot_000 = 47419,
  FB_R_Lip_Bot_000 = 49979,
  FB_Tongue_000 = 47495,
  RB_Neck_1 = 35731,
  IK_Root = 56604
}