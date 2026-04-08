import React, { useState, useMemo } from "react";
import { 
  Search, Filter, RotateCcw, Download, History, Send, 
  ChevronDown, Calendar, Users, Zap, Hash, MessageSquare,
  CheckCircle2, Clock, Calculator, Weight, X, Sparkles
} from "lucide-react";

// ── Mock Data ───────────────────────────────────────────
const MOCK_POLISH_DATA = [
  { id: 1, timestamp: "16/10/2025 00:00:00", karigar: "SK", voucherNo: "1601", melting: "92", orderNo: "JF-11157", ghatWeight: 24.63, afterMeenaWeight: 0.00, finishWeight: 19.92, polishLoss: 0.10, type: "Bangle Polish", serialNo: "", remarks: "", polishBalance: 4.61 },
  { id: 2, timestamp: "23/01/2026 00:00:00", karigar: "PK", voucherNo: "1", melting: "92", orderNo: "JF-11383", ghatWeight: 1.00, afterMeenaWeight: 0.00, finishWeight: 0.00, polishLoss: 0.00, type: "Polish Inhouse", serialNo: "", remarks: "", polishBalance: 0.00 },
  { id: 3, timestamp: "23/01/2026 00:00:00", karigar: "CK", voucherNo: "1722", melting: "92", orderNo: "JF-11479", ghatWeight: 78.25, afterMeenaWeight: 111.94, finishWeight: 0.00, polishLoss: 0.00, type: "Polish Inhouse", serialNo: "", remarks: "", polishBalance: 111.94 },
  { id: 4, timestamp: "23/01/2026 00:00:00", karigar: "CK", voucherNo: "", melting: "92", orderNo: "JF-11477", ghatWeight: 0.00, afterMeenaWeight: 0.00, finishWeight: 0.00, polishLoss: 0.00, type: "Polish Inhouse", serialNo: "", remarks: "", polishBalance: 0.00 },
  { id: 5, timestamp: "13/11/2025 00:00:00", karigar: "PK", voucherNo: "1741", melting: "92", orderNo: "JF-11547", ghatWeight: 39.85, afterMeenaWeight: 0.00, finishWeight: 37.21, polishLoss: 0.15, type: "Bangle Polish", serialNo: "", remarks: "", polishBalance: 2.49 },
];

const MOCK_HISTORY_DATA = [
  { id: 101, timestamp: "10/10/2025 00:00:00", karigar: "RK", voucherNo: "1500", melting: "92", orderNo: "JF-11000", ghatWeight: 15.00, afterMeenaWeight: 0.00, finishWeight: 14.85, polishLoss: 0.05, type: "Bangle Polish", serialNo: "", remarks: "Completed", polishBalance: 0.10, doneDate: "11/10/2025 10:00:00" },
];

