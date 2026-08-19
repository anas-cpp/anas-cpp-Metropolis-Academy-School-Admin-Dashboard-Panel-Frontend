import React, { useState } from 'react';
import { Settings, School, Shield, Upload, Save, CheckCircle2, History } from 'lucide-react';
import { SCHOOL_INFO, MOCK_AUDIT_LOGS } from '../../data/mockData';

export const SettingsModule: React.FC = () => {
  const [schoolName, setSchoolName] = useState(SCHOOL_INFO.name);
  const [academicYear, setAcademicYear] = useState(SCHOOL_INFO.academicYear);
  const [minAttendance, setMinAttendance] = useState('75');
  const [logoPreview, setLogoPreview] = useState(SCHOOL_INFO.logoUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'ROLES' | 'AUDIT'>('PROFILE');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-indigo-600" />
            School Settings & Audit Log
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure Metropolis Academy profile, upload school logo, manage RBAC permissions matrix, and review system audit logs.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs rounded-2xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Settings updated successfully!
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('PROFILE')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'PROFILE'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          School Profile & Logo
        </button>
        <button
          onClick={() => setActiveTab('ROLES')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'ROLES'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Role Permissions Matrix
        </button>
        <button
          onClick={() => setActiveTab('AUDIT')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'AUDIT'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          System Audit Logs
        </button>
      </div>

      {activeTab === 'PROFILE' && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="relative group">
              <img
                src={logoPreview}
                alt="School Logo"
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-md"
              />
              <label className="absolute inset-0 bg-slate-900/60 rounded-3xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Upload className="w-6 h-6" />
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">School Logo & Identity</h3>
              <p className="text-xs text-slate-500">Click logo to upload a new official seal (PNG/JPEG format, max 2MB).</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Active Academic Session</label>
              <input
                type="text"
                value={academicYear}
                onChange={e => setAcademicYear(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Minimum Attendance Threshold (%)</label>
              <input
                type="number"
                value={minAttendance}
                onChange={e => setMinAttendance(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">School Contact Email</label>
              <input
                type="email"
                defaultValue={SCHOOL_INFO.email}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/20"
            >
              <Save className="w-4 h-4" /> Save Configuration
            </button>
          </div>
        </form>
      )}

      {activeTab === 'ROLES' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Role-Based Access Control (RBAC) Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4 text-center">Student Records</th>
                  <th className="py-2 px-4 text-center">Mark Attendance</th>
                  <th className="py-2 px-4 text-center">Gradebook / Exams</th>
                  <th className="py-2 px-4 text-center">Fees & Invoices</th>
                  <th className="py-2 px-4 text-center">System Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                <tr>
                  <td className="py-3 px-4 font-bold text-purple-600">Super Admin</td>
                  <td className="py-3 px-4 text-center text-emerald-600">Full Access</td>
                  <td className="py-3 px-4 text-center text-emerald-600">Full Access</td>
                  <td className="py-3 px-4 text-center text-emerald-600">Full Access</td>
                  <td className="py-3 px-4 text-center text-emerald-600">Full Access</td>
                  <td className="py-3 px-4 text-center text-emerald-600">Full Access</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-blue-600">Admin / Principal</td>
                  <td className="py-3 px-4 text-center text-emerald-600">Full Access</td>
                  <td className="py-3 px-4 text-center text-emerald-600">Full Access</td>
                  <td className="py-3 px-4 text-center text-emerald-600">Full Access</td>
                  <td className="py-3 px-4 text-center text-emerald-600">Full Access</td>
                  <td className="py-3 px-4 text-center text-slate-400">View Only</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-emerald-600">Teacher</td>
                  <td className="py-3 px-4 text-center text-indigo-600">Own Classes</td>
                  <td className="py-3 px-4 text-center text-indigo-600">Mark Own Classes</td>
                  <td className="py-3 px-4 text-center text-indigo-600">Enter Subject Marks</td>
                  <td className="py-3 px-4 text-center text-slate-300">No Access</td>
                  <td className="py-3 px-4 text-center text-slate-300">No Access</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-amber-600">Accountant</td>
                  <td className="py-3 px-4 text-center text-slate-400">View Only</td>
                  <td className="py-3 px-4 text-center text-slate-300">No Access</td>
                  <td className="py-3 px-4 text-center text-slate-300">No Access</td>
                  <td className="py-3 px-4 text-center text-emerald-600">Full Access</td>
                  <td className="py-3 px-4 text-center text-slate-300">No Access</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-indigo-600">Student / Parent</td>
                  <td className="py-3 px-4 text-center text-slate-400">View Own Profile</td>
                  <td className="py-3 px-4 text-center text-slate-400">View Own Log</td>
                  <td className="py-3 px-4 text-center text-slate-400">View Report Card</td>
                  <td className="py-3 px-4 text-center text-slate-400">View/Pay Invoices</td>
                  <td className="py-3 px-4 text-center text-slate-300">No Access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'AUDIT' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-600" />
            Administrative Audit Trail
          </h3>
          <div className="space-y-3">
            {MOCK_AUDIT_LOGS.map(log => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    {log.action}
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white mt-1">{log.details}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">By {log.performedBy} • Target: {log.entity}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
