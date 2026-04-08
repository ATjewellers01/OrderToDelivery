const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'pages');
const targetFiles = [
  'BanglePolish.tsx', 'Delivery.tsx', 'DispatchDepartment.tsx', 'EPolish.tsx', 
  'GhatJama.tsx', 'HuidLabel.tsx', 'MeenaInhouse.tsx', 'MeenaOutside.tsx', 
  'PolishInhouse.tsx', 'PolishOutside.tsx', 'QC1.tsx', 'QC2.tsx', 'QC3.tsx', 
  'ReceiptDepartment.tsx', 'ReceivedInStock.tsx', 'MetalIssue.tsx', 'FlwUp.tsx'
];

targetFiles.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // 1. Headers normalization (Deduplicate and set correct offsets)
  const historyHeaderRegex = /(historyHeaders:\s*HeaderDef\[\]\s*=\s*\[)([\s\S]*?)(\s*\];)/;
  content = content.replace(historyHeaderRegex, (match, start, inner, end) => {
    let cleanInner = inner.replace(/\{\s*name:\s*"Order Number"[\s\S]*?\},?\s*/g, '');
    return `${start}\n    { name: "Order Number", stickyContext: "left-0", width: "w-[150px] min-w-[150px] max-w-[150px]" },${cleanInner}${end}`;
  });

  // 2. Rows: Reorder for History Tab (Non-checkbox rows)
  const trRegex = /<tr[\s\S]*?>([\s\S]*?)<\/tr>/g;
  let rowMatches = 0;
  content = content.replace(trRegex, (fullMatch, inner) => {
    // If it's a History row (no checkbox) and has orderNumber
    if (!inner.includes('type="checkbox"') && inner.includes('{row.orderNumber}')) {
        const orderTdMatch = inner.match(/<td[^>]*?\{row\.orderNumber\}<\/td>/);
        if (orderTdMatch) {
            rowMatches++;
            let orderCell = orderTdMatch[0];
            // Fix sticky and props
            orderCell = orderCell.replace(/left-\[80px\]|left-0/g, 'left-0');
            if (!orderCell.includes('sticky')) {
                orderCell = orderCell.replace(/className="([^"]+)"/, 'className="$1 sticky left-0 z-20 bg-white"');
            }
            if (!orderCell.includes('style=')) {
               orderCell = orderCell.replace(/className="([^"]+)"/, 'className="$1" style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}');
            } else if (!orderCell.includes('boxShadow')) {
               orderCell = orderCell.replace(/style=\{\{/, 'style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)", ');
            }
            
            let restInner = inner.replace(/<td[^>]*?\{row\.orderNumber\}<\/td>/, '');
            // Move orderCell to front of inner
            return fullMatch.replace(inner, `\n                      ${orderCell}${restInner}`);
        }
    }
    return fullMatch;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed History gap V7: ${file} (rows: ${rowMatches})`);
  }
});
console.log('Final Cleanup complete.');
