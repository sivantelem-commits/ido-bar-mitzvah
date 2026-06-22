import { useState, useEffect } from "react";
import {
  T13_EmotionJournal, T14_BraveConversation, T15_Volunteer, T16_Commitment,
  T17_PhysicalGoal, T18_TrainingPlan, T19_AchieveGoal,
  T20_PlanRoute, T21_TakeTrip, T22_TripBudget, T23_TripReport,
  Ch2Climax, QuizM5, QuizM6, QuizM7, QuizM8,
} from "./Chapter2.jsx";

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

// ─── Heroes data (for T3) ─────────────────────────────────────────────────────
const HEROES_T3 = [
  { id: "mandela", name: "נלסון מנדלה", wiki: "Nelson_Mandela", title: "מנהיג, לוחם חופש", bio: "בילה 27 שנה בכלא ויצא ללא שנאה. סמל של סליחה, כוח ושינוי.", values: ["צדק","סליחה","נחישות","שוויון","אומץ","מנהיגות"] },
  { id: "messi", name: "ליאונל מסי", wiki: "Lionel_Messi", title: "שחקן הכדורגל הטוב בהיסטוריה", bio: "ילד שנאמר לו שגופו לא מתאים. לא ויתר, לא התגאה, תמיד עבד קשה.", values: ["התמדה","ענווה","מצוינות","שאפתנות","מחויבות","משפחה"] },
  { id: "anne", name: "אנה פרנק", wiki: "Anne_Frank", title: "סמל תקווה ואנושיות", bio: "נסתרה שנתיים מהנאצים וכתבה יומן של תקווה ואמונה בטוב גם בחושך.", values: ["תקווה","אמת","אנושיות","אותנטיות","אמונה","ביטוי עצמי"] },
  { id: "jobs", name: "סטיב ג'ובס", wiki: "Steve_Jobs", title: "מייסד אפל", bio: "נשר מהאוניברסיטה ובנה את החברה הכי שווה בעולם. האמין שעיצוב ופשטות משנים הכל.", values: ["חדשנות","אסתטיקה","פרפקציוניזם","יצירתיות","פשטות","מקוריות"] },
  { id: "teresa", name: "אמא תרזה", wiki: "Mother_Teresa", title: "נזירה, זוכת פרס נובל", bio: "ויתרה על חייה הנוחים לטפל בעניים ביותר. 'אם תשפוט — לא יהיה לך זמן לאהוב.'", values: ["חמלה","נדיבות","נתינה","אהבה","ענווה","עזרה לזולת"] },
  { id: "einstein", name: "אלברט איינשטיין", wiki: "Albert_Einstein", title: "פיזיקאי ומדען", bio: "נכשל בבחינות, עבד כפקיד, וגילה את תורת היחסות. האמין שסקרנות היא המתנה הכי גדולה.", values: ["סקרנות","חשיבה","יצירתיות","ידע","חופש","הגיון"] },
  { id: "malala", name: "מלאלה יוספזאי", wiki: "Malala_Yousafzai", title: "פעילת זכויות, זוכת נובל", bio: "נורתה בגיל 15 כי הלכה לבית ספר. שרדה והפכה לקול הכי חזק למען חינוך.", values: ["אומץ","חינוך","צדק","עשיית הבדל","השפעה","נחישות"] },
  { id: "ronaldo", name: "כריסטיאנו רונאלדו", wiki: "Cristiano_Ronaldo", title: "שחקן כדורגל", bio: "גדל בעוני, חלה בלב בגיל 15. הראשון להגיע לאימון והאחרון לעזוב. משמעת מעל הכל.", values: ["משמעת עצמית","חריצות","התמדה","הישגיות","שאפתנות","מצוינות"] },
  { id: "obama", name: "ברק אובמה", wiki: "Barack_Obama", title: "נשיא ארה\"ב ה-44", bio: "גדל ללא אב, בין שתי תרבויות. הנשיא הראשון ממוצא אפריקאי. האמין בכוח המילים.", values: ["תקווה","אחדות","מנהיגות","תקשורת","שוויון","שייכות"] },
  { id: "diana", name: "נסיכת דיאנה", wiki: "Diana,_Princess_of_Wales", title: "נסיכת הלבבות", bio: "ויתרה על הפרוטוקול לחבק חולים ולהילחם בנגד מוקשים. 'הלב חופשי כשנותנים לאחרים.'", values: ["אמפתיה","חמלה","אנושיות","נדיבות","אהדה","אהבה"] },
  { id: "hawking", name: "סטיבן הוקינג", wiki: "Stephen_Hawking", title: "קוסמולוג וסמל התגברות", bio: "אובחן עם מחלה קשה בגיל 21, חי עד 76 וגילה סודות היקום. 'כל עוד יש חיים — יש תקווה.'", values: ["התמדה","סקרנות","אופטימיות","יצירתיות","ידע","הומור"] },
  { id: "curie", name: "מארי קירי", wiki: "Marie_Curie", title: "מדענית, זוכת נובל פעמיים", bio: "האישה הראשונה שזכתה בפרס נובל — ובשני תחומים שונים. הוכיחה שמגדר אינו מגבלה.", values: ["נחישות","ידע","יצירתיות","שוויון","חריצות","מצוינות"] },
];

