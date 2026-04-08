import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

export const OrderDetails = () => {
  const [data, setData] = useState(() => {
    const localData = localStorage.getItem('ordersDataV3');
    if (localData) return JSON.parse(localData);
    return [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [karigarFilter, setKarigarFilter] = useState("All Karigars");
  const [meltingFilter, setMeltingFilter] = useState("All Meltings");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [dateFilter, setDateFilter] = useState("");


  const categories: string[] = useMemo(() => ["All Categories", ...(Array.from(new Set(data.map((d: any) => String(d.categoryName)))) as string[])], [data]);
  const karigars: string[] = useMemo(() => ["All Karigars", ...(Array.from(new Set(data.map((d: any) => String(d.karigarName)))) as string[])], [data]);
  const meltings: string[] = useMemo(() => ["All Meltings", ...(Array.from(new Set(data.map((d: any) => String(d.melting)))) as string[])], [data]);
  const types: string[] = useMemo(() => ["All Types", ...(Array.from(new Set(data.map((d: any) => String(d.orderType)))) as string[])], [data]);

  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      const matchesSearch = Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCategory = categoryFilter === "All Categories" || item.categoryName === categoryFilter;
      const matchesKarigar = karigarFilter === "All Karigars" || item.karigarName === karigarFilter;
      const matchesMelting = meltingFilter === "All Meltings" || item.melting === meltingFilter;
      const matchesType = typeFilter === "All Types" || item.orderType === typeFilter;
      const matchesDate = !dateFilter || item.orderDate === dateFilter;

      return matchesSearch && matchesCategory && matchesKarigar && matchesMelting && matchesType && matchesDate;
    });
  }, [data, searchTerm, categoryFilter, karigarFilter, meltingFilter, typeFilter, dateFilter]);

  const headers = [
    { name: "Serial No.", stickyContext: "left-0", width: "w-[100px] min-w-[100px] max-w-[100px]" },
    { name: "Order Number", stickyContext: "left-[100px]", width: "w-[160px] min-w-[160px] max-w-[160px]" },
    { name: "Customer Name" },
    { name: "Category Name" },
    { name: "Melting" },
    { name: "Weight" },
    { name: "Total Quantity" },
    { name: "Karigar Name" },
    { name: "Order Date" },
    { name: "Karigar Delivery Date" },
    { name: "Delivery Date" },
    { name: "Expected Delivery Date" },
    { name: "Left Days" },
    { name: "Order Type" },
    { name: "Order Stage" },
    { name: "Karigar Notes" },
    { name: "Total Weight" },
    { name: "Live Left Days" }
  ];

  return (
    <div className="h-full flex flex-col relative w-full overflow-hidden">
      {/* ── Control Bar: Search & Filters ── */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4 flex-shrink-0 w-full">
        <div className="flex flex-row items-center gap-2 w-full lg:flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 shadow-sm transition-all text-sm"
            />
          </div>
          {/* Mobile item count */}
          <div className="lg:hidden flex items-center justify-center bg-amber-50 text-amber-700 font-semibold px-3 py-2 rounded-xl border border-amber-200 text-xs whitespace-nowrap">
            {filteredData.length}
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 overflow-x-auto hide-scrollbar pb-2 lg:pb-0">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-white shadow-sm cursor-pointer min-w-[130px] text-sm flex-shrink-0"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={karigarFilter}
            onChange={(e) => setKarigarFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-white shadow-sm cursor-pointer min-w-[130px] text-sm flex-shrink-0"
          >
            {karigars.map(k => <option key={k} value={k}>{k}</option>)}
          </select>

          <select
            value={meltingFilter}
            onChange={(e) => setMeltingFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-white shadow-sm cursor-pointer min-w-[130px] text-sm flex-shrink-0"
          >
            {meltings.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-white shadow-sm cursor-pointer min-w-[130px] text-sm flex-shrink-0"
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-white shadow-sm cursor-pointer text-sm flex-shrink-0"
          />

          {/* Desktop Item Count */}
          <div className="hidden lg:flex items-center justify-center bg-amber-50 text-amber-700 font-semibold px-4 py-2 rounded-xl border border-amber-200 text-sm whitespace-nowrap flex-shrink-0">
            {filteredData.length} records
          </div>
        </div>
      </div>

      {/* ── Table/Card Container ── */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop View */}
        <div className="hidden lg:flex flex-col h-full bg-white shadow-sm rounded-xl border border-gray-200/80 overflow-hidden relative isolate">
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="min-w-max w-full divide-y divide-gray-200 border-collapse">
              <thead className="bg-[#fff7e6] sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <tr>
                  {headers.map((h, i) => {
                    const isSticky = !!h.stickyContext;
                    return (
                      <th
                        key={h.name}
                        className={`px-5 py-3.5 text-left text-[11px] font-bold text-amber-900 uppercase tracking-wider whitespace-nowrap border-b border-amber-200 bg-[#fff7e6] ${isSticky ? `sticky ${h.stickyContext} z-40` : ''} ${h.width || ''}`}
                        style={isSticky ? { boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" } : {}}
                      >
                        {h.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-[13px] text-gray-700">
                {filteredData.length > 0 ? (
                  filteredData.map((row: any) => (
                    <tr key={row.serialNo} className="hover:bg-amber-50/60 transition-colors group">
                      <td
                        className="px-5 py-3 whitespace-nowrap text-gray-400 font-medium sticky left-0 bg-white group-hover:bg-[#fffcf5] z-20 w-[100px] min-w-[100px] max-w-[100px]"
                        style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}
                      >
                        {row.serialNo}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap font-bold text-amber-700 sticky left-[100px] bg-white group-hover:bg-[#fffcf5] z-20 w-[160px] min-w-[160px] max-w-[160px]" style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}>
                        {row.orderNumber}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap font-medium text-gray-900">{row.customerName}</td>
                      <td className="px-5 py-3 whitespace-nowrap"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">{row.categoryName}</span></td>
                      <td className="px-5 py-3 whitespace-nowrap font-mono">{row.melting}</td>
                      <td className="px-5 py-3 whitespace-nowrap font-mono text-gray-600">{row.weight}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-center font-semibold bg-gray-50/50 group-hover:bg-transparent">{row.totalQuantity}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{row.karigarName}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-gray-500">{row.orderDate}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-gray-500">{row.karigarDeliveryDate}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{row.deliveryDate || "-"}</td>
                      <td className="px-5 py-3 whitespace-nowrap border-l border-gray-50 bg-gray-50/30 group-hover:bg-transparent">{row.expectedDeliveryDate}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{row.leftDays}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{row.orderType}</td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${row.orderStage === 'Delivered' ? 'bg-green-100 text-green-700' :
                            row.orderStage === 'QC' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                          }`}>
                          {row.orderStage}
                        </span>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap max-w-[200px] truncate" title={row.karigarNotes}>{row.karigarNotes}</td>
                      <td className="px-5 py-3 whitespace-nowrap font-mono font-bold">{row.totalWeight}</td>
                      <td className="px-5 py-3 whitespace-nowrap text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${Number(row.liveLeftDays) < 0 ? "bg-red-100 text-red-700" :
                            Number(row.liveLeftDays) <= 3 ? "bg-orange-100 text-orange-700" :
                              "bg-green-100 text-green-700"
                          }`}>
                          {row.liveLeftDays}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={18} className="px-5 py-12 text-center text-gray-500 text-sm">
                      No orders match your search and filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col h-full overflow-y-auto pb-24 px-1 pt-1 bg-gray-50/50">
          {filteredData.length > 0 ? (
            <div className="space-y-3">
              {filteredData.map((row: any) => (
                <div key={row.serialNo} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 overflow-hidden active:scale-[0.98] transition-all duration-200">
                  <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order #</span>
                      <span className="text-sm font-black text-amber-900 leading-none">{row.orderNumber}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${row.orderStage === 'Delivered' ? 'bg-green-100 text-green-700 border border-green-200' :
                          row.orderStage === 'QC' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                            'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}>
                        {row.orderStage}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 italic lowercase">SN: {row.serialNo}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3 px-1">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Customer</span>
                      <span className="text-xs font-bold text-gray-800 line-clamp-1">{row.customerName}</span>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Category</span>
                      <span className="text-xs font-bold text-amber-800 line-clamp-1 italic">{row.categoryName}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Weight / Melting</span>
                      <span className="text-xs font-black text-amber-600">{row.weight} / {row.melting}</span>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Qty / Total</span>
                      <span className="text-xs font-bold text-gray-800">{row.totalQuantity} / {row.totalWeight}g</span>
                    </div>
                  </div>

                  <div className="bg-amber-50/50 rounded-xl p-3 grid grid-cols-2 gap-3 border border-amber-100/50">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold text-amber-600 uppercase italic">Karigar</span>
                      <span className="text-xs font-bold text-gray-700 truncate">{row.karigarName}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-[9px] font-bold text-amber-600 uppercase italic">Expect Del.</span>
                      <span className="text-xs font-black text-amber-800">{row.expectedDeliveryDate}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold text-amber-600 uppercase italic">Order Date</span>
                      <span className="text-xs font-medium text-gray-600">{row.orderDate}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-[9px] font-bold text-amber-600 uppercase italic">Live Left</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full inline-block ml-auto ${Number(row.liveLeftDays) < 0 ? "bg-red-500 text-white" :
                          Number(row.liveLeftDays) <= 3 ? "bg-orange-500 text-white" :
                            "bg-green-500 text-white"
                        }`}>
                        {row.liveLeftDays} Days
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 border border-gray-200 shadow-inner">
                <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-gray-900 font-black text-lg mb-2">No Records Found</h3>
              <p className="text-gray-500 text-sm max-w-[200px] font-medium leading-relaxed">
                We couldn't find any orders matching your current filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Scope scrollbar style */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
};
