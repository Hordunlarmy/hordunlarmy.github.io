import { getCommandByName } from "../const/commands";
import { directoryState } from "./directory-state";

export default class PromptSession {
  public promptText: string;
  public showCursor: boolean;
  public enterPressed: boolean;
  public result: string | undefined;
  public currentPath: string;

  public constructor() {
    this.promptText = "";
    this.showCursor = true;
    this.enterPressed = false;
    this.currentPath = directoryState.getCurrentPath();
  }

  public handleEnterClick(text: string, username: string = "user"): void {
    this.enterPressed = true;
    this.promptText = text;
    this.showCursor = false;

    if (this.promptText.trim() !== "") {
      this.result = getCommandByName(this.promptText, username);
      // Keep the original path where the command was executed
      // Don't update this.currentPath here
    }
  }
}
