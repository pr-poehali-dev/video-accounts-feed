import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Types ───────────────────────────────────────────────
type Tab = "feed" | "search" | "upload" | "notifications" | "profile" | "messages" | "analytics";
type ProfileTab = "videos" | "liked" | "saved";

// ─── Mock Data ───────────────────────────────────────────
const HASHTAGS = ["#Всё", "#Тренды", "#Челлендж", "#Музыка", "#Юмор", "#Спорт", "#Лайфхак", "#Еда"];

const VIDEOS = [
  { id: 1, user: "marina_art", avatar: "🎨", title: "Рисую акварелью каждый день #100деньхудожника", views: "2.3М", likes: "184K", comments: 2341, duration: "0:47", challenge: "#100деньхудожника", bg: "from-purple-900 to-pink-900", verified: true },
  { id: 2, user: "fit_alexey", avatar: "💪", title: "Утренняя зарядка за 5 минут — попробуй!", views: "891K", likes: "67K", comments: 891, duration: "5:12", challenge: null, bg: "from-blue-900 to-cyan-900", verified: false },
  { id: 3, user: "chef_sasha", avatar: "🍜", title: "Паста карбонара за 15 минут #готовимдома", views: "4.1М", likes: "312K", comments: 5420, duration: "2:31", challenge: "#готовимдома", bg: "from-orange-900 to-red-900", verified: true },
  { id: 4, user: "travel_kate", avatar: "✈️", title: "Баку за 3 дня — всё что нужно знать", views: "1.7М", likes: "98K", comments: 1203, duration: "8:44", challenge: null, bg: "from-green-900 to-teal-900", verified: false },
  { id: 5, user: "danceking", avatar: "🕺", title: "Вирусный танец #VibeChallenge — учимся вместе!", views: "6.8М", likes: "521K", comments: 9870, duration: "0:31", challenge: "#VibeChallenge", bg: "from-violet-900 to-indigo-900", verified: true },
  { id: 6, user: "techreview_ru", avatar: "📱", title: "Лучшие телефоны 2025 до 30К", views: "560K", likes: "41K", comments: 734, duration: "12:08", challenge: null, bg: "from-slate-800 to-zinc-900", verified: true },
];

const TRENDING = [
  { tag: "#VibeChallenge", videos: "24К видео", hot: true },
  { tag: "#100деньхудожника", videos: "8.1К видео", hot: false },
  { tag: "#готовимдома", videos: "52К видео", hot: true },
  { tag: "#утреннийритуал", videos: "3.4К видео", hot: false },
  { tag: "#МоёМесто", videos: "11К видео", hot: false },
];

const NOTIFICATIONS = [
  { id: 1, avatar: "🕺", user: "danceking", action: "подписался на вас", time: "2 мин", read: false },
  { id: 2, avatar: "❤️", user: "marina_art", action: "лайкнул ваше видео", time: "15 мин", read: false },
  { id: 3, avatar: "💬", user: "chef_sasha", action: "прокомментировал: «Супер рецепт!»", time: "1 ч", read: true },
  { id: 4, avatar: "🔔", user: "VIBE", action: "Ваше видео набрало 10К просмотров!", time: "3 ч", read: true },
  { id: 5, avatar: "🎨", user: "marina_art", action: "поделилась вашим видео", time: "5 ч", read: true },
  { id: 6, avatar: "👤", user: "travel_kate", action: "подписалась на вас", time: "вчера", read: true },
];

const MESSAGES = [
  { id: 1, avatar: "🕺", user: "danceking", last: "Привет! Видел твой ролик — огонь 🔥", time: "сейчас", unread: 2, online: true },
  { id: 2, avatar: "🎨", user: "marina_art", last: "Давай снимем коллаб?", time: "12:34", unread: 1, online: true },
  { id: 3, avatar: "🍜", user: "chef_sasha", last: "Спасибо за рецепт!", time: "вчера", unread: 0, online: false },
  { id: 4, avatar: "✈️", user: "travel_kate", last: "Куда летишь следующий раз?", time: "пн", unread: 0, online: false },
];

