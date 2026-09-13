"use client";

import {
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  Code2,
  FolderKanban,
  Heart,
  Home as HomeIcon,
  Info,
  Link2,
  Mail,
  MessageCircle,
  Moon,
  Music2,
  Pause,
  Play,
  Settings,
  Star,
  Sun,
} from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

const DESIGN_WIDTH = 1363;
const DESIGN_HEIGHT = 936;

const navItems = [
  { name: "首页", icon: HomeIcon },
  { name: "日志", icon: BookOpenText },
  { name: "项目", icon: FolderKanban },
  { name: "关于", icon: Info },
  { name: "链接", icon: Link2 },
] as const;

const week = ["一", "二", "三", "四", "五", "六", "日"];

function buildMonth(year: number, month: number) {
  const first = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: first + count }, (_, index) =>
    index < first ? null : index - first + 1,
  );
}

function useClock() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setDate(new Date());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return {
    time: date
      ? [date.getHours(), date.getMinutes()]
          .map((value) => String(value).padStart(2, "0"))
          .join(":")
      : "16:44",
    dateLabel: date
      ? `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 周${"日一二三四五六"[date.getDay()]}`
      : "2026/9/13 周日",
  };
}

export default function Home() {
  const { time, dateLabel } = useClock();
  const today = new Date();
  const [active, setActive] = useState("首页");
  const [night, setNight] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [toast, setToast] = useState("");
  const [scale, setScale] = useState(1);
  const days = useMemo(() => buildMonth(month.getFullYear(), month.getMonth()), [month]);
  const calendarTitle = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth()
    ? dateLabel
    : `${month.getFullYear()}/${month.getMonth() + 1}`;

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth <= 760) {
        setScale(1);
        return;
      }
      setScale(Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1500);
  }

  return (
    <main className={`scene ${night ? "night" : "day"}`}>
      <div className="ambient-grid" aria-hidden="true" />
      <div
        className="desktop-shell"
        style={{ "--desktop-scale": scale } as CSSProperties}
      >
        <nav className="card nav-panel enter-card" style={{ "--delay": "80ms" } as CSSProperties} aria-label="主导航">
          <a className="brand-row" href="#top" aria-label="Konni 首页">
            {/* A raw local SVG keeps the small site icon crisp and avoids an image optimizer request. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon.svg" alt="Konni 页面图标" />
            <strong>Konni</strong>
            <span>开发中</span>
          </a>
          <div className="nav-label">GENERAL</div>
          <div className="nav-list">
            {navItems.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className={active === name ? "active" : ""}
                onClick={() => {
                  setActive(name);
                  notify(`已切换到「${name}」`);
                }}
              >
                <Icon aria-hidden="true" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </nav>

        <section className="card banner-panel enter-card" style={{ "--delay": "0ms" } as CSSProperties} aria-label="Konni 的像素魔法墙画">
          <div className="banner-art" role="img" aria-label="像素魔法城堡" />
        </section>

        <section className="card hero-panel enter-card" style={{ "--delay": "120ms" } as CSSProperties} id="top">
          <div className="hero-avatar" role="img" aria-label="Konni 像素头像" />
          <h1>Good {night ? "Evening" : "Afternoon"}</h1>
          <p>I&apos;m <span>Konni</span>, Nice to</p>
          <p>meet you!</p>
        </section>

        <section className="card clock-panel enter-card" style={{ "--delay": "160ms" } as CSSProperties} aria-label="当前时间">
          <span className="clock-rune">✦</span>
          <time>{time}</time>
        </section>

        <section className="card calendar-panel enter-card" style={{ "--delay": "200ms" } as CSSProperties} aria-label="日历">
          <header>
            <strong>{calendarTitle}</strong>
            <div>
              <button aria-label="上个月" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft /></button>
              <button aria-label="下个月" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight /></button>
            </div>
          </header>
          <ol className="calendar-grid week-row">
            {week.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <ol className="calendar-grid days-grid">
            {days.map((day, index) => (
              <li key={`${day ?? "blank"}-${index}`}>
                {day ? (
                  <button
                    className={day === selectedDay ? "selected" : ""}
                    onClick={() => setSelectedDay(day)}
                  >{day}</button>
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <div className="social-dock enter-card" style={{ "--delay": "240ms" } as CSSProperties} aria-label="社交链接">
          <a className="github-link" href="https://github.com/konnisan" target="_blank" rel="noreferrer"><Code2 />Github</a>
          <a href="#bilibili" onClick={(event) => { event.preventDefault(); notify("Bilibili 主页待补充"); }}><MessageCircle />Bilibili</a>
          <a href="#rock" onClick={(event) => { event.preventDefault(); notify("洛克王国主题收藏正在整理中"); }}><Star />洛克王国</a>
          <a className="icon-link" href="mailto:hello@example.com" aria-label="发送邮件"><Mail /></a>
        </div>

        <section className="card article-panel enter-card" style={{ "--delay": "280ms" } as CSSProperties}>
          <h2>最新文章</h2>
          <a className="article-row" href="#article" onClick={(event) => { event.preventDefault(); notify("文章详情将在下一阶段开放"); }}>
            <span className="article-thumb" role="img" aria-label="魔法工坊文章封面" />
            <span>
              <strong>在像素与代码之间寻找平衡</strong>
              <small>关于创造、热爱与生活的思考</small>
              <time>2026/9/13</time>
            </span>
          </a>
        </section>

        <section className="card share-panel enter-card" style={{ "--delay": "320ms" } as CSSProperties}>
          <h2>随机推荐</h2>
          <a className="share-row" href="#share" onClick={(event) => { event.preventDefault(); notify("更多灵感收藏正在整理中"); }}>
            <span className="share-thumb" role="img" aria-label="洛克王国风格魔法道具" />
            <span>
              <strong>像素魔法与桌面灵感</strong>
              <small>把喜欢的世界装进自己的主页。</small>
            </span>
          </a>
        </section>

        <section className="card music-panel enter-card" style={{ "--delay": "360ms" } as CSSProperties} aria-label="音乐播放器">
          <Music2 aria-hidden="true" />
          <div><strong>Close To You</strong><span>Konni&apos;s little world</span></div>
          <button aria-label={playing ? "暂停" : "播放"} onClick={() => setPlaying(!playing)}>{playing ? <Pause /> : <Play />}</button>
        </section>

        <button
          className={`card like-button enter-card ${liked ? "liked" : ""}`}
          style={{ "--delay": "400ms" } as CSSProperties}
          aria-label={liked ? "取消喜欢" : "喜欢这个页面"}
          onClick={() => setLiked(!liked)}
        ><Heart /></button>

        <div className="theme-toggle enter-card" style={{ "--delay": "40ms" } as CSSProperties} aria-label="主题切换">
          <button aria-label="浅色模式" className={!night ? "active" : ""} onClick={() => setNight(false)}><Sun /></button>
          <button aria-label="深色模式" className={night ? "active" : ""} onClick={() => setNight(true)}><Moon /></button>
        </div>
        <button className="settings-button enter-card" style={{ "--delay": "50ms" } as CSSProperties} aria-label="设置" onClick={() => notify("设置面板尚未开放")}><Settings /></button>
      </div>
      <output className={`toast ${toast ? "show" : ""}`} aria-live="polite">{toast}</output>
    </main>
  );
}
