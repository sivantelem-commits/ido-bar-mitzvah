// ─── Chapter 3: Tasks & Quizzes (יולי–אוקטובר 2027) ─────────────────────────
import { useState } from "react";

// ── Shared helpers ─────────────────────────────────────────────────────────
function Card({ children, style }) {
  return <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20, boxShadow: "0 1px 4px rgba(124,58,237,0.06)", ...style }}>{children}</div>;
}
function Label({ children }) {
  return <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14, margin: "0 0 10px" }}>{children}</p>;
}
function TextInput({ value, onChange, placeholder, multiline }) {
  const style = { width: "100%", padding: "11px 14px", borderRadius: 10, boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", color: "#1e1b4b", fontSize: 14, outline: "none", direction: "rtl", fontFamily: "inherit", lineHeight: 1.6, resize: "vertical" };
  return multiline
    ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={style} />
    : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />;
}
function Intro({ emoji, title, desc }) {
  return (
    <div style={{ padding: 20, borderRadius: 16, marginBottom: 20, background: "linear-gradient(135deg, rgba(124,58,237,0.07), rgba(168,85,247,0.03))", border: "1.5px solid rgba(124,58,237,0.2)" }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{emoji}</div>
      <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 16, margin: "0 0 6px" }}>{title}</p>
      <p style={{ color: "#4b5563", fontSize: 14, margin: 0, lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}
function ReflectionSection({ questions, values, onChange }) {
  return (
    <Card style={{ marginTop: 16, border: "1.5px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.03)" }}>
      <Label>💭 רפלקציה — אחרי שסיימת</Label>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: i < questions.length - 1 ? 14 : 0 }}>
          <p style={{ color: "#4b5563", fontSize: 13, margin: "0 0 6px" }}>{q}</p>
          <TextInput multiline value={(values || [])[i] || ""} onChange={v => { const arr = [...(values || [])]; arr[i] = v; onChange(arr); }} placeholder="כתוב כאן..." />
        </div>
      ))}
    </Card>
  );
}

// ─── T24: תיקון בבית ─────────────────────────────────────────────────────────
export function T24_HomeRepair({ state, onChange }) {
  const s = state || {};
  const repairs = s.repairs || [];
  const categories = ["חשמל", "אינסטלציה", "נגרות", "צביעה", "ניקיון עמוק", "גינון", "אחר"];

  function addRepair() {
    onChange({ ...s, repairs: [...repairs, { what: "", category: "", difficulty: 5, learned: "", done: false }] });
  }
  function updateRepair(i, field, val) {
    onChange({ ...s, repairs: repairs.map((r, idx) => idx === i ? { ...r, [field]: val } : r) });
  }

  return (
    <div>
      <Intro emoji="🔧" title="תיקון בבית"
        desc="כל בית צריך מישהו שיודע לטפל בבעיות. זה לא אמא, זה לא אבא — זה אתה. בחר תקלה, למד איך, תקן." />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>תעד לפחות תיקון אחד שביצעת</p>
        <button onClick={addRepair} style={{ padding: "8px 18px", borderRadius: 10, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ תיקון חדש</button>
      </div>

      {repairs.length === 0 && (
        <Card style={{ textAlign: "center", padding: "32px 20px", border: "1.5px dashed #e5e7eb" }}>
          <p style={{ fontSize: 40, margin: "0 0 10px" }}>🔧</p>
          <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>לחץ "+ תיקון חדש" להתחיל</p>
        </Card>
      )}

      {repairs.map((repair, i) => (
        <Card key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ color: "#9ca3af", fontSize: 12 }}>תיקון {i + 1}</span>
            <button onClick={() => updateRepair(i, "done", !repair.done)} style={{
              padding: "5px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
              background: repair.done ? "rgba(16,185,129,0.1)" : "#f3f4f6",
              border: repair.done ? "1px solid rgba(16,185,129,0.4)" : "1px solid #e5e7eb",
              color: repair.done ? "#059669" : "#6b7280", fontWeight: 600
            }}>{repair.done ? "✓ בוצע" : "סמן כבוצע"}</button>
          </div>

          <Label>מה תיקנת?</Label>
          <div style={{ marginBottom: 14 }}>
            <TextInput value={repair.what || ""} onChange={v => updateRepair(i, "what", v)} placeholder="לדוגמה: החלפת נורה, הידוק ברז מטפטף..." />
          </div>

          <Label>קטגוריה</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 }}>
            {categories.map(c => (
              <button key={c} onClick={() => updateRepair(i, "category", c)} style={{
                padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                background: repair.category === c ? "rgba(124,58,237,0.1)" : "#f9fafb",
                border: repair.category === c ? "1.5px solid #7c3aed" : "1px solid #e5e7eb",
                color: repair.category === c ? "#7c3aed" : "#6b7280"
              }}>{c}</button>
            ))}
          </div>

          <Label>רמת קושי (1–10)</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <input type="range" min={1} max={10} value={repair.difficulty || 5}
              onChange={e => updateRepair(i, "difficulty", Number(e.target.value))}
              style={{ flex: 1, accentColor: "#7c3aed" }} />
            <span style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(124,58,237,0.1)", border: "1.5px solid #7c3aed", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{repair.difficulty || 5}</span>
          </div>

          <Label>מה למדת?</Label>
          <TextInput multiline value={repair.learned || ""} onChange={v => updateRepair(i, "learned", v)} placeholder="למדתי ש..." />
        </Card>
      ))}

      {repairs.length > 0 && (
        <Card style={{ border: "1.5px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.04)" }}>
          <Label>🛠️ אם היה לך כלי אחד שהכי עזר — מה זה היה?</Label>
          <TextInput value={s.bestTool || ""} onChange={v => onChange({ ...s, bestTool: v })} placeholder="הכלי שהכי עזר לי היה..." />
        </Card>
      )}
    </div>
  );
}

