const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('<table')) continue;

  let orig = content;

  // 1. Add handleSelectAll after toggleCheck
  if (content.includes('const toggleCheck =') && !content.includes('const handleSelectAll =')) {
    const replacement = `const toggleCheck = (id: string) => {
    setPendingData((prev: any[]) => prev.map((item: any) => item.id === id ? { ...item, checked: !item.checked } : item));
    if (typeof setSelectedRows !== 'undefined') {
       setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const filteredIds = new Set(filteredData.map((item: any) => item.id));
    setPendingData((prev: any[]) => prev.map((item: any) => 
      filteredIds.has(item.id) ? { ...item, checked: isChecked } : item
    ));
    if (typeof setSelectedRows !== 'undefined') {
      if (isChecked) {
        setSelectedRows((prev: any[]) => Array.from(new Set([...prev, ...Array.from(filteredIds)])));
      } else {
        setSelectedRows((prev: any[]) => prev.filter((id: string) => !filteredIds.has(id)));
      }
    }
  };`;
    // We replace the toggleCheck implementation with a new one + handleSelectAll
    content = content.replace(/const toggleCheck =[\s\S]*?};\s*(?=\n\s*(?:const|openPopup|handleFormChange|\[|let|var))/m, replacement + '\n\n  ');
  }

  // 2. Replace the <th> logic for checkbox
  //   {h.name}
  // </th>
  const thRegex = /<th([^>]*)>\s*\{h\.name\}\s*<\/th>/g;
  content = content.replace(thRegex, `<th$1>
                      {h.name === "Action" ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-amber-600 rounded cursor-pointer"
                            checked={filteredData.length > 0 && filteredData.every((item: any) => item.checked)}
                            onChange={handleSelectAll}
                          />
                          <span>Action</span>
                        </div>
                      ) : (
                        h.name
                      )}
                    </th>`);

  // 3. Instead of trying to parse custom header definitions and re-order <td> tags, we can just apply CSS classes dynamically to the FIRST and SECOND <td> and <th> tags using generalized index-based standard CSS classes dynamically mapping inside the JSX map loops!
  // Actually, React doesn't easily let you alter row mapping without Babel.
  // Wait, if we just find:
  // `{ name: "Order Number" }`
  // And replace it with:
  // `{ name: "Order Number", stickyContext: "left-[80px]", width: "w-[150px] min-w-[150px] max-w-[150px]" }`
  // We can just do that!
  content = content.replace(/\{\s*name:\s*"Order Number"\s*\}/g, '{ name: "Order Number", stickyContext: "left-[80px]", width: "w-[150px] min-w-[150px] max-w-[150px]" }');
  content = content.replace(/\{\s*name:\s*"Action"\s*\}/g, '{ name: "Action", stickyContext: "left-0", width: "w-[80px] min-w-[80px] max-w-[80px]" }');

  // But we also need the <td> elements to have `sticky left-[80px]` etc.
  // Action <td>:
  content = content.replace(/<td[^>]*>\s*<input type="checkbox"/g, '<td className="px-5 py-3 whitespace-nowrap font-medium sticky left-0 bg-white group-hover:bg-[#fffcf5] z-20 w-[80px] min-w-[80px] max-w-[80px] text-center" style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}>\n                        <input type="checkbox"');
  
  // Order Number <td>:
  content = content.replace(/<td[^>]*>(\s*\{row\.orderNumber\}\s*)<\/td>/g, '<td className="px-5 py-3 whitespace-nowrap font-bold text-amber-700 sticky left-[80px] bg-white group-hover:bg-[#fffcf5] z-20 w-[150px] min-w-[150px] max-w-[150px]" style={{ boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)" }}>$1</td>');


  if (content !== orig) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
