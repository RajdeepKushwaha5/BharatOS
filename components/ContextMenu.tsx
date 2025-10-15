import React, { useEffect, useRef } from 'react';
import { useSystem } from '../context/SystemContext';

const ContextMenu: React.FC = () => {
  const { contextMenu, closeContextMenu } = useSystem();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeContextMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu, closeContextMenu]);

  if (!contextMenu) return null;

  const style: React.CSSProperties = {
    top: contextMenu.y,
    left: contextMenu.x,
    position: 'absolute',
    zIndex: 10000,
  };

  return (
    <div
      ref={menuRef}
      style={style}
      className="bg-gray-800/80 backdrop-blur-xl text-white rounded-md shadow-lg p-1 animate-fadeIn"
    >
      <ul>
        {contextMenu.items.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => {
                item.action();
                closeContextMenu();
              }}
              disabled={item.disabled}
              className="w-full text-left px-3 py-1 text-sm rounded hover:bg-primary disabled:opacity-50 disabled:hover:bg-transparent"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
