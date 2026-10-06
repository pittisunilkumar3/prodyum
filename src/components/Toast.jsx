import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onDismiss }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 sm:max-w-md animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`p-4 rounded-2xl glass-modal border flex items-start gap-3 shadow-2xl ${
        isSuccess ? 'border-emerald-500/40 bg-emerald-950/40' : 'border-cyan-accent/40 bg-cyan-950/40'
      }`}>
        <div className="mt-0.5">
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <Info className="w-5 h-5 text-cyan-accent" />
          )}
        </div>

        <div className="flex-1 text-xs sm:text-sm font-jakarta text-slate-200 leading-snug">
          {toast.message}
        </div>

        <button
          onClick={onDismiss}
          className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
