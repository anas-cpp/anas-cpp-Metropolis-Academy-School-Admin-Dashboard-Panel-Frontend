import React from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  Award,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  Book,
  Bus,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  School,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  currentModule: string;
  onSelectModule: (module: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
  badge?: string;
}

const MENU_ITEMS: { category: string; items: MenuItem[] }[] = [
  {
    category: 'Core',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'ACCOUNTANT', 'STUDENT', 'PARENT', 'LIBRARIAN'],
      },
    ],
  },
  {
    category: 'Academic Operations',
    items: [
      {
        id: 'students',
        label: 'Students',
        icon: GraduationCap,
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'ACCOUNTANT'],
      },
      {
        id: 'staff',
        label: 'Staff & Teachers',
        icon: Users,
        roles: ['SUPER_ADMIN', 'ADMIN'],
      },
      {
        id: 'classes',
        label: 'Classes & Sections',
        icon: BookOpen,
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'],
      },
      {
        id: 'attendance',
        label: 'Attendance',
        icon: CalendarCheck,
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
      },
      {
        id: 'exams',
        label: 'Exams & Grades',
        icon: Award,
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
      },
      {
        id: 'timetable',
        label: 'Timetable',
        icon: Clock,
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
      },
      {
        id: 'assignments',
        label: 'Homework & Tasks',
        icon: FileText,
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
      },
    ],
  },
  {
    category: 'Financials & Admin',
    items: [
      {
        id: 'fees',
        label: 'Fee Management',
        icon: DollarSign,
        roles: ['SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'STUDENT', 'PARENT'],
      },
      {
        id: 'reports',
        label: 'Reports & Analytics',
        icon: BarChart3,
        roles: ['SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'TEACHER'],
      },
    ],
  },
  {
    category: 'Campus & Auxiliary',
    items: [
      {
        id: 'communication',
        label: 'Announcements & Chat',
        icon: MessageSquare,
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT', 'ACCOUNTANT', 'LIBRARIAN'],
        badge: 'Live',
      },
      {
        id: 'library',
        label: 'Library',
        icon: Book,
        roles: ['SUPER_ADMIN', 'ADMIN', 'LIBRARIAN', 'STUDENT', 'TEACHER'],
      },
      {
        id: 'transport',
        label: 'Transport Routes',
        icon: Bus,
        roles: ['SUPER_ADMIN', 'ADMIN', 'STUDENT', 'PARENT'],
      },
      {
        id: 'events',
        label: 'Calendar & Events',
        icon: Calendar,
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT', 'ACCOUNTANT', 'LIBRARIAN'],
      },
    ],
  },
  {
    category: 'System',
    items: [
      {
        id: 'settings',
        label: 'Settings & Audit',
        icon: Settings,
        roles: ['SUPER_ADMIN', 'ADMIN'],
      },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentModule, onSelectModule }) => {
  const { currentRole } = useAuth();

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-screen sticky top-0 z-40 transition-colors">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
          <School className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">
            Metropolis Academy
          </span>
          <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {MENU_ITEMS.map((group, groupIdx) => {
          // Filter items allowed for current role
          const visibleItems = group.items.filter(item => item.roles.includes(currentRole));
          if (visibleItems.length === 0) return null;

          return (
            <div key={groupIdx} className="space-y-1">
              <h3 className="px-3 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                {group.category}
              </h3>
              <div className="space-y-0.5 mt-2">
                {visibleItems.map(item => {
                  const Icon = item.icon;
                  const isActive = currentModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectModule(item.id)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-indigo-500 text-white'
                              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Info Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 border border-indigo-100/80 dark:border-indigo-900/40">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>RBAC Matrix Active</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Logged in as <span className="font-semibold text-slate-700 dark:text-slate-300">{currentRole}</span>
          </p>
        </div>
      </div>
    </aside>
  );
};
