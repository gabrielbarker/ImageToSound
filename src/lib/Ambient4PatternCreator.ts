import Pixel from "./Pixel";
import PatternCreator from "./PatternCreator";

export default class Ambient4PatternCreator extends PatternCreator {
  public getPatterns(): string[] {
    return this.pixelRows.map((pixelRow) => this.getPatternFromPixelRow(pixelRow));
  }

  private getPatternFromPixelRow = (row: Pixel[]): string => "x___x___x___x___";
}
