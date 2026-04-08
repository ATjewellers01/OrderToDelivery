import React, { useState, useMemo } from "react";
import { Search, Filter, RotateCcw, LayoutGrid, List, ChevronRight, Clock, User, Package, Hash, Activity, FileText, CheckCircle, X, TrendingUp, Users } from "lucide-react";

// Dummy data for Total dashboard
const totalDummyData = [
  { 
    id: "1", 
    callingDate: "31-12-2025", 
    nextDateOfCall: "07-02-1900", 
    orderNumber: "JF-12302", 
    customerName: "Atplus mumbai", 
    categoryName: "BABY BANGLE", 
    melting: "75", 
    weight: "6gm - 8gm", 
    totalQty: "2 PCS", 
    karigarNow: "Ska", 
    orderDate: "15-12-2025", 
    karigarDelDate: "20-12-2025", 
    delDate: "25-12-2025", 
    newExpDate: "05-01-2026", 
    metalStatus: "Metal Paid", 
    metalPaidDate: "16-12-2025", 
    stage: "Production", 
    flwUpStatus: "In Process", 
    orderStatus: "In Process", 
    type: "Customer Order", 
    remarks: "Pending for polishing" 
  },
  { 
    id: "2", 
    callingDate: "07-02-2026", 
    nextDateOfCall: "12-01-1900", 
    orderNumber: "JF-12794", 
    customerName: "ATW VIJIT BARADIA", 
    categoryName: "CHOKER SET", 
    melting: "84", 
    weight: "6gm - 20gm", 
    totalQty: "1 SET", 
    karigarNow: "Sp", 
    orderDate: "01-02-2026", 
    karigarDelDate: "05-02-2026", 
    delDate: "10-02-2026", 
    newExpDate: "15-02-2026", 
    metalStatus: "Metal Paid", 
    metalPaidDate: "02-02-2026", 
    stage: "QC", 
    flwUpStatus: "Pending", 
    orderStatus: "In QC", 
    type: "Stock Order", 
    remarks: "Checking for stones" 
  },
];

const TABLE_HEADERS = [
  "Action", "Calling Date", "Next Date Of Call", "Order Number", "Customer Name", 
  "Category Name", "Melting", "Weight", "Total Quantity", "Karigar Now", 
  "Order Date", "Karigar Delivery Date", "Delivery Date", "New Expected Date", 
  "Metal Status", "Metal Paid Date", "Order Stage", "Follow-up Status", 
  "Order Status", "Order Type", "Remarks"
];

