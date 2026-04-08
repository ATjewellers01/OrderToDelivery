import React, { useState, useMemo } from "react";
import { Search, Filter, RotateCcw, LayoutGrid, List, ChevronRight, Clock, User, Package, Hash, Activity, FileText, CheckCircle, X } from "lucide-react";

// Dummy data for Today dashboard
const todayDummyData = [
  { id: "1", action: "Update", callingDate: "17-02-2026", nextDateOfCall: "18-01-1900", orderNumber: "JF-12954", customerName: "CaratLane Jewellers", categoryName: "BANGLES", melting: "75", weight: "11.52gm - 11.52gm", stage: "First Flw-Up Pending", status: "Metal Issue", karigar: "RK PINTU" },
  { id: "2", action: "Update", callingDate: "16-02-2026", nextDateOfCall: "18-01-1900", orderNumber: "JF-12944", customerName: "CaratLane Jewellers", categoryName: "BANGLES", melting: "75", weight: "11.520gm - 11.52gm", stage: "First Flw-Up Pending", status: "Fle-Up", karigar: "SP" },
  { id: "3", action: "Update", callingDate: "18-02-2026", nextDateOfCall: "18-01-1900", orderNumber: "JF-12980", customerName: "MOTI JEWELLERS", categoryName: "4 PCS BANGLES", melting: "92", weight: "48gm - 48gm", stage: "Chaf Fle-up", status: "Ready", karigar: "SKS" },
  { id: "4", action: "Update", callingDate: "18-02-2026", nextDateOfCall: "06-01-1900", orderNumber: "JF-12979", customerName: "MOTI JEWELLERS", categoryName: "2 PCS BANGLES", melting: "92", weight: "35gm - 35gm", stage: "Ghat Flw-up", status: "Metal Issue", karigar: "SKA" },
];

