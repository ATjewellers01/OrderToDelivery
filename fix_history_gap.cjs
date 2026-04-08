const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'pages');
const targetFiles = [
  'BanglePolish.tsx', 'Delivery.tsx', 'DispatchDepartment.tsx', 'EPolish.tsx', 
  'GhatJama.tsx', 'HuidLabel.tsx', 'MeenaInhouse.tsx', 'MeenaOutside.tsx', 
  'PolishInhouse.tsx', 'PolishOutside.tsx', 'QC1.tsx', 'QC2.tsx', 'QC3.tsx', 
  'ReceiptDepartment.tsx', 'ReceivedInStock.tsx', 'FlwUp.tsx'
];

targetFiles.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Clean sharedHeaders: Remove "Order Number"
  // Look for: { name: "Order Number", stickyContext: "left-[80px]", width: "w-[150px] min-w-[150px] max-w-[150px]" },
  // and handle variants of whitespace
  const orderNumRegex = /\{\s*name:\s*"Order\s*Number",\s*(?:stickyContext:\s*"left-\[80px\]",\s*)?width:\s*"w-\[150px\]\s+min-w-\[150px\]\s+max-w-\[150px\]"\s*\},?\s*/g;
  content = content.replace(orderNumRegex, '');

  // 2. Redefine pendingHeaders: Ensure it has Action then Order Number
  // Look for pendingHeaders = [ {Action...}, ... ]
  const pendingRegex = /(pendingHeaders:\s*HeaderDef\[\]\s*=\s*\[\s*\{\s*name:\s*"Action",\s*stickyContext:\s*"left-0",\s*width:\s*"w-\[80px\]\s+min-w-\[80px\]\s+max-w-\[80px\]"\s*\},?)/;
  content = content.replace(pendingRegex, `$1\n    { name: "Order Number", stickyContext: "left-[80px]", width: "w-[150px] min-w-[150px] max-w-[150px]" },`);

  // 3. Redefine historyHeaders: Ensure it has Order Number then others
  // Look for historyHeaders = [ ... ]
  const historyHeaderRegex = /(historyHeaders:\s*HeaderDef\[\]\s*=\s*\[)/;
  content = content.replace(historyHeaderRegex, `$1\n    { name: "Order Number", stickyContext: "left-0", width: "w-[150px] min-w-[150px] max-w-[150px]" },`);

  // 4. Update Pending Row mapping: Ensure Order Number is sticky left-[80px]
  // Look for the Order Number cell in any context
  // In the Pending tab row mapping (filteredData.map... tr...td)
  // We need to match the specific orderNumber cell and its attributes
  // Typically: <td className="... sticky left-[80px] ...">{row.orderNumber}</td>
  // (Matched previously in patch scripts)
  
  // 5. Update History Row mapping: Ensure Order Number is FIRST and sticky left-0
  // Handle the tr...td block inside the ) : ( filteredData.map... block
  
  // Actually, to be safe, I'll do specific swaps for each tab
  
  // Split the content into Pending and History tab row mappings if possible
  // Tab mapping structure: {filteredData.length > 0 ? ( activeTab === "Pending" ? ( ... ) : ( ... ) ) : ... }
  
  const historyRowBlockRegex = /(\)\s*:\s*\(\s*filteredData\.map\(\s*\(\s*row:\s*any\s*\)\s*=>\s*\(\s*<tr[\s\S]*?><td[\s\S]*?)(<td[\s\S]*?\{row\.orderNumber\}<\/td>)([\s\S]*?<\/tr>\s*\)\s*\))/g;
  
  content = content.replace(historyRowBlockRegex, (match, before, orderCell, after) => {
    // Reconstruct the orderCell to be sticky left-0
    let cleanOrderCell = orderCell.replace(/sticky\s+left-\[80px\]/g, 'sticky left-0');
    // If it didn't have sticky left-80, ensure it does have sticky left-0
    if (!cleanOrderCell.includes('sticky left-0')) {
        cleanOrderCell = cleanOrderCell.replace(/className="([^"]*?)"/, 'className="$1 sticky left-0"');
    }
    
    // In after block, remove any duplicate orderNumber td
    let cleanAfter = after.replace(/<td[\s\S]*?\{row\.orderNumber\}<\/td>/g, '');
    
    return `${before}${cleanOrderCell}${cleanAfter}`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`History gap fixed: ${file}`);
});
console.log('Cleanup complete.');
