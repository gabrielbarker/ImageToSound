import PatternCreator from "./PatternCreator";

export default class BrightnessPatternCreator extends PatternCreator {
  public getPatterns(): string[] {
    return this.pixelRows.map((row) => row.map(() => "x").join(""));
  }
}
