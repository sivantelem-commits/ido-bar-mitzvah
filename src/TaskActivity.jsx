import { useState } from "react";

// ─── Shared UI helpers ────────────────────────────────────────────────────────

function Card({ children, style }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 16, padding: 20, ...style
    }}>{children}</div>
  );
}

function Label({ children }) {
  return <p style={{ color: "#c4b5fd", fontWeight: 600, fontSize: 14, margin: "0 0 10px" }}>{children}</p>;
}

function TextInput({ value, onChange, placeholder, multiline }) {
  const style = {
    width: "100%", padding: "12px 14px", borderRadius: 12, boxSizing: "border-box",
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    color: "#fff", fontSize: 14, outline: "none", direction: "rtl",
    fontFamily: "inherit", lineHeight: 1.6, resize: "vertical"
  };
  return multiline
    ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={style} />
    : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />;
}

function ChipSelect({ options, value, onChange, multi }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(opt => {
        const sel = multi ? value.includes(opt) : value === opt;
        return (
          <button key={opt} onClick={() => {
            if (multi) onChange(sel ? value.filter(v => v !== opt) : [...value, opt]);
            else onChange(sel ? "" : opt);
          }} style={{
            padding: "8px 16px", borderRadius: 30, fontSize: 13, cursor: "pointer",
            background: sel ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)",
            border: sel ? "1.5px solid #7c3aed" : "1px solid rgba(255,255,255,0.1)",
            color: sel ? "#e9d5ff" : "rgba(255,255,255,0.6)", transition: "all 0.15s"
          }}>{opt}</button>
        );
      })}
    </div>
  );
}

function Scale({ value, onChange, min = 1, max = 10, label }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{min}</span>
        <input type="range" min={min} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ flex: 1, accentColor: "#7c3aed" }} />
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{max}</span>
        <span style={{
          width: 36, height: 36, borderRadius: "50%", background: "rgba(124,58,237,0.3)",
          border: "1.5px solid #7c3aed", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#c4b5fd", fontWeight: 700, fontSize: 16, flexShrink: 0
        }}>{value}</span>
      </div>
    </div>
  );
}

function Intro({ emoji, title, desc }) {
  return (
    <div style={{
      padding: 20, borderRadius: 14, marginBottom: 20,
      background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.06))",
      border: "1px solid rgba(124,58,237,0.25)"
    }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{emoji}</div>
      <p style={{ color: "#c4b5fd", fontWeight: 700, fontSize: 16, margin: "0 0 6px" }}>{title}</p>
      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, margin: 0, lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}

function ReflectionSection({ questions, values, onChange }) {
  return (
    <Card style={{ marginTop: 16, border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.04)" }}>
      <Label>💭 רפלקציה — אחרי שסיימת</Label>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: i < questions.length - 1 ? 14 : 0 }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "0 0 6px" }}>{q}</p>
          <TextInput multiline value={values[i] || ""} onChange={v => {
            const arr = [...(values || [])];
            arr[i] = v;
            onChange(arr);
          }} placeholder="כתוב כאן..." />
        </div>
      ))}
    </Card>
  );
}

// ─── Individual task activities ───────────────────────────────────────────────

function T1_OpeningCeremony({ state, onChange }) {
  const s = state || { promise: "", word: "", feeling: "" };
  return (
    <div>
      <Intro emoji="🕯️" title="טקס פתיחה"
        desc="היום מתחיל המסע. טקס קצר עם המשפחה — כדי לסמן שמשהו חדש מתחיל. קראו את אמנת ההתבגרות המשפחתית יחד, ואז ענה על השאלות הבאות." />
      <Card>
        <Label>מילה אחת שמתארת איך אתה מרגיש עכשיו</Label>
        <ChipSelect options={["מרגש", "מפחיד", "מוכן", "סקרן", "שמח", "לא בטוח", "נלהב"]}
          value={s.feeling} onChange={v => onChange({ ...s, feeling: v })} />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>הבטחה אחת שאתה נותן לעצמך לשנה הזו</Label>
        <TextInput multiline value={s.promise} onChange={v => onChange({ ...s, promise: v })}
          placeholder="אני מבטיח לעצמי שהשנה אני..." />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>מילה אחת שאתה רוצה שתגדיר אותך בסוף השנה</Label>
        <TextInput value={s.word} onChange={v => onChange({ ...s, word: v })}
          placeholder="לדוגמה: אמיץ, עצמאי, אחראי..." />
      </Card>
    </div>
  );
}

