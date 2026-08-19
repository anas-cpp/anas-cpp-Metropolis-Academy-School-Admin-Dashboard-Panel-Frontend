import React, { useState } from 'react';
import { BarChart3, Download, Filter, Calendar, FileText } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ACADEMIC_PERFORMANCE_DATA = [
  { class: 'Grade 8', avg: 84 },
  { class: 'Grade 9', avg: 79 },
  { class: 'Grade 10', avg: 82 },
  { class: 'Grade 11', avg: 88 },
  { class: 'Grade 12', avg: 91 },
];

export const ReportsModule: React.FC = () => {
  const [reportCategory, setReportCategory] = useState('ACADEMIC');

  const handleExport = (format: string) => {
    alert(`Exporting Metropolis Academy ${reportCategory} Report as ${format}... File download initiated.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            Executive Reports & Analytics Builder
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Custom date range reporting for student attendance, academic grade distributions, and fee collection summaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('CSV')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
          >
            <Download className="w-4 h-4 text-emerald-600" /> Export Excel/CSV
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20"
          >
            <FileText className="w-4 h-4" /> Export PDF Summary
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
        <span className="text-xs font-bold text-slate-500 uppercase">Category:</span>
        <select
          value={reportCategory}
          onChange={e => setReportCategory(e.target.value)}
          className="px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-slate-200"
        >
          <option value="ACADEMIC">Academic Performance & Grade Distribution</option>
          <option value="ATTENDANCE">Attendance & Absenteeism Analysis</option>
          <option value="FINANCE">Fee Collection & Outstanding Defaulters</option>
        </select>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
          Grade-wise Academic Performance Average (%)
        </h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ACADEMIC_PERFORMANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="class" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '16px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="avg" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
