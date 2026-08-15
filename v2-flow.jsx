// Three-scenario workflow (connected rail, Scenario 2 emphasized) + real workflow evidence.
const { Badge } = window.MinaFlowDesignSystem_a5074e;
const { Icon, Shell, SectionHead } = window;

const FLOW_SCENARIOS = [
  {
    tag: 'SCENARIO 1',
    title: 'Company Analysis',
    icon: 'file-text',
    steps: [
      'Finds a queued company in Supabase — Search Rows picks up only records with status queued',
      'Immediately marks it as processing before doing anything else — this lock prevents two scenario runs from picking up the same record at the same time',
      'HTTP GET retrieves content from the company website — Groq cannot open a URL on its own, the HTTP module does it and passes the text forward',
      'Groq receives the website text and a structured prompt and returns a company analysis as JSON',
      'Upsert saves the analysis and sets status to analyzed — Scenario 2 picks up only records with this status',
    ],
  },
  {
    tag: 'SCENARIO 2',
    title: 'Quality Check',
    icon: 'badge-check',
    hot: true,
    steps: [
      'Finds an analyzed record — Search Rows picks up only status analyzed, exactly where Scenario 1 left off',
      'Marks it as quality_checking before evaluating — same lock mechanism as Scenario 1',
      'A second Groq call evaluates whether the analysis is specific and useful or too generic, returning a structured JSON response',
      'The Make.com router reads the JSON value and routes to the correct branch — Make makes the deterministic decision, not the AI',
      'Approved: status set to approved, Scenario 3 picks it up — Needs improvement: feedback saved, the analysis does not continue',
    ],
  },
  {
    tag: 'SCENARIO 3',
    title: 'Final Master Report',
    icon: 'file-output',
    steps: [
      'Finds an approved record — Search Rows picks up only status approved',
      'Marks it as report_generating — same lock mechanism used across all three scenarios',
      'Groq generates the final master report based on the approved analysis',
      'Upsert saves the report and sets status to final — the pipeline is complete for that company',
    ],
  },
];

