import Pixel from "./Pixel";
import PixelObjectProcessor from "./PixelObjectProcessor";

export default abstract class ProgressionCreator {
  protected pixelRows: Pixel[][] = [];

  constructor(pixelsObject: any) {
    const processor = new PixelObjectProcessor(pixelsObject);
    this.pixelRows = processor.getPixelRows();
  }

  abstract getProgressions(): string[];

  protected numeralise(index: number) {
    const romanArr = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    return index > 7 ? romanArr[index % 7 || 7].toLowerCase() : romanArr[index % 7 || 7];
  }
}