export const TodayDashboard: React.FC = () => {
  const [hoveredSegment, setHoveredSegment] = useState<{
    chartId: string,
    label: string,
    value: string,
    colorClass: string
  } | null>(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateRemarks, setUpdateRemarks] = useState("");

  const [filters, setFilters] = useState({
    orderNumber: "",
    customerName: "",
    stage: "",
    followUpStatus: "",
    metalStatus: "",
    karigarName: "",
  });

  const handleResetFilters = () => {
    setFilters({
      orderNumber: "",
      customerName: "",
      stage: "",
      followUpStatus: "",
      metalStatus: "",
      karigarName: "",
    });
  };

  const filteredData = useMemo(() => {
    return todayDummyData.filter(item => {
      return (
        (!filters.orderNumber || item.orderNumber.includes(filters.orderNumber)) &&
        (!filters.customerName || item.customerName.toLowerCase().includes(filters.customerName.toLowerCase()))
      );
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* --- Desktop Layout: Original Filters & Charts --- */}
      <div className="hidden lg:grid grid-cols-3 gap-4 h-[320px]">
        {/* Filters Box */}
        <div className="bg-white rounded-xl border-t-4 border-amber-600 shadow-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Filters</h3>
            </div>
            <div className="flex items-center gap-2">
               <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-all border border-amber-200 uppercase tracking-widest shadow-sm"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-xl text-center shadow-md border border-amber-400">
                  <span className="text-lg font-black leading-none block">70</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest opacity-90">Pending today</span>
                </div>
            </div>
          </div>
          
          <div className="p-5 flex-1 grid grid-cols-2 gap-x-4 gap-y-3 overflow-y-auto bg-gray-50/50">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-0.5">Order Number</label>
              <select className="w-full h-8 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 outline-none transition-all appearance-none cursor-pointer">
                <option>Select Options</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-0.5">Customer Name</label>
              <select className="w-full h-8 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 outline-none transition-all appearance-none cursor-pointer">
                <option>Select Options</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-0.5">Stage</label>
              <select className="w-full h-8 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 outline-none transition-all appearance-none cursor-pointer">
                <option>Select Options</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-0.5">Follow up status</label>
              <select className="w-full h-8 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 outline-none transition-all appearance-none cursor-pointer">
                <option>Select Options</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-0.5">Metal Status</label>
              <select className="w-full h-8 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 outline-none transition-all appearance-none cursor-pointer">
                <option>Select Options</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-0.5">Karigar Name</label>
              <select className="w-full h-8 px-3 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 outline-none transition-all appearance-none cursor-pointer">
                <option>Select Options</option>
              </select>
            </div>
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
                  className="stroke-amber-200 fill-none transition-all duration-300 hover:stroke-amber-300 hover:stroke-[14px]" 
                  strokeWidth="12" strokeDasharray="71 251" strokeDashoffset="-180" 
                  onMouseEnter={() => setHoveredSegment({ chartId: 'stage', label: 'Ghat Flw-up', value: '71', colorClass: 'bg-amber-200' })}
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
                  onMouseEnter={() => setHoveredSegment({ chartId: 'status', label: 'Pending', value: '80', colorClass: 'bg-amber-400' })}
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
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"/><span className="text-[8px] font-black text-gray-500 uppercase">First Flw-Up Pending</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-200"/><span className="text-[8px] font-black text-gray-500 uppercase">Flw-Up</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Layout Dashboard (Cards/Stats) --- */}
      <div className="lg:hidden space-y-4 px-2">
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 text-amber-900 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600/70">Pending orders</span>
                <div className="text-4xl font-black mt-1 uppercase tracking-tight text-amber-600">70 Orders</div>
            </div>
            <Clock className="absolute -top-2 -right-2 w-20 h-20 text-amber-200/50 rotate-12" />
        </div>

        
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-black text-gray-900 uppercase">Quick Filter</h3>
            </div>
            <input 
                type="text" 
                placeholder="Search order or customer..." 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:bg-white outline-none transition-all"
            />
        </div>
      </div>

      {/* ── Data section ───────────────────────────────────── */}
      <div className="space-y-4">
        {/* Desktop View Table */}
        <div className="hidden lg:block bg-white rounded-xl border-t-4 border-amber-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1500px]">
              <thead>
                <tr className="bg-[#fff7ed] text-[#9a3412] border-b border-amber-200 uppercase tracking-widest font-black">
                    <th className="px-6 py-4 text-[10px] font-black text-center border-r border-amber-100/30 whitespace-nowrap">Action</th>
                    <th className="px-6 py-4 text-[10px] font-black text-center border-r border-amber-100/30 whitespace-nowrap">Calling Date</th>
                    <th className="px-6 py-4 text-[10px] font-black text-center border-r border-amber-100/30 whitespace-nowrap">Next Date Of Call</th>
                    <th className="px-6 py-4 text-[10px] font-black text-center border-r border-amber-100/30 whitespace-nowrap">Order Number</th>
                    <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Customer Name</th>
                    <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Category Name</th>
                    <th className="px-6 py-4 text-[10px] font-black text-center border-r border-amber-100/30 whitespace-nowrap">Melting</th>
                    <th className="px-6 py-4 text-[10px] font-black text-center border-r border-amber-100/30 whitespace-nowrap">Weight</th>
                    <th className="px-6 py-4 text-[10px] font-black text-center border-r border-amber-100/30 whitespace-nowrap">Total Weight</th>
                    <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Karigar Now</th>
                    <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Order Date</th>
                    <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Karigar Delivery Date</th>
                    <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Delivery Date</th>
                    <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">New Expected Date</th>
                  <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Metal Status</th>
                  <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Metal Paid Date</th>
                  <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Karigar Delivery Date2</th>
                  <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Flw-up Status</th>
                  <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Order Status</th>
                  <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Order Type</th>
                  <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30 text-center whitespace-nowrap">Remarks</th>
                  <th className="px-6 py-4 text-[10px] font-black text-center uppercase tracking-widest whitespace-nowrap">Order Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((row: any, idx: number) => (
                  <tr key={row.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-amber-50 transition-colors group cursor-default`}>
                    <td className="px-6 py-4 whitespace-nowrap text-center border-r border-slate-100">
                      <button 
                        onClick={() => {
                          setSelectedOrder(row);
                          setUpdateStatus("");
                          setUpdateRemarks("");
                          setIsUpdateModalOpen(true);
                        }}
                        className="px-4 py-1.5 bg-[#9a3412] text-white text-[10px] font-black rounded-lg shadow-md shadow-amber-200/50 hover:bg-amber-800 active:scale-95 transition-all uppercase tracking-wider border border-amber-400"
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500 text-center border-r border-slate-100">{row.callingDate}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500 text-center border-r border-slate-100">{row.nextDateOfCall}</td>
                    <td className="px-6 py-4 text-[11px] font-black text-[#9a3412] text-center border-r border-slate-100">{row.orderNumber}</td>
                    <td className="px-6 py-4 text-[11px] font-black text-[#9a3412] border-r border-slate-100 text-center">{row.customerName}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-500 border-r border-gray-100/50 text-center">{row.categoryName}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-900 text-center border-r border-gray-100/50">{row.melting}</td>
                    <td className="px-6 py-4 text-[11px] font-black text-gray-900 text-center border-r border-gray-100/50">{row.weight}</td>
                    <td className="px-6 py-4 text-[11px] font-black text-amber-700 text-center border-r border-gray-100/50">23</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-blue-800 border-r border-gray-100/50 text-center">{row.karigar}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-500 border-r border-gray-100/50 text-center">16-02-2026</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-500 border-r border-gray-100/50 text-center">27-02-2026</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-500 border-r border-gray-100/50 text-center">28-02-2026</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-500 border-r border-gray-100/50 text-center">02-03-2026</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-orange-700 border-r border-gray-100/50 text-center">Metal Paid</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-500 border-r border-gray-100/50 text-center">18-03-2026</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-500 border-r border-gray-100/50 text-center">05-03-2026</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-purple-700 border-r border-gray-100/50 text-center">Pending</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-green-700 border-r border-gray-100/50 text-center">In Progress</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-blue-700 border-r border-gray-100/50 text-center">Regular</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-500 border-r border-gray-100/50 text-center">-</td>
                    <td className="px-6 py-4 text-[11px] font-black text-amber-900 group-hover:text-amber-600 transition-colors uppercase tracking-tight text-center">{row.stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Grid View (Always Cards for mobile) */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
            {filteredData.map((row: any) => (
              <div key={row.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Order No</span>
                    <span className="text-sm font-black text-amber-800">{row.orderNumber}</span>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black rounded-xl border border-amber-100 uppercase tracking-widest">{row.stage}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-50 rounded-xl">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase block leading-none mb-1">Customer</span>
                      <span className="text-xs font-bold text-gray-900 line-clamp-1">{row.customerName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-50 rounded-xl">
                        <Package className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase block leading-none mb-1">Category</span>
                        <span className="text-xs font-bold text-gray-700">{row.categoryName}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-50 rounded-xl">
                        <Hash className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase block leading-none mb-1">Weight</span>
                        <span className="text-xs font-bold text-amber-700">{row.weight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                     <span className="text-[10px] font-black text-gray-400 uppercase">{row.karigar}</span>
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
