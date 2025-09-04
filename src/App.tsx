import { useState } from "react";
import Main from "./components/layout/Main";
import TerminalContainer from "./components/terminal/TerminalContainer";
import TopBar from "./components/layout/TopBar";

const App = () => {
  const [isTerminalVisible, setIsTerminalVisible] = useState<boolean>(true);

  const toggleTerminal = () => {
    setIsTerminalVisible(!isTerminalVisible);
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-ubuntu bg-cover 
        bg-center flex flex-col"
    >
      <TopBar onTerminalToggle={toggleTerminal} isTerminalVisible={isTerminalVisible} />
      <div className="flex-1 flex items-center justify-center p-6">
        <Main>
          <TerminalContainer 
            isVisible={isTerminalVisible}
            onClose={() => setIsTerminalVisible(false)}
          />
        </Main>
      </div>
    </div>
  );
};

export default App;
