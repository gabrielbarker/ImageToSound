import PatternCreator from "./PatternCreator";
import BrightnessPatternCreator from "./BrightnessPatternCreator";
import DarknessPatternCreator from "./DarknessPatternCreator";
import DefaultPatternCreator from "./DefaultPatternCreator";
import Ambient4PatternCreator from "./Ambient4PatternCreator";
import Ambient8PatternCreator from "./Ambient8PatternCreator";

export default class PatternCreatorFactory {
  private pixelsObject: any;
  private static patternMap: any = {
    Brightness: BrightnessPatternCreator,
    Darkness: DarknessPatternCreator,
    Ambient4: Ambient4PatternCreator,
    Ambient8: Ambient8PatternCreator,
  };

  constructor(pixelsObject: any) {
    this.pixelsObject = pixelsObject;
  }

  public getPattern(name: string): PatternCreator {
    const pattern = PatternCreatorFactory.patternMap[name] || DefaultPatternCreator;
    return new pattern(this.pixelsObject);
  }
}