function T2_ValueMap({ state, onChange }) {
  const s = state || { strengths: [], challenges: [], proudOf: "", whoAmI: "" };
  const strengths = s.strengths || [];
  const challenges = s.challenges || [];
  const strengthOpts = ["מאזין טוב", "יצירתי", "חבר אמיתי", "מצחיק", "אחראי", "חושב עמוק", "ספורטאי", "סקרן", "עוזר לאחרים", "עקשן (בצורה טובה)"];
  const challengeOpts = ["ארגון", "לסיים מה שהתחלתי", "לבקש עזרה", "לשחרר כעס", "סבלנות", "לומר לא", "ריכוז", "ניהול זמן"];
  return (
    <div>
      <Intro emoji="🗺️" title="מפת זהות"
        desc="לפני שיוצאים למסע — צריך לדעת מאיפה מתחילים. זו מפה שלך — חוזקות, אתגרים, ומה שמגדיר אותך." />
      <Card>
        <Label>מה הכי חזק בי — בחר עד 4</Label>
        <ChipSelect options={strengthOpts} value={strengths} multi
          onChange={v => v.length <= 4 && onChange({ ...s, strengths: v })} />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>מה אני רוצה לחזק השנה — בחר עד 3</Label>
        <ChipSelect options={challengeOpts} value={challenges} multi
          onChange={v => v.length <= 3 && onChange({ ...s, challenges: v })} />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>דבר אחד שאני הכי גאה בו בעצמי</Label>
        <TextInput multiline value={s.proudOf} onChange={v => onChange({ ...s, proudOf: v })}
          placeholder="אני גאה שאני..." />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>משפט שמגדיר אותי — "אני הוא..."</Label>
        <TextInput value={s.whoAmI} onChange={v => onChange({ ...s, whoAmI: v })}
          placeholder="אני הוא..." />
      </Card>
    </div>
  );
}

function T3_ChooseValues({ state, onChange }) {
  return (
    <div>
      <Intro emoji="⭐" title="5 ערכים מובילים"
        desc="עברת על רשימת הערכים ושיחקת את משחק הדמויות. עכשיו הגיע הזמן לסגור — 5 ערכים שיהיו המצפן שלך לשנה הזו." />
      <Card>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          כדי לבחור ערכים — לך לכרטיסיית <strong style={{ color: "#c4b5fd" }}>⭐ ערכים</strong> ובחר 5 ערכים.
          כשתסיים לחזור לכאן ולסמן הושלם.
        </p>
        {state?.done && (
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}>
            <span style={{ color: "#6ee7b7", fontSize: 13 }}>✓ בחרת את הערכים שלך!</span>
          </div>
        )}
      </Card>
    </div>
  );
}

