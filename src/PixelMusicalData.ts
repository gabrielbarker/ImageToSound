import * as readline from "readline";
import Pixel from "./Pixel";

export default class PixelMusicalData {
  private pixelData: number[] = [];
  private pixelRows: Pixel[][] = [];

  private widthInPixels: number;
  private numberOfRows: number;

  constructor(pixelsObject: any) {
    this.pixelData = pixelsObject.data;
    this.widthInPixels = pixelsObject.shape[0];
    this.numberOfRows = pixelsObject.shape[1];
    this.getPixelRows();
  }

  public getPatternsFromPixelRows = (): string[] => {
    let patterns: string[] = [];
    this.pixelRows.forEach(pixelRow => {
      patterns.push(this.getPatternFromPixelRow(pixelRow));
    });
    return patterns;
  };

  public getProgressionsFromPixelRows = (): string[] => {
    let progressions: string[] = [];
    this.pixelRows.forEach(pixelRow => {
      progressions.push(this.getProgressionFromPixelRow(pixelRow));
    });
    return progressions;
  };

  private getProgressionFromPixelRow = (row: Pixel[]): string => {
    const unsortedRow = [...row];
    row.sort((a, b) => a.compareTo(b));
    const indexMap = unsortedRow.map(pixel => row.indexOf(pixel));
    return indexMap.map(index => this.numeralise(index)).join(" ");
  };

  private numeralise(index: number) {
    const moreThan8 = index > 7;
    const halfedPosition = (index % 7) + 1;
    let numeralValue = "";

    if (halfedPosition === 4) {
      numeralValue = "iv";
    } else if (halfedPosition > 4) {
      numeralValue = "v";
      for (let i = 5; i < halfedPosition; i++) numeralValue += "i";
    } else {
      for (let i = 0; i < halfedPosition; i++) numeralValue += "i";
    }
    if (moreThan8) return numeralValue.toUpperCase();
    return numeralValue;
  }

  private getPatternFromPixelRow = (row: Pixel[]): string => {
    let pattern = "";
    row.forEach((pixel, i) => {
      if (i == 0 || pixel.compareTo(row[i - 1]) > 0) pattern += "x";
      else if (pixel.compareTo(row[i - 1]) < 0) pattern += "_";
      else if (pixel.compareTo(row[i - 1]) === 0) pattern += "-";
    });
    return pattern;
  };

  private getPixelRows = (): void => {
    let pixelRows: Pixel[][] = [];
    for (let rowNumber = 0; rowNumber < this.numberOfRows; rowNumber++) {
      let pixelRow: Pixel[] = this.getPixelRow(rowNumber);
      if (!pixelRows.find(row => row.toString() === pixelRow.toString())) {
        pixelRows.push(pixelRow);
      }
    }
    this.pixelRows = pixelRows;
  };

  private getPixelRow = (rowNumber: number): Pixel[] => {
    let pixelRow: Pixel[] = [];
    for (let j = 0; j < this.widthInPixels * 4; j += 4) {
      const rowStartIndex = 4 * rowNumber * this.widthInPixels;
      let pixel: Pixel = new Pixel(
        this.pixelData[j + rowStartIndex],
        this.pixelData[j + rowStartIndex + 1],
        this.pixelData[j + rowStartIndex + 2]
      );

      if (pixelRow.length === 0 || !pixelRow[pixelRow.length - 1].equals(pixel)) {
        pixelRow.push(pixel);
      }
    }
    return pixelRow;
  };
}
