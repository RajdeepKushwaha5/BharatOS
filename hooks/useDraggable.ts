
import { useState, useCallback, useRef, RefObject } from 'react';

interface DraggableOptions {
  handleRef: RefObject<HTMLElement>;
}

export const useDraggable = <T extends HTMLElement,>(
  ref: RefObject<T>,
  options: DraggableOptions
) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (options.handleRef.current && !options.handleRef.current.contains(e.target as Node)) {
      return;
    }
    e.preventDefault();
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      elementStartPos.current = { x: rect.left, y: rect.top };
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [ref, options.handleRef]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    setPosition({
      x: elementStartPos.current.x + dx,
      y: elementStartPos.current.y + dy,
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);
  
  return { position, setPosition, handleMouseDown };
};
