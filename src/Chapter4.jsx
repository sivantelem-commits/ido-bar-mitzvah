// ─── Chapter 4: חזון והובלה אישית (נובמבר 2027) ──────────────────────────────
import { useState, useEffect, useRef } from "react";

function Card({ children, style }) {
  return <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20, boxShadow: "0 1px 4px rgba(124,58,237,0.06)", ...style }}>{children}</div>;
}
function Label({ children }) {
  return <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14, margin: "0 0 10px" }}>{children}</p>;
}
function TextInput({ value, onChange, placeholder, multiline, rows = 3 }) {
  const style = { width: "100%", padding: "11px 14px", borderRadius: 10, boxSizing: "border-box", background: "#f9fafb", border: "1.5px solid #e5e7eb", color: "#1e1b4b", fontSize: 14, outline: "none", direction: "rtl", fontFamily: "inherit", lineHeight: 1.6, resize: "vertical" };
  return multiline
    ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={style} />
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
      <Label>💭 רפלקציה</Label>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: i < questions.length - 1 ? 14 : 0 }}>
          <p style={{ color: "#4b5563", fontSize: 13, margin: "0 0 6px" }}>{q}</p>
          <TextInput multiline value={(values || [])[i] || ""} onChange={v => { const arr = [...(values || [])]; arr[i] = v; onChange(arr); }} placeholder="כתוב כאן..." />
        </div>
      ))}
    </Card>
  );
}

