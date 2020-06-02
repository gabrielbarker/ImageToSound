import PatternCreator from "./PatternCreator";
import BrightnessPatternCreator from "./BrightnessPatternCreator";
import DarknessPatternCreator from "./DarknessPatternCreator";
import ProgressionCreator from "./ProgressionCreator";
import RowOrderProgressionCreator from "./RowOrderProgressionCreator";
import ReverseOrderProgressionCreator from "./ReverseRowOrderProgressionCreator";

export default class PixelMusicalData {
  private patternCreator: PatternCreator;
  private progressionCreator: ProgressionCreator;

  constructor(pixelsObject: any) {
    this.patternCreator = new BrightnessPatternCreator(pixelsObject);
    this.progressionCreator = new RowOrderProgressionCreator(pixelsObject, 7);
  }

  public getPatternsFromPixelRows(): string[] {
    return this.patternCreator.getPatterns();
  }

  public getProgressionsFromPixelRows(): string[] {
    return this.progressionCreator.getProgressions();
  }
}
