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
  
  // 1. Fix Headers (Deduplicate and set correct offsets)
  const historyHeaderRegex = /(historyHeaders:\s*HeaderDef\[\]\s*=\s*\[)([\s\S]*?)(\s*\];)/;
  content = content.replace(historyHeaderRegex, (match, start, inner, end) => {
    let cleanInner = inner.replace(/\{\s*name:\s*"Order Number"[\s\S]*?\},?\s*/g, '');
    return `${start}\n    { name: "Order Number", stickyContext: "left-0", width: "w-[150px] min-w-[150px] max-w-[150px]" },${cleanInner}${end}`;
  });

  // 2. Fix Rows by splitting by <tr
  const segments = content.split(/<tr/);
  const processedSegments = segments.map((seg, idx) => {
    if (idx === 0) return seg; // Before the first <tr
    
    // We only want to target rows that have orderNumber but NOT a checkbox
    if (seg.includes('{row.orderNumber}') && !seg.includes('type="checkbox"')) {
        // Extract the orderNumber TD
        const orderTdRegex = /<td[^>]*?\{row\.orderNumber\}<\/td>/;
        const match = seg.match(orderTdRegex);
        if (match) {
            let orderCell = match[0];
            // Fix sticky and properties
            orderCell = orderCell.replace(/left-\[80px\]|left-0/g, 'left-0');
            if (!orderCell.includes('sticky')) {
                orderCell = orderCell.replace(/className="([^"]+)"/, 'className="$1 sticky left-0 z-20 bg-white"');
            }
            if (!orderCell.includes('style=')) {
               orderCell = orderCell.replace(/className="([^"]+)"/, 'className="$1" style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}');
            } else if (!orderCell.includes('boxShadow')) {
               orderCell = orderCell.replace(/style=\{\{/, 'style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)", ');
            }
            
            let remainingSeg = seg.replace(orderTdRegex, '');
            // Prepend the cell right after the <tr attributes (the first >)
            return remainingSeg.replace(/>/, `>\n                      ${orderCell}`);
        }
    }
    return seg;
  });
  
  const newContent = processedSegments.join('<tr');
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`History gap fixed V6: ${file}`);
  }
});
console.log('Final Cleanup complete.');
