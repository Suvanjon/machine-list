const XLSX = require('xlsx');
const fs = require('fs');

const wb = XLSX.readFile('C:/Users/user/MaintenanceWork/ppt/machine_list.xlsx');

const mi = XLSX.utils.sheet_to_json(wb.Sheets['Machine Info'], { header: 1, blankrows: false });
const li = XLSX.utils.sheet_to_json(wb.Sheets['Land Info'], { header: 1, blankrows: false });

const num = v => (v === null || v === undefined || v === '') ? null : (typeof v === 'number' ? v : (isNaN(parseFloat(v)) ? null : parseFloat(v)));
const str = v => (v === null || v === undefined) ? '' : String(v).trim();

const machines = [];
let cur = null;
for (let i = 1; i < mi.length; i++) {
  const r = mi[i];
  const section = str(r[0]);
  if (section.indexOf('Total') === 0) continue;
  const machine = str(r[1]);
  const brand = str(r[2]);
  const supplier = str(r[3]);
  const company = str(r[4]);
  const mail = str(r[5]);
  const qty = num(r[6]);
  const rate = num(r[7]);
  const total = num(r[8]);
  const sup = { brand, supplier, company, mail };
  if (machine) {
    cur = { section, machine, brand, supplier, company, mail, qty, rate, total, alts: [] };
    machines.push(cur);
  } else if (cur) {
    cur.alts.push(sup);
  }
}

const land = [];
let project = '';
for (let i = 1; i < li.length; i++) {
  const r = li[i];
  if (r[0]) project = str(r[0]);
  const machine = str(r[1]);
  const isTotal = machine.indexOf('Total') === 0;
  land.push({
    project,
    machine,
    qty: num(r[2]),
    length: num(r[3]),
    width: num(r[4]),
    base: num(r[5]),
    totalBase: num(r[6]),
    clearance: num(r[7]),
    totalAreaM: num(r[8]),
    totalAreaF: num(r[9]),
    isTotal
  });
}

const out = 'window.MACHINE_DATA=' + JSON.stringify(machines) + ';\nwindow.LAND_DATA=' + JSON.stringify(land) + ';\n';
fs.writeFileSync('C:/Users/user/MaintenanceWork/machine-list/data.js', out);

const totalUSD = machines.reduce((a, m) => a + (m.total || 0), 0);
const totalQty = machines.reduce((a, m) => a + (m.qty || 0), 0);
console.log('machines=' + machines.length + ' qty=' + totalQty + ' usd=' + totalUSD + ' landRows=' + land.length);
