const fs = require('fs');
const path = require('path');

const inputData = `
Form	Follow Up Notes	Flw Up	Text		
Form	Status	Flw Up	Dropdown		Pending,In Progress,Resolved
Show	Order Number	Flw Up			
Show	Customer Name	Flw Up			
Show	Karigar Name	Flw Up			
Show	Category Name	Flw Up			
Show	Order Type	Flw Up			
Show	Order Date	Flw Up			
Show	Expected Delivery Date	Flw Up			
Show	Delivery Date	Flw Up			
Show	Live Left Days	Flw Up			
Show	Order Stage	Flw Up			
Show	Karigar Notes	Flw Up			
`;

const lines = inputData.trim().split('\n');
const pages = {};

lines.forEach(line => {
  const parts = line.split('\t');
  if (parts.length >= 3) {
    const section = parts[0].trim(); // Form or Show
    const label = parts[1].trim();
    const page = parts[2].trim();
    const type = parts[3] ? parts[3].trim() : '';
    const optionsRaw = parts[5] || parts[4] || '';
    const options = optionsRaw ? optionsRaw.split(',').map(s=>s.trim()) : [];

    const pageId = page.replace(/[\/\s-]/g, '');

    if (!pages[pageId]) {
      pages[pageId] = {
        name: pageId,
        humanName: page,
        formFields: [],
        showFields: []
      };
    }

    // to camel case key
    const key = label.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').map((w,i)=>i===0?w.toLowerCase():w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join('');

    if (section === 'Form') {
      pages[pageId].formFields.push({ label, key, type, options });
    } else {
      pages[pageId].showFields.push({ label, key });
    }
  }
});

function getMockMapping(key) {
  const maps = {
    orderNumber: "row.orderNumber",
    karigarName: "row.karigarName",
    orderType: "row.orderType",
    liveLeftDays: "row.liveLeftDays",
    customerName: "row.customerName",
    categoryName: "row.categoryName",
    melting: "row.melting",
    weight: "row.weight",
    totalWeight: "row.totalWeight",
    totalQuantity: "row.totalQuantity",
    orderDate: "row.orderDate",
    karigarDeliveryDate: "row.karigarDeliveryDate",
    deliveryDate: "row.deliveryDate",
    expectedDeliveryDate: "row.expectedDeliveryDate",
    orderStage: "row.orderStage",
    karigarNotes: "row.karigarNotes",
  };
  return maps[key] || '"-"';
}

