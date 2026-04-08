const fs = require('fs');
const path = require('path');

const inputData = `
Form	Status3	QC-1	Dropdown		QC Okay,QC Reject
Form	Type	QC-1	Dropdown		Partly Clear,Complete
Form	Remark	QC-1	Text		
Show	Order Number	QC-1			
Show	Karigar Name	QC-1			
Show	Order Type	QC-1			
Show	Live Left Days	QC-1			
Show	Planned3	QC-1			
Show	Customer Name	QC-1			
Show	Category Name	QC-1			
Show	Melting	QC-1			
Show	Weight	QC-1			
Show	Total Weight	QC-1			
Show	Total Quantity	QC-1			
Show	Order Date	QC-1			
Show	Karigar Delivery Date	QC-1			
Show	Color Code	QC-1			
Show	Delivery Date	QC-1			
Show	Expected Delivery Date	QC-1			
Show	Order Stage	QC-1			
Show	Karigar Notes	QC-1			
Form	Voucher Number	Ghat Jama	Text		
Form	Meena	Ghat Jama	Dropdown		Meena (Inhouse),Polish (Inhouse),Meena (Outside),Polish (Outside),Bangle Polish,E-Polish
Form	Ghat Jama Weight	Ghat Jama	Number		
Form	Pcs	Ghat Jama	Number		
Form	Ghat Melting	Ghat Jama	Number		
Form	Ghat Wastage	Ghat Jama	Number		
Show	Fine Weight	Ghat Jama			
Show	Order Number	Ghat Jama			
Show	Karigar Name	Ghat Jama			
Show	Order Type	Ghat Jama			
Show	Live Left Days	Ghat Jama			
Show	Planned4	Ghat Jama			
Show	Customer Name	Ghat Jama			
Show	Category Name	Ghat Jama			
Show	Melting	Ghat Jama			
Show	Weight	Ghat Jama			
Show	Total Weight	Ghat Jama			
Show	Total Quantity	Ghat Jama			
Show	Order Date	Ghat Jama			
Show	Karigar Delivery Date	Ghat Jama			
Show	Color Code	Ghat Jama			
Show	Delivery Date	Ghat Jama			
Show	Expected Delivery Date	Ghat Jama			
Show	Order Stage	Ghat Jama			
Show	Karigar Notes	Ghat Jama			
Form	Inhouse Chillai Weight	Meena Inhouse	Number		
Form	Inhouse After Meena Polish	Meena Inhouse	Number		
Form	Remarks5	Meena Inhouse	Text		
Form	Meena Inhouse Status	Meena Inhouse	Dropdown		Polish (Inhouse),Polish (Outside),Bangle Polish,E-Polish
Show	Order Number	Meena Inhouse			
Show	Karigar Name	Meena Inhouse			
Show	Order Type	Meena Inhouse			
Show	Live Left Days	Meena Inhouse			
Show	Planned5	Meena Inhouse			
Show	Customer Name	Meena Inhouse			
Show	Category Name	Meena Inhouse			
Show	Melting	Meena Inhouse			
Show	Weight	Meena Inhouse			
Show	Total Weight	Meena Inhouse			
Show	Total Quantity	Meena Inhouse			
Show	Order Date	Meena Inhouse			
Show	Karigar Delivery Date	Meena Inhouse			
Show	Color Code	Meena Inhouse			
Show	Delivery Date	Meena Inhouse			
Show	Expected Delivery Date	Meena Inhouse			
Show	Order Stage	Meena Inhouse			
Show	Karigar Notes	Meena Inhouse			
Form	Outside Chillai Weight	Meena Outside	Number		
Form	Outside Finished Weight	Meena Outside	Number		
Form	Remarks6	Meena Outside	Text		
Form	Meena Outside Status	Meena Outside	Dropdown		Polish (Inhouse),Polish (Outside),Bangle Polish
Show	Order Number	Meena Outside			
Show	Karigar Name	Meena Outside			
Show	Order Type	Meena Outside			
Show	Live Left Days	Meena Outside			
Show	Planned6	Meena Outside			
Show	Customer Name	Meena Outside			
Show	Category Name	Meena Outside			
Show	Melting	Meena Outside			
Show	Weight	Meena Outside			
Show	Total Weight	Meena Outside			
Show	Total Quantity	Meena Outside			
Show	Order Date	Meena Outside			
Show	Karigar Delivery Date	Meena Outside			
Show	Color Code	Meena Outside			
Show	Delivery Date	Meena Outside			
Show	Expected Delivery Date	Meena Outside			
Show	Order Stage	Meena Outside			
Show	Karigar Notes	Meena Outside			
Form	Inhouse After Polish Weight	Polish Inhouse	Number		
Form	Inhouse Polish Loss	Polish Inhouse	Number		
Show	Order Number	Polish Inhouse			
Show	Karigar Name	Polish Inhouse			
Show	Order Type	Polish Inhouse			
Show	Live Left Days	Polish Inhouse			
Show	Planned7	Polish Inhouse			
Show	Customer Name	Polish Inhouse			
Show	Category Name	Polish Inhouse			
Show	Melting	Polish Inhouse			
Show	Weight	Polish Inhouse			
Show	Total Weight	Polish Inhouse			
Show	Total Quantity	Polish Inhouse			
Show	Order Date	Polish Inhouse			
Show	Karigar Delivery Date	Polish Inhouse			
Show	Color Code	Polish Inhouse			
Show	Delivery Date	Polish Inhouse			
Show	Expected Delivery Date	Polish Inhouse			
Show	Order Stage	Polish Inhouse			
Show	Karigar Notes	Polish Inhouse			
Form	Outside Polish Finish Weight	Polish Outside	Number		
Form	Outside Polish Loss	Polish Outside	Number		
Show	Order Number	Polish Outside			
Show	Karigar Name	Polish Outside			
Show	Order Type	Polish Outside			
Show	Live Left Days	Polish Outside			
Show	Planned8	Polish Outside			
Show	Customer Name	Polish Outside			
Show	Category Name	Polish Outside			
Show	Melting	Polish Outside			
Show	Weight	Polish Outside			
Show	Total Weight	Polish Outside			
Show	Total Quantity	Polish Outside			
Show	Order Date	Polish Outside			
Show	Karigar Delivery Date	Polish Outside			
Show	Color Code	Polish Outside			
Show	Delivery Date	Polish Outside			
Show	Expected Delivery Date	Polish Outside			
Show	Order Stage	Polish Outside			
Show	Karigar Notes	Polish Outside			
Form	Status9	QC-2	Dropdown		QC Okay,QC Reject
Form	Remarks9	QC-2	Text		
Show	Order Number	QC-2			
Show	Karigar Name	QC-2			
Show	Order Type	QC-2			
Show	Live Left Days	QC-2			
Show	Planned9	QC-2			
Show	Customer Name	QC-2			
Show	Category Name	QC-2			
Show	Melting	QC-2			
Show	Weight	QC-2			
Show	Total Weight	QC-2			
Show	Total Quantity	QC-2			
Show	Order Date	QC-2			
Show	Karigar Delivery Date	QC-2			
Show	Color Code	QC-2			
Show	Delivery Date	QC-2			
Show	Expected Delivery Date	QC-2			
Show	Order Stage	QC-2			
Show	Karigar Notes	QC-2			
Show	Order Number	Dispatch Department			
Show	Karigar Name	Dispatch Department			
Show	Order Type	Dispatch Department			
Show	Live Left Days	Dispatch Department			
Show	Planned10	Dispatch Department			
Show	Customer Name	Dispatch Department			
Show	Category Name	Dispatch Department			
Show	Melting	Dispatch Department			
Show	Weight	Dispatch Department			
Show	Total Weight	Dispatch Department			
Show	Total Quantity	Dispatch Department			
Show	Order Date	Dispatch Department			
Show	Karigar Delivery Date	Dispatch Department			
Show	Delivery Date	Dispatch Department			
Show	Expected Delivery Date	Dispatch Department			
Show	Order Stage	Dispatch Department			
Show	Karigar Notes	Dispatch Department			
Form	Receiving Type	Receipt Department	Dropdown		By Hand,Courier
Form	Person/Courier Name	Receipt Department	Text		
Form	Gross Weight	Receipt Department	Number		
Show	Live Left Days	Receipt Department			
Show	Planned11	Receipt Department			
Show	Order Number	Receipt Department			
Show	Customer Name	Receipt Department			
Show	Category Name	Receipt Department			
Show	Melting	Receipt Department			
Show	Weight	Receipt Department			
Show	Total Weight	Receipt Department			
Show	Total Quantity	Receipt Department			
Show	Karigar Name	Receipt Department			
Show	Order Date	Receipt Department			
Show	Karigar Delivery Date	Receipt Department			
Show	Color Code	Receipt Department			
Show	Delivery Date	Receipt Department			
Show	Expected Delivery Date	Receipt Department			
Show	Order Type	Receipt Department			
Show	Order Stage	Receipt Department			
Show	Karigar Notes	Receipt Department			
Form	Status12	QC-3	Dropdown		QC Okay,QC Reject
Form	Remarks12	QC-3	Text		
Show	Order Number	QC-3			
Show	Karigar Name	QC-3			
Show	Order Type	QC-3			
Show	Live Left Days	QC-3			
Show	Planned12	QC-3			
Show	Customer Name	QC-3			
Show	Category Name	QC-3			
Show	Melting	QC-3			
Show	Weight	QC-3			
Show	Total Weight	QC-3			
Show	Total Quantity	QC-3			
Show	Order Date	QC-3			
Show	Karigar Delivery Date	QC-3			
Show	Color Code	QC-3			
Show	Delivery Date	QC-3			
Show	Expected Delivery Date	QC-3			
Show	Order Stage	QC-3			
Show	Karigar Notes	QC-3			
Form	Huid Status	Huid/Label	Dropdown		Sent In Huid,Huid Complete,No Huid
Form	Labeling Status	Huid/Label	Dropdown		Yes,No
Form	Sent Company Name	Huid/Label	Dropdown		Nakoda,Vinayaka,Raipur,No Huid
Form	Sent Huid/Label Pcs	Huid/Label	Number		
Form	Remarks13	Huid/Label	Text		
Show	Order Number	Huid/Label			
Show	Karigar Name	Huid/Label			
Show	Order Type	Huid/Label			
Show	Live Left Days	Huid/Label			
Show	Planned13	Huid/Label			
Show	Customer Name	Huid/Label			
Show	Category Name	Huid/Label			
Show	Melting	Huid/Label			
Show	Weight	Huid/Label			
Show	Total Weight	Huid/Label			
Show	Total Quantity	Huid/Label			
Show	Order Date	Huid/Label			
Show	Karigar Delivery Date	Huid/Label			
Show	Delivery Date	Huid/Label			
Show	Color Code	Huid/Label			
Show	Expected Delivery Date	Huid/Label			
Show	Order Stage	Huid/Label			
Show	Karigar Notes	Huid/Label			
Form	Status14	Receive In Stock And Inform To Customer	Dropdown		Received
Form	Inform To Customer	Receive In Stock And Inform To Customer	Dropdown		Informad,Not Informad
Show	Order Number	Receive In Stock And Inform To Customer			
Show	Karigar Name	Receive In Stock And Inform To Customer			
Show	Order Type	Receive In Stock And Inform To Customer			
Show	Live Left Days	Receive In Stock And Inform To Customer			
Show	Planned14	Receive In Stock And Inform To Customer			
Show	Customer Name	Receive In Stock And Inform To Customer			
Show	Category Name	Receive In Stock And Inform To Customer			
Show	Melting	Receive In Stock And Inform To Customer			
Show	Weight	Receive In Stock And Inform To Customer			
Show	Total Weight	Receive In Stock And Inform To Customer			
Show	Total Quantity	Receive In Stock And Inform To Customer			
Show	Order Date	Receive In Stock And Inform To Customer			
Show	Karigar Delivery Date	Receive In Stock And Inform To Customer			
Show	Color Code	Receive In Stock And Inform To Customer			
Show	Delivery Date	Receive In Stock And Inform To Customer			
Show	Expected Delivery Date	Receive In Stock And Inform To Customer			
Show	Order Stage	Receive In Stock And Inform To Customer			
Show	Karigar Notes	Receive In Stock And Inform To Customer			
Show	Huid Status	Receive In Stock And Inform To Customer			
Show	Labeling Status	Receive In Stock And Inform To Customer			
Show	Remarks13	Receive In Stock And Inform To Customer			
Form	Status15	Delivery	Dropdown		Complete,Cancel
Show	Order Number	Delivery			
Show	Karigar Name	Delivery			
Show	Order Type	Delivery			
Show	Live Left Days	Delivery			
Show	Planned15	Delivery			
Show	Customer Name	Delivery			
Show	Category Name	Delivery			
Show	Melting	Delivery			
Show	Weight	Delivery			
Show	Total Weight	Delivery			
Show	Total Quantity	Delivery			
Show	Order Date	Delivery			
Show	Karigar Delivery Date	Delivery			
Show	Color Code	Delivery			
Show	Delivery Date	Delivery			
Show	Expected Delivery Date	Delivery			
Show	Order Stage	Delivery			
Show	Karigar Notes	Delivery			
Form	Bangle Polish Weight	Bangle Polish	Number		
Form	Bangle Polish Loss	Bangle Polish	Number		
Show	Order Number	Bangle Polish			
Show	Karigar Name	Bangle Polish			
Show	Order Type	Bangle Polish			
Show	Live Left Days	Bangle Polish			
Show	Planned6	Bangle Polish			
Show	Customer Name	Bangle Polish			
Show	Category Name	Bangle Polish			
Show	Melting	Bangle Polish			
Show	Weight	Bangle Polish			
Show	Total Weight	Bangle Polish			
Show	Total Quantity	Bangle Polish			
Show	Order Date	Bangle Polish			
Show	Karigar Delivery Date	Bangle Polish			
Show	Color Code	Bangle Polish			
Show	Delivery Date	Bangle Polish			
Show	Expected Delivery Date	Bangle Polish			
Show	Order Stage	Bangle Polish			
Show	Karigar Notes	Bangle Polish			
Form	 E-Polish Weight	E-Polish	Number		
Form	 E-Polish Loss	E-Polish	Number		
Form	Status16	E-Polish	Dropdown		Meena (Inhouse),Polish (Inhouse),Meena (Outside),Polish (Outside),Bangle Polish
Show	Order Number	E-Polish			
Show	Karigar Name	E-Polish			
Show	Order Type	E-Polish			
Show	Live Left Days	E-Polish			
Show	Planned6	E-Polish			
Show	Customer Name	E-Polish			
Show	Category Name	E-Polish			
Show	Melting	E-Polish			
Show	Weight	E-Polish			
Show	Total Weight	E-Polish			
Show	Total Quantity	E-Polish			
Show	Order Date	E-Polish			
Show	Karigar Delivery Date	E-Polish			
Show	Color Code	E-Polish			
Show	Delivery Date	E-Polish			
Show	Expected Delivery Date	E-Polish			
`;

