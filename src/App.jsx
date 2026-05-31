import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const USERS = {
  ido: { name: "עידו", password: "ido2027", role: "kid" },
  parents: { name: "ההורים", password: "moran2027", role: "parent" },
};

const CHAPTERS = [
  {
    id: 1,
    emoji: "🌿",
    title: "שורשים וזהות",
    period: "מאי–אוגוסט 2026",
    question: "מי אני? מאיפה באתי? מה חשוב לי?",
    months: [
      {
        id: "m1", month: "מאי", title: "טקס פתיחה ומפת זהות",
        tasks: [
          { id: "t1", text: "טקס פתיחה משפחתי" },
          { id: "t2", text: "מפת ערכים אישית" },
          { id: "t3", text: "בחירת 5 ערכים מובילים לשנה" },
        ]
      },
      {
        id: "m2", month: "יוני", title: "אחריות בבית",
        tasks: [
          { id: "t4", text: "בחירת תחום אחריות קבוע" },
          { id: "t5", text: "סטנדרט ביצוע ברור" },
          { id: "t6", text: "שיחת משוב חודשית" },
        ]
      },
      {
        id: "m3", month: "יולי", title: "כסף וניהול עצמי",
        tasks: [
          { id: "t7", text: "דמי ניהול חודשיים" },
          { id: "t8", text: "טבלת הוצאות" },
          { id: "t9", text: "שיחה על צרכים מול רצונות" },
        ]
      },
      {
        id: "m4", month: "אוגוסט", title: "עצמאות יומיומית",
        tasks: [
          { id: "t10", text: "בישול ארוחה מלאה" },
          { id: "t11", text: "כביסה וניהול זמן" },
          { id: "t12", text: "תכנון יום משפחתי מלא" },
        ]
      },
    ],
    climax: 'ערב משפחתי שבו הוא מציג את "מי אני עכשיו"'
  },
  {
    id: 2,
    emoji: "🧭",
    title: "אחריות ועצמאות בעולם",
    period: "ספטמבר–דצמבר 2026",
    question: "איך אני מתנהל לבד? איך אני פועל מחוץ לבית?",
    months: [
      {
        id: "m5", month: "ספטמבר", title: "רגשות וחוסן",
        tasks: [
          { id: "t13", text: "יומן רגשי שבועי" },
          { id: "t14", text: "שיחה אמיצה על פחד/כעס" },
        ]
      },
      {
        id: "m6", month: "אוקטובר", title: "קהילה ותרומה",
        tasks: [
          { id: "t15", text: "בחירת פרויקט התנדבותי" },
          { id: "t16", text: "התחייבות קבועה" },
        ]
      },
      {
        id: "m7", month: "נובמבר", title: "אתגר פיזי",
        tasks: [
          { id: "t17", text: "בחירת יעד (ריצה / מסלול / רכיבה)" },
          { id: "t18", text: "תכנית אימון" },
          { id: "t19", text: "עמידה ביעד" },
        ]
      },
      {
        id: "m8", month: "דצמבר", title: 'נסיעה עצמאית בתחב"צ 🚍',
        tasks: [
          { id: "t20", text: "תכנון מסלול לבד" },
          { id: "t21", text: "נסיעה עצמאית ליעד מוסכם" },
          { id: "t22", text: "ניהול תקציב יומי" },
          { id: "t23", text: "דיווח מסכם" },
        ]
      },
    ],
    climax: "נסיעה משותפת — כשהוא המוביל הבלעדי"
  },
  {
    id: 3,
    emoji: "🔥",
    title: "מסע והתנסות אמיתית",
    period: "ינואר–אפריל 2027",
    question: "חיבור בין גוף, טבע ובגרות.",
    months: [
      {
        id: "m9", month: "ינואר", title: "מיומנות טכנית",
        tasks: [
          { id: "t24", text: "תיקון בבית" },
          { id: "t25", text: "שימוש בכלים בסיסיים" },
        ]
      },
      {
        id: "m10", month: "פברואר", title: "יום עצמאות מלא",
        tasks: [
          { id: "t26", text: "יציאה ליום שתכנן לגמרי לבד" },
          { id: "t27", text: "אחריות לזמנים ולכסף" },
        ]
      },
      {
        id: "m11", month: "מרץ", title: "מחנאות 🏕",
        tasks: [
          { id: "t28", text: "לימוד הדלקת גזיה / מדורה" },
          { id: "t29", text: "הקמת אוהל" },
          { id: "t30", text: "תכנון לינת שטח משפחתית קצרה" },
          { id: "t31", text: "אחריות על חלק מהציוד" },
        ]
      },
      {
        id: "m12", month: "אפריל", title: "תיק עתיד",
        tasks: [
          { id: "t32", text: "מיפוי חוזקות" },
          { id: "t33", text: "חלומות" },
          { id: "t34", text: "יעד שנתי ברור" },
        ]
      },
    ],
    climax: "לילה בטבע — עם שיחת עומק סביב מדורה על בגרות"
  },
  {
    id: 4,
    emoji: "🚀",
    title: "חזון והובלה אישית",
    period: "מאי–נובמבר 2027",
    question: "לאן אני לוקח את עצמי מכאן?",
    months: [
      {
        id: "m13", month: "מאי–אוגוסט", title: "פרויקט אישי משמעותי",
        tasks: [
          { id: "t35", text: "הגדרת פרויקט אישי" },
          { id: "t36", text: "יעד ברור + מדדי הצלחה" },
          { id: "t37", text: "ביצוע הפרויקט" },
        ]
      },
      {
        id: "m14", month: "ספטמבר–אוקטובר", title: "עיבוד המסע",
        tasks: [
          { id: "t38", text: "כתיבת נאום אישי" },
          { id: "t39", text: "בחירת 5 תובנות מהשנה" },
          { id: "t40", text: "מכתב לעצמי העתידי" },
        ]
      },
      {
        id: "m15", month: "נובמבר 2027", title: "טקס סיום",
        tasks: [
          { id: "t41", text: "הצגת המסע" },
          { id: "t42", text: "חתימה על אמנת בגרות מחודשת" },
        ]
      },
    ],
    climax: "הענקת סמל לאחריות וזמן"
  },
];

