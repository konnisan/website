"use client";

import { useEffect, useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight, Heart, Pause, Play, Settings, SkipBack, SkipForward, Sun, Moon } from "lucide-react";

const navItems = [
  ["首页", "i-home"], ["日志", "i-log"], ["项目", "i-project"], ["关于", "i-about"], ["链接", "i-link"],
] as const;

const shareItems = [
  ["像素场景", "sh-1"], ["魔法道具", "sh-2"], ["桌面美化", "sh-3"], ["灵感收藏", "sh-4"],
] as const;

const waveHeights = [12, 21, 30, 17, 35, 25, 39, 14, 27, 34, 19, 31, 11, 24, 38, 16, 29, 22];

const recipe = [
  { id: "crystal", name: "星辉晶核", asset: "alchemy-crystal" },
  { id: "flower", name: "月露花", asset: "alchemy-flower" },
  { id: "feather", name: "风之羽", asset: "alchemy-feather" },
] as const;

type IngredientId = (typeof recipe)[number]["id"];

function useClock() {
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setDate(new Date());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const time = date ? [date.getHours(), date.getMinutes(), date.getSeconds()].map((value) => String(value).padStart(2, "0")).join(":") : "22:36:18";
  const label = date ? `${date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}　${date.toLocaleDateString("zh-CN", { weekday: "long" })}` : "2025年8月27日　星期三";
  return { time, label };
}

function buildMonth(year: number, month: number) {
  const first = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const prevCount = new Date(year, month, 0).getDate();
  return Array.from({ length: 42 }, (_, index) => {
    if (index < first) return { value: prevCount - first + index + 1, outside: true };
    if (index >= first + count) return { value: index - first - count + 1, outside: true };
    return { value: index - first + 1, outside: false };
  });
}

