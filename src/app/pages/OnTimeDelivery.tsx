import React, { useState, useMemo } from "react";
import { 
  Search, Download, Filter, Calendar, User, Users,
  Layers, Activity, Clock, TrendingUp, TrendingDown, 
  CheckCircle, AlertCircle, ChevronDown
} from "lucide-react";
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

// ── Dummy Data ───────────────────────────────────────────

const orderTypeData = [
  { name: "Customer Order", value: 860, color: "#ef4444" },
  { name: "Stock Order",    value: 258, color: "#22c55e" },
  { name: "Urgent Order",   value: 229, color: "#3b82f6" },
];

const orderStageData = [
  { name: "Complete", value: 1100, color: "#ef4444" },
  { name: "Undefined", value: 39, color: "#f97316" },
  { name: "Ready for Delivery", value: 44, color: "#eab308" },
  { name: "Receipt Department", value: 37, color: "#84cc16" },
  { name: "Final Flw-up Pending", value: 35, color: "#22c55e" },
  { name: "Received in Stock", value: 21, color: "#10b981" },
  { name: "Metal Issue", value: 53, color: "#06b6d4" },
  { name: "Meena Inhouse", value: 2, color: "#3b82f6" },
  { name: "Flw-Up", value: 7, color: "#6366f1" },
  { name: "Bangle Polish", value: 3, color: "#8b5cf6" },
  { name: "QC-2", value: 1, color: "#a855f7" },
  { name: "Polish Inhouse", value: 1, color: "#d946ef" },
];

const karigarSummary = [
  { name: "Ska", late: 394, onTime: 38, total: 432, latePct: "91.2%", avgTime: "7.5 days" },
  { name: "Sp",  late: 175, onTime: 5,  total: 180, latePct: "97.2%", avgTime: "7.2 days" },
  { name: "Sks", late: 124, onTime: 11, total: 135, latePct: "91.9%", avgTime: "9.5 days" },
  { name: "Pk",  late: 88,  onTime: 5,  total: 93,  latePct: "94.6%", avgTime: "7.5 days" },
];

const deliveryData = [
  { 
    orderNo: "JF-01", delay: -197, karigarDelay: -150, expDelDate: "20/12/2021", isLate: "Yes", type: "Customer Order", 
    stockInDate: "24/12/2021", stockDays: "4", prodTime: "35 days", metalIssue: "15/11/2021", flwUp: "Ok", 
    qc1: "Pass", meenaIn: "-", meenaOut: "-", polishIn: "Ok", polishOut: "-", qc2: "Pass", qc3: "Pass", 
    rd: "Ok", huid: "SI-552", kStatus: "Delay", readyDispatch: "Yes", stockIn: "Yes", delivery: "Pending", 
    ghatWt: "2.550", kLateStatus: "Late", finishTime: "2 days", banglePolish: "-", 
    stage: "Complete", client: "Botivate Demo", category: "Jhumki", melting: "92", 
    weight: "9gm - 10gm", totalWt: "2.5", qty: "1 FAIR", karigar: "Rk Pintu", 
    orderDate: "16/11/2021", delDate: "26/11/2021", kDate: "23/12/2021" 
  },
  { 
    orderNo: "JF-9615", delay: -280, karigarDelay: -220, expDelDate: "15/07/2023", isLate: "Yes", type: "Stock Order", 
    stockInDate: "18/07/2023", stockDays: "3", prodTime: "12 days", metalIssue: "05/07/2023", flwUp: "Ok", 
    qc1: "Pass", meenaIn: "Done", meenaOut: "-", polishIn: "Ok", polishOut: "-", qc2: "Pass", qc3: "Pass", 
    rd: "Ok", huid: "SI-992", kStatus: "On Time", readyDispatch: "Yes", stockIn: "Yes", delivery: "Delivered", 
    ghatWt: "40.120", kLateStatus: "On Time", finishTime: "1 day", banglePolish: "Done", 
    stage: "Complete", client: "New Lado Jew", category: "Plaster Bangle", melting: "84", 
    weight: "35gm - 40gm", totalWt: "40", qty: "2 PCS", karigar: "Sp", 
    orderDate: "10/07/2023", delDate: "21/07/2023", kDate: "17/07/2023" 
  },
];

