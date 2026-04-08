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
  const orig = content;

  // Pattern to match the specific top-bar Submit button
  // 1. Matches the {activeTab === "Pending" && ( ... <button onClick={openPopup} ... > Submit </button> ) } block
  const buttonRegex = /\{activeTab === "Pending" && \([\s\S]*?<button[\s\S]*?onClick=\{openPopup\}[\s\S]*?>[\s\S]*?Submit[\s\S]*?<\/button>[\s\S]*?\)\}/g;

  content = content.replace(buttonRegex, (match) => {
    // If it already has selectedRows.length, skip (unlikely given my previous check)
    if (match.includes('selectedRows.length')) return match;

    // 1. Update the className to be dynamic
    // We want to replace something like:
    // className="px-6 py-2 bg-amber-600 text-white text-sm font-bold rounded-xl hover:bg-amber-700 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 ml-2"
    // with our dynamic template string version.
    
    let updatedMatch = match.replace(/className="([^"]*?)"/, 'className={`$1 ${selectedRows.length > 0 ? "bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg active:scale-95 cursor-pointer": "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"}`}');
    
    // Remove the static bg and hover classes from the first part of the template string
    updatedMatch = updatedMatch.replace('bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg active:scale-95 ', '');

    // 2. Update the text "Submit" to include the count
    updatedMatch = updatedMatch.replace(/>\s*Submit\s*</, '>Submit{selectedRows.length > 0 ? ` (${selectedRows.length})` : ""}<');

    return updatedMatch;
  });

  if (content !== orig) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated successfully: ${file}`);
  } else {
    console.log(`Already updated or pattern not found: ${file}`);
  }
});
console.log('Patch complete.');
