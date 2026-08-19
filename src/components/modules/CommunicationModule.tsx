import React, { useState } from 'react';
import { MessageSquare, Bell, Pin, Send, Plus, User, CheckCheck, Sparkles } from 'lucide-react';
import { MOCK_ANNOUNCEMENTS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export const CommunicationModule: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'NOTICES' | 'MESSAGES'>('NOTICES');
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'John Doe (Physics Teacher)', text: 'Hello Mr. Johnson, Alex did great in today\'s physics lab test!', time: '10:30 AM', isMe: false },
    { id: 2, sender: 'Robert Johnson (Parent)', text: 'Thank you Mr. Doe! Glad to hear that.', time: '10:34 AM', isMe: true },
  ]);
  const [newMessageText, setNewMessageText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        id: Date.now(),
        sender: `${user?.firstName} ${user?.lastName}`,
        text: newMessageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      },
    ]);
    setNewMessageText('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            Communication & Announcement Hub
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish school-wide announcements, maintain notice boards, and communicate directly between teachers and parents.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button
            onClick={() => setActiveTab('NOTICES')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'NOTICES'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Notice Board & Announcements
          </button>
          <button
            onClick={() => setActiveTab('MESSAGES')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'MESSAGES'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Direct Teacher-Parent Inbox
          </button>
        </div>
      </div>

      {activeTab === 'NOTICES' ? (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => alert("Create Announcement modal opened")}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20"
            >
              <Plus className="w-4 h-4" /> Publish Announcement
            </button>
          </div>

          <div className="space-y-4">
            {announcements.map(ann => (
              <div
                key={ann.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {ann.isPinned && <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />}
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {ann.scope}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{ann.createdAt}</span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{ann.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ann.content}</p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Author: <strong className="text-slate-700 dark:text-slate-200">{ann.authorName} ({ann.authorRole})</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Direct Inbox */
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[500px]">
          {/* Chat List */}
          <div className="border-r border-slate-100 dark:border-slate-800 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">Conversations</h4>
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 cursor-pointer">
              <p className="text-xs font-bold text-slate-900 dark:text-white">John Doe (Physics Teacher)</p>
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400 truncate mt-0.5">Alex did great in today's physics lab...</p>
            </div>
          </div>

          {/* Chat Conversation */}
          <div className="md:col-span-2 flex flex-col justify-between p-4 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="space-y-3 overflow-y-auto p-2">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                      msg.isMe
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <p className="font-bold text-[10px] opacity-80">{msg.sender}</p>
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
              <input
                type="text"
                value={newMessageText}
                onChange={e => setNewMessageText(e.target.value)}
                placeholder="Type a message to teacher/parent..."
                className="flex-1 p-3 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none"
              />
              <button type="submit" className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-md">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
