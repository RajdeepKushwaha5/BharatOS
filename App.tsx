import React from 'react';
import { SystemProvider } from './context/SystemContext';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import ContextMenu from './components/ContextMenu';

const App: React.FC = () => {
  // The app background image is served from the `public/` folder.
  // Place your wallpapers in `public/wallpapers/` (e.g. `public/wallpapers/max.jpg`).
  // They will be available at runtime under `/wallpapers/<filename>`.
  const wallpaperUrl = '/wallpapers/max.jpg';

  return (
    <SystemProvider>
      <div
        className="w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaperUrl})` }}
      >
        <Desktop />
        <Taskbar />
        <ContextMenu />
      </div>
    </SystemProvider>
  );
};

export default App;
