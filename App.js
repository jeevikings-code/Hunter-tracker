import { useState, useEffect } from "react";

const INITIAL_DATA = {
  hunterName: "Hunter",
  currentYear: 1,
  totalXP: 0,
  rank: "E",
  quests: {
    gate: [
      { id: "g1", title: "Understand GATE syllabus & pattern", xp: 100, done: false, year: 1 },
      { id: "g2", title: "Complete Engineering Mathematics (GATE)", xp: 200, done: false, year: 1 },
      { id: "g3", title: "Master Data Structures & Algorithms", xp: 300, done: false, year: 2 },
      { id: "g4", title: "Complete OS, DBMS, CN theory", xp: 300, done: false, year: 2 },
      { id: "g5", title: "Solve 500+ GATE PYQs", xp: 400, done: false, year: 3 },
      { id: "g6", title: "Appear for GATE mock tests monthly", xp: 300, done: false, year: 3 },
      { id: "g7", title: "Register & appear for GATE exam", xp: 500, done: false, year: 4 },
    ],
    placement: [
      { id: "p1", title: "Build a strong LinkedIn profile", xp: 100, done: false, year: 1 },
      { id: "p2", title: "Learn a programming language deeply (C++/Python)", xp: 200, done: false, year: 1 },
      { id: "p3", title: "Complete 100 LeetCode problems", xp: 300, done: false, year: 2 },
      { id: "p4", title: "Build your first real project", xp: 250, done: false, year: 2 },
      { id: "p5", title: "Get a summer internship (3rd year)", xp: 500, done: false, year: 3 },
      { id: "p6", title: "Complete 300+ LeetCode / competitive coding", xp: 400, done: false, year: 3 },
      { id: "p7", title: "Apply to 50+ companies, crack placements", xp: 600, done: false, year: 4 },
    ],
    skills: [
      { id: "s1", title: "Learn Git & GitHub basics", xp: 100, done: false, year: 1 },
      { id: "s2", title: "Build a personal portfolio website", xp: 150, done: false, year: 1 },
      { id: "s3", title: "Learn one web framework (React/Django)", xp: 250, done: false, year: 2 },
      { id: "s4", title: "Contribute to an open source project", xp: 300, done: false, year: 2 },
      { id: "s5", title: "Learn system design basics", xp: 300, done: false, year: 3 },
      { id: "s6", title: "Complete a full-stack personal project", xp: 400, done: false, year: 3 },
      { id: "s7", title: "Publish a technical blog or paper", xp: 350, done: false, year: 4 },
    ],
    college: [
      { id: "c1", title: "Join a coding club or tech society", xp: 100, done: false, year: 1 },
      { id: "c2", title: "Participate in your first hackathon", xp: 200, done: false, year: 1 },
      { id: "c3", title: "Make 5 genuine college friends", xp: 100, done: false, year: 1 },
      { id: "c4", title: "Attend a national-level tech fest", xp: 200, done: false, year: 2 },
      { id: "c5", title: "Win or top-10 in a hackathon", xp: 350, done: false, year: 2 },
      { id: "c6", title: "Take on a leadership role in a club", xp: 250, done: false, year: 3 },
      { id: "c7", title: "Mentor juniors in your department", xp: 200, done: false, year: 4 },
    ],
    health: [
      { id: "h1", title: "Establish a consistent sleep schedule", xp: 100, done: false, year: 1 },
      { id: "h2", title: "Exercise 3x per week for 1 month", xp: 150, done: false, year: 1 },
      { id: "h3", title: "Cook / eat healthy meals regularly", xp: 100, done: false, year: 2 },
      { id: "h4", title: "Meditate or journal for 30 days straight", xp: 200, done: false, year: 2 },
      { id: "h5", title: "Run a 5K or complete a fitness goal", xp: 200, done: false, year: 3 },
      { id: "h6", title: "Maintain work-life balance during placements", xp: 300, done: false, year: 4 },
    ],
  },
  dailyLog: [],
};

