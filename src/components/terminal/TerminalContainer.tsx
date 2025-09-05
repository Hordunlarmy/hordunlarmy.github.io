import { useKeyboardInput } from "../../hooks/useKeyboardInput";
import { useMobileKeyboardInput } from "../../hooks/useMobileKeyboardInput";
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
  const mobileInputRef = useRef<HTMLInputElement>(null);
  
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

  // Use different keyboard input hooks for mobile and desktop
  const desktopPromptText = useKeyboardInput(handleEnterPress, () => {
    setPrompts([new PromptSession()]);
    setIsMotdVisible(false);
    setCurrentPath(directoryState.getCurrentPath());
  }, !isLocked && !isMobile);

  const mobileKeyboard = useMobileKeyboardInput(handleEnterPress, () => {
    setPrompts([new PromptSession()]);
    setIsMotdVisible(false);
    setCurrentPath(directoryState.getCurrentPath());
  }, !isLocked && isMobile);

  const promptText = isMobile ? mobileKeyboard.inputValue : desktopPromptText;

  useEffect(
    () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
    [prompts, promptText]
  );

  // Focus terminal when it becomes visible
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        if (isMobile && mobileInputRef.current) {
          mobileInputRef.current.focus();
        } else {
          const terminalElement = document.querySelector('section[tabindex="0"]') as HTMLElement;
          if (terminalElement) {
            terminalElement.focus();
          }
        }
      }, 100);
    }
  }, [isVisible, isMobile]);

  // Mobile input handlers are now handled by the mobile keyboard hook


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
        mx-auto ${isMobile ? 'max-w-[95vw] h-[85vh] max-h-[85vh]' : ''}`}
      style={{ 
        position: 'relative',
        transform: isMobile ? 'none' : `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'default',
        marginTop: isMobile ? '2vh' : '10vh',
        marginLeft: isMobile ? '2.5vw' : 'auto',
        marginRight: isMobile ? '2.5vw' : 'auto'
      }}
      onMouseDown={handleMouseDown}
      tabIndex={0}
      onTouchStart={() => {
        // Focus the mobile input when touched on mobile
        if (isMobile && mobileInputRef.current) {
          setTimeout(() => {
            mobileInputRef.current?.focus();
            // Ensure the input is visible to the virtual keyboard
            mobileInputRef.current?.click();
          }, 100);
        }
      }}
    >
      <TerminalTitle
        closeTerminal={onClose}
        username={username}
      />

      <div
        className={`px-4 py-3 text-ubuntu-gray text-sm w-full flex-1 min-h-0
          overflow-y-auto terminal-scrollbar
          ${isMobile ? 'overflow-x-hidden' : ''}`}
      >
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

      {/* Hidden mobile input for virtual keyboard */}
      {isMobile && (
        <input
          ref={mobileInputRef}
          type="text"
          className="absolute opacity-0 pointer-events-auto w-full h-full top-0 left-0 z-10"
          value={mobileKeyboard.inputValue}
          onChange={mobileKeyboard.handleInputChange}
          onKeyDown={mobileKeyboard.handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            zIndex: 10,
            pointerEvents: 'auto'
          }}
        />
      )}
    </section>
  );
};

export default TerminalContainer;
