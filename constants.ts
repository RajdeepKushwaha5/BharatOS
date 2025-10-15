import { AppDefinition, FolderNode } from './types';
import About from './apps/About';
import FileManager from './apps/FileManager';
import TextEditor from './apps/TextEditor';
import Terminal from './apps/Terminal';
import Paint from './apps/Paint';
import TileMatchGame from './apps/TileMatchGame';
import VideoPlayer from './apps/VideoPlayer';
import {
  AboutIcon,
  FileManagerIcon,
  GameIcon,
  PaintIcon,
  TerminalIcon,
  TextEditorIcon,
  VideoPlayerIcon,
} from './assets/icons';

export const APPS: AppDefinition[] = [
  {
    id: 'about',
    name: 'About BharatOS',
    icon: AboutIcon,
    component: About,
    defaultSize: [400, 300],
  },
  {
    id: 'fileManager',
    name: 'File Explorer',
    icon: FileManagerIcon,
    component: FileManager,
    defaultSize: [700, 500],
  },
  {
    id: 'textEditor',
    name: 'Notepad',
    icon: TextEditorIcon,
    component: TextEditor,
    defaultSize: [600, 400],
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: TerminalIcon,
    component: Terminal,
    defaultSize: [650, 400],
  },
  { id: 'paint', name: 'Paint', icon: PaintIcon, component: Paint, defaultSize: [600, 450] },
  {
    id: 'tileMatch',
    name: 'Tile Match',
    icon: GameIcon,
    component: TileMatchGame,
    defaultSize: [380, 460],
  },
  {
    id: 'videoPlayer',
    name: 'Video Player',
    icon: VideoPlayerIcon,
    component: VideoPlayer,
    defaultSize: [640, 480],
  },
];

export const DESKTOP_APPS: AppDefinition[] = APPS;

export const INITIAL_FILE_SYSTEM: FolderNode = {
  name: 'C:',
  type: 'folder',
  parent: null,
  children: {
    Users: {
      name: 'Users',
      type: 'folder',
      parent: null, // Will be set dynamically
      children: {
        Guest: {
          name: 'Guest',
          type: 'folder',
          parent: null, // Will be set dynamically
          children: {
            Desktop: { name: 'Desktop', type: 'folder', parent: null, children: {} },
            Documents: {
              name: 'Documents',
              type: 'folder',
              parent: null,
              children: {
                'README.txt': {
                  name: 'README.txt',
                  type: 'file',
                  parent: null,
                  content: `Welcome to BharatOS!

This is a web-based operating system built with React, TypeScript, and Tailwind CSS.

Features:
- Window management (drag, resize, minimize, maximize)
- File Explorer with a virtual file system
- Terminal with Python support (via Pyodide)
- Notepad for text editing
- Paint for simple drawings
- A fun tile matching game
- A video player for local files

Feel free to explore and enjoy the experience!
`,
                },
              },
            },
          },
        },
      },
    },
    System: {
      name: 'System',
      type: 'folder',
      parent: null,
      children: {},
    },
  },
};
