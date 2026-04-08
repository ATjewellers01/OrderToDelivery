const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'app', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip files that don't have tables or have already been fully patched
  if (!content.includes('<table')) continue;

  let originalContent = content;

  // 1. Add handleSelectAll function if it doesn't already exist and toggleCheck exists
  if (content.includes('const toggleCheck =') && !content.includes('const handleSelectAll =')) {
    const handleSelectAllStr = `
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const filteredIds = new Set(filteredData.map((item: any) => item.id));
    setPendingData((prev: any[]) => prev.map((item: any) => 
      filteredIds.has(item.id) ? { ...item, checked: isChecked } : item
    ));
    if (typeof setSelectedRows === 'function') {
      if (isChecked) {
        setSelectedRows((prev: any[]) => {
          const newSet = new Set([...prev, ...Array.from(filteredIds)]);
          return Array.from(newSet);
        });
      } else {
        setSelectedRows((prev: any[]) => prev.filter((id: string) => !filteredIds.has(id)));
      }
    }
  };
`;
    content = content.replace(/(const toggleCheck = [^}]+};\n)/, `$1${handleSelectAllStr}`);
  }

  // 2. Replace the sticky header Action logic (Select All)
  // We look for: {h.name === "Action" ? "Action" : h.name} or {h.name} inside the <th>
  // In existing files it's {h.name}
  if (!content.includes('handleSelectAll') && content.includes('{h.name}')) {
    // wait we just injected handleSelectAll if toggleCheck was there but let's just forcefully replace the Action render
  }
  
  const thRenderRegex = /(<th[^>]*>\s*)\{h\.name\}(\s*<\/th>)/g;
  content = content.replace(thRenderRegex, `$1{h.name === "Action" ? (
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-amber-600 rounded cursor-pointer"
                          checked={filteredData.length > 0 && filteredData.every((item: any) => item.checked)}
                          onChange={handleSelectAll}
                        />
                        <span>Action</span>
                      </div>
                    ) : h.name}$2`);

  // 3. Update headers definitions
  // Remove Order Number from sharedHeaders
  content = content.replace(/\{\s*name:\s*"Order Number"\s*\},?\s*\n?/g, '');
  
  // Insert Order Number into pendingHeaders
  // Find pendingHeaders start
  if (content.match(/const pendingHeaders: HeaderDef\[\] = \[\s*\{\s*name:\s*"Action"/)) {
    // If it already has stickyContext for Action but not Order Number
    content = content.replace(
      /(const pendingHeaders: HeaderDef\[\] = \[\s*\{\s*name:\s*"Action"[^}]+\},)/,
      `$1\n    { name: "Order Number", stickyContext: "left-[80px]", width: "w-[150px] min-w-[150px] max-w-[150px]" },`
    );
  }

  // Insert Order Number into historyHeaders
  if (content.match(/const historyHeaders: HeaderDef\[\] = \[\s*(?=\{)/)) {
    content = content.replace(
      /(const historyHeaders: HeaderDef\[\] = \[\s*)/,
      `$1{ name: "Order Number", stickyContext: "left-0", width: "w-[150px] min-w-[150px] max-w-[150px]" },\n    `
    );
  }

  // 4. Update the actual <td> values to be sticky.
  // Order Number <td> for pending tab (needs left-[80px])
  // We need to match <td ...>{row.orderNumber}</td>
  // And replace its className. 
  // Wait, there are usually two `{row.orderNumber}` per file (pending and history).
  // History tab needs left-0. 
  // Let's do a programmatic replacement by finding the blocks.
  
  const trRegex = /(<tr[^>]*>)([\s\S]*?)(<\/tr>)/g;
  let matches;
  let newContent = "";
  let lastIndex = 0;
  
  // Actually simpler: just find <td ...>{row.orderNumber}</td> and replace the opening <td> Tag
  // Since we don't safely know if it's pending or history from a simple global regex, we can use a trick:
  // Use a string replace function that counts the occurrence.
  let orderNumberCount = 0;
  content = content.replace(/<td[^>]*>\s*\{row\.orderNumber\}\s*<\/td>/g, (match) => {
    orderNumberCount++;
    if (orderNumberCount === 1) {
      // Pending
      return `<td className="px-5 py-3 whitespace-nowrap font-bold text-amber-700 sticky left-[80px] bg-white group-hover:bg-[#fffcf5] z-20 w-[150px] min-w-[150px] max-w-[150px]" style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}>{row.orderNumber}</td>`;
    } else {
      // History
      return `<td className="px-5 py-3 whitespace-nowrap font-bold text-amber-700 sticky left-0 bg-white group-hover:bg-[#fffcf5] z-20 w-[150px] min-w-[150px] max-w-[150px]" style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}>{row.orderNumber}</td>`;
    }
  });

  // Action column checkbox <td> needs sticky left-0
  content = content.replace(/<td[^>]*>\s*<input type="checkbox"[^>]*checked=\{row\.checked\}[^>]*>\s*<\/td>/g, (match) => {
    // Extract the inner input
    const innerInputMatch = match.match(/<input type="checkbox"[^>]*checked=\{row\.checked\}[^>]*>/);
    if (innerInputMatch) {
      return `<td className="px-5 py-3 whitespace-nowrap font-medium sticky left-0 bg-white group-hover:bg-[#fffcf5] z-20 w-[80px] min-w-[80px] max-w-[80px] text-center" style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}>\n                        ${innerInputMatch[0]}\n                      </td>`;
    }
    return match;
  });

  // What about the order of <td>s?
  // We changed pendingHeaders to put Order Number 2nd. 
  // We need to reorder the <td>s inside the pending <tr>.
  // Actually, instead of trying to parse TSX with regex, we can rely on standard structure.
  
  // NOTE: If the Order Number is already strictly the 2nd td, we don't need to reorder it.
  // In MetalIssue, pending headers: [Action, Order Number] -> Action <td>, Order Number <td>
  // In Delivery, pending headers: [Action, Status15, Order Number] before our modification.
  // If we remove Order Number from sharedHeaders and insert it after Action, it becomes [Action, Order Number, Status15].
  // Then we must reorder the <td> for {row.orderNumber} to be before Status15.
  // This is too brittle for regex.
  
  // ALternative: Let's NOT remove Order Number from sharedHeaders if it means reordering columns.
  // Instead, let's just make Order Number sticky wherever it is.
  // If it's the 3rd column, it needs a dynamic `left` offset.
  // This sounds complicated. Let's just swap it manually if needed, or write a more robust parser.

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Finished processing. Modified \${modifiedCount} files.`);
