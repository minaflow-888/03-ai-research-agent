// The business problem (light editorial) + the central connected system map (dark signature).
const { Icon, Shell, SectionHead } = window;
const V2_CONTENT = window.CaseStudyContent;

/* ---------------- Problem: editorial split, not three identical cards ---------------- */
function ProblemSection() {
  const cards = V2_CONTENT.PROBLEM_CARDS;
  return (
    <Shell tone="light" pad="lg" id="problem">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'start' }}>
        <div>
          <SectionHead
            dark={false}
            eyebrow="The business problem"
            title="Researching one company is easy. Researching many is not."
          />
          <div className="reveal-up" style={{ font: 'var(--text-body-l)', color: 'var(--text-body)', maxWidth: 480, marginTop: -22 }}>
            <p style={{ marginTop: 0, textWrap: 'pretty' }}>
              Researching one company may involve opening several pages, collecting relevant details,
              organising notes, writing an analysis and reviewing whether it actually contains useful
              company-specific information.
            </p>
            <p style={{ marginBottom: 0, textWrap: 'pretty' }}>
              When that is repeated for several companies, the process can become slow and inconsistent
              — and AI-generated text can sound convincing while staying too generic to act on.
            </p>
          </div>
        </div>
        <div className="reveal-up" style={{ display: 'flex', flexDirection: 'column' }}>
          {cards.map((c, i) => (
            <div
              key={c.title}
              style={{
                display: 'flex',
                gap: 22,
                alignItems: 'flex-start',
                padding: '28px 0',
                borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--brand-100)', color: 'var(--brand-600)',
                }}
              >
                <Icon name={c.icon} size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span style={{ font: 'var(--text-mono-s)', fontSize: '0.75rem', color: 'var(--gray-400)' }}>0{i + 1}</span>
                  <h3 style={{ font: 'var(--text-heading-s)', color: 'var(--text-heading)', margin: 0 }}>{c.title}</h3>
                </div>
                <p style={{ font: 'var(--text-body-m)', color: 'var(--text-body)', margin: '8px 0 0', textWrap: 'pretty' }}>{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Central connected system map ---------------- */
const MAP_W = 1100, MAP_H = 640;
const MAP_GROUPS = [
  { id: 'input', label: 'Input', icon: 'inbox', x: 30, y: 246, w: 205, anchor: [235, 306], chips: ['queued company', 'website URL'] },
  { id: 'collection', label: 'Collection', icon: 'globe', x: 205, y: 40, w: 240, anchor: [325, 152], chips: ['selected website content', 'HTTP retrieval'] },
  { id: 'analysis', label: 'Analysis', icon: 'file-text', x: 648, y: 40, w: 240, anchor: [768, 152], chips: ['Groq company analysis', 'saved analysis'] },
  { id: 'quality', label: 'Quality control', icon: 'badge-check', x: 858, y: 236, w: 218, anchor: [858, 328],
    chips: ['quality evaluation', { t: 'approved', tone: 'good' }, { t: 'needs improvement', tone: 'warn' }, 'feedback saved'] },
  { id: 'output', label: 'Output', icon: 'file-output', x: 430, y: 480, w: 240, anchor: [550, 480], chips: ['master report', 'saved final result'] },
];
const MAP_ORDER = ['input', 'collection', 'analysis', 'quality', 'output'];
const CX = 550, CY = 316;

function MapChips({ chips, big }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
      {chips.map((c) => {
        const obj = typeof c === 'string' ? { t: c } : c;
        return (
          <span key={obj.t} className={`map-chip${obj.tone ? ' ' + obj.tone : ''}`} style={big ? { fontSize: '0.78rem' } : undefined}>
            {obj.t}
          </span>
        );
      })}
    </div>
  );
}

function SystemMap() {
  const [active, setActive] = React.useState(null);
  const [hovered, setHovered] = React.useState(null);
  const ref = React.useRef(null);
  const played = React.useRef(false);

  // Activate nodes in sequence the first time the map scrolls into view.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();
        if (reduced) return;
        MAP_ORDER.forEach((id, i) => setTimeout(() => setActive(id), 500 + i * 650));
        setTimeout(() => setActive(null), 500 + MAP_ORDER.length * 650 + 900);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lit = hovered || active;

  return (
    <Shell tone="ink" grid pad="lg" id="system-map">
      <window.Glow x="50%" y="46%" size={880} opacity={0.16} />
      <SectionHead
        center
        eyebrow="System map"
        title="One system, five connected responsibilities"
        lede="Every stage reads and writes workflow state, so the system always knows where each company is. A weak analysis does not continue to the final report — feedback is saved for a later improvement pass."
      />

      {/* Desktop map */}
      <div className="reveal-up only-desktop" ref={ref} style={{ position: 'relative', width: '100%', aspectRatio: `${MAP_W} / ${MAP_H}` }}>
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
          {/* spokes hub -> groups */}
          {MAP_GROUPS.map((g, i) => (
            <line
              key={g.id}
              className={`map-spoke${lit === g.id ? ' lit' : ''}`}
              x1={CX} y1={CY} x2={g.anchor[0]} y2={g.anchor[1]}
              strokeWidth="1.5"
            />
          ))}
          {/* flow arc input -> collection -> analysis -> quality -> output */}
          <path className="draw" pathLength="1" d="M 132 246 C 140 160, 180 120, 240 96" stroke="rgba(91,141,239,0.5)" strokeWidth="1.6" style={{ transitionDelay: '250ms' }} />
          <path className="draw" pathLength="1" d="M 448 88 C 520 60, 580 60, 645 88" stroke="rgba(91,141,239,0.5)" strokeWidth="1.6" style={{ transitionDelay: '550ms' }} />
          <path className="draw" pathLength="1" d="M 892 96 C 950 122, 986 164, 976 236" stroke="rgba(91,141,239,0.5)" strokeWidth="1.6" style={{ transitionDelay: '850ms' }} />
          <path className="draw" pathLength="1" d="M 960 436 C 930 500, 820 528, 674 522" stroke="rgba(91,141,239,0.5)" strokeWidth="1.6" style={{ transitionDelay: '1150ms' }} />
          {/* feedback: quality -> analysis (dashed, returns up) */}
          <path className="draw" pathLength="1" d="M 856 300 C 812 268, 812 220, 850 168" stroke="rgba(229,165,54,0.65)" strokeWidth="1.5" strokeDasharray="5 5" style={{ transitionDelay: '1500ms' }} />
          <text x="742" y="242" fill="#F0C878" opacity="0.85" fontSize="12" fontFamily="var(--font-mono)" letterSpacing="0.06em">feedback saved for revision</text>
          {/* arrowheads (small chevrons) */}
          <path d="M 240 96 l -10 -1 M 240 96 l -5 9" stroke="rgba(91,141,239,0.7)" strokeWidth="1.6" fill="none" />
          <path d="M 645 88 l -10 -3 M 645 88 l -8 7" stroke="rgba(91,141,239,0.7)" strokeWidth="1.6" fill="none" />
          <path d="M 976 236 l -3 -10 M 976 236 l 8 -7" stroke="rgba(91,141,239,0.7)" strokeWidth="1.6" fill="none" />
          <path d="M 674 522 l 9 -6 M 674 522 l 9 6" stroke="rgba(91,141,239,0.7)" strokeWidth="1.6" fill="none" />
          <path d="M 850 168 l -1 10 M 850 168 l -10 2" stroke="rgba(229,165,54,0.8)" strokeWidth="1.4" fill="none" />
        </svg>

        {/* central hub */}
        <div
          style={{
            position: 'absolute',
            left: `${(CX / MAP_W) * 100}%`,
            top: `${(CY / MAP_H) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: 190, height: 190, borderRadius: '50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'radial-gradient(circle at 32% 28%, rgba(166,93,252,0.30), rgba(21,12,41,0.94) 70%)',
            border: '1px solid rgba(166,93,252,0.5)',
            boxShadow: '0 0 0 1px rgba(166,93,252,0.2), 0 0 90px rgba(122,47,248,0.35)',
            textAlign: 'center',
          }}
        >
          <Icon name="bot" size={26} color="var(--brand-300)" />
          <div style={{ font: 'var(--text-heading-s)', fontSize: '1.02rem', color: 'var(--text-on-dark)', lineHeight: 1.25 }}>
            AI Research<br />Agent
          </div>
          <div style={{ font: 'var(--text-mono-s)', fontSize: '0.66rem', letterSpacing: '0.1em', color: 'var(--gray-400)' }}>
            3 MAKE.COM SCENARIOS
          </div>
        </div>

        {/* group nodes */}
        {MAP_GROUPS.map((g, i) => (
          <div
            key={g.id}
            className={`map-node${lit === g.id ? ' active' : ''}`}
            onMouseEnter={() => setHovered(g.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              left: `${(g.x / MAP_W) * 100}%`,
              top: `${(g.y / MAP_H) * 100}%`,
              width: `${(g.w / MAP_W) * 100}%`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name={g.icon} size={16} color={lit === g.id ? 'var(--brand-300)' : 'var(--gray-400)'} />
              <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-on-dark)' }}>
                {g.label}
              </span>
              <span style={{ marginLeft: 'auto', font: 'var(--text-mono-s)', fontSize: '0.68rem', color: 'var(--gray-500)' }}>0{i + 1}</span>
            </div>
            <MapChips chips={g.chips} />
          </div>
        ))}
      </div>

      {/* Mobile map: vertical connected column */}
      <div className="reveal-up only-mobile">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          {MAP_GROUPS.map((g, i) => (
            <React.Fragment key={g.id}>
              {i > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="rail-v" style={{ height: 30 }}><div className="fill"></div></div>
                </div>
              )}
              <div className="map-node" style={{ position: 'relative', left: 'auto', top: 'auto', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon name={g.icon} size={16} color="var(--gray-400)" />
                  <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-on-dark)' }}>
                    {g.label}
                  </span>
                  <span style={{ marginLeft: 'auto', font: 'var(--text-mono-s)', fontSize: '0.68rem', color: 'var(--gray-500)' }}>0{i + 1}</span>
                </div>
                <MapChips chips={g.chips} big />
                {g.id === 'quality' && (
                  <div style={{ marginTop: 10, font: 'var(--text-mono-s)', fontSize: '0.72rem', color: '#F0C878' }}>
                    needs improvement → held for improvement, feedback saved for revision
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Shell>
  );
}

Object.assign(window, { ProblemSection, SystemMap });
