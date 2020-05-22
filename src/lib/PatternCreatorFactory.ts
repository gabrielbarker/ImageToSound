import PatternCreator from "./PatternCreator";
import BrightnessPatternCreator from "./BrightnessPatternCreator";
import DarknessPatternCreator from "./DarknessPatternCreator";
import DefaultPatternCreator from "./DefaultPatternCreator";

export default class PatternCreatorFactory {
  private pixelsObject: any;

  constructor(pixelsObject: any) {
    this.pixelsObject = pixelsObject;
  }

  public getPattern(name: string): PatternCreator {
    console.log(name);
    if (name === "Brightness") return new BrightnessPatternCreator(this.pixelsObject);
    if (name === "Darkness") return new DarknessPatternCreator(this.pixelsObject);
    return new DefaultPatternCreator(this.pixelsObject);
  }
}
