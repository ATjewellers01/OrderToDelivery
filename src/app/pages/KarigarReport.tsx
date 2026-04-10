import React, { useState, useMemo } from "react";
import { Search, Filter, RotateCcw, Users, Clock, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

// ── Dummy summary data ───────────────────────────────────
const karigarSummary = [
  { name: "SKA", late: 394, onTime: 38, total: 432, latePercent: "91.20%", ghatWeight: "16397.35", custWeight: "6342.33", stockOrdr: "14830.85", totalWeight: "21173.18", balance: "2304.42", metalIssue: "18868.76" },
  { name: "SP",  late: 175, onTime: 5,  total: 180, latePercent: "97.22%", ghatWeight: "900.60",   custWeight: "926.20",   stockOrdr: "1650.00",  totalWeight: "2576.20",  balance: "0.00",     metalIssue: "2576.20" },
  { name: "SKS", late: 124, onTime: 11, total: 135, latePercent: "91.85%", ghatWeight: "1823.44",  custWeight: "842.77",   stockOrdr: "2570.00",  totalWeight: "3412.77",  balance: "382.00",   metalIssue: "3030.77" },
  { name: "PK",  late: 88,  onTime: 5,  total: 93,  latePercent: "94.62%", ghatWeight: "5215.24",  custWeight: "2390.22",  stockOrdr: "3401.00",  totalWeight: "5791.22",  balance: "473.20",   metalIssue: "5318.02" },
  { name: "JK",  late: 62,  onTime: 23, total: 85,  latePercent: "72.94%", ghatWeight: "2727.94",  custWeight: "356.30",   stockOrdr: "1750.00",  totalWeight: "2106.30",  balance: "31.30",    metalIssue: "2075.00" },
  { name: "PB",  late: 55,  onTime: 17, total: 72,  latePercent: "76.39%", ghatWeight: "854.73",   custWeight: "384.50",   stockOrdr: "45.00",    totalWeight: "429.50",   balance: "5.00",     metalIssue: "424.50" },
  { name: "CK",  late: 44,  onTime: 9,  total: 53,  latePercent: "83.02%", ghatWeight: "6861.53",  custWeight: "4470.16",  stockOrdr: "3700.00",  totalWeight: "8170.16",  balance: "150.00",   metalIssue: "8020.16" },
];

// ── Dummy detail rows ────────────────────────────────────
const karigarDetails = [
  { id:"1", karigar:"ACTION GOLD BMY", orderNo:"JF-11215", client:"ATW LAXMI JEWEL DHARAMGARH", stage:"Complete", type:"Urgent order", category:"BANGLES", melting:"92", weight:"40gm-42gm", orderDate:"06/10/2025", karigarDel:"10/10/2025", custDel:"11/02/2026", expDel:"16/10/2025", jama:"13/10/2025", metalIssue:"08/10/2025", ghat:"42.00", total:"200", qty:"2 PCS", leftDays:-173 },
  { id:"2", karigar:"ACTION GOLD BMY", orderNo:"JF-12054", client:"AT PANDRI",                  stage:"Complete", type:"Customer order", category:"BANGLES", melting:"92", weight:"49gm-50gm", orderDate:"12/12/2025", karigarDel:"20/12/2025", custDel:"27/12/2025", expDel:"31/12/2025", jama:"23/12/2025", metalIssue:"16/12/2025", ghat:"50.00", total:"200", qty:"2 PCS", leftDays:-97 },
  { id:"3", karigar:"AMAR MAJI",       orderNo:"JF-11892", client:"JF SANTOSH JI CL 9330147111",stage:"Complete", type:"Customer order", category:"BANGLES", melting:"92", weight:"41gm-41gm", orderDate:"28/11/2025", karigarDel:"10/12/2025", custDel:"",           expDel:"29/11/2025", jama:"",            metalIssue:"",            ghat:"41.00", total:"2",   qty:"",       leftDays:-115 },
  { id:"4", karigar:"AMAR MAJI",       orderNo:"JF-11891", client:"JF SANTOSH JI CL 9330147111",stage:"Complete", type:"Customer order", category:"BANGLES", melting:"92", weight:"99.46gm",   orderDate:"28/11/2025", karigarDel:"10/12/2025", custDel:"13/12/2025", expDel:"",           jama:"",            metalIssue:"",            ghat:"196.12",total:"12",  qty:"",       leftDays:-115 },
  { id:"5", karigar:"AMAR MAJI",       orderNo:"JF-11889", client:"JF SANTOSH JI",               stage:"",         type:"Customer order", category:"BANGLES", melting:"92", weight:"43.450gm",  orderDate:"28/01/2026", karigarDel:"11/02/2026", custDel:"14/02/2026", expDel:"13/02/2026", jama:"",            metalIssue:"",            ghat:"344.00",total:"16",  qty:"16 PCS", leftDays:-52 },
  { id:"6", karigar:"RK PINTU",        orderNo:"JF-12954", client:"CaratLane Jewellers",          stage:"In Work",  type:"Customer order", category:"BANGLES", melting:"75", weight:"11.52gm",   orderDate:"17/02/2026", karigarDel:"27/02/2026", custDel:"28/02/2026", expDel:"02/03/2026", jama:"",            metalIssue:"08/02/2026",  ghat:"23.00", total:"11",  qty:"1 PCS",  leftDays: 18 },
  { id:"7", karigar:"SP",              orderNo:"JF-12944", client:"CaratLane Jewellers",          stage:"In Work",  type:"Customer order", category:"BANGLES", melting:"75", weight:"11.520gm",  orderDate:"16/02/2026", karigarDel:"27/02/2026", custDel:"28/02/2026", expDel:"01/03/2026", jama:"",            metalIssue:"08/02/2026",  ghat:"23.00", total:"11",  qty:"1 PCS",  leftDays: 20 },
];

const totalDelayOrders  = karigarSummary.reduce((s, r) => s + r.late, 0);
const totalOnTimeOrders = karigarSummary.reduce((s, r) => s + r.onTime, 0);
const totalOrders       = karigarSummary.reduce((s, r) => s + r.total, 0);
const totalGhatWeight   = karigarSummary.reduce((s, r) => s + parseFloat(r.ghatWeight), 0);
const totalWeightAll    = karigarSummary.reduce((s, r) => s + parseFloat(r.totalWeight), 0);

export const KarigarReport: React.FC = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate,   setToDate]   = useState("");
  const [karigarFilter, setKarigarFilter] = useState("All");
  const [stageFilter,   setStageFilter]   = useState("All");
  const [typeFilter,    setTypeFilter]    = useState("All");
  const [statusFilter,  setStatusFilter]  = useState("All");
  const [leftDaysMin,   setLeftDaysMin]   = useState(-500);
  const [leftDaysMax,   setLeftDaysMax]   = useState(100);
  const [detailSearch,  setDetailSearch]  = useState("");
  const [summarySearch, setSummarySearch] = useState("");
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const filteredDetails = useMemo(() => {
    return karigarDetails.filter(row => {
      const kMatch = karigarFilter === "All" || row.karigar === karigarFilter;
      const sMatch = stageFilter   === "All" || row.stage   === stageFilter;
      const tMatch = typeFilter    === "All" || row.type    === typeFilter;
      const dMatch = row.leftDays >= leftDaysMin && row.leftDays <= leftDaysMax;
      
      const searchStr = detailSearch.toLowerCase();
      const searchMatch = !detailSearch || 
          row.karigar.toLowerCase().includes(searchStr) || 
          row.orderNo.toLowerCase().includes(searchStr) || 
          row.client.toLowerCase().includes(searchStr);

      return kMatch && sMatch && tMatch && dMatch && searchMatch;
    });
  }, [karigarFilter, stageFilter, typeFilter, leftDaysMin, leftDaysMax, detailSearch]);

  const filteredSummary = useMemo(() => {
      return karigarSummary.filter(row => {
          const kMatch = karigarFilter === "All" || row.name === karigarFilter;
          const searchStr = summarySearch.toLowerCase();
          const searchMatch = !summarySearch || row.name.toLowerCase().includes(searchStr);
          return kMatch && searchMatch;
      });
  }, [karigarFilter, summarySearch]);

  const handleReset = () => {
    setFromDate(""); setToDate(""); setKarigarFilter("All");
    setStageFilter("All"); setTypeFilter("All"); setStatusFilter("All");
    setLeftDaysMin(-500); setLeftDaysMax(100);
    setDetailSearch(""); setSummarySearch("");
  };

  const delayPct   = Math.round((totalDelayOrders  / totalOrders) * 251);
  const onTimePct  = Math.round((totalOnTimeOrders / totalOrders) * 251);

  const handleDownloadExcel = () => {
    // 1. Prepare Headers and Data for Detail Report
    const detailHeaders = [
      "Karigar Name", "Order Number", "Client Name", "Order Stage", "Order Type",
      "Category Name", "Melting", "Weight", "Order Date", "Karigar Del. Date",
      "Customer Del. Date", "Expected Del. Date", "Jama Date", "Metal Issue Date",
      "Ghat Weight", "Total Weight", "Total Qty", "Left Days"
    ];
    
    const detailRows = filteredDetails.map((r: any) => [
      r.karigar, r.orderNo, r.client, r.stage, r.type,
      r.category, r.melting, r.weight, r.orderDate, r.karigarDel,
      r.custDel, r.expDel, r.jama, r.metalIssue,
      r.ghat, r.total, r.qty, r.leftDays
    ]);

    // 2. Prepare Headers and Data for Summary
    const summaryHeaders = [
      "Karigar Name", "Late", "On Time", "Total", "Late %", 
      "Ghat Weight", "Customer Weight", "Stock Orders", "Total Weight", "Balance", "Metal Issue"
    ];

    const summaryRows = filteredSummary.map((r: any) => [
      r.name, r.late, r.onTime, r.total, r.latePercent,
      r.ghatWeight, r.custWeight, r.stockOrdr, r.totalWeight, r.balance, r.metalIssue
    ]);

    // 3. Combine into CSV String
    let csvContent = "KARIGAR DETAIL REPORT\n";
    csvContent += detailHeaders.join(",") + "\n";
    detailRows.forEach(row => {
      csvContent += row.map((val: any) => `"${val || ""}"`).join(",") + "\n";
    });

    csvContent += "\n\nKARIGAR SUMMARY\n";
    csvContent += summaryHeaders.join(",") + "\n";
    summaryRows.forEach(row => {
      csvContent += row.map((val: any) => `"${val || ""}"`).join(",") + "\n";
    });

    // 4. Trigger Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Karigar_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 pt-1">
      {/* ── Page Title ────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900 uppercase tracking-wider">Karigar Report</h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Order-wise karigar performance &amp; delivery tracking</p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 uppercase tracking-widest">
          <Clock className="w-3.5 h-3.5" /> Live Report
        </div>
      </div>

      {/* ── Stat Cards ────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Delay Orders */}
        <div className="bg-red-50/50 border border-red-100 border-l-4 border-l-red-500 rounded-xl p-4 shadow-sm transition-all hover:shadow-md cursor-default">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1 bg-red-100 rounded-md">
              <TrendingDown className="w-3 h-3 text-red-600" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-red-800/70">Delay Orders</span>
          </div>
          <div className="text-2xl font-black text-red-600">{totalDelayOrders.toLocaleString()}</div>
        </div>

        {/* On Time Orders */}
        <div className="bg-green-50/50 border border-green-100 border-l-4 border-l-green-500 rounded-xl p-4 shadow-sm transition-all hover:shadow-md cursor-default">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1 bg-green-100 rounded-md">
              <CheckCircle className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-green-800/70">On Time Orders</span>
          </div>
          <div className="text-2xl font-black text-green-600">{totalOnTimeOrders.toLocaleString()}</div>
        </div>

        {/* Total Orders */}
        <div className="bg-amber-50/50 border border-amber-100 border-l-4 border-l-amber-500 rounded-xl p-4 shadow-sm transition-all hover:shadow-md cursor-default">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1 bg-amber-100 rounded-md">
              <Users className="w-3 h-3 text-amber-600" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-800/70">Total Orders</span>
          </div>
          <div className="text-2xl font-black text-amber-600">{totalOrders.toLocaleString()}</div>
        </div>

        {/* Total Ghat Weight */}
        <div className="bg-slate-50/50 border border-slate-100 border-l-4 border-l-slate-600 rounded-xl p-4 shadow-sm transition-all hover:shadow-md cursor-default">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1 bg-slate-200 rounded-md">
              <TrendingUp className="w-3 h-3 text-slate-700" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-800/70">Ghat Weight</span>
          </div>
          <div className="text-2xl font-black text-slate-800">{totalGhatWeight.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
        </div>

        {/* Total Weight */}
        <div className="bg-orange-50/50 border border-orange-100 border-l-4 border-l-orange-500 rounded-xl p-4 shadow-sm transition-all hover:shadow-md cursor-default col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1 bg-orange-100 rounded-md">
              <AlertTriangle className="w-3 h-3 text-orange-600" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-orange-800/70">Total Weight</span>
          </div>
          <div className="text-2xl font-black text-orange-600">{totalWeightAll.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
        </div>
      </div>


      {/* ── Filters + Donut (Desktop) ─── */}
      <div className="hidden lg:grid grid-cols-[1fr_320px] gap-4">

        {/* Screenshot-style Filter Form */}
        <div className="bg-white rounded-xl border-t-4 border-amber-600 shadow-xl overflow-hidden">
          {/* Action buttons row */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
            <button 
              onClick={handleDownloadExcel}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-lg shadow-md uppercase tracking-wider transition-all"
            >
              Download Excel
            </button>
            <button onClick={handleReset} className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-all">
              Reset Filters
            </button>
          </div>

          <div className="p-5 space-y-4">
            {/* Date Filter */}
            <div>
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1.5">Date Filter</label>
              <div className="flex items-center gap-3">
                <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                  className="flex-1 h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-amber-400 transition-colors" />
                <span className="text-xs text-gray-400 font-medium">to</span>
                <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                  className="flex-1 h-9 px-3 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-amber-400 transition-colors" />
              </div>
            </div>

            {/* 2-col dropdowns */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-1">Karigar Name</label>
                <div className="relative">
                  <select value={karigarFilter} onChange={e => setKarigarFilter(e.target.value)}
                    className="w-full h-9 px-3 pr-8 bg-white border border-gray-200 rounded-lg text-xs font-medium outline-none appearance-none cursor-pointer focus:border-amber-400">
                    {["All", ...Array.from(new Set(karigarDetails.map(r => r.karigar)))].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-1">Order Stage</label>
                <div className="relative">
                  <select value={stageFilter} onChange={e => setStageFilter(e.target.value)}
                    className="w-full h-9 px-3 pr-8 bg-white border border-gray-200 rounded-lg text-xs font-medium outline-none appearance-none cursor-pointer focus:border-amber-400">
                    {["All", "Complete", "In Work"].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-1">Order Type</label>
                <div className="relative">
                  <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                    className="w-full h-9 px-3 pr-8 bg-white border border-gray-200 rounded-lg text-xs font-medium outline-none appearance-none cursor-pointer focus:border-amber-400">
                    {["All", "Customer order", "Urgent order"].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-1">Karigar Status</label>
                <div className="relative">
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    className="w-full h-9 px-3 pr-8 bg-white border border-gray-200 rounded-lg text-xs font-medium outline-none appearance-none cursor-pointer focus:border-amber-400">
                    {["All", "On Time", "Delay"].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                </div>
              </div>
            </div>

            {/* Left Days + Late Status */}
            <div className="grid grid-cols-2 gap-x-6 items-end">
              <div>
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1.5">Left Days</label>
                <input type="range" min={-500} max={100} value={leftDaysMax}
                  onChange={e => setLeftDaysMax(+e.target.value)}
                  className="w-full h-2 accent-blue-600 cursor-pointer" />
                <div className="flex items-center gap-2 mt-2">
                  <input type="number" value={leftDaysMin} onChange={e => setLeftDaysMin(+e.target.value)}
                    className="w-24 h-8 px-2 border border-gray-200 rounded-lg text-xs text-center outline-none" />
                  <span className="text-xs text-gray-400">to</span>
                  <input type="number" value={leftDaysMax} onChange={e => setLeftDaysMax(+e.target.value)}
                    className="w-24 h-8 px-2 border border-gray-200 rounded-lg text-xs text-center outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1.5">Late Status</label>
                <div className="relative">
                  <select className="w-full h-9 px-3 pr-8 bg-white border border-gray-200 rounded-lg text-xs font-medium outline-none appearance-none cursor-pointer">
                    <option>All</option><option>Late</option><option>On Time</option>
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl border-t-4 border-amber-600 shadow-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 bg-white">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Orders Distribution</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center justify-center">
            <div className="relative w-52 h-52">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Delay Segment */}
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={hoveredSegment === "delay" ? "#ef4444" : "#f87171"}
                  strokeWidth={hoveredSegment === "delay" ? 17 : 14}
                  strokeDasharray={`${delayPct} 251`}
                  style={{ transition: "stroke-width 0.2s, stroke 0.2s", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredSegment("delay")}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
                {/* On Time Segment */}
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={hoveredSegment === "ontime" ? "#16a34a" : "#4ade80"}
                  strokeWidth={hoveredSegment === "ontime" ? 17 : 14}
                  strokeDasharray={`${onTimePct} 251`}
                  strokeDashoffset={`-${delayPct}`}
                  style={{ transition: "stroke-width 0.2s, stroke 0.2s", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredSegment("ontime")}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              </svg>
              {/* Center label — changes on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {hoveredSegment === "delay" ? (
                  <>
                    <span className="text-xl font-black text-red-600">{totalDelayOrders}</span>
                    <span className="text-[9px] font-black text-red-400 uppercase">Delay</span>
                    <span className="text-[9px] font-bold text-gray-400">{Math.round((totalDelayOrders/totalOrders)*100)}%</span>
                  </>
                ) : hoveredSegment === "ontime" ? (
                  <>
                    <span className="text-xl font-black text-green-600">{totalOnTimeOrders}</span>
                    <span className="text-[9px] font-black text-green-500 uppercase">On Time</span>
                    <span className="text-[9px] font-bold text-gray-400">{Math.round((totalOnTimeOrders/totalOrders)*100)}%</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl font-black text-gray-800">{totalOrders}</span>
                    <span className="text-[9px] font-black text-gray-400 uppercase">Total</span>
                  </>
                )}
              </div>
            </div>
            <div className="mt-5 space-y-2.5 w-full">
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all ${hoveredSegment === "delay" ? "bg-red-50 border border-red-200" : "hover:bg-gray-50"}`}
                onMouseEnter={() => setHoveredSegment("delay")}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"/>
                  <span className="text-[10px] font-black text-gray-600 uppercase">Delay Orders</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-black text-red-600">{totalDelayOrders}</span>
                  <span className="text-[9px] text-gray-400 ml-1">({Math.round((totalDelayOrders/totalOrders)*100)}%)</span>
                </div>
              </div>
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all ${hoveredSegment === "ontime" ? "bg-green-50 border border-green-200" : "hover:bg-gray-50"}`}
                onMouseEnter={() => setHoveredSegment("ontime")}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"/>
                  <span className="text-[10px] font-black text-gray-600 uppercase">On Time</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-black text-green-600">{totalOnTimeOrders}</span>
                  <span className="text-[9px] text-gray-400 ml-1">({Math.round((totalOnTimeOrders/totalOrders)*100)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Stat & Filter Cards ─────────────────── */}
      <div className="lg:hidden space-y-3">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-black text-gray-900 uppercase">Quick Filter</h3>
          </div>
          <input type="text" placeholder="Search karigar or order..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-amber-500/20" />
        </div>
      </div>

      {/* ── Detail Table Header & Filter ────────────── */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100 shadow-sm">
                <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Detail Report</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Live order tracking and deadline monitoring</p>
            </div>
        </div>
        <div className="relative w-64 lg:w-80 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-amber-500 transition-colors">
                <Search className="w-4 h-4" />
            </div>
            <input 
                type="text" 
                value={detailSearch}
                onChange={e => setDetailSearch(e.target.value)}
                placeholder="Search Client or Order..." 
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-400/50 transition-all font-mono shadow-sm hover:border-slate-200"
            />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-amber-100 shadow-xl overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse" style={{ minWidth: "1800px" }}>
            <thead>
              <tr className="bg-[#fff7ed] text-[#9a3412] border-b border-amber-200">
                {[
                  "Karigar Name","Order Number","Client Name","Order Stage","Order Type",
                  "Category Name","Melting","Weight","Order Date","Karigar Del. Date",
                  "Customer Del. Date","Expected Del. Date","Jama Date","Metal Issue Date",
                  "Ghat Weight","Total Weight","Total Qty","Left Days"
                ].map(h => (
                  <th key={h} className="px-5 py-4 text-[10px] font-black text-center border-r border-amber-100/30 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDetails.map((row, idx) => (
                <tr key={row.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-amber-50 transition-colors group cursor-default`}>
                  <td className="px-5 py-3 text-[11px] font-black text-[#9a3412] text-center border-r border-slate-100 whitespace-nowrap">{row.karigar}</td>
                  <td className="px-5 py-3 text-[11px] font-black text-[#9a3412] text-center border-r border-slate-100">{row.orderNo}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-800 text-center border-r border-slate-100 whitespace-nowrap">{row.client}</td>
                  <td className="px-5 py-3 text-center border-r border-slate-100">
                    {row.stage ? (
                      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${row.stage === "Complete" ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>{row.stage}</span>
                    ) : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-5 py-3 text-[11px] font-bold text-indigo-700 text-center border-r border-slate-100 whitespace-nowrap">{row.type}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-600 text-center border-r border-slate-100">{row.category}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100">{row.melting}</td>
                  <td className="px-5 py-3 text-[11px] font-black text-slate-900 text-center border-r border-slate-100 whitespace-nowrap">{row.weight}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-400 text-center border-r border-slate-100">{row.orderDate}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-400 text-center border-r border-slate-100">{row.karigarDel}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-400 text-center border-r border-slate-100">{row.custDel || "—"}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-400 text-center border-r border-slate-100">{row.expDel || "—"}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-400 text-center border-r border-slate-100">{row.jama || "—"}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-orange-600 text-center border-r border-slate-100">{row.metalIssue || "—"}</td>
                  <td className="px-5 py-3 text-[11px] font-black text-amber-700 text-center border-r border-slate-100">{row.ghat}</td>
                  <td className="px-5 py-3 text-[11px] font-black text-slate-800 text-center border-r border-slate-100">{row.total}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-indigo-800 text-center border-r border-slate-100">{row.qty || "—"}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`text-[11px] font-black ${row.leftDays < 0 ? "text-red-600" : "text-green-600"}`}>{row.leftDays}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden p-3 space-y-4 bg-slate-50/50">
          {filteredDetails.map((row) => (
            <div key={row.id} className="p-4 bg-white rounded-2xl border border-amber-200 shadow-md border-l-4 border-l-amber-500 space-y-3 transition-transform active:scale-[0.98]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-black text-[#9a3412] uppercase tracking-wider">{row.karigar}</span>
                <span className="text-[10px] font-black text-slate-400 tracking-widest">{row.orderNo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-800">{row.client}</span>
                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${row.stage === "Complete" ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>{row.stage || "N/A"}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-slate-400 uppercase leading-none tracking-widest block">Order Type</span>
                  <span className="text-[11px] font-bold text-indigo-700 block">{row.type}</span>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-[9px] font-black text-slate-400 uppercase leading-none tracking-widest block">Weight</span>
                  <span className="text-[11px] font-black text-slate-900 block">{row.weight}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-50">
                <div className="text-center">
                  <span className="text-[8px] font-black text-slate-400 uppercase block">Ghat</span>
                  <span className="text-[10px] font-black text-amber-700">{row.ghat}</span>
                </div>
                <div className="text-center">
                  <span className="text-[8px] font-black text-slate-400 uppercase block">Qty</span>
                  <span className="text-[10px] font-bold text-indigo-800">{row.qty || "—"}</span>
                </div>
                <div className="text-center">
                  <span className="text-[8px] font-black text-slate-400 uppercase block">Days</span>
                  <span className={`text-[11px] font-black ${row.leftDays < 0 ? "text-red-600" : "text-green-600"}`}>{row.leftDays}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase">Order Date</span>
                  <span className="text-[10px] font-bold text-slate-500">{row.orderDate}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[8px] font-black text-slate-400 uppercase">Expected Del.</span>
                  <span className="text-[10px] font-bold text-slate-500">{row.expDel || "—"}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredDetails.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">No details found</div>
          )}
        </div>
      </div>

      {/* ── Karigar Summary Table Header & Filter ─────── */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm">
                <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Karigar Summary</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Aggregated performance and weight calculation</p>
            </div>
        </div>
        <div className="relative w-64 lg:w-80 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-500 transition-colors">
                <Search className="w-4 h-4" />
            </div>
            <input 
                type="text" 
                value={summarySearch}
                onChange={e => setSummarySearch(e.target.value)}
                placeholder="Search Karigar Name..." 
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400/50 transition-all font-mono shadow-sm hover:border-slate-200"
            />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-amber-100 shadow-xl overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fff7ed] text-[#9a3412] border-b border-amber-200">
                {["Karigar Name","Late","On Time","Total","Late %","Ghat Weight","Customer Weight","Stock Orders","Total Weight","Balance","Metal Issue"].map(h => (
                  <th key={h} className="px-5 py-3 text-[10px] font-black text-center border-r border-amber-100/50 whitespace-nowrap uppercase tracking-widest leading-tight">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSummary.map((row, idx) => (
                <tr key={row.name} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-amber-50 transition-colors`}>
                  <td className="px-5 py-3 text-[11px] font-black text-[#9a3412] text-center border-r border-slate-100">{row.name}</td>
                  <td className="px-5 py-3 text-[11px] font-black text-red-600 text-center border-r border-slate-100">{row.late}</td>
                  <td className="px-5 py-3 text-[11px] font-black text-green-600 text-center border-r border-slate-100">{row.onTime}</td>
                  <td className="px-5 py-3 text-[11px] font-black text-slate-800 text-center border-r border-slate-100">{row.total}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-orange-600 text-center border-r border-slate-100">{row.latePercent}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.ghatWeight}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.custWeight}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.stockOrdr}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.totalWeight}</td>
                  <td className="px-5 py-3 text-[11px] font-bold text-slate-600 text-center border-r border-slate-100">{row.balance}</td>
                  <td className="px-5 py-3 text-[11px] font-black text-amber-700 text-center">{row.metalIssue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Summary Card View */}
        <div className="lg:hidden p-3 space-y-4 bg-slate-50/50 font-mono">
          {filteredSummary.map((row) => (
            <div key={row.name} className="p-4 bg-white rounded-2xl border border-blue-200 shadow-md border-l-4 border-l-blue-500 space-y-3 transition-transform active:scale-[0.98]">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-black text-[#9a3412] uppercase tracking-wider">{row.name}</span>
                <span className="text-[11px] font-bold text-orange-600">Late: {row.latePercent}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2 bg-slate-50/50 rounded-xl px-3 border border-slate-100">
                <div className="text-center">
                  <span className="text-[8px] font-black text-slate-400 uppercase block">Late</span>
                  <span className="text-[11px] font-black text-red-600">{row.late}</span>
                </div>
                <div className="text-center">
                  <span className="text-[8px] font-black text-slate-400 uppercase block">On Time</span>
                  <span className="text-[11px] font-black text-green-600">{row.onTime}</span>
                </div>
                <div className="text-center">
                  <span className="text-[8px] font-black text-slate-400 uppercase block">Total</span>
                  <span className="text-[11px] font-black text-slate-800">{row.total}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Ghat Wt</span>
                  <span className="text-[10px] font-bold text-slate-700">{row.ghatWeight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Total Wt</span>
                  <span className="text-[10px] font-bold text-slate-700">{row.totalWeight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Cust Wt</span>
                  <span className="text-[10px] font-bold text-slate-700">{row.custWeight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Balance</span>
                  <span className="text-[10px] font-bold text-slate-600">{row.balance}</span>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-50 border-dashed">
                <span className="text-[9px] font-black text-slate-400 uppercase">Metal Issue</span>
                <span className="text-[11px] font-black text-amber-700">{row.metalIssue}</span>
              </div>
            </div>
          ))}
          {filteredSummary.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">No summary data found</div>
          )}
        </div>
      </div>
    </div>
  );
};
