const getPixels = require("@cronvel/get-pixels");
import * as fs from "fs";
import PixelDataWriter from "./PixelDataWriter";
import PixelMusicalData from "./PixelMusicalData";

export default class PixelHandler {
  public Ready: Promise<any>;
  private imagePath: string;

  constructor(imagePath: string) {
    this.imagePath = imagePath;
    this.Ready = new Promise((resolve, reject) => {
      const savePixels = (err: any, pixels: any) => {
        resolve(pixels);
      };
      getPixels(imagePath, savePixels);
    });
  }

  public writePixelDataToFile = async (outputPath: string) => {
    console.log(`Gettings pixels from ${this.imagePath}...`);
    const pixels = await this.Ready;
    const writeStream = fs.createWriteStream(outputPath);
    const writer = new PixelDataWriter(pixels, writeStream);
    console.log(`Writing pixels to ${outputPath}...`);
    writer.writePixelsToFile();
  };

  public async getScribbletuneData() {
    console.log(`Gettings pixels from ${this.imagePath}...`);
    const pixels = await this.Ready;
    const musicalData = new PixelMusicalData(pixels);
    let patterns = musicalData.getPatternsFromPixelRows();
    let progressions = musicalData.getProgressionsFromPixelRows();
    return {
      patterns: patterns,
      progressions: progressions
    };
  }
}
