import React from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { MOCK_EVENTS } from '../../data/mockData';

export const EventsModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <CalendarIcon className="w-6 h-6 text-indigo-600" />
            Academic Calendar & Events
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            School holidays, exam schedules, Parent-Teacher Meetings (PTMs), sports days, and cultural events.
          </p>
        </div>

        <button
          onClick={() => alert("Create Event modal opened")}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Calendar Event
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_EVENTS.map(ev => (
          <div
            key={ev.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm flex flex-col items-center justify-center border border-indigo-100 dark:border-indigo-900">
                <span>{ev.startDate.slice(8, 10)}</span>
                <span className="text-[9px] uppercase font-bold">SEP</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    {ev.type}
                  </span>
                  <span className="text-xs text-slate-400">{ev.startDate}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{ev.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{ev.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
