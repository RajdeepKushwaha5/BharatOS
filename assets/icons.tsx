import React from 'react';

const iconProps = {
  width: '32',
  height: '32',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export const AboutIcon = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);
export const FileManagerIcon = (
  <svg {...iconProps}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);
export const TextEditorIcon = (
  <svg {...iconProps}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);
export const TerminalIcon = (
  <svg {...iconProps}>
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);
export const PaintIcon = (
  <svg {...iconProps}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);
export const GameIcon = (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);
export const VideoPlayerIcon = (
  <svg {...iconProps}>
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
    <line x1="7" y1="2" x2="7" y2="22"></line>
    <line x1="17" y1="2" x2="17" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="2" y1="7" x2="7" y2="7"></line>
    <line x1="2" y1="17" x2="7" y2="17"></line>
    <line x1="17" y1="17" x2="22" y2="17"></line>
    <line x1="17" y1="7" x2="22" y2="7"></line>
  </svg>
);
export const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
export const MaximizeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
  </svg>
);
export const MinimizeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
export const RestoreIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="8" y="8" width="12" height="12" rx="2" ry="2"></rect>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
  </svg>
);
export const PythonIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3776AB">
    <path
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.55-15.354c.732 0 1.157.551 1.157 1.2v2.174c0 .539-.244.757-.595.757-.35 0-.572-.218-.572-.81V9.457h-3.15v5.822c0 2.228-1.574 3.195-3.665 3.195-1.42 0-2.58-.52-3.125-1.295-.546-.775-.68-1.78.024-2.532.572-.61 1.55-1.003 2.508-1.003.146 0 .268.024.366.024v-2.1c-.098 0-.22-.024-.366-.024-1.244 0-2.269.463-2.927 1.17-.659.707-.976 1.707-.756 2.829.414 2.17 2.317 3.365 4.805 3.365 3.146 0 5.244-1.634 5.244-4.829v-5.92h-1.634zM8.45 8.646c.732 0 1.157.551 1.157 1.2v2.174c0 .539-.244.757-.595.757-.35 0-.572-.218-.572-.81V9.457H5.29v5.822c0 2.228-1.574 3.195-3.665 3.195-1.42 0-2.58-.52-3.125-1.295-.546-.775-.68-1.78.024-2.532.572-.61 1.55-1.003 2.508-1.003.146 0 .268.024.366.024v-2.1c-.098 0-.22-.024-.366-.024-1.244 0-2.269.463-2.927 1.17-.659.707-.976 1.707-.756 2.829.414 2.17 2.317 3.365 4.805 3.365 3.146 0 5.244-1.634 5.244-4.829v-5.92H8.45z"
      transform="translate(4.756 3.293) scale(.7)"
    />
  </svg>
);
export const StartIcon = (
  <svg width="24" height="24" viewBox="0 0 50 50" fill="white">
    <path d="M 5.09375 5 C 4.542969 5 4 5.542969 4 6.09375 L 4 21.90625 C 4 22.457031 4.542969 23 5.09375 23 L 21.90625 23 C 22.457031 23 23 22.457031 23 21.90625 L 23 6.09375 C 23 5.542969 22.457031 5 21.90625 5 Z M 27 5 C 26.449219 5 26 5.542969 26 6.09375 L 26 13.90625 C 26 14.457031 26.449219 15 27 15 L 44.90625 15 C 45.457031 15 46 14.457031 46 13.90625 L 46 6.09375 C 46 5.542969 45.457031 5 44.90625 5 Z M 5.09375 27 C 4.542969 27 4 27.542969 4 28.09375 L 4 44.90625 C 4 45.457031 4.542969 46 5.09375 46 L 21.90625 46 C 22.457031 46 23 45.457031 23 44.90625 L 23 28.09375 C 23 27.542969 22.457031 27 21.90625 27 Z M 27 35 C 26.449219 35 26 35.542969 26 36.09375 L 26 44.90625 C 26 45.457031 26.449219 46 27 46 L 44.90625 46 C 45.457031 46 46 45.457031 46 44.90625 L 46 36.09375 C 46 35.542969 45.457031 35 44.90625 35 Z" />
  </svg>
);