export default function Home() {
  const { time, label } = useClock();
  const [active, setActive] = useState("首页");
  const [night, setNight] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(true);
  const [month, setMonth] = useState(new Date(2025, 7, 1));
  const [selectedDay, setSelectedDay] = useState(27);
  const [toast, setToast] = useState("");
  const [alchemyActive, setAlchemyActive] = useState(false);
  const [brew, setBrew] = useState<IngredientId[]>([]);
  const [misfire, setMisfire] = useState(false);
  const [brewing, setBrewing] = useState(false);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [dragging, setDragging] = useState<IngredientId | null>(null);
  const [dragPoint, setDragPoint] = useState<{ x: number; y: number } | null>(null);
  const days = useMemo(() => buildMonth(month.getFullYear(), month.getMonth()), [month]);

  useEffect(() => {
    setSecretUnlocked(window.localStorage.getItem("konni-secret-room-v3") === "unlocked");
  }, []);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1300);
  }

  function toggleAlchemy() {
    if (secretUnlocked) {
      notify("炼金秘室入口已经开启");
      return;
    }
    const opening = !alchemyActive;
    setAlchemyActive(opening);
    if (opening) notify("依次投入：星辉晶核、月露花、风之羽");
  }

  function offerIngredient(id: IngredientId) {
    setDragging(null);
    if (brewing || secretUnlocked || brew.includes(id)) return;
    setAlchemyActive(true);
    const expected = recipe[brew.length];
    const ingredient = recipe.find((item) => item.id === id)!;
    if (expected.id !== id) {
      setMisfire(true);
      notify(`${ingredient.name} 的顺序不对，炼金炉把它送回去了`);
      window.setTimeout(() => setMisfire(false), 700);
      return;
    }
    const next = [...brew, id];
    setBrew(next);
    notify(`${ingredient.name} 已投入炼金炉`);
    if (next.length === recipe.length) {
      setBrewing(true);
      window.setTimeout(() => {
        setBrewing(false);
        setAlchemyActive(false);
        setSecretUnlocked(true);
        window.localStorage.setItem("konni-secret-room-v3", "unlocked");
        notify("炼金完成，秘室入口已经显现");
      }, 1250);
    }
  }

  function moveIngredient(event: ReactPointerEvent<HTMLElement>) {
    if (!dragging) return;
    const sceneRect = event.currentTarget.getBoundingClientRect();
    setDragPoint({ x: event.clientX - sceneRect.left, y: event.clientY - sceneRect.top });
  }

  function finishPointerDrop(event: ReactPointerEvent<HTMLElement>) {
    if (!dragging) return;
    const sceneRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - sceneRect.left;
    const y = event.clientY - sceneRect.top;
    const ingredient = dragging;
    setDragging(null);
    setDragPoint(null);
    if (x >= 350 && x <= 468 && y >= 500 && y <= 610) offerIngredient(ingredient);
  }

  return (
    <main className={`scene ${night ? "" : "day"} ${alchemyActive ? "alchemy-on" : ""} ${brewing ? "brewing" : ""} ${misfire ? "misfire" : ""}`} data-testid="scene" onPointerMove={moveIngredient} onPointerUp={finishPointerDrop}>
      <div className="scene-shade" />
      <section className="banner-panel sprite-panel" aria-label="像素炼金城市横幅" />

      {recipe.map((ingredient) => !brew.includes(ingredient.id) && !secretUnlocked && (
        <button
          key={ingredient.id}
          className={`ingredient ${ingredient.asset} ${alchemyActive ? "ready" : ""} ${dragging === ingredient.id ? "dragging" : ""}`}
          aria-label={`材料：${ingredient.name}`}
          data-name={ingredient.name}
          style={dragging === ingredient.id && dragPoint ? { left: dragPoint.x - 38, top: dragPoint.y - 38 } : undefined}
          onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragging(ingredient.id); setAlchemyActive(true); }}
          onClick={() => offerIngredient(ingredient.id)}
        />
      ))}

      <button
        className="alchemy-trigger"
        aria-label={alchemyActive ? "退出炼金模式" : "进入炼金模式"}
        onClick={toggleAlchemy}
      ><span className="sr-only">炼金炉</span></button>

      <div className={`recipe-slots ${alchemyActive || brewing ? "show" : ""}`} aria-label="炼金配方顺序">
        {recipe.map((ingredient, index) => <span key={ingredient.id} className={`${ingredient.asset} ${brew.length > index ? "filled" : ""}`} title={ingredient.name} />)}
      </div>

      {secretUnlocked && (
        <button className="secret-entrance alchemy-portal" aria-label="炼金秘室入口" onClick={() => notify("炼金秘室将在下一阶段开放")}>
          <span className="sr-only">炼金秘室入口</span>
        </button>
      )}

      <section className="panel clock-panel" aria-label="时钟">
        <div className="clock-rune">⌘</div><div className="clock-label">现在是</div>
        <div className="clock-time" data-testid="clock">{time}</div><div className="clock-date">{label}</div>
        <div className="clock-note">{night ? "☾　夜深了，要记得休息哦～" : "☀　晴光正好，记得伸个懒腰～"}</div>
      </section>

      <nav className="panel nav-panel" aria-label="主导航">
        {navItems.map(([name, icon]) => <button key={name} className={active === name ? "active" : ""} onClick={() => { setActive(name); notify(`已切换到「${name}」`); }}><span className={`nav-icon ${icon}`} aria-hidden="true" /><span>{name}</span></button>)}
      </nav>

      <section className="panel hero-panel">
        <div className="hero-media" role="img" aria-label="像素魔法师与精灵" />
        <div className="hero-copy">
          <h1>Hi，我是 Konni 👋</h1>
          <p>一个喜欢像素、魔法与创造的开发者</p><p>在代码与炼金之间，寻找更有趣的可能</p><p>欢迎来到我的小小魔法工坊！</p>
          <button className="write-button" onClick={() => notify("文章编辑器正在准备中")}>✦ 写篇文章</button>
          <div className="hero-quote">“让技术与想象力，一起发光。”</div>
        </div>
      </section>

      <section className="panel calendar-panel" aria-label="日历">
        <div className="calendar-head"><strong>{month.getFullYear()} 年 {month.getMonth() + 1} 月</strong><div className="month-actions"><button aria-label="上个月" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft /></button><button aria-label="下个月" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight /></button></div></div>
        <div className="week-row">{["一", "二", "三", "四", "五", "六", "日"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className="days-grid">{days.map((day, index) => <button key={`${day.value}-${index}`} className={`${day.outside ? "outside" : ""} ${index % 7 > 4 ? "weekend" : ""} ${!day.outside && day.value === selectedDay ? "selected" : ""}`} onClick={() => !day.outside && setSelectedDay(day.value)}>{day.value}</button>)}</div>
      </section>

      <section className="panel social-panel"><h2>社交</h2><div className="social-grid"><a href="https://github.com/konnisan"><span className="social-icon s-github" />GitHub</a><a href="#bilibili"><span className="social-icon s-bilibili" />Bilibili</a><a href="mailto:hello@example.com"><span className="social-icon s-email" />Email</a><a href="#discord"><span className="social-icon s-discord" />Discord</a></div></section>

      <section className="panel article-panel"><header><h2>最新文章</h2><a href="#articles">查看更多 →</a></header><div className="article-body"><div className="article-thumb" aria-hidden="true" /><div><strong>在像素与代码之间寻找平衡</strong><p>关于创造、热爱与生活的思考……</p><time>2025-08-20</time></div></div></section>

      <section className="panel share-panel"><header><h2>精选分享</h2><a href="#shares">查看更多 →</a></header><div className="share-grid">{shareItems.map(([name, asset]) => <div className="share-item" key={name}><div className={`share-thumb ${asset}`} /><span>{name}</span></div>)}</div></section>

      <section className="panel music-panel">
        <h2>正在播放</h2><div className="music-layout"><div className="music-cover" role="img" aria-label={night ? "夜空与月亮的像素音乐封面" : "晴空与云朵的像素音乐封面"} /><div className="music-meta"><strong>夜空中最亮的星</strong><p>追逐着光，前往更远的远方</p></div><div className="wave" aria-hidden="true">{waveHeights.map((height, index) => <i key={index} style={{ height }} />)}</div><div className="progress-area"><div className="track"><i /></div><div className="times"><span>01:24</span><span>04:36</span></div></div></div>
        <div className="player-actions"><button aria-label="上一首"><SkipBack /></button><button className="play" aria-label={playing ? "暂停" : "播放"} onClick={() => setPlaying(!playing)}>{playing ? <Pause /> : <Play />}</button><button aria-label="下一首"><SkipForward /></button><button className={`heart ${liked ? "liked" : ""}`} aria-label="收藏" onClick={() => setLiked(!liked)}><Heart /></button></div>
      </section>

      <div className="theme-toggle" aria-label="主题切换"><button aria-label="白天" className={!night ? "active" : ""} onClick={() => setNight(false)}><Sun /></button><button aria-label="夜晚" className={night ? "active" : ""} onClick={() => setNight(true)}><Moon /></button></div>
      <button className="settings-button" aria-label="设置" onClick={() => notify("设置面板尚未开放")}><Settings /></button>
      <output className={`toast ${toast ? "show" : ""}`} aria-live="polite">{toast}</output>
    </main>
  );
}
