// Bilingual nav, restored animated hero pipeline and project snapshot.
const { Button } = window.MinaFlowDesignSystem_a5074e;
const { Icon, Shell, V2_PORTFOLIO_URL } = window;

const HERO_COPY = {
  en: {
    back: 'Back to Portfolio',
    eyebrow: 'Portfolio demonstration',
    titleA: 'From scattered company research to a ',
    titleB: 'checked, structured report.',
    lede: 'I built a three-scenario workflow for repeated company research. It collects selected website content, creates an analysis, checks whether the result is specific enough, and then prepares a final report.',
    view: 'View the workflow',
    stages: [
      ['Website content', 'HTTP retrieval'],
      ['Company analysis', 'Groq · saved to Supabase'],
      ['Quality check', 'approved / needs_improvement'],
      ['Final report', 'structured master report'],
    ],
    feedback: 'feedback saved for revision',
    snapshot: [
      ['Project type', 'Functional portfolio demonstration', 'flask-conical'],
      ['Structure', '3 connected Make.com scenarios', 'git-branch'],
      ['Main differentiator', 'Separate quality-control layer', 'badge-check'],
      ['Tools', 'Make.com · Supabase · HTTP · Groq', 'layers'],
    ],
  },
  sv: {
    back: 'Tillbaka till Portfolio',
    eyebrow: 'Portfoliodemonstration',
    titleA: 'Från utspridd företagsresearch till en ',
    titleB: 'kontrollerad, strukturerad rapport.',
    lede: 'Jag byggde ett arbetsflöde med tre scenarier för återkommande företagsresearch. Det hämtar utvalt innehåll från webbplatsen, skapar en analys, kontrollerar om resultatet är tillräckligt konkret och skapar sedan en slutrapport.',
    view: 'Visa arbetsflödet',
    stages: [
      ['Webbplatsinnehåll', 'Hämtas via HTTP'],
      ['Företagsanalys', 'Groq · sparas i Supabase'],
      ['Kvalitetskontroll', 'approved / needs_improvement'],
      ['Slutrapport', 'strukturerad masterrapport'],
    ],
    feedback: 'feedback sparas för förbättring',
    snapshot: [
      ['Projekttyp', 'Fungerande portfoliodemonstration', 'flask-conical'],
      ['Struktur', '3 sammankopplade Make.com-scenarier', 'git-branch'],
      ['Viktig skillnad', 'Separat lager för kvalitetskontroll', 'badge-check'],
      ['Verktyg', 'Make.com · Supabase · HTTP · Groq', 'layers'],
    ],
  },
};

function NavBar() {
  const { lang, setLang } = window.useApp();
  const c = HERO_COPY[lang];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10,6,18,0.82)',
        backdropFilter: 'var(--blur-m)',
        WebkitBackdropFilter: 'var(--blur-m)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
          <a href={V2_PORTFOLIO_URL} style={{ display: 'flex', alignItems: 'center' }}>
            <img src="assets/mina-logo.png" alt="Mina" style={{ height: 26, display: 'block' }} />
          </a>
          <span aria-hidden="true" style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.16)' }}></span>
          <span
            style={{
              font: 'var(--text-label)',
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              color: 'var(--gray-300)',
              whiteSpace: 'nowrap',
            }}
          >
            AI Research Agent
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            aria-label="Language"
            style={{
              display: 'flex',
              padding: 3,
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            {['en', 'sv'].map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setLang(x)}
                aria-pressed={lang === x}
                style={{
                  border: 0,
                  cursor: 'pointer',
                  borderRadius: 999,
                  padding: '7px 11px',
                  font: 'var(--text-label)',
                  background: lang === x ? 'var(--brand-gradient)' : 'transparent',
                  color: lang === x ? '#fff' : 'var(--gray-400)',
                }}
              >
                {x.toUpperCase()}
              </button>
            ))}
          </div>
          <Button variant="onDark" size="sm" href={V2_PORTFOLIO_URL} icon={<Icon name="arrow-left" size={15} />}>
            {c.back}
          </Button>
        </div>
      </div>
    </header>
  );
}

const HERO_NODES = [
  { icon: 'globe', x: 10, y: 8, w: 300, tone: 'blue' },
  { icon: 'file-text', x: 218, y: 132, w: 310, tone: 'violet' },
  { icon: 'badge-check', x: 34, y: 258, w: 320, tone: 'violet', hot: true },
  { icon: 'file-output', x: 226, y: 394, w: 300, tone: 'cyan' },
];