const ALL_TASKS = CHAPTERS.flatMap(c => c.months.flatMap(m => m.tasks));
const TOTAL_TASKS = ALL_TASKS.length;
const EMPTY_DATA = { completed: {}, journal: [], parentNotes: [], values: [] };

function useStorage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const { data: row } = await supabase
          .from("bar_mitzvah")
          .select("value")
          .eq("key", "ido-data")
          .single();
        setData(row?.value ?? EMPTY_DATA);
      } catch {
        setData(EMPTY_DATA);
      }
    }
    load();
  }, []);

  const save = useCallback(async (newData) => {
    setData(newData);
    await supabase
      .from("bar_mitzvah")
      .upsert({ key: "ido-data", value: newData });
  }, []);

  return [data, save];
}

function ProgressRing({ pct, size = 80, stroke = 7, color = "#7c3aed" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.6s ease" }} />
    </svg>
  );
}

function LoginScreen({ onLogin }) {
  const [user, setUser] = useState("ido");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  function handleLogin() {
    const u = USERS[user];
    if (u && pass === u.password) {
      onLogin(user, u);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      fontFamily: "'Segoe UI', Tahoma, sans-serif", direction: "rtl"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24,
        padding: "48px 40px", width: 340, textAlign: "center",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
      }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>🧭</div>
        <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>שנת בר מצווה</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: "0 0 32px" }}>להוביל את החיים</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["ido", "parents"].map(k => (
            <button key={k} onClick={() => setUser(k)} style={{
              flex: 1, padding: "10px", borderRadius: 12,
              border: user === k ? "2px solid #7c3aed" : "1px solid rgba(255,255,255,0.15)",
              background: user === k ? "rgba(124,58,237,0.2)" : "transparent",
              color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: user === k ? 600 : 400,
              transition: "all 0.2s"
            }}>
              {k === "ido" ? "👦 עידו" : "👩‍👩‍👦 הורים"}
            </button>
          ))}
        </div>

        <input
          type="password" placeholder="סיסמה"
          value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 12, boxSizing: "border-box",
            border: error ? "1.5px solid #ef4444" : "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.07)", color: "#fff", fontSize: 15,
            outline: "none", marginBottom: 12, textAlign: "right", transition: "border 0.2s"
          }}
        />
        <button onClick={handleLogin} style={{
          width: "100%", padding: "13px", borderRadius: 12,
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          border: "none", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer"
        }}>
          כניסה
        </button>
        {error && <p style={{ color: "#ef4444", fontSize: 13, marginTop: 10 }}>סיסמה שגויה</p>}
      </div>
    </div>
  );
}

