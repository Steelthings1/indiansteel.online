import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappPreFilledMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group select-none">
      
      {/* Popover Callout */}
      {isOpen && (
        <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl p-4 shadow-2xl w-72 mb-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-xs text-white">Indian Steel Sales</h5>
                <p className="text-[10px] text-emerald-400 font-medium">● Online | Instant Quote Assist</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-3">
            Share your plate dimensions, material thickness or CAD drawings directly via WhatsApp for instant quotation!
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Start WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline-block px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-semibold shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Chat with Indian Steel
        </span>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-emerald-300/30 relative"
          aria-label="Chat with Indian Steel on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900" />
          
          <MessageSquare className="w-7 h-7 fill-white stroke-none" />
        </button>
      </div>

    </div>
  );
};