const HERO_SEQUENCE = [
  { node: 0, duration: 1600 },
  { node: 1, duration: 1600 },
  { node: 2, duration: 1750 },
  { node: 3, duration: 1600 },
  { node: null, duration: 700 },
];

function useHeroSequence(reduced) {
  const [index, setIndex] = React.useState(0);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    if (reduced) {
      setIndex(0);
      return undefined;
    }

    let timer;
    const schedule = (current) => {
      timer = window.setTimeout(() => {
        const next = (current + 1) % HERO_SEQUENCE.length;
        if (next === 0) setCycle((value) => value + 1);
        setIndex(next);
        schedule(next);
      }, HERO_SEQUENCE[current].duration);
    };

    schedule(0);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return { step: HERO_SEQUENCE[index], cycle };
}

function HeroPipeline({ copy }) {
  const W = 540;
  const H = 490;
  const toneColor = {
    blue: 'var(--accent-blue)',
    violet: 'var(--brand-300)',
    cyan: 'var(--accent-cyan)',
  };

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', sync) : mq.removeListener(sync));
  }, []);

  const { step, cycle } = useHeroSequence(reduced);
  const activeNode = reduced ? null : step.node;
  const feedbackFlash = !reduced && activeNode === 2;
  const pathActive = [activeNode === 1, activeNode === 2, activeNode === 3];

  return (
    <div
      className="reveal-up"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 560,
        aspectRatio: `${W} / ${H}`,
        margin: '0 auto',
        isolation: 'isolate',
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        aria-hidden="true"
      >
        <path
          className={`draw hero-path${pathActive[0] ? ' hero-path--active' : ''}`}
          pathLength="1"
          d="M 160 100 C 160 132, 366 96, 372 132"
          strokeWidth="1.6"
        />
        <path
          className={`draw hero-path${pathActive[1] ? ' hero-path--active' : ''}`}
          pathLength="1"
          d="M 366 224 C 366 258, 200 224, 194 258"
          strokeWidth="1.6"
        />
        <path
          className={`draw hero-path${pathActive[2] ? ' hero-path--active' : ''}`}
          pathLength="1"
          d="M 194 350 C 194 392, 372 352, 376 394"
          strokeWidth="1.6"
        />

        {pathActive[0] && (
          <path key={`p0-${cycle}`} className="hero-path-light" pathLength="1" d="M 160 100 C 160 132, 366 96, 372 132" />
        )}
        {pathActive[1] && (
          <path key={`p1-${cycle}`} className="hero-path-light" pathLength="1" d="M 366 224 C 366 258, 200 224, 194 258" />
        )}
        {pathActive[2] && (
          <path key={`p2-${cycle}`} className="hero-path-light" pathLength="1" d="M 194 350 C 194 392, 372 352, 376 394" />
        )}

        <path
          className={`draw hero-feedback-path${feedbackFlash ? ' hero-feedback-path--active' : ''}`}
          pathLength="1"
          d="M 46 350 C 8 300, 90 176, 214 172"
          strokeWidth="1.4"
          strokeDasharray="5 5"
        />
        {feedbackFlash && (
          <path
            key={`feedback-${cycle}`}
            className="hero-path-light hero-path-light--feedback"
            pathLength="1"
            d="M 46 350 C 8 300, 90 176, 214 172"
          />
        )}

        {[[160, 100], [372, 132], [366, 224], [194, 258], [194, 350], [376, 394]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.2" fill="var(--brand-400)" opacity="0.9" />
        ))}
      </svg>

      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '1%',
          top: '42%',
          zIndex: 1,
          maxWidth: '36%',
          font: 'var(--text-mono-s)',
          fontSize: 'clamp(0.52rem, 1.3vw, 0.66rem)',
          lineHeight: 1.25,
          letterSpacing: '0.04em',
          color: '#F0C878',
          opacity: feedbackFlash ? 0.95 : 0.6,
          transform: 'rotate(-14deg)',
          pointerEvents: 'none',
        }}
      >
        {copy.feedback}
      </span>

      {HERO_NODES.map((node, i) => {
        const isActive = activeNode === i;
        const isComplete = !reduced && (activeNode === null ? true : i < activeNode);
        const cls = [
          'panel-dark',
          'raised',
          'hero-pipeline-card',
          isActive ? 'hero-pipeline-card--active' : '',
          isActive && node.hot ? 'hero-pipeline-card--hot' : '',
          isComplete ? 'hero-pipeline-card--complete' : '',
        ].filter(Boolean).join(' ');

        return (
          <div
            key={i}
            className={cls}
            style={{
              position: 'absolute',
              left: `${(node.x / W) * 100}%`,
              top: `${(node.y / H) * 100}%`,
              width: `${(node.w / W) * 100}%`,
              minWidth: 0,
              padding: 'clamp(10px, 2vw, 14px) clamp(12px, 2.4vw, 18px)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(8px, 1.8vw, 14px)',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            {isActive && <span key={`shimmer-${cycle}-${i}`} className="hero-card-shimmer" aria-hidden="true"></span>}

            <span
              style={{
                width: 'clamp(32px, 7vw, 38px)',
                height: 'clamp(32px, 7vw, 38px)',
                borderRadius: 10,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                position: 'relative',
              }}
            >
              <Icon name={node.icon} size={19} color={toneColor[node.tone]} />
            </span>

            <span style={{ minWidth: 0, flex: 1, overflow: 'hidden', position: 'relative' }}>
              <span
                style={{
                  display: 'block',
                  font: 'var(--text-heading-s)',
                  fontSize: 'clamp(0.78rem, 1.9vw, 1rem)',
                  color: 'var(--text-on-dark)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {copy.stages[i][0]}
              </span>
              <span
                style={{
                  display: 'block',
                  font: 'var(--text-mono-s)',
                  fontSize: 'clamp(0.57rem, 1.45vw, 0.72rem)',
                  color: 'var(--gray-400)',
                  marginTop: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {copy.stages[i][1]}
              </span>
            </span>

            <span
              aria-hidden="true"
              style={{
                marginLeft: 'auto',
                flexShrink: 0,
                font: 'var(--text-mono-s)',
                fontSize: 'clamp(0.55rem, 1.4vw, 0.7rem)',
                color: 'var(--gray-500)',
                position: 'relative',
              }}
            >
              0{i + 1}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Hero() {
  const { lang } = window.useApp();
  const c = HERO_COPY[lang];

  return (
    <Shell tone="ink" grid pad="lg" style={{ paddingTop: 84 }}>
      <window.Glow x="18%" y="8%" size={720} opacity={0.20} />
      <window.Glow x="88%" y="70%" size={560} opacity={0.13} color="91, 141, 239" />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
          gap: 64,
          alignItems: 'center',
        }}
      >
        <div className="reveal-up">
          <window.Eyebrow>{c.eyebrow}</window.Eyebrow>
          <h1
            style={{
              font: 'var(--text-display-xl)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--text-on-dark)',
              margin: '0 0 22px',
            }}
          >
            {c.titleA}
            <span
              style={{
                background: 'linear-gradient(115deg, var(--brand-300), var(--brand-500))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {c.titleB}
            </span>
          </h1>
          <p style={{ font: 'var(--text-body-l)', color: 'var(--text-on-dark-muted)', margin: 0, maxWidth: 520, textWrap: 'pretty' }}>
            {c.lede}
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" href="#workflow" icon={<Icon name="git-branch" size={17} />}>
              {c.view}
            </Button>
            <Button variant="onDark" size="lg" href={V2_PORTFOLIO_URL}>
              {c.back}
            </Button>
          </div>
        </div>

        <HeroPipeline copy={c} />
      </div>
    </Shell>
  );
}

function Snapshot() {
  const { lang } = window.useApp();
  const c = HERO_COPY[lang];

  return (
    <Shell tone="ink" pad="sm" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div
        className="reveal-up"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 0,
        }}
      >
        {c.snapshot.map((s, i) => (
          <div
            key={s[0]}
            className="snapshot-card"
            style={{
              padding: '10px 24px',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              borderRadius: 10,
              minWidth: 0,
            }}
          >
            <Icon name={s[2]} size={18} color="var(--brand-400)" style={{ marginTop: 3 }} className="snapshot-card-icon" />
            <div style={{ minWidth: 0 }}>
              <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 5 }}>
                {s[0]}
              </div>
              <div style={{ font: 'var(--text-body-s)', fontWeight: 600, color: 'var(--text-on-dark)', overflowWrap: 'anywhere' }}>
                {s[1]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

Object.assign(window, { NavBar, Hero, Snapshot });
