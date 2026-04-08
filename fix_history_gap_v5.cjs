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
  
  // 1. Fix Headers project-wide (History: first and left-0, Pending: second and left-80)
  // Re-run the header normalization part of V3 to be sure
  const historyHeaderRegex = /(historyHeaders:\s*HeaderDef\[\]\s*=\s*\[)([\s\S]*?)(\s*\];)/;
  content = content.replace(historyHeaderRegex, (match, start, inner, end) => {
    let cleanInner = inner.replace(/\{\s*name:\s*"Order Number"[\s\S]*?\},?\s*/g, '');
    return `${start}\n    { name: "Order Number", stickyContext: "left-0", width: "w-[150px] min-w-[150px] max-w-[150px]" },${cleanInner}${end}`;
  });

  // 2. Fix Rows: Move orderNumber TD to first in History rows (tr without checkbox)
  const trRegex = /<tr[\s\S]*?<\/tr>/g;
  content = content.replace(trRegex, (trMatch) => {
    // If it's a History row (no checkbox) and has orderNumber
    if (!trMatch.includes('type="checkbox"') && trMatch.includes('{row.orderNumber}')) {
        let orderCellMatch = trMatch.match(/<td[^>]*?\{row\.orderNumber\}<\/td>/);
        if (orderCellMatch) {
            let orderCell = orderCellMatch[0];
            // Fix sticky context and offset
            orderCell = orderCell.replace(/left-\[80px\]|left-0/g, 'left-0');
            if (!orderCell.includes('sticky')) {
                orderCell = orderCell.replace(/className="([^"]+)"/, 'className="$1 sticky left-0 z-20 bg-white"');
            }
            // Add shadow if missing
            if (!orderCell.includes('boxShadow')) {
                orderCell = orderCell.replace(/style=\{[\s\S]*?\}/, 'style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}');
                if (!orderCell.includes('style=')) {
                   orderCell = orderCell.replace(/className="([^"]+)"/, 'className="$1" style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}');
                }
            }
            
            let restInner = trMatch.replace(/<td[^>]*?\{row\.orderNumber\}<\/td>/, '');
            // Move orderCell to after <tr ...>
            return restInner.replace(/(<tr[^>]*?>)/, `$1\n                      ${orderCell}`);
        }
    }
    return trMatch;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`History gap fixed V5: ${file}`);
});
console.log('Cleanup complete.');
