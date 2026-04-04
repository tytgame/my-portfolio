import './App.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import BlockmindPage from './pages/BlockmindPage';
import HereDoggyPage from './pages/HereDoggyPage';

const TOC = [
  {
    project: 'BlockMind',
    projectId: 'blockmind',
    items: [
      { id: 'bm-1', label: '블록 비활성화가 AI 답변에 반영되지 않는 문제' },
      { id: 'bm-2', label: 'LLM 토큰 비용 38% 절감' },
      { id: 'bm-3', label: '채팅 페이지 리로드 시 빈 화면 노출' },
    ],
  },
  {
    project: '여기보개',
    projectId: 'heredoggy',
    items: [
      { id: 'hd-1', label: 'GPS 좌표 누적 후 일괄 전송' },
    ],
  },
];

const ALL_IDS = TOC.flatMap((g) => g.items.map((i) => i.id));

const TOTAL_TICKS = 22;

function ScrollNav() {
  const [activeTick, setActiveTick] = useState(0);
  const [activeId, setActiveId] = useState('');
  const [hovered, setHovered] = useState(false);
  const [panelY, setPanelY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? scrollY / maxScroll : 0;
      setActiveTick(Math.round(ratio * (TOTAL_TICKS - 1)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  }, []);

  const handleTickClick = useCallback((index) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const target = (index / (TOTAL_TICKS - 1)) * maxScroll;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 items-center"
      onMouseEnter={(e) => {
        const rect = containerRef.current.getBoundingClientRect();
        setPanelY(e.clientY - rect.top);
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 틱 왼쪽 hover 감지 영역 (투명) */}
      <div className="w-10 h-[70vh] shrink-0" />

      {/* 호버 시 펼쳐지는 목차 패널 (absolute로 컨테이너 너비에 영향 없음) */}
      <div
        className={`absolute right-10 bg-white/70 backdrop-blur-md border border-gray-300 rounded-lg shadow-lg p-4 text-sm transition-[opacity,transform] duration-200 origin-right ${
          hovered
            ? 'opacity-100 scale-100 translate-x-0'
            : 'opacity-0 scale-95 translate-x-2 pointer-events-none'
        }`}
        style={{ width: '280px', top: `${panelY}px`, transform: 'translateY(-50%)' }}
      >
        {TOC.map((group) => (
          <div key={group.project} className="mb-5 last:mb-0">
            <button
              onClick={() => handleNavigate(group.projectId)}
              className="font-bold text-gray-900 text-sm mb-2 text-left hover:text-primary transition-colors"
            >
              {group.project}
            </button>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className={`text-left w-full text-xs leading-snug py-0.5 transition-colors ${
                      activeId === item.id
                        ? 'text-primary font-medium'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 스크롤 미니맵 */}
      <div className="flex flex-col items-center justify-between h-[70vh] py-2 ml-3 mr-3">
        {Array.from({ length: TOTAL_TICKS }, (_, i) => (
          <button
            key={i}
            onClick={() => handleTickClick(i)}
            className={`rounded-sm transition-colors duration-500 ${
              i === 0 || i === TOTAL_TICKS - 1 ? 'w-4' : 'w-3'
            } h-0.5 ${
              i === activeTick
                ? 'bg-gray-800'
                : 'bg-gray-200 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-white text-gray-900 font-sans antialiased">
      <header className="w-full max-w-4xl mx-auto px-6 py-12 flex justify-between items-start border-b border-border-light mb-16">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-primary">유예성</h1>
          <p className="text-sm text-gray-500 mt-1">Frontend Developer</p>
        </div>
        <div className="text-right text-sm text-gray-500 flex flex-col gap-1">
          <span>yuyeseong@gmail.com</span>
          <a className="hover:text-primary transition-colors" href="https://github.com/tytgame" target="_blank" rel="noreferrer">
            github.com/tytgame
          </a>
        </div>
      </header>

      <ScrollNav />

      <main className="w-full max-w-4xl mx-auto px-6 pb-32 space-y-32">
        <BlockmindPage />
        <hr className="border-border-light" />
        <HereDoggyPage />
      </main>

      <footer className="w-full max-w-4xl mx-auto px-6 py-12 border-t border-border-light text-center text-xs text-gray-400">
        <p>© 2026 Yuyeseong. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
