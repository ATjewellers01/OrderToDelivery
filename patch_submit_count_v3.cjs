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
  
  // Find the button inside the activeTab === "Pending" block
  const buttonRegex = /\{activeTab === "Pending" && \([\s\S]*?<button[\s\S]*?onClick=\{openPopup\}[\s\S]*?>[\s\S]*?Submit[\s\S]*?<\/button>[\s\S]*?\)\}/g;

  content = content.replace(buttonRegex, (match) => {
    // 1. Clean out the className
    // Find everything inside className="..."
    const classMatch = match.match(/className="([^"]*?)"/);
    if (!classMatch) return match;

    let classes = classMatch[1].split(' ');
    
    // Classes to become dynamic (if they exist)
    const dynamicClasses = [
      'bg-amber-600', 'text-white', 'hover:bg-amber-700', 'shadow-md', 'hover:shadow-lg', 'active:scale-95'
    ];
    
    // Filter out these classes from the static list
    const staticClasses = classes.filter(c => !dynamicClasses.includes(c)).join(' ');

    const newMatch = match.replace(/className="[^"]*?"/, 
      `className={\`${staticClasses} \${selectedRows.length > 0 ? "bg-amber-500 text-white hover:bg-amber-600 shadow-sm cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"}\`} `
    );

    // 2. Update the text "Submit"
    const finalMatch = newMatch.replace(/>\s*Submit\s*</, '>Submit{selectedRows.length > 0 ? ` (${selectedRows.length})` : ""}<');

    return finalMatch;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Patched: ${file}`);
});
console.log('Patch complete.');