// ─── T25: שימוש בכלים בסיסיים ────────────────────────────────────────────────
export function T25_BasicTools({ state, onChange }) {
  const s = state || {};
  const tools = [
    { id: "hammer", icon: "🔨", name: "פטיש", task: "קבע מסמר בקיר ותלה תמונה" },
    { id: "screwdriver", icon: "🪛", name: "מברג", task: "פרק והרכב רהיט קטן" },
    { id: "measure", icon: "📏", name: "מטר", task: "מדוד חדר וחשב שטח" },
    { id: "drill", icon: "🔩", name: "מקדחה", task: "קדח חור וקבע אנקר" },
    { id: "wrench", icon: "🔧", name: "מפתח ברגים", task: "הדק ברגים רפויים בבית" },
    { id: "level", icon: "📐", name: "פלס", task: "וודא שמשהו ישר לפני הרכבה" },
  ];

  const done = s.toolsDone || {};
  const notes = s.toolNotes || {};
  const doneCount = tools.filter(t => done[t.id]).length;

  return (
    <div>
      <Intro emoji="🧰" title="ארגז כלים"
        desc="כל כלי הוא מיומנות. כל מיומנות היא כוח. השבוע — לפגוש כמה שיותר כלים ולהשתמש בהם בפועל." />

      <div style={{ padding: "14px 18px", borderRadius: 14, marginBottom: 20, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
          <svg viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)" }}>
            <circle cx={28} cy={28} r={22} fill="none" stroke="#e5e7eb" strokeWidth={5} />
            <circle cx={28} cy={28} r={22} fill="none" stroke="#7c3aed" strokeWidth={5}
              strokeDasharray={2 * Math.PI * 22}
              strokeDashoffset={2 * Math.PI * 22 * (1 - doneCount / tools.length)}
              strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#7c3aed", fontWeight: 700, fontSize: 13 }}>{doneCount}/{tools.length}</span>
          </div>
        </div>
        <div>
          <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 15, margin: "0 0 3px" }}>כלים שהשתמשתי בהם</p>
          <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>{doneCount === tools.length ? "🎉 כל הכלים!" : `עוד ${tools.length - doneCount} כלים`}</p>
        </div>
      </div>

      {tools.map(tool => (
        <Card key={tool.id} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: done[tool.id] ? 12 : 0 }}>
            <span style={{ fontSize: 28 }}>{tool.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 14, margin: "0 0 3px" }}>{tool.name}</p>
              <p style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>משימה: {tool.task}</p>
            </div>
            <button onClick={() => onChange({ ...s, toolsDone: { ...done, [tool.id]: !done[tool.id] } })} style={{
              padding: "7px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer",
              background: done[tool.id] ? "rgba(16,185,129,0.1)" : "#f3f4f6",
              border: done[tool.id] ? "1px solid rgba(16,185,129,0.4)" : "1px solid #e5e7eb",
              color: done[tool.id] ? "#059669" : "#6b7280", flexShrink: 0
            }}>{done[tool.id] ? "✓ בוצע" : "בצע"}</button>
          </div>
          {done[tool.id] && (
            <TextInput value={notes[tool.id] || ""} onChange={v => onChange({ ...s, toolNotes: { ...notes, [tool.id]: v } })}
              placeholder="מה עשית? מה הרגשת?" />
          )}
        </Card>
      ))}

      <ReflectionSection
        questions={["איזה כלי הרגיש הכי טבעי בידיים שלך?", "מה תיקנת או בנית שגרם לך להרגיש הכי גאה?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

// ─── T26: יום עצמאות מלא ─────────────────────────────────────────────────────
export function T26_IndependenceDay({ state, onChange }) {
  const s = state || {};
  const [planStep, setPlanStep] = useState(s.planStep || 0);
  const planSteps = [
    { key: "where", q: "לאן תלך? מה תעשה?", ph: "אני מתכנן ללכת ל... ולעשות שם..." },
    { key: "budget", q: "מה התקציב שלך ליום?", ph: "יש לי ₪___ ואני מתכנן לבזבז על..." },
    { key: "timing", q: "מתי יוצאים? מתי חוזרים?", ph: "אצא בשעה ___ וחזור בשעה ___" },
    { key: "challenge", q: "מה עשוי להיות מאתגר?", ph: "אולי יהיה קשה עם..." },
    { key: "backup", q: "מה תעשה אם משהו לא ילך לפי התכנית?", ph: "אם משהו ישתבש, אני..." },
  ];
  const allPlanned = planSteps.every(ps => s[ps.key]);

  return (
    <div>
      <Intro emoji="☀️" title="יום עצמאות מלא"
        desc="יום שלם — לבד. אתה מחליט מה עושים, לאן הולכים, מה אוכלים ומתי חוזרים. ההורים יודעים שאתה בסדר — זהו." />

      {!allPlanned && (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            {planSteps.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= planStep ? "#7c3aed" : "#e5e7eb", transition: "background 0.3s" }} />
            ))}
          </div>
          <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)" }}>
            <p style={{ color: "#9ca3af", fontSize: 12, margin: "0 0 6px" }}>שלב {planStep + 1} מתוך {planSteps.length}</p>
            <p style={{ color: "#1e1b4b", fontSize: 16, fontWeight: 600, margin: "0 0 16px", lineHeight: 1.5 }}>{planSteps[planStep].q}</p>
            <TextInput multiline value={s[planSteps[planStep].key] || ""} onChange={v => onChange({ ...s, [planSteps[planStep].key]: v })} placeholder={planSteps[planStep].ph} />
          </Card>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {planStep > 0 && (
              <button onClick={() => { setPlanStep(planStep - 1); onChange({ ...s, planStep: planStep - 1 }); }} style={{ padding: "11px 20px", borderRadius: 12, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#6b7280", cursor: "pointer", fontSize: 14 }}>← חזרה</button>
            )}
            <button
              disabled={!s[planSteps[planStep].key]}
              onClick={() => { const next = planStep + 1; setPlanStep(next); onChange({ ...s, planStep: next }); }}
              style={{ flex: 1, padding: "11px", borderRadius: 12, background: s[planSteps[planStep].key] ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "#f3f4f6", border: "none", color: s[planSteps[planStep].key] ? "#fff" : "#9ca3af", fontSize: 15, fontWeight: 600, cursor: s[planSteps[planStep].key] ? "pointer" : "not-allowed" }}>
              {planStep < planSteps.length - 1 ? "הבא →" : "סיום התכנון ✓"}
            </button>
          </div>
        </div>
      )}

      {allPlanned && (
        <div>
          <Card style={{ border: "1.5px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.04)", marginBottom: 16 }}>
            <p style={{ color: "#059669", fontWeight: 700, fontSize: 15, margin: "0 0 14px" }}>✅ התכנון מוכן!</p>
            {planSteps.map(ps => s[ps.key] && (
              <div key={ps.key} style={{ marginBottom: 10 }}>
                <p style={{ color: "#9ca3af", fontSize: 11, margin: "0 0 3px" }}>{ps.q}</p>
                <p style={{ color: "#1e1b4b", fontSize: 14, margin: 0, lineHeight: 1.5 }}>{s[ps.key]}</p>
              </div>
            ))}
          </Card>
          <ReflectionSection
            questions={["איך הרגשת בסוף היום?", "מה היה הרגע שהכי אהבת?", "מה היה קשה יותר ממה שציפית?"]}
            values={s.reflection || []}
            onChange={v => onChange({ ...s, reflection: v })} />
        </div>
      )}
    </div>
  );
}

