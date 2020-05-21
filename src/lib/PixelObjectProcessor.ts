import Pixel from "./Pixel";

export default class PixelObjectProcessor {
  private pixelData: number[] = [];
  private pixelRows: Pixel[][] = [];

  private widthInPixels: number;
  private numberOfRows: number;

  constructor(pixelsObject: any) {
    this.pixelData = pixelsObject.data;
    this.widthInPixels = pixelsObject.width;
    this.numberOfRows = pixelsObject.height;
    this.extractPixelRows();
  }

  public getPixelRows() {
    return this.pixelRows;
  }

  private extractPixelRows(): void {
    const pixelRows: Pixel[][] = [];
    for (let rowNumber = 0; rowNumber < this.numberOfRows; rowNumber++) {
      const pixelRow: Pixel[] = this.getPixelRow(rowNumber);
      if (this.rowIsUnique(pixelRows, pixelRow)) pixelRows.push(pixelRow);
    }
    this.pixelRows = pixelRows;
  }

  private getPixelRow = (rowNumber: number): Pixel[] => {
    let pixelRow: Pixel[] = [];
    for (let j = 0; j < this.widthInPixels * 4; j += 4)
      this.addPixelToRowIfItsDifferent(pixelRow, rowNumber, j);
    return pixelRow;
  };

  private rowIsUnique(pixelRows: Pixel[][], pixelRow: Pixel[]) {
    return !pixelRows.find((row) => row.toString() === pixelRow.toString());
  }

  private addPixelToRowIfItsDifferent(pixelRow: Pixel[], rowNumber: number, pixelIndex: number) {
    const rowStartIndex = 4 * rowNumber * this.widthInPixels;
    const pixel: Pixel = this.getPixelByRowAndIndex(rowStartIndex, pixelIndex);
    if (this.pixelIsNotLastInRow(pixel, pixelRow)) pixelRow.push(pixel);
  }

  private pixelIsNotLastInRow(pixel: Pixel, pixelRow: Pixel[]): boolean {
    return pixelRow.length === 0 || !pixelRow[pixelRow.length - 1].equals(pixel);
  }

  private getPixelByRowAndIndex(rowStart: number, index: number) {
    return new Pixel(
      this.pixelData[rowStart + index],
      this.pixelData[rowStart + index + 1],
      this.pixelData[rowStart + index + 2]
    );
  }
}
