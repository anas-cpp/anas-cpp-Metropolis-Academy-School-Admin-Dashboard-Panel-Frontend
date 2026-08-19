import React, { useState } from 'react';
import { Search, X, GraduationCap, Users, BookOpen, DollarSign, FileText, ArrowRight } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_STAFF, MOCK_CLASSES, MOCK_INVOICES } from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (module: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredStudents = query.trim()
    ? MOCK_STUDENTS.filter(
        s =>
          s.user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          s.user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          s.admissionNumber.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredStaff = query.trim()
    ? MOCK_STAFF.filter(
        st =>
          st.user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          st.user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          st.employeeId.toLowerCase().includes(query.toLowerCase()) ||
          st.designation.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredInvoices = query.trim()
    ? MOCK_INVOICES.filter(
        inv =>
          inv.invoiceNumber.toLowerCase().includes(query.toLowerCase()) ||
          inv.studentName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type student name, admission number, teacher, or invoice ID..."
            className="flex-1 bg-transparent text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-12 text-center">
              <Search className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Search Metropolis Academy database
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Try searching for "Alex", "MA-2024", "Doe", or "INV-2025"</p>
            </div>
          ) : (
            <>
              {/* Students Results */}
              {filteredStudents.length > 0 && (
                <div>
                  <h4 className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Students ({filteredStudents.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredStudents.map(st => (
                      <div
                        key={st.id}
                        onClick={() => {
                          onSelectResult('students');
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={st.user.avatarUrl}
                            alt={st.user.firstName}
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">
                              {st.user.firstName} {st.user.lastName}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {st.admissionNumber} • {st.className}-{st.sectionName}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Staff Results */}
              {filteredStaff.length > 0 && (
                <div>
                  <h4 className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Teachers & Staff ({filteredStaff.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredStaff.map(stf => (
                      <div
                        key={stf.id}
                        onClick={() => {
                          onSelectResult('staff');
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={stf.user.avatarUrl}
                            alt={stf.user.firstName}
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">
                              {stf.user.firstName} {stf.user.lastName}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {stf.employeeId} • {stf.designation}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Invoice Results */}
              {filteredInvoices.length > 0 && (
                <div>
                  <h4 className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" /> Invoices ({filteredInvoices.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredInvoices.map(inv => (
                      <div
                        key={inv.id}
                        onClick={() => {
                          onSelectResult('fees');
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {inv.invoiceNumber} — {inv.studentName}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            ${inv.amount} • Status: {inv.status}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredStudents.length === 0 && filteredStaff.length === 0 && filteredInvoices.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-500">
                  No records matching "{query}" found in Metropolis database.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
