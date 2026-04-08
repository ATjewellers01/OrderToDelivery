import React, { useState, useMemo } from "react";
import { 
  Search, Filter, RotateCcw, Download, History, Send, 
  ChevronDown, Calendar, Users, Zap, Hash, MessageSquare,
  CheckCircle2, Clock, Calculator, Weight, X
} from "lucide-react";

// ── Mock Data ───────────────────────────────────────────
const MOCK_MEENA_DATA = [
  { id: 1, timestamp: "05/11/2025 00:00:00", karigar: "SK", voucherNo: "1491", melting: "92", orderNo: "JF-10300", ghatWeight: 96.52, chillaiWeight: 0, meenaReceived: 1, serialNo: "", remarks: "", type: "Meena Inhouse" },
  { id: 2, timestamp: "23/01/2026 00:00:00", karigar: "PK", voucherNo: "1", melting: "92", orderNo: "JF-11383", ghatWeight: 1, chillaiWeight: 0, meenaReceived: 0, serialNo: "", remarks: "", type: "Meena Outside" },
  { id: 3, timestamp: "20/11/2025 00:00:00", karigar: "CK", voucherNo: "1722", melting: "92", orderNo: "JF-11479", ghatWeight: 78.25, chillaiWeight: 0, meenaReceived: 111.94, serialNo: "", remarks: "", type: "Meena Inhouse" },
  { id: 4, timestamp: "05/11/2025 00:00:00", karigar: "PK", voucherNo: "1656", melting: "92", orderNo: "JF-11466", ghatWeight: 63.44, chillaiWeight: 0, meenaReceived: 63.86, serialNo: "", remarks: "", type: "Meena Inhouse" },
  { id: 5, timestamp: "27/11/2025 00:00:00", karigar: "RK", voucherNo: "1855", melting: "84", orderNo: "JF-11447", ghatWeight: 120.58, chillaiWeight: 0, meenaReceived: 61.79, serialNo: "", remarks: "", type: "Meena Inhouse" },
  { id: 6, timestamp: "24/11/2025 00:00:00", karigar: "SKA", voucherNo: "1795", melting: "92", orderNo: "JF-11696", ghatWeight: 16.61, chillaiWeight: 0, meenaReceived: 16.67, serialNo: "", remarks: "1", type: "Meena Inhouse" },
  { id: 7, timestamp: "04/12/2025 00:00:00", karigar: "SKA", voucherNo: "1795", melting: "92", orderNo: "JF-11750", ghatWeight: 16.61, chillaiWeight: 0, meenaReceived: 0, serialNo: "", remarks: "", type: "Meena Inhouse" },
  { id: 8, timestamp: "26/12/2025 00:00:00", karigar: "PK", voucherNo: "2005", melting: "92", orderNo: "JF-11881", ghatWeight: 53.57, chillaiWeight: 0, meenaReceived: 55.03, serialNo: "", remarks: "", type: "Meena Inhouse" },
  { id: 9, timestamp: "18/12/2025 00:00:00", karigar: "JK", voucherNo: "2006", melting: "84", orderNo: "JF-11896", ghatWeight: 217.59, chillaiWeight: 0, meenaReceived: 220.04, serialNo: "", remarks: "", type: "Meena Inhouse" },
  { id: 10, timestamp: "23/12/2025 00:00:00", karigar: "JP", voucherNo: "2015", melting: "92", orderNo: "JF-11986", ghatWeight: 30.17, chillaiWeight: 0, meenaReceived: 28.61, serialNo: "", remarks: "", type: "Meena Inhouse" },
];

const MOCK_HISTORY_DATA = [
  { id: 101, timestamp: "20/08/2025 00:00:00", karigar: "SKS", voucherNo: "2430", melting: "84", orderNo: "JF-9752", ghatWeight: 163.98, chillaiWeight: 0, meenaReceived: 164.84, serialNo: "", remarks: "", type: "Meena Inhouse", doneDate: "30/01/2025 12:49:48" },
  { id: 102, timestamp: "15/08/2025 00:00:00", karigar: "AK", voucherNo: "2425", melting: "92", orderNo: "JF-9740", ghatWeight: 45.20, chillaiWeight: 0.1, meenaReceived: 45.80, serialNo: "SN-001", remarks: "Final Call", type: "Meena Inhouse", doneDate: "30/01/2025 10:15:22" },
];

