import Pixel from "./Pixel";
import PixelObjectProcessor from "./PixelObjectProcessor";

export default abstract class ProgressionCreator {
  private scaleLength: number;
  protected pixelRows: Pixel[][] = [];

  constructor(pixelsObject: any, scaleLength: number) {
    const processor = new PixelObjectProcessor(pixelsObject);
    this.pixelRows = processor.getPixelRows();
    this.scaleLength = scaleLength;
  }

  abstract getProgressions(): string[];

  protected numeralise(index: number) {
    const romanArr = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    return index > this.scaleLength
      ? romanArr[index % this.scaleLength || this.scaleLength].toLowerCase()
      : romanArr[index % this.scaleLength || this.scaleLength];
  }
}
