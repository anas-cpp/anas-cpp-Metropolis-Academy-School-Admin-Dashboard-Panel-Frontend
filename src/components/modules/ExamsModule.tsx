import React, { useState } from 'react';
import { Award, Printer, CheckCircle2, Lock, Unlock, Eye, Sparkles, X } from 'lucide-react';
import { MOCK_STUDENTS, SCHOOL_INFO } from '../../data/mockData';

export const ExamsModule: React.FC = () => {
  const [isPublished, setIsPublished] = useState(true);
  const [selectedReportCardStudent, setSelectedReportCardStudent] = useState<any>(null);

  const mockGrades = [
    { student: MOCK_STUDENTS[0], math: 92, physics: 88, chemistry: 95, english: 90, total: 365, percentage: 91.25, rank: 1, grade: 'A+' },
    { student: MOCK_STUDENTS[1], math: 95, physics: 90, chemistry: 92, english: 85, total: 362, percentage: 90.50, rank: 2, grade: 'A+' },
    { student: MOCK_STUDENTS[2], math: 65, physics: 58, chemistry: 62, english: 70, total: 255, percentage: 63.75, rank: 3, grade: 'C' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Award className="w-6 h-6 text-indigo-600" />
            Examination & Gradebook System
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Subject marks entry, auto-calculated class rank & percentages, result publishing control, and report cards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPublished(!isPublished)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              isPublished
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
            }`}
          >
            {isPublished ? <Unlock className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-amber-600" />}
            {isPublished ? 'Results Published to Parents' : 'Results Locked (Draft)'}
          </button>
        </div>
      </div>

      {/* Exam Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Exam Session</span>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">Term 1 Midterm Examinations</h3>
          <p className="text-xs text-slate-500 mt-1">Grade 10 • Academic Year 2025-2026</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Class Average</span>
          <h3 className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">81.8%</h3>
          <p className="text-xs text-slate-500 mt-1">Highest: 91.25% (Alex Johnson)</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grading Scale</span>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">Standard A+ to F (GPA 4.0)</h3>
          <p className="text-xs text-slate-500 mt-1">Minimum Pass mark: 40%</p>
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Gradebook & Rank Ledger — Grade 10-A
          </h3>
          <span className="text-xs text-slate-400">Total Max Marks: 400</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Rank</th>
                <th className="py-3.5 px-6">Student</th>
                <th className="py-3.5 px-4 text-center">Math (100)</th>
                <th className="py-3.5 px-4 text-center">Physics (100)</th>
                <th className="py-3.5 px-4 text-center">Chem (100)</th>
                <th className="py-3.5 px-4 text-center">English (100)</th>
                <th className="py-3.5 px-4 text-center">Total / %</th>
                <th className="py-3.5 px-4 text-center">Grade</th>
                <th className="py-3.5 px-6 text-right">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
              {mockGrades.map(g => (
                <tr key={g.student.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-indigo-600 dark:text-indigo-400">
                    <span className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center font-black">
                      #{g.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img src={g.student.user.avatarUrl} alt="" className="w-8 h-8 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {g.student.user.firstName} {g.student.user.lastName}
                        </p>
                        <p className="text-[10px] text-slate-400">{g.student.admissionNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-slate-200">{g.math}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-slate-200">{g.physics}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-slate-200">{g.chemistry}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-slate-200">{g.english}</td>
                  <td className="py-3.5 px-4 text-center">
                    <p className="font-bold text-slate-900 dark:text-white">{g.total} / 400</p>
                    <p className="text-[10px] font-semibold text-emerald-600">{g.percentage}%</p>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                      {g.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => setSelectedReportCardStudent(g)}
                      className="flex items-center gap-1.5 ml-auto px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 rounded-xl transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Report Card Modal */}
      {selectedReportCardStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Official Report Card Preview
              </h3>
              <button onClick={() => setSelectedReportCardStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Report Card Document Content */}
            <div id="printable-area" className="p-8 rounded-3xl border border-slate-300 dark:border-slate-700 bg-white text-slate-900 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-indigo-600 pb-4">
                <div>
                  <h2 className="text-xl font-black text-indigo-950 tracking-tight">METROPOLIS ACADEMY</h2>
                  <p className="text-xs text-slate-500">{SCHOOL_INFO.address} • Phone: {SCHOOL_INFO.phone}</p>
                  <p className="text-[10px] font-bold uppercase text-indigo-600 mt-1">ACADEMIC PERFORMANCE REPORT CARD</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <p className="font-bold text-slate-800">Session: 2025-2026</p>
                  <p className="text-slate-500">Term: Midterm Examinations</p>
                </div>
              </div>

              {/* Student Metadata */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <p className="text-slate-500">Student Name: <strong className="text-slate-900">{selectedReportCardStudent.student.user.firstName} {selectedReportCardStudent.student.user.lastName}</strong></p>
                  <p className="text-slate-500 mt-1">Admission No: <strong className="text-slate-900">{selectedReportCardStudent.student.admissionNumber}</strong></p>
                </div>
                <div>
                  <p className="text-slate-500">Class & Section: <strong className="text-slate-900">{selectedReportCardStudent.student.className}-{selectedReportCardStudent.student.sectionName}</strong></p>
                  <p className="text-slate-500 mt-1">Class Rank: <strong className="text-indigo-600 font-extrabold">#{selectedReportCardStudent.rank} in Class</strong></p>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <table className="w-full text-left text-xs border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-2 border-r border-slate-200">Subject</th>
                    <th className="p-2 border-r border-slate-200 text-center">Max Marks</th>
                    <th className="p-2 border-r border-slate-200 text-center">Marks Obtained</th>
                    <th className="p-2 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 border-r font-medium">Mathematics</td>
                    <td className="p-2 border-r text-center">100</td>
                    <td className="p-2 border-r text-center font-bold">{selectedReportCardStudent.math}</td>
                    <td className="p-2 text-center font-bold text-indigo-600">A+</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r font-medium">Physics</td>
                    <td className="p-2 border-r text-center">100</td>
                    <td className="p-2 border-r text-center font-bold">{selectedReportCardStudent.physics}</td>
                    <td className="p-2 text-center font-bold text-indigo-600">A</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r font-medium">Chemistry</td>
                    <td className="p-2 border-r text-center">100</td>
                    <td className="p-2 border-r text-center font-bold">{selectedReportCardStudent.chemistry}</td>
                    <td className="p-2 text-center font-bold text-indigo-600">A+</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r font-medium">English Literature</td>
                    <td className="p-2 border-r text-center">100</td>
                    <td className="p-2 border-r text-center font-bold">{selectedReportCardStudent.english}</td>
                    <td className="p-2 text-center font-bold text-indigo-600">A</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-2 border-r">TOTAL / OVERALL</td>
                    <td className="p-2 border-r text-center">400</td>
                    <td className="p-2 border-r text-center font-extrabold text-indigo-700">{selectedReportCardStudent.total}</td>
                    <td className="p-2 text-center font-black text-emerald-600">{selectedReportCardStudent.percentage}% ({selectedReportCardStudent.grade})</td>
                  </tr>
                </tbody>
              </table>

              {/* Remarks & Signature */}
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-700">Homeroom Teacher Remarks: </span>
                  <span className="text-slate-600 italic">"Exceptional analytical skills demonstrated. Continues to maintain top academic standings."</span>
                </div>
                <div className="flex items-center justify-between pt-8 text-xs font-semibold text-slate-500 border-t border-slate-200">
                  <div className="text-center border-t border-slate-400 pt-1 w-40">Class Teacher Signature</div>
                  <div className="text-center border-t border-slate-400 pt-1 w-40">Principal Signature</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 no-print">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