function T4_Responsibility({ state, onChange }) {
  const s = state || { area: "", standard: "", why: "" };
  const areas = ["כלים", "כביסה", "ניקיון חדר", "אשפה", "קניות", "ניקיון שירותים", "שטיפת רצפה", "טיפול בחיית מחמד"];
  return (
    <div>
      <Intro emoji="🏠" title="אחריות קבועה בבית"
        desc="כל אדם בבית תורם. השנה אתה בוחר תחום אחד שאתה אחראי עליו באמת — לא כי ביקשו ממך, אלא כי זה שלך." />
      <Card>
        <Label>בחר תחום אחריות</Label>
        <ChipSelect options={areas} value={s.area} onChange={v => onChange({ ...s, area: v })} />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>מה הסטנדרט שלך — איך תדע שעשית את זה טוב?</Label>
        <TextInput multiline value={s.standard} onChange={v => onChange({ ...s, standard: v })}
          placeholder="לדוגמה: הכלים נשטפים תוך שעה מהארוחה, ללא תזכורת..." />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>למה בחרת דווקא בזה?</Label>
        <TextInput value={s.why} onChange={v => onChange({ ...s, why: v })}
          placeholder="בחרתי בזה כי..." />
      </Card>
      <ReflectionSection
        questions={["שבוע אחרי — איך הלך? הצלחת לעמוד בסטנדרט?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

function T5_Standard({ state, onChange }) {
  const s = state || { frequency: "", whatIfFail: "", commitment: 5 };
  return (
    <div>
      <Intro emoji="📋" title="סטנדרט ביצוע"
        desc="עכשיו נהפוך את האחריות שבחרת לדבר מדיד. כמה פעמים? מתי בדיוק? מה קורה אם לא?" />
      <Card>
        <Label>באיזו תדירות תעשה את זה?</Label>
        <ChipSelect options={["כל יום", "פעמיים בשבוע", "פעם בשבוע", "כל פעם שצריך"]}
          value={s.frequency} onChange={v => onChange({ ...s, frequency: v })} />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>מה אתה מציע שיקרה אם לא תעשה את זה?</Label>
        <TextInput value={s.whatIfFail} onChange={v => onChange({ ...s, whatIfFail: v })}
          placeholder="אם לא עשיתי, אני מציע ש..." />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Scale value={s.commitment} onChange={v => onChange({ ...s, commitment: v })}
          label="כמה אתה מחויב לזה מ-1 עד 10?" />
      </Card>
    </div>
  );
}

function T6_Feedback({ state, onChange }) {
  const s = state || { whatWorked: "", whatDidnt: "", nextMonth: "", parentFeedback: "" };
  return (
    <div>
      <Intro emoji="🗣️" title="שיחת משוב חודשית"
        desc="שיחה עם ההורים — לא בירור, אלא שיחה אמיתית. מה עבד? מה לא? מה חושבים לעשות אחרת?" />
      <Card>
        <Label>מה עבד טוב החודש?</Label>
        <TextInput multiline value={s.whatWorked} onChange={v => onChange({ ...s, whatWorked: v })}
          placeholder="הצלחתי ב..." />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>מה היה קשה?</Label>
        <TextInput multiline value={s.whatDidnt} onChange={v => onChange({ ...s, whatDidnt: v })}
          placeholder="היה קשה לי ב..." />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>מה אני רוצה לשפר החודש הבא?</Label>
        <TextInput value={s.nextMonth} onChange={v => onChange({ ...s, nextMonth: v })}
          placeholder="החודש הבא אני אתמקד ב..." />
      </Card>
      <Card style={{ marginTop: 12, border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.04)" }}>
        <Label>💬 מה ההורים אמרו? (כתוב בקצרה)</Label>
        <TextInput multiline value={s.parentFeedback} onChange={v => onChange({ ...s, parentFeedback: v })}
          placeholder="ההורים אמרו ש..." />
      </Card>
    </div>
  );
}

function T7_Allowance({ state, onChange }) {
  const s = state || { amount: "", savePct: "", spendOn: "", firstPurchase: "" };
  return (
    <div>
      <Intro emoji="💰" title="דמי ניהול חודשיים"
        desc="מעכשיו יש לך תקציב. לא כסף שמגיע — כסף שאתה מנהל. תקציב הוא כלי, לא מתנה." />
      <Card>
        <Label>כמה כסף תקבל בחודש? (הסכם עם ההורים)</Label>
        <TextInput value={s.amount} onChange={v => onChange({ ...s, amount: v })}
          placeholder="לדוגמה: 150 ₪" />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>כמה אחוז אתה רוצה לחסוך?</Label>
        <ChipSelect options={["10%", "20%", "30%", "50%"]}
          value={s.savePct} onChange={v => onChange({ ...s, savePct: v })} />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>על מה אתה מתכנן לבזבז?</Label>
        <TextInput value={s.spendOn} onChange={v => onChange({ ...s, spendOn: v })}
          placeholder="אני מתכנן לבזבז על..." />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>מה הייתה הקנייה הראשונה שלך מהתקציב?</Label>
        <TextInput value={s.firstPurchase} onChange={v => onChange({ ...s, firstPurchase: v })}
          placeholder="קניתי..." />
      </Card>
    </div>
  );
}

function T8_ExpenseTable({ state, onChange }) {
  const s = state || { entries: [], lesson: "" };
  const entries = s.entries || [];
  function addRow() {
    onChange({ ...s, entries: [...entries, { what: "", amount: "", category: "" }] });
  }
  function updateRow(i, field, val) {
    const newEntries = entries.map((e, idx) => idx === i ? { ...e, [field]: val } : e);
    onChange({ ...s, entries: newEntries });
  }
  const categories = ["אוכל", "בילוי", "ביגוד", "חיסכון", "אחר"];
  return (
    <div>
      <Intro emoji="📊" title="טבלת הוצאות"
        desc="מה שלא רואים — לא מבינים. כתוב כל הוצאה של החודש. בסוף תגלה לאן הכסף הלך." />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Label style={{ margin: 0 }}>הוצאות החודש</Label>
          <button onClick={addRow} style={{
            padding: "6px 14px", borderRadius: 8, background: "rgba(124,58,237,0.3)",
            border: "1px solid rgba(124,58,237,0.5)", color: "#c4b5fd", fontSize: 13, cursor: "pointer"
          }}>+ הוסף</button>
        </div>
        {entries.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
            לחץ "+ הוסף" כדי להתחיל לתעד הוצאות
          </p>
        )}
        {entries.map((e, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
            <input value={e.what} onChange={ev => updateRow(i, "what", ev.target.value)}
              placeholder="מה?" style={{
                flex: 2, padding: "8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, outline: "none"
              }} />
            <input value={e.amount} onChange={ev => updateRow(i, "amount", ev.target.value)}
              placeholder="₪" type="number" style={{
                width: 60, padding: "8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, outline: "none"
              }} />
            <select value={e.category} onChange={ev => updateRow(i, "category", ev.target.value)} style={{
              flex: 1, padding: "8px", borderRadius: 8, background: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 12
            }}>
              <option value="">קטגוריה</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        ))}
        {entries.length > 0 && (
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "rgba(124,58,237,0.1)" }}>
            <span style={{ color: "#c4b5fd", fontSize: 14, fontWeight: 600 }}>
              סה"כ: ₪{entries.reduce((sum, e) => sum + (Number(e.amount) || 0), 0)}
            </span>
          </div>
        )}
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>מה למדת על עצמך מהטבלה הזו?</Label>
        <TextInput multiline value={s.lesson} onChange={v => onChange({ ...s, lesson: v })}
          placeholder="גיליתי שאני..." />
      </Card>
    </div>
  );
}

function T9_NeedsWants({ state, onChange }) {
  const s = state || { examples: [], decision: "", insight: "" };
  const items = [
    { item: "אייפון חדש", answer: "" },
    { item: "ארוחה עם חבר", answer: "" },
    { item: "נעלי נייק", answer: "" },
    { item: "ספר", answer: "" },
    { item: "כרטיס לקונצרט", answer: "" },
  ];
  return (
    <div>
      <Intro emoji="🤔" title="צרכים מול רצונות"
        desc="יש הבדל בין מה שצריך לחיות לבין מה שרוצים. ההבחנה הזו היא אחת הכישורים הכלכליים הכי חשובים שיש." />
      <Card>
        <Label>סווג כל פריט — צורך או רצון?</Label>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>{item.item}</span>
            <div style={{ display: "flex", gap: 6 }}>
              {["צורך", "רצון"].map(type => {
                const cur = (s.examples || [])[i];
                const sel = cur === type;
                return (
                  <button key={type} onClick={() => {
                    const arr = [...(s.examples || Array(items.length).fill(""))];
                    arr[i] = type;
                    onChange({ ...s, examples: arr });
                  }} style={{
                    padding: "5px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                    background: sel ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.05)",
                    border: sel ? "1px solid #7c3aed" : "1px solid rgba(255,255,255,0.1)",
                    color: sel ? "#e9d5ff" : "rgba(255,255,255,0.5)"
                  }}>{type}</button>
                );
              })}
            </div>
          </div>
        ))}
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>ספר על פעם שהחלטת לא לקנות משהו שרצית. למה?</Label>
        <TextInput multiline value={s.decision} onChange={v => onChange({ ...s, decision: v })}
          placeholder="פעם אחת רציתי לקנות... אבל החלטתי לא כי..." />
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>מה התובנה הכי גדולה שלך מהשיחה הזו?</Label>
        <TextInput value={s.insight} onChange={v => onChange({ ...s, insight: v })}
          placeholder="למדתי ש..." />
      </Card>
    </div>
  );
}

