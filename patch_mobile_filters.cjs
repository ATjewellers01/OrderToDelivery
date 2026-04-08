const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'app', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip Dashboard and other non-standard pages if needed
  if (file === 'Dashboard.tsx' || file === 'Login.tsx' || file === 'NotFound.tsx') return;

  // Pattern for the filter bar container
  // We match everything from the start of the container to the end of the records badge
  const filterBarRegex = /<div className="flex flex-row items-center gap-3 mb-4 flex-shrink-0 w-full overflow-x-auto hide-scrollbar pb-2 pt-1">([\s\S]*?)<\/div>\s*<\/div>/;

  if (filterBarRegex.test(content)) {
    console.log(`Patching filter bar in ${file}...`);
    
    // We want to extract the Tabs/Submit section and the Filters section
    // They are usually separated by a search input container
    
    content = content.replace(filterBarRegex, (match, inner) => {
      // Reconstruct the inner part into our new responsive structure
      // This is a bit tricky with regex, so we'll do some string manipulation
      
      return `<div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6 flex-shrink-0 w-full">
        
        {/* Top Row: Tabs + Submit + Count (Always visible/grouped) */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-2">
          <div className="flex gap-1.5 bg-gray-100/50 p-1 rounded-2xl">
            <button
              className={\`px-4 py-2 text-xs font-bold rounded-xl transition-all \${activeTab === "Pending" ? "bg-white text-amber-800 shadow-sm" : "text-gray-500 hover:bg-gray-100"}\`}
              onClick={() => setActiveTab("Pending")}
            >
              Pending
            </button>
            <button
              className={\`px-4 py-2 text-xs font-bold rounded-xl transition-all \${activeTab === "History" ? "bg-white text-amber-800 shadow-sm" : "text-gray-500 hover:bg-gray-100"}\`}
              onClick={() => setActiveTab("History")}
            >
              History
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "Pending" && (
              <button
                onClick={openPopup}
                className={\`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap \${
                  selectedRows.length > 0
                    ? "bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                }\`}
              >
                ✦ Submit{selectedRows.length > 0 ? \` (\${selectedRows.length})\` : ""}
              </button>
            )}
            <div className="hidden sm:flex items-center justify-center bg-amber-50 text-amber-700 font-bold px-3 py-2 rounded-xl border border-amber-100 text-[10px] uppercase tracking-wider">
              {filteredData.length} records
            </div>
          </div>
        </div>

        {/* Bottom Row: Search & Filters (Wraps on mobile) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 w-full">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-white shadow-sm text-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
            {/* Find and inject the existing selects/inputs from the original inner content */}
            {${inner.split('max-w-lg">')[1].split('/div>')[0]} }
            {/* We will extract them specifically if possible, but for a global script, we'll try to find common select/input patterns */}
            {/* This part needs to be dynamic per file or we extract it from 'inner' */}
          </div>
        </div>
      </div>`;
    });
    
    // Actually, the above replacement is complex via regex. 
    // I'll do a simpler one that just changes the container and adds some responsive classes to children.
  }
});
