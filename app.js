// assets/app.js - shared logic for multi-page flow using localStorage
const STORAGE_KEY = "clam_glid_members_v1";
const LAST_KEY = "clam_glid_last_v1";
const TEMP_KEY = "clam_glid_temp_v1";

// Helpers
function saveMember(member){
  const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  arr.unshift(member);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}
function loadMembers(){ return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
function clearMembers(){ localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(LAST_KEY); }

function goTo(page){ window.location.href = page; }
function esc(s){ if(!s) return ""; return String(s).replaceAll("<","&lt;").replaceAll(">","&gt;"); }

// CSV export for admin
function downloadCSV(){
  const rows = loadMembers();
  if(!rows.length){ alert('No records'); return; }
  const keys = ["date","name","age","gender","phone","email","address","membership","payment","notes"];
  const header = keys.join(",") + "\n";
  const lines = rows.map(r => keys.map(k => "\"" + (r[k]||'').toString().replace(/"/g,'""') + "\"").join(",")).join("\n");
  const csv = header + lines;
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = "clam_glid_members.csv"; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

// Admin password check (client-side)
function checkAdminPass(input){ return input === "DEV@123"; }
