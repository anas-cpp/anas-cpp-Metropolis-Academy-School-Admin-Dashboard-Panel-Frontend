import React, { useState } from 'react';
import { Clock, AlertTriangle, Calendar, CheckCircle2 } from 'lucide-react';

interface Slot {
  period: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  isConflict?: boolean;
}

const TIMETABLE_DATA: Record<string, Slot[]> = {
  Monday: [
    { period: 'Period 1', time: '08:30 - 09:15', subject: 'Physics', teacher: 'John Doe', room: 'Lab 101' },
    { period: 'Period 2', time: '09:20 - 10:05', subject: 'Mathematics', teacher: 'Sarah Smith', room: 'Room 204' },
    { period: 'Period 3', time: '10:10 - 10:55', subject: 'Chemistry', teacher: 'Emily Davis', room: 'Lab 102' },
    { period: 'Period 4', time: '11:15 - 12:00', subject: 'English', teacher: 'Robert Wilson', room: 'Room 204' },
  ],
  Tuesday: [
    { period: 'Period 1', time: '08:30 - 09:15', subject: 'Mathematics', teacher: 'Sarah Smith', room: 'Room 204' },
    { period: 'Period 2', time: '09:20 - 10:05', subject: 'Physics', teacher: 'John Doe', room: 'Lab 101', isConflict: true },
    { period: 'Period 3', time: '10:10 - 10:55', subject: 'Physical Ed', teacher: 'Coach Mike', room: 'Ground' },
    { period: 'Period 4', time: '11:15 - 12:00', subject: 'Computer Sci', teacher: 'Alex Vance', room: 'Comp Lab 2' },
  ],
  Wednesday: [
    { period: 'Period 1', time: '08:30 - 09:15', subject: 'Chemistry', teacher: 'Emily Davis', room: 'Lab 102' },
    { period: 'Period 2', time: '09:20 - 10:05', subject: 'English', teacher: 'Robert Wilson', room: 'Room 204' },
    { period: 'Period 3', time: '10:10 - 10:55', subject: 'Physics', teacher: 'John Doe', room: 'Lab 101' },
    { period: 'Period 4', time: '11:15 - 12:00', subject: 'Mathematics', teacher: 'Sarah Smith', room: 'Room 204' },
  ],
  Thursday: [
    { period: 'Period 1', time: '08:30 - 09:15', subject: 'Computer Sci', teacher: 'Alex Vance', room: 'Comp Lab 2' },
    { period: 'Period 2', time: '09:20 - 10:05', subject: 'Physics', teacher: 'John Doe', room: 'Lab 101' },
    { period: 'Period 3', time: '10:10 - 10:55', subject: 'Mathematics', teacher: 'Sarah Smith', room: 'Room 204' },
    { period: 'Period 4', time: '11:15 - 12:00', subject: 'Biology', teacher: 'Dr. Clara', room: 'Lab 103' },
  ],
  Friday: [
    { period: 'Period 1', time: '08:30 - 09:15', subject: 'English', teacher: 'Robert Wilson', room: 'Room 204' },
    { period: 'Period 2', time: '09:20 - 10:05', subject: 'Chemistry', teacher: 'Emily Davis', room: 'Lab 102' },
    { period: 'Period 3', time: '10:10 - 10:55', subject: 'Library / Study', teacher: 'Clara Oswald', room: 'Main Library' },
    { period: 'Period 4', time: '11:15 - 12:00', subject: 'Weekly Assembly', teacher: 'Principal', room: 'Auditorium' },
  ],
};

export const TimetableModule: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Grade 10-A');
  const [viewMode, setViewMode] = useState<'CLASS' | 'TEACHER'>('CLASS');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-indigo-600" />
            Class & Teacher Timetable Scheduler
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Weekly schedule planning, period room assignments, and automatic teacher/room double-booking conflict detection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'CLASS' ? 'TEACHER' : 'CLASS')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
          >
            View by: <strong className="text-indigo-600">{viewMode === 'CLASS' ? 'Class Schedule' : 'Teacher Schedule'}</strong>
          </button>
        </div>
      </div>

      {/* Conflict Alert Banner */}
      <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-rose-900 dark:text-rose-200">1 Conflict Detected in Tuesday Schedule!</p>
            <p className="text-rose-700 dark:text-rose-400">Teacher John Doe double-booked for Grade 10-A and Grade 12-A during Period 2.</p>
          </div>
        </div>
        <button
          onClick={() => alert("Auto-resolve conflict wizard opened")}
          className="px-3 py-1.5 text-xs font-bold text-rose-900 bg-rose-200 hover:bg-rose-300 rounded-xl transition-colors"
        >
          Auto-Resolve
        </button>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(TIMETABLE_DATA).map(([day, slots]) => (
          <div key={day} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm p-4 space-y-3">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{day}</h3>
              <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
                4 Periods
              </span>
            </div>

            <div className="space-y-2.5">
              {slots.map((s, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border text-xs space-y-1 transition-all ${
                    s.isConflict
                      ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>{s.period}</span>
                    <span>{s.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{s.subject}</h4>
                  <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">{s.teacher}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>{s.room}</span>
                    {s.isConflict && <span className="text-rose-600 font-bold">Conflict</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
