import * as fs from "fs";
import * as readline from "readline";

export default class PixelDataWriter {
  private pixels: number[];
  private writeStream: fs.WriteStream;

  private widthInPixels: number;
  private numberOfRows: number;
  private totalNumberOfpixels: number;

  private currentRowIndex: number = 0;

  constructor(pixelsObject: any, writeStream: fs.WriteStream) {
    this.pixels = pixelsObject.data;
    this.writeStream = writeStream;
    this.widthInPixels = pixelsObject.width;
    this.numberOfRows = pixelsObject.height;
    this.totalNumberOfpixels = this.widthInPixels * this.numberOfRows;
  }

  public writePixelsToFile = () => {
    this.currentRowIndex = 0;
    this.printPixelDataDetails();

    const write = () => {
      let ok = true;

      while (this.currentRowIndex < this.numberOfRows && ok) {
        ok = this.addToWriteStream();
      }

      if (this.currentRowIndex < this.numberOfRows) {
        this.writeStream.once("drain", write);
      } else {
        this.printDoneMessage();
      }
    };

    write();
  };

  private addToWriteStream = () => {
    this.currentRowIndex++;
    this.printProgress((this.currentRowIndex / this.numberOfRows) * 100);
    return this.writeStream.write(
      this.getPixelRow(this.currentRowIndex, this.widthInPixels, this.pixels),
      "utf8"
    );
  };

  private printDoneMessage = () => {
    readline.clearLine(process.stdout, 0);
    console.log("\nDone!\n");
  };

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

  private getPixelRow(rowIndex: number, width: number, pixelData: number[]) {
    const pixels: string[] = [];
    let pixel: number[] = [];
    pixelData.slice(rowIndex * width * 4, (rowIndex + 1) * width * 4).forEach((value, index) => {
      if (index % 4 === 3) {
        pixels.push("[" + pixel.join(",") + "]");
        pixel = [];
      } else {
        pixel.push(value);
      }
    });
    return pixels.join(",") + "\n";
  }

  private printProgress = (percentComplete: number) => {
    if (this.currentRowIndex % 5 === 0) {
      percentComplete = Math.ceil(percentComplete);
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${percentComplete}% complete`);
    }
  };
}
