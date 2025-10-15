import React, { useState, useEffect, useRef } from 'react';
import { useSystem } from '../context/SystemContext';
import { APPS } from '../constants';
import StartMenu from './StartMenu';
import { StartIcon } from '../assets/icons';

const Taskbar: React.FC = () => {
  const { windows, focusWindow, minimizeWindow, restoreWindow, playSound } = useSystem();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStartMenuOpen, setStartMenuOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleStartMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    setStartMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setStartMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getAppIcon = (appId: string) => APPS.find((app) => app.id === appId)?.icon;
  const getActiveWindowId = () => {
    const activeWindows = windows.filter((w) => !w.isMinimized);
    if (activeWindows.length === 0) return null;
    return activeWindows.reduce((prev, current) => (prev.zIndex > current.zIndex ? prev : current))
      .id;
  };
  const activeWindowId = getActiveWindowId();

  return (
    <>
      {isStartMenuOpen && (
        <StartMenu ref={startMenuRef} closeMenu={() => setStartMenuOpen(false)} />
      )}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900/70 backdrop-blur-xl flex items-center justify-between text-white z-50">
        <div className="flex items-center h-full">
          <button
            className={`h-full w-12 flex items-center justify-center transition-colors duration-150 ease-in-out hover:bg-white/30 ${isStartMenuOpen ? 'bg-white/30' : ''}`}
            onClick={toggleStartMenu}
          >
            {StartIcon}
          </button>
          {windows.map((win) => (
            <button
              key={win.id}
              className={`h-full px-3 flex items-center gap-2 text-sm transition-colors duration-150 ease-in-out hover:bg-white/30 relative ${activeWindowId === win.id && !win.isMinimized ? 'bg-white/10' : ''}`}
              onClick={() => {
                playSound('click');
                if (win.isMinimized) {
                  restoreWindow(win.id);
                  focusWindow(win.id);
                } else {
                  activeWindowId === win.id ? minimizeWindow(win.id) : focusWindow(win.id);
                }
              }}
            >
              <div className="w-5 h-5">{getAppIcon(win.appId)}</div>
              <span>{win.title}</span>
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 rounded-t-full ${activeWindowId === win.id && !win.isMinimized ? 'bg-primary' : 'bg-transparent'}`}
              />
            </button>
          ))}
        </div>
        <div className="px-4 text-sm text-center">
          <div>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div>{currentTime.toLocaleDateString()}</div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
