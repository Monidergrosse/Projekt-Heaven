import * as natives from 'natives';
import * as alt from 'alt-client';
export default class Scaleform {
  public Id: number;

  constructor(name: string) {
    this.Id = natives.requestScaleformMovie(name);
  }

  public addParameters(name: string, parameters: Array<number | boolean | string | null>) {
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

  public awaitLoad(): Promise<void> {
    return new Promise((resolve) => {
      let interval = alt.setInterval(() => {
        if (natives.hasScaleformMovieLoaded(this.Id)) {
          alt.clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  public destroy() {
    natives.setScaleformMovieAsNoLongerNeeded(this.Id);
  }
}