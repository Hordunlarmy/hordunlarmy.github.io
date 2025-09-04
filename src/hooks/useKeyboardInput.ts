import { useCallback, useEffect, useState } from "react";
import { getCommandNames, getFolderNames } from "../const/commands";
import { commandHistory } from "../classes/command-history";

export const useKeyboardInput = (
  enterPress: (result: string) => void,
  clearInputs: () => void,
  isActive: boolean = true
): string => {
  const [result, setResult] = useState<string>("");
  const [cmdNames] = useState<string[]>(getCommandNames());
  const [folderNames] = useState<string[]>(getFolderNames());

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;
      event.preventDefault();

      if (event.isComposing) {
        return;
      }

      // enter press
      if (event.code === "Enter") {
        if (result.trim() !== "") {
          commandHistory.addCommand(result);
        }
        enterPress(result);
        setResult("");
        commandHistory.resetIndex();
        return;
      }

      // tab press (autocomplete)
      if (event.code === "Tab") {
        if (result === "") {
          return;
        }

        // Check if we're typing a command or a folder name
        const parts = result.split(" ");
        if (parts.length === 1) {
          // Autocomplete commands
          const filtered = [...cmdNames].filter((cmd) => cmd.startsWith(result));
          setResult((prev) => (filtered.length > 0 ? filtered[0] : prev));
        } else if (parts.length === 2 && parts[0] === "cd") {
          // Autocomplete folder names for cd command
          const folderToComplete = parts[1];
          const filtered = [...folderNames].filter((folder) => folder.startsWith(folderToComplete));
          if (filtered.length > 0) {
            setResult((prev) => `cd ${filtered[0]}`);
          }
        }
        return;
      }

      // arrow keys for command history
      if (event.code === "ArrowUp") {
        const previousCommand = commandHistory.getPreviousCommand();
        if (previousCommand !== null) {
          setResult(previousCommand);
        }
        return;
      }

      if (event.code === "ArrowDown") {
        const nextCommand = commandHistory.getNextCommand();
        if (nextCommand !== null) {
          setResult(nextCommand);
        }
        return;
      }

      // ctrl + backspace hotkey
      if (event.ctrlKey && event.code === "Backspace") {
        setResult((prev) => prev.split(" ").slice(0, -1).join(" "));
        return;
      }

      // ctrl + l hotkey
      if (event.ctrlKey && event.code === "KeyL") {
        clearInputs();
        commandHistory.clearHistory();
        return;
      }

      // regular keys
      if (event.code.startsWith("Key") || event.code.startsWith("Digit")) {
        setResult((prev) => `${prev}${event.key}`);
        return;
      }

      // "special characters"
      switch (event.code) {
        case "Backspace":
          setResult((prev) => prev.slice(0, -1));
          break;
        case "Space":
          setResult((prev) => `${prev} `);
          break;
        case "Period":
          setResult((prev) => `${prev}.`);
          break;
        case "Minus":
          if (event.shiftKey) {
            setResult((prev) => `${prev}_`);
          } else {
            setResult((prev) => `${prev}-`);
          }
          break;
        case "Slash":
          setResult((prev) => `${prev}/`);
          break;
        case "Backslash":
          setResult((prev) => `${prev}\\`);
          break;
        case "Equal":
          setResult((prev) => `${prev}=`);
          break;
        case "BracketLeft":
          setResult((prev) => `${prev}[`);
          break;
        case "BracketRight":
          setResult((prev) => `${prev}]`);
          break;
        case "Semicolon":
          setResult((prev) => `${prev};`);
          break;
        case "Quote":
          setResult((prev) => `${prev}'`);
          break;
        case "Comma":
          setResult((prev) => `${prev},`);
          break;
      }
    },
    [enterPress, result, clearInputs, cmdNames, folderNames, isActive]
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return result;
};
