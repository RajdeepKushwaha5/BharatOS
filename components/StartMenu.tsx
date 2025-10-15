import React, { forwardRef } from 'react';
import { useSystem } from '../context/SystemContext';
import { APPS } from '../constants';
import { AppID } from '../types';

interface StartMenuProps {
  closeMenu: () => void;
}

const StartMenu = forwardRef<HTMLDivElement, StartMenuProps>(({ closeMenu }, ref) => {
  const { openApp, playSound } = useSystem();

  const handleAppClick = (appId: AppID) => {
    playSound('click');
    openApp(appId);
    closeMenu();
  };

  return (
    <div
      ref={ref}
      className="absolute bottom-12 left-0 w-80 h-[500px] bg-gray-800/80 backdrop-blur-xl rounded-tr-lg p-2 flex flex-col z-50 animate-fadeIn"
      style={{ animationDuration: '150ms' }}
    >
      <h2 className="text-white text-xl p-2 font-semibold">BharatOS</h2>
      <div className="flex-grow overflow-y-auto mt-2 pr-2">
        {APPS.map((app) => (
          <button
            key={app.id}
            className="w-full flex items-center gap-3 p-2 text-white rounded hover:bg-white/20 text-left"
            onClick={() => handleAppClick(app.id)}
          >
            <div className="w-8 h-8 flex-shrink-0">{app.icon}</div>
            <span>{app.name}</span>
          </button>
        ))}
      </div>
      <div className="border-t border-white/20 mt-2 pt-2 text-white">
        {/* Power Controls could go here */}
      </div>
    </div>
  );
});

export default StartMenu;