export const TotalDashboard: React.FC = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateRemarks, setUpdateRemarks] = useState("");
  const [hoveredSegment, setHoveredSegment] = useState<{
    chartId: string,
    label: string,
    value: string,
    colorClass: string
  } | null>(null);

  return (
    <div className="space-y-6">
      {/* --- Desktop Layout: Original Filters & 3 Charts --- */}
      <div className="hidden lg:grid grid-cols-4 gap-4 h-[350px]">
        {/* Filters Box */}
        <div className="bg-white rounded-xl border-t-4 border-amber-600 shadow-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Filters</h3>
            </div>
            <div className="flex items-center gap-2">
               <button className="flex items-center gap-1 px-2.5 py-1 text-[8px] font-black text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 uppercase tracking-widest shadow-sm">
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
                <div className="bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-lg text-center shadow-sm">
                  <span className="text-base font-black leading-none block text-amber-600">113</span>
                  <span className="text-[7px] font-black uppercase tracking-widest text-amber-600/70">Total Orders</span>
                </div>
            </div>
          </div>
          
          <div className="p-4 flex-1 grid grid-cols-2 gap-x-3 gap-y-3 overflow-y-auto bg-gray-50/50">
            {[ "Customer Name", "Category Name", "Order Stage", "Karigar Name", "Order Status", "Follow-up Status"].map(label => (
                <div key={label} className="space-y-0.5">
                    <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest pl-0.5">{label}</label>
                    <select className="w-full h-7 px-2 bg-white border border-gray-200 rounded-md text-[10px] font-medium outline-none appearance-none cursor-pointer">
                        <option>Select Options</option>
                    </select>
                </div>
            ))}
          </div>
        </div>

        {/* Order Stage Chart */}
        <div className="bg-white rounded-xl border-t-4 border-amber-600 shadow-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center bg-white gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Order Stage</h3>
          </div>
          <div className="p-4 flex-1 flex flex-col items-center justify-center group/chart relative">
            <div className="relative w-36 h-36 cursor-pointer transition-all duration-500 transform group-hover/chart:scale-105 group-hover/chart:rotate-3">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-md">
                <circle 
                  cx="50" cy="50" r="40" 
                  className="stroke-amber-500 fill-none transition-all duration-300 hover:stroke-amber-600 hover:stroke-[14px]" 
                  strokeWidth="12" strokeDasharray="180 251" 
                  onMouseEnter={() => setHoveredSegment({ chartId: 'stage', label: 'First Flw-Up Pending', value: '180', colorClass: 'bg-amber-500' })}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
                <circle 
                  cx="50" cy="50" r="40" 
                  className="stroke-amber-100 fill-none transition-all duration-300 hover:stroke-amber-200 hover:stroke-[14px]" 
                  strokeWidth="12" strokeDasharray="71 251" strokeDashoffset="-180" 
                  onMouseEnter={() => setHoveredSegment({ chartId: 'stage', label: 'Ghat Flw-up', value: '71', colorClass: 'bg-amber-100' })}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              </svg>
            </div>

            {/* Tooltip */}
            {hoveredSegment?.chartId === 'stage' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 z-50 pointer-events-none animate-in fade-in zoom-in duration-200 flex items-center gap-2 min-w-max">
                <div className={`w-2 h-2 rounded-full ${hoveredSegment.colorClass}`} />
                <span className="text-[10px] font-black text-gray-800">{hoveredSegment.label} : {hoveredSegment.value}</span>
              </div>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"/><span className="text-[8px] font-black text-gray-500 uppercase">First Flw-Up Pending</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-200"/><span className="text-[8px] font-black text-gray-500 uppercase">Ghat Flw-up</span></div>
            </div>
          </div>
        </div>

        {/* Order Status Chart */}
        <div className="bg-white rounded-xl border-t-4 border-amber-600 shadow-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center bg-white gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Order Status</h3>
          </div>
          <div className="p-4 flex-1 flex flex-col items-center justify-center group/chart relative">
            <div className="relative w-36 h-36 cursor-pointer transition-all duration-500 transform group-hover/chart:scale-105 group-hover/chart:-rotate-3">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-md">
                    <circle 
                      cx="50" cy="50" r="40" 
                      className="stroke-orange-500 fill-none transition-all duration-300 hover:stroke-orange-600 hover:stroke-[14px]" 
                      strokeWidth="12" strokeDasharray="100 251" 
                      onMouseEnter={() => setHoveredSegment({ chartId: 'status', label: 'Metal Issue', value: '100', colorClass: 'bg-orange-500' })}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                    <circle 
                      cx="50" cy="50" r="40" 
                      className="stroke-amber-400 fill-none transition-all duration-300 hover:stroke-amber-500 hover:stroke-[14px]" 
                      strokeWidth="12" strokeDasharray="80 251" strokeDashoffset="-100" 
                      onMouseEnter={() => setHoveredSegment({ chartId: 'status', label: 'Receipt Dept', value: '80', colorClass: 'bg-amber-400' })}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                    <circle 
                      cx="50" cy="50" r="40" 
                      className="stroke-amber-200 fill-none transition-all duration-300 hover:stroke-amber-300 hover:stroke-[14px]" 
                      strokeWidth="12" strokeDasharray="71 251" strokeDashoffset="-180" 
                      onMouseEnter={() => setHoveredSegment({ chartId: 'status', label: 'Flw-Up', value: '71', colorClass: 'bg-amber-200' })}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                </svg>
            </div>

            {/* Tooltip */}
            {hoveredSegment?.chartId === 'status' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 z-50 pointer-events-none animate-in fade-in zoom-in duration-200 flex items-center gap-2 min-w-max">
                <div className={`w-2 h-2 rounded-full ${hoveredSegment.colorClass}`} />
                <span className="text-[10px] font-black text-gray-800">{hoveredSegment.label} : {hoveredSegment.value}</span>
              </div>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-2">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"/><span className="text-[8px] font-black text-gray-500 uppercase">Metal Issue</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"/><span className="text-[8px] font-black text-gray-500 uppercase">Receipt Dept</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-200"/><span className="text-[8px] font-black text-gray-500 uppercase">Flw-Up</span></div>
            </div>
          </div>
        </div>

        {/* Order Type Chart */}
        <div className="bg-white rounded-xl border-t-4 border-amber-600 shadow-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center bg-white gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Order Type</h3>
          </div>
          <div className="p-4 flex-1 flex flex-col items-center justify-center group/chart relative">
            <div className="relative w-36 h-36 cursor-pointer transition-all duration-500 transform group-hover/chart:scale-105 group-hover/chart:rotate-6">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-md">
                    <circle 
                      cx="50" cy="50" r="40" 
                      className="stroke-amber-500 fill-none transition-all duration-300 hover:stroke-amber-600 hover:stroke-[14px]" 
                      strokeWidth="12" strokeDasharray="180 251" 
                      onMouseEnter={() => setHoveredSegment({ chartId: 'type', label: 'Customer', value: '180', colorClass: 'bg-amber-500' })}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                    <circle 
                      cx="50" cy="50" r="40" 
                      className="stroke-orange-400 fill-none transition-all duration-300 hover:stroke-orange-500 hover:stroke-[14px]" 
                      strokeWidth="12" strokeDasharray="40 251" strokeDashoffset="-180" 
                      onMouseEnter={() => setHoveredSegment({ chartId: 'type', label: 'Urgent', value: '40', colorClass: 'bg-orange-400' })}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                    <circle 
                      cx="50" cy="50" r="40" 
                      className="stroke-orange-200 fill-none transition-all duration-300 hover:stroke-orange-300 hover:stroke-[14px]" 
                      strokeWidth="12" strokeDasharray="31 251" strokeDashoffset="-220" 
                      onMouseEnter={() => setHoveredSegment({ chartId: 'type', label: 'Stock', value: '31', colorClass: 'bg-orange-200' })}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                </svg>
            </div>

            {/* Tooltip */}
            {hoveredSegment?.chartId === 'type' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 z-50 pointer-events-none animate-in fade-in zoom-in duration-200 flex items-center gap-2 min-w-max">
                <div className={`w-2 h-2 rounded-full ${hoveredSegment.colorClass}`} />
                <span className="text-[10px] font-black text-gray-800">{hoveredSegment.label} : {hoveredSegment.value}</span>
              </div>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"/><span className="text-[8px] font-black text-gray-500 uppercase">Customer</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400"/><span className="text-[8px] font-black text-gray-500 uppercase">Urgent</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-200"/><span className="text-[8px] font-black text-gray-500 uppercase">Stock</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Layout Dash --- */}
      <div className="lg:hidden grid grid-cols-2 gap-3 px-2">
        <div className="bg-white rounded-3xl p-5 shadow-lg border-b-4 border-amber-500 flex flex-col items-center text-center">
            <TrendingUp className="w-6 h-6 text-amber-600 mb-2" />
            <span className="text-[10px] font-black text-gray-400 uppercase">Total Orders</span>
            <div className="text-2xl font-black text-gray-900 leading-none mt-1">113</div>
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-lg border-b-4 border-amber-500 flex flex-col items-center text-center">
            <Package className="w-6 h-6 text-amber-600 mb-2" />
            <span className="text-[10px] font-black text-gray-400 uppercase">Categories</span>
            <div className="text-2xl font-black text-gray-900 leading-none mt-1">24</div>
        </div>
      </div>

      {/* ── Data section ───────────────────────────────────── */}
      <div className="space-y-4">
        {/* Desktop View Table */}
        <div className="hidden lg:block bg-white rounded-xl border-t-4 border-amber-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse table-auto min-w-max">
                    <thead className="sticky top-0 z-20">
                        <tr className="bg-[#fff7ed] text-[#9a3412] uppercase tracking-widest border-b border-amber-200">
                            {TABLE_HEADERS.map((h, i) => (
                              <th key={h} className={`px-6 py-4 text-[10px] font-black whitespace-nowrap text-center border-r border-amber-100/30 ${i <= 2 ? "sticky left-0 bg-[#fff7ed] z-10" : ""}`} style={i <= 2 ? { left: i === 0 ? 0 : i === 1 ? 100 : 200 } : {}}>
                                {h}
                              </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {totalDummyData.map((row, idx) => (
                            <tr key={row.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-amber-50 transition-colors group cursor-default shadow-sm`}>
                                <td className="px-6 py-4 whitespace-nowrap text-center border-r border-slate-100 sticky left-0 bg-inherit z-10" style={{ left: 0 }}>
                                    <button 
                                      onClick={() => {
                                        setSelectedOrder(row);
                                        setUpdateStatus("");
                                        setUpdateRemarks("");
                                        setIsUpdateModalOpen(true);
                                      }}
                                      className="px-4 py-1.5 bg-[#9a3412] text-white text-[10px] font-black rounded-lg shadow-md hover:bg-amber-800 transition-all uppercase tracking-wider border border-amber-400"
                                    >
                                      Update
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-[11px] font-bold text-slate-500 text-center border-r border-slate-100 sticky left-0 bg-inherit z-10" style={{ left: 100 }}>{row.callingDate}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-slate-500 text-center border-r border-slate-100 sticky left-0 bg-inherit z-10" style={{ left: 200 }}>{row.nextDateOfCall}</td>
                                
                                <td className="px-6 py-4 text-[11px] font-black text-[#9a3412] text-center border-r border-slate-100">{row.orderNumber}</td>
                                <td className="px-6 py-4 text-[11px] font-black text-[#9a3412] border-r border-slate-100 text-center">{row.customerName}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100 text-center uppercase">{row.categoryName}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100 tabular-nums">{row.melting}</td>
                                <td className="px-6 py-4 text-[11px] font-black text-gray-900 text-center border-r border-gray-100/50 whitespace-nowrap">{row.weight}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-gray-900 text-center border-r border-gray-100/50 whitespace-nowrap tabular-nums">{row.totalQty}</td>
                                <td className="px-6 py-4 text-[11px] font-black text-amber-700 text-center border-r border-gray-100/50 uppercase">{row.karigarNow}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-gray-500 text-center border-r border-gray-100/50 tabular-nums">{row.orderDate}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-gray-500 text-center border-r border-gray-100/50 tabular-nums">{row.karigarDelDate}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-gray-500 text-center border-r border-gray-100/50 tabular-nums">{row.delDate}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-blue-600 text-center border-r border-gray-100/50 tabular-nums font-black italic">{row.newExpDate}</td>
                                <td className="px-6 py-4 text-[11px] font-black text-orange-700 text-center border-r border-gray-100/50 uppercase tracking-tighter">{row.metalStatus}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-gray-400 text-center border-r border-gray-100/50 tabular-nums">{row.metalPaidDate}</td>
                                <td className="px-6 py-4 text-[11px] font-black text-amber-900 text-center border-r border-gray-100/50 uppercase tracking-tighter">{row.stage}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-slate-500 text-center border-r border-gray-100/50 whitespace-nowrap font-black">{row.flwUpStatus}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-slate-500 text-center border-r border-gray-100/50 whitespace-nowrap font-black">{row.orderStatus}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-slate-400 text-center border-r border-gray-100/50 italic">{row.type}</td>
                                <td className="px-6 py-4 text-[11px] font-medium text-slate-400 truncate max-w-[200px]">{row.remarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Mobile Grid View */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
            {totalDummyData.map(row => (
                <div key={row.id} className="bg-white rounded-3xl border border-gray-100 p-5 shadow-lg border-b-4 border-b-amber-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Order No</span>
                    <span className="text-sm font-black text-amber-800">{row.orderNumber}</span>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black rounded-xl border border-amber-100 uppercase tracking-widest">{row.stage}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-50 rounded-xl"><User className="w-4 h-4 text-gray-400" /></div>
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase block leading-none mb-1">Customer</span>
                      <span className="text-xs font-bold text-gray-900 line-clamp-1">{row.customerName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-50 rounded-xl"><Package className="w-4 h-4 text-gray-400" /></div>
                      <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase block leading-none mb-1">Category</span>
                        <span className="text-xs font-bold text-gray-700">{row.categoryName}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-50 rounded-xl"><Hash className="w-4 h-4 text-amber-400" /></div>
                      <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase block leading-none mb-1">Weight</span>
                        <span className="text-xs font-bold text-amber-700">{row.weight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-end">
                     <button 
                        onClick={() => {
                          setSelectedOrder(row);
                          setUpdateStatus("");
                          setUpdateRemarks("");
                          setIsUpdateModalOpen(true);
                        }}
                        className="px-5 py-2 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-amber-200"
                      >
                        Update
                     </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* --- Refined Update Modal --- */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-400">
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-md overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
            {/* Light Professional Header */}
            <div className="bg-amber-50/50 px-6 py-4 flex items-center justify-between relative border-b border-amber-100">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-amber-600 uppercase tracking-[0.2em] mb-0.5">Status Update</span>
                <h3 className="text-slate-900 text-lg font-black tracking-tight leading-none">
                  Order: <span className="text-amber-600">{selectedOrder?.orderNumber}</span>
                </h3>
              </div>
              <button 
                onClick={() => setIsUpdateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-amber-100 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-all active:scale-90 shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simple Form Body */}
            <div className="p-6 space-y-5 bg-white">
              {/* Status Select Field */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-0.5">
                    <Activity className="w-3 h-3 text-amber-500" />
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Current Stage</label>
                </div>
                <div className="relative group">
                  <select 
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-400/50 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select Status</option>
                    <option value="work-started">Work Started</option>
                    <option value="not-started">Not Started</option>
                    <option value="change-karigar">Change Karigar And Dates</option>
                    <option value="ghat-jama-done">Ghat Jama Flw-up Done</option>
                    <option value="finished-jama">Finished Jama</option>
                    <option value="order-cancel">Order Cancel</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-focus-within:text-amber-500 transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Remarks Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-0.5">
                    <FileText className="w-3 h-3 text-amber-500" />
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Follow-up Remarks</label>
                </div>
                <textarea 
                  value={updateRemarks}
                  onChange={(e) => setUpdateRemarks(e.target.value)}
                  placeholder="Type important order notes here..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-400/50 focus:bg-white transition-all min-h-[120px] resize-none placeholder:text-slate-300 leading-relaxed shadow-inner"
                />
              </div>
            </div>

            {/* Clean Footer */}
            <div className="px-6 py-4 bg-white flex items-center justify-end gap-3 border-t border-slate-50">
                <button 
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="px-5 py-2.5 text-slate-500 bg-slate-50 hover:bg-slate-100 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all active:scale-95 shadow-sm border border-slate-100"
                >
                    Cancel
                </button>
                <button 
                    onClick={() => {
                    console.log("Submitting:", { id: selectedOrder.id, updateStatus, updateRemarks });
                    setIsUpdateModalOpen(false);
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-amber-200 transition-all active:scale-95"
                >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Submit
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
