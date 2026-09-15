# Machine List Dashboard

Dashboard for the **GSS & LED Machine List** (Akij Light Engineering Ltd.).

Built from the source workbook `GSS,LED Machine List.xlsx`.

## Pages
- **Machine List** - section cards (Plastic, Work Shop, Switch, LED, LAB) with machine counts, total sets and USD value, plus the full machine table (section, machine, brand/origin, supplier/company, mail, qty, rate, total). Clicking a section card filters the table.
- **Land & Space Plan** - project-wise machine/area breakdown with base area, clearance and total area in Sq.M / Sq.F.

## Files
- `index.html` - the dashboard (UI + logic)
- `data.js` - machine and land data extracted from the workbook
- `extract.js` - regenerates `data.js` from the `.xlsx` (requires `xlsx`)

## Updating the data
```
node extract.js
```
Then commit and push.
