import { useKeyboardInput } from "../../hooks/useKeyboardInput";
import { useEffect, useRef, useState } from "react";
import Prompt from "./Prompt";
import TerminalTitle from "./TerminalTitle";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";
import PromptSession from "../../classes/prompt-session";
import ResultDiv from "./ResultDiv";
import { motdText } from "../../const/commands";
import { useIsMobile } from "../../hooks/useIsMobile";
import { commandHistory } from "../../classes/command-history";
import { directoryState } from "../../classes/directory-state";

interface TerminalContainerProps {
  isVisible: boolean;
  onClose: () => void;
  isLocked: boolean;
  username: string;
}

const TerminalContainer: React.FC<TerminalContainerProps> = ({ isVisible, onClose, isLocked, username }) => {
  const isMobile = useIsMobile();

  const [isMotdVisible, setIsMotdVisible] = useState<boolean>(true);
  const [currentPath, setCurrentPath] = useState<string>(directoryState.getCurrentPath());
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const terminalClasses = isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0";
  const bottomRef = useRef<HTMLDivElement>(null);
  useScrollToBottom(bottomRef.current);

  const [prompts, setPrompts] = useState<PromptSession[]>([
    new PromptSession(),
  ]);

  const handleEnterPress = () => {
    if (promptText.trim().toLowerCase().split(" ")[0] === "clear") {
      setPrompts([new PromptSession()]);
      setIsMotdVisible(false);
      commandHistory.clearHistory();
      setCurrentPath(directoryState.getCurrentPath());
      return;
    }

    setPrompts((prev) => {
      // Execute the command first (this may change the directory)
      prev[prev.length - 1].handleEnterClick(promptText, username);
      
      // After command execution, update the current path for the NEXT prompt
      setCurrentPath(directoryState.getCurrentPath());
      
      return [...prev, new PromptSession()];
    });
  };

  const promptText = useKeyboardInput(handleEnterPress, () => {
    setPrompts([new PromptSession()]);
    setIsMotdVisible(false);
    setCurrentPath(directoryState.getCurrentPath());
  }, !isLocked);

  useEffect(
    () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
    [prompts, promptText]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.terminal-title')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <section
      className={`rounded-md w-full max-w-5xl max-h-[75vh] h-[65vh] bg-ubuntu-gray-dark/[.96] 
        border border-solid border-ubuntu-border font-fira-code 
        text-sm shadow-terminal flex flex-col overflow-hidden 
        resize ${terminalClasses} transition-all duration-100
        mx-auto`}
      style={{ 
        position: 'relative',
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'default',
        marginTop: '10vh'
      }}
      onMouseDown={handleMouseDown}
    >
      <TerminalTitle
        closeTerminal={onClose}
        username={username}
      />

      <div
        className="px-4 py-3 text-ubuntu-gray text-sm w-full flex-1 min-h-0
          overflow-y-auto terminal-scrollbar"
      >
        {isMobile && (
          <ResultDiv
            text={`<span class="text-ubuntu-red-dark">Err: This site does not work on devices without a physical keyboard.</span>`}
          />
        )}
        {isMotdVisible && <ResultDiv text={motdText()} />}

        {prompts.map((prompt) => {
          return (
            <div key={`prompt-${Math.random()}`}>
              <Prompt
                text={prompt.enterPressed ? prompt.promptText : promptText}
                showCursor={prompt.showCursor}
                username={username}
                currentPath={prompt.enterPressed ? prompt.currentPath : currentPath}
              />

              {prompt.result !== undefined && (
                <ResultDiv text={prompt.result} />
              )}
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </section>
  );
};

export default TerminalContainer;
