import ProgressionCreator from "./ProgressionCreator";

export default class DefaultProgressionCreator extends ProgressionCreator {
  public getProgressions(): string[] {
    return this.pixelRows.map((row) => row.map((v, i) => this.numeralise(i + 1)).join(" "));
  }
}
