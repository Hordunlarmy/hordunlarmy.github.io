import { FC, useState, useEffect, useRef } from "react";
import { BsLock, BsUnlock } from "react-icons/bs";
import { useTimeFormat } from "../../hooks/useTimeFormat";

interface LockScreenProps {
  isVisible: boolean;
  onUnlock: () => void;
}

const LockScreen: FC<LockScreenProps> = ({ isVisible, onUnlock }) => {
  const [name, setName] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentTime = useTimeFormat();

  const handleUnlock = async () => {
    if (name.trim() === "") return;
    
    setIsUnlocking(true);
    
    // Simulate unlock process - any name works
    setTimeout(() => {
      setIsUnlocking(false);
      setName("");
      onUnlock();
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  useEffect(() => {
    if (isVisible) {
      setName("");
      setIsUnlocking(false);
      // Focus the input when lock screen becomes visible
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-ubuntu-black/[.95] backdrop-blur-sm z-50 
      flex items-center justify-center">
      <div className="bg-ubuntu-gray-dark/[.98] border border-ubuntu-border 
        rounded-lg p-8 w-96 max-w-[90vw] shadow-2xl">
        
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-ubuntu-red rounded-full flex items-center justify-center">
            <BsLock className="text-2xl text-ubuntu-white" />
          </div>
        </div>

        {/* Time Display */}
        <div className="text-center mb-6">
          <h2 className="text-ubuntu-white text-2xl font-bold font-fira-code mb-2">
            {currentTime}
          </h2>
          <p className="text-ubuntu-gray text-sm">System Locked</p>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your name to unlock"
            className="w-full px-4 py-3 bg-ubuntu-black border border-ubuntu-border 
              rounded-md text-ubuntu-white placeholder-ubuntu-gray 
              focus:outline-none focus:border-ubuntu-orange transition-colors
              font-fira-code text-sm"
            autoFocus
            disabled={isUnlocking}
          />
        </div>

        {/* Unlock Button */}
        <button
          onClick={handleUnlock}
          disabled={name.trim() === "" || isUnlocking}
          className="w-full py-3 bg-ubuntu-orange hover:bg-ubuntu-orange-dark 
            disabled:bg-ubuntu-gray-dark disabled:text-ubuntu-gray
            text-ubuntu-white font-semibold rounded-md transition-all duration-150
            flex items-center justify-center gap-2 font-fira-code"
        >
          {isUnlocking ? (
            <>
              <div className="w-4 h-4 border-2 border-ubuntu-white border-t-transparent rounded-full animate-spin" />
              Unlocking...
            </>
          ) : (
            <>
              <BsUnlock className="text-sm" />
              Unlock
            </>
          )}
        </button>

        {/* Hint */}
        <p className="text-center text-ubuntu-gray text-xs mt-4">
          Press Enter or click Unlock to continue
        </p>
        <p className="text-center text-ubuntu-gray text-xs mt-2 opacity-60">
          Enter your name to unlock
        </p>
      </div>
    </div>
  );
};

export default LockScreen;
