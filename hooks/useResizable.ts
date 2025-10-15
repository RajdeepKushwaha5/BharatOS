
import { useState, useCallback, useRef } from 'react';

type ResizeDirection = 'right' | 'bottom' | 'corner';

export const useResizable = (initialSize: { width: number, height: number }) => {
  const [size, setSize] = useState(initialSize);
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const elementStartSize = useRef({ width: 0, height: 0 });
  const activeDirection = useRef<ResizeDirection | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, direction: ResizeDirection) => {
    e.preventDefault();
    e.stopPropagation();
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartSize.current = { ...size };
    activeDirection.current = direction;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [size]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!activeDirection.current) return;
    const dx = e.clientX - resizeStartPos.current.x;
    const dy = e.clientY - resizeStartPos.current.y;

    setSize(prevSize => {
      let newWidth = prevSize.width;
      let newHeight = prevSize.height;

      if (activeDirection.current === 'right' || activeDirection.current === 'corner') {
        newWidth = Math.max(200, elementStartSize.current.width + dx);
      }
      if (activeDirection.current === 'bottom' || activeDirection.current === 'corner') {
        newHeight = Math.max(150, elementStartSize.current.height + dy);
      }
      return { width: newWidth, height: newHeight };
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    activeDirection.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);
  
  return { size, setSize, handleMouseDown };
};
