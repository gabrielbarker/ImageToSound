import PatternCreator from "./PatternCreator";
import BrightnessPatternCreator from "./BrightnessPatternCreator";
import ProgressionCreator from "./ProgressionCreator";
import RowOrderProgressionCreator from "./RowOrderProgressionCreator";

export default class PixelMusicalData {
  private patternCreator: PatternCreator;
  private progressionCreator: ProgressionCreator;

  constructor(pixelsObject: any) {
    this.patternCreator = new BrightnessPatternCreator(pixelsObject);
    this.progressionCreator = new RowOrderProgressionCreator(pixelsObject);
  }

  public getPatternsFromPixelRows(): string[] {
    return this.patternCreator.getPatterns();
  }

  public getProgressionsFromPixelRows(): string[] {
    return this.progressionCreator.getProgressions();
  }
}
