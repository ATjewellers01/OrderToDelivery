const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const orig = content;

  // Pattern: the top-bar submit button that just shows "Submit" (not already with count)
  // Match the text content inside the button, after the icon/text:
  // ✦ Submit\n  (without the count already)
  content = content.replace(
    /(\s*)✦ Submit(?!\{selectedRows)/g,
    `$1✦ Submit{selectedRows.length > 0 ? \` (\${selectedRows.length})\` : ""}`
  );

  if (content !== orig) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
}
console.log('Done.');
