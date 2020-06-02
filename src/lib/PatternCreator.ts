import Pixel from "./Pixel";
import PixelObjectProcessor from "./PixelObjectProcessor";

export default abstract class PatternCreator {
  protected pixelRows: Pixel[][] = [];

  constructor(pixelsObject: any) {
    const processor = new PixelObjectProcessor(pixelsObject);
    this.pixelRows = processor.getPixelRows();
  }

  abstract getPatterns(): string[];
}