function TasksView({ data, save, isParent }) {
  const [openChapter, setOpenChapter] = useState(1);

  function toggleTask(tid) {
    if (isParent) return;
    const newCompleted = { ...data.completed, [tid]: !data.completed[tid] };
    save({ ...data, completed: newCompleted });
  }

  const totalDone = ALL_TASKS.filter(t => data.completed[t.id]).length;
  const overallPct = Math.round((totalDone / TOTAL_TASKS) * 100);

  return (
    <div>
      <div style={{
        background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)",
        borderRadius: 20, padding: 24, marginBottom: 24, display: "flex", alignItems: "center", gap: 24
      }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <ProgressRing pct={overallPct} size={100} stroke={8} color="#a855f7" />
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>{overallPct}%</span>
          </div>
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.6)", margin: "0 0 4px", fontSize: 14 }}>התקדמות כוללת</p>
          <p style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>
            {totalDone} / {TOTAL_TASKS} משימות
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>
            {TOTAL_TASKS - totalDone} משימות נותרו במסע
          </p>
        </div>
      </div>

      {CHAPTERS.map((ch, chIdx) => {
        const chTasks = ch.months.flatMap(m => m.tasks);
        const chDone = chTasks.filter(t => data.completed[t.id]).length;
        const chPct = Math.round((chDone / chTasks.length) * 100);
        const isOpen = openChapter === ch.id;

        const prevCh = chIdx > 0 ? CHAPTERS[chIdx - 1] : null;
        const prevTasks = prevCh ? prevCh.months.flatMap(m => m.tasks) : [];
        const prevDone = prevTasks.filter(t => data.completed[t.id]).length;
        const isLocked = !isParent && chIdx > 0 && prevDone < prevTasks.length;

        return (
          <div key={ch.id} style={{
            marginBottom: 16,
            border: isLocked ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16, overflow: "hidden",
            background: isLocked ? "rgba(255,255,255,0.01)" : isOpen ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
            opacity: isLocked ? 0.5 : 1, transition: "opacity 0.3s"
          }}>
            <button onClick={() => !isLocked && setOpenChapter(isOpen ? null : ch.id)} style={{
              width: "100%", padding: "16px 20px", background: "none", border: "none",
              display: "flex", alignItems: "center", gap: 16,
              cursor: isLocked ? "not-allowed" : "pointer", textAlign: "right"
            }}>
              <span style={{ fontSize: 28 }}>{isLocked ? "🔒" : ch.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: isLocked ? "rgba(255,255,255,0.4)" : "#fff", fontWeight: 600, margin: "0 0 2px", fontSize: 16 }}>
                  {ch.title}
                </p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: 0 }}>
                  {isLocked ? `נפתח לאחר השלמת "${prevCh.title}"` : ch.period}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ textAlign: "left" }}>
                  {isLocked
                    ? <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 14 }}>נעול</span>
                    : <>
                        <span style={{ color: "#a855f7", fontWeight: 700, fontSize: 16 }}>{chPct}%</span>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0 }}>{chDone}/{chTasks.length}</p>
                      </>
                  }
                </div>
                {!isLocked && (
                  <span style={{
                    color: "rgba(255,255,255,0.4)", fontSize: 18,
                    transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s"
                  }}>▾</span>
                )}
              </div>
            </button>

            {isOpen && !isLocked && (
              <div style={{ padding: "0 20px 20px" }}>
                <p style={{
                  color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 16px",
                  borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16
                }}>
                  {ch.question}
                </p>
                {ch.months.map(m => (
                  <div key={m.id} style={{ marginBottom: 20 }}>
                    <p style={{ color: "#c4b5fd", fontWeight: 600, fontSize: 14, margin: "0 0 8px" }}>
                      {m.month} – {m.title}
                    </p>
                    {m.tasks.map(task => {
                      const done = !!data.completed[task.id];
                      return (
                        <div key={task.id} onClick={() => toggleTask(task.id)} style={{
                          display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                          borderRadius: 10, marginBottom: 6,
                          cursor: isParent ? "default" : "pointer",
                          background: done ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.03)",
                          border: done ? "1px solid rgba(124,58,237,0.25)" : "1px solid rgba(255,255,255,0.06)",
                          transition: "all 0.2s"
                        }}>
                          <div style={{
                            width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                            border: done ? "none" : "1.5px solid rgba(255,255,255,0.25)",
                            background: done ? "#7c3aed" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }}>
                            {done && <span style={{ color: "#fff", fontSize: 13 }}>✓</span>}
                          </div>
                          <span style={{
                            color: done ? "rgba(255,255,255,0.5)" : "#fff", fontSize: 14,
                            textDecoration: done ? "line-through" : "none", transition: "all 0.2s"
                          }}>{task.text}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div style={{
                  marginTop: 12, padding: "12px 16px", borderRadius: 12,
                  background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)"
                }}>
                  <span style={{ fontSize: 16 }}>🎯 </span>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
                    אירוע שיא: {ch.climax}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function JournalView({ data, save, isParent }) {
  const [entry, setEntry] = useState("");
  const [filter, setFilter] = useState("all");

  function addEntry() {
    if (!entry.trim()) return;
    const newEntry = {
      id: Date.now(), text: entry.trim(),
      date: new Date().toLocaleDateString("he-IL"),
      author: isParent ? "ההורים" : "עידו"
    };
    if (isParent) {
      save({ ...data, parentNotes: [...(data.parentNotes || []), newEntry] });
    } else {
      save({ ...data, journal: [...(data.journal || []), newEntry] });
    }
    setEntry("");
  }

  const allEntries = [...(data.journal || []), ...(data.parentNotes || [])];
  const displayed = filter === "all" ? allEntries
    : filter === "ido" ? (data.journal || [])
    : (data.parentNotes || []);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <textarea
          value={entry} onChange={e => setEntry(e.target.value)}
          placeholder={isParent ? "הוסיפו הערה או תצפית על עידו..." : "מה עבר עליך היום? מה למדת? מה הרגשת?"}
          style={{
            width: "100%", minHeight: 100, padding: "14px 16px", borderRadius: 14,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff", fontSize: 15, resize: "vertical", outline: "none",
            boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6, direction: "rtl"
          }}
        />
        <button onClick={addEntry} style={{
          marginTop: 10, padding: "11px 24px", borderRadius: 12,
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer"
        }}>
          הוסף כניסה
        </button>
      </div>

      {isParent && (
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[["all", "הכל"], ["ido", "של עידו"], ["parents", "שלנו"]].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{
              padding: "7px 16px", borderRadius: 10, fontSize: 13, cursor: "pointer",
              background: filter === k ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)",
              border: filter === k ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.1)",
              color: "#fff"
            }}>{l}</button>
          ))}
        </div>
      )}

      <div>
        {displayed.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: 40, fontSize: 15 }}>
            עדיין אין כניסות. התחל לכתוב!
          </p>
        )}
        {[...displayed].reverse().map(e => (
          <div key={e.id} style={{
            padding: "16px 20px", borderRadius: 14, marginBottom: 12,
            background: e.author === "ההורים" ? "rgba(16,185,129,0.07)" : "rgba(124,58,237,0.07)",
            border: e.author === "ההורים" ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(124,58,237,0.2)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{
                fontSize: 12, padding: "3px 10px", borderRadius: 20,
                background: e.author === "ההורים" ? "rgba(16,185,129,0.15)" : "rgba(124,58,237,0.15)",
                color: e.author === "ההורים" ? "#6ee7b7" : "#c4b5fd"
              }}>{e.author}</span>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{e.date}</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
              {e.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressView({ data }) {
  const colors = ["#7c3aed", "#0ea5e9", "#f59e0b", "#10b981"];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
        {CHAPTERS.map((ch, i) => {
          const tasks = ch.months.flatMap(m => m.tasks);
          const done = tasks.filter(t => data.completed[t.id]).length;
          const pct = Math.round((done / tasks.length) * 100);
          return (
            <div key={ch.id} style={{
              padding: 20, borderRadius: 16,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ fontSize: 28 }}>{ch.emoji}</span>
                <div style={{ position: "relative" }}>
                  <ProgressRing pct={pct} size={56} stroke={5} color={colors[i]} />
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{pct}%</span>
                  </div>
                </div>
              </div>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: 13, margin: "0 0 4px" }}>{ch.title}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: 0 }}>{done}/{tasks.length} משימות</p>
              <div style={{ marginTop: 12, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)" }}>
                <div style={{
                  height: "100%", borderRadius: 2, background: colors[i],
                  width: `${pct}%`, transition: "width 0.6s ease"
                }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        padding: 24, borderRadius: 16,
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)"
      }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 16px" }}>התקדמות כרונולוגית</p>
        {CHAPTERS.flatMap(ch => ch.months).map(m => {
          const done = m.tasks.filter(t => data.completed[t.id]).length;
          const pct = Math.round((done / m.tasks.length) * 100);
          const color = done === m.tasks.length ? "#10b981" : done > 0 ? "#7c3aed" : "rgba(255,255,255,0.15)";
          return (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, width: 100, flexShrink: 0, textAlign: "left" }}>
                {m.month}
              </span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
                <div style={{ height: "100%", borderRadius: 3, background: color, width: `${pct}%`, transition: "width 0.6s ease" }} />
              </div>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, width: 30, textAlign: "right" }}>
                {done}/{m.tasks.length}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ValuesView({ data, save }) {
  const [values, setValues] = useState(data.values || []);
  const [input, setInput] = useState("");

  function addValue() {
    if (!input.trim() || values.length >= 5) return;
    const newVals = [...values, input.trim()];
    setValues(newVals);
    save({ ...data, values: newVals });
    setInput("");
  }

  function removeValue(i) {
    const newVals = values.filter((_, idx) => idx !== i);
    setValues(newVals);
    save({ ...data, values: newVals });
  }

  return (
    <div>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
        בחר עד 5 ערכים שמנחים אותך השנה. אלו הדברים הכי חשובים לך — המצפן האישי שלך.
      </p>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addValue()}
          placeholder={values.length < 5 ? "ערך חדש..." : "בחרת 5 ערכים!"}
          disabled={values.length >= 5}
          style={{
            flex: 1, padding: "11px 16px", borderRadius: 12,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff", fontSize: 15, outline: "none", direction: "rtl"
          }} />
        <button onClick={addValue} disabled={values.length >= 5} style={{
          padding: "11px 20px", borderRadius: 12,
          background: "rgba(124,58,237,0.7)", border: "none", color: "#fff",
          cursor: values.length < 5 ? "pointer" : "not-allowed", fontSize: 15
        }}>+</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {values.map((v, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 18px",
            borderRadius: 30, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)"
          }}>
            <span style={{ color: "#e9d5ff", fontSize: 15, fontWeight: 500 }}>{v}</span>
            <button onClick={() => removeValue(i)} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.4)",
              cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0
            }}>×</button>
          </div>
        ))}
        {values.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>לא בחרת ערכים עדיין.</p>
        )}
      </div>
      {values.length === 5 && (
        <div style={{
          marginTop: 24, padding: 20, borderRadius: 14,
          background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)"
        }}>
          <p style={{ color: "#fbbf24", fontWeight: 600, margin: 0 }}>✨ המצפן שלך לשנה הזו</p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: "8px 0 0" }}>
            {values.join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}

