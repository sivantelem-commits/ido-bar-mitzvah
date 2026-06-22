// ─── Chapter 2: Tasks & Quizzes (מרץ–יוני 2027) ─────────────────────────────
// Import this file's exports into TaskActivity.jsx

import { useState, useEffect, useRef } from "react";

// ── Shared helpers (duplicated for standalone use) ─────────────────────────
function Card({ children, style }) {
  return <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20, ...style }}>{children}</div>;
}
function Label({ children }) {
  return <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14, margin: "0 0 10px" }}>{children}</p>;
}
function TextInput({ value, onChange, placeholder, multiline }) {
  const style = { width: "100%", padding: "12px 14px", borderRadius: 12, boxSizing: "border-box", background: "#f3f4f6", border: "1px solid #d1d5db", color: "#1e1b4b", fontSize: 14, outline: "none", direction: "rtl", fontFamily: "inherit", lineHeight: 1.6, resize: "vertical" };
  return multiline
    ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={style} />
    : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />;
}
function Intro({ emoji, title, desc }) {
  return (
    <div style={{ padding: 20, borderRadius: 14, marginBottom: 20, background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.06))", border: "1px solid rgba(124,58,237,0.25)" }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{emoji}</div>
      <p style={{ color: "#7c3aed", fontWeight: 700, fontSize: 16, margin: "0 0 6px" }}>{title}</p>
      <p style={{ color: "#4b5563", fontSize: 14, margin: 0, lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}
function ReflectionSection({ questions, values, onChange }) {
  return (
    <Card style={{ marginTop: 16, border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.04)" }}>
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

// ─── T13: יומן רגשי שבועי ────────────────────────────────────────────────────
export function T13_EmotionJournal({ state, onChange }) {
  const s = state || {};
  const entries = s.entries || [];
  const emotions = ["😤 כעס", "😢 עצב", "😨 פחד", "😊 שמחה", "😌 רוגע", "😔 בדידות", "🤩 התלהבות", "😰 חרדה", "💪 עוצמה", "🥰 אהבה"];

  function addEntry() {
    onChange({ ...s, entries: [...entries, { date: new Date().toLocaleDateString("he-IL"), emotion: "", intensity: 5, trigger: "", response: "", lesson: "" }] });
  }
  function updateEntry(i, field, val) {
    onChange({ ...s, entries: entries.map((e, idx) => idx === i ? { ...e, [field]: val } : e) });
  }

  return (
    <div>
      <Intro emoji="🌊" title="יומן רגשי שבועי"
        desc="רגשות הם מידע, לא חולשה. כל פעם שמשהו מזיז אותך — כותבים. לא כדי לבכות על זה, כדי להבין את עצמך." />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>תעד כניסה לפחות פעם בשבוע</p>
        <button onClick={addEntry} style={{ padding: "8px 18px", borderRadius: 10, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ כניסה חדשה</button>
      </div>

      {entries.length === 0 && (
        <Card style={{ textAlign: "center", padding: "32px 20px", border: "1px dashed rgba(255,255,255,0.1)" }}>
          <p style={{ fontSize: 40, margin: "0 0 10px" }}>📓</p>
          <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>עדיין אין כניסות. לחץ "+ כניסה חדשה" כדי להתחיל.</p>
        </Card>
      )}

      {entries.map((entry, i) => (
        <Card key={i} style={{ marginBottom: 14, border: "1px solid rgba(124,58,237,0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ color: "#9ca3af", fontSize: 12 }}>{entry.date}</span>
            <span style={{ color: "#7c3aed", fontWeight: 600, fontSize: 13 }}>כניסה {i + 1}</span>
          </div>

          <Label>מה הרגשת?</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {emotions.map(em => (
              <button key={em} onClick={() => updateEntry(i, "emotion", em)} style={{
                padding: "6px 12px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                background: entry.emotion === em ? "rgba(124,58,237,0.2)" : "#f9fafb",
                border: entry.emotion === em ? "1.5px solid #7c3aed" : "1px solid #e5e7eb",
                color: entry.emotion === em ? "#e9d5ff" : "rgba(255,255,255,0.6)"
              }}>{em}</button>
            ))}
          </div>

          <Label>עוצמה (1–10)</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <input type="range" min={1} max={10} value={entry.intensity || 5}
              onChange={e => updateEntry(i, "intensity", Number(e.target.value))}
              style={{ flex: 1, accentColor: "#7c3aed" }} />
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(124,58,237,0.15)", border: "1.5px solid #7c3aed", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 700, flexShrink: 0 }}>
              {entry.intensity || 5}
            </div>
          </div>

          <Label>מה גרם לזה?</Label>
          <div style={{ marginBottom: 12 }}>
            <TextInput value={entry.trigger || ""} onChange={v => updateEntry(i, "trigger", v)} placeholder="קרה משהו שגרם לי להרגיש ככה כי..." />
          </div>

          <Label>איך הגבת?</Label>
          <div style={{ marginBottom: 12 }}>
            <TextInput value={entry.response || ""} onChange={v => updateEntry(i, "response", v)} placeholder="עשיתי / אמרתי / חשבתי..." />
          </div>

          <Label>מה למדת על עצמך?</Label>
          <TextInput value={entry.lesson || ""} onChange={v => updateEntry(i, "lesson", v)} placeholder="הבנתי ש..." />
        </Card>
      ))}

      {entries.length > 0 && (
        <Card style={{ border: "1px solid rgba(234,179,8,0.2)", background: "rgba(234,179,8,0.05)" }}>
          <Label>🔍 דפוסים שאני מזהה בעצמי</Label>
          <TextInput multiline value={s.patterns || ""} onChange={v => onChange({ ...s, patterns: v })} placeholder="אחרי כמה כניסות — מה שם לב שחוזר? אילו מצבים מעלים רגשות חזקים?" />
        </Card>
      )}
    </div>
  );
}

// ─── T14: שיחה אמיצה ─────────────────────────────────────────────────────────
export function T14_BraveConversation({ state, onChange }) {
  const s = state || {};
  const [step, setStep] = useState(s.step || 0);

  const steps = [
    { q: "מה הנושא שאתה רוצה לדבר עליו?", key: "topic", placeholder: "הנושא שקשה לי לדבר עליו הוא..." },
    { q: "מה הרגש הכי חזק שעולה כשאתה חושב על זה?", key: "emotion", placeholder: "כשאני חושב על זה אני מרגיש..." },
    { q: "עם מי אתה רוצה לשוחח על זה?", key: "person", placeholder: "אני רוצה לדבר עם..." },
    { q: "מה אתה מפחד שיקרה אם תגיד את מה שאתה מרגיש?", key: "fear", placeholder: "אני מפחד ש..." },
    { q: "מה המשפט הפותח שלך יהיה?", key: "opener", placeholder: 'לדוגמה: "יש משהו שקשה לי לומר לך — אבל חשוב לי שתדע..."' },
  ];

  const currentStep = steps[step];
  const allAnswered = steps.every(st => s[st.key]);

  return (
    <div>
      <Intro emoji="💬" title="שיחה אמיצה"
        desc="יש דברים שקשה לומר — על פחד, על כעס, על משהו שמציק. השיחה הזו היא אתגר: לבחור נושא אחד שקשה ולדבר עליו." />

      {!allAnswered && (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "#7c3aed" : "#e5e7eb", transition: "background 0.3s" }} />
            ))}
          </div>

          <Card style={{ border: "1px solid rgba(124,58,237,0.25)" }}>
            <p style={{ color: "#6b7280", fontSize: 12, margin: "0 0 6px" }}>שאלה {step + 1} מתוך {steps.length}</p>
            <p style={{ color: "#1e1b4b", fontSize: 16, fontWeight: 600, margin: "0 0 16px", lineHeight: 1.5 }}>{currentStep.q}</p>
            <TextInput multiline value={s[currentStep.key] || ""} onChange={v => onChange({ ...s, [currentStep.key]: v })} placeholder={currentStep.placeholder} />
          </Card>

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} style={{ padding: "11px 20px", borderRadius: 12, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#6b7280", cursor: "pointer", fontSize: 14 }}>← חזרה</button>
            )}
            <button onClick={() => { onChange({ ...s, step: step + 1 }); setStep(step + 1); }}
              disabled={!s[currentStep.key]}
              style={{ flex: 1, padding: "11px", borderRadius: 12, background: s[currentStep.key] ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "#f9fafb", border: "none", color: s[currentStep.key] ? "#fff" : "rgba(255,255,255,0.3)", fontSize: 15, fontWeight: 600, cursor: s[currentStep.key] ? "pointer" : "not-allowed" }}>
              {step < steps.length - 1 ? "הבא →" : "סיום ✓"}
            </button>
          </div>
        </div>
      )}

      {allAnswered && (
        <div>
          <Card style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.06)", marginBottom: 14 }}>
            <p style={{ color: "#059669", fontWeight: 700, fontSize: 15, margin: "0 0 12px" }}>✅ מוכן לשיחה</p>
            {steps.map(st => s[st.key] && (
              <div key={st.key} style={{ marginBottom: 10 }}>
                <p style={{ color: "#9ca3af", fontSize: 11, margin: "0 0 3px" }}>{st.q}</p>
                <p style={{ color: "#374151", fontSize: 14, margin: 0, lineHeight: 1.5 }}>{s[st.key]}</p>
              </div>
            ))}
          </Card>
          <ReflectionSection
            questions={["אחרי השיחה — איך הלך?", "מה הפתיע אותך?", "מה היה שונה ממה שציפית?"]}
            values={s.reflection || []}
            onChange={v => onChange({ ...s, reflection: v })} />
        </div>
      )}
    </div>
  );
}

// ─── T15: פרויקט התנדבותי ─────────────────────────────────────────────────────
export function T15_Volunteer({ state, onChange }) {
  const s = state || {};
  const causes = ["ילדים וחינוך", "קשישים", "בעלי חיים", "סביבה וטבע", "חולים ובתי חולים", "עוני ומזון", "נכים ונגישות", "ספורט קהילתי"];

  return (
    <div>
      <Intro emoji="🤝" title="פרויקט התנדבותי"
        desc="לתרום לא רק כשנוח — אלא כי בחרת. ההתנדבות הזו היא שלך: אתה בוחר את הנושא, אתה מוצא את המקום, אתה מתחייב." />

      <Card>
        <Label>באיזה תחום הלב שלך?</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
          {causes.map(c => (
            <button key={c} onClick={() => onChange({ ...s, cause: c })} style={{
              padding: "8px 16px", borderRadius: 20, fontSize: 13, cursor: "pointer",
              background: s.cause === c ? "rgba(124,58,237,0.15)" : "#f9fafb",
              border: s.cause === c ? "1.5px solid #7c3aed" : "1px solid #e5e7eb",
              color: s.cause === c ? "#e9d5ff" : "rgba(255,255,255,0.7)"
            }}>{c}</button>
          ))}
        </div>
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Label>שם הארגון / המקום שבחרת</Label>
        <TextInput value={s.org || ""} onChange={v => onChange({ ...s, org: v })} placeholder="לדוגמה: עמותת... / בית ספר... / פארק..." />
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Label>מה תעשה שם בדיוק?</Label>
        <TextInput multiline value={s.what || ""} onChange={v => onChange({ ...s, what: v })} placeholder="אני אעזור ב... / אלמד... / אכין... / אלווה..." />
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Label>כמה פעמים ומתי?</Label>
        <div style={{ display: "flex", gap: 10 }}>
          {["פעם אחת", "פעמיים", "פעם בשבוע", "פעמיים בחודש"].map(f => (
            <button key={f} onClick={() => onChange({ ...s, freq: f })} style={{
              flex: 1, padding: "9px 6px", borderRadius: 10, fontSize: 12, cursor: "pointer",
              background: s.freq === f ? "rgba(124,58,237,0.15)" : "#f9fafb",
              border: s.freq === f ? "1.5px solid #7c3aed" : "1px solid #e5e7eb",
              color: s.freq === f ? "#e9d5ff" : "rgba(255,255,255,0.6)"
            }}>{f}</button>
          ))}
        </div>
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Label>למה בחרת דווקא בזה?</Label>
        <TextInput multiline value={s.why || ""} onChange={v => onChange({ ...s, why: v })} placeholder="בחרתי בזה כי..." />
      </Card>

      <ReflectionSection
        questions={["אחרי הביקור הראשון — מה הרגשת?", "מה הפתיע אותך במפגש עם האנשים שם?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

// ─── T16: התחייבות קבועה ─────────────────────────────────────────────────────
export function T16_Commitment({ state, onChange }) {
  const s = state || {};
  const weeks = s.weeks || Array(8).fill({ done: false, note: "" });

  function updateWeek(i, field, val) {
    const newWeeks = weeks.map((w, idx) => idx === i ? { ...w, [field]: val } : w);
    onChange({ ...s, weeks: newWeeks });
  }

  const doneCount = weeks.filter(w => w.done).length;

  return (
    <div>
      <Intro emoji="📅" title="התחייבות קבועה"
        desc="ההתנדבות הפכה להתחייבות. 8 שבועות של נוכחות קבועה — כי אנשים שם מצפים לך. זה לא רשות, זו אחריות." />

      <div style={{ padding: "16px 20px", borderRadius: 14, marginBottom: 20, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
          <svg viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
            <circle cx={32} cy={32} r={26} fill="none" stroke="#e5e7eb" strokeWidth={6} />
            <circle cx={32} cy={32} r={26} fill="none" stroke="#7c3aed" strokeWidth={6}
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={2 * Math.PI * 26 * (1 - doneCount / 8)}
              strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s ease" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#1e1b4b", fontWeight: 700, fontSize: 16 }}>{doneCount}/8</span>
          </div>
        </div>
        <div>
          <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 16, margin: "0 0 4px" }}>{doneCount} שבועות הושלמו</p>
          <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>
            {doneCount === 0 ? "התחל לסמן כל שבוע שהגעת" : doneCount === 8 ? "🎉 השלמת את כל ההתחייבות!" : `עוד ${8 - doneCount} שבועות`}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {weeks.map((week, i) => (
          <div key={i} style={{
            padding: "12px 16px", borderRadius: 12,
            background: week.done ? "rgba(16,185,129,0.08)" : "#fafafa",
            border: week.done ? "1px solid rgba(16,185,129,0.25)" : "1px solid #e5e7eb",
            display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s"
          }}>
            <button onClick={() => updateWeek(i, "done", !week.done)} style={{
              width: 28, height: 28, borderRadius: 8, flexShrink: 0, cursor: "pointer",
              background: week.done ? "#10b981" : "transparent",
              border: week.done ? "none" : "1.5px solid #d1d5db",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: "#1e1b4b"
            }}>{week.done ? "✓" : ""}</button>
            <span style={{ color: "#6b7280", fontSize: 13, width: 60, flexShrink: 0 }}>שבוע {i + 1}</span>
            <input value={week.note || ""} onChange={e => updateWeek(i, "note", e.target.value)}
              placeholder="מה עשית הפעם?"
              style={{ flex: 1, padding: "6px 10px", borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 12, outline: "none", direction: "rtl" }} />
          </div>
        ))}
      </div>

      <ReflectionSection
        questions={["מה הדבר שהכי השפיע עליך בהתנדבות הזו?", "האם תמשיך אחרי 8 השבועות? למה?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

// ─── T17: בחירת יעד פיזי ─────────────────────────────────────────────────────
export function T17_PhysicalGoal({ state, onChange }) {
  const s = state || {};
  const goals = [
    { id: "run5k", icon: "🏃", title: "ריצה 5 ק\"מ", desc: "ליצור בסיס כושר ולגמור 5 ק\"מ ברציפות" },
    { id: "bike30", icon: "🚴", title: "רכיבה 30 ק\"מ", desc: "מסלול רכיבה מאתגר בלי לעצור" },
    { id: "hike10", icon: "🥾", title: "טיול הרים 10 ק\"מ", desc: "מסלול הרים עם עלייה משמעותית" },
    { id: "swim1k", icon: "🏊", title: "שחייה 1 ק\"מ", desc: "40 קולות בבריכה ללא הפסקה" },
    { id: "custom", icon: "⚡", title: "יעד אחר (שלי)", desc: "בחר יעד פיזי משלך" },
  ];

  return (
    <div>
      <Intro emoji="🎯" title="בחירת אתגר פיזי"
        desc="הגוף שלך יכול יותר ממה שאתה חושב. הבחירה כאן היא לא מה קל — אלא מה ידחוף אותך לגדול." />

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {goals.map(g => (
          <button key={g.id} onClick={() => onChange({ ...s, goalId: g.id })} style={{
            padding: "14px 16px", borderRadius: 14, textAlign: "right",
            background: s.goalId === g.id ? "rgba(124,58,237,0.1)" : "#ffffff",
            border: s.goalId === g.id ? "2px solid #7c3aed" : "1px solid #e5e7eb",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s"
          }}>
            <span style={{ fontSize: 28 }}>{g.icon}</span>
            <div style={{ flex: 1, textAlign: "right" }}>
              <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 15, margin: "0 0 3px" }}>{g.title}</p>
              <p style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>{g.desc}</p>
            </div>
            {s.goalId === g.id && <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e1b4b", fontSize: 13, flexShrink: 0 }}>✓</div>}
          </button>
        ))}
      </div>

      {s.goalId === "custom" && (
        <Card style={{ marginBottom: 14 }}>
          <Label>מה היעד שלך?</Label>
          <TextInput value={s.customGoal || ""} onChange={v => onChange({ ...s, customGoal: v })} placeholder="היעד שלי הוא..." />
        </Card>
      )}

      {s.goalId && (
        <>
          <Card style={{ marginBottom: 12 }}>
            <Label>מדוע בחרת דווקא בזה?</Label>
            <TextInput multiline value={s.why || ""} onChange={v => onChange({ ...s, why: v })} placeholder="בחרתי בזה כי זה..." />
          </Card>
          <Card>
            <Label>תאריך יעד — מתי תסיים?</Label>
            <TextInput value={s.deadline || ""} onChange={v => onChange({ ...s, deadline: v })} placeholder="לדוגמה: 15.5.2027" />
          </Card>
        </>
      )}
    </div>
  );
}

// ─── T18: תכנית אימון ────────────────────────────────────────────────────────
export function T18_TrainingPlan({ state, onChange }) {
  const s = state || {};
  const weeks = s.plan || Array(8).fill(null).map((_, i) => ({
    week: i + 1, sessions: "", distance: "", notes: "", done: false
  }));

  function updateWeek(i, field, val) {
    const newPlan = weeks.map((w, idx) => idx === i ? { ...w, [field]: val } : w);
    onChange({ ...s, plan: newPlan });
  }

  const doneWeeks = weeks.filter(w => w.done).length;

  return (
    <div>
      <Intro emoji="📋" title="תכנית אימון"
        desc="יעד בלי תכנית הוא רק חלום. כאן אתה בונה — שבוע אחר שבוע — את הדרך ליעד." />

      <div style={{ marginBottom: 16, padding: "14px 18px", borderRadius: 14, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <p style={{ color: "#7c3aed", fontWeight: 600, margin: "0 0 4px", fontSize: 14 }}>היעד שלי: <span style={{ color: "#1e1b4b" }}>{s.goalName || "טרם נקבע"}</span></p>
        <TextInput value={s.goalName || ""} onChange={v => onChange({ ...s, goalName: v })} placeholder="כתוב כאן את היעד שלך מהמשימה הקודמת..." />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {weeks.map((week, i) => (
          <div key={i} style={{
            borderRadius: 14, overflow: "hidden",
            border: week.done ? "1px solid rgba(16,185,129,0.3)" : "1px solid #e5e7eb",
            background: week.done ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.02)"
          }}>
            <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => updateWeek(i, "done", !week.done)} style={{
                width: 26, height: 26, borderRadius: 6, flexShrink: 0, cursor: "pointer",
                background: week.done ? "#10b981" : "transparent",
                border: week.done ? "none" : "1.5px solid #d1d5db",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#1e1b4b", fontSize: 13
              }}>{week.done ? "✓" : ""}</button>
              <p style={{ color: week.done ? "#6ee7b7" : "#fff", fontWeight: 600, fontSize: 14, margin: 0, flex: 1 }}>שבוע {week.week}</p>
            </div>
            <div style={{ padding: "0 16px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <p style={{ color: "#9ca3af", fontSize: 11, margin: "0 0 4px" }}>מספר אימונים</p>
                <input value={week.sessions || ""} onChange={e => updateWeek(i, "sessions", e.target.value)}
                  placeholder="x פעמים" style={{ width: "100%", padding: "7px 10px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 12, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <p style={{ color: "#9ca3af", fontSize: 11, margin: "0 0 4px" }}>מרחק / כמות</p>
                <input value={week.distance || ""} onChange={e => updateWeek(i, "distance", e.target.value)}
                  placeholder="ק״מ / דקות" style={{ width: "100%", padding: "7px 10px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 12, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <input value={week.notes || ""} onChange={e => updateWeek(i, "notes", e.target.value)}
                  placeholder="הערות לשבוע זה..." style={{ width: "100%", padding: "7px 10px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 12, outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── T19: עמידה ביעד ─────────────────────────────────────────────────────────
export function T19_AchieveGoal({ state, onChange }) {
  const s = state || {};

  return (
    <div>
      <Intro emoji="🏆" title="עמידה ביעד"
        desc="הגעת ליום הגדול. לא חשוב אם היה מושלם — חשוב שעשית את זה. עכשיו — לתעד." />

      <Card style={{ border: "1px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.07)", marginBottom: 14 }}>
        <Label>📸 תאר את הרגע</Label>
        <TextInput multiline value={s.moment || ""} onChange={v => onChange({ ...s, moment: v })}
          placeholder="כשסיימתי הרגשתי... הייתי ב... זה לקח לי..." />
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <Label>מה היה הקטע הכי קשה?</Label>
        <TextInput multiline value={s.hardest || ""} onChange={v => onChange({ ...s, hardest: v })}
          placeholder="הרגע שרציתי לוותר היה כש..." />
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <Label>מה עזר לך להמשיך?</Label>
        <TextInput multiline value={s.helped || ""} onChange={v => onChange({ ...s, helped: v })}
          placeholder="מה שעזר לי היה..." />
      </Card>

      <Card style={{ border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)" }}>
        <Label>⭐ מה הוכחת לעצמך?</Label>
        <TextInput multiline value={s.proved || ""} onChange={v => onChange({ ...s, proved: v })}
          placeholder="הוכחתי לעצמי שאני יכול..." />
      </Card>
    </div>
  );
}

// ─── T20–T23: נסיעה עצמאית ──────────────────────────────────────────────────
export function T20_PlanRoute({ state, onChange }) {
  const s = state || {};
  const legs = s.legs || [];

  function addLeg() {
    onChange({ ...s, legs: [...legs, { from: "", to: "", line: "", time: "" }] });
  }
  function updateLeg(i, field, val) {
    onChange({ ...s, legs: legs.map((l, idx) => idx === i ? { ...l, [field]: val } : l) });
  }

  return (
    <div>
      <Intro emoji="🗺️" title="תכנון מסלול עצמאי"
        desc="כל נסיעה מתחילה בתכנון. אתה בוחר יעד, מבין איך להגיע, ומתכנן את כל הקטעים — לבד." />

      <Card style={{ marginBottom: 14 }}>
        <Label>לאן תיסע?</Label>
        <TextInput value={s.destination || ""} onChange={v => onChange({ ...s, destination: v })} placeholder="היעד שלי הוא..." />
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Label style={{ margin: 0 }}>קטעי הנסיעה</Label>
          <button onClick={addLeg} style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.5)", color: "#7c3aed", fontSize: 12, cursor: "pointer" }}>+ קטע</button>
        </div>
        {legs.map((leg, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px", gap: 8, marginBottom: 8 }}>
            {[["from", "מ..."], ["to", "ל..."], ["line", "קו/רכבת"], ["time", "שעה"]].map(([field, ph]) => (
              <input key={field} value={leg[field] || ""} onChange={e => updateLeg(i, field, e.target.value)}
                placeholder={ph} style={{ padding: "8px 10px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 12, outline: "none" }} />
            ))}
          </div>
        ))}
        {legs.length === 0 && <p style={{ color: "#d1d5db", fontSize: 13, textAlign: "center", padding: 16 }}>הוסף קטעי נסיעה</p>}
      </Card>

      <Card>
        <Label>מה אתה מתכנן לעשות שם?</Label>
        <TextInput multiline value={s.plan || ""} onChange={v => onChange({ ...s, plan: v })} placeholder="אני מתכנן ל..." />
      </Card>
    </div>
  );
}

export function T21_TakeTrip({ state, onChange }) {
  const s = state || {};
  return (
    <div>
      <Intro emoji="🚌" title="נסיעה עצמאית"
        desc="היום יוצאים. ממה שתכננת — לעשות. אתה מנווט, אתה מחליט, אתה מוביל." />
      <Card style={{ marginBottom: 14 }}>
        <Label>האם הנסיעה הצליחה כמו שתכננת?</Label>
        <div style={{ display: "flex", gap: 10 }}>
          {["כן, הכל לפי התכנית", "כמעט — היו שינויים קטנים", "לא — נאלצתי לאלתר"].map(opt => (
            <button key={opt} onClick={() => onChange({ ...s, success: opt })} style={{
              flex: 1, padding: "10px 8px", borderRadius: 10, fontSize: 12, cursor: "pointer",
              background: s.success === opt ? "rgba(124,58,237,0.15)" : "#f9fafb",
              border: s.success === opt ? "1.5px solid #7c3aed" : "1px solid #e5e7eb",
              color: s.success === opt ? "#e9d5ff" : "rgba(255,255,255,0.6)", lineHeight: 1.4
            }}>{opt}</button>
          ))}
        </div>
      </Card>
      <Card style={{ marginBottom: 14 }}>
        <Label>מה היה הרגע הכי מאתגר?</Label>
        <TextInput multiline value={s.challenge || ""} onChange={v => onChange({ ...s, challenge: v })} placeholder="הרגע הכי קשה היה כש..." />
      </Card>
      <ReflectionSection
        questions={["איך הרגשת כשהגעת ליעד לבד?", "מה תעשה אחרת בפעם הבאה?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

export function T22_TripBudget({ state, onChange }) {
  const s = state || {};
  const items = s.items || [];
  function addItem() { onChange({ ...s, items: [...items, { what: "", amount: "" }] }); }
  function updateItem(i, field, val) { onChange({ ...s, items: items.map((it, idx) => idx === i ? { ...it, [field]: val } : it) }); }
  const total = items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);

  return (
    <div>
      <Intro emoji="💸" title="ניהול תקציב יומי"
        desc="כל הוצאה ביום הזה מתועדת. לא כדי לחסוך — כדי להבין כמה עולה יום עצמאי בעולם." />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <Label style={{ margin: 0 }}>הוצאות היום</Label>
          <button onClick={addItem} style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.5)", color: "#7c3aed", fontSize: 12, cursor: "pointer" }}>+ הוצאה</button>
        </div>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <input value={it.what || ""} onChange={e => updateItem(i, "what", e.target.value)} placeholder="על מה?" style={{ flex: 1, padding: "8px 10px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 13, outline: "none" }} />
            <input value={it.amount || ""} onChange={e => updateItem(i, "amount", e.target.value)} placeholder="₪" type="number" style={{ width: 70, padding: "8px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 13, outline: "none" }} />
          </div>
        ))}
        {total > 0 && (
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>
            <span style={{ color: "#7c3aed", fontWeight: 700 }}>סה״כ: ₪{total}</span>
          </div>
        )}
      </Card>
      <Card style={{ marginTop: 14 }}>
        <Label>האם תכנון התקציב שלך היה מדויק?</Label>
        <TextInput multiline value={s.review || ""} onChange={v => onChange({ ...s, review: v })} placeholder="ציפיתי לבזבז... בפועל בזבזתי... כי..." />
      </Card>
    </div>
  );
}

export function T23_TripReport({ state, onChange }) {
  const s = state || {};
  return (
    <div>
      <Intro emoji="📝" title="דיווח מסכם"
        desc="הנסיעה הסתיימה. עכשיו אתה כותב את הסיפור שלה — לא בשביל ההורים, בשבילך." />
      <Card style={{ marginBottom: 14, border: "1px solid rgba(234,179,8,0.2)", background: "rgba(234,179,8,0.05)" }}>
        <Label>⭐ הרגע הטוב ביותר של היום</Label>
        <TextInput multiline value={s.best || ""} onChange={v => onChange({ ...s, best: v })} placeholder="הרגע שהכי זכרתי היה..." />
      </Card>
      <Card style={{ marginBottom: 14 }}>
        <Label>מה הוכחת לעצמך היום?</Label>
        <TextInput multiline value={s.proved || ""} onChange={v => onChange({ ...s, proved: v })} placeholder="הוכחתי שאני יכול..." />
      </Card>
      <Card style={{ border: "1px solid rgba(124,58,237,0.25)" }}>
        <Label>דרגה את העצמאות שלך היום (1–10)</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input type="range" min={1} max={10} value={s.independenceScore || 7}
            onChange={e => onChange({ ...s, independenceScore: Number(e.target.value) })}
            style={{ flex: 1, accentColor: "#7c3aed" }} />
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(124,58,237,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 700, fontSize: 18 }}>
            {s.independenceScore || 7}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Chapter 2 Climax ─────────────────────────────────────────────────────────
export function Ch2Climax({ state, onChange, isParent, onApprove }) {
  const s = state || {};
  return (
    <div>
      <Intro emoji="🧭" title="נסיעה משותפת — עידו מוביל"
        desc="אירוע השיא של הפרק — נסיעה משפחתית שלמה שבה עידו הוא המוביל הבלעדי. הוא מחליט לאן, מנווט איך, ומנהל את הזמן." />
      {!isParent && (
        <Card style={{ marginBottom: 14 }}>
          <Label>תכנן את הנסיעה המשפחתית</Label>
          <TextInput multiline value={s.tripPlan || ""} onChange={v => onChange({ ...s, tripPlan: v })}
            placeholder="אני מתכנן לקחת את המשפחה ל... נסיע ב... נעשה שם... זה יעלה בערך..." />
          <button onClick={() => onChange({ ...s, idoReady: true })} style={{
            marginTop: 12, padding: "11px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer",
            background: s.idoReady ? "rgba(16,185,129,0.2)" : "linear-gradient(135deg, #7c3aed, #a855f7)",
            border: s.idoReady ? "1px solid rgba(16,185,129,0.4)" : "none", color: "#1e1b4b"
          }}>{s.idoReady ? "✓ מוכן!" : "סיימתי לתכנן — מוכן!"}</button>
        </Card>
      )}
      {isParent && (
        <Card style={{ border: "1px solid rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.05)" }}>
          <Label>✅ אישור הורים לפתיחת פרק 3</Label>
          {s.idoReady && !s.parentApproved && (
            <>
              <TextInput multiline value={s.note || ""} onChange={v => onChange({ ...s, note: v })} placeholder="כמה מילים על הנסיעה..." />
              <button onClick={() => { onChange({ ...s, parentApproved: true }); onApprove && onApprove(); }} style={{ marginTop: 12, width: "100%", padding: "12px", borderRadius: 12, fontSize: 15, fontWeight: 600, background: "linear-gradient(135deg, #10b981, #059669)", border: "none", color: "#1e1b4b", cursor: "pointer" }}>
                ✅ אישור — פתח פרק 3!
              </button>
            </>
          )}
          {s.parentApproved && <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(16,185,129,0.15)" }}><span style={{ color: "#059669", fontWeight: 600 }}>✓ פרק 3 נפתח!</span></div>}
          {!s.idoReady && <p style={{ color: "#6b7280", fontSize: 14 }}>ממתין לעידו שיסיים לתכנן...</p>}
        </Card>
      )}
    </div>
  );
}

// ─── Chapter 2 Monthly Quizzes (VISUAL & INTERACTIVE) ────────────────────────

// Quiz M5: רגשות וחוסן — Emotion Wheel + Scenario Simulator
export function QuizM5({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  const emotionCategories = [
    { name: "כעס", color: "#ef4444", emotions: ["עצבני", "מתוסכל", "נעלב", "קנאי"] },
    { name: "פחד", color: "#f97316", emotions: ["חרד", "לחוץ", "מבולבל", "נבוך"] },
    { name: "עצב", color: "#3b82f6", emotions: ["מאוכזב", "בודד", "עייף", "חסר אנרגיה"] },
    { name: "שמחה", color: "#10b981", emotions: ["נרגש", "גאה", "אסיר תודה", "אוהב"] },
    { name: "שלווה", color: "#8b5cf6", emotions: ["רגוע", "ממוקד", "בטוח", "חזק"] },
  ];

  const scenarios = [
    { id: "s1", text: "חבר לא הזמין אותך לאירוע שכל השאר הלכו אליו.", options: [{ t: "מתעלם ומתנשא", v: "avoid" }, { t: "שואל אותו ישירות", v: "direct" }, { t: "כועס בשקט וסופר טינה", v: "passive" }], best: "direct", explain: { avoid: "הימנעות לא פותרת — הכעס נשאר.", direct: "דיוק! שאלה ישירה פותחת שיחה ומונעת אי-הבנות.", passive: "טינה שקטה מצטברת ופוגעת בחברות." } },
    { id: "s2", text: "נכשלת במבחן חשוב למרות שלמדת קשה.", options: [{ t: "מאשים את המורה", v: "blame" }, { t: "מבין מה הלך עלי ומתכנן אחרת", v: "learn" }, { t: "מוותר על הנושא לגמרי", v: "quit" }], best: "learn", explain: { blame: "האשמת אחרים לא עוזרת לגדול.", learn: "בדיוק! כישלון הוא מידע — לא עונש.", quit: "הנסיגה בדרך כלל מגיעה בנקודה שממנה יש לאן לגדול." } },
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🌊</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>משחקון רגשות וחוסן</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>גלגל הרגשות • סימולטור תגובות</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {[{ icon: "🎡", title: "גלגל רגשות", desc: "בחר רגשות שחווית החודש" }, { icon: "🎭", title: "סימולטור תגובות", desc: "איך היית מגיב במצבים אמיתיים?" }].map(item => (
          <div key={item.icon} style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 14, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <span style={{ fontSize: 28 }}>{item.icon}</span>
            <div><p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14, margin: "0 0 2px" }}>{item.title}</p><p style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>{item.desc}</p></div>
          </div>
        ))}
      </div>
      <button onClick={() => onChange({ ...s, step: "wheel" })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>מתחילים! 🎡</button>
    </div>
  );

  if (step === "wheel") {
    const selected = s.selectedEmotions || [];
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>🎡 אילו רגשות חווית החודש?</p>
        <p style={{ color: "#9ca3af", fontSize: 12, textAlign: "center", marginBottom: 20 }}>בחר כמה שרוצה</p>
        {emotionCategories.map(cat => (
          <div key={cat.name} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
              <span style={{ color: cat.color, fontWeight: 600, fontSize: 13 }}>{cat.name}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {cat.emotions.map(em => {
                const isSel = selected.includes(em);
                return (
                  <button key={em} onClick={() => {
                    const next = isSel ? selected.filter(e => e !== em) : [...selected, em];
                    onChange({ ...s, selectedEmotions: next });
                  }} style={{
                    padding: "8px 16px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                    background: isSel ? `${cat.color}30` : "#f9fafb",
                    border: isSel ? `1.5px solid ${cat.color}` : "1px solid #e5e7eb",
                    color: isSel ? "#fff" : "rgba(255,255,255,0.6)", transition: "all 0.15s"
                  }}>{isSel ? "✓ " : ""}{em}</button>
                );
              })}
            </div>
          </div>
        ))}
        {selected.length > 0 && (
          <button onClick={() => onChange({ ...s, step: "scenario", scenarioIdx: 0 })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>
            בחרתי {selected.length} רגשות — קדימה! →
          </button>
        )}
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
          {scenarios.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= idx ? "#7c3aed" : "#e5e7eb" }} />
          ))}
        </div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14, textAlign: "center", marginBottom: 16 }}>🎭 איך היית מגיב?</p>
        <div style={{ padding: 20, borderRadius: 16, background: "#ffffff", border: "1px solid #e5e7eb", marginBottom: 16 }}>
          <p style={{ color: "#1e1b4b", fontSize: 16, lineHeight: 1.7, margin: 0, textAlign: "center" }}>{sc.text}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: answered ? 16 : 0 }}>
          {sc.options.map(opt => {
            const isSel = answered === opt.v;
            const isBest = opt.v === sc.best;
            let bg = "#ffffff";
            let border = "1px solid #e5e7eb";
            let color = "#fff";
            if (answered) {
              if (isBest) { bg = "rgba(16,185,129,0.15)"; border = "1px solid rgba(16,185,129,0.4)"; color = "#6ee7b7"; }
              else if (isSel) { bg = "rgba(239,68,68,0.1)"; border = "1px solid rgba(239,68,68,0.3)"; color = "#fca5a5"; }
            }
            return (
              <button key={opt.v} onClick={() => !answered && onChange({ ...s, scenarioAnswers: { ...(s.scenarioAnswers || {}), [sc.id]: opt.v } })} style={{ padding: "14px 16px", borderRadius: 12, textAlign: "right", background: bg, border, color, fontSize: 14, cursor: answered ? "default" : "pointer", lineHeight: 1.5 }}>
                {answered && isBest && "✓ "}{opt.t}
              </button>
            );
          })}
        </div>
        {answered && (
          <>
            <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", marginBottom: 14 }}>
              <p style={{ color: "#059669", fontWeight: 600, fontSize: 13, margin: "0 0 4px" }}>💬 מה חושבים על זה?</p>
              <p style={{ color: "#4b5563", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{sc.explain[answered]}</p>
            </div>
            <button onClick={() => {
              if (idx < scenarios.length - 1) onChange({ ...s, scenarioIdx: idx + 1 });
              else onChange({ ...s, step: "result" });
            }} style={{ width: "100%", padding: "13px", borderRadius: 12, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              {idx < scenarios.length - 1 ? "תרחיש הבא →" : "לתוצאות →"}
            </button>
          </>
        )}
      </div>
    );
  }

  if (step === "result") {
    const selected = s.selectedEmotions || [];
    const answers = s.scenarioAnswers || {};
    const correctCount = scenarios.filter(sc => answers[sc.id] === sc.best).length;
    return (
      <div>
        <div style={{ textAlign: "center", padding: "28px 0 20px" }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>{correctCount === 2 ? "🌟" : correctCount === 1 ? "👍" : "💪"}</div>
          <p style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>{correctCount}/2 תגובות מיטביות</p>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>בחרת {selected.length} רגשות שחווית החודש</p>
        </div>
        <div style={{ padding: 20, borderRadius: 16, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.25)", marginBottom: 20 }}>
          <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14, margin: "0 0 10px" }}>הרגשות שלך החודש:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {selected.map(em => {
              const cat = emotionCategories.find(c => c.emotions.includes(em));
              return <span key={em} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 13, background: `${cat?.color || "#7c3aed"}20`, border: `1px solid ${cat?.color || "#7c3aed"}50`, color: cat?.color || "#c4b5fd" }}>{em}</span>;
            })}
          </div>
        </div>
        <div style={{ padding: 18, borderRadius: 14, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <Label>💭 תובנה אחת מהחודש</Label>
          <TextInput multiline value={s.insight || ""} onChange={v => onChange({ ...s, insight: v })} placeholder="החודש הזה לימד אותי שהרגשות שלי..." />
        </div>
      </div>
    );
  }
  return null;
}

// Quiz M6: קהילה ותרומה — Impact Map
export function QuizM6({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  const impactAreas = [
    { id: "people", icon: "👥", title: "אנשים", q: "כמה אנשים הושפעו מהתנדבותך?" },
    { id: "hours", icon: "⏰", title: "שעות", q: "כמה שעות נתת?" },
    { id: "skill", icon: "🎯", title: "מיומנות", q: "מה מיומנות חדשה שפיתחת?" },
    { id: "change", icon: "✨", title: "שינוי", q: "מה השינוי הכי גדול שיצרת?" },
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🗺️</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>מפת השפעה</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>כמה השפעה יצרת? בוא נמדוד.</p>
      </div>
      <button onClick={() => onChange({ ...s, step: "map" })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>בוא נמדוד את ההשפעה שלך →</button>
    </div>
  );

  if (step === "map") {
    const answers = s.mapAnswers || {};
    const allDone = impactAreas.every(a => answers[a.id]);
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>🗺️ מפת ההשפעה שלך</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {impactAreas.map(area => (
            <div key={area.id} style={{ padding: 16, borderRadius: 14, background: answers[area.id] ? "rgba(124,58,237,0.15)" : "#ffffff", border: answers[area.id] ? "1.5px solid rgba(124,58,237,0.4)" : "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{area.icon}</div>
              <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 13, margin: "0 0 8px" }}>{area.title}</p>
              <p style={{ color: "#6b7280", fontSize: 11, margin: "0 0 8px" }}>{area.q}</p>
              <input value={answers[area.id] || ""} onChange={e => onChange({ ...s, mapAnswers: { ...answers, [area.id]: e.target.value } })}
                placeholder="הכנס תשובה..." style={{ width: "100%", padding: "8px 10px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 12, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        {allDone && (
          <button onClick={() => onChange({ ...s, step: "dilemma" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>מעולה! לשלב הבא →</button>
        )}
      </div>
    );
  }

  if (step === "dilemma") {
    const answered = s.dilemmaAnswer;
    const options = [
      { v: "feel", t: "כדי להרגיש טוב עם עצמי" },
      { v: "social", t: "כי חברים שלי עשו" },
      { v: "change", t: "כי רציתי לעשות שינוי אמיתי" },
      { v: "learn", t: "כדי ללמוד משהו חדש" },
    ];
    const feedback = {
      feel: "תחושה טובה היא תוצאה נהדרת! אבל כשהמוטיבציה היא פנימית — ההשפעה עמוקה יותר.",
      social: "להתנדב עם חברים זה כיף — אבל מה יקרה כשהם יפסיקו?",
      change: "זו הסיבה הכי חזקה! כשמאמינים בשינוי — ממשיכים גם כשקשה.",
      learn: "סקרנות ולמידה הן מנועים מעולים לתרומה.",
    };
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>🤔 מה גרם לך להתנדב?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: answered ? 16 : 0 }}>
          {options.map(opt => {
            const isSel = answered === opt.v;
            return (
              <button key={opt.v} onClick={() => !answered && onChange({ ...s, dilemmaAnswer: opt.v })} style={{
                padding: "14px 16px", borderRadius: 12, textAlign: "right",
                background: isSel ? "rgba(124,58,237,0.25)" : "#ffffff",
                border: isSel ? "1.5px solid #7c3aed" : "1px solid #e5e7eb",
                color: isSel ? "#e9d5ff" : "#fff", fontSize: 14, cursor: answered ? "default" : "pointer"
              }}>{opt.t}</button>
            );
          })}
        </div>
        {answered && (
          <>
            <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", marginBottom: 14 }}>
              <p style={{ color: "#059669", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{feedback[answered]}</p>
            </div>
            <button onClick={() => onChange({ ...s, step: "result" })} style={{ width: "100%", padding: "13px", borderRadius: 12, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>לתוצאות →</button>
          </>
        )}
      </div>
    );
  }

  if (step === "result") {
    const answers = s.mapAnswers || {};
    return (
      <div>
        <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>🌟</div>
          <p style={{ color: "#1e1b4b", fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>מפת ההשפעה שלך</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {impactAreas.map(area => (
            <div key={area.id} style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{area.icon}</div>
              <p style={{ color: "#7c3aed", fontSize: 12, margin: "0 0 4px" }}>{area.title}</p>
              <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 14, margin: 0 }}>{answers[area.id] || "—"}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: 18, borderRadius: 14, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <Label>אם היית ממשיך להתנדב שנה שלמה — מה ההשפעה שהיית יוצר?</Label>
          <TextInput multiline value={s.future || ""} onChange={v => onChange({ ...s, future: v })} placeholder="אם הייתי ממשיך..." />
        </div>
      </div>
    );
  }
  return null;
}

// Quiz M7: אתגר פיזי — Training Tracker + Mind Game
export function QuizM7({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  const mindBlocks = [
    { id: "b1", block: "אני לא מספיק טוב לזה", reframe: "אני בדיוק בנקודה שממנה מתחילים לגדול" },
    { id: "b2", block: "זה כואב, עדיף לעצור", reframe: "אי-נוחות זמנית מובילה לשינוי קבוע" },
    { id: "b3", block: "לא רואה התקדמות", reframe: "גדילה אטית היא עדיין גדילה" },
    { id: "b4", block: "לא בא לי היום", reframe: "הפעם שלא בא לך היא בדיוק הפעם שצריך" },
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>💪</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>משחקון כושר ומנטליות</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>מה הגוף שלך למד? מה הראש שלך למד?</p>
      </div>
      <button onClick={() => onChange({ ...s, step: "reframe" })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>בואו נבדוק! →</button>
    </div>
  );

  if (step === "reframe") {
    const flipped = s.flipped || {};
    const allFlipped = mindBlocks.every(b => flipped[b.id]);
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 8 }}>🔄 הפוך את החסימה</p>
        <p style={{ color: "#6b7280", fontSize: 13, textAlign: "center", marginBottom: 20 }}>לחץ על כל כרטיס לגלות איך לחשוב אחרת</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {mindBlocks.map(block => (
            <div key={block.id} onClick={() => onChange({ ...s, flipped: { ...flipped, [block.id]: true } })} style={{
              minHeight: 110, padding: 16, borderRadius: 14, cursor: "pointer",
              background: flipped[block.id] ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.08)",
              border: flipped[block.id] ? "1.5px solid rgba(16,185,129,0.35)" : "1px solid rgba(239,68,68,0.25)",
              display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center",
              transition: "all 0.3s"
            }}>
              <p style={{ fontSize: 20, margin: "0 0 8px" }}>{flipped[block.id] ? "✅" : "🚧"}</p>
              <p style={{ color: flipped[block.id] ? "#6ee7b7" : "#fca5a5", fontSize: 13, margin: 0, lineHeight: 1.5, fontWeight: flipped[block.id] ? 600 : 400 }}>
                {flipped[block.id] ? block.reframe : block.block}
              </p>
            </div>
          ))}
        </div>
        {allFlipped && (
          <button onClick={() => onChange({ ...s, step: "achievement" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>הבנתי! ממשיכים →</button>
        )}
      </div>
    );
  }

  if (step === "achievement") {
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>🏅 תעד את ההישג שלך</p>
        {[
          { key: "before", label: "לפני האימונים — מה לא יכולת לעשות?", ph: "לא יכולתי..." },
          { key: "after", label: "אחרי — מה עכשיו אתה יכול?", ph: "עכשיו אני יכול..." },
          { key: "moment", label: "הרגע שהכי גאה בו מהחודש הזה", ph: "הרגע הכי טוב היה כש..." },
        ].map(item => (
          <Card key={item.key} style={{ marginBottom: 14 }}>
            <Label>{item.label}</Label>
            <TextInput multiline value={s[item.key] || ""} onChange={v => onChange({ ...s, [item.key]: v })} placeholder={item.ph} />
          </Card>
        ))}
        {s.before && s.after && s.moment && (
          <button onClick={() => onChange({ ...s, step: "result" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>לתוצאות 🏆</button>
        )}
      </div>
    );
  }

  if (step === "result") return (
    <div>
      <div style={{ textAlign: "center", padding: "28px 0 20px" }}>
        <div style={{ fontSize: 64, marginBottom: 10 }}>🏆</div>
        <p style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>עשית את זה!</p>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>הגוף שלך הוכיח שהראש יכול להוביל</p>
      </div>
      <Card style={{ border: "1px solid rgba(234,179,8,0.3)", background: "rgba(234,179,8,0.07)", marginBottom: 16 }}>
        <p style={{ color: "#fbbf24", fontWeight: 600, fontSize: 14, margin: "0 0 10px" }}>לפני ← אחרי</p>
        <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 6px" }}>{s.before}</p>
        <p style={{ color: "#059669", fontSize: 14, fontWeight: 600, margin: 0 }}>↓ {s.after}</p>
      </Card>
      <Card style={{ border: "1px solid rgba(124,58,237,0.25)" }}>
        <Label>המשפט שתגיד לעצמך בפעם הבאה שיגיד לך "אי אפשר":</Label>
        <TextInput value={s.motto || ""} onChange={v => onChange({ ...s, motto: v })} placeholder="אני _____ ולכן אני יכול" />
      </Card>
    </div>
  );
  return null;
}

// Quiz M8: נסיעה עצמאית — Adventure Log
export function QuizM8({ state, onChange }) {
  const s = state || {};
  const step = s.step || "intro";

  const challenges = [
    { id: "c1", text: "איבדתי את הכיוון וצריך לשאול זרים" },
    { id: "c2", text: "הרכבת התעכבה בשעה שלמה" },
    { id: "c3", text: "נגמר לי הכסף באמצע היום" },
    { id: "c4", text: "פניתי לכיוון הלא נכון" },
  ];

  if (step === "intro") return (
    <div>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🗺️</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>יומן הרפתקאות</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>תיעוד, אתגרים, ואיך הגעת ליעד</p>
      </div>
      <button onClick={() => onChange({ ...s, step: "challenges" })} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>פתח את היומן →</button>
    </div>
  );

  if (step === "challenges") {
    const faced = s.faced || [];
    const solutions = s.solutions || {};
    const facedChallenges = challenges.filter(c => faced.includes(c.id));
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>⚡ אילו אתגרים פגשת בדרך?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {challenges.map(ch => {
            const isSel = faced.includes(ch.id);
            return (
              <div key={ch.id}>
                <button onClick={() => onChange({ ...s, faced: isSel ? faced.filter(f => f !== ch.id) : [...faced, ch.id] })} style={{
                  width: "100%", padding: "12px 16px", borderRadius: 12, textAlign: "right",
                  background: isSel ? "rgba(239,68,68,0.12)" : "#ffffff",
                  border: isSel ? "1.5px solid rgba(239,68,68,0.4)" : "1px solid #e5e7eb",
                  color: "#1e1b4b", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 12
                }}>
                  <span style={{ fontSize: 18 }}>{isSel ? "⚡" : "○"}</span> {ch.text}
                </button>
                {isSel && (
                  <div style={{ marginTop: 6, marginBottom: 4 }}>
                    <input value={solutions[ch.id] || ""} onChange={e => onChange({ ...s, solutions: { ...solutions, [ch.id]: e.target.value } })}
                      placeholder="איך התמודדת עם זה?" style={{ width: "100%", padding: "9px 12px", borderRadius: 10, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#1e1b4b", fontSize: 13, outline: "none", boxSizing: "border-box", marginTop: 4 }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Card style={{ marginBottom: 16, border: "1px solid rgba(234,179,8,0.2)" }}>
          <Label>💡 הרגע שהכי גאה בו מהנסיעה</Label>
          <TextInput multiline value={s.proudMoment || ""} onChange={v => onChange({ ...s, proudMoment: v })} placeholder="הרגע הכי טוב היה..." />
        </Card>
        {s.proudMoment && (
          <button onClick={() => onChange({ ...s, step: "rating" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>לדרג את הנסיעה →</button>
        )}
      </div>
    );
  }

  if (step === "rating") {
    const ratings = [
      { key: "navigation", label: "🧭 ניווט" },
      { key: "budget", label: "💰 ניהול תקציב" },
      { key: "decisions", label: "🎯 קבלת החלטות" },
      { key: "confidence", label: "💪 ביטחון עצמי" },
    ];
    const allRated = ratings.every(r => s[r.key]);
    return (
      <div>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 20 }}>⭐ דרג את עצמך</p>
        {ratings.map(r => (
          <Card key={r.key} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <Label style={{ margin: 0 }}>{r.label}</Label>
              <span style={{ color: "#7c3aed", fontWeight: 700, fontSize: 18 }}>{s[r.key] || "—"}</span>
            </div>
            <input type="range" min={1} max={10} value={s[r.key] || 5}
              onChange={e => onChange({ ...s, [r.key]: Number(e.target.value) })}
              style={{ width: "100%", accentColor: "#7c3aed" }} />
          </Card>
        ))}
        {allRated && (
          <button onClick={() => onChange({ ...s, step: "result" })} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>לתוצאות →</button>
        )}
      </div>
    );
  }

  if (step === "result") {
    const ratings = [
      { key: "navigation", label: "🧭 ניווט" },
      { key: "budget", label: "💰 תקציב" },
      { key: "decisions", label: "🎯 החלטות" },
      { key: "confidence", label: "💪 ביטחון" },
    ];
    const avg = Math.round(ratings.reduce((sum, r) => sum + (s[r.key] || 0), 0) / ratings.length);
    return (
      <div>
        <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>🗺️</div>
          <p style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>הנוסע העצמאי</p>
          <p style={{ color: "#7c3aed", fontSize: 16, margin: 0 }}>ממוצע: {avg}/10</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {ratings.map(r => (
            <div key={r.key} style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", textAlign: "center" }}>
              <p style={{ fontSize: 20, margin: "0 0 4px" }}>{r.label.split(" ")[0]}</p>
              <p style={{ color: "#7c3aed", fontSize: 12, margin: "0 0 6px" }}>{r.label.split(" ")[1]}</p>
              <div style={{ height: 6, borderRadius: 3, background: "#e5e7eb", margin: "0 0 6px" }}>
                <div style={{ height: "100%", borderRadius: 3, background: "#7c3aed", width: `${(s[r.key] || 0) * 10}%`, transition: "width 0.5s ease" }} />
              </div>
              <p style={{ color: "#1e1b4b", fontWeight: 700, fontSize: 16, margin: 0 }}>{s[r.key] || 0}</p>
            </div>
          ))}
        </div>
        <Card style={{ border: "1px solid rgba(16,185,129,0.25)" }}>
          <Label>מה היעד העצמאי הבא שלך?</Label>
          <TextInput value={s.nextGoal || ""} onChange={v => onChange({ ...s, nextGoal: v })} placeholder="הפעם הבאה שאלך לבד..." />
        </Card>
      </div>
    );
  }
  return null;
}
