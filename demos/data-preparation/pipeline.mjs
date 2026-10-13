export const MAX_ROWS = 1000;
export const STAGE_COUNT = 4;

export const MIXED_CSV = `id,timestamp,group,amount
EV001,2026-10-01T09:00:00Z,A,12.00
EV002,2026-10-01T09:02:00Z,B,8.00
EV003,2026-10-01T09:04:00Z,A,0
EV004,2026-10-01T09:06:00Z,C,5.00
EV004,2026-10-01T09:06:00Z,C,5.00
EV005,2026-10-01T09:08:00Z,B,
EV006,2026-10-01T09:10:00Z,D,unknown
EV007,2026-10-01T09:12:00Z,A,14.00
EV007,2026-10-01T09:12:00Z,A,21.00
EV008,2026-02-30T09:14:00Z,C,4.00
EV009,2026-10-01T09:16:00Z,D,10.00
EV010,2026-10-01T09:18:00Z,B,-2.00
EV011,2026-10-01T09:20:00Z,,6.00
EV012,2026-10-01T09:22:00Z,A,4.50
EV013,2026-10-01T09:24:00Z,C,7.00
EV014,2026-10-01T09:26:00Z,D,0
EV015,2026-10-01T09:28:00Z,B,3.00`;

export function makeScenario(rows, scenario) {
  if (!["mixed", "complete", "missing", "conflicts"].includes(scenario)) throw new RangeError("Unknown scenario");
  return rows.map((raw, index) => {
    const row = { ...raw };
    if (scenario !== "mixed") {
      row.id = `EV${String(index + 1).padStart(3, "0")}`;
      row.timestamp = `2026-10-01T09:${String(index * 2).padStart(2, "0")}:00Z`;
      row.group = String.fromCharCode(65 + index % 4);
      row.amount = ["12.00", "8.00", "0", "5.00", "4.00", "6.00", "2.00", "14.00", "21.00", "4.00", "10.00", "-2.00", "6.00", "4.50", "7.00", "0", "3.00"][index];
      if (scenario === "missing" && [4, 8, 12].includes(index)) row.amount = "";
      if (scenario === "conflicts" && index === 4) Object.assign(row, { id: "EV004", timestamp: "2026-10-01T09:06:00Z", group: "D", amount: "5.00" });
      if (scenario === "conflicts" && index === 8) Object.assign(row, { id: "EV008", timestamp: "2026-10-01T09:14:00Z", group: "D", amount: "21.00" });
    }
    return row;
  });
}

export function parseAmount(value) {
  if (value === null || value === undefined || String(value).trim() === "") return { missing: true, cents: null };
  const text = String(value).trim();
  if (!/^-?\d{1,7}(?:\.\d{1,2})?$/.test(text)) return { error: "invalid_amount" };
  const negative = text.startsWith("-");
  const [whole, fraction = ""] = text.replace(/^-/, "").split(".");
  const cents = (Number(whole) * 100 + Number(fraction.padEnd(2, "0"))) * (negative ? -1 : 1);
  if (Math.abs(cents) > 100000000) return { error: "invalid_amount" };
  return { missing: false, cents: cents === 0 ? 0 : cents };
}

