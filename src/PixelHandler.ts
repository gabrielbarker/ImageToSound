const getPixels = require("@cronvel/get-pixels");
import * as fs from "fs";
import PixelDataWriter from "./PixelDataWriter";
import PixelMusicalData from "./PixelMusicalData";

export default class PixelHandler {
  public writePixelDataToFile(imagePath: string, outputPath: string) {
    const writePixelsToFile = (err: Error, pixels: any) => {
      console.log(`Gettings pixels from ${imagePath}...`);
      const writeStream = fs.createWriteStream(outputPath);
      const writer = new PixelDataWriter(pixels, writeStream);

      if (err) {
        console.log("Could not find image at " + imagePath);
        return;
      } else {
        console.log(`Writing pixels to ${outputPath}...`);
        writer.writePixelsToFile();
      }
    };

    getPixels(imagePath, writePixelsToFile);
  }

  public getAllPixels(imagePath: string) {
    console.log(`Gettings pixels from ${imagePath}...`);
    const getAllPixels = (err: Error, pixels: any) => {
      const musicalData = new PixelMusicalData(pixels);

      if (err) {
        console.log("Could not find image at " + imagePath);
        return;
      }
    };

    getPixels(imagePath, getAllPixels);
  }
}
