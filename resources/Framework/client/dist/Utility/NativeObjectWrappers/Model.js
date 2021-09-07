import * as alt from 'alt-client';
import * as natives from 'natives';
export default class Model {
    constructor(arg1) {
        if (typeof arg1 === 'string') {
            let name = arg1;
            this.Hash = alt.hash(name);
        }
        else if (typeof arg1 === 'number') {
            let hash = arg1;
            this.Hash = hash;
        }
        else {
            this.Hash = -1;
        }
    }
    get Name() {
        return "";
    }
    get isModelInCdimage() {
        return natives.isModelInCdimage(this.Hash);
    }
    get isModelValid() {
        return natives.isModelValid(this.Hash);
    }
    get isModelAPed() {
        return natives.isModelAPed(this.Hash);
    }
    get isModelAVehicle() {
        return natives.isModelAVehicle(this.Hash);
    }
    get isThisModelABoat() {
        return natives.isThisModelABoat(this.Hash);
    }
    get isThisModelAJetski() {
        return natives.isThisModelAJetski(this.Hash);
    }
    get isThisModelAPlane() {
        return natives.isThisModelAPlane(this.Hash);
    }
    get isThisModelAHeli() {
        return natives.isThisModelAHeli(this.Hash);
    }
    get isThisModelACar() {
        return natives.isThisModelACar(this.Hash);
    }
    get isThisModelATrain() {
        return natives.isThisModelATrain(this.Hash);
    }
    get isThisModelABike() {
        return natives.isThisModelABike(this.Hash);
    }
    get isThisModelABicycle() {
        return natives.isThisModelABicycle(this.Hash);
    }
    get isThisModelAQuadbike() {
        return natives.isThisModelAQuadbike(this.Hash);
    }
    get isThisModelAnAmphibiousCar() {
        return natives.isThisModelAnAmphibiousCar(this.Hash);
    }
    get isThisModelAnAmphibiousQuadbike() {
        return natives.isThisModelAnAmphibiousQuadbike(this.Hash);
    }
}