const RANKS = [
  { rank: "E", minXP: 0, color: "#6b7280", label: "E-Rank Hunter" },
  { rank: "D", minXP: 500, color: "#3b82f6", label: "D-Rank Hunter" },
  { rank: "C", minXP: 1200, color: "#10b981", label: "C-Rank Hunter" },
  { rank: "B", minXP: 2500, color: "#8b5cf6", label: "B-Rank Hunter" },
  { rank: "A", minXP: 4000, color: "#f59e0b", label: "A-Rank Hunter" },
  { rank: "S", minXP: 6000, color: "#ef4444", label: "S-Rank Hunter" },
  { rank: "SS", minXP: 8000, color: "#ec4899", label: "SS-Rank Hunter" },
  { rank: "SSS", minXP: 10000, color: "#a855f7", label: "National Level Hunter" },
];

const CATEGORY_META = {
  gate: { label: "GATE Arc", icon: "📐", color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
  placement: { label: "Placement Arc", icon: "💼", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  skills: { label: "Skill Arc", icon: "⚡", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  college: { label: "College Life Arc", icon: "🏛️", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  health: { label: "Body Arc", icon: "💪", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
};

const YEAR_THEMES = [
  { year: 1, title: "The Awakening", subtitle: "Build your foundation. Habits made now last 4 years.", color: "#6366f1" },
  { year: 2, title: "The Training Arc", subtitle: "Grind hard. Your skills define your future rank.", color: "#10b981" },
  { year: 3, title: "The Dungeon Raids", subtitle: "Internships, projects, real battles begin.", color: "#f59e0b" },
  { year: 4, title: "The Final Boss", subtitle: "GATE & Placements. This is what you trained for.", color: "#ef4444" },
];

function getRank(xp) {
  let current = RANKS[0];
  for (const r of RANKS) { if (xp >= r.minXP) current = r; }
  return current;
}
function getNextRank(xp) {
  for (const r of RANKS) { if (xp < r.minXP) return r; }
  return null;
}

function XPBar({ xp }) {
  const current = getRank(xp);
  const next = getNextRank(xp);
  const progress = next ? ((xp - current.minXP) / (next.minXP - current.minXP)) * 100 : 100;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>
        <span style={{ color: current.color, fontWeight: 700 }}>{current.label}</span>
        <span>{next ? `${xp} / ${next.minXP} XP → ${next.rank}` : `${xp} XP — MAX RANK`}</span>
      </div>
      <div style={{ height: 8, background: "#1f2937", borderRadius: 4, overflow: "hidden", border: "1px solid #374151" }}>
        <div style={{ height: "100%", width: `${Math.min(progress, 100)}%`, background: `linear-gradient(90deg, ${current.color}, ${next?.color || current.color})`, borderRadius: 4, transition: "width 0.6s ease", boxShadow: `0 0 8px ${current.color}80` }} />
      </div>
    </div>
  );
}

function StatRing({ label, value, color }) {
  const pct = Math.min(value, 100);
  const r = 28, cx = 34, cy = 34, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg width="68" height="68">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1f2937" strokeWidth="5" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 4px ${color})`, transition: "stroke-dasharray 0.8s ease" }} />
        <text x={cx} y={cy + 5} textAnchor="middle" fill={color} fontSize="13" fontWeight="700">{pct}</text>
      </svg>
      <span style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(() => {
    try { const s = localStorage.getItem("sl_btech_v2"); return s ? JSON.parse(s) : INITIAL_DATA; } catch { return INITIAL_DATA; }
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeCategory, setActiveCategory] = useState("gate");
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLog, setNewLog] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(data.hunterName);
  const [xpFlash, setXpFlash] = useState(null);

  useEffect(() => {
    try { localStorage.setItem("sl_btech_v2", JSON.stringify(data)); } catch {}
  }, [data]);

  const allQuests = Object.values(data.quests).flat();
  const doneQuests = allQuests.filter(q => q.done);
  const totalXP = doneQuests.reduce((s, q) => s + q.xp, 0);
  const currentRank = getRank(totalXP);

  const catProgress = (cat) => {
    const qs = data.quests[cat];
    return Math.round((qs.filter(q => q.done).length / qs.length) * 100);
  };

  function toggleQuest(id) {
    const cat = Object.keys(data.quests).find(k => data.quests[k].some(q => q.id === id));
    if (!cat) return;
    const quest = data.quests[cat].find(q => q.id === id);
    const wasRank = getRank(totalXP).rank;
    setData(prev => {
      const updated = { ...prev, quests: { ...prev.quests, [cat]: prev.quests[cat].map(q => q.id === id ? { ...q, done: !q.done } : q) } };
      const newXP = Object.values(updated.quests).flat().filter(q => q.done).reduce((s, q) => s + q.xp, 0);
      const nowRank = getRank(newXP).rank;
      if (!quest.done && wasRank !== nowRank) { setTimeout(() => { setShowLevelUp(true); setTimeout(() => setShowLevelUp(false), 3000); }, 300); }
      if (!quest.done) { setXpFlash(`+${quest.xp} XP`); setTimeout(() => setXpFlash(null), 1500); }
      return updated;
    });
  }

  function addLog() {
    if (!newLog.trim()) return;
    setData(prev => ({ ...prev, dailyLog: [{ text: newLog, date: new Date().toLocaleDateString("en-IN"), id: Date.now() }, ...prev.dailyLog].slice(0, 100) }));
    setNewLog("");
  }

  const yearTheme = YEAR_THEMES[data.currentYear - 1];
  const TABS = [
    { id: "dashboard", label: "Dashboard", icon: "⚔️" },
    { id: "quests", label: "Quests", icon: "📜" },
    { id: "roadmap", label: "Roadmap", icon: "🗺️" },
    { id: "log", label: "Daily Log", icon: "📓" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#030712", color: "#f3f4f6", fontFamily: "'Segoe UI', system-ui, sans-serif", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -200, left: -200, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${currentRank.color}18 0%, transparent 70%)` }} />
      </div>

      {showLevelUp && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", background: "rgba(0,0,0,0.7)" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 8 }}>🔥</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: currentRank.color, textShadow: `0 0 40px ${currentRank.color}`, letterSpacing: 4 }}>RANK UP!</div>
            <div style={{ fontSize: 20, color: "#f3f4f6", marginTop: 8 }}>{currentRank.label}</div>
          </div>
        </div>
      )}

      {xpFlash && (
        <div style={{ position: "fixed", top: "20%", right: 30, zIndex: 998, color: "#10b981", fontSize: 22, fontWeight: 900, textShadow: "0 0 20px #10b981", pointerEvents: "none" }}>
          {xpFlash}
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; overscroll-behavior: none; }
        ::-webkit-scrollbar { width: 4px }
        ::-webkit-scrollbar-track { background: #111827 }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px }
      `}</style>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "16px 16px 100px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#6b7280", textTransform: "uppercase", marginBottom: 6 }}>Solo Leveling System</div>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 1 }}>
            {editingName ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <input value={tempName} onChange={e => setTempName(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { setData(p => ({ ...p, hunterName: tempName || "Hunter" })); setEditingName(false); } }}
                  style={{ background: "#111827", border: "1px solid #374151", color: "#f3f4f6", borderRadius: 6, padding: "4px 10px", fontSize: 20, textAlign: "center", outline: "none", width: 200 }} autoFocus />
                <button onClick={() => { setData(p => ({ ...p, hunterName: tempName || "Hunter" })); setEditingName(false); }}
                  style={{ background: "#10b981", border: "none", color: "#000", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontWeight: 700 }}>✓</button>
              </div>
            ) : (
              <span onClick={() => { setEditingName(true); setTempName(data.hunterName); }} style={{ cursor: "pointer" }}>
                {data.hunterName} <span style={{ fontSize: 14, color: "#6b7280" }}>✏️</span>
              </span>
            )}
          </div>
          <div style={{ display: "inline-block", marginTop: 8, padding: "3px 14px", borderRadius: 20, background: `${currentRank.color}22`, border: `1px solid ${currentRank.color}66`, color: currentRank.color, fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
            {currentRank.rank}-RANK · {totalXP} XP
          </div>
          <XPBar xp={totalXP} />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "#0f172a", borderRadius: 12, padding: 6, border: "1px solid #1f2937" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: "none", cursor: "pointer", background: activeTab === tab.id ? "#1f2937" : "transparent", color: activeTab === tab.id ? "#f3f4f6" : "#6b7280", fontSize: 12, fontWeight: activeTab === tab.id ? 700 : 400, transition: "all 0.2s" }}>
              <div>{tab.icon}</div>
              <div style={{ marginTop: 2 }}>{tab.label}</div>
            </button>
          ))}
        </div>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div>
            <div style={{ padding: 20, borderRadius: 12, background: `${yearTheme.color}12`, border: `1px solid ${yearTheme.color}44`, marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: yearTheme.color, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>YEAR {data.currentYear} ARC</div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{yearTheme.title}</div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>{yearTheme.subtitle}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
                {[1, 2, 3, 4].map(y => (
                  <button key={y} onClick={() => setData(p => ({ ...p, currentYear: y }))} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: `1px solid ${y === data.currentYear ? YEAR_THEMES[y - 1].color : "#374151"}`, background: y === data.currentYear ? `${YEAR_THEMES[y - 1].color}22` : "transparent", color: y === data.currentYear ? YEAR_THEMES[y - 1].color : "#6b7280", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Y{y}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#6b7280", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Hunter Stats</div>
              <div style={{ display: "flex", justifyContent: "space-around", padding: "16px 8px", background: "#0f172a", borderRadius: 12, border: "1px solid #1f2937" }}>
                <StatRing label="GATE" value={catProgress("gate")} color="#6366f1" />
                <StatRing label="Place" value={catProgress("placement")} color="#10b981" />
                <StatRing label="Skills" value={catProgress("skills")} color="#f59e0b" />
                <StatRing label="College" value={catProgress("college")} color="#3b82f6" />
                <StatRing label="Health" value={catProgress("health")} color="#ef4444" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {Object.entries(CATEGORY_META).map(([key, meta]) => {
                const qs = data.quests[key], done = qs.filter(q => q.done).length, pct = Math.round((done / qs.length) * 100);
                return (
                  <div key={key} onClick={() => { setActiveTab("quests"); setActiveCategory(key); }} style={{ padding: 14, borderRadius: 10, background: meta.bg, border: `1px solid ${meta.color}33`, cursor: "pointer" }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{meta.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#f3f4f6" }}>{meta.label}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{done}/{qs.length} quests</div>
                    <div style={{ height: 4, background: "#1f2937", borderRadius: 2, marginTop: 8 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: meta.color, borderRadius: 2, transition: "width 0.5s" }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ padding: 14, borderRadius: 10, background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 20 }}>🏆</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#a855f7", marginTop: 4 }}>Total</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#f3f4f6", marginTop: 4 }}>{Math.round((doneQuests.length / allQuests.length) * 100)}%</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>{doneQuests.length}/{allQuests.length}</div>
              </div>
            </div>

            <div style={{ padding: 14, borderRadius: 10, background: "#0f172a", border: "1px solid #1f2937" }}>
              <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: 2, marginBottom: 8 }}>SYSTEM MESSAGE</div>
              <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>
                {data.currentYear === 1 && "⚠️ Year 1 is the most important. Build habits now — DSA, health, and club life. The hunter who awakens strong, levels up fast."}
                {data.currentYear === 2 && "⚡ Year 2: Stop procrastinating on projects. Every day you delay is XP lost. Start that internship search now."}
                {data.currentYear === 3 && "🔥 Year 3: This is your dungeon raid. Internship = your solo dungeon. Go in prepared or get wiped."}
                {data.currentYear === 4 && "⚔️ Year 4: The final gate opens. GATE scores and placement offers are boss drops. Give everything you have."}
              </div>
            </div>
          </div>
        )}

        {/* QUESTS */}
        {activeTab === "quests" && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
              {Object.entries(CATEGORY_META).map(([key, meta]) => (
                <button key={key} onClick={() => setActiveCategory(key)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: `1px solid ${activeCategory === key ? meta.color : "#374151"}`, background: activeCategory === key ? meta.bg : "transparent", color: activeCategory === key ? meta.color : "#6b7280", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                  {meta.icon} {meta.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.quests[activeCategory].map(quest => (
                <div key={quest.id} onClick={() => toggleQuest(quest.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: quest.done ? "rgba(16,185,129,0.08)" : "#111827", border: `1px solid ${quest.done ? "#10b981" : "#1f2937"}`, borderRadius: 8, cursor: "pointer" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${quest.done ? "#10b981" : "#374151"}`, background: quest.done ? "#10b981" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {quest.done && <span style={{ color: "#000", fontSize: 11, fontWeight: 900 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: quest.done ? "#6b7280" : "#f3f4f6", textDecoration: quest.done ? "line-through" : "none" }}>{quest.title}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Year {quest.year} · +{quest.xp} XP</div>
                  </div>
                  <span style={{ fontSize: 10, color: quest.done ? "#10b981" : "#f59e0b", border: `1px solid ${quest.done ? "#10b98144" : "#f59e0b44"}`, padding: "2px 6px", borderRadius: 4 }}>{quest.done ? "DONE" : "QUEST"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROADMAP */}
        {activeTab === "roadmap" && (
          <div>
            {YEAR_THEMES.map((yt, yi) => (
              <div key={yi} style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${yt.color}22`, border: `2px solid ${yt.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: yt.color, fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{yt.year}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>{yt.title}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{yt.subtitle}</div>
                  </div>
                </div>
                <div style={{ marginLeft: 16, borderLeft: `2px solid ${yt.color}44`, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
                  {Object.entries(data.quests).map(([cat, qs]) =>
                    qs.filter(q => q.year === yt.year).map(q => (
                      <div key={q.id} onClick={() => toggleQuest(q.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: q.done ? "rgba(16,185,129,0.06)" : "#0f172a", border: `1px solid ${q.done ? "#10b98144" : "#1f2937"}`, borderRadius: 8, cursor: "pointer" }}>
                        <span style={{ fontSize: 14 }}>{CATEGORY_META[cat].icon}</span>
                        <span style={{ fontSize: 13, color: q.done ? "#6b7280" : "#f3f4f6", textDecoration: q.done ? "line-through" : "none", flex: 1 }}>{q.title}</span>
                        <span style={{ fontSize: 11, color: q.done ? "#10b981" : "#6b7280", fontWeight: 600 }}>+{q.xp}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DAILY LOG */}
        {activeTab === "log" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>What did you hunt today?</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={newLog} onChange={e => setNewLog(e.target.value)} onKeyDown={e => e.key === "Enter" && addLog()}
                  placeholder="Solved 5 LeetCode, attended DSA lecture..."
                  style={{ flex: 1, background: "#0f172a", border: "1px solid #374151", borderRadius: 8, padding: "10px 14px", color: "#f3f4f6", fontSize: 13, outline: "none" }} />
                <button onClick={addLog} style={{ background: "#6366f1", border: "none", color: "#fff", borderRadius: 8, padding: "10px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Log</button>
              </div>
            </div>
            {data.dailyLog.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#374151" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📓</div>
                <div>No entries yet. Start hunting!</div>
              </div>
            ) : data.dailyLog.map(entry => (
              <div key={entry.id} style={{ padding: "12px 14px", background: "#0f172a", borderRadius: 8, border: "1px solid #1f2937", marginBottom: 8 }}>
                <div style={{ fontSize: 13, color: "#f3f4f6" }}>{entry.text}</div>
                <div style={{ fontSize: 11, color: "#374151", marginTop: 4 }}>{entry.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
