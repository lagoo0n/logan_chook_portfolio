import { useState } from 'react';
import { Terminal, Copy, Check, Video, Image as ImageIcon } from 'lucide-react';

interface TerminalPreviewProps {
  command?: string;
  output?: string[];
  projectTitle: string;
}

export default function TerminalPreview({
  command = 'make run_tests',
  output = ['[SYSTEM] Initializing tests...'],
  projectTitle,
}: TerminalPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'console' | 'screenshot' | 'demo'>('console');

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#090d14] overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#0d121c] px-4 py-2.5 gap-2">
        <div className="flex items-center gap-2">
          {/* Subtle OS dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700"></span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            host-session — {projectTitle}
          </span>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('console')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeTab === 'console'
                ? 'bg-slate-800 text-slate-100'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terminal Output
          </button>
          <button
            onClick={() => setActiveTab('screenshot')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeTab === 'screenshot'
                ? 'bg-slate-800 text-slate-100'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Screenshot Placeholder
          </button>
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeTab === 'demo'
                ? 'bg-slate-800 text-slate-100'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Demo / GIF Placeholder
          </button>
        </div>
      </div>

      {/* Tab 1: Live formatted terminal stream */}
      {activeTab === 'console' && (
        <div className="p-5 font-mono text-xs">
          <div className="flex items-center justify-between bg-slate-900/60 rounded px-3 py-2 border border-slate-800/80 mb-4">
            <div className="flex items-center gap-2 text-slate-300 overflow-x-auto">
              <span className="text-blue-400 select-none">$</span>
              <span className="text-slate-200">{command}</span>
            </div>
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-200 ml-2 p-1 transition-colors"
              title="Copy command"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          <div className="space-y-1 text-slate-300 leading-relaxed overflow-x-auto max-h-72 overflow-y-auto pr-2">
            {output.map((line, index) => {
              const isError = line.includes('ERR') || line.includes('fault') || line.includes('mismatch') || line.includes('Disabling');
              const isSuccess = line.includes('PASS') || line.includes('completed') || line.includes('passed') || line.includes('verified');
              const isInfo = line.includes('[INFO]') || line.includes('[SYSTEM]');
              
              let textColor = 'text-slate-300';
              if (isError) textColor = 'text-amber-300';
              if (isSuccess) textColor = 'text-emerald-400';
              if (isInfo) textColor = 'text-blue-300';

              return (
                <div key={index} className={`font-mono ${textColor}`}>
                  {line}
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Process exited with code 0</span>
            <span className="font-mono">Host target: x86_64-linux-gnu</span>
          </div>
        </div>
      )}

      {/* Tab 2: Terminal Screenshot Placeholder */}
      {activeTab === 'screenshot' && (
        <div className="p-8 flex flex-col items-center justify-center text-center bg-[#070b12] min-h-[220px]">
          <div className="h-10 w-10 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center mb-3 text-slate-400">
            <ImageIcon className="h-5 w-5 text-blue-400" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">Terminal Output Capture</h4>
          <p className="text-xs text-slate-400 max-w-md mt-1">
            Placeholder for hi-res terminal screenshot recording build logs, peripheral initialization, and automated assertions during test execution.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span>Status: Pending hardware test bench screen capture</span>
          </div>
        </div>
      )}

      {/* Tab 3: Demo / GIF Placeholder */}
      {activeTab === 'demo' && (
        <div className="p-8 flex flex-col items-center justify-center text-center bg-[#070b12] min-h-[220px]">
          <div className="h-10 w-10 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center mb-3 text-slate-400">
            <Video className="h-5 w-5 text-blue-400" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">Future Demo Video / GIF</h4>
          <p className="text-xs text-slate-400 max-w-md mt-1">
            Placeholder for screen recording showcasing interactive CLI execution, real-time peripheral state injection, and responsive telemetry stream.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span>Asset: demo_walkthrough.mp4 (Recording planned)</span>
          </div>
        </div>
      )}
    </div>
  );
}