const TABLE_COL_HEADERS = [
  "Order Number", "Delivery Late (Days)", "Karigar Delay Days", "Expected Delivery Date", "Is Delivery Late", 
  "Order Type", "Stock In Date", "Stock Days", "Production Time", "Metal Issue Date", 
  "Flw-up", "QC1", "Meena Inhouse", "Meena Outside", "Polish Inhouse", 
  "Polish Outside", "Qc-2", "Qc-3", "RD", "Huid/Label", 
  "Karigar Status", "Ready For Dispatch", "Stock In", "Delivery", "Ghat Weight", 
  "Karigar Late Status", "Finishing Time", "Bangle Polish", "Order Stage", "Client Name", 
  "Category Name", "Melting", "Weight", "Total Weight", "Total Quantity", 
  "Karigar Name", "Order Date", "Delivery Date", "Karigar Date"
];

export const OnTimeDelivery: React.FC = () => {
  const [search, setSearch] = useState("");

  const handleExportExcel = () => {
    // 1. Prepare Detailed Report
    const deliveryRows = deliveryData.map(r => [
      r.orderNo, r.delay, r.karigarDelay, r.expDelDate, r.isLate,
      r.type, r.stockInDate, r.stockDays, r.prodTime, r.metalIssue,
      r.flwUp, r.qc1, r.meenaIn, r.meenaOut, r.polishIn,
      r.polishOut, r.qc2, r.qc3, r.rd, r.huid,
      r.kStatus, r.readyDispatch, r.stockIn, r.delivery, r.ghatWt,
      r.kLateStatus, r.finishTime, r.banglePolish, r.stage, r.client,
      r.category, r.melting, r.weight, r.totalWt, r.qty,
      r.karigar, r.orderDate, r.delDate, r.kDate
    ]);

    // 2. Prepare Efficiency Ranking
    const efficiencyHeaders = ["Karigar", "Late", "On Time", "Total", "Late %", "Avg time"];
    const efficiencyRows = karigarSummary.map(r => [
      r.name, r.late, r.onTime, r.total, r.latePct, r.avgTime
    ]);

    // 3. Combine into CSV
    let csvContent = "ON-TIME DELIVERY DETAILED REPORT\n";
    csvContent += TABLE_COL_HEADERS.join(",") + "\n";
    deliveryRows.forEach(row => {
      csvContent += row.map(val => `"${val || ""}"`).join(",") + "\n";
    });

    csvContent += "\n\nKARIGAR EFFICIENCY RANKING\n";
    csvContent += efficiencyHeaders.join(",") + "\n";
    efficiencyRows.forEach(row => {
      csvContent += row.map(val => `"${val || ""}"`).join(",") + "\n";
    });

    // 4. Trigger Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `OnTime_Delivery_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-transparent space-y-4 pt-1">
      {/* ── Top Section: Filters + Insights ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_750px] gap-6 px-2">
        
        {/* Left: Filters Panel */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-2 bg-gradient-to-r from-amber-500/5 to-transparent">
            <Filter className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Dashboard Filters</h3>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {/* Standard Filters */}
            {[
              { label: "Order Number", icon: Search },
              { label: "Client Name", icon: Search },
              { label: "Karigar Status", type: "select" },
              { label: "Order Type", type: "select" },
              { label: "Order Stage", type: "select" },
              { label: "Karigar Name", type: "select" },
            ].map((f) => (
              <div key={f.label} className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{f.label}</label>
                <div className="relative group">
                  {f.type === "select" ? (
                    <>
                      <select className="w-full h-10 px-3 pr-10 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-amber-400 focus:bg-white appearance-none cursor-pointer">
                        <option>Select {f.label}...</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                    </>
                  ) : (
                    <>
                      <input type="text" placeholder="Search..." className="w-full h-10 pl-3 pr-10 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-amber-400 focus:bg-white transition-all" />
                      {f.icon && <f.icon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-amber-500 transition-colors" />}
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Left Days Slider */}
            <div className="col-span-1 md:col-span-2 space-y-3 pt-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Left Days Range</label>
              <div className="relative h-2 bg-slate-100 rounded-full flex items-center">
                <div className="absolute h-full bg-amber-500 rounded-full left-0 right-1/4 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                <div className="absolute left-0 w-4 h-4 bg-white border-2 border-amber-500 rounded-full shadow-sm cursor-pointer" />
                <div className="absolute right-1/4 w-4 h-4 bg-white border-2 border-amber-500 rounded-full shadow-sm cursor-pointer translate-x-1/2" />
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">From</span>
                  <input type="number" defaultValue={-497} className="w-20 h-8 px-2 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">to</span>
                  <input type="number" defaultValue={17} className="w-20 h-8 px-2 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none" />
                </div>
              </div>
            </div>

            {/* Late Status */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Late Status</label>
              <div className="relative">
                <select className="w-full h-10 px-3 pr-10 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black outline-none focus:border-amber-400 focus:bg-white appearance-none cursor-pointer">
                  <option>All Status</option>
                  <option className="text-red-500">Late Only</option>
                  <option className="text-green-500">On Time Only</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Insights Panel */}
        <div className="space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:h-[280px]">
            {/* Order Type Chart */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col min-h-[280px] md:min-h-0 md:h-full overflow-hidden">
              <div className="flex items-center gap-2 mb-2 px-1">
                <div className="w-1 h-3 bg-amber-500 rounded-full" />
                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Order Portfolio</h4>
              </div>
              <div className="flex-1 min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={orderTypeData} 
                      cx="50%" 
                      cy="40%" 
                      innerRadius={window.innerWidth < 768 ? 35 : 42} 
                      outerRadius={window.innerWidth < 768 ? 55 : 65} 
                      paddingAngle={4} 
                      dataKey="value" 
                      stroke="none"
                    >
                      {orderTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '10px' }} />
                    <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={6} formatter={(value) => <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide ml-1">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Order Stage Chart */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col min-h-[300px] md:min-h-0 md:h-full overflow-hidden">
              <div className="flex items-center gap-2 mb-2 px-1">
                <div className="w-1 h-3 bg-amber-500 rounded-full" />
                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Production Stages</h4>
              </div>
              <div className="flex-1 flex flex-col md:flex-row min-h-0">
                {/* Visual Chart */}
                <div className="w-full md:w-[55%] h-[180px] md:h-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={orderStageData} 
                        cx="50%" 
                        cy="45%" 
                        innerRadius={window.innerWidth < 768 ? 40 : 42} 
                        outerRadius={window.innerWidth < 768 ? 60 : 65} 
                        paddingAngle={2} 
                        dataKey="value" 
                        stroke="none"
                      >
                        {orderStageData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '9px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Scrollable List */}
                <div className="w-full md:w-[45%] h-[120px] md:h-full overflow-y-auto custom-scrollbar md:pl-2 py-1 border-t md:border-t-0 md:border-l border-slate-50 mt-2 md:mt-0">
                  <div className="space-y-1.5 flex flex-col">
                    {orderStageData.map((entry, index) => (
                      <div key={index} className="flex items-start gap-1.5 group">
                        <div className="w-1.5 h-1.5 mt-0.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                        <div className="min-w-0">
                          <div className="text-[8px] font-black text-slate-700 uppercase tracking-tighter truncate leading-tight group-hover:text-amber-600">
                            {entry.name}
                          </div>
                          <div className="text-[7px] font-bold text-slate-400 tabular-nums">
                            {entry.value} Items
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Karigar Summary Table */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Efficiency Ranking</h4>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              {/* Desktop View */}
              <table className="hidden lg:table w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#fff7ed] text-[#9a3412] border-b border-amber-200">
                    <th className="px-6 py-2.5 text-[9px] font-black uppercase tracking-widest border-r border-amber-100/50">Karigar</th>
                    <th className="px-4 py-2.5 text-[9px] font-black text-center text-red-500 border-r border-amber-100/50 uppercase tracking-widest">Late</th>
                    <th className="px-4 py-2.5 text-[9px] font-black text-center text-green-500 border-r border-amber-100/50 uppercase tracking-widest">On Time</th>
                    <th className="px-4 py-2.5 text-[9px] font-black text-center border-r border-amber-100/50 uppercase tracking-widest text-slate-800">Total</th>
                    <th className="px-4 py-2.5 text-[9px] font-black text-center border-r border-amber-100/50 uppercase tracking-widest text-slate-800">Late %</th>
                    <th className="px-6 py-2.5 text-[9px] font-black text-right uppercase tracking-widest text-slate-800">Avg time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {karigarSummary.map((row) => (
                    <tr key={row.name} className="hover:bg-amber-50 transition-all cursor-default group">
                      <td className="px-6 py-2.5 text-[11px] font-black text-[#9a3412] uppercase border-r border-slate-100">{row.name}</td>
                      <td className="px-4 py-2.5 text-[11px] font-black text-red-500 text-center border-r border-slate-100">{row.late}</td>
                      <td className="px-4 py-2.5 text-[11px] font-black text-green-500 text-center border-r border-slate-100">{row.onTime}</td>
                      <td className="px-4 py-2.5 text-[11px] font-black text-slate-800 text-center border-r border-slate-100">{row.total}</td>
                      <td className="px-4 py-2.5 text-[11px] font-black text-red-700 text-center border-r border-slate-100">{row.latePct}</td>
                      <td className="px-6 py-2.5 text-[11px] font-bold text-slate-400 text-right italic">{row.avgTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Card View */}
              <div className="lg:hidden p-4 space-y-4 bg-slate-50/30">
                {karigarSummary.map((row) => (
                  <div key={row.name} className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm border-l-4 border-l-blue-500 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-black text-[#9a3412] uppercase">{row.name}</span>
                      <span className="text-[10px] font-black text-blue-600 uppercase">Avg: {row.avgTime}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center bg-red-50 p-2 rounded-xl border border-red-100">
                        <span className="text-[8px] font-black text-red-400 uppercase block">Late</span>
                        <span className="text-[11px] font-black text-red-600">{row.late}</span>
                      </div>
                      <div className="text-center bg-green-50 p-2 rounded-xl border border-green-100">
                        <span className="text-[8px] font-black text-green-400 uppercase block">On Time</span>
                        <span className="text-[11px] font-black text-green-700">{row.onTime}</span>
                      </div>
                      <div className="text-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Total</span>
                        <span className="text-[11px] font-black text-slate-800">{row.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Detailed Report Table ───────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden mx-4">
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 bg-white">
          <div className="relative max-w-md w-full">
            <input type="text" placeholder="Filter overall data..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-amber-400 focus:bg-white transition-all shadow-inner" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-5 py-2.5">
              <Activity className="w-4 h-4 text-amber-600" />
              <div className="text-left">
                <div className="text-[9px] font-black text-amber-600/60 uppercase">System Records</div>
                <div className="text-xs font-black text-amber-700 tracking-tight">1,347 Entries</div>
              </div>
            </div>
            <button 
              onClick={handleExportExcel}
              className="flex items-center gap-2.5 px-7 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-wider shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border-t-4 border-amber-800 shadow-2xl overflow-hidden relative">
          <div className="hidden lg:block overflow-x-auto max-h-[60vh] custom-scrollbar">
            <table className="w-full text-left border-collapse table-auto relative">
                <thead className="sticky top-0 z-20 transition-all">
                  <tr className="bg-slate-100 text-slate-800 uppercase tracking-widest border-b border-slate-200">
                    {TABLE_COL_HEADERS.map((h, i) => (
                      <th key={h} className={`px-6 py-4 text-[10px] font-black whitespace-nowrap text-center border-r border-slate-200/30 ${i === 0 ? "sticky left-0 bg-slate-100 z-10" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveryData.map((row, idx) => (
                <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-amber-50/40 transition-all`}>
                  <td className="px-5 py-4 text-[11px] font-black text-amber-600 border-r border-slate-100 text-center sticky left-0 bg-inherit z-10">{row.orderNo}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-red-500 border-r border-slate-100 text-center">{row.delay}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-orange-600 border-r border-slate-100 text-center">{row.karigarDelay}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100 text-center">{row.expDelDate}</td>
                  <td className={`px-5 py-4 text-[11px] font-black border-r border-slate-100 text-center ${row.isLate === "Yes" ? "text-red-500" : "text-green-500"}`}>{row.isLate}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-600 border-r border-slate-100 text-center">{row.type}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-400 border-r border-slate-100 text-center">{row.stockInDate}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-slate-700 border-r border-slate-100 text-center">{row.stockDays}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100 text-center">{row.prodTime}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-400 border-r border-slate-100 text-center">{row.metalIssue}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-amber-700 border-r border-slate-100 text-center">{row.flwUp}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-green-600 border-r border-slate-100 text-center">{row.qc1}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100 text-center">{row.meenaIn}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100 text-center">{row.meenaOut}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100 text-center">{row.polishIn}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100 text-center">{row.polishOut}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-green-600 border-r border-slate-100 text-center">{row.qc2}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-green-600 border-r border-slate-100 text-center">{row.qc3}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-slate-700 border-r border-slate-100 text-center">{row.rd}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-indigo-600 border-r border-slate-100 text-center italic">{row.huid}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-red-500 border-r border-slate-100 text-center">{row.kStatus}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-green-600 border-r border-slate-100 text-center">{row.readyDispatch}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-emerald-600 border-r border-slate-100 text-center">{row.stockIn}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-blue-600 border-r border-slate-100 text-center">{row.delivery}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-slate-800 border-r border-slate-100 text-center">{row.ghatWt}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-red-600 border-r border-slate-100 text-center">{row.kLateStatus}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-400 border-r border-slate-100 text-center italic">{row.finishTime}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100 text-center">{row.banglePolish}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100 text-center">{row.stage}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-800 border-r border-slate-100 whitespace-nowrap">{row.client}</td>
                  <td className="px-5 py-4 text-[11px] font-medium text-slate-400 border-r border-slate-100 text-center uppercase">{row.category}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-slate-600 border-r border-slate-100 text-center">{row.melting}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-400 border-r border-slate-100 text-center whitespace-nowrap">{row.weight}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-slate-800 border-r border-slate-100 text-center">{row.totalWt}</td>
                  <td className="px-5 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100 text-center uppercase whitespace-nowrap">{row.qty}</td>
                  <td className="px-5 py-4 text-[11px] font-black text-amber-700 border-r border-slate-100 uppercase whitespace-nowrap">{row.karigar}</td>
                  <td className="px-5 py-4 text-[11px] font-medium text-slate-400 border-r border-slate-100 text-center">{row.orderDate}</td>
                  <td className="px-5 py-4 text-[11px] font-medium text-slate-400 border-r border-slate-100 text-center">{row.delDate}</td>
                  <td className="px-5 py-4 text-[11px] font-medium text-slate-400 text-center">{row.kDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden p-4 space-y-4 bg-slate-50/50">
            {deliveryData.map((row, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-amber-200 shadow-md border-l-4 border-l-amber-500 space-y-3 transition-transform active:scale-[0.98]">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-black text-amber-600 uppercase tracking-wider">{row.orderNo}</span>
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${row.isLate === "Yes" ? "bg-red-50 text-red-600 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"}`}>
                    {row.isLate === "Yes" ? "Late" : "On Time"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800">{row.client}</span>
                  <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{row.stage}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase leading-none tracking-widest block">Type</span>
                    <span className="text-[11px] font-bold text-indigo-700 block whitespace-nowrap overflow-hidden text-ellipsis">{row.type}</span>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-[9px] font-black text-slate-400 uppercase leading-none tracking-widest block">Exp Del</span>
                    <span className="text-[11px] font-black text-slate-900 block">{row.expDelDate}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2 bg-slate-50/50 rounded-xl px-2 border border-slate-100">
                  <div className="text-center">
                    <span className="text-[8px] font-black text-slate-400 uppercase block">Total Delay</span>
                    <span className="text-[10px] font-black text-red-600">{row.delay}d</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[8px] font-black text-slate-400 uppercase block">K-Delay</span>
                    <span className="text-[10px] font-black text-orange-600">{row.karigarDelay}d</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[8px] font-black text-slate-400 uppercase block">Prod Time</span>
                    <span className="text-[10px] font-black text-slate-800">{row.prodTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase">Karigar Name</span>
                    <span className="text-[10px] font-black text-amber-700 uppercase">{row.karigar}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] font-black text-slate-400 uppercase">Current Wt</span>
                    <span className="text-[10px] font-bold text-slate-900">{row.totalWt}g</span>
                  </div>
                </div>
              </div>
            ))}
            {deliveryData.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">No detailed records found</div>
            )}
          </div>
        </div>
        
        <div className="p-6 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Displaying 2 of 1,347 entries</div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase rounded-xl border border-slate-200 hover:bg-white hover:text-amber-500 transition-all">Prior</button>
            <button className="px-4 py-2 bg-amber-500 text-white text-[10px] font-black uppercase rounded-xl shadow-md shadow-amber-100">1</button>
            <button className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase rounded-xl border border-slate-200 hover:bg-white hover:text-amber-500 transition-all">2</button>
            <button className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase rounded-xl border border-slate-200 hover:bg-white hover:text-amber-500 transition-all">Next</button>
          </div>
        </div>
        </div>
      </div>
  );
};
