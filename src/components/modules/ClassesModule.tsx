import React, { useState } from 'react';
import { BookOpen, Plus, Users, ArrowRightLeft, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';
import { MOCK_CLASSES } from '../../data/mockData';

export const ClassesModule: React.FC = () => {
  const [showPromotionWizard, setShowPromotionWizard] = useState(false);
  const [promoFromClass, setPromoFromClass] = useState('Grade 10');
  const [promoToClass, setPromoToClass] = useState('Grade 11');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            Class & Section Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure academic classes, section capacities, homeroom teachers, and perform bulk year-end promotions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPromotionWizard(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 rounded-xl transition-colors border border-indigo-200 dark:border-indigo-800"
          >
            <ArrowRightLeft className="w-4 h-4" />
            Year-End Student Promotion
          </button>
          <button
            onClick={() => alert("Create class modal opened")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Class
          </button>
        </div>
      </div>

      {/* Classes Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CLASSES.map(c => (
          <div
            key={c.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{c.name}</h3>
                <span className="text-[10px] font-mono font-bold text-slate-400">Code: {c.code}</span>
              </div>
              <span className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                {c.sections.length} Sections
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {c.sections.map(sec => (
                <div
                  key={sec.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                        {sec.name}
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Class Teacher: {sec.classTeacherName}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Capacity: {sec.studentCount} / {sec.capacity} Students enrolled
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Year-End Promotion Wizard Modal */}
      {showPromotionWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-indigo-600" />
                Bulk Student Promotion Wizard
              </h3>
              <button onClick={() => setShowPromotionWizard(false)} className="text-slate-400 hover:text-slate-600">
                &times;
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Promote all active eligible students from current academic session to the next grade level.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">From Grade</label>
                <select
                  value={promoFromClass}
                  onChange={e => setPromoFromClass(e.target.value)}
                  className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                </select>
                <span className="text-[10px] text-slate-400 mt-2 block">62 Eligible Students</span>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                <label className="block font-bold text-indigo-900 dark:text-indigo-300 mb-1">Target Grade</label>
                <select
                  value={promoToClass}
                  onChange={e => setPromoToClass(e.target.value)}
                  className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                  <option value="Graduated">Graduated Alumni</option>
                </select>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-2 block">Target Session 2026-2027</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs">
              <GraduationCap className="w-4 h-4 flex-shrink-0" />
              <span>Students with overdue fee invoices will be flagged for review prior to promotion.</span>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setShowPromotionWizard(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Successfully promoted 62 students from ${promoFromClass} to ${promoToClass}!`);
                  setShowPromotionWizard(false);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl shadow-lg"
              >
                Execute Bulk Promotion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
