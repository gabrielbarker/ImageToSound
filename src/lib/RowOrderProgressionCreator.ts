import Pixel from "./Pixel";
import ProgressionCreator from "./ProgressionCreator";

export default class RowOrderProgressionCreator extends ProgressionCreator {
  public getProgressions(): string[] {
    return this.pixelRows.map((pixelRow) => this.getProgressionFromPixelRow(pixelRow));
  }

  private getProgressionFromPixelRow = (row: Pixel[]): string => {
    const unsortedRow = [...row];
    row.sort((a, b) => a.compareTo(b));
    const indexMap = unsortedRow.map((pixel) => row.indexOf(pixel));
    return indexMap.map((index) => this.numeralise(index + 1)).join(" ");
  };
}
