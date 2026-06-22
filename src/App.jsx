import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { TaskModal, ClimaxModal, MonthlyQuiz, MONTH_QUIZZES, MONTH_QUIZZES_CH2 } from "./TaskActivity.jsx";

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
    period: "נובמבר 2026 – פברואר 2027",
    question: "מי אני? מאיפה באתי? מה חשוב לי?",
    months: [
      {
        id: "m1", month: "נובמבר 2026", title: "טקס פתיחה ומפת זהות",
        tasks: [
          { id: "t1", text: "טקס פתיחה משפחתי" },
          { id: "t2", text: "מפת ערכים אישית" },
          { id: "t3", text: "בחירת 5 ערכים מובילים לשנה" },
        ]
      },
      {
        id: "m2", month: "דצמבר 2026", title: "אחריות בבית",
        tasks: [
          { id: "t4", text: "בחירת תחום אחריות קבוע" },
          { id: "t5", text: "סטנדרט ביצוע ברור" },
          { id: "t6", text: "שיחת משוב חודשית" },
        ]
      },
      {
        id: "m3", month: "ינואר 2027", title: "כסף וניהול עצמי",
        tasks: [
          { id: "t7", text: "דמי ניהול חודשיים" },
          { id: "t8", text: "טבלת הוצאות" },
          { id: "t9", text: "שיחה על צרכים מול רצונות" },
        ]
      },
      {
        id: "m4", month: "פברואר 2027", title: "עצמאות יומיומית",
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
    period: "מרץ–יוני 2027",
    question: "איך אני מתנהל לבד? איך אני פועל מחוץ לבית?",
    months: [
      {
        id: "m5", month: "מרץ 2027", title: "רגשות וחוסן",
        tasks: [
          { id: "t13", text: "יומן רגשי שבועי" },
          { id: "t14", text: "שיחה אמיצה על פחד/כעס" },
        ]
      },
      {
        id: "m6", month: "אפריל 2027", title: "קהילה ותרומה",
        tasks: [
          { id: "t15", text: "בחירת פרויקט התנדבותי" },
          { id: "t16", text: "התחייבות קבועה" },
        ]
      },
      {
        id: "m7", month: "מאי 2027", title: "אתגר פיזי",
        tasks: [
          { id: "t17", text: "בחירת יעד (ריצה / מסלול / רכיבה)" },
          { id: "t18", text: "תכנית אימון" },
          { id: "t19", text: "עמידה ביעד" },
        ]
      },
      {
        id: "m8", month: "יוני 2027", title: 'נסיעה עצמאית בתחב"צ 🚍',
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
    period: "יולי–אוקטובר 2027",
    question: "חיבור בין גוף, טבע ובגרות.",
    months: [
      {
        id: "m9", month: "יולי 2027", title: "מיומנות טכנית",
        tasks: [
          { id: "t24", text: "תיקון בבית" },
          { id: "t25", text: "שימוש בכלים בסיסיים" },
        ]
      },
      {
        id: "m10", month: "אוגוסט 2027", title: "יום עצמאות מלא",
        tasks: [
          { id: "t26", text: "יציאה ליום שתכנן לגמרי לבד" },
          { id: "t27", text: "אחריות לזמנים ולכסף" },
        ]
      },
      {
        id: "m11", month: "ספטמבר 2027", title: "מחנאות 🏕",
        tasks: [
          { id: "t28", text: "לימוד הדלקת גזיה / מדורה" },
          { id: "t29", text: "הקמת אוהל" },
          { id: "t30", text: "תכנון לינת שטח משפחתית קצרה" },
          { id: "t31", text: "אחריות על חלק מהציוד" },
        ]
      },
      {
        id: "m12", month: "אוקטובר 2027", title: "תיק עתיד",
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
    period: "נובמבר 2027 — קו הסיום",
    question: "לאן אני לוקח את עצמי מכאן?",
    months: [
      {
        id: "m13", month: "נובמבר 2027 — שבוע א׳", title: "פרויקט אישי משמעותי",
        tasks: [
          { id: "t35", text: "הגדרת פרויקט אישי" },
          { id: "t36", text: "יעד ברור + מדדי הצלחה" },
          { id: "t37", text: "ביצוע הפרויקט" },
        ]
      },
      {
        id: "m14", month: "נובמבר 2027 — שבוע ב׳", title: "עיבוד המסע",
        tasks: [
          { id: "t38", text: "כתיבת נאום אישי" },
          { id: "t39", text: "בחירת 5 תובנות מהשנה" },
          { id: "t40", text: "מכתב לעצמי העתידי" },
        ]
      },
      {
        id: "m15", month: "יום הבר מצווה", title: "טקס סיום",
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
const EMPTY_DATA = { completed: {}, journal: [], parentNotes: [], values: [], valueSnapshots: [], taskData: {}, climaxData: {} };

function useStorage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const { data: row, error } = await supabase
          .from("bar_mitzvah")
          .select("value")
          .eq("key", "ido-data")
          .maybeSingle();
        // maybeSingle() returns null (not error) when no row exists
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
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
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
        background: "#f9fafb", backdropFilter: "blur(20px)",
        border: "1px solid #e5e7eb", borderRadius: 24,
        padding: "48px 40px", width: 340, textAlign: "center",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
      }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>🧭</div>
        <h1 style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>שנת בר מצווה</h1>
        <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 32px" }}>להוביל את החיים</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["ido", "parents"].map(k => (
            <button key={k} onClick={() => setUser(k)} style={{
              flex: 1, padding: "10px", borderRadius: 12,
              border: user === k ? "2px solid #7c3aed" : "1px solid #d1d5db",
              background: user === k ? "rgba(124,58,237,0.1)" : "transparent",
              color: "#1e1b4b", cursor: "pointer", fontSize: 14, fontWeight: user === k ? 600 : 400,
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
            border: error ? "1.5px solid #ef4444" : "1px solid #d1d5db",
            background: "#f3f4f6", color: "#1e1b4b", fontSize: 15,
            outline: "none", marginBottom: 12, textAlign: "right", transition: "border 0.2s"
          }}
        />
        <button onClick={handleLogin} style={{
          width: "100%", padding: "13px", borderRadius: 12,
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          border: "none", color: "#1e1b4b", fontSize: 16, fontWeight: 600, cursor: "pointer"
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
  const [activeTask, setActiveTask] = useState(null);
  const [activeClimax, setActiveClimax] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null); // { monthId }

  const totalDone = ALL_TASKS.filter(t => data.completed[t.id]).length;
  const overallPct = Math.round((totalDone / TOTAL_TASKS) * 100);

  // A month is unlocked when all tasks in all previous months (across all chapters) are done
  function isMonthUnlocked(chapterIdx, monthIdx) {
    return true; // TODO: restore locking after review
  }

  // Climax unlocked when all tasks in a chapter are done
  function isClimaxUnlocked(ch) {
    return true; // TODO: restore locking after review
  }

  function isChapterUnlocked(chIdx) {
    return true; // TODO: restore locking after review
  }

  return (
    <div>
      {/* Active task modal */}
      {activeTask && (
        <TaskModal
          task={activeTask.task}
          chapter={activeTask.chapter}
          data={data} save={save}
          isParent={isParent}
          onClose={() => setActiveTask(null)} />
      )}
      {activeClimax && (
        <ClimaxModal
          chapterId={activeClimax}
          data={data} save={save}
          isParent={isParent}
          onClose={() => setActiveClimax(null)}
          onApprove={() => setActiveClimax(null)} />
      )}
      {activeQuiz && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#f4f2ff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: "#f4f2ff", borderBottom: "1px solid #e5e7eb", padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <button onClick={() => setActiveQuiz(null)} style={{ background: "#e5e7eb", border: "none", color: "#1e1b4b", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
            <p style={{ color: "#fbbf24", fontWeight: 700, fontSize: 15, margin: 0, flex: 1 }}>🎮 משחקון סיכום חודש</p>
            {!!data.completed?.[`quiz_${activeQuiz.monthId}`] && (
              <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, background: "rgba(16,185,129,0.2)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.3)" }}>✓ הושלם</span>
            )}
            <button onClick={() => {
              const newTaskData = { ...(data.taskData || {}) };
              delete newTaskData[`quiz_${activeQuiz.monthId}`];
              const newCompleted = { ...(data.completed || {}) };
              delete newCompleted[`quiz_${activeQuiz.monthId}`];
              save({ ...data, taskData: newTaskData, completed: newCompleted });
            }} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>🔄 אפס</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 100px" }}>
            {MONTH_QUIZZES_CH2[activeQuiz.monthId]
              ? (() => {
                  const QuizComp = MONTH_QUIZZES_CH2[activeQuiz.monthId].component;
                  return <QuizComp
                    state={(data.taskData || {})[`quiz_${activeQuiz.monthId}`] || {}}
                    onChange={newState => {
                      const newTaskData = { ...(data.taskData || {}), [`quiz_${activeQuiz.monthId}`]: newState };
                      save({ ...data, taskData: newTaskData });
                    }} />;
                })()
              : <MonthlyQuiz
                  monthId={activeQuiz.monthId}
                  state={(data.taskData || {})[`quiz_${activeQuiz.monthId}`] || {}}
                  onChange={newState => {
                    const newTaskData = { ...(data.taskData || {}), [`quiz_${activeQuiz.monthId}`]: newState };
                    save({ ...data, taskData: newTaskData });
                  }} />
            }
          </div>
          {!isParent && !data.completed?.[`quiz_${activeQuiz.monthId}`] && (
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px", background: "#ffffff", backdropFilter: "blur(10px)", borderTop: "1px solid #e9ecef" }}>
              <button onClick={() => {
                const newCompleted = { ...(data.completed || {}), [`quiz_${activeQuiz.monthId}`]: true };
                save({ ...data, completed: newCompleted });
                setActiveQuiz(null);
              }} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: "#1e1b4b", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
                ✓ סיימתי את המשחקון
              </button>
            </div>
          )}
        </div>
      )}

      {/* Overall progress */}
      <div style={{
        background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.3)",
        borderRadius: 20, padding: 24, marginBottom: 24, display: "flex", alignItems: "center", gap: 24
      }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <ProgressRing pct={overallPct} size={100} stroke={8} color="#a855f7" />
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ color: "#1e1b4b", fontSize: 22, fontWeight: 700 }}>{overallPct}%</span>
          </div>
        </div>
        <div>
          <p style={{ color: "#6b7280", margin: "0 0 4px", fontSize: 14 }}>התקדמות כוללת</p>
          <p style={{ color: "#1e1b4b", fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>
            {totalDone} / {TOTAL_TASKS} משימות
          </p>
          <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>
            {TOTAL_TASKS - totalDone} משימות נותרו במסע
          </p>
        </div>
      </div>

      {/* Chapters */}
      {CHAPTERS.map((ch, chIdx) => {
        const chTasks = ch.months.flatMap(m => m.tasks);
        const chDone = chTasks.filter(t => data.completed[t.id]).length;
        const chPct = Math.round((chDone / chTasks.length) * 100);
        const isOpen = openChapter === ch.id;
        const chUnlocked = isChapterUnlocked(chIdx);
        const climaxUnlocked = isClimaxUnlocked(ch);
        const climaxApproved = (data.climaxData || {})[ch.id]?.parentApproved;

        return (
          <div key={ch.id} style={{
            marginBottom: 16,
            border: !chUnlocked ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e5e7eb",
            borderRadius: 16, overflow: "hidden",
            background: !chUnlocked ? "rgba(255,255,255,0.01)" : isOpen ? "#ffffff" : "rgba(255,255,255,0.02)",
            opacity: !chUnlocked ? 0.5 : 1, transition: "opacity 0.3s"
          }}>
            {/* Chapter header */}
            <button onClick={() => chUnlocked && setOpenChapter(isOpen ? null : ch.id)} style={{
              width: "100%", padding: "16px 20px", background: "none", border: "none",
              display: "flex", alignItems: "center", gap: 16,
              cursor: chUnlocked ? "pointer" : "not-allowed", textAlign: "right"
            }}>
              <span style={{ fontSize: 28 }}>{!chUnlocked ? "🔒" : ch.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: !chUnlocked ? "#9ca3af" : "#1e1b4b", fontWeight: 600, margin: "0 0 2px", fontSize: 16 }}>
                  {ch.title}
                </p>
                <p style={{ color: "#9ca3af", fontSize: 12, margin: 0 }}>
                  {!chUnlocked
                    ? `נפתח לאחר אישור הורים על אירוע השיא של "${CHAPTERS[chIdx-1]?.title}"`
                    : ch.period}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {chUnlocked && (
                  <>
                    <div style={{ textAlign: "left" }}>
                      <span style={{ color: "#a855f7", fontWeight: 700, fontSize: 16 }}>{chPct}%</span>
                      <p style={{ color: "#9ca3af", fontSize: 11, margin: 0 }}>{chDone}/{chTasks.length}</p>
                    </div>
                    <span style={{
                      color: "#9ca3af", fontSize: 18,
                      transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s"
                    }}>▾</span>
                  </>
                )}
              </div>
            </button>

            {isOpen && chUnlocked && (
              <div style={{ padding: "0 20px 20px" }}>
                <p style={{
                  color: "#6b7280", fontSize: 13, margin: "0 0 16px",
                  borderTop: "1px solid #e5e7eb", paddingTop: 16
                }}>
                  {ch.question}
                </p>

                {/* Months */}
                {ch.months.map((m, mIdx) => {
                  const mUnlocked = isMonthUnlocked(chIdx, mIdx);
                  const mDone = m.tasks.every(t => data.completed[t.id]);

                  return (
                    <div key={m.id} style={{
                      marginBottom: 20,
                      opacity: !mUnlocked ? 0.4 : 1, transition: "opacity 0.3s"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{
                          width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                          background: mDone ? "#10b981" : mUnlocked ? "#7c3aed" : "rgba(255,255,255,0.2)"
                        }} />
                        <p style={{ color: mUnlocked ? "#c4b5fd" : "rgba(255,255,255,0.3)", fontWeight: 600, fontSize: 14, margin: 0 }}>
                          {m.month} – {m.title}
                        </p>
                        {!mUnlocked && <span style={{ color: "#d1d5db", fontSize: 11 }}>🔒 נפתח אחרי החודש הקודם</span>}
                        {mDone && <span style={{ color: "#059669", fontSize: 11 }}>✓ הושלם</span>}
                      </div>

                      {m.tasks.map(task => {
                        const done = !!data.completed[task.id];
                        const taskUnlocked = mUnlocked;
                        return (
                          <div key={task.id} onClick={() => taskUnlocked && setActiveTask({ task, chapter: ch })} style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                            borderRadius: 12, marginBottom: 6,
                            cursor: taskUnlocked ? "pointer" : "not-allowed",
                            background: done ? "rgba(124,58,237,0.1)" : taskUnlocked ? "#ffffff" : "rgba(255,255,255,0.01)",
                            border: done ? "1px solid rgba(124,58,237,0.25)" : "1px solid #e9ecef",
                            transition: "all 0.2s"
                          }}>
                            <div style={{
                              width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                              border: done ? "none" : "1.5px solid #d1d5db",
                              background: done ? "#7c3aed" : "transparent",
                              display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                              {done && <span style={{ color: "#1e1b4b", fontSize: 13 }}>✓</span>}
                            </div>
                            <span style={{
                              color: done ? "#9ca3af" : "#1e1b4b", fontSize: 14, flex: 1,
                              textDecoration: done ? "line-through" : "none"
                            }}>{task.text}</span>
                            {taskUnlocked && !done && (
                              <span style={{ color: "#d1d5db", fontSize: 18 }}>›</span>
                            )}
                          </div>
                        );
                      })}

                      {/* Monthly quiz — appears after all tasks done */}
                      {(() => {
                        const hasQuiz = MONTH_QUIZZES[m.id] || MONTH_QUIZZES_CH2[m.id];
                        if (!hasQuiz) return null;
                        const allTasksDone = m.tasks.every(t => data.completed[t.id]);
                        const quizDone = !!data.completed?.[`quiz_${m.id}`];
                        const quizUnlocked = isParent || (mUnlocked && allTasksDone);
                        return (
                          <div onClick={() => quizUnlocked && setActiveQuiz({ monthId: m.id })} style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                            borderRadius: 12, marginBottom: 6,
                            cursor: quizUnlocked ? "pointer" : "not-allowed",
                            background: quizDone ? "rgba(234,179,8,0.1)" : quizUnlocked ? "#ffffff" : "rgba(255,255,255,0.01)",
                            border: quizDone ? "1px solid rgba(234,179,8,0.3)" : quizUnlocked ? "1px solid #e5e7eb" : "1px solid rgba(255,255,255,0.04)",
                            opacity: quizUnlocked || quizDone ? 1 : 0.4, transition: "all 0.2s"
                          }}>
                            <div style={{
                              width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                              background: quizDone ? "#f59e0b" : "transparent",
                              border: quizDone ? "none" : "1.5px solid #d1d5db",
                              display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                              {quizDone ? <span style={{ fontSize: 12 }}>✓</span> : <span style={{ fontSize: 13 }}>🎮</span>}
                            </div>
                            <span style={{ color: quizDone ? "#9ca3af" : "#1e1b4b", fontSize: 14, flex: 1, textDecoration: quizDone ? "line-through" : "none" }}>
                              משחקון סיכום חודש
                            </span>
                            {!quizUnlocked && !quizDone && <span style={{ color: "#d1d5db", fontSize: 11 }}>🔒 לאחר כל המשימות</span>}
                            {quizUnlocked && !quizDone && <span style={{ color: "#d1d5db", fontSize: 18 }}>›</span>}
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}

                {/* Climax */}
                <div onClick={() => (climaxUnlocked || isParent) && setActiveClimax(ch.id)} style={{
                  marginTop: 12, padding: "14px 16px", borderRadius: 14,
                  background: climaxApproved
                    ? "rgba(16,185,129,0.1)"
                    : climaxUnlocked
                    ? "rgba(234,179,8,0.1)"
                    : "#fafafa",
                  border: climaxApproved
                    ? "1px solid rgba(16,185,129,0.3)"
                    : climaxUnlocked
                    ? "1px solid rgba(234,179,8,0.3)"
                    : "1px solid #f3f4f6",
                  cursor: (climaxUnlocked || isParent) ? "pointer" : "default",
                  opacity: !climaxUnlocked && !isParent ? 0.4 : 1,
                  display: "flex", alignItems: "center", gap: 12
                }}>
                  <span style={{ fontSize: 20 }}>
                    {climaxApproved ? "✅" : climaxUnlocked ? "🎯" : "🔒"}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: climaxApproved ? "#6ee7b7" : climaxUnlocked ? "#fbbf24" : "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: 600, margin: "0 0 2px" }}>
                      אירוע שיא
                    </p>
                    <p style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>
                      {climaxApproved ? "הושלם ואושר ✓" : climaxUnlocked ? ch.climax : "יפתח כשכל המשימות יושלמו"}
                    </p>
                  </div>
                  {(climaxUnlocked || isParent) && <span style={{ color: "#d1d5db", fontSize: 18 }}>›</span>}
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
            background: "#f3f4f6", border: "1px solid #d1d5db",
            color: "#1e1b4b", fontSize: 15, resize: "vertical", outline: "none",
            boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6, direction: "rtl"
          }}
        />
        <button onClick={addEntry} style={{
          marginTop: 10, padding: "11px 24px", borderRadius: 12,
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          border: "none", color: "#1e1b4b", fontSize: 15, fontWeight: 600, cursor: "pointer"
        }}>
          הוסף כניסה
        </button>
      </div>

      {isParent && (
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[["all", "הכל"], ["ido", "של עידו"], ["parents", "שלנו"]].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{
              padding: "7px 16px", borderRadius: 10, fontSize: 13, cursor: "pointer",
              background: filter === k ? "rgba(124,58,237,0.15)" : "#f9fafb",
              border: filter === k ? "1px solid rgba(124,58,237,0.5)" : "1px solid #e5e7eb",
              color: "#1e1b4b"
            }}>{l}</button>
          ))}
        </div>
      )}

      <div>
        {displayed.length === 0 && (
          <p style={{ color: "#9ca3af", textAlign: "center", padding: 40, fontSize: 15 }}>
            עדיין אין כניסות. התחל לכתוב!
          </p>
        )}
        {[...displayed].reverse().map(e => (
          <div key={e.id} style={{
            padding: "16px 20px", borderRadius: 14, marginBottom: 12,
            background: e.author === "ההורים" ? "rgba(16,185,129,0.06)" : "rgba(124,58,237,0.06)",
            border: e.author === "ההורים" ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(124,58,237,0.2)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{
                fontSize: 12, padding: "3px 10px", borderRadius: 20,
                background: e.author === "ההורים" ? "rgba(16,185,129,0.15)" : "rgba(124,58,237,0.12)",
                color: e.author === "ההורים" ? "#6ee7b7" : "#c4b5fd"
              }}>{e.author}</span>
              <span style={{ color: "#9ca3af", fontSize: 12 }}>{e.date}</span>
            </div>
            <p style={{ color: "#374151", fontSize: 15, margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
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
              background: "#ffffff", border: "1px solid #e5e7eb"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ fontSize: 28 }}>{ch.emoji}</span>
                <div style={{ position: "relative" }}>
                  <ProgressRing pct={pct} size={56} stroke={5} color={colors[i]} />
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#1e1b4b" }}>{pct}%</span>
                  </div>
                </div>
              </div>
              <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 13, margin: "0 0 4px" }}>{ch.title}</p>
              <p style={{ color: "#9ca3af", fontSize: 12, margin: 0 }}>{done}/{tasks.length} משימות</p>
              <div style={{ marginTop: 12, height: 4, borderRadius: 2, background: "#e5e7eb" }}>
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
        background: "#fafafa", border: "1px solid #e5e7eb"
      }}>
        <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 16px" }}>התקדמות כרונולוגית</p>
        {CHAPTERS.flatMap(ch => ch.months).map(m => {
          const done = m.tasks.filter(t => data.completed[t.id]).length;
          const pct = Math.round((done / m.tasks.length) * 100);
          const color = done === m.tasks.length ? "#10b981" : done > 0 ? "#7c3aed" : "rgba(255,255,255,0.15)";
          return (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ color: "#9ca3af", fontSize: 12, width: 100, flexShrink: 0, textAlign: "left" }}>
                {m.month}
              </span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#f3f4f6" }}>
                <div style={{ height: "100%", borderRadius: 3, background: color, width: `${pct}%`, transition: "width 0.6s ease" }} />
              </div>
              <span style={{ color: "#6b7280", fontSize: 12, width: 30, textAlign: "right" }}>
                {done}/{m.tasks.length}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ALL_VALUES = [
  { name: "אדיבות", desc: "להתנהג בנועם ובכבוד כלפי כל אדם, גם כשקשה." },
  { name: "אהבה", desc: "לחבב, לדאוג ולהעניק מעצמך לאנשים שחשובים לך." },
  { name: "אהבת המולדת", desc: "קשר עמוק וגאווה בארץ ובעם שאתה שייך אליהם." },
  { name: "אהדה", desc: "לחוש עם אחרים ברגעי שמחה וכאב כאחד." },
  { name: "אומץ", desc: "לפעול גם כשמפחד, לא להימנע מאתגרים בגלל פחד." },
  { name: "אופטימיות", desc: "להאמין שהעתיד יכול להיות טוב, גם כשקשה בהווה." },
  { name: "אושר", desc: "לחפש ולטפח שמחה פנימית אמיתית בחיים." },
  { name: "אותנטיות", desc: "להיות מי שאתה באמת, לא מה שאחרים מצפים ממך." },
  { name: "אחדות", desc: "לפעול יחד, לחבר בין אנשים ולא לפרק." },
  { name: "אחריות", desc: "לעמוד מאחורי המילים והמעשים שלך, גם כשטועים." },
  { name: "איזון", desc: "לחיות בהרמוניה בין תחומים שונים — עבודה, מנוחה, יחסים." },
  { name: "איכות הסביבה", desc: "לדאוג לטבע ולכדור הארץ כחלק מהאחריות שלך." },
  { name: "אינטואיציה", desc: "לסמוך על הקול הפנימי שלך, לא רק על הגיון קר." },
  { name: "אינטימיות", desc: "ליצור קשרים עמוקים ואמיתיים עם אנשים קרובים." },
  { name: "אכפתיות", desc: "לא לעבור ליד בשוויון נפש — לאנשים, לסביבה, לחברה." },
  { name: "אמון", desc: "לבנות מערכות יחסים שמבוססות על ביטחון הדדי." },
  { name: "אמונה", desc: "להאמין במשהו גדול יותר ממך — בעצמך, בחיים, באנשים." },
  { name: "אמנות", desc: "להעריך ביצירה אנושית — ביטוי, יופי, רגש דרך יצירה." },
  { name: "אמפתיה", desc: "להרגיש את מה שאחרים מרגישים, לעמוד בנעליהם." },
  { name: "אמת", desc: "לדבר ולחיות ביושר, גם כשהאמת לא נוחה." },
  { name: "אנושיות", desc: "לראות את הצד האנושי בכל אדם, לא רק את החיצוני." },
  { name: "אסרטיביות", desc: "לבטא את עצמך בביטחון מבלי לפגוע באחרים." },
  { name: "אסתטיקה", desc: "להעריך יופי, עיצוב והרמוניה חזותית בחיים." },
  { name: "אצילות", desc: "להתנהג בגדולה, לתת כבוד גם למי שאינו מצדיק אותו." },
  { name: "אריכות ימים", desc: "לשמור על בריאות ולחיות חיים ארוכים ומלאים." },
  { name: "בהירות", desc: "לחשוב ולתקשר בצורה ברורה וחדה, ללא עמימות." },
  { name: "בחירה", desc: "להכיר שיש לך כוח לבחור את דרכך בכל רגע." },
  { name: "בטחון", desc: "להרגיש יציב ובטוח בתוך עצמך, ללא תלות בחיצוני." },
  { name: "ביטוי עצמי", desc: "לתת ביטוי חופשי לאישיות, לרגשות וליצירתיות שלך." },
  { name: "בין אדם לחברו", desc: "להשקיע במערכות יחסים כמנוע מרכזי בחיים." },
  { name: "בריאות", desc: "לדאוג לגוף ולנפש כבסיס לחיים מלאים." },
  { name: "גאווה", desc: "להרגיש סיפוק ועוצמה על מי שאתה ומה שהשגת." },
  { name: "גבורה", desc: "להתמודד עם קשיים בעוצמה ובאומץ." },
  { name: "גיוון", desc: "לראות בשונות בין אנשים עושר ולא איום." },
  { name: "גמישות", desc: "להסתגל לשינויים מבלי לאבד את עצמך." },
  { name: "דוגמא אישית", desc: "להנהיג דרך מעשים ולא רק דברים." },
  { name: "דו-קיום", desc: "לחיות בשלום לצד אנשים שונים ממך." },
  { name: "דיוק", desc: "לעשות דברים בקפידה, לפרטים יש חשיבות." },
  { name: "הארת פנים", desc: "להאיר את הסביבה בחיוך, בחום ובנוכחות חיובית." },
  { name: "הבחנה", desc: "היכולת להבחין בין מה שחשוב לבין מה שלא." },
  { name: "הבנה", desc: "לשאוף להבין לעומק — אנשים, רעיונות, מצבים." },
  { name: "הגיון", desc: "לפעול מתוך חשיבה רציונלית ומבוססת." },
  { name: "הגינות", desc: "לפעול בצדק ובשוויון גם כשאין חובה לכך." },
  { name: "הגנה", desc: "לעמוד לצד מי שצריך הגנה — חלשים, אהובים, ערכים." },
  { name: "הגשמה", desc: "לממש חלומות ומטרות, לא רק לחלום עליהם." },
  { name: "הדדיות", desc: "לבנות מערכות יחסים של נתינה וקבלה הדדית." },
  { name: "הובלה", desc: "לקחת אחריות ולהניע אחרים לכיוון משותף." },
  { name: "הומור", desc: "לראות את הצד המצחיק של החיים ולהקל בו את הקשיים." },
  { name: "הוקרת תודה", desc: "להכיר בטוב שמסביבך ולהביע תודה על כך." },
  { name: "הזדהות", desc: "לחוש שייכות ומחויבות לקבוצה, לרעיון, לאדם." },
  { name: "הישגיות", desc: "לשאוף לתוצאות ולא להסתפק בפחות ממה שאתה יכול." },
  { name: "החלטיות", desc: "לקבל החלטות בביטחון ולהתחייב אליהן." },
  { name: "הנאה", desc: "לאפשר לעצמך ליהנות מהחיים בלי אשמה." },
  { name: "הסתגלות", desc: "להשתנות עם הנסיבות מבלי לאבד ערכים מרכזיים." },
  { name: "הסתפקות במועט", desc: "למצוא שמחה במה שיש, לא להיות כל הזמן בחסר." },
  { name: "הערכה", desc: "להכיר בערך של אנשים, דברים וחוויות בחייך." },
  { name: "הצלחה", desc: "לשאוף ולהשיג מטרות שהגדרת לעצמך." },
  { name: "הקשבה", desc: "להיות נוכח באמת כשמישהו מדבר, לא רק לשמוע." },
  { name: "הרמוניה", desc: "לחיות בשלום עם עצמך ועם הסביבה." },
  { name: "הרפתקנות", desc: "לפתוח את עצמך לחוויות חדשות ולא ידועות." },
  { name: "השפעה", desc: "להשאיר חותם חיובי על אנשים ועל העולם." },
  { name: "התלהבות", desc: "להביא אנרגיה ותשוקה לכל מה שאתה עושה." },
  { name: "התמדה", desc: "להמשיך גם כשקשה, לא לוותר בדרך." },
  { name: "התנדבות", desc: "לתת מזמנך ומאנרגייתך לאחרים ללא תמורה." },
  { name: "התמסרות", desc: "להשקיע את כל עצמך במה שבחרת." },
  { name: "התפתחות", desc: "לשאוף כל הזמן ללמוד, לגדול ולהשתפר." },
  { name: "ודאות", desc: "לחפש יציבות וביטחון בתוך עולם משתנה." },
  { name: "ויתור", desc: "לדעת מתי לשחרר — דברים, כעסים, ציפיות." },
  { name: "זכרון", desc: "לשמר את העבר ולכבד את מה שהיה." },
  { name: "זמן פנוי", desc: "לשמר מרחב לנשימה, מנוחה ומה שאוהבים." },
  { name: "חברות", desc: "לטפח קשרים של אמון, שמחה ונאמנות לאורך זמן." },
  { name: "חדשנות", desc: "לחשוב מחוץ לקופסה ולהמציא דרכים חדשות." },
  { name: "חופש", desc: "לפעול מתוך רצון אישי ולא מכפייה." },
  { name: "חופש בחירה", desc: "להאמין בזכות של כל אדם לבחור את דרכו." },
  { name: "חיים", desc: "לחגוג את עצם הקיום ולהעניק לו משמעות." },
  { name: "חינוך", desc: "להאמין בכוח של הידע והלמידה לשנות חיים." },
  { name: "חכמה", desc: "לפעול מתוך בגרות, ניסיון והבנה עמוקה." },
  { name: "חכמת חיים", desc: "לדעת מה באמת חשוב — לא רק מה נראה חשוב." },
  { name: "חמלה", desc: "לפגוש כאב של אחרים בלב פתוח ורצון לעזור." },
  { name: "חריצות", desc: "לעבוד קשה ובמסירות למה שאתה עושה." },
  { name: "חשיבה", desc: "לתת לשכל מקום — לנתח, לפקפק, לחקור." },
  { name: "טבע", desc: "לחוש קשר לעולם הטבעי ולשמור עליו." },
  { name: "ידע", desc: "לאסוף מידע והבנה כדי לפעול טוב יותר בעולם." },
  { name: "יוזמה", desc: "לא לחכות שדברים יקרו — ליזום ולפעול." },
  { name: "יופי", desc: "להכיר ביופי בחיים — בטבע, באנשים, ביצירה." },
  { name: "יושר", desc: "להיות ישר בדברים ובמעשים, גם כשזה לא נוח." },
  { name: "יושר פנימי", desc: "להתאים בין מה שאתה מאמין לבין איך שאתה חי." },
  { name: "יושרה", desc: "לשמור על עקרונות אתיים גם תחת לחץ." },
  { name: "ייחודיות", desc: "להכיר ולחגוג את מה שהופך אותך לשונה מכולם." },
  { name: "יסודיות", desc: "לעשות דברים לעומק ולא רק על פני השטח." },
  { name: "יעילות", desc: "להשיג תוצאות מקסימליות עם המשאבים שיש." },
  { name: "יציבות", desc: "להיות עקבי ואמין גם כשהסביבה לא." },
  { name: "יצירתיות", desc: "לחשוב בדרכים חדשות ולהביא רעיונות מקוריים." },
  { name: "ישירות", desc: "לדבר בגלוי ובפשטות, בלי לעגל פינות." },
  { name: "כבוד", desc: "לתת כבוד לכל אדם — ולא לוותר על כבוד עצמך." },
  { name: "כבוד המשפחה", desc: "לשמור על הקשר המשפחתי ולהעריך אותו." },
  { name: "כיבוד האדם", desc: "לראות כל אדם כבעל ערך מולד ובלתי מותנה." },
  { name: "כוח", desc: "לפתח עוצמה פנימית וגופנית להתמודד עם החיים." },
  { name: "כיף", desc: "לתת מקום לשמחה, לשחק ולקלות בחיים." },
  { name: "כנות", desc: "לאמר את האמת שלך, גם כשזה דורש אומץ." },
  { name: "כריזמה", desc: "להשפיע על אחרים דרך נוכחות ואישיות חזקה." },
  { name: "למידה", desc: "לראות כל ניסיון — גם כישלון — כהזדמנות לגדול." },
  { name: "לקיחת סיכונים", desc: "להיות מוכן לנסות גם כשהתוצאה לא ידועה." },
  { name: "מחויבות", desc: "לעמוד מאחורי המילה שלך ולסיים מה שהתחלת." },
  { name: "מחילה", desc: "לשחרר טינה ולאפשר לעצמך ולאחרים להתחיל מחדש." },
  { name: "מיקוד במטרה", desc: "להשקיע אנרגיה במה שבאמת חשוב ולא לפזר." },
  { name: "מנהיגות", desc: "לדעת לעמוד בראש ולהוביל אחרים בדרך טובה." },
  { name: "מסורת", desc: "לשמר דפוסים וערכים שהועברו מדורות קודמים." },
  { name: "מסירות נפש", desc: "לתת את כולך לדבר שמאמין בו, גם במחיר אישי." },
  { name: "מעורבות", desc: "להיות פעיל בקהילה ובחברה ולא רק צופה." },
  { name: "מעשיות", desc: "לחשוב על פתרונות ריאליים ולא רק על רעיונות." },
  { name: "מצוינות", desc: "לעשות את הדברים ברמה הגבוהה ביותר שאתה יכול." },
  { name: "מקוריות", desc: "להביא קול ייחודי משלך לכל מה שאתה עושה." },
  { name: "מקצועיות", desc: "לגשת לכל תחום בכובד ראש ובמיומנות." },
  { name: "משמעת עצמית", desc: "לשלוט בדחפים ולעשות מה שצריך גם בלי חשק." },
  { name: "משפחה", desc: "להעמיד את הקשר המשפחתי כעדיפות מרכזית בחיים." },
  { name: "מתינות", desc: "לא להגזים — לשמור על שיווי משקל בהכל." },
  { name: "נאמנות", desc: "לעמוד לצד מי שבחרת, גם בזמנים קשים." },
  { name: "נדיבות", desc: "לתת בחופשיות — זמן, כסף, אנרגיה, אהבה." },
  { name: "נוחות", desc: "לדאוג שהסביבה שלך ושל אחרים תהיה נינוחה." },
  { name: "נחישות", desc: "לא לוותר על מה שחשוב לך, גם תחת לחץ." },
  { name: "נימוס", desc: "להתנהג בדרך ארץ ובכבוד בכל מצב." },
  { name: "נכונות", desc: "להיות מוכן לעזור, לשנות, ללמוד ולהתגמש." },
  { name: "נקיון", desc: "לשמור על סדר וניקיון — בחלל, בנפש, במחשבה." },
  { name: "נתינה", desc: "למצוא שמחה בנתינה לאחרים, לא רק בקבלה." },
  { name: "סבלנות", desc: "להמתין בשלווה, לא לדחוף ולא להתפוצץ." },
  { name: "סדר", desc: "לאהוב מבנה, ארגון ובהירות בחיים." },
  { name: "סדר חברתי", desc: "להאמין בחשיבות של חוקים ומוסדות לחברה בריאה." },
  { name: "סובלנות", desc: "לקבל שאנשים שונים ממך לא בהכרח טועים." },
  { name: "סליחה", desc: "לשחרר כעס ולאפשר לעצמך להמשיך קדימה." },
  { name: "סלחנות", desc: "להיות נדיב בסליחה כלפי אחרים וכלפי עצמך." },
  { name: "ספונטניות", desc: "לאפשר לעצמך לפעול מהבטן, לא רק מהתכנון." },
  { name: "סיפוק", desc: "למצוא תחושת שלמות ממה שכבר הגעת אליו." },
  { name: "סקרנות", desc: "לשאול שאלות, לחקור, לא לקבל דברים כמובן מאליו." },
  { name: "עבודת צוות", desc: "לפעול יחד עם אחרים לקראת מטרה משותפת." },
  { name: "עדינות", desc: "להתנהל בעדינות ורגישות כלפי אחרים." },
  { name: "עונג", desc: "לתת מקום לחוויות שגורמות לך עונג אמיתי." },
  { name: "עוצמה", desc: "לפעול מתוך כוח פנימי ולא מחולשה או פחד." },
  { name: "עושר", desc: "לשאוף לשפע — חומרי, רגשי, חברתי." },
  { name: "עזרה לזולת", desc: "לראות בעזרה לאחרים חלק מרכזי מהזהות שלך." },
  { name: "עליזות", desc: "לגשת לחיים עם קלות ואנרגיה חיובית." },
  { name: "ענווה", desc: "להכיר בגבולותיך ולקבל ביקורת בפתיחות." },
  { name: "עניין", desc: "לשמור על מעורבות ועניין פעיל בחיים ובאנשים." },
  { name: "עצמאות", desc: "לפתח יכולת לפעול ולהחליט בעצמך." },
  { name: "עקביות", desc: "להיות אותו אדם בין אם רואים אותך ובין אם לאו." },
  { name: "עשיית הבדל", desc: "לפעול כך שהעולם יהיה טיפה יותר טוב בגללך." },
  { name: "פטריוטיות", desc: "לאהוב ולשרת את המדינה והעם שאתה שייך אליהם." },
  { name: "פרפקציוניזם", desc: "לשאוף למושלמות ולא להסתפק בבינוניות." },
  { name: "פשטות", desc: "לוותר על מיותר ולחיות בצורה ברורה ופשוטה." },
  { name: "פתיחות", desc: "להיות פתוח לרעיונות, לאנשים ולחוויות חדשות." },
  { name: "צדק", desc: "לפעול למען שוויון הזדמנויות ויחס הוגן לכולם." },
  { name: "צמיחה", desc: "לראות את עצמך כמתפתח כל הזמן ולא כקבוע." },
  { name: "צניעות", desc: "לא לפרסם את עצמך יתר על המידה, לתת לעשייה לדבר." },
  { name: "קבלה", desc: "לקבל את המציאות כמו שהיא — אנשים, מצבים, עצמך." },
  { name: "קבלה עצמית", desc: "לאהוב את עצמך על כל מה שאתה — כולל הפגמים." },
  { name: "קדושת החיים", desc: "להאמין שלכל חיים יש ערך מוחלט שאין לפגוע בו." },
  { name: "קידמה", desc: "לפעול למען שיפור מתמיד של החברה והעולם." },
  { name: "קלילות", desc: "לא לקחת הכל ברצינות יתרה — לנשום קצת." },
  { name: "רוגע", desc: "לשמור על שקט פנימי גם בסיטואציות לחוצות." },
  { name: "רוחניות", desc: "לחפש משמעות ועומק מעבר לפן החומרי של החיים." },
  { name: "רומנטיקה", desc: "להעריך קשרים אינטימיים ולטפח אותם ביצירתיות." },
  { name: "ריגוש", desc: "לחפש חוויות שמלהיבות ומגרות אותך." },
  { name: "ריכוז", desc: "להתמקד במה שלפניך ולא לפזר את הקשב." },
  { name: "רכות", desc: "לנהוג בעדינות ובחום גם כשאפשר להיות קשיח." },
  { name: "רצינות", desc: "לגשת לדברים בכובד ראש ולא לזלזל בשום דבר." },
  { name: "רעות", desc: "לבנות חברויות אמיתיות שמחזיקות לאורך זמן." },
  { name: "שאפתנות", desc: "לרצות להשיג דברים גדולים ולעמוד מאחורי זה." },
  { name: "שוויון", desc: "להאמין שכל אדם ראוי ליחס שווה ולהזדמנות שווה." },
  { name: "שונות", desc: "לחגוג ייחודיות ולא לנסות להיות כמו כולם." },
  { name: "שותפות", desc: "לבנות דרכים משותפות עם אחרים, לא לפעול לבד." },
  { name: "שחרור", desc: "לשחרר מה שמכביד ולפנות מקום לחדש." },
  { name: "שייכות", desc: "להרגיש חלק ממשהו — קבוצה, קהילה, משפחה." },
  { name: "שיפור מתמיד", desc: "לא להסתפק במה שיש — תמיד לשאוף ליותר." },
  { name: "שיתוף", desc: "לחלוק עם אחרים — ידע, חוויות, רגשות." },
  { name: "שיתוף פעולה", desc: "לפעול יחד ולמנף את הכוח המשותף." },
  { name: "שלווה", desc: "לחיות ברוגע פנימי עמוק, מעבר לרעש של החיים." },
  { name: "שלום", desc: "לפעול למען שלום — בבית, בקהילה, בעולם." },
  { name: "שליטה", desc: "להרגיש שאתה זה שמוביל את חייך, לא ההיפך." },
  { name: "שלמות", desc: "לחפש תחושת שלמות — בין ערכים לבין מעשים." },
  { name: "שמחה", desc: "לפעול למען שמחה — שלך ושל הסביבה." },
  { name: "שמחת חיים", desc: "לחגוג את החיים עצמם, גם ברגעים קטנים." },
  { name: "שמירה על הטבע", desc: "לפעול כשומר על הסביבה הטבעית לדורות הבאים." },
  { name: "שפע", desc: "לראות בעולם מקום של אפשרויות ולא מחסור." },
  { name: "שקט", desc: "לחפש שקט — פיזי ומנטלי — כמשאב חיוני." },
  { name: "שקיפות", desc: "לפעול בפתיחות כך שאחרים יוכלו לסמוך עליך." },
  { name: "תושייה", desc: "למצוא פתרונות יצירתיים גם כשהמשאבים מוגבלים." },
  { name: "תמימות", desc: "לשמר תמימות ואמונה בטוב גם אחרי אכזבות." },
  { name: "תעוזה", desc: "לעשות את מה שמפחיד, כשיש לזה סיבה טובה." },
  { name: "תקווה", desc: "להאמין שדברים יכולים להשתפר, גם כשקשה." },
  { name: "תקשורת", desc: "לבטא ולהקשיב בצורה שמחברת ולא מרחיקה." },
  { name: "תרבות", desc: "להעריך ולשמר יצירה, שפה ומורשת אנושית." },
  { name: "תרומה", desc: "להשאיר את המקום שלך יותר טוב ממה שמצאת." },
  { name: "תרומה חברתית", desc: "לפעול לטובת הכלל ולא רק לטובת עצמך." },
];

function ValuesView({ data, save }) {
  const [selected, setSelected] = useState(data.values || []);
  const [expandedValue, setExpandedValue] = useState(null);
  const [search, setSearch] = useState("");
  const [gamePhase, setGamePhase] = useState(data.values?.length > 0 ? "values" : "game");

  function toggleValue(name) {
    let newSelected;
    if (selected.includes(name)) {
      newSelected = selected.filter(v => v !== name);
    } else {
      if (selected.length >= 5) return;
      newSelected = [...selected, name];
    }
    setSelected(newSelected);
    save({ ...data, values: newSelected });
  }

  function handleGameFinish(topValues, heroIds) {
    const snapshot = {
      id: Date.now(),
      date: new Date().toLocaleDateString("he-IL"),
      heroes: heroIds,
      suggestedValues: topValues,
      chosenValues: [],
    };
    const snapshots = [...(data.valueSnapshots || []), snapshot];
    save({ ...data, valueSnapshots: snapshots });
    setGamePhase("values");
  }

  const filtered = search.trim()
    ? ALL_VALUES.filter(v => v.name.includes(search.trim()))
    : ALL_VALUES;

  if (gamePhase === "game") {
    return <HeroGame onFinish={handleGameFinish} />;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          בחר עד 5 ערכים — לחץ על ערך לתיאור.
        </p>
        <button onClick={() => setGamePhase("game")} style={{
          padding: "7px 14px", borderRadius: 10, fontSize: 12, cursor: "pointer", flexShrink: 0,
          background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)",
          color: "#c4b5fd"
        }}>🏆 חזור למשחק</button>
      </div>

      {selected.length > 0 && (
        <div style={{
          padding: 16, borderRadius: 14, marginBottom: 20,
          background: selected.length === 5 ? "rgba(234,179,8,0.08)" : "rgba(124,58,237,0.08)",
          border: selected.length === 5 ? "1px solid rgba(234,179,8,0.25)" : "1px solid rgba(124,58,237,0.2)"
        }}>
          <p style={{ color: selected.length === 5 ? "#fbbf24" : "#c4b5fd", fontWeight: 600, margin: "0 0 10px", fontSize: 13 }}>
            {selected.length === 5 ? "✨ המצפן שלך לשנה הזו" : `✓ בחרת ${selected.length}/5 ערכים`}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {selected.map(v => (
              <div key={v} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "6px 14px",
                borderRadius: 30, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.4)"
              }}>
                <span style={{ color: "#e9d5ff", fontSize: 14, fontWeight: 500 }}>{v}</span>
                <button onClick={() => toggleValue(v)} style={{
                  background: "none", border: "none", color: "#9ca3af",
                  cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0
                }}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="חפש ערך..."
        style={{
          width: "100%", padding: "10px 16px", borderRadius: 12, boxSizing: "border-box",
          background: "#f3f4f6", border: "1px solid #d1d5db",
          color: "#1e1b4b", fontSize: 14, outline: "none", direction: "rtl", marginBottom: 16
        }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {filtered.map(v => {
          const isSelected = selected.includes(v.name);
          const isExpanded = expandedValue === v.name;
          const isDisabled = !isSelected && selected.length >= 5;

          return (
            <div key={v.name} style={{ position: "relative" }}>
              <button
                onClick={() => setExpandedValue(isExpanded ? null : v.name)}
                style={{
                  padding: "8px 14px", borderRadius: 10, fontSize: 14, cursor: isDisabled ? "not-allowed" : "pointer",
                  background: isSelected ? "rgba(124,58,237,0.15)" : isExpanded ? "#e5e7eb" : "#f9fafb",
                  border: isSelected ? "1px solid rgba(124,58,237,0.6)" : "1px solid #e5e7eb",
                  color: isSelected ? "#e9d5ff" : isDisabled ? "rgba(255,255,255,0.25)" : "#fff",
                  transition: "all 0.15s"
                }}
              >
                {isSelected && <span style={{ marginLeft: 6 }}>✓</span>}
                {v.name}
              </button>

              {isExpanded && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 50,
                  width: 240, padding: "14px 16px", borderRadius: 12,
                  background: "#ffffff", border: "1px solid rgba(124,58,237,0.4)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
                }}>
                  <p style={{ color: "#c4b5fd", fontWeight: 600, margin: "0 0 6px", fontSize: 14 }}>{v.name}</p>
                  <p style={{ color: "#4b5563", fontSize: 13, margin: "0 0 12px", lineHeight: 1.6 }}>{v.desc}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => { toggleValue(v.name); setExpandedValue(null); }} style={{
                      flex: 1, padding: "8px", borderRadius: 8, fontSize: 13, cursor: isDisabled && !isSelected ? "not-allowed" : "pointer",
                      background: isSelected ? "rgba(239,68,68,0.15)" : "rgba(124,58,237,0.4)",
                      border: isSelected ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(124,58,237,0.5)",
                      color: isSelected ? "#fca5a5" : "#fff"
                    }}>
                      {isSelected ? "הסר" : isDisabled ? "כבר 5 ✓" : "בחר ➕"}
                    </button>
                    <button onClick={() => setExpandedValue(null)} style={{
                      padding: "8px 12px", borderRadius: 8, fontSize: 13,
                      background: "#f9fafb", border: "1px solid #e5e7eb",
                      color: "#6b7280", cursor: "pointer"
                    }}>סגור</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
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
        background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(168,85,247,0.03) 100%)",
        border: "1px solid rgba(124,58,237,0.3)"
      }}>
        <h2 style={{ color: "#c4b5fd", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>טקס פתיחה</h2>
        <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
          היום אנחנו מתחילים במסע משותף. זה לא מסע דתי או מסורתי, אלא מסע של התבגרות. מסע שבו אתה מתחיל להוביל את החיים שלך בצעד ראשון.
        </p>
        <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.8, margin: "12px 0 0" }}>
          יש בך המון שכל, רגישות, מחשבה, כח, לב גדול ואכפתיות עצומה. השנה הזו נועדה לעזור לך להכיר את עצמך טוב יותר, להעז יותר, לקחת אחריות אמיתית.
        </p>
      </div>

      <h3 style={{ color: "#1e1b4b", fontSize: 17, fontWeight: 600, margin: "0 0 16px" }}>אמנת התבגרות המשפחתית</h3>
      {commitments.map((c, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px",
          marginBottom: 10, borderRadius: 12,
          background: "#ffffff", border: "1px solid #e5e7eb"
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#c4b5fd", fontSize: 13, fontWeight: 700
          }}>{i + 1}</div>
          <p style={{ color: "#374151", fontSize: 15, margin: 0, lineHeight: 1.6 }}>{c}</p>
        </div>
      ))}

      <div style={{
        marginTop: 24, padding: 20, borderRadius: 14,
        background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)"
      }}>
        <p style={{ color: "#6ee7b7", fontWeight: 600, margin: "0 0 6px" }}>הבטחה מאיתנו</p>
        <p style={{ color: "#4b5563", fontSize: 14, margin: 0, lineHeight: 1.7 }}>
          אנחנו מתחייבות להיות לצידך במסע הזה. לא להוביל במקומך, לא לפתור עבורך, לא להחליט — אלא לצעוד לצידך, לשאול, להקשיב, לאתגר כשצריך ולתמוך תמיד.
        </p>
      </div>
    </div>
  );
}

const HEROES = [
  {
    id: "mandela",
    name: "נלסון מנדלה",
    title: "מנהיג, לוחם חופש, נשיא דרום אפריקה",
    wiki: "Nelson_Mandela",
    bio: "בילה 27 שנה בכלא בגלל מאבקו נגד אפרטהייד, ויצא ממנו ללא שנאה. הפך לנשיא דרום אפריקה החופשית ולסמל של סליחה, כוח ושינוי.",
    values: ["צדק", "סליחה", "נחישות", "שוויון", "אומץ", "מנהיגות", "הובלה"],
  },
  {
    id: "messi",
    name: "ליאונל מסי",
    title: "שחקן הכדורגל הטוב בהיסטוריה",
    wiki: "Lionel_Messi",
    bio: "ילד קטן שנאמר לו שגופו לא מתאים לכדורגל. לא ויתר, לא התגאה, תמיד עבד קשה יותר מכולם. הוכיח שהתמדה ואהבה לדבר הם הכלי האמיתי.",
    values: ["התמדה", "ענווה", "מצוינות", "שאפתנות", "מחויבות", "משפחה", "יצירתיות"],
  },
  {
    id: "anne",
    name: "אנה פרנק",
    title: "נערה יהודייה, כותבת יומן, סמל תקווה",
    wiki: "Anne_Frank",
    bio: "נסתרה שנתיים עם משפחתה במחבוא מהנאצים. כתבה יומן שנהפך לאחד הספרים הנקראים ביותר בעולם — תיעוד של תקווה, אנושיות ואמונה בטוב גם בחושך.",
    values: ["תקווה", "אמת", "אנושיות", "אותנטיות", "אמונה", "ביטוי עצמי"],
  },
  {
    id: "jobs",
    name: "סטיב ג'ובס",
    title: "מייסד אפל, חלוץ עיצוב וטכנולוגיה",
    wiki: "Steve_Jobs",
    bio: "ילד מאומץ שנשר מהאוניברסיטה ובנה את החברה הכי שווה בעולם. האמין שעיצוב ופשטות יכולים לשנות את האנושות.",
    values: ["חדשנות", "אסתטיקה", "פרפקציוניזם", "יצירתיות", "פשטות", "מקוריות"],
  },
  {
    id: "teresa",
    name: "אמא תרזה",
    title: "נזירה, זוכת פרס נובל לשלום",
    wiki: "Mother_Teresa",
    bio: "בחרה לוותר על חייה הנוחים ולחיות בין העניים ביותר בקלקוטה. טיפלה באנשים שאיש לא רצה לגעת בהם. אמרה: \"אם תשפוט אנשים, לא יהיה לך זמן לאהוב אותם.\"",
    values: ["חמלה", "נדיבות", "נתינה", "אהבה", "ענווה", "התמסרות", "עזרה לזולת"],
  },
  {
    id: "einstein",
    name: "אלברט איינשטיין",
    title: "פיזיקאי, מדען, פילוסוף",
    wiki: "Albert_Einstein",
    bio: "נכשל בבחינות קבלה, עבד כפקיד פטנטים, וגילה את תורת היחסות בזמנו החופשי. האמין שסקרנות היא המתנה הכי גדולה של האדם.",
    values: ["סקרנות", "חשיבה", "יצירתיות", "ידע", "חופש", "ביטוי עצמי", "הגיון"],
  },
  {
    id: "malala",
    name: "מלאלה יוספזאי",
    title: "פעילת זכויות, צעירה זוכת פרס נובל",
    wiki: "Malala_Yousafzai",
    bio: "בת 15 שנורתה בראשה על ידי הטליבאן כי הלכה לבית ספר. שרדה והפכה לקול הכי חזק בעולם עבור זכות חינוך לכל ילדה.",
    values: ["אומץ", "חינוך", "צדק", "עשיית הבדל", "השפעה", "נחישות", "שוויון"],
  },
  {
    id: "ronaldo",
    name: "כריסטיאנו רונאלדו",
    title: "שחקן כדורגל, מכונת אימון",
    wiki: "Cristiano_Ronaldo",
    bio: "גדל בעוני בפורטוגל, חלה בלב בגיל 15. אחרי ניתוח חזר לאמן כפול. הראשון שמגיע לאימון והאחרון שעוזב. הוכיח שאין תחליף למשמעת.",
    values: ["משמעת עצמית", "חריצות", "התמדה", "הישגיות", "שאפתנות", "מצוינות", "כוח"],
  },
  {
    id: "obama",
    name: "ברק אובמה",
    title: "נשיא ארה\"ב ה-44, הראשון שחור",
    wiki: "Barack_Obama",
    bio: "גדל ללא אב, בין שתי תרבויות, ועלה להיות הנשיא הראשון ממוצא אפריקאי של ארה\"ב. האמין שמילים ודיאלוג יכולים לשנות מדינות.",
    values: ["תקווה", "אחדות", "מנהיגות", "תקשורת", "שוויון", "הובלה", "שייכות"],
  },
  {
    id: "diana",
    name: "נסיכת דיאנה",
    title: "נסיכת וולס, \"נסיכת הלבבות\"",
    wiki: "Diana,_Princess_of_Wales",
    bio: "ויתרה על הפרוטוקול המלכותי ויצאה לחבק חולי איידס ולבקר ילדים בבתי חולים. אמרה: \"הלב שלי מרגיש חופשי כשאני נותנת לאחרים.\"",
    values: ["אמפתיה", "חמלה", "אנושיות", "נדיבות", "אהדה", "אהבה"],
  },
  {
    id: "hawking",
    name: "סטיבן הוקינג",
    title: "פיזיקאי, קוסמולוג, סמל התגברות",
    wiki: "Stephen_Hawking",
    bio: "אובחן עם מחלה ניוונית בגיל 21 ונאמר לו שיחיה 2 שנים. חי עד גיל 76 וגילה את סודות היקום מכיסא גלגלים. אמר: \"כל עוד יש חיים, יש תקווה.\"",
    values: ["התמדה", "סקרנות", "אופטימיות", "יצירתיות", "ידע", "הומור", "עוצמה"],
  },
  {
    id: "mandela_winnie",
    name: "מלאלה — שנית",
    title: "ראה למעלה",
    wiki: "Marie_Curie",
    bio: "האישה הראשונה שזכתה בפרס נובל — ובתחומים שניים שונים. עבדה בתנאים קשים ללא הכרה, הוכיחה שמגדר אינו מגבלה.",
    values: ["נחישות", "ידע", "יצירתיות", "שוויון", "חריצות", "מצוינות", "פריצת דרך"],
  },
];

// Fix the last hero
HEROES[11] = {
  id: "curie",
  name: "מארי קירי",
  title: "מדענית, פורצת דרך, זוכת נובל פעמיים",
  wiki: "Marie_Curie",
  bio: "האישה הראשונה שזכתה בפרס נובל — ובשני תחומים שונים. עבדה בתנאים קשים ללא הכרה, הוכיחה שמגדר אינו מגבלה לגדולה.",
  values: ["נחישות", "ידע", "יצירתיות", "שוויון", "חריצות", "מצוינות"],
};

function HeroCard({ hero, isSelected, isDisabled, onExpand, isExpanded, onToggle, onClose }) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${hero.wiki}`)
      .then(r => r.json())
      .then(d => { if (d.thumbnail?.source) setImgUrl(d.thumbnail.source); })
      .catch(() => {});
  }, [hero.wiki]);

  return (
    <div style={{
      borderRadius: 16, overflow: "visible", position: "relative",
      border: isSelected ? "2px solid #7c3aed" : "1px solid #e5e7eb",
      background: isSelected ? "rgba(124,58,237,0.1)" : "#fafafa",
      opacity: isDisabled ? 0.4 : 1, transition: "all 0.2s"
    }}>
      <button onClick={() => onExpand(isExpanded ? null : hero.id)} style={{
        width: "100%", background: "none", border: "none",
        cursor: isDisabled ? "not-allowed" : "pointer",
        padding: 14, textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8
      }}>
        <div style={{ position: "relative" }}>
          {imgUrl ? (
            <img src={imgUrl} alt={hero.name} style={{
              width: 80, height: 80, borderRadius: "50%", objectFit: "cover", objectPosition: "top",
              border: isSelected ? "3px solid #7c3aed" : "2px solid rgba(255,255,255,0.1)"
            }} />
          ) : (
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(124,58,237,0.1)", border: "2px solid rgba(124,58,237,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28
            }}>
              {hero.name[0]}
            </div>
          )}
          {isSelected && (
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: 24, height: 24, borderRadius: "50%",
              background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, color: "#1e1b4b", border: "2px solid #0a0a1a"
            }}>✓</div>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 13, margin: "0 0 2px" }}>{hero.name}</p>
          <p style={{ color: "#9ca3af", fontSize: 10, margin: 0, lineHeight: 1.4 }}>{hero.title}</p>
        </div>
      </button>

      {isExpanded && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)",
          right: 0, left: 0, zIndex: 200,
          padding: "16px", borderRadius: 14,
          background: "#ffffff", border: "1px solid rgba(124,58,237,0.5)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.8)"
        }}>
          {imgUrl && (
            <img src={imgUrl} alt={hero.name} style={{
              width: 56, height: 56, borderRadius: "50%", objectFit: "cover", objectPosition: "top",
              float: "right", marginRight: 0, marginLeft: 12, marginBottom: 4,
              border: "2px solid rgba(124,58,237,0.4)"
            }} />
          )}
          <p style={{ color: "#c4b5fd", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>{hero.name}</p>
          <p style={{ color: "#4b5563", fontSize: 12, margin: "0 0 10px", lineHeight: 1.6, clear: "both" }}>{hero.bio}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
            {hero.values.slice(0, 4).map(v => (
              <span key={v} style={{
                padding: "3px 10px", borderRadius: 20, fontSize: 11,
                background: "rgba(124,58,237,0.1)", color: "#c4b5fd",
                border: "1px solid rgba(124,58,237,0.3)"
              }}>{v}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {!isDisabled && (
              <button onClick={() => { onToggle(hero.id); onClose(); }} style={{
                flex: 1, padding: "8px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                background: isSelected ? "rgba(239,68,68,0.2)" : "rgba(124,58,237,0.5)",
                border: isSelected ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(124,58,237,0.6)",
                color: isSelected ? "#fca5a5" : "#fff", fontWeight: 600
              }}>
                {isSelected ? "הסר מהצוות" : "הוסף לצוות ➕"}
              </button>
            )}
            <button onClick={onClose} style={{
              padding: "8px 12px", borderRadius: 8, fontSize: 12,
              background: "#f9fafb", border: "1px solid #e5e7eb",
              color: "#6b7280", cursor: "pointer"
            }}>סגור</button>
          </div>
        </div>
      )}
    </div>
  );
}

function HeroGame({ onFinish }) {
  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [phase, setPhase] = useState("pick");

  function toggleHero(id) {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  }

  function computeResult() {
    const counts = {};
    selected.forEach(id => {
      const hero = HEROES.find(h => h.id === id);
      hero.values.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([v]) => v);
  }

  if (phase === "result") {
    const topValues = computeResult();
    const pickedHeroes = HEROES.filter(h => selected.includes(h.id));
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔍</div>
          <h2 style={{ color: "#1e1b4b", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>הצוות שלך מגלה משהו</h2>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
            בחרת ב{pickedHeroes.map(h => h.name).join(", ")}
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28 }}>
          {pickedHeroes.map(h => (
            <HeroAvatar key={h.id} hero={h} size={64} />
          ))}
        </div>

        <div style={{
          padding: 20, borderRadius: 16, marginBottom: 20,
          background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.3)"
        }}>
          <p style={{ color: "#c4b5fd", fontWeight: 600, fontSize: 15, margin: "0 0 14px" }}>
            הערכים שמאפיינים את הצוות שלך:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {topValues.map((v, i) => (
              <div key={v} style={{
                padding: "8px 16px", borderRadius: 30, fontSize: 14, fontWeight: 500,
                background: i < 3 ? "rgba(124,58,237,0.2)" : "#f3f4f6",
                border: i < 3 ? "1px solid rgba(124,58,237,0.6)" : "1px solid #e5e7eb",
                color: i < 3 ? "#e9d5ff" : "rgba(255,255,255,0.6)"
              }}>
                {i < 3 && <span style={{ marginLeft: 6 }}>⭐</span>}
                {v}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          padding: 18, borderRadius: 14, marginBottom: 24,
          background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)"
        }}>
          <p style={{ color: "#6ee7b7", fontSize: 13, margin: 0, lineHeight: 1.7 }}>
            💡 הערכים המודגשים בכוכב הם הכי חזקים אצלך לפי הבחירות שלך. השתמש בהם כנקודת מוצא כשתבחר את 5 הערכים שלך.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => { setSelected([]); setPhase("pick"); }} style={{
            flex: 1, padding: "12px", borderRadius: 12,
            background: "#f3f4f6", border: "1px solid #e5e7eb",
            color: "#4b5563", fontSize: 15, cursor: "pointer"
          }}>
            🔄 שחק שוב
          </button>
          <button onClick={() => onFinish(topValues, selected)} style={{
            flex: 2, padding: "12px", borderRadius: 12,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            border: "none", color: "#1e1b4b", fontSize: 15, fontWeight: 600, cursor: "pointer"
          }}>
            בחר את 5 הערכים שלי ←
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
        <h2 style={{ color: "#1e1b4b", fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>בנה את הצוות שלך</h2>
        <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 4px" }}>
          בחר 3 דמויות שהיית רוצה שיהיו לצידך במסע הזה
        </p>
        <p style={{ color: selected.length === 3 ? "#a855f7" : "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 600 }}>
          {selected.length}/3 נבחרו
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {HEROES.map(hero => (
          <HeroCard
            key={hero.id}
            hero={hero}
            isSelected={selected.includes(hero.id)}
            isDisabled={!selected.includes(hero.id) && selected.length >= 3}
            isExpanded={expanded === hero.id}
            onExpand={setExpanded}
            onToggle={toggleHero}
            onClose={() => setExpanded(null)}
          />
        ))}
      </div>

      {selected.length === 3 && (
        <button onClick={() => setPhase("result")} style={{
          width: "100%", padding: "14px", borderRadius: 14,
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          border: "none", color: "#1e1b4b", fontSize: 16, fontWeight: 700, cursor: "pointer"
        }}>
          גלה מה הצוות שלך אומר עליך ←
        </button>
      )}
    </div>
  );
}

function HeroAvatar({ hero, size = 64 }) {
  const [imgUrl, setImgUrl] = useState(null);
  useEffect(() => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${hero.wiki}`)
      .then(r => r.json())
      .then(d => { if (d.thumbnail?.source) setImgUrl(d.thumbnail.source); })
      .catch(() => {});
  }, [hero.wiki]);
  return (
    <div style={{ textAlign: "center" }}>
      {imgUrl
        ? <img src={imgUrl} alt={hero.name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "2px solid #7c3aed" }} />
        : <div style={{ width: size, height: size, borderRadius: "50%", background: "rgba(124,58,237,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "2px solid #7c3aed" }}>{hero.name[0]}</div>
      }
      <p style={{ color: "#c4b5fd", fontSize: 11, margin: "6px 0 0" }}>{hero.name.split(" ")[0]}</p>
    </div>
  );
}

const SNAPSHOT_COLORS = ["#7c3aed", "#0ea5e9", "#f59e0b", "#10b981", "#ec4899", "#f97316"];

function ValuesMapView({ data, save }) {
  const snapshots = data.valueSnapshots || [];
  const [selected, setSelected] = useState(
    snapshots.length > 0 ? [snapshots[snapshots.length - 1].id] : []
  );

  // Collect all unique values ever suggested
  const allSuggested = [...new Set(snapshots.flatMap(s => s.suggestedValues || []))];
  // Also include chosen values
  const allChosen = [...new Set(snapshots.flatMap(s => s.chosenValues || []))];
  const allValues = [...new Set([...allSuggested, ...allChosen, ...(data.values || [])])];

  function toggleSnapshot(id) {
    if (selected.includes(id)) {
      if (selected.length > 1) setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  function deleteSnapshot(id) {
    const newSnaps = (data.valueSnapshots || []).filter(s => s.id !== id);
    save({ ...data, valueSnapshots: newSnaps });
    setSelected(prev => prev.filter(s => s !== id));
  }

  // Build value frequency map per snapshot
  function getValueScore(snapshotId, value) {
    const snap = snapshots.find(s => s.id === snapshotId);
    if (!snap) return 0;
    const suggested = snap.suggestedValues || [];
    const chosen = snap.chosenValues || [];
    const idx = suggested.indexOf(value);
    if (chosen.includes(value)) return 3;
    if (idx === 0 || idx === 1 || idx === 2) return 2;
    if (idx >= 0) return 1;
    return 0;
  }

  const visibleSnapshots = snapshots.filter(s => selected.includes(s.id));

  if (snapshots.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
        <p style={{ color: "#1e1b4b", fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>מפת הערכים ריקה עדיין</p>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
          שחק את משחק הדמויות כדי ליצור את הצילום הראשון שלך
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 12px" }}>
          בחר צילומים להשוואה:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {snapshots.map((snap, i) => {
            const isSel = selected.includes(snap.id);
            const color = SNAPSHOT_COLORS[i % SNAPSHOT_COLORS.length];
            const heroes = (snap.heroes || []).map(id => HEROES.find(h => h.id === id)?.name.split(" ")[0]).filter(Boolean);
            return (
              <div key={snap.id} style={{ position: "relative" }}>
                <button onClick={() => toggleSnapshot(snap.id)} style={{
                  padding: "8px 14px", borderRadius: 10, fontSize: 12, cursor: "pointer",
                  background: isSel ? `${color}25` : "#ffffff",
                  border: isSel ? `1.5px solid ${color}` : "1px solid #e5e7eb",
                  color: isSel ? "#fff" : "rgba(255,255,255,0.5)",
                  display: "flex", alignItems: "center", gap: 8
                }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
                  <span>{snap.date}</span>
                  {heroes.length > 0 && <span style={{ color: "#9ca3af", fontSize: 10 }}>({heroes.join(", ")})</span>}
                </button>
                <button onClick={() => deleteSnapshot(snap.id)} style={{
                  position: "absolute", top: -6, left: -6, width: 18, height: 18,
                  borderRadius: "50%", background: "rgba(239,68,68,0.8)", border: "none",
                  color: "#1e1b4b", fontSize: 10, cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center", lineHeight: 1, zIndex: 10
                }}>×</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current chosen values from the active profile */}
      {data.values?.length > 0 && (
        <div style={{
          padding: "12px 16px", borderRadius: 12, marginBottom: 20,
          background: "rgba(234,179,8,0.07)", border: "1px solid rgba(234,179,8,0.2)"
        }}>
          <p style={{ color: "#fbbf24", fontWeight: 600, fontSize: 13, margin: "0 0 8px" }}>⭐ הערכים שבחרת כרגע</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {data.values.map(v => (
              <span key={v} style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 13,
                background: "rgba(234,179,8,0.15)", color: "#fef08a",
                border: "1px solid rgba(234,179,8,0.3)"
              }}>{v}</span>
            ))}
          </div>
        </div>
      )}

      {/* Value map grid */}
      {visibleSnapshots.length > 0 && (
        <div>
          <p style={{ color: "#9ca3af", fontSize: 12, margin: "0 0 12px" }}>
            ⬛ לא הופיע &nbsp; 🟦 הוצע &nbsp; ⭐ הוצע בחוזקה &nbsp; 💛 נבחר
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", direction: "rtl" }}>
              <thead>
                <tr>
                  <th style={{ color: "#9ca3af", fontSize: 12, fontWeight: 500, padding: "6px 8px", textAlign: "right", minWidth: 90 }}>ערך</th>
                  {visibleSnapshots.map((snap, i) => {
                    const color = SNAPSHOT_COLORS[snapshots.indexOf(snap) % SNAPSHOT_COLORS.length];
                    return (
                      <th key={snap.id} style={{
                        color, fontSize: 11, fontWeight: 600, padding: "6px 8px",
                        textAlign: "center", minWidth: 70
                      }}>
                        {snap.date}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {allValues.map((value, rowIdx) => {
                  const scores = visibleSnapshots.map(s => getValueScore(s.id, value));
                  const hasAny = scores.some(s => s > 0) || data.values?.includes(value);
                  if (!hasAny) return null;
                  return (
                    <tr key={value} style={{ background: rowIdx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                      <td style={{
                        color: data.values?.includes(value) ? "#fbbf24" : "rgba(255,255,255,0.8)",
                        fontSize: 13, padding: "8px", fontWeight: data.values?.includes(value) ? 600 : 400
                      }}>
                        {data.values?.includes(value) ? "⭐ " : ""}{value}
                      </td>
                      {visibleSnapshots.map((snap, i) => {
                        const score = getValueScore(snap.id, value);
                        const color = SNAPSHOT_COLORS[snapshots.indexOf(snap) % SNAPSHOT_COLORS.length];
                        const cell = score === 0 ? { bg: "transparent", text: "—", color: "rgba(255,255,255,0.15)" }
                          : score === 1 ? { bg: `${color}18`, text: "הוצע", color }
                          : score === 2 ? { bg: `${color}30`, text: "⭐ חזק", color }
                          : { bg: "rgba(234,179,8,0.2)", text: "💛 נבחר", color: "#fbbf24" };
                        return (
                          <td key={snap.id} style={{ textAlign: "center", padding: "6px 4px" }}>
                            <span style={{
                              display: "inline-block", padding: "3px 8px", borderRadius: 6, fontSize: 11,
                              background: cell.bg, color: cell.color,
                              border: score > 0 ? `1px solid ${cell.color}40` : "none"
                            }}>{cell.text}</span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Timeline visual */}
      {snapshots.length > 1 && (
        <div style={{ marginTop: 28, padding: 20, borderRadius: 16, background: "#fafafa", border: "1px solid #e9ecef" }}>
          <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 16px", fontWeight: 600 }}>ציר זמן — שינויים בערכים</p>
          {allValues.filter(v => {
            const scores = snapshots.map(s => getValueScore(s.id, v));
            return scores.some(s => s > 0);
          }).slice(0, 12).map(value => {
            const scores = snapshots.map((s, i) => ({
              date: s.date, score: getValueScore(s.id, value),
              color: SNAPSHOT_COLORS[i % SNAPSHOT_COLORS.length]
            }));
            const maxScore = Math.max(...scores.map(s => s.score));
            if (maxScore === 0) return null;
            return (
              <div key={value} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: data.values?.includes(value) ? "#fbbf24" : "rgba(255,255,255,0.7)", fontSize: 13 }}>
                    {data.values?.includes(value) ? "⭐ " : ""}{value}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  {scores.map((s, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <div style={{
                        width: 32, height: s.score === 0 ? 6 : s.score === 1 ? 14 : s.score === 2 ? 22 : 30,
                        borderRadius: 4, background: s.score === 0 ? "#f3f4f6" : s.color,
                        opacity: s.score === 0 ? 1 : 0.6 + s.score * 0.13,
                        transition: "height 0.4s ease"
                      }} />
                      <span style={{ color: "#d1d5db", fontSize: 9 }}>{s.date.split("/").slice(0, 2).join("/")}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const NAV_IDO = [
  { id: "tasks", label: "משימות", icon: "✓" },
  { id: "progress", label: "התקדמות", icon: "📊" },
  { id: "journal", label: "יומן", icon: "📝" },
  { id: "map", label: "מפה", icon: "🗺️" },
  { id: "manifesto", label: "המסע", icon: "🧭" },
];

const NAV_PARENT = [
  { id: "progress", label: "התקדמות", icon: "📊" },
  { id: "tasks", label: "משימות", icon: "✓" },
  { id: "journal", label: "הערות", icon: "📝" },
  { id: "map", label: "מפה", icon: "🗺️" },
  { id: "manifesto", label: "המסע", icon: "🧭" },
];

export default function App() {
  const [role, setRole] = useState("kid");
  const session = role === "kid"
    ? { key: "ido", name: "עידו", role: "kid" }
    : { key: "parents", name: "ההורים", role: "parent" };
  const [tab, setTab] = useState("tasks");
  const [data, save] = useStorage();

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f2ff" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid #7c3aed", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#7c3aed", fontSize: 14 }}>טוען...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  const isParent = session.role === "parent";
  const nav = isParent ? NAV_PARENT : NAV_IDO;
  const totalDone = ALL_TASKS.filter(t => data.completed[t.id]).length;
  const overallPct = Math.round((totalDone / TOTAL_TASKS) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f2ff", fontFamily: "'Segoe UI', Tahoma, sans-serif", direction: "rtl" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        * { box-sizing: border-box; }
        button { font-family: 'Segoe UI', Tahoma, sans-serif; }
        textarea, input, select { font-family: 'Segoe UI', Tahoma, sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f4f2ff; }
        ::-webkit-scrollbar-thumb { background: #c4b5fd; border-radius: 3px; }
      `}</style>

      {/* Top Navigation */}
      <header style={{
        background: "#ffffff", borderBottom: "1px solid #e5e7eb",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 8px rgba(124,58,237,0.08)"
      }}>
        {/* Progress bar */}
        <div style={{ height: 3, background: "#f3f4f6" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg, #7c3aed, #a855f7)", width: `${overallPct}%`, transition: "width 0.6s ease" }} />
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧭</div>
            <div>
              <p style={{ color: "#1e1b4b", fontWeight: 700, margin: 0, fontSize: 14, lineHeight: 1.2 }}>שנת בר מצווה</p>
              <p style={{ color: "#9ca3af", fontSize: 11, margin: 0 }}>{overallPct}% הושלם</p>
            </div>
          </div>

          {/* Nav tabs */}
          <nav style={{ display: "flex", gap: 2 }}>
            {nav.map(n => (
              <button key={n.id} onClick={() => setTab(n.id)} style={{
                padding: "8px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer",
                background: tab === n.id ? "rgba(124,58,237,0.1)" : "transparent",
                border: "none",
                color: tab === n.id ? "#7c3aed" : "#6b7280",
                fontWeight: tab === n.id ? 600 : 400,
                display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s"
              }}>
                <span style={{ fontSize: 15 }}>{n.icon}</span>
                <span>{n.label}</span>
              </button>
            ))}
          </nav>

          {/* Role switcher */}
          <button onClick={() => { setRole(r => r === "kid" ? "parent" : "kid"); setTab("tasks"); }} style={{
            padding: "7px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
            background: "rgba(124,58,237,0.08)", border: "1.5px solid rgba(124,58,237,0.2)",
            color: "#7c3aed", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, flexShrink: 0
          }}>
            {role === "kid" ? "👩‍👩‍👦 הורים" : "👦 עידו"}
          </button>
        </div>
      </header>

      {/* Page content */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 60px" }}>
        {tab === "tasks" && <TasksView data={data} save={save} isParent={isParent} />}
        {tab === "progress" && <ProgressView data={data} />}
        {tab === "journal" && <JournalView data={data} save={save} isParent={isParent} />}
        {tab === "map" && <ValuesMapView data={data} save={save} />}
        {tab === "manifesto" && <ManifestoView />}
      </main>
    </div>
  );
}
