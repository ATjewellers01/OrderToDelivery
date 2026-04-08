const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'pages');
const targetFiles = [
  'BanglePolish.tsx', 'Delivery.tsx', 'DispatchDepartment.tsx', 'EPolish.tsx', 
  'GhatJama.tsx', 'HuidLabel.tsx', 'MeenaInhouse.tsx', 'MeenaOutside.tsx', 
  'PolishInhouse.tsx', 'PolishOutside.tsx', 'QC1.tsx', 'QC2.tsx', 'QC3.tsx', 
  'ReceiptDepartment.tsx', 'ReceivedInStock.tsx'
];

targetFiles.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Fix Shared Headers: Remove Order Number
  content = content.replace(/\{\s*name:\s*"Order Number",\s*(?:stickyContext:\s*"left-\[80px\]",\s*)?width:\s*"w-\[150px\]\s+min-w-\[150px\]\s+max-w-\[150px\]"\s*\},?\s*/g, '');

  // 2. Fix Pending Headers: Ensure Action then Order Number (deduplicated)
  const pendingRegex = /(pendingHeaders:\s*HeaderDef\[\]\s*=\s*\[\s*)(?:\{\s*name:\s*"Action",[\s\S]*?\},?\s*)/;
  content = content.replace(pendingRegex, `$1{ name: "Action", stickyContext: "left-0", width: "w-[80px] min-w-[80px] max-w-[80px]" },\n    { name: "Order Number", stickyContext: "left-[80px]", width: "w-[150px] min-w-[150px] max-w-[150px]" },\n    `);
  // Deduplicate any accidental double Order Number in pending (if any)
  content = content.replace(/(pendingHeaders:[\s\S]*?)\{\s*name:\s*"Order Number",[\s\S]*?\},?\s*\{\s*name:\s*"Order Number",[\s\S]*?\},?\s*/g, '$1{ name: "Order Number", stickyContext: "left-[80px]", width: "w-[150px] min-w-[150px] max-w-[150px]" },\n    ');

  // 3. Fix History Headers: Ensure Order Number is first (deduplicated)
  const historyHeaderRegex = /(historyHeaders:\s*HeaderDef\[\]\s*=\s*\[)([\s\S]*?)(\s*\];)/;
  content = content.replace(historyHeaderRegex, (match, start, inner, end) => {
    let cleanInner = inner.replace(/\{\s*name:\s*"Order Number"[\s\S]*?\},?\s*/g, '');
    return `${start}\n    { name: "Order Number", stickyContext: "left-0", width: "w-[150px] min-w-[150px] max-w-[150px]" },${cleanInner}${end}`;
  });

  // 4. Fix History Rows: Move orderNumber TD to first and set sticky left-0
  // Match the block: filteredData.map((row: any) => ( <tr ...> ... </tr> ))
  // Specifically the one inside the second part of activeTab === "Pending" ? ... : ...
  
  // Find the entire table body mapping
  const tableBodyRegex = /\{filteredData\.length > 0 \? \(\s*activeTab === "Pending" \? \([\s\S]*?\) : \([\s\S]*?\) \) : \([\s\S]*?\) \}/g;
  
  content = content.replace(tableBodyRegex, (fullMatch) => {
    // Split into Pending and History parts
    const parts = fullMatch.split(/\s+:\s+\(/);
    if (parts.length < 3) return fullMatch;
    
    // parts[0] is {filteredData.length > 0 ? ( activeTab === "Pending" ? (
    // parts[1] is Pending row mapping )
    // parts[2] is History row mapping ) ) : ( No results ... ) }
    
    // We want to fix parts[1] (Pending) and parts[2] (History)
    
    // Fix Pending: Ensure orderNumber is sticky left-[80px] and second
    parts[1] = parts[1].replace(/(<tr[\s\S]*?><td[\s\S]*?Action[\s\S]*?<\/td>)([\s\S]*?<\/tr>)/, (trMatch, actionCell, rest) => {
        // If orderNumber is already there, make sure it's sticky left-[80px]
        if (rest.includes('{row.orderNumber}')) {
            let processedRest = rest.replace(/(<td[^>]*?)\{row\.orderNumber\}(<\/td>)/, (match, start, end) => {
                let s = start;
                // If contains sticky, replace offset
                if (s.includes('sticky')) {
                    s = s.replace(/left-\[0\]|left-0|left-\[80px\]/g, 'left-[80px]');
                } else {
                    // Add sticky
                    s = s.replace(/className="([^"]*?)"/, 'className="$1 sticky left-[80px] z-20 background-white"'); // simplifying
                }
                return `${s}{row.orderNumber}${end}`;
            });
            return `${actionCell}${processedRest}`;
        }
        return trMatch;
    });

    // Fix History: Move orderNumber to first and set sticky left-0
    parts[2] = parts[2].replace(/(<tr[\s\S]*?>)([\s\S]*?)(<\/tr>)/, (trMatch, trStart, inner, trEnd) => {
        let orderCellMatch = inner.match(/<td[^>]*?\{row\.orderNumber\}<\/td>/);
        if (orderCellMatch) {
            let orderCell = orderCellMatch[0];
            // Fix sticky to left-0
            orderCell = orderCell.replace(/left-\[80px\]|left-\[0\]/g, 'left-0');
            if (!orderCell.includes('sticky')) {
                orderCell = orderCell.replace(/className="([^"]*?)"/, 'className="$1 sticky left-0 z-20 bg-white"');
            }
            
            let restInner = inner.replace(/<td[^>]*?\{row\.orderNumber\}<\/td>/, '');
            return `${trStart}\n                      ${orderCell}${restInner}${trEnd}`;
        }
        return trMatch;
    });

    return parts.join(' : (');
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`History gap fixed V3: ${file}`);
});
console.log('Cleanup complete.');
