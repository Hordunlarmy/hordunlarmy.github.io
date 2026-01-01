import { FC } from "react";
import { BsTerminal, BsLock } from "react-icons/bs";
import { useTimeFormat } from "../../hooks/useTimeFormat";

interface TopBarProps {
  onTerminalToggle: () => void;
  isTerminalVisible: boolean;
  onLockToggle: () => void;
  isLocked: boolean;
}

const TopBar: FC<TopBarProps> = ({ onTerminalToggle, isTerminalVisible, onLockToggle, isLocked }) => {
  const currentTime = useTimeFormat();

  return (
    <div className="w-full h-8 bg-ubuntu-black/[.90] border-b border-ubuntu-border 
      flex items-center justify-between px-4 text-ubuntu-gray text-sm font-fira-code
      select-none shadow-sm relative z-20">
      <button
        onClick={onTerminalToggle}
        className={`flex items-center justify-center w-8 h-6 rounded transition-all duration-150
          ${isTerminalVisible 
            ? 'bg-ubuntu-orange text-ubuntu-white hover:bg-ubuntu-orange-dark' 
            : 'bg-ubuntu-gray-dark text-ubuntu-gray hover:bg-ubuntu-border hover:text-ubuntu-white'
          }`}
        title={isTerminalVisible ? "Close Terminal" : "Open Terminal"}
      >
        <BsTerminal className="text-sm" />
      </button>
      
      <span className="text-ubuntu-white font-semibold absolute left-1/2 transform -translate-x-1/2">{currentTime}</span>
      
      <button
        onClick={onLockToggle}
        className={`flex items-center justify-center w-8 h-6 rounded transition-all duration-150
          ${isLocked 
            ? 'bg-ubuntu-red text-ubuntu-white hover:bg-ubuntu-red-dark' 
            : 'bg-ubuntu-gray-dark text-ubuntu-gray hover:bg-ubuntu-border hover:text-ubuntu-white'
          }`}
        title={isLocked ? "Unlock Screen" : "Lock Screen"}
      >
        <BsLock className="text-sm" />
      </button>
    </div>
  );
};

export default TopBar;
