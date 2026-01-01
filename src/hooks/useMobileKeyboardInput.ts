import { useCallback, useState } from "react";
import { getCommandNames, getFolderNames } from "../const/commands";
import { commandHistory } from "../classes/command-history";

export const useMobileKeyboardInput = (
  enterPress: (result: string) => void,
  clearInputs: () => void,
  isActive: boolean = true
): { 
  inputValue: string; 
  setInputValue: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} => {
  const [inputValue, setInputValue] = useState<string>("");
  const [cmdNames] = useState<string[]>(getCommandNames());
  const [folderNames] = useState<string[]>(getFolderNames());

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isActive) return;

      // Handle Enter key
      if (e.key === "Enter") {
        e.preventDefault();
        if (inputValue.trim() !== "") {
          commandHistory.addCommand(inputValue);
        }
        enterPress(inputValue);
        setInputValue("");
        commandHistory.resetIndex();
        return;
      }

      // Handle Tab key (autocomplete)
      if (e.key === "Tab") {
        e.preventDefault();
        if (inputValue === "") {
          return;
        }

        // Check if we're typing a command or a folder name
        const parts = inputValue.split(" ");
        if (parts.length === 1) {
          // Autocomplete commands
          const filtered = [...cmdNames].filter((cmd) => cmd.startsWith(inputValue));
          setInputValue(filtered.length > 0 ? filtered[0] : inputValue);
        } else if (parts.length === 2 && parts[0] === "cd") {
          // Autocomplete folder names for cd command
          const folderToComplete = parts[1];
          const filtered = [...folderNames].filter((folder) => folder.startsWith(folderToComplete));
          if (filtered.length > 0) {
            setInputValue(`cd ${filtered[0]}`);
          }
        }
        return;
      }

      // Handle arrow keys for command history
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const previousCommand = commandHistory.getPreviousCommand();
        if (previousCommand !== null) {
          setInputValue(previousCommand);
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextCommand = commandHistory.getNextCommand();
        if (nextCommand !== null) {
          setInputValue(nextCommand);
        }
        return;
      }

      // Handle Ctrl+Backspace
      if (e.ctrlKey && e.key === "Backspace") {
        e.preventDefault();
        setInputValue((prev) => prev.split(" ").slice(0, -1).join(" "));
        return;
      }

      // Handle Ctrl+L
      if (e.ctrlKey && e.key === "l") {
        e.preventDefault();
        clearInputs();
        commandHistory.clearHistory();
        setInputValue("");
        return;
      }
    },
    [enterPress, inputValue, clearInputs, cmdNames, folderNames, isActive]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  return {
    inputValue,
    setInputValue,
    handleKeyDown,
    handleInputChange
  };
};
