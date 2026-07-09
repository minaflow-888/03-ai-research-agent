// Nav, Hero (connected pipeline visual) and Project Snapshot.
const { Button } = window.MinaFlowDesignSystem_a5074e;
const { Icon, Shell, V2_PORTFOLIO_URL } = window;

function NavBar() {
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
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            AI Research Agent
          </span>
        </div>
        <Button variant="onDark" size="sm" href={V2_PORTFOLIO_URL} icon={<Icon name="arrow-left" size={15} />}>
          Back to Portfolio
        </Button>
      </div>
    </header>
  );
}

/* ---- Hero pipeline visual: four connected system panels, auto-sequenced ---- */
const HERO_NODES = [
  { icon: 'globe', label: 'Website content', sub: 'HTTP retrieval', x: 10, y: 8, w: 300, tone: 'blue' },
  { icon: 'file-text', label: 'Company analysis', sub: 'Groq · saved to Supabase', x: 218, y: 132, w: 310, tone: 'violet' },
  { icon: 'badge-check', label: 'Quality check', sub: 'approved / needs_improvement', x: 34, y: 258, w: 320, tone: 'violet', hot: true },
  { icon: 'file-output', label: 'Final report', sub: 'structured master report', x: 226, y: 394, w: 300, tone: 'cyan' },
];

// Sequence driving the automatic hero animation: which node is active, and for
// how long, before advancing. `null` is the short pause between full cycles.
const HERO_SEQUENCE = [
  { node: 0, duration: 1600 },
  { node: 1, duration: 1600 },
  { node: 2, duration: 1700 }, // slightly longer: this is the differentiator step
  { node: 3, duration: 1600 },
  { node: null, duration: 700 },
];

function useHeroSequence(reduced) {
  const [i, setI] = React.useState(0);
  const [cycle, setCycle] = React.useState(0);
  React.useEffect(() => {
    if (reduced) return; // stays at index 0 (static, all inactive) — see render logic below
    let timer = null;
    const advance = (idx) => {
      timer = setTimeout(() => {
        const next = (idx + 1) % HERO_SEQUENCE.length;
        if (next === 0) setCycle((c) => c + 1);
        setI(next);
        advance(next);
      }, HERO_SEQUENCE[idx].duration);
    };
    advance(i === undefined ? 0 : 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);
  return { step: HERO_SEQUENCE[i], cycle };
}

function HeroPipeline() {
  const W = 540, H = 490;
  const toneColor = { blue: 'var(--accent-blue)', violet: 'var(--brand-300)', cyan: 'var(--accent-cyan)' };
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange));
  }, []);

  const { step, cycle } = useHeroSequence(reduced);
  const activeNode = reduced ? null : step.node; // reduced motion: nothing auto-cycles, cards stay static/visible
  const feedbackFlash = !reduced && activeNode === 2; // quality check turn briefly shows the needs-improvement loop

  // Path lit when it leads INTO the node that just became active.
  const pathActive = [activeNode === 1, activeNode === 2, activeNode === 3];

  return (
    <div className="reveal-up" style={{ position: 'relative', width: '100%', maxWidth: 560, aspectRatio: `${W} / ${H}`, margin: '0 auto' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
        <path className={`draw hero-path${pathActive[0] ? ' hero-path--active' : ''}`} pathLength="1" d="M 160 100 C 160 132, 366 96, 372 132" strokeWidth="1.6" style={{ transitionDelay: '200ms' }} />
        <path className={`draw hero-path${pathActive[1] ? ' hero-path--active' : ''}`} pathLength="1" d="M 366 224 C 366 258, 200 224, 194 258" strokeWidth="1.6" style={{ transitionDelay: '600ms' }} />
        <path className={`draw hero-path${pathActive[2] ? ' hero-path--active' : ''}`} pathLength="1" d="M 194 350 C 194 392, 372 352, 376 394" strokeWidth="1.6" style={{ transitionDelay: '1000ms' }} />

        {/* moving-light overlays: brief traveling highlight along the active path only */}
        {pathActive[0] && <path key={`p0-${cycle}`} className="hero-path-light" pathLength="1" d="M 160 100 C 160 132, 366 96, 372 132" />}
        {pathActive[1] && <path key={`p1-${cycle}`} className="hero-path-light" pathLength="1" d="M 366 224 C 366 258, 200 224, 194 258" />}
        {pathActive[2] && <path key={`p2-${cycle}`} className="hero-path-light" pathLength="1" d="M 194 350 C 194 392, 372 352, 376 394" />}

        {/* feedback return: quality check -> analysis (only flashes during the quality-check turn) */}
        <path
          className={`draw hero-feedback-path${feedbackFlash ? ' hero-feedback-path--active' : ''}`} pathLength="1"
          d="M 46 350 C 8 300, 90 176, 214 172"
          strokeWidth="1.4" strokeDasharray="5 5"
          style={{ transitionDelay: '1400ms' }}
        />
        {feedbackFlash && <path key={`pf-${cycle}`} className="hero-path-light hero-path-light--feedback" pathLength="1" d="M 46 350 C 8 300, 90 176, 214 172" />}

        {[[160,100],[372,132],[366,224],[194,258],[194,350],[376,394]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.2" fill="var(--brand-400)" opacity="0.9" />
        ))}
      </svg>
      <span
        style={{
          position: 'absolute', left: '1%', top: '42%',
          font: 'var(--text-mono-s)', fontSize: '0.66rem', letterSpacing: '0.08em',
          color: '#F0C878', opacity: 0.85, transform: 'rotate(-14deg)',
        }}
      >
        feedback saved for revision
      </span>
      {HERO_NODES.map((n, i) => {
        const isActive = activeNode === i;
        const isComplete = !reduced && (activeNode === null ? true : i < activeNode);
        const cls = [
          'panel-dark', 'raised', 'hero-pipeline-card',
          isActive ? 'hero-pipeline-card--active' : '',
          isActive && n.hot ? 'hero-pipeline-card--hot' : '',
          isComplete ? 'hero-pipeline-card--complete' : '',
        ].filter(Boolean).join(' ');
        return (
          <div
            key={n.label}
            className={cls}
            style={{
              position: 'absolute',
              left: `${(n.x / W) * 100}%`,
              top: `${(n.y / H) * 100}%`,
              width: `${(n.w / W) * 100}%`,
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              overflow: 'hidden',
            }}
          >
            {isActive && <span key={`shimmer-${cycle}`} className="hero-card-shimmer" aria-hidden="true"></span>}
            <span
              style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)',
                position: 'relative',
              }}
            >
              <Icon name={n.icon} size={19} color={toneColor[n.tone]} />
            </span>
            <span style={{ minWidth: 0, position: 'relative' }}>
              <span style={{ display: 'block', font: 'var(--text-heading-s)', fontSize: '1rem', color: 'var(--text-on-dark)' }}>{n.label}</span>
              <span style={{ display: 'block', font: 'var(--text-mono-s)', fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {n.sub}
              </span>
            </span>
            <span style={{ marginLeft: 'auto', font: 'var(--text-mono-s)', fontSize: '0.7rem', color: 'var(--gray-500)', position: 'relative' }}>0{i + 1}</span>
          </div>
        );
      })}
    </div>
  );
}

