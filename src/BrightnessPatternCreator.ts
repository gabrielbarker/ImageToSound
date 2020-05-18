import Pixel from "./Pixel";
import PatternCreator from "./PatternCreator";

export default class BrightnessPatternCreator extends PatternCreator {
  public getPatterns(): string[] {
    return this.pixelRows.map((pixelRow) => this.getPatternFromPixelRow(pixelRow));
  }

  private getPatternFromPixelRow = (row: Pixel[]): string => {
    return row.map((pixel, i) => this.getSymbolFromPixelRowAtIndex(pixel, row, i)).join("");
  };

  private getSymbolFromPixelRowAtIndex = (pixel: Pixel, row: Pixel[], index: number): string => {
    if (index == 0) return "x";
    if (pixel.compareTo(row[index - 1]) === 0) return "-";
    return pixel.compareTo(row[index - 1]) > 0 ? "x" : "_";
  };
}
