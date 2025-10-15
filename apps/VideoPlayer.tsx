import React, { useState, useRef } from 'react';
import { useSystem } from '../context/SystemContext';

const VideoPlayer: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { playSound } = useSystem();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const handleSelectFile = () => {
    playSound('click');
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      {videoSrc ? (
        <video src={videoSrc} controls autoPlay className="max-w-full max-h-full" />
      ) : (
        <div className="text-center text-white">
          <h2 className="text-xl mb-4">No video selected</h2>
          <button onClick={handleSelectFile} className="px-4 py-2 bg-primary rounded">
            Select Video File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
