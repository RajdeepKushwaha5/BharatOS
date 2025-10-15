import React from 'react';

export type AppID =
  | 'about'
  | 'fileManager'
  | 'textEditor'
  | 'terminal'
  | 'paint'
  | 'tileMatch'
  | 'videoPlayer';

export interface AppDefinition {
  id: AppID;
  name: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  defaultSize: [number, number];
}

export interface FileNode {
  name: string;
  type: 'file';
  parent: FolderNode | null;
  content: string;
}

export interface FolderNode {
  name: string;
  type: 'folder';
  parent: FolderNode | null;
  children: { [key: string]: FileNode | FolderNode };
}

export type FileSystemNode = FileNode | FolderNode;

export interface WindowState {
  id: number;
  appId: AppID;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  props?: any; // To pass props to app components, e.g., filePath
}

export interface Pyodide {
  runPythonAsync: (code: string) => Promise<any>;
  runPython: (code: string) => any;
  globals: any;
}

export interface ContextMenuItem {
  label: string;
  action: () => void;
  disabled?: boolean;
}
