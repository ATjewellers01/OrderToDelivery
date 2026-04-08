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
  
  // Very specific match for the button block inside the filter bar
  // Match starting from {activeTab === "Pending" && (
  // until the first closing )}
  const fullBlockRegex = /\{activeTab === "Pending" && \([\s\S]*?<button[\s\S]*?onClick=\{openPopup\}[\s\S]*?<\/button>[\s\S]*?\)\}/;

  const newBlock = `{activeTab === "Pending" && (
            <button
              onClick={openPopup}
              className={\`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ml-2 \${
                selectedRows.length > 0
                  ? "bg-amber-500 text-white hover:bg-amber-600 shadow-sm cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
              }\`}
            >
              Submit{selectedRows.length > 0 ? \` (\${selectedRows.length})\` : ""}
            </button>
          )}`;

  const updatedContent = content.replace(fullBlockRegex, newBlock);

  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Cleanly updated: ${file}`);
  } else {
    console.log(`Mismatch or already clean: ${file}`);
  }
});
console.log('Cleanup complete.');
