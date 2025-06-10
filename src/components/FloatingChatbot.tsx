import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg focus:outline-none"
        aria-label="Open Chatbot"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-blue-600 rounded-t-xl">
            <span className="text-white font-semibold">Need Help?</span>
            <button onClick={() => setOpen(false)} className="text-white text-xl font-bold">&times;</button>
          </div>
          <div className="p-4 flex-1 text-sm text-gray-700" style={{ minHeight: 120 }}>
            👋 Hi! How can we help you today?
            <ul className="list-disc ml-5 mt-2">
              <li>Search for jobs</li>
              <li>Post a job</li>
              <li>Account or login help</li>
            </ul>
          </div>
          <div className="p-2 border-t border-gray-100">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;