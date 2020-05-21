import ProgressionCreator from "./ProgressionCreator";
import RowOrderProgressionCreator from "./RowOrderProgressionCreator";
import ReverseRowOrderProgressionCreator from "./ReverseRowOrderProgressionCreator";
import DefaultProgressionCreator from "./DefaultProgressionCreator";

export default class ProgressionCreatorFactory {
  private pixelsObject: any;

  constructor(pixelsObject: any) {
    this.pixelsObject = pixelsObject;
  }

  public getProgression(name: string): ProgressionCreator {
    if (name === "Reverse Row Order")
      return new ReverseRowOrderProgressionCreator(this.pixelsObject);
    if (name === "Row Order") return new RowOrderProgressionCreator(this.pixelsObject);
    return new DefaultProgressionCreator(this.pixelsObject);
  }
}