const lines = inputData.trim().split('\\n');
const pages = {};

lines.forEach(line => {
  const parts = line.split('\\t');
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

// A function to get the basic mocked field from "getOrdersData"
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
    let formInit = page.formFields.map(f => `${f.key}: "",`).join('\\n      ');
    let formHeaders = page.formFields.map(f => `{ name: "${f.label}" }`).join(',\\n    ');
    let showHeaders = page.showFields.map(f => `{ name: "${f.label}" }`).join(',\\n    ');

    let formInputs = page.formFields.map(f => {
        if (f.type === 'Dropdown') {
            let opts = f.options.map(o => `<option value="${o}">${o}</option>`).join('\\n                            ');
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
    }).join('\\n                      ');

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
    }).join('\\n                      ');

    let showOutputs = page.showFields.map(f => {
        let val = getMockMapping(f.key);
        return `<td className="px-5 py-3 whitespace-nowrap">${val === '"-"' && val !== 'row.orderNumber' && val !== 'row.orderStage' ? '{row.' + f.key + ' || "-"}' : '{' + val + '}'}</td>`;
    }).join('\\n                      ');

  return \`import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

export const \${page.name} = () => {
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
        remarks13: "Checking"
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
\`;
}

for (const p of Object.values(pages)) {
  const content = generateComponent(p);
  // Ensure we place mapping properly
  // Specifically map the file name
  let fName = p.name;
  if(fName === 'QC1') fName = 'QC1';
  // I will write these to the src/app/pages folder
  let outFile = path.join(__dirname, 'src', 'app', 'pages', \`\${p.name}.tsx\`);
  
  if (p.name === 'QC1') outFile = path.join(__dirname, 'src', 'app', 'pages', 'QC1.tsx');
  if (p.name === 'QC2') outFile = path.join(__dirname, 'src', 'app', 'pages', 'QC2.tsx');
  if (p.name === 'QC3') outFile = path.join(__dirname, 'src', 'app', 'pages', 'QC3.tsx');
  if (p.name === 'ReceiveInStockAndInformToCustomer') outFile = path.join(__dirname, 'src', 'app', 'pages', 'ReceivedInStock.tsx');

  // Some components might have different names, let's map exactly based on existing pages list
  const nameMap = {
    'DispatchDepartment': 'DispatchDepartment.tsx',
    'ReceiptDepartment': 'ReceiptDepartment.tsx',
    'HuidLabel': 'HuidLabel.tsx',
    'Delivery': 'Delivery.tsx',
    'BanglePolish': 'BanglePolish.tsx',
    'EPolish': 'EPolish.tsx',
    'GhatJama': 'GhatJama.tsx',
    'MeenaInhouse': 'MeenaInhouse.tsx',
    'MeenaOutside': 'MeenaOutside.tsx',
    'PolishInhouse': 'PolishInhouse.tsx',
    'PolishOutside': 'PolishOutside.tsx',
  };
  
  if (nameMap[p.name]) {
    outFile = path.join(__dirname, 'src', 'app', 'pages', nameMap[p.name]);
  }
  
  // Also we need to make sure the export name matches what's exported in the file.
  // The export name is p.name. E.g. export const ReceiveInStockAndInformToCustomer
  
  fs.writeFileSync(outFile, content, 'utf8');
  console.log('Generated:', outFile);
}
