import React, { useState } from 'react';
import { DollarSign, Plus, Printer, CheckCircle2, AlertCircle, FileText, CreditCard, X } from 'lucide-react';
import { MOCK_INVOICES, SCHOOL_INFO } from '../../data/mockData';
import { Invoice } from '../../types';

export const FeesModule: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<Invoice | null>(null);
  const [selectedInvoiceForReceipt, setSelectedInvoiceForReceipt] = useState<Invoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceForPayment) return;
    const paidNum = parseFloat(paymentAmount) || 0;
    const updatedInvoices = invoices.map(inv => {
      if (inv.id === selectedInvoiceForPayment.id) {
        const newPaid = inv.paidAmount + paidNum;
        const newStatus = newPaid >= inv.amount ? 'PAID' : 'PARTIAL';
        return { ...inv, paidAmount: newPaid, status: newStatus as any };
      }
      return inv;
    });
    setInvoices(updatedInvoices);
    setSelectedInvoiceForPayment(null);
    setPaymentAmount('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <DollarSign className="w-6 h-6 text-emerald-600" />
            Fee & Invoice Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Fee structure definition, automated invoice generation, installment tracking, payment recording, and receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Fee Structure creation wizard opened")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Fee Structure
          </button>
        </div>
      </div>

      {/* Financial Overview KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Invoiced</span>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">$4,500.00</h3>
          <p className="text-xs text-slate-500 mt-0.5">3 Active student invoices</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Received</span>
          <h3 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">$2,250.00</h3>
          <p className="text-xs text-slate-500 mt-0.5">50% collection rate</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outstanding Dues</span>
          <h3 className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">$2,250.00</h3>
          <p className="text-xs text-slate-500 mt-0.5">1 Overdue defaulter flagged</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Student Invoices Ledger
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Invoice #</th>
                <th className="py-3.5 px-6">Student</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Paid</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-bold text-slate-800 dark:text-slate-200">{inv.invoiceNumber}</td>
                  <td className="py-3.5 px-6">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{inv.studentName}</p>
                      <p className="text-[10px] text-slate-400">{inv.admissionNumber} • {inv.className}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">${inv.amount}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">${inv.paidAmount}</td>
                  <td className="py-3.5 px-4 text-slate-500">{inv.dueDate}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        inv.status === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : inv.status === 'PARTIAL'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.status !== 'PAID' && (
                        <button
                          onClick={() => setSelectedInvoiceForPayment(inv)}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm"
                        >
                          Record Payment
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedInvoiceForReceipt(inv)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Print / View Fee Receipt"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {selectedInvoiceForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Record Payment — {selectedInvoiceForPayment.invoiceNumber}
              </h3>
              <button onClick={() => setSelectedInvoiceForPayment(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
              <div>
                <p className="text-slate-500">Student: <strong className="text-slate-900 dark:text-white">{selectedInvoiceForPayment.studentName}</strong></p>
                <p className="text-slate-500">Remaining Balance: <strong className="text-rose-600">${selectedInvoiceForPayment.amount - selectedInvoiceForPayment.paidAmount}</strong></p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Payment Amount ($)</label>
                <input
                  type="number"
                  required
                  max={selectedInvoiceForPayment.amount - selectedInvoiceForPayment.paidAmount}
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Payment Method</label>
                <select className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <option value="ONLINE">Stripe / Online Gateway</option>
                  <option value="CASH">Cash</option>
                  <option value="CARD">Credit / Debit Card</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setSelectedInvoiceForPayment(null)} className="px-4 py-2 text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 font-bold text-white bg-indigo-600 rounded-xl shadow-lg">
                  Submit Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fee Receipt Printable Modal */}
      {selectedInvoiceForReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Official Fee Receipt
              </h3>
              <button onClick={() => setSelectedInvoiceForReceipt(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div id="printable-area" className="p-8 rounded-3xl border border-slate-300 bg-white text-slate-900 space-y-6">
              <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900">METROPOLIS ACADEMY</h3>
                  <p className="text-[10px] text-slate-500">OFFICIAL FEE PAYMENT RECEIPT</p>
                </div>
                <div className="text-right text-xs font-mono font-bold">
                  <p>Receipt #: REC-{selectedInvoiceForReceipt.invoiceNumber}</p>
                  <p className="text-slate-500 font-normal">Date: {selectedInvoiceForReceipt.issueDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <p className="text-slate-500">Student: <strong>{selectedInvoiceForReceipt.studentName}</strong></p>
                  <p className="text-slate-500 mt-1">Admission: <strong>{selectedInvoiceForReceipt.admissionNumber}</strong></p>
                </div>
                <div>
                  <p className="text-slate-500">Class: <strong>{selectedInvoiceForReceipt.className}</strong></p>
                  <p className="text-slate-500 mt-1">Status: <strong className="text-emerald-600 uppercase">{selectedInvoiceForReceipt.status}</strong></p>
                </div>
              </div>

              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 font-bold">
                    <th className="p-2 border-r">Fee Item Description</th>
                    <th className="p-2 text-right">Amount ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedInvoiceForReceipt.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border-r">{it.description}</td>
                      <td className="p-2 text-right font-bold">${it.amount}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-2 border-r">TOTAL AMOUNT DUE</td>
                    <td className="p-2 text-right text-slate-900">${selectedInvoiceForReceipt.amount}</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-900">
                    <td className="p-2 border-r">AMOUNT PAID TO DATE</td>
                    <td className="p-2 text-right text-emerald-700">${selectedInvoiceForReceipt.paidAmount}</td>
                  </tr>
                </tbody>
              </table>

              <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                <p>Computer generated receipt • Metropolis Academy Accounts Office</p>
                <div className="w-24 border-t border-slate-400 text-center text-[10px] pt-1">Cashier Stamp</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 no-print">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
