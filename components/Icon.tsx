import React from 'react';

interface IconProps {
  icon: React.ReactNode;
  name: string;
  onDoubleClick: () => void;
}

const Icon: React.FC<IconProps> = ({ icon, name, onDoubleClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center w-24 h-24 p-2 cursor-pointer rounded hover:bg-white/20"
      onDoubleClick={onDoubleClick}
    >
      <div className="w-10 h-10 text-white">{icon}</div>
      <span className="text-white text-xs mt-1 drop-shadow-lg">{name}</span>
    </div>
  );
};

export default Icon;
