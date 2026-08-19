import React from 'react';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  Award,
  BookOpen,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Bell,
  Sparkles,
  FileText,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { MOCK_STUDENTS, MOCK_INVOICES, MOCK_ANNOUNCEMENTS, MOCK_EVENTS } from '../../data/mockData';

const ATTENDANCE_TREND = [
  { day: 'Mon', rate: 96 },
  { day: 'Tue', rate: 98 },
  { day: 'Wed', rate: 95 },
  { day: 'Thu', rate: 97 },
  { day: 'Fri', rate: 94 },
];

const FEE_COLLECTION_DATA = [
  { month: 'May', collection: 42000 },
  { month: 'Jun', collection: 58000 },
  { month: 'Jul', collection: 71000 },
  { month: 'Aug', collection: 89000 },
];

interface DashboardModuleProps {
  onNavigate: (module: string) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({ onNavigate }) => {
  const { currentRole, user } = useAuth();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 md:p-8 shadow-xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Metropolis Academy Portal • Academic Year 2025-2026
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-sm text-indigo-200 mt-1 max-w-xl">
              {currentRole === 'SUPER_ADMIN' || currentRole === 'ADMIN'
                ? "Here is today's executive summary for Metropolis Academy across all branches, classes, and financial streams."
                : currentRole === 'TEACHER'
                ? "You have 3 classes scheduled today. 2 assignments require grading feedback."
                : currentRole === 'STUDENT'
                ? "Your current attendance is 94.5%. Term 1 Midterm examinations start in 26 days."
                : currentRole === 'PARENT'
                ? "Alex Johnson is present today. Term 1 tuition invoice partial payment recorded."
                : currentRole === 'ACCOUNTANT'
                ? "Fee collection target is 82% complete for August. $1,500 in pending dues."
                : "Library catalog updated with 4 new scientific journals."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('attendance')}
              className="px-4 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs rounded-2xl shadow-lg transition-all"
            >
              Mark Attendance
            </button>
            <button
              onClick={() => onNavigate('fees')}
              className="px-4 py-2.5 bg-indigo-600/60 hover:bg-indigo-600 text-white font-semibold text-xs rounded-2xl border border-white/20 backdrop-blur-md transition-all"
            >
              View Invoices
            </button>
          </div>
        </div>
      </div>

      {/* Role-Specific Metric Cards */}
      {(currentRole === 'SUPER_ADMIN' || currentRole === 'ADMIN' || currentRole === 'ACCOUNTANT') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Students</span>
              <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">1,248</span>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 ml-2">
                +4.2% <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Across 12 Grades & 36 Sections</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Attendance</span>
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">96.4%</span>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 ml-2">
                +1.1% vs yesterday
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">1,203 Present • 45 Absent</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fees Collected</span>
              <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">$89,450</span>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 ml-2">
                82% of target
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">$14,200 pending outstanding</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Staff</span>
              <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">86</span>
              <span className="inline-flex items-center text-xs font-bold text-slate-500 ml-2">
                100% Present today
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">62 Teaching • 24 Admin & Support</p>
          </div>
        </div>
      )}

      {/* Analytics Charts & Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Attendance & Performance Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Attendance Trends (Weekly)</h3>
                <p className="text-xs text-slate-500">Average student presence percentage across all grades</p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
                Target &gt; 95%
              </span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ATTENDANCE_TREND}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '16px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Module Shortcuts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => onNavigate('students')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-indigo-500 transition-all group"
            >
              <GraduationCap className="w-5 h-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-900 dark:text-white">Student Directory</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Manage 1,248 profiles</p>
            </button>
            <button
              onClick={() => onNavigate('exams')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-indigo-500 transition-all group"
            >
              <Award className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-900 dark:text-white">Report Cards</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Gradebook & results</p>
            </button>
            <button
              onClick={() => onNavigate('timetable')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-indigo-500 transition-all group"
            >
              <Clock className="w-5 h-5 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-900 dark:text-white">Class Schedule</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Conflict detection</p>
            </button>
            <button
              onClick={() => onNavigate('communication')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-indigo-500 transition-all group"
            >
              <Bell className="w-5 h-5 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-900 dark:text-white">Announcements</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Publish notices & chat</p>
            </button>
          </div>
        </div>

        {/* Right Col: Announcements & Upcoming Calendar Events */}
        <div className="space-y-6">
          {/* Announcements Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-600" />
                Latest Announcements
              </h3>
              <button
                onClick={() => onNavigate('communication')}
                className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_ANNOUNCEMENTS.map(ann => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                      {ann.scope}
                    </span>
                    <span className="text-[10px] text-slate-400">{ann.createdAt}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2">{ann.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Academic Events */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Upcoming Events
              </h3>
              <button
                onClick={() => onNavigate('events')}
                className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-2.5">
              {MOCK_EVENTS.map(ev => (
                <div key={ev.id} className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-black text-xs flex flex-col items-center justify-center border border-indigo-100 dark:border-indigo-900">
                    <span>{ev.startDate.slice(8, 10)}</span>
                    <span className="text-[9px] font-medium uppercase">AUG</span>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{ev.title}</h5>
                    <p className="text-[10px] text-slate-400">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
