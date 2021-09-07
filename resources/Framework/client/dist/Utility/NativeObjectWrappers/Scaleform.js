import * as natives from 'natives';
import * as alt from 'alt-client';
export default class Scaleform {
    constructor(name) {
        this.Id = natives.requestScaleformMovie(name);
    }
    addParameters(name, parameters) {
        natives.beginScaleformMovieMethod(this.Id, name);
        parameters.filter(_ => _ != null).forEach(parameter => {
            switch (typeof parameter) {
                case "number":
                    if (Number(parameter) === parameter && parameter % 1 === 0)
                        natives.scaleformMovieMethodAddParamInt(parameter);
                    else if (Number(parameter) === parameter && parameter % 1 !== 0)
                        natives.scaleformMovieMethodAddParamFloat(parameter);
                    break;
                case "boolean":
                    natives.scaleformMovieMethodAddParamBool(parameter);
                    break;
                case "string":
                    natives.scaleformMovieMethodAddParamPlayerNameString(parameter);
                    break;
            }
        });
        natives.endScaleformMovieMethod();
    }
    awaitLoad() {
        return new Promise((resolve) => {
            let interval = alt.setInterval(() => {
                if (natives.hasScaleformMovieLoaded(this.Id)) {
                    alt.clearInterval(interval);
                    resolve();
                }
            }, 50);
        });
    }
    destroy() {
        natives.setScaleformMovieAsNoLongerNeeded(this.Id);
    }
}