function ScenarioPanel({ s, index }) {
  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
      <div className="only-desktop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 46, flexShrink: 0 }}>
        <div
          style={{
            width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            font: 'var(--text-heading-s)',
            background: s.hot ? 'var(--brand-gradient)' : 'rgba(255,255,255,0.06)',
            border: s.hot ? 'none' : '1px solid rgba(255,255,255,0.14)',
            color: 'var(--gray-0)',
            boxShadow: s.hot ? '0 0 44px rgba(122,47,248,0.5)' : 'none',
          }}
        >
          {index + 1}
        </div>
        {index < FLOW_SCENARIOS.length - 1 && (
          <div className="rail-v" style={{ flex: 1, marginTop: 10 }}><div className="fill"></div></div>
        )}
      </div>

      <div
        className={`panel-dark${s.hot ? ' raised' : ''}`}
        style={{
          flex: 1,
          padding: s.hot ? '38px 40px' : '30px 34px',
          marginBottom: 34,
          ...(s.hot
            ? { borderColor: 'rgba(166,93,252,0.5)', boxShadow: '0 0 0 1px rgba(166,93,252,0.28), 0 18px 70px rgba(122,47,248,0.28)' }
            : {}),
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span className="mono-tag" style={s.hot ? { borderColor: 'rgba(166,93,252,0.5)', color: 'var(--brand-300)' } : undefined}>{s.tag}</span>
          <h3 style={{ font: 'var(--text-heading-m)', color: 'var(--text-on-dark)', margin: 0 }}>{s.title}</h3>
          {s.hot && <Badge tone="brand" variant="eyebrow">quality layer</Badge>}
          <Icon name={s.icon} size={20} color="var(--brand-400)" style={{ marginLeft: 'auto' }} />
        </div>
        <ol style={{ margin: '20px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {s.steps.map((step, i) => (
            <li key={step} style={{ display: 'flex', gap: 12, alignItems: 'baseline', font: 'var(--text-body-m)', color: 'var(--text-on-dark-muted)' }}>
              <span style={{ font: 'var(--text-mono-s)', fontSize: '0.72rem', color: 'var(--gray-500)', width: 22, flexShrink: 0 }}>{index + 1}.{i + 1}</span>
              <span style={{ textWrap: 'pretty' }}>{step}</span>
            </li>
          ))}
        </ol>
        {s.hot && (
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 220px', border: '1px solid rgba(47,174,107,0.4)', borderRadius: 'var(--radius-m)', padding: '14px 18px', background: 'rgba(47,174,107,0.07)' }}>
              <div style={{ font: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: '#7BDCA8', display: 'flex', gap: 8, alignItems: 'center' }}>
                <Icon name="check" size={14} /> Approved
              </div>
              <div style={{ font: 'var(--text-body-s)', color: 'var(--text-on-dark-muted)', marginTop: 6 }}>
                Status set to approved. Scenario 3 picks it up for the final master report.
              </div>
            </div>
            <div style={{ flex: '1 1 220px', border: '1px dashed rgba(229,165,54,0.5)', borderRadius: 'var(--radius-m)', padding: '14px 18px', background: 'rgba(229,165,54,0.06)' }}>
              <div style={{ font: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: '#F0C878', display: 'flex', gap: 8, alignItems: 'center' }}>
                <Icon name="rotate-ccw" size={14} /> Needs improvement
              </div>
              <div style={{ font: 'var(--text-body-s)', color: 'var(--text-on-dark-muted)', marginTop: 6 }}>
                Feedback saved and status set to needs_improvement. The analysis does not continue to the final report.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkflowSection() {
  return (
    <Shell tone="navy" pad="lg" id="workflow">
      <window.Glow x="86%" y="16%" size={620} opacity={0.14} />
      <SectionHead
        eyebrow="Three-scenario workflow"
        title="One continuous process, split into three scenarios"
        lede="Each scenario picks up where the previous one left off, using Supabase status fields as the handoff. The lock step at the start of each scenario prevents the same record from being processed twice."
      />
      <div className="reveal-up">
        {FLOW_SCENARIOS.map((s, i) => (
          <ScenarioPanel key={s.tag} s={s} index={i} />
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Real workflow evidence ---------------- */
const EVI_TABS = [
  { id: 'full', label: 'Full workflow', y0: 0, y1: 1 },
  { id: 's1', label: 'Scenario 1', y0: 0, y1: 0.267 },
  { id: 's2', label: 'Scenario 2', y0: 0.272, y1: 0.733 },
  { id: 's3', label: 'Scenario 3', y0: 0.738, y1: 1 },
];
const EVI_RATIO = 831 / 682;

function EvidenceSection() {
  const [tab, setTab] = React.useState('full');
  const [zoom, setZoom] = React.useState(false);
  const t = EVI_TABS.find((x) => x.id === tab);
  const frac = t.y1 - t.y0;

  const triggerRef = React.useRef(null);
  const closeRef = React.useRef(null);
  const lastFocused = React.useRef(null);

  const openZoom = () => {
    lastFocused.current = document.activeElement;
    setZoom(true);
  };
  const closeZoom = React.useCallback(() => {
    setZoom(false);
    if (lastFocused.current && lastFocused.current.focus) lastFocused.current.focus();
  }, []);

  React.useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => { if (e.key === 'Escape') closeZoom(); };
    window.addEventListener('keydown', onKey);
    if (closeRef.current) closeRef.current.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom, closeZoom]);

  return (
    <Shell tone="ink" grid pad="lg" id="evidence">
      <SectionHead
        eyebrow="Real workflow evidence"
        title="The actual Make.com scenarios, not a mockup"
        lede="This is the real, working three-scenario build. Use the tabs to inspect each scenario, or open the full workflow larger."
      />
      <div className="reveal-up">
        <div className="panel-dark raised" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', gap: 6 }}>
              {['#E15353', '#E5A536', '#2FAE6B'].map((c) => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.75 }}></span>
              ))}
            </span>
            <span style={{ font: 'var(--text-mono-s)', fontSize: '0.74rem', color: 'var(--gray-400)' }}>make.com — AI Research Agent</span>
            <div role="tablist" aria-label="Workflow scenario" style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {EVI_TABS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === x.id}
                  className={`evi-tab${tab === x.id ? ' on' : ''}`}
                  onClick={() => setTab(x.id)}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            ref={triggerRef}
            onClick={openZoom}
            aria-label="View the workflow screenshot larger"
            style={{
              position: 'relative', overflow: 'hidden', display: 'block', width: '100%',
              aspectRatio: `1 / ${EVI_RATIO * frac}`, background: '#F4F4F4',
              cursor: 'zoom-in', transition: 'aspect-ratio 400ms var(--ease-in-out)',
              border: 'none', padding: 0, margin: 0,
            }}
          >
            <img
              src="assets/workflow-screenshot.png"
              alt="Three real Make.com scenarios: Company Analysis, Quality Check, and Final Master Report"
              style={{ position: 'absolute', width: '100%', top: `-${(t.y0 / frac) * 100}%`, left: 0, display: 'block' }}
            />
            <span
              className="evi-viewlarger"
              style={{
                position: 'absolute', right: 14, bottom: 14,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 14px', borderRadius: 'var(--radius-pill)',
                background: 'rgba(10,6,18,0.8)', color: 'var(--gray-100)',
                font: 'var(--text-label)', backdropFilter: 'var(--blur-s)',
              }}
            >
              <Icon name="maximize-2" size={14} /> View larger
            </span>
          </button>
        </div>
        <p style={{ font: 'var(--text-body-s)', color: 'var(--gray-500)', marginTop: 16, marginBottom: 0 }}>
          Scenario 2 is the branching one: the Make.com router reads Groq's JSON output and sends the record to "Save approved result" or "Save improvement feedback". The routing decision is deterministic — Make reads a value, it does not interpret it.
        </p>
      </div>

      {zoom && (
        <div
          onClick={closeZoom}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged workflow screenshot"
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(10,6,18,0.9)', backdropFilter: 'var(--blur-s)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, overflow: 'auto',
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: 'min(1100px, 94vw)' }}>
            <button
              type="button"
              ref={closeRef}
              onClick={closeZoom}
              aria-label="Close enlarged screenshot"
              className="evi-close"
              style={{
                position: 'absolute', top: -18, right: -18, zIndex: 1,
                width: 40, height: 40, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--gray-0)', color: 'var(--gray-900)',
                border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-l)',
              }}
            >
              <Icon name="x" size={18} />
            </button>
            <img
              src="assets/workflow-screenshot.png"
              alt="Three Make.com scenarios, enlarged"
              style={{ maxWidth: '100%', maxHeight: '92vh', display: 'block', borderRadius: 'var(--radius-l)', boxShadow: 'var(--shadow-xl)' }}
            />
          </div>
        </div>
      )}
    </Shell>
  );
}

Object.assign(window, { WorkflowSection, EvidenceSection });
