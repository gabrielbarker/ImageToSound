import * as fs from "fs";
import * as readline from "readline";

export default class PixelMusicalData {
  private pixels: [number, number, number][] = [];

  private widthInPixels: number;
  private numberOfRows: number;
  private totalNumberOfpixels: number;

  private currentRowIndex: number = 0;

  constructor(pixelsObject: any) {
    this.getPixels(pixelsObject.data);
    this.widthInPixels = pixelsObject.shape[0];
    this.numberOfRows = pixelsObject.shape[1];
    this.totalNumberOfpixels = this.widthInPixels * this.numberOfRows;
  }

  private printPixelDataDetails = () => {
    const totalString = "Total Number Of Pixels: " + this.totalNumberOfpixels;
    const maxLength = totalString.length + 2;
    console.log();
    console.log(" ".padEnd(maxLength, "-"));
    console.log("|Total Number Of Pixels: " + this.totalNumberOfpixels + " |");
    console.log(("|Row Width: " + this.widthInPixels).padEnd(maxLength, " ") + "|");
    console.log(("|Number of Rows: " + this.numberOfRows).padEnd(maxLength, " ") + "|");
    console.log(" ".padEnd(maxLength, "-"));
  };

  private getPixels = (pixelData: number[]): void => {
    const uniquePixels: [number, number, number][] = [];
    for (let i = 0; i < pixelData.length; i += 4) {
      let pixel: [number, number, number] = [pixelData[i], pixelData[i + 1], pixelData[i + 2]];
      if (
        Math.abs(pixel[0] - pixel[1]) > 20 &&
        Math.abs(pixel[0] - pixel[2]) > 20 &&
        Math.abs(pixel[1] - pixel[2]) > 20 &&
        !uniquePixels.find(x => x[0] === pixel[0] && x[1] === pixel[1] && x[2] === pixel[2])
      ) {
        uniquePixels.push(pixel);
      }
      if (i % 64 === 0) {
        this.printProgress((i / pixelData.length) * 100);
      }
    }
    console.log(uniquePixels);
  };

  private getUniquePixels = () => {
    this.pixels.forEach(pixel => {});
  };

  private printProgress = (percentComplete: number) => {
    percentComplete = Math.ceil(percentComplete);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${percentComplete}% complete`);
  };
}
