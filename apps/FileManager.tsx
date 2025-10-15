import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { FileSystemNode, FolderNode, AppID } from '../types';

const FileManager: React.FC = () => {
  const { fs, openApp, getNodeFromPath } = useSystem();
  const [currentPath, setCurrentPath] = useState('C:/Users/Guest/Desktop');

  const getCurrentNode = (): FolderNode => {
    const node = getNodeFromPath(currentPath);
    // Fix: Added type assertion for 'Guest' to correctly access children properties.
    return node && node.type === 'folder'
      ? node
      : (((fs.children['Users'] as FolderNode).children['Guest'] as FolderNode).children[
          'Desktop'
        ] as FolderNode); // Default to desktop
  };

  const currentNode = getCurrentNode();

  const getPath = (node: FileSystemNode): string => {
    let path = node.name;
    let parent = node.parent;
    while (parent) {
      path = `${parent.name}/${path}`;
      parent = parent.parent;
    }
    return path;
  };

  const navigateTo = (folderName: string) => {
    if (folderName === '..') {
      if (currentNode.parent) {
        const newPath = getPath(currentNode.parent);
        setCurrentPath(newPath);
      }
    } else {
      const childNode = currentNode.children[folderName];
      if (childNode && childNode.type === 'folder') {
        setCurrentPath(getPath(childNode));
      }
    }
  };

  const handleDoubleClick = (node: FileSystemNode) => {
    if (node.type === 'folder') {
      navigateTo(node.name);
    } else {
      const appToOpen: AppID = 'textEditor'; // Simple logic for now
      openApp(appToOpen, { filePath: getPath(node) });
    }
  };

  const getFileIcon = (node: FileSystemNode) => {
    if (node.type === 'folder') return '📁';
    if (node.name.endsWith('.txt')) return '📄';
    return '❓';
  };

  const children = currentNode ? Object.values(currentNode.children) : [];

  return (
    <div className="w-full h-full bg-gray-900 text-white flex flex-col">
      <div className="flex-shrink-0 p-2 bg-gray-800 flex items-center gap-2">
        <button
          onClick={() => navigateTo('..')}
          disabled={!currentNode.parent}
          className="px-2 py-1 rounded bg-gray-700 disabled:opacity-50"
        >
          ↑ Up
        </button>
        <div className="bg-gray-900 px-2 py-1 rounded-sm flex-grow truncate">{currentPath}</div>
      </div>
      <div className="flex-grow p-2 overflow-y-auto">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
          {children.map((node) => (
            <div
              key={node.name}
              className="flex flex-col items-center text-center p-2 rounded cursor-pointer hover:bg-white/10"
              onDoubleClick={() => handleDoubleClick(node)}
            >
              <div className="text-4xl">{getFileIcon(node)}</div>
              <span className="text-xs mt-1 break-all">{node.name}</span>
            </div>
          ))}
          {children.length === 0 && (
            <div className="col-span-full text-center text-gray-500">This folder is empty.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileManager;