function T10_Cooking({ state, onChange }) {
  const s = state || { menu: { starter: "", main: "", side: "", salad: "", dessert: "" }, difficulty: 5, reflection: [] };
  return (
    <div>
      <Intro emoji="🍳" title="בישול ארוחה מלאה"
        desc="ארוחה אמיתית — מנה ראשונה עד קינוח. אתה מתכנן, אתה קונה, אתה מבשל, אתה מגיש. ההורים רק אורחים הערב." />
      <Card>
        <Label>תכנן את התפריט שלך</Label>
        {[
          { key: "starter", label: "🥗 מנה ראשונה" },
          { key: "main", label: "🍖 מנה עיקרית" },
          { key: "side", label: "🥔 תוספת" },
          { key: "salad", label: "🥬 סלט" },
          { key: "dessert", label: "🍰 קינוח" },
        ].map(({ key, label }) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "0 0 4px" }}>{label}</p>
            <TextInput value={s.menu[key]} onChange={v => onChange({ ...s, menu: { ...s.menu, [key]: v } })}
              placeholder="שם המנה..." />
          </div>
        ))}
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Scale value={s.difficulty} onChange={v => onChange({ ...s, difficulty: v })}
          label="כמה היה קשה מ-1 עד 10?" />
      </Card>
      <ReflectionSection
        questions={["מה הלך הכי טוב בבישול?", "מה היה הכי מפתיע?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

function T11_Laundry({ state, onChange }) {
  const s = state || { steps: [], timeEstimate: "", actualTime: "", reflection: [] };
  const laundrySteps = [
    "מיינתי בגדים לפי צבע/חומר",
    "בחרתי תכנית נכונה במכונה",
    "הוספתי אבקת כביסה",
    "הפעלתי את המכונה",
    "תלתי/קיפלתי את הבגדים",
    "שמרתי בגדים במקום",
  ];
  return (
    <div>
      <Intro emoji="👕" title="כביסה וניהול זמן"
        desc="כביסה זה לא קסם — זה תהליך. ולמי שלא למד, זה יכול להיות מסתורי. היום אתה לומד ועושה לבד." />
      <Card>
        <Label>סמן כל שלב שסיימת</Label>
        {laundrySteps.map((step, i) => {
          const done = (s.steps || []).includes(i);
          return (
            <div key={i} onClick={() => {
              const cur = s.steps || [];
              onChange({ ...s, steps: done ? cur.filter(x => x !== i) : [...cur, i] });
            }} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              borderRadius: 10, marginBottom: 6, cursor: "pointer",
              background: done ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.03)",
              border: done ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.06)"
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                background: done ? "#10b981" : "transparent",
                border: done ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>{done && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}</div>
              <span style={{ color: done ? "rgba(255,255,255,0.6)" : "#fff", fontSize: 14 }}>{step}</span>
            </div>
          );
        })}
      </Card>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <Card style={{ flex: 1 }}>
          <Label>הערכתי שייקח</Label>
          <TextInput value={s.timeEstimate} onChange={v => onChange({ ...s, timeEstimate: v })} placeholder="דקות" />
        </Card>
        <Card style={{ flex: 1 }}>
          <Label>לקח בפועל</Label>
          <TextInput value={s.actualTime} onChange={v => onChange({ ...s, actualTime: v })} placeholder="דקות" />
        </Card>
      </div>
      <ReflectionSection
        questions={["מה הפתיע אותך בתהליך?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

function T12_PlanDay({ state, onChange }) {
  const s = state || { activities: [], budget: "", whatLearned: "", reflection: [] };
  const acts = s.activities || [];
  function addActivity() {
    onChange({ ...s, activities: [...acts, { time: "", what: "", who: "" }] });
  }
  function updateAct(i, field, val) {
    onChange({ ...s, activities: acts.map((a, idx) => idx === i ? { ...a, [field]: val } : a) });
  }
  return (
    <div>
      <Intro emoji="📅" title="תכנון יום משפחתי מלא"
        desc="אתה המארגן. אתה בוחר מה עושים, לאן הולכים, מה אוכלים. ההורים עונים לתוכנית שלך — לא ההפך." />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Label style={{ margin: 0 }}>תוכנית היום</Label>
          <button onClick={addActivity} style={{
            padding: "6px 14px", borderRadius: 8, background: "rgba(124,58,237,0.3)",
            border: "1px solid rgba(124,58,237,0.5)", color: "#c4b5fd", fontSize: 13, cursor: "pointer"
          }}>+ פעילות</button>
        </div>
        {acts.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textAlign: "center", padding: 20 }}>
            הוסף פעילויות לתוכנית היום
          </p>
        )}
        {acts.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input value={a.time} onChange={e => updateAct(i, "time", e.target.value)}
              placeholder="שעה" style={{
                width: 56, padding: "8px", borderRadius: 8, background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 12, outline: "none", textAlign: "center"
              }} />
            <input value={a.what} onChange={e => updateAct(i, "what", e.target.value)}
              placeholder="מה עושים?" style={{
                flex: 1, padding: "8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, outline: "none"
              }} />
          </div>
        ))}
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Label>תקציב משוער ליום</Label>
        <TextInput value={s.budget} onChange={v => onChange({ ...s, budget: v })} placeholder="₪" />
      </Card>
      <ReflectionSection
        questions={["מה הכי אהבת בתכנון?", "מה היה הכי קשה בלהוביל?"]}
        values={s.reflection || []}
        onChange={v => onChange({ ...s, reflection: v })} />
    </div>
  );
}