export const MeenaDetails: React.FC = () => {
  // ── States ───────────────────────────────────────────
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedKarigar, setSelectedKarigar] = useState("All");
  const [selectedMelting, setSelectedMelting] = useState("All");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // ── History States ──
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySearchQuery, setHistorySearchQuery] = useState("");
  const [historyFromDate, setHistoryFromDate] = useState("");
  const [historyToDate, setHistoryToDate] = useState("");

  // ── Filtering Logic ──────────────────────────────────
  const filteredData = useMemo(() => {
    return MOCK_MEENA_DATA.filter(row => {
      const typeMatch = selectedType === "All" || row.type === selectedType;
      const karigarMatch = selectedKarigar === "All" || row.karigar === selectedKarigar;
      const meltingMatch = selectedMelting === "All" || row.melting === selectedMelting;
      const searchMatch = !searchQuery || 
        row.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.karigar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.voucherNo.toLowerCase().includes(searchQuery.toLowerCase());
      
      return typeMatch && karigarMatch && meltingMatch && searchMatch;
    });
  }, [selectedType, selectedKarigar, selectedMelting, searchQuery]);

  // ── Stats Calculations ──────────────────────────────
  const stats = useMemo(() => {
    return filteredData.reduce((acc, current) => ({
      chillai: acc.chillai + current.chillaiWeight,
      received: acc.received + current.meenaReceived,
      ghat: acc.ghat + current.ghatWeight,
      meena: acc.meena + (current.meenaReceived - current.ghatWeight)
    }), { chillai: 0, received: 0, ghat: 0, meena: 0 });
  }, [filteredData]);

  const filteredHistory = useMemo(() => {
    return MOCK_HISTORY_DATA.filter(row => {
        const searchMatch = !historySearchQuery || 
            row.orderNo.toLowerCase().includes(historySearchQuery.toLowerCase()) || 
            row.karigar.toLowerCase().includes(historySearchQuery.toLowerCase());
        return searchMatch;
    });
  }, [historySearchQuery]);

  const historyStats = useMemo(() => {
      return filteredHistory.reduce((acc, current) => ({
          chillai: acc.chillai + current.chillaiWeight,
          received: acc.received + current.meenaReceived,
          ghat: acc.ghat + current.ghatWeight,
          meena: acc.meena + (current.meenaReceived - current.ghatWeight)
      }), { chillai: 0, received: 0, ghat: 0, meena: 0 });
  }, [filteredHistory]);

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
    setSelectedType("All"); setSelectedKarigar("All"); setSelectedMelting("All");
  };

  const handleResetHistory = () => {
      setHistoryFromDate(""); setHistoryToDate(""); setHistorySearchQuery("");
  };

  return (
    <div className="min-h-screen bg-transparent px-2 lg:px-0 pt-2 space-y-4 animate-in fade-in duration-500">
      
      {/* ── Header Section ──────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl transition-all ${isHistoryOpen ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600"}`}>
                {isHistoryOpen ? <History className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1">
                  {isHistoryOpen ? "Submission History" : "Meena Details"}
              </h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                  {isHistoryOpen ? "Audit trail of finalized declarations" : "Live tracking and weight monitor"}
              </p>
            </div>
        </div>

        {/* Professional Stats Row */}
        <div className="flex flex-wrap gap-3">
           {[
             { label: "Chillai W.", value: (isHistoryOpen ? historyStats.chillai : stats.chillai).toFixed(2), color: "text-slate-900", bg: "bg-white" },
             { label: "Received", value: (isHistoryOpen ? historyStats.received : stats.received).toFixed(2), color: "text-slate-900", bg: "bg-white" },
             { label: "Ghat Jama", value: (isHistoryOpen ? historyStats.ghat : stats.ghat).toFixed(2), color: "text-slate-900", bg: "bg-white" },
             { label: "Net Meena", value: (isHistoryOpen ? historyStats.meena : stats.meena).toFixed(2), color: isHistoryOpen ? "text-indigo-600" : "text-amber-600", bg: isHistoryOpen ? "bg-indigo-50/30" : "bg-amber-50/30" },
           ].map((card, i) => (
             <div key={i} className={`${card.bg} px-5 py-3 rounded-xl border border-slate-200 flex flex-col justify-center min-w-[140px]`}>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-1.5">{card.label}</span>
                <span className={`text-base font-bold ${card.color} tabular-nums leading-none`}>{card.value}</span>
             </div>
           ))}
        </div>
      </div>

      {/* ── Toolbar ────────────────────────────────────── */}
      <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
          
          {isHistoryOpen ? (
              <div className="flex items-center gap-3 flex-1 min-w-[300px]">
                <div className="flex items-center gap-1.5">
                    <input type="date" value={historyFromDate} onChange={e => setHistoryFromDate(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-indigo-400 transition-all w-32" />
                    <span className="text-slate-400 font-bold text-[9px] uppercase">To</span>
                    <input type="date" value={historyToDate} onChange={e => setHistoryToDate(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-indigo-400 transition-all w-32" />
                    <button onClick={handleResetHistory} className="p-2 text-slate-400 hover:text-slate-600 transition-all"><RotateCcw className="w-4 h-4" /></button>
                </div>
                <div className="h-6 w-px bg-slate-200 mx-1" />
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
              </div>
          ) : (
              <>
                <div className="flex items-center gap-1.5">
                    <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-amber-400 transition-all w-32" />
                    <span className="text-slate-400 font-bold text-[9px] uppercase">To</span>
                    <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-amber-400 transition-all w-32" />
                    <button onClick={handleReset} className="p-2 text-slate-400 hover:text-slate-600 transition-all"><RotateCcw className="w-4 h-4" /></button>
                </div>
                <div className="h-6 w-px bg-slate-200 mx-1" />
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search sequence, karigar..." 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-amber-400 transition-all"
                    />
                </div>
                <div className="h-6 w-px bg-slate-200 mx-1" />
                <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 outline-none hover:border-amber-400 transition-all cursor-pointer" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                    <option value="All">All Types</option>
                    <option value="Meena Inhouse">Inhouse</option>
                    <option value="Meena Outside">Outside</option>
                </select>
                <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 outline-none hover:border-amber-400 transition-all cursor-pointer" value={selectedKarigar} onChange={e => setSelectedKarigar(e.target.value)}>
                    <option value="All">All Karigars</option>
                    {Array.from(new Set(MOCK_MEENA_DATA.map(r => r.karigar))).map(k => <option key={k} value={k}>{k}</option>)}
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
                    <History className="w-3.5 h-3.5 text-slate-500" /> View History
                </button>
             )}

             <button 
                className={`flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white rounded-lg text-[11px] font-bold uppercase transition-all hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed`} 
                disabled={isHistoryOpen || selectedRows.length === 0}
             >
                <Send className="w-3.5 h-3.5" /> Submit Results
             </button>
          </div>
      </div>

      {/* ── Table Section ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1600px]">
            <thead>
              <tr className="bg-slate-50/80 text-slate-900 border-b border-slate-200">
                {!isHistoryOpen && (
                    <th className="px-6 py-3.5 text-[10px] font-bold text-center border-r border-slate-200/60 w-12 sticky left-0 bg-slate-50">
                        <input type="checkbox" checked={selectedRows.length === filteredData.length && filteredData.length > 0} onChange={handleSelectAll} className="w-3.5 h-3.5 rounded border-slate-300 transition-all cursor-pointer" />
                    </th>
                )}
                {[
                  "Timestamp", "Karigar", "Voucher", "Melting", "Order No",
                  "Ghat", "Chillai", "Received", "Meena Wt.", 
                  "Serial", "Remarks", "Mode"
                ].map((header, i) => (
                  <th key={header} className={`px-6 py-3.5 text-[10px] font-bold text-center border-r border-slate-200/60 uppercase tracking-widest whitespace-nowrap ${(i === 3 && !isHistoryOpen) ? "sticky left-12 bg-slate-50" : ""}`}>
                    {header}
                  </th>
                ))}
                {isHistoryOpen && <th className="px-6 py-3.5 text-[10px] font-bold text-center uppercase tracking-widest whitespace-nowrap bg-indigo-50/50 text-indigo-700">Done Date</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(isHistoryOpen ? filteredHistory : filteredData).map((row, idx) => (
                <tr key={row.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-slate-50 transition-colors`}>
                  {!isHistoryOpen && (
                    <td className="px-6 py-3.5 text-center border-r border-slate-100 sticky left-0 bg-inherit shadow-[1px_0_0_rgb(226,232,240)]">
                        <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} className="w-3.5 h-3.5 rounded border-slate-300 transition-all cursor-pointer" />
                    </td>
                  )}
                  <td className="px-6 py-3.5 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100 whitespace-nowrap">{row.timestamp}</td>
                  <td className="px-6 py-3.5 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100">{row.karigar}</td>
                  <td className="px-6 py-3.5 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.voucherNo}</td>
                  <td className={`px-6 py-3.5 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100 bg-inherit shadow-[1px_0_0_rgb(226,232,240)] ${(idx === 3 && !isHistoryOpen) ? "sticky left-12" : ""}`}>{row.melting}</td>
                  <td className="px-6 py-3.5 text-[11px] font-bold text-indigo-600 text-center border-r border-slate-100">{row.orderNo}</td>
                  <td className="px-6 py-3.5 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.ghatWeight.toFixed(2)}</td>
                  <td className="px-6 py-3.5 text-[11px] font-bold text-amber-600 text-center border-r border-slate-100">{row.chillaiWeight.toFixed(2)}</td>
                  <td className="px-6 py-3.5 text-[11px] font-bold text-indigo-600 text-center border-r border-slate-100">{row.meenaReceived.toFixed(2)}</td>
                  <td className={`px-6 py-3.5 text-[11px] font-bold text-center border-r border-slate-100 ${(row.meenaReceived - row.ghatWeight) < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                    {(row.meenaReceived - row.ghatWeight).toFixed(2)}
                  </td>
                  <td className="px-6 py-3.5 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100">{row.serialNo || "-"}</td>
                  <td className="px-6 py-3.5 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 truncate max-w-[120px]">{row.remarks || "-"}</td>
                  <td className="px-6 py-3.5 text-center border-r border-slate-100">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight ${row.type === "Meena Inhouse" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-indigo-50 text-indigo-700 border border-indigo-100"}`}>
                      {row.type.split(" ")[1]}
                    </span>
                  </td>
                  {isHistoryOpen && <td className="px-6 py-3.5 text-[11px] font-bold text-indigo-700 bg-indigo-50/20 text-center whitespace-nowrap">{(row as any).doneDate}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Professional Footer */}
        <div className={`px-6 py-2.5 border-t flex items-center justify-between text-slate-500 font-bold uppercase tracking-wider text-[9px] ${isHistoryOpen ? "bg-indigo-50/50 border-indigo-100" : "bg-slate-50/50 border-slate-200"}`}>
           <div className="flex gap-6">
              <span>Total Rows: <span className="text-slate-900">{isHistoryOpen ? filteredHistory.length : filteredData.length}</span></span>
              {!isHistoryOpen && <span>Selected: <span className="text-slate-900">{selectedRows.length}</span></span>}
           </div>
           <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isHistoryOpen ? "bg-indigo-400" : "bg-emerald-400"}`} />
                {isHistoryOpen ? "Audited Stream" : "Live Processing"}
           </div>
        </div>
      </div>
    </div>
  );
};
