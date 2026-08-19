import React, { useState } from 'react';
import { FileText, Plus, Upload, CheckCircle2, Calendar, Paperclip, X } from 'lucide-react';
import { MOCK_ASSIGNMENTS } from '../../data/mockData';

export const AssignmentsModule: React.FC = () => {
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSubmissionDrawer, setSelectedSubmissionDrawer] = useState<any>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-indigo-600" />
            Homework & Assignments Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Post subject homework, collect student file submissions, provide teacher feedback, and grade tasks.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assignments.map(hw => (
          <div
            key={hw.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {hw.subjectName} • {hw.className}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Due: {hw.dueDate}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{hw.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">{hw.description}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-400">
                Posted by <strong className="text-slate-700 dark:text-slate-300">{hw.teacherName}</strong>
              </div>
              <button
                onClick={() => setSelectedSubmissionDrawer(hw)}
                className="px-3.5 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 rounded-xl transition-colors"
              >
                View Submissions ({hw.submissionCount})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Drawer Modal */}
      {selectedSubmissionDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Submissions — {selectedSubmissionDrawer.title}
              </h3>
              <button onClick={() => setSelectedSubmissionDrawer(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Alex Johnson</p>
                  <p className="text-[10px] text-slate-400">Submitted: Aug 19, 10:15 AM • physics_hw4_alex.pdf</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Graded (15/15)
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Emma Watson</p>
                  <p className="text-[10px] text-slate-400">Submitted: Aug 18, 04:20 PM • dynamics_emma.docx</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  Pending Review
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedSubmissionDrawer(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