const ALL_VALUES_T3 = [
  { name: "אדיבות", desc: "להתנהג בנועם ובכבוד כלפי כל אדם." },
  { name: "אהבה", desc: "לחבב, לדאוג ולהעניק מעצמך." },
  { name: "אומץ", desc: "לפעול גם כשמפחד." },
  { name: "אופטימיות", desc: "להאמין שהעתיד יכול להיות טוב." },
  { name: "אותנטיות", desc: "להיות מי שאתה באמת." },
  { name: "אחריות", desc: "לעמוד מאחורי המילים והמעשים שלך." },
  { name: "אמון", desc: "לבנות מערכות יחסים על ביטחון הדדי." },
  { name: "אמפתיה", desc: "להרגיש את מה שאחרים מרגישים." },
  { name: "אמת", desc: "לדבר ולחיות ביושר." },
  { name: "אנושיות", desc: "לראות את הצד האנושי בכל אדם." },
  { name: "ביטוי עצמי", desc: "לתת ביטוי חופשי לאישיות שלך." },
  { name: "בריאות", desc: "לדאוג לגוף ולנפש." },
  { name: "גבורה", desc: "להתמודד עם קשיים בעוצמה." },
  { name: "גמישות", desc: "להסתגל לשינויים מבלי לאבד את עצמך." },
  { name: "הישגיות", desc: "לשאוף לתוצאות ולא להסתפק בפחות." },
  { name: "התמדה", desc: "להמשיך גם כשקשה." },
  { name: "התפתחות", desc: "לשאוף ללמוד, לגדול ולהשתפר." },
  { name: "חברות", desc: "לטפח קשרים של אמון ושמחה." },
  { name: "חדשנות", desc: "לחשוב מחוץ לקופסה." },
  { name: "חופש", desc: "לפעול מתוך רצון אישי." },
  { name: "חינוך", desc: "להאמין בכוח הידע והלמידה." },
  { name: "חכמה", desc: "לפעול מתוך בגרות והבנה עמוקה." },
  { name: "חמלה", desc: "לפגוש כאב של אחרים בלב פתוח." },
  { name: "חריצות", desc: "לעבוד קשה ובמסירות." },
  { name: "יושר", desc: "להיות ישר בדברים ובמעשים." },
  { name: "יצירתיות", desc: "לחשוב בדרכים חדשות." },
  { name: "כבוד", desc: "לתת כבוד לכל אדם ולעצמך." },
  { name: "כנות", desc: "לאמר את האמת שלך." },
  { name: "מנהיגות", desc: "לדעת לעמוד בראש ולהוביל." },
  { name: "מסירות", desc: "לתת את כולך למה שבחרת." },
  { name: "משמעת עצמית", desc: "לשלוט בדחפים ולעשות מה שצריך." },
  { name: "משפחה", desc: "לשים את הקשר המשפחתי כעדיפות." },
  { name: "מצוינות", desc: "לעשות דברים ברמה הגבוהה ביותר." },
  { name: "נאמנות", desc: "לעמוד לצד מי שבחרת גם בזמנים קשים." },
  { name: "נדיבות", desc: "לתת בחופשיות — זמן, אנרגיה, אהבה." },
  { name: "נחישות", desc: "לא לוותר על מה שחשוב, גם תחת לחץ." },
  { name: "סבלנות", desc: "להמתין בשלווה." },
  { name: "סקרנות", desc: "לשאול שאלות, לחקור." },
  { name: "עבודת צוות", desc: "לפעול יחד לקראת מטרה משותפת." },
  { name: "עזרה לזולת", desc: "לראות בעזרה לאחרים חלק מהזהות שלך." },
  { name: "עצמאות", desc: "לפתח יכולת לפעול ולהחליט בעצמך." },
  { name: "עקביות", desc: "להיות אותו אדם תמיד." },
  { name: "עשיית הבדל", desc: "לפעול כך שהעולם יהיה טיפה יותר טוב." },
  { name: "צדק", desc: "לפעול למען שוויון ויחס הוגן." },
  { name: "צמיחה", desc: "לראות את עצמך כמתפתח כל הזמן." },
  { name: "קבלה עצמית", desc: "לאהוב את עצמך על כל מה שאתה." },
  { name: "שאפתנות", desc: "לרצות להשיג דברים גדולים." },
  { name: "שוויון", desc: "להאמין שכל אדם ראוי ליחס שווה." },
  { name: "שייכות", desc: "להרגיש חלק ממשהו — קבוצה, קהילה, משפחה." },
  { name: "שמחה", desc: "לפעול למען שמחה — שלך ושל הסביבה." },
  { name: "תקווה", desc: "להאמין שדברים יכולים להשתפר." },
  { name: "תרומה", desc: "להשאיר את המקום שלך יותר טוב." },
];