export const PolishDetails: React.FC = () => {
  // ── States ───────────────────────────────────────────
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedKarigar, setSelectedKarigar] = useState("All");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // ── Mode States ──
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySearchQuery, setHistorySearchQuery] = useState("");

  // ── Filtering Logic ──────────────────────────────────
  const filteredData = useMemo(() => {
    return MOCK_POLISH_DATA.filter(row => {
      const typeMatch = selectedType === "All" || row.type === selectedType;
      const karigarMatch = selectedKarigar === "All" || row.karigar === selectedKarigar;
      const searchMatch = !searchQuery || 
        row.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.karigar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.serialNo && row.serialNo.toLowerCase().includes(searchQuery.toLowerCase()));
      return typeMatch && karigarMatch && searchMatch;
    });
  }, [selectedType, selectedKarigar, searchQuery]);

  const filteredHistory = useMemo(() => {
    return MOCK_HISTORY_DATA.filter(row => {
        const searchMatch = !historySearchQuery || 
            row.orderNo.toLowerCase().includes(historySearchQuery.toLowerCase()) || 
            row.karigar.toLowerCase().includes(historySearchQuery.toLowerCase());
        return searchMatch;
    });
  }, [historySearchQuery]);

  // ── Stats Calculations ──────────────────────────────
  const activeStats = useMemo(() => {
    const data = isHistoryOpen ? filteredHistory : filteredData;
    return data.reduce((acc, row) => ({
      finish: acc.finish + (row.finishWeight || 0),
      loss: acc.loss + (row.polishLoss || 0),
      ghat: acc.ghat + (row.ghatWeight || 0),
      meena: acc.meena + (row.afterMeenaWeight || 0),
      balance: acc.balance + (row.polishBalance || 0)
    }), { finish: 0, loss: 0, ghat: 0, meena: 0, balance: 0 });
  }, [isHistoryOpen, filteredData, filteredHistory]);

  // ── Handlers ────────────────────────────────────────
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedRows(filteredData.map(r => r.id));
    else setSelectedRows([]);
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleReset = () => {
    setFromDate(""); setToDate(""); setSearchQuery("");
    setSelectedType("All"); setSelectedKarigar("All");
  };

  return (
    <div className="min-h-screen bg-transparent px-2 lg:px-0 pt-2 space-y-4 animate-in fade-in duration-500">
      
      {/* ── Header Section ──────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl transition-all ${isHistoryOpen ? "bg-indigo-50 text-indigo-600" : "bg-purple-50 text-purple-600"}`}>
                {isHistoryOpen ? <History className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1">
                  {isHistoryOpen ? "Polish Audit History" : "Polish Details"}
              </h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                  {isHistoryOpen ? "Review finalized polish declarations" : "Live tracking and loss monitoring system"}
              </p>
            </div>
        </div>

        {/* Professional Stats Row */}
        <div className="flex flex-wrap gap-3">
           {[
             { label: "Finish Wt.", value: activeStats.finish.toFixed(2), color: "text-slate-900" },
             { label: "Polish Loss", value: activeStats.loss.toFixed(2), color: "text-rose-600" },
             { label: "Ghat Wt.", value: activeStats.ghat.toFixed(2), color: "text-slate-900" },
             { label: "After Meena", value: activeStats.meena.toFixed(2), color: "text-indigo-600" },
             { label: "Balance", value: activeStats.balance.toFixed(2), color: "text-purple-600", bg: "bg-purple-50/50" },
           ].map((card, i) => (
             <div key={i} className={`${card.bg || "bg-white"} px-5 py-3 rounded-xl border border-slate-200 flex flex-col justify-center min-w-[130px]`}>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-1.5">{card.label}</span>
                <span className={`text-base font-bold ${card.color} tabular-nums leading-none`}>{card.value}</span>
             </div>
           ))}
        </div>
      </div>

      {/* ── Toolbar ────────────────────────────────────── */}
      <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
          
          {isHistoryOpen ? (
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search history..." 
                    value={historySearchQuery}
                    onChange={e => setHistorySearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-indigo-400 transition-all"
                />
              </div>
          ) : (
              <>
                <div className="flex items-center gap-1.5">
                    <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-purple-400 transition-all w-32" />
                    <span className="text-slate-400 font-bold text-[9px] uppercase">To</span>
                    <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-purple-400 transition-all w-32" />
                    <button onClick={handleReset} className="p-2 text-slate-400 hover:text-slate-600 transition-all"><RotateCcw className="w-4 h-4" /></button>
                </div>
                <div className="h-6 w-px bg-slate-200 mx-1" />
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                        type="text" 
                    placeholder="Search by Order, Karigar, or Serial No..." 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-purple-400 transition-all"
                    />
                </div>
                <div className="h-6 w-px bg-slate-200 mx-1" />
                <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 cursor-pointer" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                    <option value="All">All Types</option>
                    <option value="Bangle Polish">Bangle Polish</option>
                    <option value="Polish Inhouse">Inhouse</option>
                </select>
              </>
          )}

          <div className="flex gap-2 ml-auto">
             <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold uppercase transition-all hover:bg-slate-100">
                <Download className="w-3.5 h-3.5" /> Download
             </button>
             
             {isHistoryOpen ? (
                <button 
                    onClick={() => setIsHistoryOpen(false)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-[11px] font-bold uppercase transition-all hover:bg-slate-800"
                >
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Back to Live
                </button>
             ) : (
                <button 
                    onClick={() => setIsHistoryOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-[11px] font-bold uppercase transition-all hover:bg-slate-50"
                >
                    <History className="w-3.5 h-3.5 text-slate-500" /> History
                </button>
             )}

             <button 
                className={`flex items-center gap-1.5 px-4 py-2 bg-[#9a3412] text-white rounded-lg text-[11px] font-black uppercase transition-all hover:bg-amber-800 disabled:opacity-30 disabled:cursor-not-allowed`} 
                disabled={isHistoryOpen || selectedRows.length === 0}
             >
                <Send className="w-3.5 h-3.5" /> Submit Results
             </button>
          </div>
      </div>

      {/* ── Table Section ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1800px]">
            <thead>
              <tr className="bg-[#fff7ed] text-[#9a3412] border-b border-amber-200">
                {!isHistoryOpen && (
                    <th className="px-6 py-3.5 text-[10px] font-black text-center border-r border-amber-100 w-12 sticky left-0 bg-[#fff7ed] z-20">
                        <input type="checkbox" checked={selectedRows.length === filteredData.length && filteredData.length > 0} onChange={handleSelectAll} className="w-4 h-4 rounded border-amber-300 cursor-pointer" />
                    </th>
                )}
                {[
                  "Timestamp", "Karigar Name", "Voucher No.", "Melting", "Order No.",
                  "Ghat Weight", "After Meena", "Finish Weight", "Polish Loss", 
                  "Type", "Serial No.", "Polish Balance"
                ].map((header, i) => (
                  <th key={header} className={`px-6 py-3.5 text-[10px] font-black text-center border-r border-amber-100 uppercase tracking-widest whitespace-nowrap 
                    ${(i === 3 && !isHistoryOpen) ? "sticky left-12 bg-[#fff7ed] z-20" : ""}
                    ${(i === 4 && !isHistoryOpen) ? "sticky left-[100px] bg-[#fff7ed] z-20" : ""}`}>
                    {header}
                  </th>
                ))}
                {isHistoryOpen && <th className="px-6 py-3.5 text-[10px] font-black text-center uppercase tracking-widest whitespace-nowrap bg-amber-50 text-amber-700">Done Date</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(isHistoryOpen ? filteredHistory : filteredData).map((row, idx) => (
                <tr key={row.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-amber-50 transition-colors`}>
                  {!isHistoryOpen && (
                    <td className="px-6 py-3.5 text-center border-r border-slate-100 sticky left-0 bg-inherit z-10">
                        <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} className="w-4 h-4 rounded border-amber-300 cursor-pointer" />
                    </td>
                  )}
                  <td className="px-6 py-3.5 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100 whitespace-nowrap">{row.timestamp}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100">{row.karigar}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.voucherNo || "-"}</td>
                  <td className={`px-6 py-4 text-[11px] font-black text-[#9a3412] text-center border-r border-slate-100 bg-inherit z-10 ${(idx === 3 && !isHistoryOpen) ? "sticky left-12" : ""}`}>{row.melting}</td>
                  <td className={`px-6 py-4 text-[11px] font-black text-[#9a3412] text-center border-r border-slate-100 bg-inherit z-10 ${(idx === 4 && !isHistoryOpen) ? "sticky left-[100px]" : ""}`}>{row.orderNo}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.ghatWeight.toFixed(2)}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-indigo-600 text-center border-r border-slate-100">{row.afterMeenaWeight.toFixed(2)}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100">{row.finishWeight.toFixed(2)}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-rose-600 text-center border-r border-slate-100">{row.polishLoss.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center border-r border-slate-100">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight ${row.type === "Bangle Polish" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100">{row.serialNo || "-"}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-amber-600 text-center border-r border-slate-100">{row.polishBalance.toFixed(2)}</td>
                  {isHistoryOpen && <td className="px-6 py-4 text-[11px] font-bold text-amber-700 bg-amber-50/20 text-center whitespace-nowrap">{(row as any).doneDate}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Professional Footer */}
        <div className={`px-6 py-2.5 border-t flex items-center justify-between text-slate-500 font-bold uppercase tracking-wider text-[9px] ${isHistoryOpen ? "bg-amber-50/50 border-amber-100" : "bg-amber-50/50 border-amber-200"}`}>
           <div className="flex gap-6">
              <span>Total Polish Records: <span className="text-slate-900">{isHistoryOpen ? filteredHistory.length : filteredData.length}</span></span>
              {!isHistoryOpen && <span>Selected for Submission: <span className="text-slate-900">{selectedRows.length}</span></span>}
           </div>
           <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isHistoryOpen ? "bg-amber-400" : "bg-amber-400"}`} />
                {isHistoryOpen ? "Audit Mode Active" : "Live Polish Monitor"}
           </div>
        </div>
      </div>
    </div>
  );
};