export function isStrictUtcDate(value) {
  const text = String(value ?? "");
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.exec(text);
  if (!match) return false;
  const parts = match.slice(1).map(Number);
  const [year, month, day, hour, minute, second] = parts;
  if (year < 2000 || year > 2099 || month < 1 || month > 12 || day < 1 || hour > 23 || minute > 59 || second > 59) return false;
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function validationReason(row) {
  if (!/^[A-Za-z0-9_-]{1,48}$/.test(String(row.id ?? "").trim())) return "invalid_id";
  if (!isStrictUtcDate(row.timestamp)) return "invalid_date";
  const group = String(row.group ?? "").trim();
  if (!group || group.length > 48) return "invalid_group";
  return parseAmount(row.amount).error || null;
}

export function runPipeline(rows, { missing = "quarantine", duplicate = "reject" } = {}, stage = STAGE_COUNT) {
  if (!Array.isArray(rows) || rows.length > MAX_ROWS) throw new RangeError(`Expected at most ${MAX_ROWS} rows`);
  if (!Number.isInteger(stage) || stage < 0 || stage > STAGE_COUNT) throw new RangeError("Invalid stage");
  if (!["quarantine", "zero"].includes(missing) || !["reject", "first"].includes(duplicate)) throw new RangeError("Invalid policy");
  const source = rows.map((row, index) => ({ ...row, sourceRow: row.sourceRow ?? index + 1 }));
  const quarantine = [];
  const audit = [];
  let cleaned = source.map(row => ({ ...row }));
  if (stage >= 1) {
    cleaned = [];
    for (const row of source) {
      const reason = validationReason(row);
      if (reason) { quarantine.push({ ...row, reason }); continue; }
      const { cents } = parseAmount(row.amount);
      cleaned.push({ id: String(row.id).trim(), timestamp: row.timestamp, group: String(row.group).trim(), amount: cents === null ? null : cents / 100, amountCents: cents, sourceRow: row.sourceRow, imputed: Boolean(row.imputed), conflictRetained: Boolean(row.conflictRetained) });
    }
    audit.push({ stage: 1, kept: cleaned.length, rejected: quarantine.length });
  }
  if (stage >= 2) {
    const next = [];
    for (const row of cleaned) {
      if (row.amountCents !== null) { next.push(row); continue; }
      if (missing === "zero") next.push({ ...row, amount: 0, amountCents: 0, imputed: true });
      else quarantine.push({ ...row, reason: "missing_amount" });
    }
    const rejected = cleaned.length - next.length;
    cleaned = next;
    audit.push({ stage: 2, kept: cleaned.length, rejected, imputed: cleaned.filter(row => row.imputed).length });
  }
  if (stage >= 3) {
    const byId = new Map();
    for (const row of cleaned) { if (!byId.has(row.id)) byId.set(row.id, []); byId.get(row.id).push(row); }
    const next = [];
    let conflicts = 0;
    for (const group of byId.values()) {
      const signatures = new Set(group.map(row => JSON.stringify([row.timestamp, row.group, row.amountCents])));
      const conflict = signatures.size > 1;
      if (conflict) conflicts += 1;
      if (conflict && duplicate === "reject") group.forEach(row => quarantine.push({ ...row, reason: "duplicate_conflict" }));
      else {
        next.push({ ...group[0], conflictRetained: conflict || group[0].conflictRetained });
        group.slice(1).forEach(row => quarantine.push({ ...row, reason: conflict ? "duplicate_keep_first" : "duplicate_exact" }));
      }
    }
    const rejected = cleaned.length - next.length;
    cleaned = next.sort((a, b) => a.sourceRow - b.sourceRow);
    audit.push({ stage: 3, kept: cleaned.length, rejected, conflictGroups: conflicts });
  }
  const groups = [];
  if (stage >= 4) {
    const byGroup = new Map();
    for (const row of cleaned) {
      if (!byGroup.has(row.group)) byGroup.set(row.group, { group: row.group, count: 0, cents: 0 });
      const item = byGroup.get(row.group);
      item.count += 1;
      item.cents += row.amountCents;
    }
    groups.push(...[...byGroup.values()].sort((a, b) => a.group.localeCompare(b.group)).map(item => ({ ...item, amount: item.cents / 100 })));
    audit.push({ stage: 4, kept: cleaned.length, rejected: 0, groups: groups.length });
  }
  const reasons = quarantine.reduce((counts, row) => { counts[row.reason] = (counts[row.reason] || 0) + 1; return counts; }, {});
  return { source, cleaned, quarantine: quarantine.sort((a, b) => a.sourceRow - b.sourceRow), groups, audit, reasons, stage, policies: { missing, duplicate }, summary: { input: source.length, kept: cleaned.length, quarantined: quarantine.length, zeros: stage ? cleaned.filter(row => row.amountCents === 0).length : source.filter(row => parseAmount(row.amount).cents === 0).length, imputed: cleaned.filter(row => row.imputed).length, totalCents: stage ? cleaned.reduce((sum, row) => sum + (row.amountCents || 0), 0) : null } };
}

export function exportRows(rows) {
  return rows.map(row => ({ source_row: row.sourceRow, id: row.id, timestamp: row.timestamp, group: row.group, amount: row.amount ?? "", imputed: Boolean(row.imputed), conflict_retained: Boolean(row.conflictRetained), ...(row.reason ? { reason: row.reason } : {}) }));
}

export function protectCsvCell(value) {
  const text = String(value ?? "");
  return /^[\s\u0000-\u001f]*[=+\-@]/.test(text) ? `'${text}` : text;
}
