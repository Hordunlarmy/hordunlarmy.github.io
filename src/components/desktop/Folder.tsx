import { FC, useState } from "react";

interface FolderProps {
  name: string;
  onClick?: () => void;
}

const Folder: FC<FolderProps> = ({ name, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onClick?.();
  };

  const getFolderIcon = () => {
    const getFolderStyle = () => {
      if (isSelected) {
        return {
          bg: 'bg-gradient-to-br from-blue-500 to-purple-600',
          shadow: 'shadow-blue-500/30',
          border: 'border-blue-400/50'
        };
      } else if (isHovered) {
        return {
          bg: 'bg-gradient-to-br from-gray-600 to-gray-700',
          shadow: 'shadow-gray-500/30',
          border: 'border-gray-400/50'
        };
      } else {
        return {
          bg: 'bg-gradient-to-br from-gray-700 to-gray-800',
          shadow: 'shadow-gray-600/20',
          border: 'border-gray-500/30'
        };
      }
    };

    const style = getFolderStyle();
    
    return (
      <div className={`w-20 h-16 ${style.bg} ${style.border} border-2 rounded-2xl relative transition-all duration-300 shadow-lg ${style.shadow} hover:shadow-xl hover:scale-105 group-hover:scale-105`}>
        {/* Folder tab */}
        <div className={`absolute -top-3 left-4 w-10 h-5 ${style.bg} ${style.border} border-2 border-b-0 rounded-t-2xl`}></div>
        
        {/* Modern folder content - sleek lines */}
        <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
          <div className="h-0.5 bg-white/40 rounded-full"></div>
          <div className="h-0.5 bg-white/30 rounded-full w-4/5"></div>
          <div className="h-0.5 bg-white/20 rounded-full w-3/5"></div>
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
        
        {/* Subtle inner glow */}
        <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer select-none p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="mb-3">
        {getFolderIcon()}
      </div>
      
      <span 
        className={`text-sm text-center transition-colors duration-300 font-medium ${
          isSelected 
            ? 'text-blue-300' 
            : isHovered 
              ? 'text-gray-200' 
              : 'text-gray-300 group-hover:text-white'
        }`}
      >
        {name}
      </span>
    </div>
  );
};

export default Folder;
