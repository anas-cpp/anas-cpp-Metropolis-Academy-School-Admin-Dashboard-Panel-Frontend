import React from 'react';
import { Bus, MapPin, Phone, Users } from 'lucide-react';
import { MOCK_ROUTES } from '../../data/mockData';

export const TransportModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Bus className="w-6 h-6 text-indigo-600" />
            School Transport & Bus Fleet
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Bus route planning, vehicle assignment, driver details, student mapping, and live route simulation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK_ROUTES.map(r => (
          <div key={r.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{r.routeName}</h3>
                <p className="text-xs text-indigo-600 font-semibold">{r.vehicleNumber}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                ${r.fare}/mo
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Assigned Students: <strong>{r.studentCount}</strong>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> Driver: <strong>{r.driverName} ({r.driverPhone})</strong>
              </p>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bus Stops:</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.stops.map((st, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-medium">
                      📍 {st}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
