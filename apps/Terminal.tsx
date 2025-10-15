import React, { useState, useEffect, useRef } from 'react';
import { Pyodide } from '../types';
import { PythonIcon } from '../assets/icons';

declare global {
  interface Window {
    loadPyodide: (config: any) => Promise<Pyodide>;
  }
}

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'info';
  text: string;
}

const Terminal: React.FC = () => {
  const [pyodide, setPyodide] = useState<Pyodide | null>(null);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'info', text: 'Initializing Pyodide Python environment...' },
  ]);
  const [input, setInput] = useState('');
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPyodide = async () => {
      try {
        const py = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/',
        });

        // Redirect stdout and stderr
        (py as any).globals.set('print_buffer', []);
        py.runPython(`
          import sys
          import io
          sys.stdout = io.StringIO()
          sys.stderr = io.StringIO()
        `);

        setPyodide(py);
        setLines((prev) => [
          ...prev,
          { type: 'info', text: 'Python environment ready. Type a command and press Enter.' },
        ]);
      } catch (error) {
        setLines((prev) => [...prev, { type: 'error', text: `Failed to load Pyodide: ${error}` }]);
      }
    };
    initPyodide();
  }, []);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const newLines = [...lines, { type: 'input' as const, text: input }];
      setLines(newLines);
      setInput('');

      if (pyodide) {
        try {
          const result = await pyodide.runPythonAsync(input);

          const stdout = pyodide.runPython('sys.stdout.getvalue()');
          pyodide.runPython('sys.stdout.truncate(0); sys.stdout.seek(0)');

          const stderr = pyodide.runPython('sys.stderr.getvalue()');
          pyodide.runPython('sys.stderr.truncate(0); sys.stderr.seek(0)');

          let outputLines: TerminalLine[] = [];
          if (stdout) outputLines.push({ type: 'output', text: stdout });
          if (stderr) outputLines.push({ type: 'error', text: stderr });
          if (result !== undefined && result !== null) {
            outputLines.push({ type: 'output', text: String(result) });
          }

          setLines((prev) => [...prev, ...outputLines]);
        } catch (err: any) {
          setLines((prev) => [...prev, { type: 'error', text: err.message }]);
        }
      }
    }
  };

  return (
    <div
      className="w-full h-full bg-black text-white font-mono text-sm flex flex-col"
      onClick={() => document.getElementById('terminal-input')?.focus()}
    >
      <div className="flex-grow p-2 overflow-y-auto">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6">{PythonIcon}</div>
          <h1 className="text-lg">Python Terminal (Pyodide)</h1>
        </div>
        {lines.map((line, index) => (
          <div key={index} className="flex">
            {line.type === 'input' && <span className="text-green-400 mr-2">&gt;</span>}
            <pre
              className={`whitespace-pre-wrap ${
                line.type === 'error'
                  ? 'text-red-400'
                  : line.type === 'info'
                    ? 'text-yellow-400'
                    : ''
              }`}
            >
              {line.text}
            </pre>
          </div>
        ))}
        <div ref={endOfTerminalRef} />
      </div>
      <div className="flex-shrink-0 flex items-center p-2 bg-gray-800">
        <span className="text-green-400 mr-2">&gt;</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="w-full bg-transparent text-white focus:outline-none"
          placeholder={pyodide ? 'Type python code here...' : 'Loading python...'}
          disabled={!pyodide}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