function generateComponent(page) {
    let formInit = page.formFields.map(f => `${f.key}: "",`).join('\n      ');
    let formHeaders = page.formFields.map(f => `{ name: "${f.label}" }`).join(',\n    ');
    let showHeaders = page.showFields.map(f => `{ name: "${f.label}" }`).join(',\n    ');

    let formInputs = page.formFields.map(f => {
        if (f.type === 'Dropdown') {
            let opts = f.options.map(o => `<option value="${o}">${o}</option>`).join('\n                            ');
            return `<td className="px-5 py-2 whitespace-nowrap">
                        <select disabled={!row.checked} value={row.${f.key}} onChange={(e) => setPendingData((p: any[]) => p.map((i: any) => i.id === row.id ? { ...i, ${f.key}: e.target.value } : i))} className="border border-gray-200 rounded-md px-2 py-1.5 text-xs bg-white focus:ring-1 focus:ring-amber-500 disabled:bg-gray-50 disabled:text-gray-400 font-semibold" >
                          <option value="">Select</option>
                          ${opts}
                        </select>
                      </td>`;
        } else {
            let t = f.type === 'Number' ? 'number' : 'text';
            return `<td className="px-5 py-2 whitespace-nowrap">
                        <input type="${t}" disabled={!row.checked} value={row.${f.key}} onChange={(e) => setPendingData((p: any[]) => p.map((i: any) => i.id === row.id ? { ...i, ${f.key}: e.target.value } : i))} className="border border-gray-200 rounded-md px-2 py-1 text-xs w-24 focus:ring-1 focus:ring-amber-500 disabled:bg-gray-50 disabled:text-gray-400 font-mono" />
                      </td>`;
        }
    }).join('\n                      ');

    let formHistoryOutputs = page.formFields.map(f => {
      if (f.type === 'Dropdown') {
        return `<td className="px-5 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-700">
                          {row.${f.key} || "Pending"}
                        </span>
                      </td>`
      } else {
        return `<td className="px-5 py-3 whitespace-nowrap font-mono">{row.${f.key} || "-"}</td>`
      }
    }).join('\n                      ');

    let showOutputs = page.showFields.map(f => {
        let val = getMockMapping(f.key);
        return `<td className="px-5 py-3 whitespace-nowrap">${val === '"-"' && val !== 'row.orderNumber' && val !== 'row.orderStage' ? '{row.' + f.key + ' || "-"}' : '{' + val + '}'}</td>`;
    }).join('\n                      ');

  return `import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

export const ${page.name} = () => {
  const [activeTab, setActiveTab] = useState<"Pending" | "History">("Pending");
  const [searchTerm, setSearchTerm] = useState("");

  const getOrdersData = () => {
    const localData = localStorage.getItem('ordersData');
    if (localData) return JSON.parse(localData);
    
    // Fallback if OrderDetails hasn't generated yet
    const categories = ["Ring", "Necklace", "Bangle", "Earrings", "Pendant", "Chain"];
    const meltings = ["18K", "20K", "22K", "24K"];
    const karigars = ["Raj", "Amit", "Kumar", "Singh", "Das", "Sharma"];
    const stages = ["Created", "In Progress", "QC", "Polishing", "Ready for Dispatch"];
    const types = ["Standard", "Custom", "Urgent"];
    const newData = Array.from({ length: 100 }, (_, i) => {
      const id = i + 1;
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 20));
      const expectedDate = new Date(orderDate);
      expectedDate.setDate(expectedDate.getDate() + 10 + Math.floor(Math.random() * 10));
      const deliveryDate = Math.random() > 0.7 ? new Date(expectedDate.getTime() - Math.random() * 86400000 * 3).toISOString().split('T')[0] : "";
      const weight = (Math.random() * 40 + 5);
      const qty = Math.floor(Math.random() * 5) + 1;
      return {
        serialNo: id.toString(),
        orderNumber: \`ORD-\${String(id).padStart(3, '0')}\`,
        customerName: \`Customer \${id}\`,
        categoryName: categories[Math.floor(Math.random() * categories.length)],
        melting: meltings[Math.floor(Math.random() * meltings.length)],
        weight: \`\${weight.toFixed(2)}g\`,
        totalQuantity: qty.toString(),
        karigarName: karigars[Math.floor(Math.random() * karigars.length)],
        orderDate: orderDate.toISOString().split('T')[0],
        karigarDeliveryDate: new Date(expectedDate.getTime() - 86400000 * 2).toISOString().split('T')[0],
        deliveryDate: deliveryDate,
        expectedDeliveryDate: expectedDate.toISOString().split('T')[0],
        leftDays: Math.floor(Math.random() * 10).toString(),
        orderType: types[Math.floor(Math.random() * types.length)],
        orderStage: deliveryDate ? "Delivered" : stages[Math.floor(Math.random() * stages.length)],
        karigarNotes: i % 4 === 0 ? "Urgent requirement" : "Regular process",
        totalWeight: \`\${(weight * qty).toFixed(2)}g\`,
        liveLeftDays: Math.floor(Math.random() * 5).toString(),
        colorCode: ["Red", "Blue", "Green"][Math.floor(Math.random() * 3)],
        fineWeight: \`\${(weight * 0.9).toFixed(2)}g\`,
        planned3: "Plan A",
        planned4: "Plan B",
        planned5: "Plan C",
        planned6: "Plan D",
        planned7: "Plan E",
        planned8: "Plan F",
        planned9: "Plan G",
        planned10: "Plan H",
        planned11: "Plan I",
        planned12: "Plan J",
        planned13: "Plan K",
        planned14: "Plan L",
        planned15: "Plan M",
        huidStatus: "Sent In Huid",
        labelingStatus: "Yes",
        remarks13: "Checking",
        ...({
            status3: Math.random() > 0.5 ? "QC Okay" : "QC Reject",
            status9: Math.random() > 0.5 ? "QC Okay" : "QC Reject",
            status12: Math.random() > 0.5 ? "QC Okay" : "QC Reject",
            status14: "Received",
            status15: Math.random() > 0.5 ? "Complete" : "Cancel",
            meenaInhouseStatus: "Polish (Inhouse)",
            meenaOutsideStatus: "Polish (Outside)"
        })
      };
    });
    localStorage.setItem('ordersData', JSON.stringify(newData));
    return newData;
  };

  const [pendingData, setPendingData] = useState(() => {
    return getOrdersData().slice(0, 10).map((item: any) => ({
      ...item,
      id: item.serialNo,
      checked: false,
      ${formInit}
    }));
  });

  const [historyData] = useState(() => {
    return getOrdersData().slice(10, 100).map((item: any) => ({
      ...item,
      id: item.serialNo,
      ${formInit}
    }));
  });

  const toggleCheck = (id: string) => {
    setPendingData((prev: any[]) => prev.map((item: any) => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [karigarFilter, setKarigarFilter] = useState("All Karigars");
  const [meltingFilter, setMeltingFilter] = useState("All Meltings");
  const [dateFilter, setDateFilter] = useState("");

  const currentDataRaw = activeTab === "Pending" ? pendingData : historyData;
  const categories: string[] = useMemo(() => ["All Categories", ...(Array.from(new Set(currentDataRaw.map((d: any) => String(d.categoryName)))) as string[])], [currentDataRaw]);
  const karigars: string[] = useMemo(() => ["All Karigars", ...(Array.from(new Set(currentDataRaw.map((d: any) => String(d.karigarName)))) as string[])], [currentDataRaw]);
  const meltings: string[] = useMemo(() => ["All Meltings", ...(Array.from(new Set(currentDataRaw.map((d: any) => String(d.melting)))) as string[])], [currentDataRaw]);

  const filteredData = useMemo(() => {
    return currentDataRaw.filter((item: any) => {
      const matchesSearch = Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCategory = categoryFilter === "All Categories" || item.categoryName === categoryFilter;
      const matchesKarigar = karigarFilter === "All Karigars" || item.karigarName === karigarFilter;
      const matchesMelting = meltingFilter === "All Meltings" || item.melting === meltingFilter;
      const matchesDate = !dateFilter || item.orderDate === dateFilter;

      return matchesSearch && matchesCategory && matchesKarigar && matchesMelting && matchesDate;
    });
  }, [currentDataRaw, searchTerm, categoryFilter, karigarFilter, meltingFilter, dateFilter]);

  type HeaderDef = { name: string; stickyContext?: string; width?: string };
  const sharedHeaders: HeaderDef[] = [
    ${showHeaders}
  ];

  const pendingHeaders: HeaderDef[] = [
    { name: "Action", stickyContext: "left-0", width: "w-[80px] min-w-[80px] max-w-[80px]" },
    ${page.formFields.length > 0 ? formHeaders + ',' : ''}
    ...sharedHeaders
  ];

  const historyHeaders: HeaderDef[] = [
    ${page.formFields.length > 0 ? formHeaders + ',' : ''}
    ...sharedHeaders
  ];

  const headers = activeTab === "Pending" ? pendingHeaders : historyHeaders;

  return (
    <div className="h-full flex flex-col relative w-full overflow-hidden">
      <div className="flex flex-row items-center gap-3 mb-4 flex-shrink-0 w-full overflow-x-auto hide-scrollbar pb-2 pt-1">
        <div className="flex gap-2 flex-shrink-0 border-r border-gray-200 pr-3">
          <button
            className={\`px-4 py-2 text-sm font-bold rounded-xl transition-colors \${activeTab === "Pending" ? "bg-amber-100/80 text-amber-800 shadow-sm" : "text-gray-500 hover:bg-gray-100"}\`}
            onClick={() => setActiveTab("Pending")}
          >
            Pending
          </button>
          <button
            className={\`px-4 py-2 text-sm font-bold rounded-xl transition-colors \${activeTab === "History" ? "bg-amber-100/80 text-amber-800 shadow-sm" : "text-gray-500 hover:bg-gray-100"}\`}
            onClick={() => setActiveTab("History")}
          >
            History
          </button>
        </div>

        <div className="relative min-w-[240px] flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 shadow-sm transition-all text-sm"
          />
        </div>

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

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 bg-white shadow-sm cursor-pointer text-sm flex-shrink-0"
        />

        <div className="flex items-center justify-center bg-amber-50 text-amber-700 font-semibold px-4 py-2 rounded-xl border border-amber-200 text-sm whitespace-nowrap flex-shrink-0">
          {filteredData.length} records
        </div>
      </div>

      <div className="flex-1 bg-white shadow-sm rounded-xl border border-gray-200/80 flex flex-col min-h-0 overflow-hidden relative isolate">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="min-w-max w-full divide-y divide-gray-200 border-collapse">
            <thead className="bg-[#fff7e6] sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <tr>
                {headers.map((h: any) => {
                  const isSticky = !!h.stickyContext;
                  return (
                    <th
                      key={h.name}
                      className={\`px-5 py-3.5 text-left text-[11px] font-bold text-amber-900 uppercase tracking-wider whitespace-nowrap border-b border-amber-200 bg-[#fff7e6] \${isSticky ? \`sticky \${h.stickyContext} z-40\` : ''} \${h.width || ''}\`}
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
                activeTab === "Pending" ? (
                  filteredData.map((row: any) => (
                    <tr key={row.id} className="hover:bg-amber-50/60 transition-colors group">
                      <td
                        className="px-5 py-3 whitespace-nowrap font-medium sticky left-0 bg-white group-hover:bg-[#fffcf5] z-20 w-[80px] min-w-[80px] max-w-[80px] text-center"
                        style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}
                      >
                        <input type="checkbox" checked={row.checked} onChange={() => toggleCheck(row.id)} className="w-4 h-4 text-amber-600 rounded cursor-pointer" />
                      </td>
                      ${formInputs}
                      ${showOutputs}
                    </tr>
                  ))
                ) : (
                  filteredData.map((row: any) => (
                    <tr key={row.id} className="hover:bg-amber-50/60 transition-colors group">
                      ${formHistoryOutputs}
                      ${showOutputs}
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan={headers.length} className="px-5 py-12 text-center text-gray-500 text-sm">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style>{\`
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
      \`}</style>
    </div>
  );
};
`;
}

for (const p of Object.values(pages)) {
  const content = generateComponent(p);
  
  let outFile = path.join(__dirname, 'src', 'app', 'pages', 'FlwUp.tsx');
  
  fs.writeFileSync(outFile, content, 'utf8');
  console.log('Generated:', outFile);
}