// ─── T27: אחריות לזמנים ולכסף ────────────────────────────────────────────────
export function T27_TimeMoneyOwnership({ state, onChange }) {
  const s = state || {};
  const items = s.expenses || [];
  const total = items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);

  return (
    <div>
      <Intro emoji="⏱️" title="אחריות לזמנים ולכסף"
        desc="חזרת מהיום העצמאי. עכשיו — לתעד: כמה בזבזת? האם חזרת בזמן? מה עבד ומה לא?" />
      <Card style={{ marginBottom: 14 }}>
        <Label>הוצאות היום</Label>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input value={it.what || ""} onChange={e => { const n = items.map((x, idx) => idx === i ? { ...x, what: e.target.value } : x); onChange({ ...s, expenses: n }); }} placeholder="על מה?" style={{ flex: 1, padding: "8px 10px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 13, outline: "none" }} />
            <input value={it.amount || ""} onChange={e => { const n = items.map((x, idx) => idx === i ? { ...x, amount: e.target.value } : x); onChange({ ...s, expenses: n }); }} placeholder="₪" type="number" style={{ width: 70, padding: "8px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 13, outline: "none" }} />
          </div>
        ))}
        <button onClick={() => onChange({ ...s, expenses: [...items, { what: "", amount: "" }] })} style={{ padding: "7px 16px", borderRadius: 8, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#7c3aed", fontSize: 12, cursor: "pointer", marginTop: 6 }}>+ הוסף הוצאה</button>
        {total > 0 && <p style={{ color: "#7c3aed", fontWeight: 700, marginTop: 12, marginBottom: 0 }}>סה"כ: ₪{total}</p>}
      </Card>
      <Card style={{ marginBottom: 14 }}>
        <Label>חזרת בזמן?</Label>
        <div style={{ display: "flex", gap: 10 }}>
          {["כן, בדיוק בזמן", "מעט באיחור", "בזמן — אפילו מוקדם"].map(opt => (
            <button key={opt} onClick={() => onChange({ ...s, onTime: opt })} style={{ flex: 1, padding: "10px 8px", borderRadius: 10, fontSize: 12, cursor: "pointer", background: s.onTime === opt ? "rgba(124,58,237,0.1)" : "#f9fafb", border: s.onTime === opt ? "1.5px solid #7c3aed" : "1px solid #e5e7eb", color: s.onTime === opt ? "#7c3aed" : "#6b7280", lineHeight: 1.4 }}>{opt}</button>
          ))}
        </div>
      </Card>
      <ReflectionSection
        questions={["האם תכנון התקציב שלך היה מדויק?", "מה תשנה ביום העצמאי הבא?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

// ─── T28: הדלקת גזיה/מדורה ──────────────────────────────────────────────────
export function T28_FireSkills({ state, onChange }) {
  const s = state || {};
  const fireTypes = [
    { id: "stove", icon: "🍳", name: "גזייה", steps: ["בדוק שאין נזילת גז", "פתח את הגז לאט", "הדלק מצית לפני פתיחת להבה", "כוון את הלהבה", "לאחר בישול — כבה גז לפני שיוצאים"] },
    { id: "campfire", icon: "🔥", name: "מדורה", steps: ["אסוף עצים יבשים בגדלים שונים", "בנה בסיס עם קינדלינג קטן", "הדלק את המרכז ולא הצדדים", "הוסף עצים בהדרגה", "כבה לגמרי עם מים לפני עזיבה"] },
  ];

  const chosen = s.chosenFire;
  const checkedSteps = s.checkedSteps || {};

  return (
    <div>
      <Intro emoji="🔥" title="הדלקת גזיה / מדורה"
        desc="אש היא אחת המיומנויות הבסיסיות ביותר. לא מפחידה — מכבדת. לומדים איך, עושים בטוח." />

      <Card style={{ marginBottom: 16 }}>
        <Label>מה תלמד?</Label>
        <div style={{ display: "flex", gap: 12 }}>
          {fireTypes.map(ft => (
            <button key={ft.id} onClick={() => onChange({ ...s, chosenFire: ft.id })} style={{
              flex: 1, padding: "16px", borderRadius: 14, cursor: "pointer",
              background: chosen === ft.id ? "rgba(124,58,237,0.1)" : "#f9fafb",
              border: chosen === ft.id ? "2px solid #7c3aed" : "1px solid #e5e7eb",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8
            }}>
              <span style={{ fontSize: 32 }}>{ft.icon}</span>
              <span style={{ color: chosen === ft.id ? "#7c3aed" : "#1e1b4b", fontWeight: 600, fontSize: 15 }}>{ft.name}</span>
            </button>
          ))}
        </div>
      </Card>

      {chosen && (() => {
        const ft = fireTypes.find(f => f.id === chosen);
        const doneSteps = ft.steps.filter((_, i) => checkedSteps[`${chosen}_${i}`]).length;
        return (
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <Label style={{ margin: 0 }}>שלבים — {ft.icon} {ft.name}</Label>
              <span style={{ color: "#7c3aed", fontSize: 13, fontWeight: 600 }}>{doneSteps}/{ft.steps.length}</span>
            </div>
            {ft.steps.map((step, i) => {
              const key = `${chosen}_${i}`;
              const done = !!checkedSteps[key];
              return (
                <div key={i} onClick={() => onChange({ ...s, checkedSteps: { ...checkedSteps, [key]: !done } })} style={{
                  display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 12px", borderRadius: 10, marginBottom: 6, cursor: "pointer",
                  background: done ? "rgba(16,185,129,0.06)" : "#f9fafb",
                  border: done ? "1px solid rgba(16,185,129,0.25)" : "1px solid #e5e7eb", transition: "all 0.2s"
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, background: done ? "#10b981" : "transparent", border: done ? "none" : "1.5px solid #d1d5db", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    {done && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
                  </div>
                  <span style={{ color: done ? "#9ca3af" : "#1e1b4b", fontSize: 14, lineHeight: 1.5, textDecoration: done ? "line-through" : "none" }}>{step}</span>
                </div>
              );
            })}
          </Card>
        );
      })()}

      <ReflectionSection
        questions={["מה הרגשת כשהצלחת להדליק לראשונה?", "מה חשוב לזכור לגבי בטיחות?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

// ─── T29: הקמת אוהל ─────────────────────────────────────────────────────────
export function T29_SetupTent({ state, onChange }) {
  const s = state || {};
  const steps = [
    "בחרתי מקום ישר ונקי מאבנים",
    "פרשתי את הרצפה (footprint)",
    "חיברתי את הכנות (poles)",
    "הרמתי את האוהל על הכנות",
    "קיבעתי עם יתדות לקרקע",
    "חיברתי את הפליסה (rainfly)",
    "הכנסתי ציוד ובדקתי שנוח",
    "פירקתי ואריזתי בחזרה בסדר",
  ];
  const done = s.stepsDone || {};
  const doneCount = steps.filter((_, i) => done[i]).length;

  return (
    <div>
      <Intro emoji="⛺" title="הקמת אוהל"
        desc="אוהל הוא הבית שלך בשטח. להקים אותו נכון — ומהר — זה מיומנות שתשמש אותך לכל החיים." />

      <div style={{ padding: "14px 18px", borderRadius: 14, marginBottom: 20, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 14 }}>התקדמות</span>
          <span style={{ color: "#7c3aed", fontWeight: 700 }}>{doneCount}/{steps.length}</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: "#e5e7eb" }}>
          <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #7c3aed, #a855f7)", width: `${(doneCount / steps.length) * 100}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {steps.map((step, i) => (
        <div key={i} onClick={() => onChange({ ...s, stepsDone: { ...done, [i]: !done[i] } })} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, marginBottom: 8, cursor: "pointer",
          background: done[i] ? "rgba(16,185,129,0.06)" : "#ffffff",
          border: done[i] ? "1px solid rgba(16,185,129,0.25)" : "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)", transition: "all 0.2s"
        }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: done[i] ? "#10b981" : "transparent", border: done[i] ? "none" : "1.5px solid #d1d5db", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {done[i] && <span style={{ color: "#fff", fontSize: 13 }}>✓</span>}
          </div>
          <span style={{ color: done[i] ? "#9ca3af" : "#1e1b4b", fontSize: 14, textDecoration: done[i] ? "line-through" : "none" }}>{step}</span>
          <span style={{ color: "#d1d5db", fontSize: 13, marginRight: "auto" }}>שלב {i + 1}</span>
        </div>
      ))}

      {doneCount === steps.length && (
        <Card style={{ border: "1.5px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.05)", marginTop: 16, textAlign: "center" }}>
          <p style={{ fontSize: 36, margin: "0 0 8px" }}>⛺</p>
          <p style={{ color: "#1e1b4b", fontWeight: 700, fontSize: 16, margin: "0 0 6px" }}>האוהל עומד!</p>
          <TextInput value={s.timeToSetup || ""} onChange={v => onChange({ ...s, timeToSetup: v })} placeholder="כמה זמן לקח? (דקות)" />
        </Card>
      )}

      <ReflectionSection
        questions={["מה היה הקטע הכי מסובך?", "אם תצטרך לעשות את זה שוב — מה תעשה אחרת?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

// ─── T30: לינת שטח משפחתית ──────────────────────────────────────────────────
export function T30_CampingPlan({ state, onChange }) {
  const s = state || {};
  const packingList = s.packing || [];
  const suggestions = ["שק שינה", "אוהל", "פנס", "מצית", "אוכל יבש", "מים (2L לאדם)", "קרם שמש", "פלאסטר", "מפה / ניווט", "בגדים חמים", "נעלי הליכה", "אשפה — שק לאיסוף"];

  function toggleItem(item) {
    const cur = s.packing || [];
    onChange({ ...s, packing: cur.includes(item) ? cur.filter(i => i !== item) : [...cur, item] });
  }

  return (
    <div>
      <Intro emoji="🌙" title="תכנון לינת שטח משפחתית"
        desc="אתה המארגן. בחר מיקום, תכנן מה לוקחים, קבע את התוכנית לערב — ואתה גם תתן את הערב הזה לזכור." />
      <Card style={{ marginBottom: 14 }}>
        <Label>איפה תלנו?</Label>
        <TextInput value={s.location || ""} onChange={v => onChange({ ...s, location: v })} placeholder="מיקום — שמורת טבע / חצר / גג..." />
      </Card>
      <Card style={{ marginBottom: 14 }}>
        <Label>תוכנית הערב</Label>
        <TextInput multiline value={s.eveningPlan || ""} onChange={v => onChange({ ...s, eveningPlan: v })} placeholder="נדליק מדורה, נבשל... נספר... נסתכל על כוכבים..." />
      </Card>
      <Card>
        <Label>✅ רשימת ציוד</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {suggestions.map(item => (
            <button key={item} onClick={() => toggleItem(item)} style={{
              padding: "7px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
              background: packingList.includes(item) ? "rgba(16,185,129,0.1)" : "#f9fafb",
              border: packingList.includes(item) ? "1.5px solid rgba(16,185,129,0.4)" : "1px solid #e5e7eb",
              color: packingList.includes(item) ? "#059669" : "#6b7280"
            }}>{packingList.includes(item) ? "✓ " : ""}{item}</button>
          ))}
        </div>
      </Card>
      <ReflectionSection
        questions={["מה היה הרגע הכי מיוחד של הלילה?", "מה למדת על עצמך בשטח?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

// ─── T31: אחריות על ציוד ────────────────────────────────────────────────────
export function T31_EquipmentOwnership({ state, onChange }) {
  const s = state || {};
  const items = s.items || [];

  function addItem() {
    onChange({ ...s, items: [...items, { name: "", checked: false, condition: "", responsible: "" }] });
  }
  function updateItem(i, field, val) {
    onChange({ ...s, items: items.map((it, idx) => idx === i ? { ...it, [field]: val } : it) });
  }

  return (
    <div>
      <Intro emoji="🎒" title="אחריות על ציוד"
        desc="כל פריט בתיק הוא האחריות שלך. אתה בודק, אתה אורז, אתה שואל אם חסר — לא מחכה שמישהו יזכיר לך." />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>הוסף פריטים שאתה אחראי עליהם</p>
        <button onClick={addItem} style={{ padding: "7px 16px", borderRadius: 9, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ פריט</button>
      </div>
      {items.length === 0 && (
        <Card style={{ textAlign: "center", padding: "28px", border: "1.5px dashed #e5e7eb" }}>
          <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>הוסף את הפריטים שאתה אחראי עליהם בטיול</p>
        </Card>
      )}
      {items.map((item, i) => (
        <Card key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <input value={item.name || ""} onChange={e => updateItem(i, "name", e.target.value)} placeholder="שם הפריט" style={{ flex: 1, padding: "8px 12px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 13, outline: "none" }} />
            <button onClick={() => updateItem(i, "checked", !item.checked)} style={{
              padding: "8px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", flexShrink: 0,
              background: item.checked ? "rgba(16,185,129,0.1)" : "#f3f4f6",
              border: item.checked ? "1px solid rgba(16,185,129,0.3)" : "1px solid #e5e7eb",
              color: item.checked ? "#059669" : "#6b7280"
            }}>{item.checked ? "✓ נארז" : "סמן"}</button>
          </div>
          <input value={item.condition || ""} onChange={e => updateItem(i, "condition", e.target.value)} placeholder="מצב הפריט..." style={{ width: "100%", padding: "7px 10px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 12, outline: "none", boxSizing: "border-box" }} />
        </Card>
      ))}
      <ReflectionSection
        questions={["מה קרה כשלקחת אחריות על הציוד?", "האם הייתה תקלה עם ציוד? איך התמודדת?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

// ─── T32: מיפוי חוזקות ──────────────────────────────────────────────────────
export function T32_StrengthsMap({ state, onChange }) {
  const s = state || {};
  const strengthAreas = [
    { id: "social", icon: "🤝", title: "חברתי", desc: "חיבור עם אנשים, אמפתיה, תקשורת" },
    { id: "cognitive", icon: "🧠", title: "חשיבה", desc: "פתרון בעיות, יצירתיות, לוגיקה" },
    { id: "physical", icon: "💪", title: "גופני", desc: "כוח, סיבולת, קואורדינציה" },
    { id: "leadership", icon: "🎯", title: "הובלה", desc: "החלטות, ניהול, השפעה" },
    { id: "creative", icon: "🎨", title: "יצירתיות", desc: "אמנות, מוזיקה, כתיבה, עיצוב" },
    { id: "practical", icon: "🔧", title: "מעשי", desc: "תיקון, בנייה, עבודת ידיים" },
    { id: "emotional", icon: "💙", title: "רגשי", desc: "הבנה עצמית, ויסות, חוסן" },
    { id: "learning", icon: "📚", title: "למידה", desc: "ספיגת ידע, סקרנות, התמדה" },
  ];

  const ratings = s.ratings || {};
  const topStrengths = Object.entries(ratings).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => strengthAreas.find(a => a.id === id));

  return (
    <div>
      <Intro emoji="🗺️" title="מיפוי חוזקות"
        desc="כולנו טובים בדברים שונים. המפה הזו תעזור לך לראות — בלי השוואה לאחרים — מה הכוחות שלך." />
      <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 16px" }}>דרג כל תחום מ-1 (לא הכוח שלי) עד 5 (אחד הכוחות הכי חזקים שלי):</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {strengthAreas.map(area => (
          <Card key={area.id} style={{ padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{area.icon}</span>
              <div>
                <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 13, margin: "0 0 2px" }}>{area.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 10, margin: 0 }}>{area.desc}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => onChange({ ...s, ratings: { ...ratings, [area.id]: n } })} style={{
                  flex: 1, height: 28, borderRadius: 5, cursor: "pointer",
                  background: (ratings[area.id] || 0) >= n ? "#7c3aed" : "#f3f4f6",
                  border: "none", transition: "background 0.15s"
                }} />
              ))}
            </div>
            {ratings[area.id] && <p style={{ color: "#7c3aed", fontSize: 11, margin: "6px 0 0", textAlign: "center", fontWeight: 600 }}>{ratings[area.id]}/5</p>}
          </Card>
        ))}
      </div>
      {topStrengths.length > 0 && (
        <Card style={{ border: "1.5px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.05)", marginBottom: 14 }}>
          <Label>⭐ 3 הכוחות הגדולים שלך</Label>
          <div style={{ display: "flex", gap: 10 }}>
            {topStrengths.map(s => s && (
              <div key={s.id} style={{ flex: 1, textAlign: "center", padding: "12px 8px", borderRadius: 12, background: "#fff", border: "1px solid #e5e7eb" }}>
                <p style={{ fontSize: 24, margin: "0 0 4px" }}>{s.icon}</p>
                <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 13, margin: 0 }}>{s.title}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      <ReflectionSection
        questions={["האם תוצאות המיפוי הפתיעו אותך?", "איך אתה יכול להשתמש בחוזקות שלך השנה הבאה?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

// ─── T33: חלומות ────────────────────────────────────────────────────────────
export function T33_Dreams({ state, onChange }) {
  const s = state || {};
  const timeframes = [
    { key: "year1", label: "בשנה הקרובה", icon: "📅" },
    { key: "year5", label: "בעוד 5 שנים", icon: "🌱" },
    { key: "year10", label: "בעוד 10 שנים", icon: "🚀" },
    { key: "life", label: "בחיי — חלום גדול", icon: "✨" },
  ];
  const categories = ["קריירה / מקצוע", "משפחה ואהבה", "הרפתקאות", "לימודים", "יצירה", "ספורט / גוף", "כסף / עצמאות", "השפעה על העולם"];

  return (
    <div>
      <Intro emoji="✨" title="חלומות"
        desc="לחלום זה לא לברוח מהמציאות — זה להגדיר אותה. מה שאתה חולם עליו היום מנחה את מה שתבנה מחר." />
      {timeframes.map(tf => (
        <Card key={tf.key} style={{ marginBottom: 14 }}>
          <Label>{tf.icon} {tf.label}</Label>
          <TextInput multiline value={s[tf.key] || ""} onChange={v => onChange({ ...s, [tf.key]: v })} placeholder={`${tf.label} אני רוצה ש...`} />
        </Card>
      ))}
      <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)" }}>
        <Label>באיזה תחום הלב שלך?</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {categories.map(c => {
            const sel = (s.passionAreas || []).includes(c);
            return (
              <button key={c} onClick={() => { const cur = s.passionAreas || []; onChange({ ...s, passionAreas: sel ? cur.filter(x => x !== c) : [...cur, c] }); }} style={{
                padding: "8px 16px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                background: sel ? "rgba(124,58,237,0.1)" : "#f9fafb",
                border: sel ? "1.5px solid #7c3aed" : "1px solid #e5e7eb",
                color: sel ? "#7c3aed" : "#6b7280"
              }}>{c}</button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ─── T34: יעד שנתי ──────────────────────────────────────────────────────────
export function T34_AnnualGoal({ state, onChange }) {
  const s = state || {};
  const [step, setStep] = useState(s.step || 0);
  const steps = [
    { key: "goal", q: "מה יעד אחד גדול שאתה רוצה להשיג בשנה הבאה?", ph: "יעד שנתי אחד ברור: אני רוצה ל..." },
    { key: "why", q: "למה זה חשוב לך?", ph: "זה חשוב לי כי..." },
    { key: "obstacles", q: "מה עשוי לעמוד בדרך?", ph: "המכשולים האפשריים הם..." },
    { key: "firstStep", q: "מה הצעד הראשון — מה עושים כבר השבוע?", ph: "השבוע אני אעשה..." },
    { key: "measure", q: "איך תדע שהצלחת?", ph: "אצליח כש..." },
  ];
  const allDone = steps.every(st => s[st.key]);

  return (
    <div>
      <Intro emoji="🎯" title="יעד שנתי ברור"
        desc="חלום + תאריך = יעד. בוא נהפוך חלום אחד לתכנית פעולה אמיתית." />
      {!allDone && (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "#7c3aed" : "#e5e7eb", transition: "background 0.3s" }} />
            ))}
          </div>
          <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)" }}>
            <p style={{ color: "#9ca3af", fontSize: 12, margin: "0 0 6px" }}>שלב {step + 1} מתוך {steps.length}</p>
            <p style={{ color: "#1e1b4b", fontSize: 16, fontWeight: 600, margin: "0 0 16px", lineHeight: 1.5 }}>{steps[step].q}</p>
            <TextInput multiline value={s[steps[step].key] || ""} onChange={v => onChange({ ...s, [steps[step].key]: v })} placeholder={steps[step].ph} />
          </Card>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {step > 0 && <button onClick={() => { setStep(step - 1); onChange({ ...s, step: step - 1 }); }} style={{ padding: "11px 20px", borderRadius: 12, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#6b7280", cursor: "pointer", fontSize: 14 }}>← חזרה</button>}
            <button disabled={!s[steps[step].key]} onClick={() => { const n = step + 1; setStep(n); onChange({ ...s, step: n }); }}
              style={{ flex: 1, padding: "11px", borderRadius: 12, background: s[steps[step].key] ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "#f3f4f6", border: "none", color: s[steps[step].key] ? "#fff" : "#9ca3af", fontSize: 15, fontWeight: 600, cursor: s[steps[step].key] ? "pointer" : "not-allowed" }}>
              {step < steps.length - 1 ? "הבא →" : "סיום ✓"}
            </button>
          </div>
        </div>
      )}
      {allDone && (
        <Card style={{ border: "1.5px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.04)" }}>
          <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 16, margin: "0 0 16px" }}>🎯 היעד שלך</p>
          {steps.map(st => s[st.key] && (
            <div key={st.key} style={{ marginBottom: 12 }}>
              <p style={{ color: "#9ca3af", fontSize: 11, margin: "0 0 3px" }}>{st.q}</p>
              <p style={{ color: "#1e1b4b", fontSize: 14, margin: 0, lineHeight: 1.5 }}>{s[st.key]}</p>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ─── Chapter 3 Climax: לילה בטבע ────────────────────────────────────────────
export function Ch3Climax({ state, onChange, isParent, onApprove }) {
  const s = state || {};
  return (
    <div>
      <Intro emoji="🌌" title="לילה בטבע — שיחת מדורה"
        desc="זהו אירוע השיא של הפרק — לילה בשטח עם שיחת עומק סביב מדורה על בגרות, על המסע שעבר ועל מה שמגיע." />
      {!isParent && (
        <div>
          <Card style={{ marginBottom: 14 }}>
            <Label>מה אתה רוצה לשתף סביב המדורה?</Label>
            <TextInput multiline value={s.idoShare || ""} onChange={v => onChange({ ...s, idoShare: v })} placeholder="אני רוצה לספר על... לשאול את ההורים... לשתף ש..." />
          </Card>
          <Card style={{ marginBottom: 14, border: "1.5px solid rgba(234,179,8,0.25)", background: "rgba(234,179,8,0.04)" }}>
            <Label>שאלה אחת שתרצה לשאול את ההורים שלך הלילה</Label>
            <TextInput value={s.question || ""} onChange={v => onChange({ ...s, question: v })} placeholder="שאלה שתמיד רציתי לשאול..." />
          </Card>
          <button onClick={() => onChange({ ...s, idoDone: true })} style={{
            width: "100%", padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer",
            background: s.idoDone ? "rgba(16,185,129,0.1)" : "linear-gradient(135deg, #7c3aed, #a855f7)",
            border: s.idoDone ? "1px solid rgba(16,185,129,0.4)" : "none", color: s.idoDone ? "#059669" : "#fff"
          }}>{s.idoDone ? "✓ מוכן ללילה!" : "מוכן — נצא לדרך!"}</button>
        </div>
      )}
      {isParent && (
        <Card style={{ border: "1.5px solid rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.04)" }}>
          <Label>✅ אישור הורים לפתיחת פרק 4</Label>
          {s.idoDone && !s.parentApproved && (
            <>
              <TextInput multiline value={s.parentNote || ""} onChange={v => onChange({ ...s, parentNote: v })} placeholder="כמה מילים על הלילה בטבע..." />
              <button onClick={() => { onChange({ ...s, parentApproved: true }); onApprove?.(); }} style={{ marginTop: 12, width: "100%", padding: "12px", borderRadius: 12, fontSize: 15, fontWeight: 600, background: "linear-gradient(135deg, #10b981, #059669)", border: "none", color: "#fff", cursor: "pointer" }}>✅ אישור — פתח פרק 4!</button>
            </>
          )}
          {s.parentApproved && <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(16,185,129,0.1)" }}><span style={{ color: "#059669", fontWeight: 600 }}>✓ פרק 4 נפתח!</span></div>}
          {!s.idoDone && <p style={{ color: "#6b7280", fontSize: 14 }}>ממתין לעידו...</p>}
        </Card>
      )}
    </div>
  );
}

// ─── Chapter 3 Monthly Quizzes ────────────────────────────────────────────────

// Quiz M9: מיומנות טכנית — Skill Builder
export function QuizM9({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  const skills = [
    { id: "s1", skill: "לקרוא הוראות טכניות ולפעול לפיהן", icon: "📋" },
    { id: "s2", skill: "לדעת מתי לבקש עזרה — ומתי לנסות לבד", icon: "🤔" },
    { id: "s3", skill: "להתאמץ גם כשקשה ולא לוותר", icon: "💪" },
    { id: "s4", skill: "לבדוק את העבודה לפני שמכריזים שסיימת", icon: "✅" },
  ];

  const scenarios = [
    {
      id: "sc1",
      text: "אתה מנסה לתקן משהו בבית ולא מצליח אחרי 20 דקות.",
      options: [
        { v: "youtube", t: "מחפש סרטון הדרכה ביוטיוב" },
        { v: "ask", t: "שואל מבוגר שיעזור" },
        { v: "quit", t: "מניח שזה מורכב מדי ומוותר" },
      ],
      best: "youtube",
      explain: {
        youtube: "מעולה! לדעת לחפש מידע ולפתור בעיות לבד — זו מיומנות עצמאות מהדרגה הראשונה.",
        ask: "לבקש עזרה זה בסדר — אבל קודם לנסות לבד (עם גוגל/יוטיוב) זה שלב חשוב.",
        quit: "20 דקות זה לא זמן לוותר. כמעט כל בעיה יש לה פתרון — צריך רק למצוא אותו."
      }
    },
    {
      id: "sc2",
      text: "תיקנת משהו ונראה טוב — אבל לא בדקת אם זה עובד באמת.",
      options: [
        { v: "check", t: "בודק שוב לפני שמכריז שסיימתי" },
        { v: "assume", t: "סומך שעובד ועובר הלאה" },
        { v: "show", t: "מראה להורים כדי שהם יבדקו" },
      ],
      best: "check",
      explain: {
        check: "פרפקציוניזם בריא! לבדוק את העבודה שלך לפני 'סיימתי' — זה מה שמבדיל עבודה טובה מבינונית.",
        assume: "הנחות הן שורש הרוב הבעיות. 30 שניות בדיקה חוסכות הרבה כאב ראש.",
        show: "זה בסדר כשמתחילים — אבל עצמאות אמיתית כוללת לבדוק בעצמך."
      }
    }
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🔧</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>משחקון מיומנות טכנית</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>מה למדת? איך חשיבה טכנית שלך?</p>
      </div>
      <button onClick={() => onChange({ ...s, step: "skills" })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>מתחילים! 🔧</button>
    </div>
  );

  if (step === "skills") {
    const selfRatings = s.selfRatings || {};
    const allRated = skills.every(sk => selfRatings[sk.id]);
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>⭐ דרג את עצמך</p>
        {skills.map(sk => (
          <Card key={sk.id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>{sk.icon}</span>
              <p style={{ color: "#1e1b4b", fontSize: 14, fontWeight: 500, margin: 0, flex: 1, lineHeight: 1.5 }}>{sk.skill}</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["עדיין לא", "קצת", "בסדר", "טוב!", "מצוין!"].map((label, i) => (
                <button key={i} onClick={() => onChange({ ...s, selfRatings: { ...selfRatings, [sk.id]: i + 1 } })} style={{
                  flex: 1, padding: "8px 4px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                  background: selfRatings[sk.id] === i + 1 ? "rgba(124,58,237,0.15)" : "#f9fafb",
                  border: selfRatings[sk.id] === i + 1 ? "1.5px solid #7c3aed" : "1px solid #e5e7eb",
                  color: selfRatings[sk.id] === i + 1 ? "#7c3aed" : "#6b7280"
                }}>{label}</button>
              ))}
            </div>
          </Card>
        ))}
        {allRated && <button onClick={() => onChange({ ...s, step: "scenario", scenarioIdx: 0 })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>לתרחישים →</button>}
      </div>
    );
  }

  if (step === "scenario") {
    const idx = s.scenarioIdx || 0;
    const sc = scenarios[idx];
    const answered = (s.scenarioAnswers || {})[sc.id];
    return (
      <div>
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {scenarios.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= idx ? "#7c3aed" : "#e5e7eb" }} />)}
        </div>
        <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)", marginBottom: 16 }}>
          <p style={{ color: "#1e1b4b", fontSize: 15, lineHeight: 1.7, margin: 0, textAlign: "center" }}>{sc.text}</p>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: answered ? 16 : 0 }}>
          {sc.options.map(opt => {
            const isSel = answered === opt.v;
            const isBest = opt.v === sc.best;
            return (
              <button key={opt.v} onClick={() => !answered && onChange({ ...s, scenarioAnswers: { ...(s.scenarioAnswers || {}), [sc.id]: opt.v } })} style={{
                padding: "14px 16px", borderRadius: 12, textAlign: "right", fontSize: 14, cursor: answered ? "default" : "pointer", lineHeight: 1.5,
                background: !answered ? "#f9fafb" : isBest ? "rgba(16,185,129,0.08)" : isSel ? "rgba(239,68,68,0.06)" : "#f9fafb",
                border: !answered ? "1px solid #e5e7eb" : isBest ? "1px solid rgba(16,185,129,0.4)" : isSel ? "1px solid rgba(239,68,68,0.3)" : "1px solid #e5e7eb",
                color: !answered ? "#1e1b4b" : isBest ? "#059669" : isSel ? "#ef4444" : "#9ca3af"
              }}>{answered && isBest ? "✓ " : ""}{opt.t}</button>
            );
          })}
        </div>
        {answered && (
          <>
            <Card style={{ border: "1.5px solid rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.04)", marginBottom: 14 }}>
              <p style={{ color: "#059669", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{sc.explain[answered]}</p>
            </Card>
            <button onClick={() => idx < scenarios.length - 1 ? onChange({ ...s, scenarioIdx: idx + 1 }) : onChange({ ...s, step: "result" })} style={{ width: "100%", padding: "13px", borderRadius: 12, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              {idx < scenarios.length - 1 ? "תרחיש הבא →" : "לתוצאות →"}
            </button>
          </>
        )}
      </div>
    );
  }

  if (step === "result") {
    const selfRatings = s.selfRatings || {};
    const avg = Object.values(selfRatings).length ? Math.round(Object.values(selfRatings).reduce((a, b) => a + b, 0) / Object.values(selfRatings).length * 10) / 10 : 0;
    return (
      <div>
        <div style={{ textAlign: "center", padding: "28px 0 20px" }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>🛠️</div>
          <p style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>המיומנות שלך</p>
          <p style={{ color: "#7c3aed", fontSize: 18, fontWeight: 600, margin: 0 }}>ממוצע עצמי: {avg}/5</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {skills.map(sk => (
            <div key={sk.id} style={{ padding: "14px 16px", borderRadius: 14, background: "#ffffff", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(124,58,237,0.06)", textAlign: "center" }}>
              <p style={{ fontSize: 22, margin: "0 0 6px" }}>{sk.icon}</p>
              <div style={{ height: 6, borderRadius: 3, background: "#f3f4f6", marginBottom: 6 }}>
                <div style={{ height: "100%", borderRadius: 3, background: "#7c3aed", width: `${((selfRatings[sk.id] || 0) / 5) * 100}%`, transition: "width 0.5s" }} />
              </div>
              <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 14, margin: 0 }}>{selfRatings[sk.id] || 0}/5</p>
            </div>
          ))}
        </div>
        <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)" }}>
          <Label>מה המיומנות שהכי רוצה לחזק?</Label>
          <TextInput value={s.nextSkill || ""} onChange={v => onChange({ ...s, nextSkill: v })} placeholder="הכי רוצה לחזק את..." />
        </Card>
      </div>
    );
  }
  return null;
}

// Quiz M10: יום עצמאות — Freedom Meter
export function QuizM10({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  const freedomDimensions = [
    { key: "nav", label: "🗺️ ניווט", q: "עד כמה התמצאתי לבד?" },
    { key: "decide", label: "🎯 החלטות", q: "עד כמה קיבלתי החלטות ללא עזרה?" },
    { key: "money", label: "💰 כסף", q: "עד כמה ניהלתי את הכסף בעצמי?" },
    { key: "time", label: "⏰ זמן", q: "עד כמה עמדתי בזמנים?" },
    { key: "problem", label: "🔧 פתרון בעיות", q: "עד כמה פתרתי בעיות לבד?" },
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>☀️</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>מד עצמאות</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>כמה עצמאי היית ביום שלך?</p>
      </div>
      <button onClick={() => onChange({ ...s, step: "meter" })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>בדוק את המד שלך →</button>
    </div>
  );

  if (step === "meter") {
    const ratings = s.freedomRatings || {};
    const allDone = freedomDimensions.every(d => ratings[d.key]);
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 6 }}>☀️ מד העצמאות</p>
        <p style={{ color: "#6b7280", fontSize: 13, textAlign: "center", marginBottom: 20 }}>1 = ממש לא | 10 = לגמרי לבד</p>
        {freedomDimensions.map(dim => (
          <Card key={dim.key} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ color: "#1e1b4b", fontSize: 14, fontWeight: 600 }}>{dim.label}</span>
              <span style={{ color: "#7c3aed", fontWeight: 700, fontSize: 18 }}>{ratings[dim.key] || "—"}</span>
            </div>
            <p style={{ color: "#6b7280", fontSize: 12, margin: "0 0 10px" }}>{dim.q}</p>
            <input type="range" min={1} max={10} value={ratings[dim.key] || 5}
              onChange={e => onChange({ ...s, freedomRatings: { ...ratings, [dim.key]: Number(e.target.value) } })}
              style={{ width: "100%", accentColor: "#7c3aed" }} />
          </Card>
        ))}
        {allDone && <button onClick={() => onChange({ ...s, step: "story" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>לשלב הבא →</button>}
      </div>
    );
  }

  if (step === "story") {
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>📖 ספר את הסיפור</p>
        {[
          { key: "highlight", label: "🌟 הרגע הכי טוב ביום", ph: "הרגע שהכי זכור לי הוא..." },
          { key: "hard", label: "💪 מה היה קשה?", ph: "הכי קשה היה כש..." },
          { key: "proud", label: "⭐ מה גאה בו הכי הרבה?", ph: "הכי גאה שאני..." },
        ].map(item => (
          <Card key={item.key} style={{ marginBottom: 14 }}>
            <Label>{item.label}</Label>
            <TextInput multiline value={s[item.key] || ""} onChange={v => onChange({ ...s, [item.key]: v })} placeholder={item.ph} />
          </Card>
        ))}
        {s.highlight && s.hard && s.proud && (
          <button onClick={() => onChange({ ...s, step: "result" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>לתוצאות →</button>
        )}
      </div>
    );
  }

  if (step === "result") {
    const ratings = s.freedomRatings || {};
    const avg = Object.values(ratings).length ? Math.round(Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length) : 0;
    const emoji = avg >= 8 ? "🦅" : avg >= 5 ? "🐣" : "🌱";
    const msg = avg >= 8 ? "עצמאות מלאה! אתה מוכן לעולם." : avg >= 5 ? "עצמאות טובה — עוד קצת ואתה שם." : "תחילת הדרך — כל מסע מתחיל בצעד ראשון.";
    return (
      <div>
        <div style={{ textAlign: "center", padding: "28px 0 20px" }}>
          <div style={{ fontSize: 64, marginBottom: 10 }}>{emoji}</div>
          <p style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>ציון עצמאות: {avg}/10</p>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>{msg}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {freedomDimensions.map(dim => (
            <div key={dim.key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18, width: 30 }}>{dim.label.split(" ")[0]}</span>
              <span style={{ color: "#6b7280", fontSize: 13, width: 90, flexShrink: 0 }}>{dim.label.split(" ")[1]}</span>
              <div style={{ flex: 1, height: 8, borderRadius: 4, background: "#f3f4f6" }}>
                <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #7c3aed, #a855f7)", width: `${(ratings[dim.key] || 0) * 10}%`, transition: "width 0.5s" }} />
              </div>
              <span style={{ color: "#7c3aed", fontWeight: 700, fontSize: 14, width: 24, textAlign: "right" }}>{ratings[dim.key] || 0}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// Quiz M11: מחנאות — Survival Skills Check
export function QuizM11({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  const survivalSkills = [
    { id: "fire", q: "איך מדליקים מדורה בטוחה בחוץ?", options: ["מדליקים עם נוזל צתות ישר על הגדולה", "מתחילים קטן עם חומר יבש ומוסיפים בהדרגה", "לא חשוב — הכל שורף"], correct: 1 },
    { id: "tent", q: "מה חשוב לבדוק לפני שבוחרים מקום לאוהל?", options: ["שיהיה קרוב לשירותים", "שהקרקע שטוחה ויבשה, מחסה מרוח, לא בנחל", "שיהיה יפה לצלם"], correct: 1 },
    { id: "water", q: "כמה מים צריך לאדם ביום טיול?", options: ["חצי ליטר מספיק", "לפחות 2-3 ליטר", "רק שותים כשצמאים"], correct: 1 },
    { id: "lostgear", q: "שכחת להכניס פנס לתיק ויצאת לשטח. מה עושים?", options: ["חוזרים הביתה", "משתמשים בפלאפון בחיסכון ומתכננים חזרה לפני חשכה", "ממשיכים ומקווים לטוב"], correct: 1 },
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🏕️</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>מבחן שטח</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>כמה טוב הכרת את השטח? בואו לבדוק.</p>
      </div>
      <button onClick={() => onChange({ ...s, step: "quiz", qIdx: 0 })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>התחל מבחן! 🏕️</button>
    </div>
  );

  if (step === "quiz") {
    const idx = s.qIdx || 0;
    const q = survivalSkills[idx];
    const answered = (s.answers || {})[q.id];
    return (
      <div>
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {survivalSkills.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= idx ? "#7c3aed" : "#e5e7eb" }} />)}
        </div>
        <p style={{ color: "#9ca3af", fontSize: 12, textAlign: "center", marginBottom: 8 }}>שאלה {idx + 1} מתוך {survivalSkills.length}</p>
        <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)", marginBottom: 16 }}>
          <p style={{ color: "#1e1b4b", fontSize: 16, fontWeight: 600, margin: 0, lineHeight: 1.6, textAlign: "center" }}>{q.q}</p>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, oi) => {
            const isSel = answered === oi;
            const isBest = oi === q.correct;
            return (
              <button key={oi} onClick={() => !answered && onChange({ ...s, answers: { ...(s.answers || {}), [q.id]: oi } })} style={{
                padding: "14px 16px", borderRadius: 12, textAlign: "right", fontSize: 14, cursor: answered ? "default" : "pointer", lineHeight: 1.5,
                background: !answered ? "#f9fafb" : isBest ? "rgba(16,185,129,0.08)" : isSel ? "rgba(239,68,68,0.06)" : "#f9fafb",
                border: !answered ? "1px solid #e5e7eb" : isBest ? "1px solid rgba(16,185,129,0.4)" : isSel ? "1px solid rgba(239,68,68,0.3)" : "1px solid #e5e7eb",
                color: !answered ? "#1e1b4b" : isBest ? "#059669" : isSel ? "#ef4444" : "#9ca3af"
              }}>{answered && isBest ? "✓ " : ""}{opt}</button>
            );
          })}
        </div>
        {answered && (
          <button onClick={() => idx < survivalSkills.length - 1 ? onChange({ ...s, qIdx: idx + 1 }) : onChange({ ...s, step: "campfire" })} style={{ width: "100%", padding: "13px", borderRadius: 12, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 16 }}>
            {idx < survivalSkills.length - 1 ? "הבא →" : "לחלק הבא 🔥"}
          </button>
        )}
      </div>
    );
  }

  if (step === "campfire") {
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>🔥 שיחת מדורה</p>
        <p style={{ color: "#6b7280", fontSize: 14, textAlign: "center", marginBottom: 20 }}>דמיין שאתה יושב עכשיו סביב המדורה עם המשפחה. ענה על השאלות האלה:</p>
        {[
          { key: "campMoment", label: "מה הרגע הכי מיוחד מהלינה בשטח?", ph: "הרגע שהכי זכור לי..." },
          { key: "campLearn", label: "מה השטח לימד אותך על עצמך?", ph: "בשטח גיליתי ש..." },
        ].map(item => (
          <Card key={item.key} style={{ marginBottom: 14 }}>
            <Label>{item.label}</Label>
            <TextInput multiline value={s[item.key] || ""} onChange={v => onChange({ ...s, [item.key]: v })} placeholder={item.ph} />
          </Card>
        ))}
        {s.campMoment && s.campLearn && (
          <button onClick={() => onChange({ ...s, step: "result" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>לתוצאות →</button>
        )}
      </div>
    );
  }

  if (step === "result") {
    const answers = s.answers || {};
    const score = survivalSkills.filter(q => answers[q.id] === q.correct).length;
    return (
      <div>
        <div style={{ textAlign: "center", padding: "28px 0 20px" }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>🌲</div>
          <p style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>{score}/{survivalSkills.length} תשובות נכונות</p>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>{score === 4 ? "Scout מקצועי! 🏅" : score >= 2 ? "טוב מאוד — הלמידה ניכרת" : "עוד יש מה לתרגל — וזה בסדר!"}</p>
        </div>
        <Card style={{ border: "1.5px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.05)" }}>
          <Label>🌙 מה תקחי מהלינה בשטח לחיים?</Label>
          <TextInput multiline value={s.takeaway || ""} onChange={v => onChange({ ...s, takeaway: v })} placeholder="מהלינה הזו אני לוקח איתי..." />
        </Card>
      </div>
    );
  }
  return null;
}

// Quiz M12: תיק עתיד — Vision Board Interactive
export function QuizM12({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  const visionAreas = [
    { id: "career", icon: "💼", title: "קריירה", q: "בעוד 10 שנים, מה אתה עושה לפרנסה?" },
    { id: "family", icon: "👨‍👩‍👧‍👦", title: "משפחה", q: "איזה סוג משפחה אתה רוצה לבנות?" },
    { id: "adventure", icon: "🌍", title: "הרפתקאות", q: "לאן תרצה לנסוע? מה תרצה לעשות?" },
    { id: "impact", icon: "🌟", title: "השפעה", q: "איך תרצה לשנות את העולם?" },
    { id: "skill", icon: "🎯", title: "מיומנות", q: "מה מיומנות אחת שתרצה לשלוט בה לגמרי?" },
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🚀</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>תיק העתיד שלך</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>לבנות ביחד את הוויז'ן שלך לחיים</p>
      </div>
      <button onClick={() => onChange({ ...s, step: "vision" })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>פתח את תיק העתיד 🚀</button>
    </div>
  );

  if (step === "vision") {
    const visions = s.visions || {};
    const allDone = visionAreas.every(a => visions[a.id]);
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>🌟 ציור העתיד שלך</p>
        {visionAreas.map(area => (
          <Card key={area.id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(124,58,237,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{area.icon}</div>
              <div>
                <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14, margin: "0 0 2px" }}>{area.title}</p>
                <p style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>{area.q}</p>
              </div>
            </div>
            <TextInput value={visions[area.id] || ""} onChange={v => onChange({ ...s, visions: { ...visions, [area.id]: v } })} placeholder="כתוב כאן..." />
          </Card>
        ))}
        {allDone && <button onClick={() => onChange({ ...s, step: "letter" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>לשלב הבא ✉️</button>}
      </div>
    );
  }

  if (step === "letter") {
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 8 }}>✉️ מכתב לעצמך בעוד 10 שנים</p>
        <p style={{ color: "#6b7280", fontSize: 13, textAlign: "center", marginBottom: 20 }}>כתוב מכתב קצר לעצמך בגיל 23</p>
        <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)", marginBottom: 16 }}>
          <p style={{ color: "#9ca3af", fontSize: 12, margin: "0 0 12px" }}>עידו יקר,</p>
          <TextInput multiline value={s.letter || ""} onChange={v => onChange({ ...s, letter: v })} placeholder="כשאתה קורא את זה אתה בן 23. רציתי לספר לך ש..." />
          <p style={{ color: "#9ca3af", fontSize: 12, margin: "12px 0 0", textAlign: "left" }}>— עידו, גיל 13</p>
        </Card>
        {s.letter && s.letter.length > 30 && (
          <button onClick={() => onChange({ ...s, step: "result" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>לתוצאות →</button>
        )}
      </div>
    );
  }

  if (step === "result") {
    const visions = s.visions || {};
    return (
      <div>
        <div style={{ textAlign: "center", padding: "28px 0 20px" }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>🌟</div>
          <p style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>תיק העתיד שלך מוכן</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {visionAreas.map(area => (
            <div key={area.id} style={{ padding: "14px 16px", borderRadius: 14, background: "#ffffff", border: "1px solid #e5e7eb", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(124,58,237,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{area.icon}</div>
              <div>
                <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 13, margin: "0 0 4px" }}>{area.title}</p>
                <p style={{ color: "#1e1b4b", fontSize: 14, margin: 0, lineHeight: 1.5 }}>{visions[area.id]}</p>
              </div>
            </div>
          ))}
        </div>
        <Card style={{ border: "1.5px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.05)", textAlign: "center" }}>
          <p style={{ fontSize: 28, margin: "0 0 8px" }}>✉️</p>
          <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 14, margin: "0 0 6px" }}>המכתב שמור</p>
          <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>פתח אותו בגיל 23 🎂</p>
        </Card>
      </div>
    );
  }
  return null;
}

export const CHAPTER3_TASKS = {
  t24: T24_HomeRepair,
  t25: T25_BasicTools,
  t26: T26_IndependenceDay,
  t27: T27_TimeMoneyOwnership,
  t28: T28_FireSkills,
  t29: T29_SetupTent,
  t30: T30_CampingPlan,
  t31: T31_EquipmentOwnership,
  t32: T32_StrengthsMap,
  t33: T33_Dreams,
  t34: T34_AnnualGoal,
};

export const CHAPTER3_CLIMAX = { 3: Ch3Climax };

export const MONTH_QUIZZES_CH3 = {
  m9:  { component: QuizM9,  title: "סיכום חודש יולי — מיומנות טכנית",   emoji: "🔧" },
  m10: { component: QuizM10, title: "סיכום חודש אוגוסט — יום עצמאות",    emoji: "☀️" },
  m11: { component: QuizM11, title: "סיכום חודש ספטמבר — מחנאות",         emoji: "🏕️" },
  m12: { component: QuizM12, title: "סיכום חודש אוקטובר — תיק עתיד",     emoji: "🚀" },
};