function ManifestoView() {
  const commitments = [
    "אני מתחייב לקחת אחריות אמיתית על תפקיד קבוע בבית.",
    "אני מתחייב לנהל תקציב אישי וללמוד על כסף.",
    "אני מתחייב להשתתף בפרויקט קהילתי משמעותי.",
    "אני מתחייב לשיחות פתוחות וכנות עם הוריי.",
    "ההורים מתחייבות לאפשר עצמאות מדורגת ולסמוך.",
  ];

  return (
    <div>
      <div style={{
        padding: 28, borderRadius: 20, marginBottom: 24,
        background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.05) 100%)",
        border: "1px solid rgba(124,58,237,0.3)"
      }}>
        <h2 style={{ color: "#c4b5fd", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>טקס פתיחה</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
          היום אנחנו מתחילים במסע משותף. זה לא מסע דתי או מסורתי, אלא מסע של התבגרות. מסע שבו אתה מתחיל להוביל את החיים שלך בצעד ראשון.
        </p>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.8, margin: "12px 0 0" }}>
          יש בך המון שכל, רגישות, מחשבה, כח, לב גדול ואכפתיות עצומה. השנה הזו נועדה לעזור לך להכיר את עצמך טוב יותר, להעז יותר, לקחת אחריות אמיתית.
        </p>
      </div>

      <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 600, margin: "0 0 16px" }}>אמנת התבגרות המשפחתית</h3>
      {commitments.map((c, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px",
          marginBottom: 10, borderRadius: 12,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)"
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#c4b5fd", fontSize: 13, fontWeight: 700
          }}>{i + 1}</div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>{c}</p>
        </div>
      ))}

      <div style={{
        marginTop: 24, padding: 20, borderRadius: 14,
        background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)"
      }}>
        <p style={{ color: "#6ee7b7", fontWeight: 600, margin: "0 0 6px" }}>הבטחה מאמא ומורן</p>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, margin: 0, lineHeight: 1.7 }}>
          אנחנו מתחייבות להיות לצידך במסע הזה. לא להוביל במקומך, לא לפתור עבורך, לא להחליט — אלא לצעוד לצידך, לשאול, להקשיב, לאתגר כשצריך ולתמוך תמיד.
        </p>
      </div>
    </div>
  );
}

