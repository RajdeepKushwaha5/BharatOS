import React from 'react';
import { StartIcon } from '../assets/icons'; // Using StartIcon as a placeholder logo

const About: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 mb-4 text-primary">
        {/* Fix: Render StartIcon as a JSX element */}
        {StartIcon}
      </div>
      <h1 className="text-2xl font-bold">BharatOS</h1>
      <p className="text-gray-400">Version 1.0</p>
      <p className="mt-4 max-w-sm">
        A web-based desktop environment built with modern web technologies.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Created with React, TypeScript, and Tailwind CSS.
      </p>
    </div>
  );
};

export default About;
