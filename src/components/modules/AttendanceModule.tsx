import React, { useState } from 'react';
import { CalendarCheck, Check, X, Clock, AlertTriangle, Send, Filter, CheckCircle2 } from 'lucide-react';
import { MOCK_STUDENTS } from '../../data/mockData';
import { AttendanceStatus } from '../../types';

export const AttendanceModule: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Grade 10-A');
  const [selectedDate, setSelectedDate] = useState('2026-08-19');
  const [attendanceState, setAttendanceState] = useState<Record<string, AttendanceStatus>>({
    st1: 'PRESENT',
    st2: 'PRESENT',
    st3: 'ABSENT',
    st4: 'PRESENT',
  });
  const [autoNotifyParents, setAutoNotifyParents] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceState(prev => ({ ...prev, [studentId]: status }));
  };

  const handleBulkAction = (status: AttendanceStatus) => {
    const nextState: Record<string, AttendanceStatus> = {};
    MOCK_STUDENTS.forEach(st => {
      nextState[st.id] = status;
    });
    setAttendanceState(nextState);
  };

  const handleSaveAttendance = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <CalendarCheck className="w-6 h-6 text-indigo-600" />
            Daily Attendance Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Mark daily attendance, calculate attendance percentages, trigger low-attendance alerts, and notify guardians.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs rounded-2xl animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Attendance saved & parent notifications dispatched!
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-slate-200"
          >
            <option value="Grade 10-A">Grade 10 - Section A</option>
            <option value="Grade 10-B">Grade 10 - Section B</option>
            <option value="Grade 11-A">Grade 11 - Section A</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-800 dark:text-slate-200"
          />

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
            <input
              type="checkbox"
              id="notify"
              checked={autoNotifyParents}
              onChange={e => setAutoNotifyParents(e.target.checked)}
              className="rounded text-indigo-600"
            />
            <label htmlFor="notify" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Send className="w-3 h-3 text-indigo-500" /> Auto-SMS/Email parents on absence
            </label>
          </div>
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleBulkAction('PRESENT')}
            className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-900"
          >
            Mark All Present
          </button>
          <button
            onClick={() => handleBulkAction('ABSENT')}
            className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300 rounded-xl border border-rose-200 dark:border-rose-900"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Attendance Marking Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Roll No</th>
                <th className="py-3.5 px-6">Student Name</th>
                <th className="py-3.5 px-4">Overall Rate</th>
                <th className="py-3.5 px-6">Attendance Status Selection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
              {MOCK_STUDENTS.map(st => {
                const currentStatus = attendanceState[st.id] || 'PRESENT';
                return (
                  <tr key={st.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-slate-500 font-bold">{st.rollNumber}</td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <img src={st.user.avatarUrl} alt="" className="w-8 h-8 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {st.user.firstName} {st.user.lastName}
                          </p>
                          <p className="text-[10px] text-slate-400">{st.admissionNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${ (st.attendanceRate || 0) < 75 ? 'text-rose-600' : 'text-emerald-600' }`}>
                          {st.attendanceRate}%
                        </span>
                        {(st.attendanceRate || 0) < 75 && (
                          <span title="Low attendance alert (< 75%)">
                            <AlertTriangle className="w-4 h-4 text-rose-500" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStatusChange(st.id, 'PRESENT')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            currentStatus === 'PRESENT'
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(st.id, 'ABSENT')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            currentStatus === 'ABSENT'
                              ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(st.id, 'LATE')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            currentStatus === 'LATE'
                              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          Late
                        </button>
                        <button
                          onClick={() => handleStatusChange(st.id, 'HALF_DAY')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            currentStatus === 'HALF_DAY'
                              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          Half-Day
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={handleSaveAttendance}
            className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
          >
            Submit & Save Class Attendance
          </button>
        </div>
      </div>
    </div>
  );
};