// ─── T35: הגדרת פרויקט אישי ─────────────────────────────────────────────────
export function T35_DefineProject({ state, onChange }) {
  const s = state || {};
  const projectTypes = [
    { id: "social", icon: "🤝", title: "פרויקט חברתי", desc: "עזרה לקהילה, שינוי חברתי" },
    { id: "creative", icon: "🎨", title: "פרויקט יצירתי", desc: "מוזיקה, כתיבה, עיצוב, אמנות" },
    { id: "tech", icon: "💻", title: "פרויקט טכנולוגי", desc: "אפליקציה, אתר, המצאה" },
    { id: "physical", icon: "💪", title: "פרויקט פיזי", desc: "בנייה, תיקון, יצירה ידנית" },
    { id: "teaching", icon: "📚", title: "הוראה ושיתוף", desc: "ללמד אחרים מה שיודע" },
    { id: "business", icon: "💡", title: "יוזמה עסקית", desc: "שירות, מכירה, יצירת ערך" },
  ];

  const [step, setStep] = useState(s.step || 0);
  const steps = [
    { key: "type", label: "סוג הפרויקט" },
    { key: "title", label: "שם הפרויקט" },
    { key: "problem", label: "הבעיה שהוא פותר" },
    { key: "audience", label: "למי זה מיועד" },
    { key: "outcome", label: "מה יהיה בסוף" },
  ];

  return (
    <div>
      <Intro emoji="🚀" title="הגדרת פרויקט אישי"
        desc="הפרויקט הזה הוא שלך לגמרי. לא שיעורי בית, לא בגלל שביקשו — כי בחרת. בחר משהו שמרגש אותך ויצור משהו שלא היה לפניך." />

      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        {steps.map((st, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "#7c3aed" : "#e5e7eb", transition: "background 0.3s" }} />
        ))}
      </div>

      {step === 0 && (
        <div>
          <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 16 }}>איזה סוג פרויקט מרגש אותך?</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {projectTypes.map(pt => (
              <button key={pt.id} onClick={() => { onChange({ ...s, projectType: pt.id, step: 1 }); setStep(1); }} style={{
                padding: "16px 12px", borderRadius: 14, cursor: "pointer", textAlign: "center",
                background: s.projectType === pt.id ? "rgba(124,58,237,0.1)" : "#f9fafb",
                border: s.projectType === pt.id ? "2px solid #7c3aed" : "1px solid #e5e7eb",
                transition: "all 0.2s"
              }}>
                <p style={{ fontSize: 28, margin: "0 0 6px" }}>{pt.icon}</p>
                <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 13, margin: "0 0 4px" }}>{pt.title}</p>
                <p style={{ color: "#9ca3af", fontSize: 11, margin: 0 }}>{pt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step > 0 && step < steps.length && (() => {
        const current = steps[step];
        const questions = {
          title: { q: "מה שם הפרויקט?", ph: "שם קצר ומדויק..." },
          problem: { q: "איזה בעיה או צורך הפרויקט עונה עליהם?", ph: "הפרויקט קיים כדי ש..." },
          audience: { q: "למי הפרויקט מיועד?", ph: "הפרויקט מיועד ל..." },
          outcome: { q: "מה יהיה קיים בסוף שלא היה לפניך?", ph: "בסוף יהיה..." },
        };
        const q = questions[current.key];
        return (
          <div>
            <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)" }}>
              <p style={{ color: "#9ca3af", fontSize: 12, margin: "0 0 6px" }}>שלב {step} מתוך {steps.length - 1}</p>
              <p style={{ color: "#1e1b4b", fontSize: 16, fontWeight: 600, margin: "0 0 16px", lineHeight: 1.5 }}>{q.q}</p>
              <TextInput multiline value={s[current.key] || ""} onChange={v => onChange({ ...s, [current.key]: v })} placeholder={q.ph} />
            </Card>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button onClick={() => { setStep(step - 1); onChange({ ...s, step: step - 1 }); }} style={{ padding: "11px 20px", borderRadius: 12, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#6b7280", cursor: "pointer", fontSize: 14 }}>← חזרה</button>
              <button disabled={!s[current.key]} onClick={() => { const n = step + 1; setStep(n); onChange({ ...s, step: n }); }} style={{ flex: 1, padding: "11px", borderRadius: 12, background: s[current.key] ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "#f3f4f6", border: "none", color: s[current.key] ? "#fff" : "#9ca3af", fontSize: 15, fontWeight: 600, cursor: s[current.key] ? "pointer" : "not-allowed" }}>
                {step < steps.length - 1 ? "הבא →" : "סיום ✓"}
              </button>
            </div>
          </div>
        );
      })()}

      {step >= steps.length && (
        <Card style={{ border: "1.5px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.04)" }}>
          <p style={{ color: "#059669", fontWeight: 700, fontSize: 16, margin: "0 0 14px" }}>🚀 הפרויקט הוגדר!</p>
          {s.projectType && <p style={{ color: "#7c3aed", fontWeight: 600, margin: "0 0 8px" }}>{projectTypes.find(p => p.id === s.projectType)?.title}</p>}
          {[["title","שם"], ["problem","בעיה"], ["audience","קהל יעד"], ["outcome","תוצאה"]].map(([k,l]) => s[k] && (
            <div key={k} style={{ marginBottom: 8 }}>
              <p style={{ color: "#9ca3af", fontSize: 11, margin: "0 0 2px" }}>{l}</p>
              <p style={{ color: "#1e1b4b", fontSize: 14, margin: 0 }}>{s[k]}</p>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ─── T36: יעד + מדדי הצלחה ──────────────────────────────────────────────────
export function T36_GoalMetrics({ state, onChange }) {
  const s = state || {};
  const metrics = s.metrics || [{ metric: "", measure: "" }];

  function updateMetric(i, field, val) {
    onChange({ ...s, metrics: metrics.map((m, idx) => idx === i ? { ...m, [field]: val } : m) });
  }

  return (
    <div>
      <Intro emoji="📊" title="יעד ומדדי הצלחה"
        desc="איך תדע שהפרויקט הצליח? הגדר יעד ברור ומדדים — לא 'רציתי שיהיה טוב', אלא 'השגתי X עד תאריך Y'." />

      <Card style={{ marginBottom: 14 }}>
        <Label>היעד הגדול של הפרויקט</Label>
        <TextInput multiline value={s.mainGoal || ""} onChange={v => onChange({ ...s, mainGoal: v })} placeholder="בסוף הפרויקט, אני רוצה שיהיה..." />
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <Label>תאריך יעד</Label>
        <TextInput value={s.deadline || ""} onChange={v => onChange({ ...s, deadline: v })} placeholder="הפרויקט יסתיים עד..." />
      </Card>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <Label style={{ margin: 0 }}>מדדי הצלחה</Label>
          <button onClick={() => onChange({ ...s, metrics: [...metrics, { metric: "", measure: "" }] })} style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#7c3aed", fontSize: 12, cursor: "pointer" }}>+ מדד</button>
        </div>
        <p style={{ color: "#9ca3af", fontSize: 12, margin: "0 0 12px" }}>לדוגמה: "הגעתי ל-50 צפיות" / "עזרתי ל-5 ילדים" / "מכרתי 10 יחידות"</p>
        {metrics.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input value={m.metric || ""} onChange={e => updateMetric(i, "metric", e.target.value)} placeholder="מה נמדוד?" style={{ flex: 1, padding: "9px 12px", borderRadius: 9, background: "#f9fafb", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 13, outline: "none" }} />
            <input value={m.measure || ""} onChange={e => updateMetric(i, "measure", e.target.value)} placeholder="כמה?" style={{ width: 100, padding: "9px 10px", borderRadius: 9, background: "#f9fafb", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 13, outline: "none" }} />
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── T37: ביצוע הפרויקט ─────────────────────────────────────────────────────
export function T37_ExecuteProject({ state, onChange }) {
  const s = state || {};
  const milestones = s.milestones || [{ title: "", done: false, note: "" }];

  function updateMilestone(i, field, val) {
    onChange({ ...s, milestones: milestones.map((m, idx) => idx === i ? { ...m, [field]: val } : m) });
  }
  const doneCount = milestones.filter(m => m.done).length;

  return (
    <div>
      <Intro emoji="⚡" title="ביצוע הפרויקט"
        desc="הגיע הזמן לעשות. לא לתכנן עוד — לעשות. כאן תעקוב אחרי ציוני דרך, תתעד בעיות ופתרונות." />

      <div style={{ padding: "14px 18px", borderRadius: 14, marginBottom: 16, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 14 }}>ציוני דרך</span>
          <span style={{ color: "#7c3aed", fontWeight: 700 }}>{doneCount}/{milestones.length}</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: "#e5e7eb" }}>
          <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #7c3aed, #a855f7)", width: `${milestones.length ? (doneCount / milestones.length) * 100 : 0}%`, transition: "width 0.4s" }} />
        </div>
      </div>

      {milestones.map((m, i) => (
        <Card key={i} style={{ marginBottom: 10, border: m.done ? "1.5px solid rgba(16,185,129,0.3)" : "1px solid #e5e7eb", background: m.done ? "rgba(16,185,129,0.03)" : "#fff" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: m.done ? 10 : 0 }}>
            <button onClick={() => updateMilestone(i, "done", !m.done)} style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, cursor: "pointer", background: m.done ? "#10b981" : "transparent", border: m.done ? "none" : "1.5px solid #d1d5db", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
              {m.done && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
            </button>
            <input value={m.title || ""} onChange={e => updateMilestone(i, "title", e.target.value)} placeholder={`ציון דרך ${i + 1}...`} style={{ flex: 1, padding: "9px 12px", borderRadius: 9, background: "#f9fafb", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 14, outline: "none" }} />
          </div>
          {m.done && (
            <input value={m.note || ""} onChange={e => updateMilestone(i, "note", e.target.value)} placeholder="מה הושג? מה למדת?" style={{ width: "100%", padding: "8px 12px", borderRadius: 9, background: "#f9fafb", border: "1px solid #e5e7eb", color: "#6b7280", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          )}
        </Card>
      ))}

      <button onClick={() => onChange({ ...s, milestones: [...milestones, { title: "", done: false, note: "" }] })} style={{ padding: "8px 18px", borderRadius: 10, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "#7c3aed", fontSize: 13, cursor: "pointer", marginBottom: 16 }}>+ ציון דרך</button>

      <Card style={{ border: "1.5px solid rgba(234,179,8,0.25)", background: "rgba(234,179,8,0.04)" }}>
        <Label>🧱 מה היה הכי קשה ואיך התגברת?</Label>
        <TextInput multiline value={s.hardestPart || ""} onChange={v => onChange({ ...s, hardestPart: v })} placeholder="האתגר הכי גדול היה... והתגברתי על ידי..." />
      </Card>
    </div>
  );
}

// ─── T38: כתיבת נאום אישי ────────────────────────────────────────────────────
export function T38_PersonalSpeech({ state, onChange }) {
  const s = state || {};
  const [step, setStep] = useState(s.speechStep || 0);

  const speechParts = [
    { key: "opening", label: "פתיחה", desc: "משפט שפותח — שמושך תשומת לב", ph: "לדוגמה: 'לפני שנה...' / 'יש שאלה אחת שהעסיקה אותי...'", rows: 2 },
    { key: "journey", label: "המסע", desc: "מה עשית השנה — 3-4 דברים שהכי מרגשים אותך", ph: "השנה הזו הייתה...", rows: 4 },
    { key: "insight", label: "תובנה", desc: "מה הדבר הכי חשוב שלמדת על עצמך", ph: "הדבר שהכי שינה אותי הוא...", rows: 3 },
    { key: "gratitude", label: "תודה", desc: "מי עזר לך, מי היה לצידך", ph: "אני רוצה להודות ל...", rows: 3 },
    { key: "future", label: "המשך", desc: "לאן אתה הולך מכאן", ph: "מכאן אני לוקח איתי...", rows: 3 },
  ];

  const allDone = speechParts.every(p => s[p.key]);

  return (
    <div>
      <Intro emoji="🎤" title="כתיבת נאום אישי"
        desc="הנאום שלך לבר מצווה. לא מה שמישהו אחר כתב — מה שאתה רוצה להגיד. בנה אותו שלב אחר שלב." />

      {!allDone ? (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            {speechParts.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "#7c3aed" : "#e5e7eb", transition: "background 0.3s" }} />)}
          </div>
          <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(124,58,237,0.1)", border: "1.5px solid #7c3aed", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{step + 1}</div>
              <div>
                <p style={{ color: "#1e1b4b", fontWeight: 700, fontSize: 15, margin: "0 0 2px" }}>{speechParts[step].label}</p>
                <p style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>{speechParts[step].desc}</p>
              </div>
            </div>
            <TextInput multiline rows={speechParts[step].rows} value={s[speechParts[step].key] || ""} onChange={v => onChange({ ...s, [speechParts[step].key]: v, speechStep: step })} placeholder={speechParts[step].ph} />
          </Card>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {step > 0 && <button onClick={() => { setStep(step - 1); onChange({ ...s, speechStep: step - 1 }); }} style={{ padding: "11px 20px", borderRadius: 12, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#6b7280", cursor: "pointer", fontSize: 14 }}>← חזרה</button>}
            <button disabled={!s[speechParts[step].key]} onClick={() => { const n = step + 1; setStep(n); onChange({ ...s, speechStep: n }); }}
              style={{ flex: 1, padding: "11px", borderRadius: 12, background: s[speechParts[step].key] ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "#f3f4f6", border: "none", color: s[speechParts[step].key] ? "#fff" : "#9ca3af", fontSize: 15, fontWeight: 600, cursor: s[speechParts[step].key] ? "pointer" : "not-allowed" }}>
              {step < speechParts.length - 1 ? "הבא →" : "סיים ✓"}
            </button>
          </div>
        </div>
      ) : (
        <Card style={{ border: "1.5px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.03)" }}>
          <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 16, margin: "0 0 20px" }}>🎤 הנאום שלך</p>
          {speechParts.map(p => s[p.key] && (
            <div key={p.key} style={{ marginBottom: 18 }}>
              <p style={{ color: "#9ca3af", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 4px" }}>{p.label}</p>
              <p style={{ color: "#1e1b4b", fontSize: 14, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{s[p.key]}</p>
            </div>
          ))}
          <button onClick={() => { setStep(0); onChange({ ...s, speechStep: 0, opening: "", journey: "", insight: "", gratitude: "", future: "" }); }} style={{ padding: "8px 18px", borderRadius: 10, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#6b7280", fontSize: 13, cursor: "pointer", marginTop: 8 }}>✏️ ערוך מחדש</button>
        </Card>
      )}
    </div>
  );
}

// ─── T39: 5 תובנות מהשנה ────────────────────────────────────────────────────
export function T39_YearInsights({ state, onChange }) {
  const s = state || {};
  const insights = s.insights || Array(5).fill({ text: "", category: "" });

  function updateInsight(i, field, val) {
    onChange({ ...s, insights: insights.map((ins, idx) => idx === i ? { ...ins, [field]: val } : ins) });
  }

  const categories = ["על עצמי", "על אנשים", "על עבודה", "על חיים", "על משפחה", "על עצמאות", "על כסף", "על הגוף", "על חברות"];
  const filledCount = insights.filter(ins => ins.text).length;

  return (
    <div>
      <Intro emoji="💡" title="5 תובנות מהשנה"
        desc="שנה שלמה של ניסיון. מה למדת שלא ידעת לפני? לא תיאוריה — דברים שחווית בעצמך." />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>מלא לפחות 5 תובנות</p>
        <span style={{ color: "#7c3aed", fontWeight: 700, fontSize: 14 }}>{filledCount}/5</span>
      </div>

      {insights.map((ins, i) => (
        <Card key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: ins.text ? "rgba(124,58,237,0.15)" : "#f3f4f6", border: ins.text ? "1.5px solid #7c3aed" : "1.5px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: ins.text ? "#7c3aed" : "#9ca3af", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, flex: 1 }}>
              {categories.map(c => (
                <button key={c} onClick={() => updateInsight(i, "category", c)} style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, cursor: "pointer", background: ins.category === c ? "rgba(124,58,237,0.1)" : "#f9fafb", border: ins.category === c ? "1.5px solid #7c3aed" : "1px solid #e5e7eb", color: ins.category === c ? "#7c3aed" : "#9ca3af" }}>{c}</button>
              ))}
            </div>
          </div>
          <TextInput value={ins.text || ""} onChange={v => updateInsight(i, "text", v)} placeholder="למדתי ש..." />
        </Card>
      ))}

      {filledCount >= 5 && (
        <Card style={{ border: "1.5px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.05)", textAlign: "center" }}>
          <p style={{ fontSize: 32, margin: "0 0 8px" }}>💡</p>
          <p style={{ color: "#1e1b4b", fontWeight: 700, fontSize: 15, margin: "0 0 6px" }}>התובנה הכי גדולה שלך</p>
          <TextInput value={s.biggestInsight || ""} onChange={v => onChange({ ...s, biggestInsight: v })} placeholder="אם הייתי צריך לבחור תובנה אחת לכל החיים..." />
        </Card>
      )}
    </div>
  );
}

// ─── T40: מכתב לעצמי העתידי ─────────────────────────────────────────────────
export function T40_FutureLetter({ state, onChange }) {
  const s = state || {};
  const prompts = [
    "עידו היקר, היום אתה בן 13 ו...",
    "השנה למדתי ש...",
    "הדבר שהכי גאה בו הוא...",
    "אני מקווה שכשאתה קורא את זה...",
    "הייתי רוצה שתזכור ש...",
    "— עידו, נובמבר 2027",
  ];

  return (
    <div>
      <Intro emoji="✉️" title="מכתב לעצמי העתידי"
        desc="כתוב מכתב לעידו שיקרא אותו בגיל 18, 21, או 30. מה היית רוצה שידע? מה שמרת לו?" />

      <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)", marginBottom: 14 }}>
        <p style={{ color: "#9ca3af", fontSize: 12, margin: "0 0 4px" }}>פותחים ב:</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {["גיל 18", "גיל 21", "גיל 30"].map(age => (
            <button key={age} onClick={() => onChange({ ...s, openAge: age })} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 13, cursor: "pointer", background: s.openAge === age ? "rgba(124,58,237,0.1)" : "#f9fafb", border: s.openAge === age ? "1.5px solid #7c3aed" : "1px solid #e5e7eb", color: s.openAge === age ? "#7c3aed" : "#6b7280" }}>{age}</button>
          ))}
        </div>
        <TextInput multiline rows={12} value={s.letter || ""} onChange={v => onChange({ ...s, letter: v })} placeholder={prompts.join("\n")} />
      </Card>

      {s.letter && s.letter.length > 50 && (
        <Card style={{ border: "1.5px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.04)" }}>
          <p style={{ color: "#059669", fontWeight: 600, fontSize: 14, margin: "0 0 6px" }}>✅ המכתב נשמר</p>
          <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>יפתח ב{s.openAge || "עתיד"} — תחזיק חזק עד אז 🔐</p>
        </Card>
      )}
    </div>
  );
}

// ─── T41: הצגת המסע ─────────────────────────────────────────────────────────
export function T41_PresentJourney({ state, onChange }) {
  const s = state || {};
  const sections = [
    { key: "moments", label: "3 רגעים שהגדירו את השנה", ph: "רגע 1: ...\nרגע 2: ...\nרגע 3: ...", rows: 5 },
    { key: "changed", label: "מה השתנה בי הכי הרבה?", ph: "לפני שנה הייתי... היום אני...", rows: 3 },
    { key: "proud", label: "מה הדבר שהכי גאה בו?", ph: "הכי גאה שאני...", rows: 2 },
    { key: "thanks", label: "למי תודה מיוחדת?", ph: "תודה מיוחדת ל...", rows: 2 },
    { key: "commitment", label: "התחייבות אחת לשנה הבאה", ph: "אני מתחייב ל...", rows: 2 },
  ];

  const filled = sections.filter(s2 => s[s2.key]).length;

  return (
    <div>
      <Intro emoji="🌟" title="הצגת המסע"
        desc="הרגע שחיכית לו — לעמוד מול האנשים שאוהבים אותך ולספר להם מי אתה עכשיו. תכין מה תגיד." />

      {sections.map((sec, i) => (
        <Card key={sec.key} style={{ marginBottom: 12, border: s[sec.key] ? "1.5px solid rgba(124,58,237,0.2)" : "1px solid #e5e7eb" }}>
          <Label>{i + 1}. {sec.label}</Label>
          <TextInput multiline rows={sec.rows} value={s[sec.key] || ""} onChange={v => onChange({ ...s, [sec.key]: v })} placeholder={sec.ph} />
        </Card>
      ))}

      {filled >= 4 && (
        <div style={{ padding: "16px 20px", borderRadius: 16, background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.06))", border: "1.5px solid rgba(124,58,237,0.25)", textAlign: "center" }}>
          <p style={{ fontSize: 36, margin: "0 0 8px" }}>🎤</p>
          <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 16, margin: "0 0 6px" }}>מוכן להצגה!</p>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>תרגל פעם אחת לבד לפני שעומדים מול כולם</p>
        </div>
      )}
    </div>
  );
}

// ─── T42: חתימה על אמנה ─────────────────────────────────────────────────────
export function T42_SignManifesto({ state, onChange }) {
  const s = state || {};
  const commitments = [
    "אני לוקח אחריות מלאה על חיי — לא מחכה שמישהו יחליט בשבילי",
    "אני מדבר אמת, גם כשזה קשה",
    "אני עומד לצד אנשים שחשובים לי",
    "אני ממשיך ללמוד ולגדול — גם כשנוח להישאר במקום",
    "אני תורם לעולם יותר ממה שאני לוקח ממנו",
  ];

  return (
    <div>
      <Intro emoji="📜" title="חתימה על אמנת הבגרות"
        desc="הסוף הוא גם ההתחלה. אמנת הבגרות היא לא נייר — היא הבטחה שנותן לעצמך." />

      <Card style={{ border: "1.5px solid rgba(124,58,237,0.25)", marginBottom: 16 }}>
        <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 15, margin: "0 0 16px", textAlign: "center" }}>אמנת הבגרות</p>
        {commitments.map((c, i) => (
          <div key={i} onClick={() => {
            const cur = s.signed || [];
            onChange({ ...s, signed: cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i] });
          }} style={{
            display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", borderRadius: 12, marginBottom: 8, cursor: "pointer",
            background: (s.signed || []).includes(i) ? "rgba(124,58,237,0.08)" : "#f9fafb",
            border: (s.signed || []).includes(i) ? "1.5px solid rgba(124,58,237,0.3)" : "1px solid #e5e7eb",
            transition: "all 0.2s"
          }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: (s.signed || []).includes(i) ? "#7c3aed" : "transparent", border: (s.signed || []).includes(i) ? "none" : "1.5px solid #d1d5db", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {(s.signed || []).includes(i) && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
            </div>
            <p style={{ color: "#1e1b4b", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{c}</p>
          </div>
        ))}
      </Card>

      {(s.signed || []).length === commitments.length && (
        <Card style={{ border: "1.5px solid rgba(234,179,8,0.4)", background: "linear-gradient(135deg, rgba(234,179,8,0.08), rgba(251,191,36,0.04))", textAlign: "center" }}>
          <p style={{ fontSize: 40, margin: "0 0 10px" }}>🎉</p>
          <p style={{ color: "#1e1b4b", fontWeight: 700, fontSize: 18, margin: "0 0 6px" }}>בר מצווה!</p>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 16px" }}>חתמת על האמנה. עכשיו — לחיות לפיה.</p>
          <TextInput value={s.signatureName || ""} onChange={v => onChange({ ...s, signatureName: v })} placeholder="כתוב את שמך כחתימה..." />
          {s.signatureName && (
            <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 20, margin: "12px 0 0", fontFamily: "Georgia, serif" }}>{s.signatureName}</p>
          )}
        </Card>
      )}
    </div>
  );
}

// ─── Chapter 4 Climax ────────────────────────────────────────────────────────
export function Ch4Climax({ state, onChange, isParent }) {
  const s = state || {};
  return (
    <div>
      <Intro emoji="🏆" title="טקס הסיום — הענקת סמל"
        desc="הרגע הכי גדול של המסע. הענקת סמל שמייצג את האחריות, הצמיחה, והבגרות שהשגת השנה." />
      {!isParent ? (
        <Card style={{ border: "1.5px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.05)" }}>
          <Label>מה הסמל שתרצה לקבל?</Label>
          <TextInput value={s.symbolWish || ""} onChange={v => onChange({ ...s, symbolWish: v })} placeholder="אני רוצה לקבל סמל של... כי..." />
          <p style={{ color: "#9ca3af", fontSize: 12, margin: "12px 0 0" }}>לדוגמה: שעון, מצפן, טבעת, ספר, כלי</p>
          <button onClick={() => onChange({ ...s, idoReady: true })} style={{ marginTop: 12, padding: "10px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", background: s.idoReady ? "rgba(16,185,129,0.1)" : "linear-gradient(135deg, #7c3aed, #a855f7)", border: s.idoReady ? "1px solid rgba(16,185,129,0.4)" : "none", color: s.idoReady ? "#059669" : "#fff" }}>
            {s.idoReady ? "✓ מוכן!" : "מוכן לטקס"}
          </button>
        </Card>
      ) : (
        <Card style={{ border: "1.5px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.04)" }}>
          <Label>✅ הענקת הסמל</Label>
          {s.symbolWish && <p style={{ color: "#1e1b4b", fontSize: 14, margin: "0 0 14px", lineHeight: 1.6 }}>עידו ביקש: "{s.symbolWish}"</p>}
          <TextInput multiline value={s.parentNote || ""} onChange={v => onChange({ ...s, parentNote: v })} placeholder="כמה מילים על הטקס, על מה שאמרתם, על הסמל שנבחר..." />
          {!s.ceremonyDone && <button onClick={() => onChange({ ...s, ceremonyDone: true })} style={{ marginTop: 12, width: "100%", padding: "12px", borderRadius: 12, fontSize: 15, fontWeight: 600, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", cursor: "pointer" }}>🎉 הטקס הושלם — המסע הסתיים!</button>}
          {s.ceremonyDone && <div style={{ marginTop: 12, padding: "14px 16px", borderRadius: 12, background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)", textAlign: "center" }}><p style={{ color: "#d97706", fontWeight: 700, fontSize: 16, margin: 0 }}>🏆 המסע הושלם!</p></div>}
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZZES — מאתגרים, חשיבה, פאזלים
// ═══════════════════════════════════════════════════════════════════════════════

// Quiz M13: פרויקט — Design Thinking Challenge
export function QuizM13({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  // Puzzle 1: connect the dots — match problem → solution
  const matches = [
    { problem: "ילדים בשכונה לא יודעים לקרוא", solutions: ["אפליקציה לקריאה", "חוג קריאה שבועי", "ספריית רחוב", "שיעורים פרטיים"] },
    { problem: "בני נוער מרגישים בדידות", solutions: ["קבוצת ווטסאפ", "אירוע חברתי חודשי", "תוכנית חונכות", "יומן אישי"] },
    { problem: "פארק שכונתי מוזנח", solutions: ["עצומה לעירייה", "יום ניקיון מתנדבים", "גיוס תרומות לשיפוץ", "פרויקט ציור קירות"] },
  ];

  const designSteps = [
    { id: "understand", icon: "🔍", title: "הבן את הבעיה", q: "מה הבעיה שהפרויקט שלך פותר — בעיניי מי שסובל ממנה?" },
    { id: "empathy", icon: "💙", title: "התחבר לאנשים", q: "מה האנשים שאתה עוזר להם מרגישים? מה הם באמת צריכים?" },
    { id: "ideate", icon: "💡", title: "צור רעיונות", q: "תן 3 פתרונות שונים לגמרי לאותה בעיה" },
    { id: "test", icon: "🧪", title: "בדוק", q: "איך תדע שהפתרון עובד? מה יהיה הבדיקה שלך?" },
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🎨</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>אתגר Design Thinking</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>פאזל חיבור + חשיבה עיצובית</p>
      </div>
      <button onClick={() => onChange({ ...s, step: "puzzle" })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>מתחילים! 🎨</button>
    </div>
  );

  if (step === "puzzle") {
    const selected = s.matchSelected || {};
    const allMatched = matches.every((m, i) => selected[i]);
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 6 }}>🔗 בחר פתרון לכל בעיה</p>
        <p style={{ color: "#6b7280", fontSize: 13, textAlign: "center", marginBottom: 20 }}>אין תשובה אחת נכונה — בחר את הפתרון שנראה לך הכי טוב</p>
        {matches.map((m, i) => (
          <Card key={i} style={{ marginBottom: 14 }}>
            <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 14, margin: "0 0 12px", padding: "8px 12px", background: "rgba(124,58,237,0.06)", borderRadius: 8 }}>🔍 {m.problem}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {m.solutions.map(sol => (
                <button key={sol} onClick={() => onChange({ ...s, matchSelected: { ...selected, [i]: sol } })} style={{
                  padding: "10px 12px", borderRadius: 10, fontSize: 13, cursor: "pointer", lineHeight: 1.4,
                  background: selected[i] === sol ? "rgba(124,58,237,0.15)" : "#f9fafb",
                  border: selected[i] === sol ? "2px solid #7c3aed" : "1px solid #e5e7eb",
                  color: selected[i] === sol ? "#7c3aed" : "#1e1b4b", fontWeight: selected[i] === sol ? 600 : 400
                }}>{sol}</button>
              ))}
            </div>
            {selected[i] && <p style={{ color: "#059669", fontSize: 12, margin: "8px 0 0" }}>✓ בחרת: {selected[i]}</p>}
          </Card>
        ))}
        {allMatched && <button onClick={() => onChange({ ...s, step: "design" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>עכשיו — על הפרויקט שלך →</button>}
      </div>
    );
  }

  if (step === "design") {
    const answers = s.designAnswers || {};
    const allDone = designSteps.every(ds => answers[ds.id]);
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>🎨 Design Thinking — על הפרויקט שלך</p>
        {designSteps.map((ds, i) => (
          <Card key={ds.id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(124,58,237,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{ds.icon}</div>
              <div>
                <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14, margin: "0 0 2px" }}>{ds.title}</p>
                <p style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>{ds.q}</p>
              </div>
            </div>
            <TextInput multiline value={answers[ds.id] || ""} onChange={v => onChange({ ...s, designAnswers: { ...answers, [ds.id]: v } })} placeholder="כתוב כאן..." />
          </Card>
        ))}
        {allDone && <button onClick={() => onChange({ ...s, step: "result" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>לתוצאות →</button>}
      </div>
    );
  }

  if (step === "result") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>🎨</div>
        <p style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>חשיבה עיצובית מלאה</p>
        <p style={{ color: "#6b7280", fontSize: 14 }}>ניתחת בעיה, הבנת אנשים, יצרת פתרונות ובדקת</p>
      </div>
      <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)" }}>
        <Label>מה הלקח הכי חשוב מהתהליך הזה?</Label>
        <TextInput multiline value={s.designLesson || ""} onChange={v => onChange({ ...s, designLesson: v })} placeholder="מה שינה לי את הראש בתהליך הזה..." />
      </Card>
    </div>
  );
  return null;
}

// Quiz M14: עיבוד המסע — Logic & Reflection Maze
export function QuizM14({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  // Logic puzzle: values ranking
  const valueDilemmas = [
    {
      id: "v1",
      scenario: "אתה יכול להיות עשיר ומצליח, אבל לבד — או בינוני כלכלית עם משפחה ואנשים שאוהבים אותך.",
      choice: ["עושר והצלחה", "קשרים ואהבה"],
    },
    {
      id: "v2",
      scenario: "אתה יכול לקבל כבוד ופרסום מהציבור, אבל להרגיש ריק מבפנים — או להרגיש שלם עם עצמך בלי שאיש יודע.",
      choice: ["כבוד חיצוני", "שלמות פנימית"],
    },
    {
      id: "v3",
      scenario: "אתה יכול לשמור על ביטחון ויציבות אבל לא לגדול — או לסכן הכל כדי לחיות את החלום שלך.",
      choice: ["ביטחון ויציבות", "חלום ואומץ"],
    },
  ];

  // Year in review puzzle — connect event to lesson
  const yearEvents = [
    { event: "הכנת ארוחה לכל המשפחה", lesson: "" },
    { event: "ביצוע תיקון בבית לבד", lesson: "" },
    { event: "נסיעה עצמאית בתחבורה ציבורית", lesson: "" },
    { event: "השלמת פרויקט אישי", lesson: "" },
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🧩</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>מבוך הערכים</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>דילמות קשות + עיבוד השנה</p>
      </div>
      <button onClick={() => onChange({ ...s, step: "dilemmas", dIdx: 0 })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>כניסה למבוך 🧩</button>
    </div>
  );

  if (step === "dilemmas") {
    const idx = s.dIdx || 0;
    const d = valueDilemmas[idx];
    const chosen = (s.valueChoices || {})[d.id];
    return (
      <div>
        <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
          {valueDilemmas.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= idx ? "#7c3aed" : "#e5e7eb" }} />)}
        </div>
        <p style={{ color: "#9ca3af", fontSize: 12, textAlign: "center", marginBottom: 16 }}>דילמה {idx + 1} מתוך {valueDilemmas.length}</p>
        <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)", marginBottom: 16, textAlign: "center" }}>
          <p style={{ fontSize: 20, margin: "0 0 12px" }}>⚖️</p>
          <p style={{ color: "#1e1b4b", fontSize: 15, lineHeight: 1.8, margin: 0 }}>{d.scenario}</p>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {d.choice.map(c => (
            <button key={c} onClick={() => onChange({ ...s, valueChoices: { ...(s.valueChoices || {}), [d.id]: c } })} style={{
              padding: "20px 12px", borderRadius: 16, cursor: "pointer", textAlign: "center",
              background: chosen === c ? "rgba(124,58,237,0.15)" : "#f9fafb",
              border: chosen === c ? "2px solid #7c3aed" : "1.5px solid #e5e7eb",
              color: chosen === c ? "#7c3aed" : "#1e1b4b", fontWeight: chosen === c ? 700 : 400, fontSize: 14
            }}>{c}</button>
          ))}
        </div>
        {chosen && (
          <>
            <Card style={{ marginBottom: 14, border: "1px solid #e5e7eb" }}>
              <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 8px" }}>למה בחרת {chosen}?</p>
              <TextInput value={(s.valueReasons || {})[d.id] || ""} onChange={v => onChange({ ...s, valueReasons: { ...(s.valueReasons || {}), [d.id]: v } })} placeholder="בחרתי כי..." />
            </Card>
            <button onClick={() => idx < valueDilemmas.length - 1 ? onChange({ ...s, dIdx: idx + 1 }) : onChange({ ...s, step: "yearreview" })} style={{ width: "100%", padding: "13px", borderRadius: 12, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              {idx < valueDilemmas.length - 1 ? "דילמה הבאה →" : "לסיכום השנה →"}
            </button>
          </>
        )}
      </div>
    );
  }

  if (step === "yearreview") {
    const lessons = s.yearLessons || {};
    const allFilled = yearEvents.every((_, i) => lessons[i]);
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 8 }}>🗓️ שנה בסיכום</p>
        <p style={{ color: "#6b7280", fontSize: 13, textAlign: "center", marginBottom: 20 }}>מה למדת מכל אחד מהדברים שעשית השנה?</p>
        {yearEvents.map((ev, i) => (
          <Card key={i} style={{ marginBottom: 12 }}>
            <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 13, margin: "0 0 8px" }}>📌 {ev.event}</p>
            <TextInput value={lessons[i] || ""} onChange={v => onChange({ ...s, yearLessons: { ...lessons, [i]: v } })} placeholder="מזה למדתי ש..." />
          </Card>
        ))}
        {allFilled && <button onClick={() => onChange({ ...s, step: "result" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>לתוצאות →</button>}
      </div>
    );
  }

  if (step === "result") {
    const choices = s.valueChoices || {};
    const choiceList = valueDilemmas.map(d => choices[d.id]).filter(Boolean);
    return (
      <div>
        <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>🧩</div>
          <p style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>המבוך הושלם</p>
        </div>
        <Card style={{ border: "1.5px solid rgba(124,58,237,0.25)", marginBottom: 16 }}>
          <Label>הדברים שבחרת:</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {choiceList.map((c, i) => (
              <span key={i} style={{ padding: "7px 16px", borderRadius: 20, background: "rgba(124,58,237,0.1)", border: "1.5px solid rgba(124,58,237,0.3)", color: "#7c3aed", fontSize: 13, fontWeight: 600 }}>{c}</span>
            ))}
          </div>
          <p style={{ color: "#6b7280", fontSize: 13, margin: "12px 0 0", lineHeight: 1.6 }}>הבחירות שלך מגלות מה באמת חשוב לך. שמור על זה.</p>
        </Card>
        <Card style={{ border: "1.5px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.05)" }}>
          <Label>✨ משפט אחד שמסכם את השנה שלך</Label>
          <TextInput value={s.yearSentence || ""} onChange={v => onChange({ ...s, yearSentence: v })} placeholder="השנה הזו הייתה..." />
        </Card>
      </div>
    );
  }
  return null;
}

// Quiz M15: בר מצווה — The Final Challenge
export function QuizM15({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  // Knowledge quiz about the year
  const finalQuestions = [
    {
      q: "מהו ההבדל המהותי בין 'להיות אחראי' לבין 'לקבל פקודות'?",
      options: [
        "אין הבדל, שניהם אומרים לעשות מה שצריך",
        "אחריות היא פנימית — אתה בוחר לעשות כי זה נכון, לא כי מחייבים אותך",
        "פקודות הן יותר יעילות כי מישהו מפקח",
      ],
      correct: 1,
    },
    {
      q: "מה המשמעות האמיתית של 'בגרות'?",
      options: [
        "להיות מעל גיל 18",
        "לדעת לנהוג",
        "לקחת אחריות על ההחלטות שלך ועל ההשפעה שלהן על אחרים",
      ],
      correct: 2,
    },
    {
      q: "מה עדיף — להצליח ולא ללמוד, או לכשול וללמוד?",
      options: [
        "להצליח תמיד עדיף",
        "לכשול וללמוד — כי הצמיחה נמצאת בכישלון",
        "זה לא משנה, העיקר להמשיך",
      ],
      correct: 1,
    },
    {
      q: "מה פירוש 'להוביל'?",
      options: [
        "להיות הכי חזק בקבוצה",
        "לגרום לאחרים לעשות מה שאתה רוצה",
        "לפעול מתוך ערכים, ולהשפיע על אחרים להיות טובים יותר",
      ],
      correct: 2,
    },
  ];

  // Wisdom challenge: complete the sentence
  const wisdomChallenges = [
    { prompt: "כוח אמיתי הוא...", key: "w1" },
    { prompt: "אדם טוב הוא מי ש...", key: "w2" },
    { prompt: "ההבדל בין ילד לאיש הוא...", key: "w3" },
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>🏆</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 24, fontWeight: 700, margin: "0 0 8px" }}>האתגר הסופי</h2>
        <p style={{ color: "#6b7280", fontSize: 15, margin: 0 }}>הכל מסתכם בזה</p>
      </div>
      <Card style={{ border: "1.5px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.05)", marginBottom: 20 }}>
        <p style={{ color: "#d97706", fontSize: 14, lineHeight: 1.7, margin: 0, textAlign: "center" }}>
          "עם כוח גדול באה אחריות גדולה"<br />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>— עקרון שמלווה גיבורים בכל הדורות</span>
        </p>
      </Card>
      <button onClick={() => onChange({ ...s, step: "quiz", qIdx: 0 })} style={{ width: "100%", padding: "16px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 17, fontWeight: 700, cursor: "pointer" }}>התחל את האתגר הסופי 🏆</button>
    </div>
  );

  if (step === "quiz") {
    const idx = s.qIdx || 0;
    const q = finalQuestions[idx];
    const answered = (s.answers || {})[idx];
    return (
      <div>
        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
          {finalQuestions.map((_, i) => <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i <= idx ? "#7c3aed" : "#e5e7eb" }} />)}
        </div>
        <p style={{ color: "#9ca3af", fontSize: 12, textAlign: "center", marginBottom: 16 }}>שאלה {idx + 1} מתוך {finalQuestions.length}</p>
        <Card style={{ border: "1.5px solid rgba(124,58,237,0.2)", marginBottom: 16 }}>
          <p style={{ color: "#1e1b4b", fontSize: 16, fontWeight: 600, margin: 0, lineHeight: 1.7, textAlign: "center" }}>{q.q}</p>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, oi) => {
            const isSel = answered === oi;
            const isBest = oi === q.correct;
            return (
              <button key={oi} onClick={() => !answered && onChange({ ...s, answers: { ...(s.answers || {}), [idx]: oi } })} style={{
                padding: "16px 18px", borderRadius: 14, textAlign: "right", fontSize: 14, cursor: answered ? "default" : "pointer", lineHeight: 1.6,
                background: !answered ? "#f9fafb" : isBest ? "rgba(16,185,129,0.08)" : isSel ? "rgba(239,68,68,0.06)" : "#f9fafb",
                border: !answered ? "1.5px solid #e5e7eb" : isBest ? "1.5px solid rgba(16,185,129,0.5)" : isSel ? "1.5px solid rgba(239,68,68,0.4)" : "1px solid #e5e7eb",
                color: !answered ? "#1e1b4b" : isBest ? "#059669" : isSel ? "#ef4444" : "#9ca3af",
                fontWeight: answered && isBest ? 600 : 400
              }}>{answered && isBest ? "✓ " : ""}{opt}</button>
            );
          })}
        </div>
        {answered !== undefined && (
          <button onClick={() => idx < finalQuestions.length - 1 ? onChange({ ...s, qIdx: idx + 1 }) : onChange({ ...s, step: "wisdom" })} style={{ width: "100%", padding: "13px", borderRadius: 12, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 16 }}>
            {idx < finalQuestions.length - 1 ? "שאלה הבאה →" : "לאתגר החוכמה →"}
          </button>
        )}
      </div>
    );
  }

  if (step === "wisdom") {
    const allFilled = wisdomChallenges.every(w => s[w.key]);
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 16, textAlign: "center", marginBottom: 8 }}>🧠 אתגר החוכמה</p>
        <p style={{ color: "#6b7280", fontSize: 14, textAlign: "center", marginBottom: 20 }}>השלם את המשפטים. אין תשובות נכונות — רק שלך.</p>
        {wisdomChallenges.map(w => (
          <Card key={w.key} style={{ marginBottom: 14, border: "1.5px solid rgba(124,58,237,0.15)" }}>
            <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 16, margin: "0 0 12px" }}>{w.prompt}</p>
            <TextInput multiline value={s[w.key] || ""} onChange={v => onChange({ ...s, [w.key]: v })} placeholder="..." />
          </Card>
        ))}
        {allFilled && <button onClick={() => onChange({ ...s, step: "final" })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>לסיום המסע 🏆</button>}
      </div>
    );
  }

  if (step === "final") {
    const answers = s.answers || {};
    const score = finalQuestions.filter((q, i) => answers[i] === q.correct).length;
    return (
      <div>
        <div style={{ textAlign: "center", padding: "32px 0 24px" }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>🏆</div>
          <p style={{ color: "#1e1b4b", fontSize: 26, fontWeight: 700, margin: "0 0 8px" }}>ברוך הבא, עידו</p>
          <p style={{ color: "#7c3aed", fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>{score}/{finalQuestions.length} תשובות נכונות</p>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>המסע הושלם</p>
        </div>

        <Card style={{ border: "1.5px solid rgba(234,179,8,0.4)", background: "linear-gradient(135deg, rgba(234,179,8,0.08), rgba(251,191,36,0.04))", marginBottom: 16 }}>
          <p style={{ color: "#d97706", fontWeight: 600, fontSize: 14, margin: "0 0 12px" }}>החוכמה שלך:</p>
          {[{ label: "כוח אמיתי הוא...", key: "w1" }, { label: "אדם טוב הוא...", key: "w2" }, { label: "ההבדל הוא...", key: "w3" }].map(item => s[item.key] && (
            <div key={item.key} style={{ marginBottom: 10 }}>
              <p style={{ color: "#9ca3af", fontSize: 11, margin: "0 0 2px" }}>{item.label}</p>
              <p style={{ color: "#1e1b4b", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{s[item.key]}</p>
            </div>
          ))}
        </Card>

        <Card style={{ border: "1.5px solid rgba(124,58,237,0.3)", textAlign: "center" }}>
          <p style={{ fontSize: 32, margin: "0 0 8px" }}>✉️</p>
          <p style={{ color: "#1e1b4b", fontWeight: 700, fontSize: 15, margin: "0 0 6px" }}>שנה שלמה של צמיחה</p>
          <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 14px", lineHeight: 1.6 }}>
            מנובמבר 2026 עד נובמבר 2027 — עשית 42 משימות,<br />
            4 אירועי שיא, 12 משחקונים, ומסע שלם.
          </p>
          <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 16 }}>ברוך הבא לבגרות, עידו. 🧭</p>
        </Card>
      </div>
    );
  }
  return null;
}

// ─── Registries ──────────────────────────────────────────────────────────────
export const CHAPTER4_TASKS = {
  t35: T35_DefineProject,
  t36: T36_GoalMetrics,
  t37: T37_ExecuteProject,
  t38: T38_PersonalSpeech,
  t39: T39_YearInsights,
  t40: T40_FutureLetter,
  t41: T41_PresentJourney,
  t42: T42_SignManifesto,
};

export const CHAPTER4_CLIMAX = { 4: Ch4Climax };

export const MONTH_QUIZZES_CH4 = {
  m13: { component: QuizM13, title: "משחקון שבוע א׳ — Design Thinking", emoji: "🎨" },
  m14: { component: QuizM14, title: "משחקון שבוע ב׳ — מבוך הערכים", emoji: "🧩" },
  m15: { component: QuizM15, title: "האתגר הסופי — ברוך הבא לבגרות", emoji: "🏆" },
};
