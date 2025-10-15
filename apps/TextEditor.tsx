import React, { useState, useEffect, useCallback } from 'react';
import { useSystem } from '../context/SystemContext';
import { FolderNode, FileNode } from '../types';

interface TextEditorProps {
  filePath?: string;
  // Fix: Changed windowId from string to number to match the type in WindowState.
  windowId: number;
}

const TextEditor: React.FC<TextEditorProps> = ({ filePath, windowId }) => {
  const { fs, updateFileContent, updateWindowState, playSound } = useSystem();
  const [content, setContent] = useState('');
  const [isDirty, setDirty] = useState(false);

  const getFile = useCallback((): FileNode | null => {
    if (!filePath) return null;
    const parts = filePath.split('/').filter((p) => p);
    let currentNode: any = fs;
    for (const part of parts) {
      currentNode = currentNode.children?.[part];
      if (!currentNode) return null;
    }
    return currentNode.type === 'file' ? currentNode : null;
  }, [fs, filePath]);

  useEffect(() => {
    const file = getFile();
    if (file) {
      setContent(file.content);
    } else {
      setContent('');
    }
  }, [filePath, getFile]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (!isDirty) {
      setDirty(true);
      const file = getFile();
      if (file) {
        updateWindowState(windowId, { title: `${file.name}*` });
      }
    }
  };

  const handleSave = () => {
    if (filePath) {
      playSound('click');
      updateFileContent(filePath, content);
      setDirty(false);
      const file = getFile();
      if (file) {
        updateWindowState(windowId, { title: file.name });
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-800">
      <div className="flex-shrink-0 p-1 bg-gray-700">
        <button
          onClick={handleSave}
          disabled={!filePath}
          className="px-3 py-1 text-sm rounded bg-primary text-white disabled:opacity-50"
        >
          Save
        </button>
      </div>
      <textarea
        value={content}
        onChange={handleContentChange}
        className="w-full h-full flex-grow p-2 bg-gray-900 text-white font-mono focus:outline-none resize-none"
        placeholder="Start typing..."
      />
    </div>
  );
};

export default TextEditor;
