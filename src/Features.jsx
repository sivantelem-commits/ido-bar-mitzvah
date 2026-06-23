// ─── Gallery, Share & PDF Features ──────────────────────────────────────────
// Import into App.jsx

import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Tasks that support photo uploads
export const PHOTO_TASKS = {
  t10: "בישול ארוחה מלאה",
  t11: "כביסה וניהול זמן",
  t12: "תכנון יום משפחתי",
  t24: "תיקון בבית",
  t25: "שימוש בכלים",
  t26: "יום עצמאות מלא",
  t28: "הדלקת גזייה/מדורה",
  t29: "הקמת אוהל",
  t30: "לינת שטח משפחתית",
  t37: "ביצוע הפרויקט",
  t41: "הצגת המסע",
  t42: "טקס הסיום",
};

// ─── Photo Upload Component ───────────────────────────────────────────────────
export function PhotoUpload({ taskId, taskName, data, save }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const photos = (data.photos || {})[taskId] || [];

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("הקובץ גדול מדי — מקסימום 5MB"); return; }

    setUploading(true);
    setError(null);

    try {
      const ext = file.name.split(".").pop();
      const path = `${taskId}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("journey-photos")
        .upload(path, file, { contentType: file.type });

      if (upErr) throw upErr;

      const { data: urlData } = supabase.storage
        .from("journey-photos")
        .getPublicUrl(path);

      const newPhotos = { ...(data.photos || {}), [taskId]: [...photos, { url: urlData.publicUrl, path, date: new Date().toLocaleDateString("he-IL"), caption: "" }] };
      save({ ...data, photos: newPhotos });
    } catch (err) {
      setError("שגיאה בהעלאה — נסה שוב");
      console.error(err);
    } finally {
      setUploading(false);
      fileRef.current.value = "";
    }
  }

  async function deletePhoto(photo) {
    try {
      await supabase.storage.from("journey-photos").remove([photo.path]);
      const newPhotos = { ...(data.photos || {}), [taskId]: photos.filter(p => p.path !== photo.path) };
      save({ ...data, photos: newPhotos });
    } catch (err) { console.error(err); }
  }

  function updateCaption(path, caption) {
    const newPhotos = { ...(data.photos || {}), [taskId]: photos.map(p => p.path === path ? { ...p, caption } : p) };
    save({ ...data, photos: newPhotos });
  }

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14, margin: 0 }}>📸 תמונות מהמשימה</p>
        <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ padding: "8px 16px", borderRadius: 10, background: uploading ? "#f3f4f6" : "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: uploading ? "#9ca3af" : "#fff", fontSize: 13, fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          {uploading ? "⏳ מעלה..." : "📷 הוסף תמונה"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
      </div>

      {error && <p style={{ color: "#ef4444", fontSize: 13, margin: "0 0 12px" }}>{error}</p>}

      {photos.length === 0 ? (
        <div onClick={() => fileRef.current?.click()} style={{ border: "2px dashed #e5e7eb", borderRadius: 14, padding: "28px 20px", textAlign: "center", cursor: "pointer", background: "#fafafa" }}>
          <p style={{ fontSize: 32, margin: "0 0 8px" }}>📷</p>
          <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>לחץ להוסיף תמונה מהמשימה</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {photos.map(photo => (
            <div key={photo.path} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #e5e7eb", background: "#fff", boxShadow: "0 1px 4px rgba(124,58,237,0.06)" }}>
              <div style={{ position: "relative" }}>
                <img src={photo.url} alt={taskName} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                <button onClick={() => deletePhoto(photo)} style={{ position: "absolute", top: 6, left: 6, width: 26, height: 26, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                <span style={{ position: "absolute", bottom: 6, right: 6, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 10, padding: "2px 7px", borderRadius: 10 }}>{photo.date}</span>
              </div>
              <div style={{ padding: "10px 12px" }}>
                <input value={photo.caption || ""} onChange={e => updateCaption(photo.path, e.target.value)} placeholder="הוסף כיתוב..." style={{ width: "100%", border: "none", outline: "none", fontSize: 12, color: "#6b7280", background: "transparent", direction: "rtl" }} />
              </div>
            </div>
          ))}
          <div onClick={() => fileRef.current?.click()} style={{ border: "2px dashed #e5e7eb", borderRadius: 14, minHeight: 140, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "#fafafa", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 28 }}>+</span>
            <span style={{ color: "#9ca3af", fontSize: 12 }}>הוסף עוד</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Gallery View ─────────────────────────────────────────────────────────────
export function GalleryView({ data }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const allPhotos = Object.entries(data.photos || {}).flatMap(([taskId, photos]) =>
    (photos || []).map(p => ({ ...p, taskId, taskName: PHOTO_TASKS[taskId] || taskId }))
  ).sort((a, b) => b.date?.localeCompare(a.date || "") || 0);

  const tasks = [...new Set(allPhotos.map(p => p.taskId))];

  const filtered = filter === "all" ? allPhotos : allPhotos.filter(p => p.taskId === filter);

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", borderRadius: 20, padding: "22px 20px", marginBottom: 20, color: "#fff", textAlign: "center" }}>
        <p style={{ fontSize: 36, margin: "0 0 6px" }}>📸</p>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px", color: "#fff" }}>גלריית המסע</h2>
        <p style={{ fontSize: 13, opacity: 0.85, margin: 0, color: "#fff" }}>{allPhotos.length} תמונות</p>
      </div>

      {/* Filter */}
      {tasks.length > 1 && (
        <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
          <button onClick={() => setFilter("all")} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 13, cursor: "pointer", flexShrink: 0, background: filter === "all" ? "rgba(124,58,237,0.15)" : "#fff", border: filter === "all" ? "1.5px solid #7c3aed" : "1px solid #e5e7eb", color: filter === "all" ? "#7c3aed" : "#6b7280", fontWeight: filter === "all" ? 600 : 400 }}>הכל</button>
          {tasks.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 12, cursor: "pointer", flexShrink: 0, background: filter === t ? "rgba(124,58,237,0.15)" : "#fff", border: filter === t ? "1.5px solid #7c3aed" : "1px solid #e5e7eb", color: filter === t ? "#7c3aed" : "#6b7280", fontWeight: filter === t ? 600 : 400 }}>{PHOTO_TASKS[t] || t}</button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontSize: 48, margin: "0 0 12px" }}>📷</p>
          <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 16, margin: "0 0 6px" }}>עדיין אין תמונות</p>
          <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>תמונות יופיעו כשתעלה אותן ממשימות</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {filtered.map((photo, i) => (
            <div key={`${photo.path}-${i}`} onClick={() => setSelected(photo)} style={{ borderRadius: 12, overflow: "hidden", cursor: "pointer", aspectRatio: "1", position: "relative", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <img src={photo.url} alt={photo.taskName} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)", opacity: 0, transition: "opacity 0.2s" }} />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 600, width: "100%", background: "#fff", borderRadius: 20, overflow: "hidden" }}>
            <img src={selected.url} alt={selected.taskName} style={{ width: "100%", maxHeight: 400, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "16px 20px" }}>
              <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 14, margin: "0 0 4px" }}>{selected.taskName}</p>
              {selected.caption && <p style={{ color: "#4b5563", fontSize: 14, margin: "0 0 4px", lineHeight: 1.5 }}>{selected.caption}</p>}
              <p style={{ color: "#9ca3af", fontSize: 12, margin: 0 }}>{selected.date}</p>
            </div>
            <div style={{ padding: "0 20px 16px", display: "flex", gap: 10 }}>
              <button onClick={() => {
                const idx = filtered.indexOf(selected);
                if (idx > 0) setSelected(filtered[idx - 1]);
              }} disabled={filtered.indexOf(selected) === 0} style={{ flex: 1, padding: "10px", borderRadius: 10, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#6b7280", cursor: "pointer", fontSize: 18, fontWeight: 600 }}>›</button>
              <button onClick={() => setSelected(null)} style={{ flex: 2, padding: "10px", borderRadius: 10, background: "rgba(124,58,237,0.1)", border: "1.5px solid rgba(124,58,237,0.2)", color: "#7c3aed", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>סגור</button>
              <button onClick={() => {
                const idx = filtered.indexOf(selected);
                if (idx < filtered.length - 1) setSelected(filtered[idx + 1]);
              }} disabled={filtered.indexOf(selected) === filtered.length - 1} style={{ flex: 1, padding: "10px", borderRadius: 10, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#6b7280", cursor: "pointer", fontSize: 18, fontWeight: 600 }}>‹</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Share View ───────────────────────────────────────────────────────────────
export function ShareView({ data }) {
  const [copied, setCopied] = useState(false);
  const totalDone = Object.values(data.completed || {}).filter(Boolean).length;
  const overallPct = Math.round((totalDone / 42) * 100);
  const shareUrl = `${window.location.origin}?share=ido&pct=${overallPct}`;

  function copyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function shareWhatsApp() {
    const text = `🧭 עידו בדרך לבר מצווה!\n\n✅ ${totalDone}/42 משימות הושלמו (${overallPct}%)\n\nראו את המסע שלו:\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  const chapterProgress = [
    { emoji: "🌿", title: "שורשים וזהות", ids: ["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12"] },
    { emoji: "🧭", title: "אחריות ועצמאות", ids: ["t13","t14","t15","t16","t17","t18","t19","t20","t21","t22","t23"] },
    { emoji: "🔥", title: "מסע והתנסות", ids: ["t24","t25","t26","t27","t28","t29","t30","t31","t32","t33","t34"] },
    { emoji: "🚀", title: "חזון והובלה", ids: ["t35","t36","t37","t38","t39","t40","t41","t42"] },
  ];

  return (
    <div>
      {/* Preview card */}
      <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 4px 20px rgba(124,58,237,0.1)", marginBottom: 20 }}>
        {/* Card header */}
        <div style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", padding: "24px 20px", textAlign: "center" }}>
          <p style={{ fontSize: 40, margin: "0 0 8px" }}>🧭</p>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>עידו בדרך לבר מצווה</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, margin: 0 }}>שנת מסע 2026–2027</p>
        </div>

        {/* Progress */}
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "#1e1b4b", fontWeight: 700, fontSize: 16 }}>{overallPct}% הושלם</span>
            <span style={{ color: "#9ca3af", fontSize: 13 }}>{totalDone}/42 משימות</span>
          </div>
          <div style={{ height: 10, borderRadius: 5, background: "#f3f4f6", marginBottom: 20 }}>
            <div style={{ height: "100%", borderRadius: 5, background: "linear-gradient(90deg, #7c3aed, #a855f7)", width: `${overallPct}%`, transition: "width 0.5s" }} />
          </div>

          {/* Chapter bars */}
          {chapterProgress.map(ch => {
            const done = ch.ids.filter(id => data.completed?.[id]).length;
            const pct = Math.round((done / ch.ids.length) * 100);
            return (
              <div key={ch.title} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 16, width: 24 }}>{ch.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ color: "#4b5563", fontSize: 12 }}>{ch.title}</span>
                    <span style={{ color: "#7c3aed", fontSize: 12, fontWeight: 600 }}>{pct}%</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: "#f3f4f6" }}>
                    <div style={{ height: "100%", borderRadius: 3, background: "#7c3aed", width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Values */}
          {(data.values || []).length > 0 && (
            <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 12, background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <p style={{ color: "#9ca3af", fontSize: 11, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>⭐ הערכים שלי</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {(data.values || []).map(v => (
                  <span key={v} style={{ padding: "4px 12px", borderRadius: 20, background: "rgba(124,58,237,0.1)", color: "#7c3aed", fontSize: 12, fontWeight: 600 }}>{v}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={shareWhatsApp} style={{ padding: "14px 20px", borderRadius: 14, background: "#25D366", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>💬</span> שלח בWhatsApp
        </button>
        <button onClick={copyLink} style={{ padding: "14px 20px", borderRadius: 14, background: copied ? "rgba(16,185,129,0.1)" : "rgba(124,58,237,0.1)", border: copied ? "1.5px solid rgba(16,185,129,0.4)" : "1.5px solid rgba(124,58,237,0.3)", color: copied ? "#059669" : "#7c3aed", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>{copied ? "✓" : "🔗"}</span> {copied ? "הקישור הועתק!" : "העתק קישור"}
        </button>
      </div>

      <p style={{ color: "#9ca3af", fontSize: 12, textAlign: "center", margin: "16px 0 0", lineHeight: 1.5 }}>
        כל מי שיקבל את הקישור יוכל לראות את ההתקדמות של עידו במסע
      </p>
    </div>
  );
}

// ─── PDF Generator (client-side HTML print) ───────────────────────────────────
export function PDFView({ data }) {
  const [generating, setGenerating] = useState(false);
  const totalDone = Object.values(data.completed || {}).filter(Boolean).length;
  const overallPct = Math.round((totalDone / 42) * 100);

  function generatePDF() {
    setGenerating(true);

    const insights = (data.taskData?.t39?.insights || []).filter(i => i?.text);
    const journal = [...(data.journal || [])].reverse().slice(0, 10);
    const letter = data.taskData?.t40?.letter || "";
    const values = data.values || [];
    const speech = data.taskData?.t38;

    const html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="UTF-8">
<title>ספר המסע של עידו</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;600;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Heebo', Arial, sans-serif; direction: rtl; color: #1e1b4b; background: #fff; }
  .page { width: 210mm; min-height: 297mm; padding: 20mm; page-break-after: always; }
  .page:last-child { page-break-after: avoid; }
  h1 { font-size: 36pt; font-weight: 900; color: #7c3aed; margin-bottom: 8px; }
  h2 { font-size: 20pt; font-weight: 700; color: #7c3aed; margin: 24px 0 12px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
  h3 { font-size: 14pt; font-weight: 600; color: #1e1b4b; margin: 16px 0 8px; }
  p { font-size: 11pt; line-height: 1.8; color: #374151; margin-bottom: 8px; }
  .cover { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; min-height: 297mm; background: linear-gradient(135deg, #f4f2ff 0%, #ede9fe 100%); }
  .cover h1 { font-size: 48pt; margin-bottom: 12px; }
  .cover .subtitle { font-size: 16pt; color: #7c3aed; margin-bottom: 32px; }
  .cover .year { font-size: 13pt; color: #9ca3af; }
  .stat-box { display: inline-block; padding: 16px 28px; border-radius: 12px; background: #fff; border: 2px solid #e5e7eb; margin: 8px; text-align: center; vertical-align: top; }
  .stat-value { font-size: 28pt; font-weight: 900; color: #7c3aed; display: block; }
  .stat-label { font-size: 10pt; color: #9ca3af; display: block; margin-top: 4px; }
  .value-tag { display: inline-block; padding: 6px 16px; border-radius: 20px; background: rgba(124,58,237,0.1); color: #7c3aed; font-weight: 600; font-size: 12pt; margin: 4px; }
  .journal-entry { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
  .journal-date { font-size: 9pt; color: #9ca3af; margin-bottom: 6px; }
  .chapter-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
  .chapter-emoji { font-size: 24pt; width: 40px; }
  .chapter-info { flex: 1; }
  .chapter-bar { height: 8px; border-radius: 4px; background: #f3f4f6; margin-top: 6px; }
  .chapter-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #7c3aed, #a855f7); }
  .insight-item { padding: 14px; border-right: 3px solid #7c3aed; padding-right: 16px; margin-bottom: 12px; background: rgba(124,58,237,0.03); border-radius: 0 8px 8px 0; }
  .letter-box { border: 2px solid rgba(124,58,237,0.2); border-radius: 14px; padding: 24px; background: #fdf8ff; white-space: pre-wrap; line-height: 2; font-size: 12pt; }
  .speech-section { margin-bottom: 20px; }
  .speech-label { font-size: 9pt; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head>
<body>

<!-- COVER -->
<div class="page cover">
  <p style="font-size: 64pt; margin-bottom: 20px;">🧭</p>
  <h1>ספר המסע</h1>
  <p class="subtitle">של עידו — שנת בר מצווה</p>
  <p class="year">נובמבר 2026 — נובמבר 2027</p>
  <div style="margin-top: 48px;">
    <div class="stat-box"><span class="stat-value">${totalDone}</span><span class="stat-label">משימות הושלמו</span></div>
    <div class="stat-box"><span class="stat-value">${overallPct}%</span><span class="stat-label">מהמסע</span></div>
    <div class="stat-box"><span class="stat-value">${data.journal?.length || 0}</span><span class="stat-label">כניסות יומן</span></div>
  </div>
</div>

<!-- PROGRESS -->
<div class="page">
  <h2>📊 התקדמות המסע</h2>
  ${[
    { emoji: "🌿", title: "שורשים וזהות", period: "נובמבר 2026 – פברואר 2027", ids: ["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12"] },
    { emoji: "🧭", title: "אחריות ועצמאות בעולם", period: "מרץ – יוני 2027", ids: ["t13","t14","t15","t16","t17","t18","t19","t20","t21","t22","t23"] },
    { emoji: "🔥", title: "מסע והתנסות אמיתית", period: "יולי – אוקטובר 2027", ids: ["t24","t25","t26","t27","t28","t29","t30","t31","t32","t33","t34"] },
    { emoji: "🚀", title: "חזון והובלה אישית", period: "נובמבר 2027", ids: ["t35","t36","t37","t38","t39","t40","t41","t42"] },
  ].map(ch => {
    const done = ch.ids.filter(id => data.completed?.[id]).length;
    const pct = Math.round((done / ch.ids.length) * 100);
    return `<div class="chapter-row">
      <span class="chapter-emoji">${ch.emoji}</span>
      <div class="chapter-info">
        <strong>${ch.title}</strong><br>
        <span style="font-size:9pt;color:#9ca3af">${ch.period}</span>
        <div class="chapter-bar"><div class="chapter-fill" style="width:${pct}%"></div></div>
      </div>
      <strong style="color:#7c3aed;font-size:14pt">${pct}%</strong>
    </div>`;
  }).join("")}

  ${values.length > 0 ? `<h2>⭐ הערכים שלי</h2><p>${values.map(v => `<span class="value-tag">${v}</span>`).join("")}</p>` : ""}
</div>

${speech?.opening ? `
<!-- SPEECH -->
<div class="page">
  <h2>🎤 הנאום שלי</h2>
  ${speech.opening ? `<div class="speech-section"><p class="speech-label">פתיחה</p><p>${speech.opening}</p></div>` : ""}
  ${speech.journey ? `<div class="speech-section"><p class="speech-label">המסע</p><p>${speech.journey}</p></div>` : ""}
  ${speech.insight ? `<div class="speech-section"><p class="speech-label">תובנה</p><p>${speech.insight}</p></div>` : ""}
  ${speech.gratitude ? `<div class="speech-section"><p class="speech-label">תודה</p><p>${speech.gratitude}</p></div>` : ""}
  ${speech.future ? `<div class="speech-section"><p class="speech-label">להמשך</p><p>${speech.future}</p></div>` : ""}
</div>
` : ""}

${insights.length > 0 ? `
<!-- INSIGHTS -->
<div class="page">
  <h2>💡 5 תובנות מהשנה</h2>
  ${insights.map((ins, i) => `
    <div class="insight-item">
      <strong>${i+1}. ${ins.category || ""}</strong>
      <p>${ins.text}</p>
    </div>
  `).join("")}
</div>
` : ""}

${journal.length > 0 ? `
<!-- JOURNAL -->
<div class="page">
  <h2>📝 מהיומן שלי</h2>
  <p style="color:#9ca3af;font-size:10pt;margin-bottom:16px">10 הכניסות האחרונות</p>
  ${journal.map(e => `
    <div class="journal-entry">
      <p class="journal-date">${e.date}</p>
      <p>${e.text}</p>
    </div>
  `).join("")}
</div>
` : ""}

${letter ? `
<!-- LETTER -->
<div class="page">
  <h2>✉️ מכתב לעצמי</h2>
  <p style="color:#9ca3af;font-size:11pt;margin-bottom:16px">נפתח ב${data.taskData?.t40?.openAge || "עתיד"}</p>
  <div class="letter-box">${letter}</div>
</div>
` : ""}

<!-- BACK COVER -->
<div class="page" style="background:linear-gradient(135deg,#f4f2ff,#ede9fe);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
  <p style="font-size:48pt;margin-bottom:16px">🏆</p>
  <h1 style="font-size:28pt">ברוך הבא לבגרות</h1>
  <p style="font-size:14pt;color:#7c3aed;margin-top:12px">עידו, נובמבר 2027</p>
</div>

</body>
</html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    win.onload = () => {
      win.print();
      setGenerating(false);
    };
  }

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", borderRadius: 20, padding: "24px 20px", marginBottom: 20, textAlign: "center" }}>
        <p style={{ fontSize: 40, margin: "0 0 8px" }}>📄</p>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>ספר המסע PDF</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, margin: 0 }}>כל השנה — בדף אחד להדפסה</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #e5e7eb", marginBottom: 20, boxShadow: "0 1px 4px rgba(124,58,237,0.06)" }}>
        <p style={{ color: "#1e1b4b", fontWeight: 600, fontSize: 14, margin: "0 0 14px" }}>הPDF יכלול:</p>
        {[
          ["📊", "עמוד שער + סטטיסטיקות"],
          ["📈", "התקדמות לפי פרקים"],
          ["⭐", "הערכים שנבחרו"],
          speech?.opening && ["🎤", "הנאום האישי"],
          (data.taskData?.t39?.insights || []).filter(i => i?.text).length > 0 && ["💡", "5 תובנות מהשנה"],
          (data.journal || []).length > 0 && ["📝", "עשרת כניסות היומן האחרונות"],
          data.taskData?.t40?.letter && ["✉️", "המכתב לעצמי"],
          ["🏆", "עמוד סיום"],
        ].filter(Boolean).map(([icon, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span style={{ color: "#374151", fontSize: 14 }}>{label}</span>
          </div>
        ))}
      </div>

      <button onClick={generatePDF} disabled={generating} style={{ width: "100%", padding: "16px", borderRadius: 14, background: generating ? "#f3f4f6" : "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", color: generating ? "#9ca3af" : "#fff", fontSize: 16, fontWeight: 700, cursor: generating ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>{generating ? "⏳" : "📄"}</span>
        {generating ? "מכין את הPDF..." : "צור PDF להדפסה"}
      </button>

      <p style={{ color: "#9ca3af", fontSize: 12, textAlign: "center", margin: "12px 0 0", lineHeight: 1.5 }}>
        יפתח חלון הדפסה — שמור כPDF או הדפס ישירות
      </p>
    </div>
  );
}
