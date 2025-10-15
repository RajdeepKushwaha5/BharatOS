import React from 'react';
import { useSystem } from '../context/SystemContext';
import { APPS, DESKTOP_APPS } from '../constants';
import Icon from './Icon';
import Window from './Window';
import { ContextMenuItem } from '../types';

const Desktop: React.FC = () => {
  const { windows, openApp, openContextMenu } = useSystem();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuItems: ContextMenuItem[] = [
      { label: 'Refresh', action: () => console.log('Refresh') },
      { label: 'New Folder', action: () => alert('Not implemented'), disabled: true },
    ];
    openContextMenu(e.clientX, e.clientY, menuItems);
  };

  return (
    <div className="w-full h-full" onContextMenu={handleContextMenu}>
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {DESKTOP_APPS.map((app) => (
          <Icon
            key={app.id}
            icon={app.icon}
            name={app.name}
            onDoubleClick={() => openApp(app.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows
        .filter((win) => !win.isMinimized)
        .map((win) => {
          const App = APPS.find((app) => app.id === win.appId)?.component;
          if (!App) return null;

          return (
            <Window key={win.id} win={win}>
              <App {...win.props} windowId={win.id} />
            </Window>
          );
        })}
    </div>
  );
};

export default Desktop;
