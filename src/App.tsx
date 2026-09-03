import { useEffect, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { ArrowUpRight, BookOpenCheck, Moon, ShieldCheck, Sun } from "lucide-react";
import { courses, sampleSelection } from "./demoData";
import { calculateProgress } from "./progress";

function Planner() {
  const [selected, setSelected] = useState<string[]>([]);
  const report = calculateProgress(selected);
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  return <main id="main" className="container planner">
    <div className="page-heading"><p className="eyebrow">INTERACTIVE DEMO / 01</p><h1>เห็นภาพการเรียน<br /><span>ทีละก้าว</span></h1><p>เลือกวิชาสมมติ แล้วดูความคืบหน้าเปลี่ยนทันที ทุกอย่างคำนวณในเบราว์เซอร์</p></div>
    <div className="notice"><ShieldCheck size={20} aria-hidden="true" /><p>ข้อมูลสมมติทั้งหมด ไม่ใช่หลักสูตรหรือผลการเรียนจริง ไม่ต้องเข้าสู่ระบบและไม่รับไฟล์ส่วนตัว</p></div>
    <div className="planner-layout">
      <section className="panel course-panel" aria-labelledby="course-title">
        <div className="panel-heading"><div><p className="eyebrow">DEMO CATALOGUE</p><h2 id="course-title">ลองจัดแผนของคุณ</h2></div><span className="pill">12 วิชาสมมติ</span></div>
        <div className="actions"><button className="primary" onClick={() => setSelected([...sampleSelection])}>โหลดข้อมูลตัวอย่าง</button><button className="secondary" onClick={() => setSelected([])}>ล้างรายการ</button></div>
        <div className="course-list">{courses.map(course => <label key={course.id} className={selected.includes(course.id) ? "course selected" : "course"}>
          <input type="checkbox" checked={selected.includes(course.id)} onChange={() => toggle(course.id)} />
          <span className="course-copy"><small>{course.id}</small><strong>{course.title}</strong></span><span className="course-credit">{course.credits}<small>หน่วย</small></span>
        </label>)}</div>
      </section>
      <aside className="progress-stack" aria-label="ผลการคำนวณ">
        <section className="score-panel" aria-live="polite" aria-atomic="true"><p className="eyebrow">YOUR DEMO PROGRESS</p><div className="score"><strong>{report.earned}</strong><span>/ {report.required} หน่วย</span></div><progress value={report.earned} max={report.required} aria-label="ความคืบหน้ารวม" /><div className="score-caption"><span>สำเร็จ {report.percent}%</span><span>เหลือ {report.remaining} หน่วย</span></div></section>
        <section className="panel"><h2>แต่ละหมวดไปถึงไหน</h2>{report.categories.map(group => <div className="group-progress" key={group.id}><div><strong>{group.title}</strong><span>{group.earned} / {group.required}</span></div><progress value={group.earned} max={group.required} aria-label={group.title} /></div>)}</section>
        <div className="local-note"><ShieldCheck size={22} aria-hidden="true" /><div><strong>ทำงานในหน้านี้เท่านั้น</strong><p>รายการที่เลือกอยู่ในหน่วยความจำ เมื่อรีเฟรชจะเริ่มใหม่ ไม่มีการส่งข้อมูลไปยังเซิร์ฟเวอร์ของแอป</p></div></div>
      </aside>
    </div>
  </main>;
}

function Overview() {
  return <main id="main" className="container overview">
    <section className="hero"><div><p className="eyebrow">COURSEFLOW / PORTFOLIO EDITION</p><h1>เปลี่ยนข้อมูล<br />ให้เป็น<span>แผนที่เข้าใจง่าย</span></h1><p className="hero-description">ตัวอย่างงานออกแบบและพัฒนาเว็บวางแผนการเรียน ใช้ข้อมูลที่แต่งขึ้นใหม่ทั้งหมด เพื่อสาธิตประสบการณ์ใช้งานและการคำนวณความคืบหน้า</p><Link className="primary inline-action" to="/credit-check">ทดลองเดโม <ArrowUpRight size={19} aria-hidden="true" /></Link><p className="hero-note">ไม่มีบัญชีผู้ใช้ · ไม่มีการอัปโหลด · ไม่มีการเชื่อมระบบจริง</p></div>
      <div className="hero-preview"><div className="preview-top"><BookOpenCheck size={28} aria-hidden="true" /><span>SYNTHETIC DATA</span></div><p>ภาพรวมที่อ่านได้ในพริบตา</p><div className="preview-number">21<span>/ 36</span></div><progress value={21} max={36} aria-label="ตัวอย่างความคืบหน้า" /><div className="preview-row"><span>พื้นฐานการคิด</span><strong>9 / 9</strong></div><div className="preview-row"><span>สตูดิโอออกแบบ</span><strong>12 / 18</strong></div><div className="preview-row"><span>พื้นที่ทดลอง</span><strong>0 / 9</strong></div><small>ตัวเลขสาธิต ไม่ใช่ผลการเรียนของบุคคลจริง</small></div>
    </section>
    <section className="feature-grid" aria-label="ขอบเขตผลงาน"><article><span>01</span><h2>ออกแบบเพื่อความชัดเจน</h2><p>ลำดับข้อมูลที่อ่านง่าย รองรับมือถือ โหมดสว่างและมืด</p></article><article><span>02</span><h2>คำนวณตรวจสอบได้</h2><p>แยกข้อมูลสมมติออกจากฟังก์ชันคำนวณ พร้อมชุดทดสอบอัตโนมัติ</p></article><article><span>03</span><h2>แยกจากระบบจริง</h2><p>ไม่มีข้อมูลนักศึกษา ข้อมูลสถาบัน หรือการเชื่อมบริการเบื้องหลัง</p></article></section>
  </main>;
}

function About() {
  return <main id="main" className="container about"><p className="eyebrow">ABOUT THIS EDITION</p><h1>ผลงานสาธิต<br /><span>ที่รู้ขอบเขตชัดเจน</span></h1>
    <section className="panel"><h2>เครดิตเจ้าของผลงาน</h2><p>Project owner: <strong>Janon7300</strong></p><p>CourseFlow Portfolio เป็นเวอร์ชันสาธิตแยกจากระบบใช้งานจริง ไลบรารีภายนอกยังคงเป็นผลงานและอยู่ภายใต้สัญญาอนุญาตของผู้พัฒนาแต่ละราย</p></section>
    <section className="panel"><h2>ข้อมูลนี้มาจากที่ไหน?</h2><p>ชื่อวิชา รหัสที่ขึ้นต้นด้วย DEMO- จำนวนหน่วย และกฎการคำนวณถูกแต่งขึ้นเพื่อเดโมนี้ ไม่ได้อ้างอิงหลักสูตรของมหาวิทยาลัยใด และไม่ควรใช้ตัดสินใจด้านการเรียนจริง</p></section>
    <section className="panel"><h2>มีข้อมูลใดถูกส่งออกหรือบันทึกไว้?</h2><p>แอปไม่มี backend, analytics, login, แบบฟอร์มภายนอก หรือบริการ AI รายการที่เลือกเก็บชั่วคราวในหน่วยความจำ มีเพียงค่าธีมที่บันทึกใน localStorage ของอุปกรณ์ ไม่มีช่องให้ป้อนข้อมูลส่วนตัว ทั้งนี้ผู้ให้บริการโฮสติ้งอาจมี access log ตามการตั้งค่าของตน</p></section>
  </main>;
}

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("courseflow-demo-theme", theme); } catch { /* Theme still works without storage. */ }
  }, [theme]);
  return <BrowserRouter><a href="#main" className="skip-link">ข้ามไปเนื้อหา</a><header className="site-header"><div className="container nav"><Link to="/" className="brand" aria-label="CourseFlow หน้าหลัก">Course<span>Flow</span><small>DEMO</small></Link><nav aria-label="เมนูหลัก"><NavLink to="/" end>ภาพรวม</NavLink><NavLink to="/credit-check">ทดลองเดโม</NavLink><NavLink to="/help">เกี่ยวกับผลงาน</NavLink></nav><button className="theme-button" onClick={() => setTheme(current => current === "light" ? "dark" : "light")} aria-label={theme === "light" ? "ใช้โหมดมืด" : "ใช้โหมดสว่าง"}>{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}</button></div></header>
    <Routes><Route path="/" element={<Overview />} /><Route path="/credit-check" element={<Planner />} /><Route path="/help" element={<About />} /><Route path="*" element={<main id="main" className="container about"><h1>ไม่พบหน้านี้</h1><Link className="primary inline-action" to="/">กลับหน้าหลัก</Link></main>} /></Routes>
    <footer className="site-footer"><div className="container"><strong>Course<span>Flow</span> Portfolio</strong><p>© 2026 Janon7300 · Project owner · All rights reserved.</p><small>ข้อมูลสมมติทั้งหมด ไม่เกี่ยวข้องกับสถาบันหรือบุคคลจริง</small></div></footer>
  </BrowserRouter>;
}