function Hero() {
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
          <window.Eyebrow>Portfolio demonstration</window.Eyebrow>
          <h1
            style={{
              font: 'var(--text-display-xl)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--text-on-dark)',
              margin: '0 0 22px',
            }}
          >
            From scattered company research to a{' '}
            <span
              style={{
                background: 'linear-gradient(115deg, var(--brand-300), var(--brand-500))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              checked, structured report.
            </span>
          </h1>
          <p style={{ font: 'var(--text-body-l)', color: 'var(--text-on-dark-muted)', margin: 0, maxWidth: 520, textWrap: 'pretty' }}>
            I built a three-scenario workflow for repeated company research. It collects selected website
            content, creates an analysis, checks whether the result is specific enough, and then prepares
            a final report.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" href="#workflow" icon={<Icon name="git-branch" size={17} />}>
              View the workflow
            </Button>
            <Button variant="onDark" size="lg" href={V2_PORTFOLIO_URL}>
              Back to Portfolio
            </Button>
          </div>
        </div>
        <HeroPipeline />
      </div>
    </Shell>
  );
}

/* ---- Project snapshot: technical fact bar ---- */
const SNAPSHOT = [
  { icon: 'flask-conical', label: 'Project type', value: 'Functional portfolio demonstration' },
  { icon: 'git-branch', label: 'Structure', value: '3 connected Make.com scenarios' },
  { icon: 'badge-check', label: 'Main differentiator', value: 'Separate quality-control layer' },
  { icon: 'layers', label: 'Tools', value: 'Make.com · Supabase · HTTP · Groq' },
];

function Snapshot() {
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
        {SNAPSHOT.map((s, i) => (
          <div
            key={s.label}
            className="snapshot-card"
            style={{
              padding: '10px 24px',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              borderRadius: 10,
            }}
          >
            <Icon name={s.icon} size={18} color="var(--brand-400)" style={{ marginTop: 3 }} className="snapshot-card-icon" />
            <div>
              <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 5 }}>
                {s.label}
              </div>
              <div style={{ font: 'var(--text-body-s)', fontWeight: 600, color: 'var(--text-on-dark)' }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

Object.assign(window, { NavBar, Hero, Snapshot });
