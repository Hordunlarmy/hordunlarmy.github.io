import { useState } from "react";
import Main from "./components/layout/Main";
import TerminalContainer from "./components/terminal/TerminalContainer";
import TopBar from "./components/layout/TopBar";
import LockScreen from "./components/layout/LockScreen";

const App = () => {
  const [isTerminalVisible, setIsTerminalVisible] = useState<boolean>(true);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const toggleTerminal = () => {
    setIsTerminalVisible(!isTerminalVisible);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const handleUnlock = () => {
    setIsLocked(false);
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-ubuntu bg-cover 
        bg-center flex flex-col"
    >
      <TopBar 
        onTerminalToggle={toggleTerminal} 
        isTerminalVisible={isTerminalVisible}
        onLockToggle={toggleLock}
        isLocked={isLocked}
      />
      <div className="flex-1 flex items-center justify-center p-6">
        <Main>
          <TerminalContainer 
            isVisible={isTerminalVisible}
            onClose={() => setIsTerminalVisible(false)}
          />
        </Main>
      </div>
      <LockScreen 
        isVisible={isLocked}
        onUnlock={handleUnlock}
      />
    </div>
  );
};

export default App;
