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
  
  // Final, more robust way to find the History mapping rows
  // Look for: ) : ( filteredData.map((row: any) => ( <tr ...>
  // We'll use a regex that matches the split point
  const mappingSplitRegex = /(\)\s*:\s*\(\s*filteredData\.map\(\s*\(row:\s*any\)\s*=>\s*\(\s*<tr[^>]*?>)([\s\S]*?)(<\/tr>)/g;
  
  content = content.replace(mappingSplitRegex, (match, trStart, inner, trEnd) => {
    // We only want to target the SECOND split (the History one)
    // Actually, mappingSplitRegex will match all mappings. 
    // Usually the first is Pending, second is History. 
    // But Pending rows have an Action column first.
    
    if (inner.includes('row.orderNumber')) {
        // If orderNumber is already first and has left-0, skip
        if (inner.trim().startsWith('<td') && inner.includes('{row.orderNumber}') && inner.includes('left-0')) {
            return match;
        }

        // Reorder: Find orderNumber cell
        let orderCellMatch = inner.match(/<td[^>]*?\{row\.orderNumber\}<\/td>/);
        if (orderCellMatch) {
            let orderCell = orderCellMatch[0];
            // Fix sticky
            orderCell = orderCell.replace(/left-\[80px\]|left-0/g, 'left-0');
            if (!orderCell.includes('sticky')) {
                orderCell = orderCell.replace(/className="([^"]+)"/, 'className="$1 sticky left-0 z-20 bg-white"');
            }
            // Add shadow if missing
            if (!orderCell.includes('boxShadow')) {
                orderCell = orderCell.replace(/(<td[^>]*?style=\{[\s\S]*?)/, '$1 boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)",');
                if (!orderCell.includes('style=')) {
                   orderCell = orderCell.replace(/className="([^"]*?)"/, 'className="$1" style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}');
                }
            }

            let rest = inner.replace(/<td[^>]*?\{row\.orderNumber\}<\/td>/, '');
            // Trim leading whitespace then prepend the order cell
            return `${trStart}\n                      ${orderCell}${rest}${trEnd}`;
        }
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`History row reordered V4: ${file}`);
});
console.log('Cleanup complete.');