function HeroCardMini({ hero, isSelected, isDisabled, onToggle }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [showBio, setShowBio] = useState(false);

  useEffect(() => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${hero.wiki}`)
      .then(r => r.json()).then(d => { if (d.thumbnail?.source) setImgUrl(d.thumbnail.source); })
      .catch(() => {});
  }, [hero.wiki]);

  return (
    <div style={{
      borderRadius: 14, border: isSelected ? "2px solid #7c3aed" : "1px solid rgba(255,255,255,0.08)",
      background: isSelected ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.03)",
      opacity: isDisabled ? 0.35 : 1, transition: "all 0.2s", overflow: "visible", position: "relative"
    }}>
      <button onClick={() => !isDisabled && setShowBio(!showBio)} style={{
        width: "100%", background: "none", border: "none", cursor: isDisabled ? "not-allowed" : "pointer",
        padding: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 6
      }}>
        {imgUrl
          ? <img src={imgUrl} alt={hero.name} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: isSelected ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.1)" }} />
          : <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{hero.name[0]}</div>
        }
        {isSelected && <div style={{ position: "absolute", top: 8, left: 8, width: 20, height: 20, borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff" }}>✓</div>}
        <p style={{ color: "#fff", fontWeight: 600, fontSize: 12, margin: 0, textAlign: "center" }}>{hero.name}</p>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, margin: 0, textAlign: "center" }}>{hero.title}</p>
      </button>

      {showBio && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0, left: 0, zIndex: 300,
          padding: 14, borderRadius: 12, background: "#13132a",
          border: "1px solid rgba(124,58,237,0.5)", boxShadow: "0 8px 32px rgba(0,0,0,0.8)"
        }}>
          <p style={{ color: "#c4b5fd", fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>{hero.name}</p>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, margin: "0 0 10px", lineHeight: 1.5 }}>{hero.bio}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
            {hero.values.slice(0, 3).map(v => (
              <span key={v} style={{ padding: "2px 8px", borderRadius: 20, fontSize: 10, background: "rgba(124,58,237,0.2)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.3)" }}>{v}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {!isDisabled && (
              <button onClick={() => { onToggle(hero.id); setShowBio(false); }} style={{
                flex: 1, padding: "7px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                background: isSelected ? "rgba(239,68,68,0.2)" : "rgba(124,58,237,0.5)",
                border: isSelected ? "1px solid rgba(239,68,68,0.4)" : "none",
                color: isSelected ? "#fca5a5" : "#fff", fontWeight: 600
              }}>{isSelected ? "הסר" : "הוסף ➕"}</button>
            )}
            <button onClick={() => setShowBio(false)} style={{ padding: "7px 10px", borderRadius: 8, fontSize: 12, background: "rgba(255,255,255,0.05)", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

function T3_ChooseValues({ state, onChange, data, save }) {
  const s = state || { phase: "game", heroSelected: [], suggestedValues: [], chosenValues: [] };
  const [search, setSearch] = useState("");

  function toggleHero(id) {
    const cur = s.heroSelected || [];
    const next = cur.includes(id) ? cur.filter(x => x !== id) : cur.length < 3 ? [...cur, id] : cur;
    onChange({ ...s, heroSelected: next });
  }

  function computeSuggested() {
    const counts = {};
    (s.heroSelected || []).forEach(id => {
      const hero = HEROES_T3.find(h => h.id === id);
      if (hero) hero.values.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([v]) => v);
  }

  function goToResult() {
    const suggested = computeSuggested();
    // Save snapshot to global data
    const snapshot = {
      id: Date.now(),
      date: new Date().toLocaleDateString("he-IL"),
      heroes: s.heroSelected,
      suggestedValues: suggested,
      chosenValues: [],
    };
    if (save && data) {
      save({ ...data, valueSnapshots: [...(data.valueSnapshots || []), snapshot] });
    }
    onChange({ ...s, phase: "result", suggestedValues: suggested });
  }

  function toggleValue(name) {
    const cur = s.chosenValues || [];
    const next = cur.includes(name) ? cur.filter(v => v !== name) : cur.length < 5 ? [...cur, name] : cur;
    onChange({ ...s, chosenValues: next });
    // Also save to global values
    if (save && data) save({ ...data, values: next });
  }

  const chosen = s.chosenValues || [];
  const heroSelected = s.heroSelected || [];
  const suggested = s.suggestedValues || [];

  // PHASE: game
  if (s.phase !== "result") {
    return (
      <div>
        <Intro emoji="🏆" title="בנה את הצוות שלך"
          desc="בחר 3 דמויות שהיית רוצה שיהיו לצידך במסע. הבחירות שלך יגלו את הערכים שמנחים אותך." />
        <p style={{ color: heroSelected.length === 3 ? "#a855f7" : "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600, textAlign: "center", margin: "0 0 16px" }}>
          {heroSelected.length}/3 נבחרו
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {HEROES_T3.map(hero => (
            <HeroCardMini key={hero.id}
              hero={hero}
              isSelected={heroSelected.includes(hero.id)}
              isDisabled={!heroSelected.includes(hero.id) && heroSelected.length >= 3}
              onToggle={toggleHero} />
          ))}
        </div>
        {heroSelected.length === 3 && (
          <button onClick={goToResult} style={{
            width: "100%", padding: "14px", borderRadius: 14,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer"
          }}>גלה מה הצוות שלך אומר עליך ←</button>
        )}
      </div>
    );
  }

  // PHASE: result + value selection
  const pickedHeroes = HEROES_T3.filter(h => heroSelected.includes(h.id));
  const filtered = search.trim() ? ALL_VALUES_T3.filter(v => v.name.includes(search.trim())) : ALL_VALUES_T3;

  return (
    <div>
      {/* Hero summary */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 20 }}>
        {pickedHeroes.map(h => (
          <div key={h.id} style={{ textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, margin: "0 auto 4px", border: "2px solid #7c3aed" }}>{h.name[0]}</div>
            <p style={{ color: "#c4b5fd", fontSize: 11, margin: 0 }}>{h.name.split(" ")[0]}</p>
          </div>
        ))}
      </div>

      {/* Suggested */}
      <Card style={{ marginBottom: 16, border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.07)" }}>
        <Label>הערכים המובילים שעולים מהצוות שלך:</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {suggested.map((v, i) => (
            <span key={v} style={{
              padding: "6px 14px", borderRadius: 30, fontSize: 13,
              background: i < 3 ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
              border: i < 3 ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.1)",
              color: i < 3 ? "#e9d5ff" : "rgba(255,255,255,0.6)"
            }}>
              {i < 3 ? "⭐ " : ""}{v}
            </span>
          ))}
        </div>
      </Card>

      {/* Chosen */}
      {chosen.length > 0 && (
        <Card style={{ marginBottom: 16, background: chosen.length === 5 ? "rgba(234,179,8,0.07)" : "rgba(124,58,237,0.06)", border: chosen.length === 5 ? "1px solid rgba(234,179,8,0.3)" : "1px solid rgba(124,58,237,0.2)" }}>
          <p style={{ color: chosen.length === 5 ? "#fbbf24" : "#c4b5fd", fontWeight: 600, fontSize: 14, margin: "0 0 10px" }}>
            {chosen.length === 5 ? "✨ המצפן שלך לשנה הזו" : `בחרת ${chosen.length}/5 ערכים`}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {chosen.map(v => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 30, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}>
                <span style={{ color: "#e9d5ff", fontSize: 13 }}>{v}</span>
                <button onClick={() => toggleValue(v)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 15, padding: 0, lineHeight: 1 }}>×</button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Value picker */}
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 10px" }}>
        בחר עד 5 ערכים — לחץ על ערך לתיאור:
      </p>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="חפש ערך..."
        style={{ width: "100%", padding: "9px 14px", borderRadius: 10, boxSizing: "border-box", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, outline: "none", direction: "rtl", marginBottom: 12 }} />
      <ValuePickerInline values={filtered} chosen={chosen} onToggle={toggleValue} />

      <button onClick={() => onChange({ ...s, phase: "game", heroSelected: [] })} style={{
        marginTop: 16, padding: "9px 18px", borderRadius: 10, fontSize: 13, cursor: "pointer",
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)"
      }}>🔄 שחק שוב</button>
    </div>
  );
}

function ValuePickerInline({ values, chosen, onToggle }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {values.map(v => {
        const isSel = chosen.includes(v.name);
        const isDisabled = !isSel && chosen.length >= 5;
        const isExp = expanded === v.name;
        return (
          <div key={v.name} style={{ position: "relative" }}>
            <button onClick={() => setExpanded(isExp ? null : v.name)} style={{
              padding: "7px 13px", borderRadius: 9, fontSize: 13, cursor: isDisabled ? "not-allowed" : "pointer",
              background: isSel ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)",
              border: isSel ? "1.5px solid #7c3aed" : "1px solid rgba(255,255,255,0.1)",
              color: isSel ? "#e9d5ff" : isDisabled ? "rgba(255,255,255,0.2)" : "#fff",
            }}>
              {isSel && "✓ "}{v.name}
            </button>
            {isExp && (
              <div style={{
                position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 200,
                width: 220, padding: "12px 14px", borderRadius: 11,
                background: "#1a1a2e", border: "1px solid rgba(124,58,237,0.4)",
                boxShadow: "0 8px 28px rgba(0,0,0,0.7)"
              }}>
                <p style={{ color: "#c4b5fd", fontWeight: 600, fontSize: 13, margin: "0 0 5px" }}>{v.name}</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, margin: "0 0 10px", lineHeight: 1.5 }}>{v.desc}</p>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => { onToggle(v.name); setExpanded(null); }} style={{
                    flex: 1, padding: "7px", borderRadius: 7, fontSize: 12, cursor: isDisabled && !isSel ? "not-allowed" : "pointer",
                    background: isSel ? "rgba(239,68,68,0.15)" : "rgba(124,58,237,0.4)",
                    border: isSel ? "1px solid rgba(239,68,68,0.3)" : "none",
                    color: isSel ? "#fca5a5" : "#fff"
                  }}>{isSel ? "הסר" : isDisabled ? "כבר 5 ✓" : "בחר ➕"}</button>
                  <button onClick={() => setExpanded(null)} style={{ padding: "7px 10px", borderRadius: 7, fontSize: 12, background: "rgba(255,255,255,0.05)", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>✕</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
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
  const s = state || {};
  const menu = s.menu || { starter: "", main: "", side: "", salad: "", dessert: "" };
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
            <TextInput value={menu[key] || ""} onChange={v => onChange({ ...s, menu: { ...menu, [key]: v } })}
              placeholder="שם המנה..." />
          </div>
        ))}
      </Card>
      <Card style={{ marginTop: 12 }}>
        <Scale value={s.difficulty || 5} onChange={v => onChange({ ...s, difficulty: v })}
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

// ─── Monthly Quiz Games ───────────────────────────────────────────────────────

export const MONTH_QUIZZES = {
  m1: {
    title: "סיכום חודש נובמבר 2026 — זהות וערכים",
    emoji: "🌿",
    dilemmas: [
      {
        id: "d1",
        scenario: "חבר טוב שלך מתלבש בצורה שנראית לך מוזרה. הוא שואל מה דעתך.",
        options: [
          { text: "אומר לו שזה נראה נהדר, גם אם זה לא נכון", value: "social" },
          { text: "אומר לו בעדינות מה אני חושב באמת", value: "honest" },
          { text: "משנה נושא ולא עונה", value: "avoid" },
        ],
        feedback: {
          social: "בחרת לשמור על הרגשות שלו — אבל חברות אמיתית מבוססת על אמת. חשוב לדעת לומר אמת בעדינות.",
          honest: "מעולה! אמת שנאמרת בעדינות היא סימן לחברות אמיתית ולערך האותנטיות.",
          avoid: "הימנעות לפעמים נוחה, אבל לא מחזקת חברויות. אמת בעדינות עדיפה על שתיקה.",
        }
      },
      {
        id: "d2",
        scenario: "אתה צריך לבחור בין לבלות עם חברים לבין לעזור לאמא עם קניות שהבטחת לעשות.",
        options: [
          { text: "הולך עם החברים — זה פחות חשוב", value: "friends" },
          { text: "עומד בהבטחה ועוזר לאמא", value: "promise" },
          { text: "מתנצל ומסביר שישלם בזמן אחר", value: "negotiate" },
        ],
        feedback: {
          friends: "קשה לוותר על חברים, אבל הבטחות שנשברות פוגעות באמון. אחריות מתחילה בדברים קטנים.",
          promise: "כל הכבוד! עמידה בהבטחות היא אחד הדברים שמגדירים אדם אמין.",
          negotiate: "תקשורת ישירה ופתרון חלופי — זו דרך בוגרת להתמודד עם קונפליקט.",
        }
      },
    ],
    quiz: [
      { q: "מה ההבדל בין ערך לבין תחביב?", options: ["ערך הוא דבר שמשנה לי עמוק — מנחה אותי בהחלטות. תחביב הוא דבר שאני אוהב לעשות.", "אין הבדל, שניהם חשובים לי.", "תחביב יותר חשוב כי עושה אותי שמח."], correct: 0 },
      { q: "למה כתבנו 'מפת זהות' בתחילת השנה?", options: ["כי זה היה שיעורי בית", "כדי לדעת מאיפה מתחילים את המסע — מה חזק בנו ומה נרצה לפתח", "כי ההורים ביקשו"], correct: 1 },
      { q: "מה זה אומר שמישהו הוא אותנטי?", options: ["שהוא תמיד מסכים עם כולם", "שהוא מתנהג לפי מי שהוא באמת, לא לפי מה שאחרים רוצים", "שהוא לא אכפת לו מאחרים"], correct: 1 },
    ]
  },
  m2: {
    title: "סיכום חודש דצמבר 2026 — אחריות בבית",
    emoji: "🏠",
    dilemmas: [
      {
        id: "d1",
        scenario: "שכחת לעשות את תחום האחריות שלך השבוע. ההורים שאלו אם עשית.",
        options: [
          { text: "אומר שכן, ומקווה שלא ישימו לב", value: "lie" },
          { text: "מודה ומבקש סליחה, ומציע לפצות", value: "honest" },
          { text: "מאשים גורם חיצוני — היה לי יום קשה", value: "blame" },
        ],
        feedback: {
          lie: "שקר קטן מייצר חוסר אמון גדול. אחריות כוללת גם לקחת בעלות על טעויות.",
          honest: "מדהים! הודאה בטעות ופיצוי — זו בגרות אמיתית. זה מה שבונה אמון.",
          blame: "קל לתרץ, אבל אחריות אמיתית לא עוברת בין ידיים. הצעד הבא — להודות ולתקן.",
        }
      },
      {
        id: "d2",
        scenario: "ביצעת את תחום האחריות שלך, אבל לא ממש טוב — חצי-חצי. ההורים לא שמו לב.",
        options: [
          { text: "לא אומר כלום, עשיתי את שלי", value: "ignore" },
          { text: "חוזר ועושה את זה כמו שצריך, בלי שיבקשו", value: "redo" },
          { text: "שואל אם הסטנדרט שקבענו היה ריאלי", value: "discuss" },
        ],
        feedback: {
          ignore: "הסטנדרט קיים בשבילך — לא בשביל ההורים. מצפון פנימי חזק מהשגחה חיצונית.",
          redo: "וואו — זו אחריות אמיתית! לחזור ולתקן בלי שביקשו ממך זה בגרות של אמת.",
          discuss: "שיחה על ציפיות ריאליות — מעולה! תקשורת פתוחה היא חלק מהאחריות.",
        }
      },
    ],
    quiz: [
      { q: "למה חשוב לקבוע סטנדרט ברור לתחום האחריות?", options: ["כדי שההורים יהיו שקטים", "כדי שיהיה ברור לך מה 'טוב' נראה — ולא תצטרך שיגידו לך", "כי זה הכלל"], correct: 1 },
      { q: "מה זה אומר לקחת אחריות?", options: ["לעשות מה שמבקשים ממך", "לעמוד מאחורי מה שהתחייבת — גם כשטועים, גם בלי תזכורת", "להאשים את עצמך כשמשהו לא עובד"], correct: 1 },
      { q: "מה עדיף — לקבל משוב ביקורתי או לא לקבל משוב בכלל?", options: ["לא לקבל משוב — פחות לחץ", "לקבל משוב ביקורתי — כי זה עוזר לגדול", "תלוי מה אומרים"], correct: 1 },
    ]
  },
  m3: {
    title: "סיכום חודש ינואר 2027 — כסף וניהול עצמי",
    emoji: "💰",
    dilemmas: [
      {
        id: "d1",
        scenario: "יש לך 100 ₪ בתקציב. חבר מציע לך הזדמנות מדהימה לצאת לאירוע שעולה בדיוק 100 ₪. אבל זה כל הכסף שלך לחודש.",
        options: [
          { text: "יוצא — זו חוויה שלא חוזרת!", value: "yolo" },
          { text: "לא יוצא — החלטתי לחסוך חלק", value: "save" },
          { text: "מדבר עם ההורים על הלוואה קטנה", value: "loan" },
        ],
        feedback: {
          yolo: "חוויות שוות כסף — אבל לאזל לגמרי לא נותן גב לאורכי החודש. איזון הוא מיומנות.",
          save: "משמעת פיננסית בגיל הזה היא מיומנות נדירה. כל הכבוד על השמירה על הגבול שקבעת.",
          loan: "להבין שצריך עזרה ולבקש אותה בכנות — זה בוגר. רק חשוב להחזיר.",
        }
      },
      {
        id: "d2",
        scenario: "בתוך החודש גילית שהוצאת יותר ממה שתכננת. נשארו לך 20 ₪ ל-2 שבועות.",
        options: [
          { text: "מבקש כסף נוסף מההורים", value: "ask" },
          { text: "מסתדר עם מה שיש — לומד מהטעות", value: "manage" },
          { text: "מתעלם ומשתמש בכרטיס אשראי", value: "credit" },
        ],
        feedback: {
          ask: "לבקש עזרה זה בסדר — אבל לנסות קודם לבד מלמד יותר. מה היית יכול לעשות אחרת?",
          manage: "אמיץ! 20 ₪ ל-2 שבועות זה אתגר — אבל כלכלת אילוץ מלמדת יותר מכל ספר.",
          credit: "להוציא כסף שאין לך — זו הבעיה הפיננסית הכי נפוצה אצל מבוגרים. עכשיו הזמן ללמוד אחרת.",
        }
      },
    ],
    quiz: [
      { q: "מה ההבדל בין צורך לרצון?", options: ["אין הבדל — כל מה שרוצים צריך", "צורך הוא משהו שחייבים לחיות — רצון הוא משהו שרוצים אבל אפשר בלעדיו", "רצון יותר חשוב כי הוא גורם לי אושר"], correct: 1 },
      { q: "למה כדאי לנהל טבלת הוצאות?", options: ["כי ההורים מבקשים", "כי היא מגלה לאן הכסף הולך ועוזרת להחליט טוב יותר", "כי זה כיף לכתוב מספרים"], correct: 1 },
      { q: "מה זה חיסכון?", options: ["כסף שנגמר", "כסף שמפרישים עכשיו כדי שיהיה לך אפשרות בעתיד", "כסף שאסור להשתמש בו אף פעם"], correct: 1 },
    ]
  },
  m4: {
    title: "סיכום חודש פברואר 2027 — עצמאות יומיומית",
    emoji: "🔥",
    dilemmas: [
      {
        id: "d1",
        scenario: "בישלת ארוחה שיצאה בינונית. ההורים אמרו שהיה טעים אבל ראית שהם לא סיימו.",
        options: [
          { text: "מתבאס ומחליט שבישול זה לא בשבילי", value: "quit" },
          { text: "שואל מה היה אפשר לשפר ומנסה שוב", value: "improve" },
          { text: "מאמין שהיה טוב וממשיך הלאה", value: "accept" },
        ],
        feedback: {
          quit: "כישלון ראשון הוא חלק מהלמידה — לא הסוף שלה. כל שף התחיל עם ארוחות בינוניות.",
          improve: "זו בדיוק הגישה שמפתחת מיומנות! לשאול, ללמוד, לנסות שוב — זו גדילה אמיתית.",
          accept: "לקבל מחמאה זה בסדר — אבל לשאול למשוב אמיתי הוא מה שמשפר.",
        }
      },
      {
        id: "d2",
        scenario: "תכננת יום משפחתי שלא הלך לפי התכנית. חצי מהדברים לא קרו.",
        options: [
          { text: "מרגיש כישלון — לא מספיק טוב כמארגן", value: "fail" },
          { text: "מבין שתכנון ומציאות תמיד שונים — זה בסדר", value: "learn" },
          { text: "מאשים את ההורים שלא שיתפו פעולה", value: "blame" },
        ],
        feedback: {
          fail: "תכנון שלא יוצא מושלם הוא נורמלי — גם למנהיגים מנוסים. השאלה היא מה עושים עם זה.",
          learn: "בדיוק! גמישות היא מיומנות מנהיגות. תכנית טובה יודעת להסתגל.",
          blame: "קל להאשים — קשה לקחת בעלות. מה אתה היית יכול לעשות אחרת?",
        }
      },
    ],
    quiz: [
      { q: "מה המשמעות של עצמאות יומיומית?", options: ["לעשות הכל לבד בלי עזרה", "לדעת לטפל בצרכים בסיסיים של עצמך — בישול, כביסה, ארגון", "לא לצטרך את ההורים בכלל"], correct: 1 },
      { q: "למה חשוב ללמוד לבשל?", options: ["כי זה מגניב", "כי זו מיומנות בסיסית לחיים — בריאות, עצמאות וחיסכון כספי", "כי כולם עושים את זה"], correct: 1 },
      { q: "מה ניהול זמן טוב עוזר לך לעשות?", options: ["לגמור הכל מהר", "לפנות מקום למה שחשוב לך — ולא להיות תמיד בלחץ", "להרשים אחרים"], correct: 1 },
    ]
  },
};

export function MonthlyQuiz({ monthId, state, onChange }) {
  const quiz = MONTH_QUIZZES[monthId];
  const s = state || {};
  const step = s.step || "intro";
  const dilemmaAnswers = s.dilemmaAnswers || {};
  const quizAnswers = s.quizAnswers || {};
  const dilemmaIdx = s.dilemmaIdx || 0;

  if (!quiz) return <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: 40 }}>המשחקון בדרך...</p>;

  function setStep(newStep) { onChange({ ...s, step: newStep }); }
  function answerDilemma(id, value) {
    onChange({ ...s, step, dilemmaAnswers: { ...dilemmaAnswers, [id]: value } });
  }
  function answerQuiz(idx, val) {
    onChange({ ...s, step, quizAnswers: { ...quizAnswers, [idx]: val } });
  }
  function nextDilemma() {
    if (dilemmaIdx < quiz.dilemmas.length - 1) onChange({ ...s, step, dilemmaIdx: dilemmaIdx + 1 });
    else setStep("quiz");
  }

  const quizScore = quiz.quiz.filter((q, i) => quizAnswers[i] === q.correct).length;
  const allQuizAnswered = quiz.quiz.every((_, i) => quizAnswers[i] !== undefined);

  // INTRO
  if (step === "intro") return (
    <div>
      <Intro emoji={quiz.emoji} title={quiz.title}
        desc="כל חודש מסתיים במשחקון קצר — דילמה אחת ושאלות הבנה. בלי ציונים שפוסלים — רק לחשוב ולהרגיש." />
      <Card>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>
          המשחקון כולל שני חלקים:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { icon: "🎭", title: "דילמות", desc: "מצבים מהחיים — מה היית עושה?" },
            { icon: "🧠", title: "קוויז", desc: "כמה שאלות על מה שלמדת החודש" },
          ].map(item => (
            <div key={item.icon} style={{ display: "flex", gap: 12, padding: "12px 14px", borderRadius: 12, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div>
                <p style={{ color: "#c4b5fd", fontWeight: 600, fontSize: 14, margin: "0 0 2px" }}>{item.title}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <button onClick={() => setStep("dilemma")} style={{
        marginTop: 16, width: "100%", padding: "14px", borderRadius: 14,
        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
        border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer"
      }}>יאללה, מתחילים! ←</button>
    </div>
  );

  // DILEMMA
  if (step === "dilemma") {
    const d = quiz.dilemmas[dilemmaIdx];
    const answered = dilemmaAnswers[d.id];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>דילמה {dilemmaIdx + 1} מתוך {quiz.dilemmas.length}</span>
          <span style={{ color: "#c4b5fd", fontSize: 13, fontWeight: 600 }}>🎭 מה היית עושה?</span>
        </div>
        <Card style={{ marginBottom: 16, border: "1px solid rgba(124,58,237,0.25)", background: "rgba(124,58,237,0.06)" }}>
          <p style={{ color: "#fff", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{d.scenario}</p>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {d.options.map(opt => {
            const isSel = answered === opt.value;
            return (
              <button key={opt.value} onClick={() => !answered && answerDilemma(d.id, opt.value)} style={{
                padding: "14px 16px", borderRadius: 12, textAlign: "right",
                background: isSel ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.04)",
                border: isSel ? "1.5px solid #7c3aed" : "1px solid rgba(255,255,255,0.1)",
                color: isSel ? "#e9d5ff" : "#fff", fontSize: 14, cursor: answered ? "default" : "pointer",
                lineHeight: 1.5
              }}>{opt.text}</button>
            );
          })}
        </div>
        {answered && (
          <Card style={{ marginBottom: 16, border: "1px solid rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.06)" }}>
            <p style={{ color: "#6ee7b7", fontWeight: 600, fontSize: 13, margin: "0 0 6px" }}>💬 מה חושבים על זה?</p>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{d.feedback[answered]}</p>
          </Card>
        )}
        {answered && (
          <button onClick={nextDilemma} style={{
            width: "100%", padding: "13px", borderRadius: 12,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer"
          }}>
            {dilemmaIdx < quiz.dilemmas.length - 1 ? "דילמה הבאה →" : "עכשיו לקוויז →"}
          </button>
        )}
      </div>
    );
  }

  // QUIZ
  if (step === "quiz") return (
    <div>
      <p style={{ color: "#c4b5fd", fontWeight: 600, fontSize: 15, margin: "0 0 16px", textAlign: "center" }}>🧠 קוויז — {quiz.dilemmas.length === 2 ? "3" : "3"} שאלות</p>
      {quiz.quiz.map((q, i) => {
        const ans = quizAnswers[i];
        const correct = ans === q.correct;
        return (
          <Card key={i} style={{ marginBottom: 14 }}>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: "0 0 12px" }}>
              {i + 1}. {q.q}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.options.map((opt, oi) => {
                const isSel = ans === oi;
                const isCorrect = oi === q.correct;
                let bg = "rgba(255,255,255,0.04)";
                let border = "1px solid rgba(255,255,255,0.1)";
                let color = "#fff";
                if (ans !== undefined) {
                  if (isCorrect) { bg = "rgba(16,185,129,0.15)"; border = "1px solid rgba(16,185,129,0.4)"; color = "#6ee7b7"; }
                  else if (isSel) { bg = "rgba(239,68,68,0.12)"; border = "1px solid rgba(239,68,68,0.3)"; color = "#fca5a5"; }
                }
                return (
                  <button key={oi} onClick={() => ans === undefined && answerQuiz(i, oi)} style={{
                    padding: "10px 14px", borderRadius: 10, textAlign: "right",
                    background: bg, border, color, fontSize: 13,
                    cursor: ans !== undefined ? "default" : "pointer", lineHeight: 1.5
                  }}>
                    {ans !== undefined && isCorrect && "✓ "}{opt}
                  </button>
                );
              })}
            </div>
          </Card>
        );
      })}
      {allQuizAnswered && (
        <button onClick={() => setStep("result")} style={{
          width: "100%", padding: "13px", borderRadius: 12,
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8
        }}>ראה תוצאות →</button>
      )}
    </div>
  );

  // RESULT
  if (step === "result") {
    const pct = Math.round((quizScore / quiz.quiz.length) * 100);
    const msgs = [
      { min: 0, emoji: "💪", text: "לא נורא — הדברים האלה לוקחים זמן. הכי חשוב שניסית וחשבת." },
      { min: 40, emoji: "👍", text: "יפה! אתה בדרך הנכונה. המשך לשאול שאלות." },
      { min: 70, emoji: "🌟", text: "מרשים! הראית שהפנמת את מה שלמדת החודש." },
      { min: 100, emoji: "🏆", text: "מושלם! שולט בחומר לגמרי — החודש הזה היה שלך." },
    ];
    const msg = [...msgs].reverse().find(m => pct >= m.min);
    return (
      <div>
        <div style={{ textAlign: "center", padding: "32px 0 24px" }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{msg.emoji}</div>
          <p style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>{pct}% בקוויז</p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: 0 }}>{quizScore}/{quiz.quiz.length} תשובות נכונות</p>
        </div>
        <Card style={{ border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", marginBottom: 20 }}>
          <p style={{ color: "#c4b5fd", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{msg.text}</p>
        </Card>
        <Card style={{ border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.05)" }}>
          <Label>💭 משהו שלמדת על עצמך החודש הזה?</Label>
          <TextInput multiline value={s.takeaway || ""} onChange={v => onChange({ ...s, takeaway: v })}
            placeholder="החודש הזה גיליתי ש..." />
        </Card>
      </div>
    );
  }
  return null;
}

export const MONTH_QUIZ_IDS = Object.keys(MONTH_QUIZZES);

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
  t13: T13_EmotionJournal,
  t14: T14_BraveConversation,
  t15: T15_Volunteer,
  t16: T16_Commitment,
  t17: T17_PhysicalGoal,
  t18: T18_TrainingPlan,
  t19: T19_AchieveGoal,
  t20: T20_PlanRoute,
  t21: T21_TakeTrip,
  t22: T22_TripBudget,
  t23: T23_TripReport,
};

export const CHAPTER_CLIMAX = {
  1: Ch1Climax,
  2: Ch2Climax,
};

export const MONTH_QUIZZES_CH2 = {
  m5: { component: QuizM5, title: "סיכום חודש מרץ — רגשות וחוסן", emoji: "🌊" },
  m6: { component: QuizM6, title: "סיכום חודש אפריל — קהילה ותרומה", emoji: "🗺️" },
  m7: { component: QuizM7, title: "סיכום חודש מאי — אתגר פיזי", emoji: "💪" },
  m8: { component: QuizM8, title: "סיכום חודש יוני — נסיעה עצמאית", emoji: "🗺️" },
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
          ? <ActivityComponent state={activityData} onChange={saveActivity} isParent={isParent} data={data} save={save} />
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
