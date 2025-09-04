import { FC, useState, useCallback } from "react";
import { getCommandNames } from "../../const/commands";
import { directoryState } from "../../classes/directory-state";

interface PromptProps {
  text: string;
  showCursor: boolean;
  username: string;
  currentPath: string;
}

const Prompt: FC<PromptProps> = (props) => {
  const [cmdNames] = useState<string[]>(getCommandNames());

  const formatText = (text: string): string => {
    if (text === "") return "";
    
    const split = text.split(" ");

    if (cmdNames.includes(split[0])) {
      split[0] = `<span class="text-ubuntu-green">${split[0]}</span>`;
    }

    const autocompleteText = getAutoCompleteText(text.trim());
    if (autocompleteText) {
      split[0] = `${split[0]}<span class="text-ubuntu-gray/[.6]">${autocompleteText}</span>`;
    }

    return split.join("&nbsp;");
  };

  const getAutoCompleteText = useCallback(
    (text: string): string => {
      if (text === "") {
        return "";
      }

      const filtered = [...cmdNames].filter((cmd) => cmd.startsWith(text));
      if (text === filtered[0]) {
        return "";
      }

      return filtered.length > 0 ? filtered[0].slice(text.length) : "";
    },
    [cmdNames]
  );

  return (
    <div className="flex items-center gap-2 text-sm font-fira-code">
      <div className="flex items-center gap-1">
        <span className="text-ubuntu-green font-semibold">{props.username}</span>
        <span className="text-ubuntu-gray">@</span>
        <span className="text-ubuntu-blue font-semibold">horduntech</span>
        <span className="text-ubuntu-gray">:</span>
        <span className="text-ubuntu-yellow font-medium">{props.currentPath}</span>
        <span className="text-ubuntu-gray">$</span>
      </div>
      
      <div className="flex-1 flex items-center">
        <span
          className="text-ubuntu-white"
          dangerouslySetInnerHTML={{
            __html: formatText(props.text),
          }}
        />
        {props.showCursor && (
          <span className="text-ubuntu-white animate-blink">|</span>
        )}
      </div>
    </div>
  );
};

export default Prompt;