const PROFILE_VIDEOS = [
  { id: 1, bg: "from-purple-900 to-pink-900", views: "2.3М" },
  { id: 2, bg: "from-blue-900 to-cyan-900", views: "891К" },
  { id: 3, bg: "from-orange-900 to-red-900", views: "4.1М" },
  { id: 4, bg: "from-green-900 to-teal-900", views: "1.7М" },
  { id: 5, bg: "from-violet-900 to-indigo-900", views: "6.8М" },
  { id: 6, bg: "from-slate-800 to-zinc-900", views: "560К" },
];

function formatNum(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "М";
  if (n >= 1000) return (n / 1000).toFixed(0) + "К";
  return String(n);
}

// ─── VideoCard ────────────────────────────────────────────
function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="vibe-card overflow-hidden animate-slide-up">
      <div className={`relative w-full aspect-video bg-gradient-to-br ${video.bg} flex items-center justify-center cursor-pointer group`}>
        <div className="text-6xl opacity-20">🎬</div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <Icon name="Play" size={24} className="text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md font-mono">{video.duration}</div>
        {video.challenge && (
          <div className="absolute top-2 left-2">
            <span className="challenge-badge">{video.challenge}</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
            {video.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-sm font-semibold text-white/90">@{video.user}</span>
              {video.verified && <Icon name="BadgeCheck" size={14} className="text-orange-400 flex-shrink-0" />}
            </div>
            <p className="text-sm text-white/60 leading-snug line-clamp-2">{video.title}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-4">
            <button onClick={() => setLiked(!liked)} className="flex items-center gap-1.5 transition-all" style={{ color: liked ? "var(--vibe-orange)" : "rgba(255,255,255,0.4)" }}>
              <Icon name="Heart" size={16} />
              <span className="text-xs font-medium">{video.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
              <Icon name="MessageCircle" size={16} />
              <span className="text-xs font-medium">{formatNum(video.comments)}</span>
            </button>
            <button className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
              <Icon name="Share2" size={16} />
              <span className="text-xs font-medium">{video.views}</span>
            </button>
          </div>
          <button onClick={() => setSaved(!saved)} style={{ color: saved ? "var(--vibe-orange)" : "rgba(255,255,255,0.4)" }} className="transition-colors">
            <Icon name="Bookmark" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Pages ───────────────────────────────────────────────
function FeedPage() {
  const [activeTag, setActiveTag] = useState("#Всё");
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--vibe-orange)" }}>VIBE</h1>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white/80 transition-colors" style={{ background: "rgba(255,255,255,0.06)" }}>
              <Icon name="Flame" size={18} />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white/80 transition-colors" style={{ background: "rgba(255,255,255,0.06)" }}>
              <Icon name="Bell" size={18} />
            </button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}>
          {HASHTAGS.map(tag => (
            <button key={tag} className={`tag-pill whitespace-nowrap ${activeTag === tag ? "active" : ""}`} onClick={() => setActiveTag(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {VIDEOS.map(v => <VideoCard key={v.id} video={v} />)}
      </div>
    </div>
  );
}

function SearchPage() {
  const [query, setQuery] = useState("");
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)" }}>
        <h2 className="text-xl font-bold mb-3 text-white">Поиск</h2>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input className="w-full rounded-full pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            placeholder="Видео, авторы, хэштеги..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Flame" size={16} className="text-orange-400" />
            <span className="text-sm font-semibold text-white/80">Трендовые челленджи</span>
          </div>
          <div className="space-y-2">
            {TRENDING.map(t => (
              <div key={t.tag} className="vibe-card p-3 flex items-center justify-between cursor-pointer hover:border-orange-500/20 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{t.tag}</span>
                    {t.hot && <span className="challenge-badge">🔥 Горячее</span>}
                  </div>
                  <span className="text-xs text-white/40 mt-0.5 block">{t.videos}</span>
                </div>
                <Icon name="ChevronRight" size={16} className="text-white/20" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Users" size={16} className="text-orange-400" />
            <span className="text-sm font-semibold text-white/80">Популярные авторы</span>
          </div>
          <div className="space-y-3">
            {VIDEOS.slice(0, 4).map(v => (
              <div key={v.id} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
                  {v.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-white">@{v.user}</span>
                    {v.verified && <Icon name="BadgeCheck" size={13} className="text-orange-400" />}
                  </div>
                  <span className="text-xs text-white/40">{v.views} просмотров</span>
                </div>
                <button className="btn-ghost text-xs px-3 py-1.5">Подписаться</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadPage() {
  const [step, setStep] = useState<"choose" | "edit">("choose");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  return (
    <div className="flex flex-col h-full px-4 pt-6 pb-4">
      <h2 className="text-xl font-bold mb-6 text-white">Загрузить видео</h2>
      {step === "choose" ? (
        <div className="flex-1 flex flex-col gap-4">
          <button className="flex-1 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed transition-all"
            style={{ borderColor: "rgba(255,107,53,0.3)", background: "rgba(255,107,53,0.04)" }}
            onClick={() => setStep("edit")}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,107,53,0.1)" }}>
              <Icon name="Upload" size={28} className="text-orange-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-white mb-1">Выбрать видео</p>
              <p className="text-sm text-white/40">MP4, MOV до 2ГБ</p>
            </div>
          </button>
          <button className="vibe-card p-4 flex items-center gap-4 cursor-pointer hover:border-orange-500/20 transition-colors" onClick={() => setStep("edit")}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,107,53,0.1)" }}>
              <Icon name="Video" size={22} className="text-orange-400" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Снять прямо сейчас</p>
              <p className="text-xs text-white/40 mt-0.5">Открыть камеру</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-white/20 ml-auto" />
          </button>
          <button className="vibe-card p-4 flex items-center gap-4 cursor-pointer hover:border-orange-500/20 transition-colors">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
              <Icon name="Radio" size={22} className="text-red-400" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Прямой эфир</p>
              <p className="text-xs text-white/40 mt-0.5">Вещать в реальном времени</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className="pulse-dot"></div>
              <span className="text-xs text-red-400 font-medium">LIVE</span>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-4 animate-fade-in">
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-violet-900 to-indigo-900 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2">🎬</div>
              <p className="text-white/40 text-sm">Предпросмотр видео</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-white/40 font-medium mb-1 block">Описание</label>
              <textarea className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none resize-none transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                placeholder="Расскажи о видео..." rows={3} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-white/40 font-medium mb-1 block">Хэштеги и челленджи</label>
              <input className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                placeholder="#VibeChallenge #моевидео" value={tags} onChange={e => setTags(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-3 mt-auto">
            <button className="btn-ghost flex-1" onClick={() => setStep("choose")}>Назад</button>
            <button className="btn-primary flex-1">Опубликовать</button>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationsPage() {
  const unread = NOTIFICATIONS.filter(n => !n.read).length;
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Уведомления</h2>
          {unread > 0 && <span className="challenge-badge">{unread} новых</span>}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
        {NOTIFICATIONS.map(n => (
          <div key={n.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
            style={{ background: n.read ? "transparent" : "rgba(255,107,53,0.06)", borderLeft: n.read ? "2px solid transparent" : "2px solid var(--vibe-orange)" }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
              {n.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/90">
                <span className="font-semibold">{n.user}</span>{" "}
                <span className="text-white/60">{n.action}</span>
              </p>
              <span className="text-xs text-white/30 mt-0.5 block">{n.time}</span>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--vibe-orange)" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPage({ onBack }: { onBack?: () => void }) {
  const [activeChat, setActiveChat] = useState<typeof MESSAGES[0] | null>(null);
  const [msg, setMsg] = useState("");

  if (activeChat) {
    return (
      <div className="flex flex-col h-full animate-fade-in">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b" style={{ borderColor: "var(--vibe-border)" }}>
          <button onClick={() => setActiveChat(null)} className="text-white/50 hover:text-white transition-colors">
            <Icon name="ArrowLeft" size={20} />
          </button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
            {activeChat.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">@{activeChat.user}</p>
            {activeChat.online && <p className="text-xs text-green-400">онлайн</p>}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm px-4 py-2.5" style={{ background: "rgba(255,255,255,0.06)" }}>
              <p className="text-sm text-white/90">{activeChat.last}</p>
              <span className="text-xs text-white/30 mt-1 block">12:30</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-2.5" style={{ background: "var(--vibe-orange)" }}>
              <p className="text-sm text-black font-medium">Спасибо! Очень приятно 🙌</p>
              <span className="text-xs text-black/50 mt-1 block">12:32</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm px-4 py-2.5" style={{ background: "rgba(255,255,255,0.06)" }}>
              <p className="text-sm text-white/90">Давай снимем коллаб? 💡</p>
              <span className="text-xs text-white/30 mt-1 block">12:45</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 border-t" style={{ borderColor: "var(--vibe-border)" }}>
          <input className="flex-1 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            placeholder="Написать..." value={msg} onChange={e => setMsg(e.target.value)} />
          <button className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity" style={{ background: "var(--vibe-orange)" }}>
            <Icon name="Send" size={16} className="text-black ml-0.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {onBack && (
              <button onClick={onBack} className="text-white/50 hover:text-white transition-colors mr-1">
                <Icon name="ArrowLeft" size={20} />
              </button>
            )}
            <h2 className="text-xl font-bold text-white">Сообщения</h2>
          </div>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.06)" }}>
            <Icon name="Edit" size={16} />
          </button>
        </div>
        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input className="w-full rounded-full pl-8 pr-4 py-2 text-sm text-white placeholder-white/30 outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            placeholder="Поиск..." />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
        {MESSAGES.map(m => (
          <button key={m.id} onClick={() => setActiveChat(m)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/4 transition-colors text-left">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                {m.avatar}
              </div>
              {m.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 bg-green-400" style={{ borderColor: "#0A0A0A" }}></div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-semibold text-white">@{m.user}</span>
                <span className="text-xs text-white/30">{m.time}</span>
              </div>
              <p className="text-xs text-white/50 truncate">{m.last}</p>
            </div>
            {m.unread > 0 && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style={{ background: "var(--vibe-orange)" }}>
                {m.unread}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProfilePage({ onMessages, onAnalytics }: { onMessages: () => void; onAnalytics: () => void }) {
  const [profileTab, setProfileTab] = useState<ProfileTab>("videos");
  const [following, setFollowing] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4">
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-orange-900/60 to-violet-900/60"></div>
        <div className="px-4">
          <div className="flex items-end justify-between -mt-8 mb-3">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border-4" style={{ background: "rgba(255,255,255,0.06)", borderColor: "#0A0A0A" }}>🎬</div>
            <div className="flex gap-2 pb-1">
              <button className="btn-ghost px-3 py-1.5" onClick={onMessages}>
                <Icon name="MessageCircle" size={14} />
              </button>
              <button className={following ? "btn-ghost" : "btn-primary"} onClick={() => setFollowing(!following)}>
                {following ? "Вы подписаны" : "Подписаться"}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white">Алексей Вибов</h3>
              <Icon name="BadgeCheck" size={16} className="text-orange-400" />
            </div>
            <p className="text-sm text-white/50 mb-1">@vibov_official</p>
            <p className="text-sm text-white/70 leading-relaxed">Видеоблогер • Путешествия и лайфстайл ✈️</p>
          </div>
          <div className="flex gap-6 mb-4 py-3 border-t border-b border-white/6">
            {[
              { label: "Видео", value: "84" },
              { label: "Подписчики", value: "124К" },
              { label: "Подписки", value: "312" },
              { label: "Лайки", value: "2.1М" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-base font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
          <button onClick={onAnalytics} className="w-full vibe-card p-3 flex items-center justify-between mb-4 cursor-pointer hover:border-orange-500/20 transition-colors">
            <div className="flex items-center gap-2">
              <Icon name="BarChart2" size={16} className="text-orange-400" />
              <span className="text-sm font-medium text-white/80">Аналитика</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-400 font-semibold">+18% просмотры</span>
              <Icon name="ChevronRight" size={14} className="text-white/20" />
            </div>
          </button>
          <div className="flex gap-1 p-1 rounded-xl mb-4" style={{ background: "rgba(255,255,255,0.04)" }}>
            {(["videos", "liked", "saved"] as ProfileTab[]).map(t => (
              <button key={t} onClick={() => setProfileTab(t)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ background: profileTab === t ? "var(--vibe-orange)" : "transparent", color: profileTab === t ? "#0A0A0A" : "rgba(255,255,255,0.4)" }}>
                {t === "videos" ? "Видео" : t === "liked" ? "Лайки" : "Сохранённые"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {PROFILE_VIDEOS.map(v => (
              <div key={v.id} className={`aspect-[9/16] rounded-xl bg-gradient-to-br ${v.bg} flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative overflow-hidden`}>
                <div className="text-3xl opacity-20">🎬</div>
                <div className="absolute bottom-1 left-1 flex items-center gap-0.5">
                  <Icon name="Play" size={10} className="text-white" />
                  <span className="text-white text-xs font-medium">{v.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 pt-6 pb-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-white/50 hover:text-white transition-colors">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">Аналитика</h2>
          <p className="text-sm text-white/40">За последние 30 дней</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Просмотры", value: "1.2М", change: "+18%", icon: "Eye" as const, positive: true },
          { label: "Подписчики", value: "+2.4К", change: "+34%", icon: "Users" as const, positive: true },
          { label: "Лайки", value: "89К", change: "+12%", icon: "Heart" as const, positive: true },
          { label: "Охват", value: "456К", change: "-3%", icon: "TrendingUp" as const, positive: false },
        ].map(m => (
          <div key={m.label} className="vibe-card p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name={m.icon} size={16} className="text-white/30" />
              <span className={`text-xs font-semibold ${m.positive ? "text-green-400" : "text-red-400"}`}>{m.change}</span>
            </div>
            <p className="text-xl font-bold text-white mb-0.5">{m.value}</p>
            <p className="text-xs text-white/40">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
          <Icon name="Trophy" size={15} className="text-orange-400" />
          Топ видео
        </h3>
        <div className="space-y-3">
          {VIDEOS.slice(0, 3).map((v, i) => (
            <div key={v.id} className="vibe-card p-3 flex items-center gap-3">
              <span className="text-sm font-black text-white/20 w-5">#{i + 1}</span>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${v.bg} flex items-center justify-center text-lg flex-shrink-0`}>{v.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/80 line-clamp-1 font-medium">{v.title}</p>
                <p className="text-xs text-white/30 mt-0.5">{v.views} просмотров</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
          <Icon name="PieChart" size={15} className="text-orange-400" />
          Аудитория
        </h3>
        <div className="vibe-card p-4 space-y-3">
          {[
            { label: "18–24 года", pct: 42 },
            { label: "25–34 года", pct: 35 },
            { label: "35–44 года", pct: 15 },
            { label: "45+ лет", pct: 8 },
          ].map(a => (
            <div key={a.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">{a.label}</span>
                <span className="text-white/40">{a.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full" style={{ width: `${a.pct}%`, background: "var(--vibe-orange)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────
const NAV = [
  { id: "feed", icon: "Home", label: "Лента" },
  { id: "search", icon: "Search", label: "Поиск" },
  { id: "upload", icon: "Plus", label: "" },
  { id: "notifications", icon: "Bell", label: "Оповещения" },
  { id: "profile", icon: "User", label: "Профиль" },
] as const;

// ─── App ─────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState<Tab>("feed");
  const navTabs = ["feed", "search", "upload", "notifications", "profile"] as const;

  return (
    <div className="flex flex-col h-dvh max-w-md mx-auto font-golos overflow-hidden" style={{ background: "#0A0A0A" }}>
      <div className="flex-1 overflow-hidden">
        {tab === "feed" && <FeedPage />}
        {tab === "search" && <SearchPage />}
        {tab === "upload" && <UploadPage />}
        {tab === "notifications" && <NotificationsPage />}
        {tab === "profile" && <ProfilePage onMessages={() => setTab("messages")} onAnalytics={() => setTab("analytics")} />}
        {tab === "messages" && <MessagesPage onBack={() => setTab("profile")} />}
        {tab === "analytics" && <AnalyticsPage onBack={() => setTab("profile")} />}
      </div>

      {/* Bottom nav — скрывать на под-страницах */}
      {navTabs.includes(tab as typeof navTabs[number]) && (
        <div className="flex-shrink-0 flex items-center justify-around px-2 py-2 border-t"
          style={{ borderColor: "var(--vibe-border)", background: "rgba(10,10,10,0.98)", backdropFilter: "blur(16px)" }}>
          {NAV.map(item => {
            const isActive = tab === item.id;
            const isUpload = item.id === "upload";
            return (
              <button key={item.id} onClick={() => setTab(item.id as Tab)}
                className={`nav-item ${isActive ? "active" : ""} flex-1`}>
                {isUpload ? (
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: isActive ? "var(--vibe-orange)" : "rgba(255,107,53,0.15)" }}>
                    <Icon name="Plus" size={22} style={{ color: isActive ? "#0A0A0A" : "var(--vibe-orange)" }} />
                  </div>
                ) : (
                  <>
                    <Icon name={item.icon} size={22} className="nav-icon" />
                    <span className="nav-label text-[10px] font-medium">{item.label}</span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