// ─── Climax screen for Chapter 1 ─────────────────────────────────────────────

function Ch1Climax({ state, onChange, onApprove, isParent }) {
  const s = state || { idoPresented: false, parentApproved: false, note: "", idoNote: "" };
  return (
    <div>
      <Intro emoji="🎤" title='ערב "מי אני עכשיו"'
        desc='סיימת את הפרק הראשון! הגיע הזמן לאירוע שיא — ערב משפחתי שבו אתה מציג את עצמך: מה למדת, מה הערכים שלך, מה השתנה בך.' />
      {!isParent && (
        <Card>
          <Label>מה אתה הולך להציג?</Label>
          <TextInput multiline value={s.idoNote} onChange={v => onChange({ ...s, idoNote: v })}
            placeholder="אני הולך לספר על... להראות... לשתף..." />
          <div style={{ marginTop: 16 }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "0 0 10px" }}>
              כשתסיים את הערב — סמן כאן:
            </p>
            <button onClick={() => onChange({ ...s, idoPresented: true })} style={{
              padding: "12px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer",
              background: s.idoPresented ? "rgba(16,185,129,0.2)" : "linear-gradient(135deg, #7c3aed, #a855f7)",
              border: s.idoPresented ? "1px solid rgba(16,185,129,0.4)" : "none", color: "#fff"
            }}>
              {s.idoPresented ? "✓ הצגתי!" : "סיימתי את ערב ה-מי אני עכשיו"}
            </button>
          </div>
        </Card>
      )}
      {isParent && (
        <Card style={{ border: "1px solid rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.05)" }}>
          <Label>✅ אישור הורים לפתיחת פרק 2</Label>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: "0 0 16px" }}>
            {s.idoPresented
              ? "עידו סימן שהציג את הערב. אחרי שהתקיים בפועל — אשרו כאן לפתוח את הפרק הבא."
              : "ממתין לעידו שיסמן שסיים את הערב..."}
          </p>
          {s.idoPresented && !s.parentApproved && (
            <>
              <TextInput multiline value={s.note} onChange={v => onChange({ ...s, note: v })}
                placeholder="כמה מילים על הערב..." />
              <button onClick={() => { onChange({ ...s, parentApproved: true }); onApprove && onApprove(); }}
                style={{
                  marginTop: 12, padding: "12px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600,
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  border: "none", color: "#fff", cursor: "pointer", width: "100%"
                }}>
                ✅ אני מאשר/ת — פתח פרק 2!
              </button>
            </>
          )}
          {s.parentApproved && (
            <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(16,185,129,0.15)" }}>
              <span style={{ color: "#6ee7b7", fontWeight: 600 }}>✓ פרק 2 נפתח!</span>
              {s.note && <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "8px 0 0" }}>{s.note}</p>}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

// ─── Activity registry ────────────────────────────────────────────────────────

export const TASK_ACTIVITIES = {
  t1: T1_OpeningCeremony,
  t2: T2_ValueMap,
  t3: T3_ChooseValues,
  t4: T4_Responsibility,
  t5: T5_Standard,
  t6: T6_Feedback,
  t7: T7_Allowance,
  t8: T8_ExpenseTable,
  t9: T9_NeedsWants,
  t10: T10_Cooking,
  t11: T11_Laundry,
  t12: T12_PlanDay,
};

export const CHAPTER_CLIMAX = {
  1: Ch1Climax,
};

// ─── Task modal wrapper ───────────────────────────────────────────────────────

export function TaskModal({ task, chapter, data, save, isParent, onClose }) {
  const ActivityComponent = TASK_ACTIVITIES[task.id];
  const activityData = (data.taskData || {})[task.id] || {};
  const isCompleted = !!data.completed?.[task.id];

  function saveActivity(newState) {
    const newTaskData = { ...(data.taskData || {}), [task.id]: newState };
    save({ ...data, taskData: newTaskData });
  }

  function markComplete() {
    const newCompleted = { ...(data.completed || {}), [task.id]: true };
    const newTaskData = { ...(data.taskData || {}), [task.id]: activityData };
    save({ ...data, completed: newCompleted, taskData: newTaskData });
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, background: "#0a0a1a",
      display: "flex", flexDirection: "column", overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        background: "#0f0f23", borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0
      }}>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.08)", border: "none", color: "#fff",
          width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 18,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>←</button>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: 15, margin: 0 }}>{task.text}</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: 0 }}>פרק {chapter?.title}</p>
        </div>
        {isCompleted && (
          <span style={{
            padding: "4px 12px", borderRadius: 20, fontSize: 12,
            background: "rgba(16,185,129,0.2)", color: "#6ee7b7",
            border: "1px solid rgba(16,185,129,0.3)"
          }}>✓ הושלם</span>
        )}
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 100px" }}>
        {ActivityComponent
          ? <ActivityComponent state={activityData} onChange={saveActivity} isParent={isParent} />
          : <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: 40 }}>הפעילות בדרך...</p>
        }
      </div>

      {/* Footer */}
      {!isParent && !isCompleted && ActivityComponent && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "16px", background: "rgba(10,10,26,0.95)", backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.07)"
        }}>
          <button onClick={markComplete} style={{
            width: "100%", padding: "14px", borderRadius: 14,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer"
          }}>
            ✓ סיימתי את המשימה הזו
          </button>
        </div>
      )}
    </div>
  );
}

export function ClimaxModal({ chapterId, data, save, isParent, onClose, onApprove }) {
  const ClimaxComponent = CHAPTER_CLIMAX[chapterId];
  const climaxData = (data.climaxData || {})[chapterId] || {};

  function saveClimax(newState) {
    save({ ...data, climaxData: { ...(data.climaxData || {}), [chapterId]: newState } });
  }

  if (!ClimaxComponent) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, background: "#0a0a1a",
      display: "flex", flexDirection: "column", overflow: "hidden"
    }}>
      <div style={{
        background: "#0f0f23", borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0
      }}>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.08)", border: "none", color: "#fff",
          width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 18,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>←</button>
        <p style={{ color: "#fbbf24", fontWeight: 700, fontSize: 15, margin: 0 }}>🎯 אירוע שיא</p>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 40px" }}>
        <ClimaxComponent
          state={climaxData} onChange={saveClimax}
          isParent={isParent} onApprove={onApprove} />
      </div>
    </div>
  );
}
