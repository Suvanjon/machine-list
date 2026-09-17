const fs = require('fs');
const t = fs.readFileSync('C:/Users/user/MaintenanceWork/machine-list/_dump.csv', 'utf8').replace(/^\uFEFF/, '');
function parseCSV(text) {
  var lines = [], row = [], field = '', inQ = false;
  for (var i = 0; i < text.length; i++) {
    var c = text[i];
    if (inQ) { if (c === '"') { if (i + 1 < text.length && text[i + 1] === '"') { field += '"'; i++; } else { inQ = false; } } else { field += c; } }
    else { if (c === '"') { inQ = true; } else if (c === ',') { row.push(field); field = ''; } else if (c === '\n' || c === '\r') { if (c === '\r' && i + 1 < text.length && text[i + 1] === '\n') i++; row.push(field); field = ''; if (row.length > 1) lines.push(row); row = []; } else { field += c; } }
  }
  if (field || row.length > 0) { row.push(field); if (row.length > 1) lines.push(row); }
  return lines;
}
var rows = parseCSV(t);
console.log('total data rows (excl header):', rows.length - 1);
for (var i = 1; i < rows.length; i++) {
  var r = rows[i];
  var sec = (r[0] || '').trim(), m = (r[1] || '').trim();
  var hasSup = (r[2] || '').trim() || (r[3] || '').trim() || (r[4] || '').trim() || (r[5] || '').trim();
  if (!m && hasSup) {
    console.log('ALT ROW ' + (i + 1) + '  sec=' + sec + '  brand=' + (r[2] || '').trim() + '  supplier=' + (r[3] || '').trim() + '  company=' + (r[4] || '').trim() + '  mail=' + (r[5] || '').trim());
  }
}
