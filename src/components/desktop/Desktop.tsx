import { FC } from "react";
import Folder from "./Folder";

interface DesktopProps {
  isTerminalVisible: boolean;
}

const Desktop: FC<DesktopProps> = ({ isTerminalVisible }) => {
  const folders = [
    { name: "Personal Project", id: "personal" },
    { name: "APIs", id: "apis" },
    { name: "Packages", id: "packages" },
    { name: "Container Services", id: "containers" }
  ];

  const handleFolderClick = (folderId: string) => {
    console.log(`Clicked folder: ${folderId}`);
    // TODO: Implement folder opening functionality
  };

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-300 ${
        isTerminalVisible ? 'opacity-30' : 'opacity-100'
      }`}
    >
      {/* Main Desktop Area with Folders */}
      <div className="h-full flex">
        {/* Left side with folders */}
        <div className="w-80 p-6">
          <div className="space-y-4">
            {folders.map((folder) => (
              <Folder 
                key={folder.id}
                name={folder.name}
                onClick={() => handleFolderClick(folder.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Right side desktop area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-ubuntu-white/30 text-xl">
            Ubuntu Desktop
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
