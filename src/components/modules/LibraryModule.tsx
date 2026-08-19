import React, { useState } from 'react';
import { Book, Plus, Search, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { MOCK_BOOKS, MOCK_BOOK_ISSUES } from '../../data/mockData';

export const LibraryModule: React.FC = () => {
  const [books, setBooks] = useState(MOCK_BOOKS);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Book className="w-6 h-6 text-teal-600" />
            Library Inventory & Issue Tracking
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Book catalog search by ISBN, total vs available copies, issue/return processing, and automated fine calculation.
          </p>
        </div>

        <button
          onClick={() => alert("Add book modal opened")}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-lg shadow-teal-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Book to Catalog
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.map(b => (
          <div key={b.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
              {b.category}
            </span>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{b.title}</h3>
            <p className="text-xs text-slate-500">By {b.author}</p>
            <p className="text-[10px] font-mono text-slate-400">ISBN: {b.isbn}</p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Copies:</span>
              <span className="font-bold text-teal-600">{b.availableCopies} available / {b.totalCopies}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
