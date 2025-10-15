import React, { useState, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const BOARD_SIZE = 16;

const generateBoard = () => {
  const cards = [...EMOJIS, ...EMOJIS];
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards.map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
};

const TileMatchGame: React.FC = () => {
  const { playSound } = useSystem();
  const [board, setBoard] = useState(generateBoard());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const resetGame = () => {
    playSound('click');
    setBoard(generateBoard());
    setFlippedIndices([]);
    setMoves(0);
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (board[firstIndex].emoji === board[secondIndex].emoji) {
        // Match
        setBoard((prev) =>
          prev.map((card, index) =>
            index === firstIndex || index === secondIndex ? { ...card, isMatched: true } : card
          )
        );
        setFlippedIndices([]);
      } else {
        // No match
        setTimeout(() => {
          setBoard((prev) =>
            prev.map((card, index) =>
              index === firstIndex || index === secondIndex ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices, board]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length >= 2 || board[index].isFlipped || board[index].isMatched) return;

    playSound('click');
    setBoard((prev) => prev.map((card, i) => (i === index ? { ...card, isFlipped: true } : card)));
    setFlippedIndices((prev) => [...prev, index]);
    setMoves((prev) => prev + 1);
  };

  const isGameWon = board.every((card) => card.isMatched);

  return (
    <div className="w-full h-full bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-2">Tile Match</h1>
      <div className="flex justify-between w-full mb-4">
        <div className="text-lg">Moves: {Math.floor(moves / 2)}</div>
        <button onClick={resetGame} className="px-3 py-1 bg-primary rounded">
          Reset
        </button>
      </div>
      {isGameWon ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold">You Won!</h2>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {board.map((card, index) => (
            <div
              key={card.id}
              className={`w-20 h-20 rounded-lg flex items-center justify-center text-4xl cursor-pointer transition-transform duration-300 ${card.isFlipped || card.isMatched ? 'bg-blue-500' : 'bg-gray-700'}`}
              style={{
                transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
              }}
              onClick={() => handleCardClick(index)}
            >
              <div style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                {card.isFlipped || card.isMatched ? card.emoji : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TileMatchGame;