const NAV_IDO = [
  { id: "tasks", label: "משימות", icon: "✓" },
  { id: "progress", label: "התקדמות", icon: "📊" },
  { id: "journal", label: "יומן", icon: "📝" },
  { id: "values", label: "ערכים", icon: "⭐" },
  { id: "manifesto", label: "המסע", icon: "🧭" },
];

const NAV_PARENT = [
  { id: "progress", label: "התקדמות", icon: "📊" },
  { id: "tasks", label: "משימות", icon: "✓" },
  { id: "journal", label: "הערות", icon: "📝" },
  { id: "manifesto", label: "המסע", icon: "🧭" },
];

export default function App() {
  const [session, setSession] = useState(null);
  const [tab, setTab] = useState("tasks");
  const [data, save] = useStorage();

  if (!session) {
    return <LoginScreen onLogin={(k, u) => {
      setSession({ key: k, ...u });
      setTab(u.role === "parent" ? "progress" : "tasks");
    }} />;
  }

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0f23" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid #7c3aed", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  const isParent = session.role === "parent";
  const nav = isParent ? NAV_PARENT : NAV_IDO;
  const totalDone = ALL_TASKS.filter(t => data.completed[t.id]).length;
  const overallPct = Math.round((totalDone / TOTAL_TASKS) * 100);

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a1a",
      fontFamily: "'Segoe UI', Tahoma, sans-serif", direction: "rtl", color: "#fff"
    }}>
      <div style={{
        background: "rgba(10,10,26,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(10px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🧭</span>
          <div>
            <p style={{ color: "#fff", fontWeight: 700, margin: 0, fontSize: 15 }}>שנת בר מצווה – עידו</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0 }}>{overallPct}% מהמסע הושלם</p>
          </div>
        </div>
        <button onClick={() => setSession(null)} style={{
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.6)", padding: "7px 14px", borderRadius: 10,
          cursor: "pointer", fontSize: 13
        }}>
          {isParent ? "👩‍👩‍👦" : "👦"} {session.name} ↩
        </button>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 100px" }}>
        {tab === "tasks" && <TasksView data={data} save={save} isParent={isParent} />}
        {tab === "progress" && <ProgressView data={data} />}
        {tab === "journal" && <JournalView data={data} save={save} isParent={isParent} />}
        {tab === "values" && !isParent && <ValuesView data={data} save={save} />}
        {tab === "manifesto" && <ManifestoView />}
      </div>

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(10,10,26,0.95)", backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", justifyContent: "center", padding: "10px 16px 20px", gap: 4
      }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            flex: 1, maxWidth: 100, padding: "10px 8px", borderRadius: 12,
            background: tab === n.id ? "rgba(124,58,237,0.2)" : "transparent",
            border: tab === n.id ? "1px solid rgba(124,58,237,0.4)" : "1px solid transparent",
            color: tab === n.id ? "#c4b5fd" : "rgba(255,255,255,0.4)",
            cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4, transition: "all 0.2s"
          }}>
            <span style={{ fontSize: 18 }}>{n.icon}</span>
            <span style={{ fontSize: 11 }}>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
