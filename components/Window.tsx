import React, { useRef, useEffect, useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { WindowState } from '../types';
import { CloseIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from '../assets/icons';

interface WindowProps {
  win: WindowState;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ win, children }) => {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updateWindowState,
    playSound,
  } = useSystem();

  const [animationState, setAnimationState] = useState<'opening' | 'closing' | 'minimizing'>(
    'opening'
  );

  const windowRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const isResizing = useRef(false);

  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });
  const elementStartSize = useRef({ width: 0, height: 0 });
  const resizeDirection = useRef<'r' | 'b' | 'br' | null>(null);

  const handleAnimationEnd = () => {
    if (animationState === 'closing') {
      closeWindow(win.id);
    } else if (animationState === 'minimizing') {
      minimizeWindow(win.id);
    }
  };

  const handleClose = () => {
    playSound('click');
    setAnimationState('closing');
  };

  const handleMinimize = () => {
    playSound('click');
    setAnimationState('minimizing');
  };

  const onMouseDownDrag = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    focusWindow(win.id);
    if (win.isMaximized) return;

    isDragging.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = { ...win.position };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseDownResize = (e: React.MouseEvent, direction: 'r' | 'b' | 'br') => {
    e.stopPropagation();
    focusWindow(win.id);
    if (win.isMaximized) return;

    isResizing.current = true;
    resizeDirection.current = direction;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartSize.current = { ...win.size };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      updateWindowState(win.id, {
        position: { x: elementStartPos.current.x + dx, y: elementStartPos.current.y + dy },
      });
    } else if (isResizing.current) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;

      let newWidth = win.size.width;
      let newHeight = win.size.height;

      if (resizeDirection.current?.includes('r'))
        newWidth = Math.max(300, elementStartSize.current.width + dx);
      if (resizeDirection.current?.includes('b'))
        newHeight = Math.max(200, elementStartSize.current.height + dy);

      updateWindowState(win.id, { size: { width: newWidth, height: newHeight } });
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
    isResizing.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    focusWindow(win.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const windowStyles: React.CSSProperties = win.isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100% - 3rem)',
        transition: 'all 0.2s ease-in-out',
      }
    : {
        top: win.position.y,
        left: win.position.x,
        width: win.size.width,
        height: win.size.height,
        transition: win.isMaximized ? 'all 0.2s ease-in-out' : 'none',
      };

  const animationClass =
    animationState === 'opening'
      ? 'animate-windowOpen'
      : animationState === 'closing' || animationState === 'minimizing'
        ? 'animate-windowClose'
        : '';

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col bg-gray-800/70 backdrop-blur-xl text-white rounded-lg border border-white/20 window-shadow ${animationClass}`}
      style={{ ...windowStyles, zIndex: win.zIndex }}
      onMouseDown={() => focusWindow(win.id)}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        ref={handleRef}
        className="h-8 bg-black/30 rounded-t-lg flex items-center justify-between px-2 cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDownDrag}
        onDoubleClick={() => toggleMaximizeWindow(win.id)}
      >
        <div className="font-bold text-sm truncate">{win.title}</div>
        <div className="flex items-center gap-1 window-controls">
          <button
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/30 active:bg-white/40 transition-colors"
            onClick={handleMinimize}
          >
            {MinimizeIcon}
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/30 active:bg-white/40 transition-colors"
            onClick={() => {
              playSound('click');
              toggleMaximizeWindow(win.id);
            }}
          >
            {win.isMaximized ? RestoreIcon : MaximizeIcon}
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-600 active:bg-red-700 transition-colors"
            onClick={handleClose}
          >
            {CloseIcon}
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-auto relative">{children}</div>
      {!win.isMaximized && (
        <>
          <div
            className="absolute -right-1 top-0 bottom-0 w-2 cursor-ew-resize"
            onMouseDown={(e) => onMouseDownResize(e, 'r')}
          ></div>
          <div
            className="absolute -bottom-1 left-0 right-0 h-2 cursor-ns-resize"
            onMouseDown={(e) => onMouseDownResize(e, 'b')}
          ></div>
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 cursor-nwse-resize"
            onMouseDown={(e) => onMouseDownResize(e, 'br')}
          ></div>
        </>
      )}
    </div>
  );
};

export default Window;
