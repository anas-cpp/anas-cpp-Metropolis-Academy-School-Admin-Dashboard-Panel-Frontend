import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  FileSpreadsheet,
  QrCode,
  Printer,
  Download,
  Eye,
  Edit,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  ShieldAlert,
} from 'lucide-react';
import { Student } from '../../types';
import { MOCK_STUDENTS, MOCK_CLASSES, SCHOOL_INFO } from '../../data/mockData';

export const StudentModule: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [selectedStudentForIDCard, setSelectedStudentForIDCard] = useState<Student | null>(null);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);

  // New Student Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '2008-05-15',
    gender: 'MALE',
    bloodGroup: 'O+',
    className: 'Grade 10',
    sectionName: 'A',
    address: '',
    medicalNotes: '',
    guardianName: '',
    guardianPhone: '',
  });

  const filteredStudents = students.filter(st => {
    const matchesSearch =
      st.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'ALL' || st.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newAdmissionNo = `MA-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent: Student = {
      id: `st-${Date.now()}`,
      userId: `u-new-${Date.now()}`,
      user: {
        id: `u-new-${Date.now()}`,
        email: formData.email || `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}@metropolis.edu`,
        role: 'STUDENT',
        status: 'ACTIVE',
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.guardianPhone,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
      admissionNumber: newAdmissionNo,
      rollNumber: `${formData.sectionName}-09`,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender as any,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      medicalNotes: formData.medicalNotes,
      status: 'ACTIVE',
      className: formData.className,
      sectionName: formData.sectionName,
      admissionDate: new Date().toISOString().split('T')[0],
      attendanceRate: 100,
    };

    setStudents([newStudent, ...students]);
    setShowAddModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '2008-05-15',
      gender: 'MALE',
      bloodGroup: 'O+',
      className: 'Grade 10',
      sectionName: 'A',
      address: '',
      medicalNotes: '',
      guardianName: '',
      guardianPhone: '',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-indigo-600" />
            Student Management Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage student admissions, profiles, parent links, document uploads, and ID card generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBulkImportModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Bulk CSV Import
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Student
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search student name or admission ID..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-semibold focus:outline-none"
            >
              <option value="ALL">All Grades</option>
              {MOCK_CLASSES.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Showing <span className="text-slate-900 dark:text-white font-bold">{filteredStudents.length}</span> students
        </span>
      </div>

      {/* Student Data Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Student Info</th>
                <th className="py-3.5 px-4">Admission No</th>
                <th className="py-3.5 px-4">Class & Section</th>
                <th className="py-3.5 px-4">Attendance Rate</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
              {filteredStudents.map(st => (
                <tr key={st.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={st.user.avatarUrl}
                        alt={st.user.firstName}
                        className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/10"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {st.user.firstName} {st.user.lastName}
                        </p>
                        <p className="text-[10px] text-slate-400">{st.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    {st.admissionNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                      {st.className}-{st.sectionName}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          (st.attendanceRate || 0) < 75 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600'
                        }`}
                      >
                        {st.attendanceRate}%
                      </span>
                      {(st.attendanceRate || 0) < 75 && (
                        <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 rounded">
                          Alert &lt; 75%
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {st.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedStudentForIDCard(st)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Print / Preview Student ID Card"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedStudentDetail(st)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable ID Card Modal */}
      {selectedStudentForIDCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Official Metropolis Student ID Card
              </h3>
              <button onClick={() => setSelectedStudentForIDCard(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ID Card Graphic Container */}
            <div id="printable-area" className="w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-2xl relative border border-indigo-500/30 overflow-hidden">
              <div className="flex items-center justify-between border-b border-indigo-500/30 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-xs">
                    MA
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold tracking-tight">METROPOLIS ACADEMY</h4>
                    <p className="text-[8px] text-indigo-200">STUDENT IDENTIFICATION CARD</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold bg-indigo-500/30 px-2 py-0.5 rounded text-indigo-300">
                  {selectedStudentForIDCard.admissionNumber}
                </span>
              </div>

              <div className="flex gap-4">
                <img
                  src={selectedStudentForIDCard.photoUrl || selectedStudentForIDCard.user.avatarUrl}
                  alt={selectedStudentForIDCard.user.firstName}
                  className="w-20 h-24 rounded-2xl object-cover ring-2 ring-indigo-400/50 shadow-md"
                />
                <div className="space-y-1 text-xs">
                  <h5 className="font-extrabold text-sm text-white">
                    {selectedStudentForIDCard.user.firstName} {selectedStudentForIDCard.user.lastName}
                  </h5>
                  <p className="text-[11px] text-indigo-200">
                    Grade: <span className="font-semibold text-white">{selectedStudentForIDCard.className}-{selectedStudentForIDCard.sectionName}</span>
                  </p>
                  <p className="text-[11px] text-indigo-200">
                    Roll No: <span className="font-semibold text-white">{selectedStudentForIDCard.rollNumber}</span>
                  </p>
                  <p className="text-[11px] text-indigo-200">
                    Blood Group: <span className="font-semibold text-amber-400">{selectedStudentForIDCard.bloodGroup || 'O+'}</span>
                  </p>
                  <p className="text-[10px] text-indigo-300 mt-2">
                    DOB: {selectedStudentForIDCard.dateOfBirth}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-indigo-500/30 flex items-center justify-between">
                <div className="text-[9px] text-indigo-300">
                  <p>Emergency Contact: +1 (555) 019-9800</p>
                  <p>Valid through: 2026 Academic Session</p>
                </div>
                <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 no-print">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
              >
                <Printer className="w-4 h-4" /> Print / Export PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Admit New Student</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Class</label>
                  <select
                    value={formData.className}
                    onChange={e => setFormData({ ...formData, className: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Section</label>
                  <select
                    value={formData.sectionName}
                    onChange={e => setFormData({ ...formData, sectionName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={formData.bloodGroup}
                    onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg"
                >
                  Save & Admit Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import CSV Modal */}
      {showBulkImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Bulk Import Students (CSV/Excel)
              </h3>
              <button onClick={() => setShowBulkImportModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center space-y-3">
              <FileSpreadsheet className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Drag and drop your CSV file here, or browse
              </p>
              <p className="text-[10px] text-slate-400">Supported format: .csv, .xlsx containing Name, DOB, Gender, Grade</p>
              <button
                onClick={() => {
                  alert("Sample CSV imported successfully! 5 students added.");
                  setShowBulkImportModal(false);
                }}
                className="px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
              >
                Upload Demo File (sample_students.csv)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
