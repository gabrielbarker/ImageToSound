import ProgressionCreator from "./ProgressionCreator";
import RowOrderProgressionCreator from "./RowOrderProgressionCreator";
import ReverseRowOrderProgressionCreator from "./ReverseRowOrderProgressionCreator";
import DefaultProgressionCreator from "./DefaultProgressionCreator";

export default class ProgressionCreatorFactory {
  private pixelsObject: any;
  private static progressionMap: any = {
    "Reverse Row Order": () => ReverseRowOrderProgressionCreator,
    "Row Order": RowOrderProgressionCreator,
  };

  constructor(pixelsObject: any) {
    this.pixelsObject = pixelsObject;
  }

  public getProgression(name: string, scaleLength: number = 7): ProgressionCreator {
    const progression = ProgressionCreatorFactory.progressionMap[name] || DefaultProgressionCreator;
    return new progression(this.pixelsObject, scaleLength);
  }
}
