import React, { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react';
import { AppID, WindowState, FolderNode, FileSystemNode, ContextMenuItem } from '../types';
import { APPS, INITIAL_FILE_SYSTEM } from '../constants';

interface SystemContextType {
  windows: WindowState[];
  openApp: (appId: AppID, props?: any) => void;
  closeWindow: (id: number) => void;
  focusWindow: (id: number) => void;
  minimizeWindow: (id: number) => void;
  restoreWindow: (id: number) => void;
  toggleMaximizeWindow: (id: number) => void;
  updateWindowState: (id: number, updates: Partial<WindowState>) => void;
  fs: FolderNode;
  updateFileContent: (path: string, content: string) => void;
  getNodeFromPath: (path: string) => FileSystemNode | null;
  playSound: (sound: 'click' | 'startup' | 'shutdown') => void;
  contextMenu: {
    x: number;
    y: number;
    items: ContextMenuItem[];
  } | null;
  openContextMenu: (x: number, y: number, items: ContextMenuItem[]) => void;
  closeContextMenu: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

const setupFileSystemParents = (node: FileSystemNode, parent: FolderNode | null) => {
  node.parent = parent;
  if (node.type === 'folder') {
    Object.values(node.children).forEach((child) => setupFileSystemParents(child, node));
  }
};
setupFileSystemParents(INITIAL_FILE_SYSTEM, null);

export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [fs, setFs] = useState<FolderNode>(INITIAL_FILE_SYSTEM);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    items: ContextMenuItem[];
  } | null>(null);
  const nextWindowId = useRef(0);
  const maxZIndex = useRef(10);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playSound = useCallback((sound: 'click' | 'startup' | 'shutdown') => {
    if (
      typeof window.AudioContext === 'undefined' &&
      typeof (window as any).webkitAudioContext === 'undefined'
    )
      return;
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    switch (sound) {
      case 'click':
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
        break;
    }

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }, []);

  const openApp = useCallback(
    (appId: AppID, props?: any) => {
      playSound('click');
      const appDef = APPS.find((app) => app.id === appId);
      if (!appDef) return;

      const newWindow: WindowState = {
        id: nextWindowId.current++,
        appId,
        title: appDef.name,
        position: {
          x: 50 + (nextWindowId.current % 10) * 20,
          y: 50 + (nextWindowId.current % 10) * 20,
        },
        size: { width: appDef.defaultSize[0], height: appDef.defaultSize[1] },
        isMinimized: false,
        isMaximized: false,
        zIndex: ++maxZIndex.current,
        props,
      };

      setWindows((prev) => [...prev, newWindow]);
    },
    [playSound]
  );

  const closeWindow = useCallback((id: number) => {
    setWindows((prev) => prev.filter((win) => win.id !== id));
  }, []);

  const focusWindow = useCallback(
    (id: number) => {
      if (windows.find((w) => w.id === id)?.zIndex === maxZIndex.current) return;

      maxZIndex.current++;
      setWindows((prev) =>
        prev.map((win) =>
          win.id === id ? { ...win, zIndex: maxZIndex.current, isMinimized: false } : win
        )
      );
    },
    [windows]
  );

  const minimizeWindow = useCallback((id: number) => {
    setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win)));
  }, []);

  const restoreWindow = useCallback(
    (id: number) => {
      setWindows((prev) =>
        prev.map((win) => (win.id === id ? { ...win, isMinimized: false } : win))
      );
      focusWindow(id);
    },
    [focusWindow]
  );

  const toggleMaximizeWindow = useCallback((id: number) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isMaximized: !win.isMaximized } : win))
    );
  }, []);

  const updateWindowState = useCallback((id: number, updates: Partial<WindowState>) => {
    setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, ...updates } : win)));
  }, []);

  const getNodeFromPath = useCallback(
    (path: string): FileSystemNode | null => {
      const parts = path.split('/').filter((p) => p && p !== 'C:');
      let currentNode: FileSystemNode = fs;
      for (const part of parts) {
        if (currentNode.type === 'folder' && currentNode.children[part]) {
          currentNode = currentNode.children[part];
        } else {
          return null;
        }
      }
      return currentNode;
    },
    [fs]
  );

  const updateFileContent = useCallback(
    (path: string, content: string) => {
      const newFs = JSON.parse(JSON.stringify(fs));
      const parts = path.split('/').filter((p) => p && p !== 'C:');
      let current: any = newFs;
      for (const part of parts.slice(0, -1)) {
        current = current.children[part];
      }
      const fileName = parts[parts.length - 1];
      if (current && current.children[fileName] && current.children[fileName].type === 'file') {
        current.children[fileName].content = content;
        setupFileSystemParents(newFs, null);
        setFs(newFs);
      }
    },
    [fs]
  );

  const openContextMenu = useCallback((x: number, y: number, items: ContextMenuItem[]) => {
    setContextMenu({ x, y, items });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const value = {
    windows,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    toggleMaximizeWindow,
    updateWindowState,
    fs,
    updateFileContent,
    getNodeFromPath,
    playSound,
    contextMenu,
    openContextMenu,
    closeContextMenu,
  };

  return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
