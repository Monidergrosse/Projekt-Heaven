import * as alt from 'alt-client';
import * as natives from 'natives';

export default class Model {
  public Hash: number;

  constructor(name: string)
  constructor(hash: number)
  constructor(arg1?: number | string) {
    if (typeof arg1 === 'string') {
      let name = arg1;
      this.Hash = alt.hash(name);
    } else if (typeof arg1 === 'number') {
      let hash = arg1;
      this.Hash = hash;
    } else {
      this.Hash = -1;
    }
  }

  public get Name(): string {
    return "";
  }

  public get isModelInCdimage(): boolean {
    return natives.isModelInCdimage(this.Hash);
  }

  public get isModelValid(): boolean {
    return natives.isModelValid(this.Hash);
  }

  public get isModelAPed(): boolean {
    return natives.isModelAPed(this.Hash);
  }

  public get isModelAVehicle(): boolean {
    return natives.isModelAVehicle(this.Hash);
  }

  public get isThisModelABoat(): boolean {
    return natives.isThisModelABoat(this.Hash);
  }

  public get isThisModelAJetski(): boolean {
    return natives.isThisModelAJetski(this.Hash);
  }

  public get isThisModelAPlane(): boolean {
    return natives.isThisModelAPlane(this.Hash);
  }

  public get isThisModelAHeli(): boolean {
    return natives.isThisModelAHeli(this.Hash);
  }

  public get isThisModelACar(): boolean {
    return natives.isThisModelACar(this.Hash);
  }

  public get isThisModelATrain(): boolean {
    return natives.isThisModelATrain(this.Hash);
  }

  public get isThisModelABike(): boolean {
    return natives.isThisModelABike(this.Hash);
  }

  public get isThisModelABicycle(): boolean {
    return natives.isThisModelABicycle(this.Hash);
  }

  public get isThisModelAQuadbike(): boolean {
    return natives.isThisModelAQuadbike(this.Hash);
  }

  public get isThisModelAnAmphibiousCar(): boolean {
    return natives.isThisModelAnAmphibiousCar(this.Hash);
  }

  public get isThisModelAnAmphibiousQuadbike(): boolean {
    return natives.isThisModelAnAmphibiousQuadbike(this.Hash);
  }
}