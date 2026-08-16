// Workflow states, limitations & next steps, what I learned, transparency, related work, final CTA, footer.
const { Button, Callout } = window.MinaFlowDesignSystem_a5074e;
const { Icon, Shell, SectionHead, V2_PORTFOLIO_URL, V2_LEAD_CAPTURE_URL } = window;
const END_CONTENT = window.CaseStudyContent;

/* ---------------- Workflow states lifecycle ---------------- */
const LIFECYCLE = [
  { s: 'queued' }, { s: 'processing' }, { s: 'analyzed' }, { s: 'quality_checking' },
  { s: 'approved', tone: 'good', alt: { s: 'needs_improvement', tone: 'warn' } },
  { s: 'report_generating' }, { s: 'final report saved', tone: 'final', outcome: true },
];

function StatesSection() {
  return (
    <Shell tone="ink" grid pad="lg" id="states">
      <SectionHead
        eyebrow="Workflow states & testing"
        title="Every company moves through one connected lifecycle"
        lede="The status field in Supabase is the handoff between scenarios — each one only picks up records in the state it is responsible for."
      />
      <div className="reveal-up only-desktop-700">
        <div className="panel-dark" style={{ padding: '34px 30px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 900 }}>
            {LIFECYCLE.map((st, i) => (
              <React.Fragment key={st.s}>
                {i > 0 && (
                  <span aria-hidden="true" style={{ flex: 1, minWidth: 18, height: 2, background: 'linear-gradient(90deg, rgba(166,93,252,0.5), rgba(91,141,239,0.5))' }}></span>
                )}
                {st.alt ? (
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                    <span className={`state-pill ${st.tone}`}>{st.s}</span>
                    <span aria-hidden="true" style={{ width: 2, height: 14, background: 'rgba(229,165,54,0.5)' }}></span>
                    <span className={`state-pill ${st.alt.tone}`}>{st.alt.s}</span>
                    <span style={{ font: 'var(--text-mono-s)', fontSize: '0.64rem', color: '#F0C878', opacity: 0.8 }}>held for improvement</span>
                  </span>
                ) : st.outcome ? (
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                    <span className={`state-pill ${st.tone || ''}`} style={{ fontStyle: 'normal' }}>{st.s}</span>
                    <span style={{ font: 'var(--text-mono-s)', fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--brand-300)', opacity: 0.85 }}>
                      final outcome
                    </span>
                  </span>
                ) : (
                  <span className={`state-pill ${st.tone || ''}`}>{st.s}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="reveal-up only-mobile-700">
        <div className="panel-dark" style={{ padding: '26px 22px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          {LIFECYCLE.map((st, i) => (
            <React.Fragment key={st.s}>
              {i > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="rail-v" style={{ height: 24 }}><div className="fill"></div></div>
                </div>
              )}
              {st.alt ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                  <span className={`state-pill ${st.tone}`}>{st.s}</span>
                  <span aria-hidden="true" style={{ width: 2, height: 12, background: 'rgba(229,165,54,0.5)' }}></span>
                  <span className={`state-pill ${st.alt.tone}`}>{st.alt.s}</span>
                  <span style={{ font: 'var(--text-mono-s)', fontSize: '0.68rem', color: '#F0C878', opacity: 0.85 }}>held for improvement</span>
                </div>
              ) : st.outcome ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                  <span className={`state-pill ${st.tone || ''}`}>{st.s}</span>
                  <span style={{ font: 'var(--text-mono-s)', fontSize: '0.66rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--brand-300)', opacity: 0.9 }}>
                    final outcome
                  </span>
                </div>
              ) : (
                <span className={`state-pill ${st.tone || ''}`} style={{ alignSelf: 'center' }}>{st.s}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 22, maxWidth: 720 }}>
        <Callout kind="note" title="Testing status">
          The three scenarios are technically working and the main routes were tested with
          demonstration data. The project was not deployed in a live client environment.
        </Callout>
      </div>
    </Shell>
  );
}

/* ---------------- Limitations & next steps ---------------- */
const LIMITS = [
 'AI output can still contain weak or incorrect conclusions even after the quality check.',
  'Website content may be incomplete, require JavaScript to load or block automated retrieval.',
  'The quality check reduces generic output but does not replace human review before the report is used.',
  'The record-locking mechanism prevents most duplicate runs but is not a guaranteed safeguard in every edge case.',
  'Production use would require stronger error handling, retry logic, source tracking and monitoring.',
  'This is a portfolio demonstration tested with demonstration data, not a production deployment.',
];

function LimitationsSection() {
  return (
    <Shell tone="light" pad="lg" id="limitations">
      <SectionHead
        dark={false}
        eyebrow="Honest by design"
        title="What still needs improvement"
      />
      <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 56, alignItems: 'start' }}>
        <div>
          <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--warning-500)', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
            <Icon name="alert-triangle" size={15} /> Current limitations
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
            {LIMITS.map((l, i) => (
              <li key={l} style={{ padding: '14px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)', font: 'var(--text-body-m)', color: 'var(--text-body)', textWrap: 'pretty' }}>
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--brand-600)', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
            <Icon name="arrow-up-right" size={15} /> Possible next steps
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
            {END_CONTENT.NEXT_IMPROVEMENTS.map((n, i) => (
              <li key={n} style={{ padding: '14px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)', font: 'var(--text-body-m)', color: 'var(--text-body)', display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span style={{ font: 'var(--text-mono-s)', fontSize: '0.72rem', color: 'var(--brand-500)', flexShrink: 0 }}>0{i + 1}</span>
                <span style={{ textWrap: 'pretty' }}>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Planned V2 (not implemented) ---------------- */
const V2_PLANNED = [
  'Collect information from the official website and selected external sources.',
  'Filter irrelevant and duplicate search results.',
  'Keep the most useful sources for analysis.',
  'Save source titles, URLs, dates and source types.',
  'Connect important report claims with supporting sources.',
  'Flag unsupported AI conclusions.',
  'Identify conflicts between the company website and external sources.',
  'Warn when information may be outdated.',
  'Route uncertain or low-quality results for human review.',
  'Include a clear source list in the final report.',
];

function PlannedV2Section() {
  return (
    <Shell tone="lightAlt" pad="lg" id="planned-v2">
      <div className="reveal-up" style={{ maxWidth: 760, marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 18 }}>
          <window.Eyebrow dark={false}>What's next for this project</window.Eyebrow>
          <span
            className="mono-tag light"
            style={{ borderColor: 'var(--warning-500)', color: 'var(--warning-500)', background: 'var(--warning-100)', fontWeight: 700 }}
          >
            PLANNED V2 — NOT IMPLEMENTED
          </span>
        </div>
        <h2 style={{ font: 'var(--text-display-m)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)', margin: '0 0 18px' }}>
          Extending research beyond the company website
        </h2>
        <p style={{ font: 'var(--text-body-l)', color: 'var(--text-body)', margin: 0, textWrap: 'pretty' }}>
          The current version mainly analyses information from a company's official website. In a future
          V2, I plan to extend the workflow with multi-source research through OpenSERP or a similar
          search API.
        </p>
      </div>

      <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 32 }}>
        {V2_PLANNED.map((item, i) => (
          <div
            key={item}
            style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              padding: '18px 20px', borderRadius: 'var(--radius-m)',
              background: 'var(--gray-0)', border: '1px dashed var(--border-default)',
            }}
          >
            <span style={{ font: 'var(--text-mono-s)', fontSize: '0.72rem', color: 'var(--warning-500)', flexShrink: 0 }}>0{i + 1}</span>
            <span style={{ font: 'var(--text-body-m)', color: 'var(--text-body)', textWrap: 'pretty' }}>{item}</span>
          </div>
        ))}
      </div>

      <div className="reveal-up" style={{ maxWidth: 720 }}>
        <p style={{ font: 'var(--text-body-m)', color: 'var(--text-heading)', fontWeight: 600, margin: '0 0 8px', textWrap: 'pretty' }}>
          The goal is not to replace human research, but to make company research faster, more
          transparent and easier to verify.
        </p>
        <p style={{ font: 'var(--text-body-s)', color: 'var(--text-muted)', margin: 0, textWrap: 'pretty' }}>
          These are planned future improvements and are not part of the current implemented version.
        </p>
      </div>
    </Shell>
  );
}

/* ---------------- What I learned + transparency ---------------- */
function LearnedSection() {
  return (
    <Shell tone="lightAlt" pad="md" id="learned">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'start' }}>
        <div className="reveal-up">
          <window.Eyebrow dark={false}>What I learned</window.Eyebrow>
          <blockquote style={{ margin: 0, font: 'var(--text-heading-m)', fontWeight: 500, lineHeight: 1.5, color: 'var(--text-heading)', textWrap: 'pretty' }}>
            “Generating an answer is only one part of a useful AI workflow. The result also needs clear
            states, a separate review step and a way to handle output that is not good enough.”
          </blockquote>
          <p style={{ font: 'var(--text-body-m)', color: 'var(--text-body)', marginTop: 18, marginBottom: 0, textWrap: 'pretty' }}>
            I also learned how to connect website content, AI processing and database status changes
            across several Make.com scenarios.
          </p>
        </div>
        <div className="reveal-up" style={{ background: 'var(--gray-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-l)', padding: '28px 30px', boxShadow: 'var(--shadow-s)' }}>
          <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
            <Icon name="shield" size={15} /> Project transparency
          </div>
          <p style={{ font: 'var(--text-body-m)', color: 'var(--text-body)', margin: 0, textWrap: 'pretty' }}>
            This is a functional portfolio demonstration built and tested with demonstration data.
            It was not developed for a live client environment.
          </p>
          <p style={{ font: 'var(--text-body-m)', color: 'var(--text-body)', margin: '12px 0 0', textWrap: 'pretty' }}>
            AI-generated research should be reviewed before it is used for important business decisions.
          </p>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Related case studies ---------------- */
const RELATED = [
  {
    tag: 'Case study 01',
    title: 'Lead Capture Automation',
    text: 'Captures, validates and logs website leads, then sends an internal notification and automatic reply.',
    href: V2_LEAD_CAPTURE_URL,
    action: 'View Case Study',
  },
  {
    tag: 'Case study 02',
    title: 'Order Handoff Automation',
    text: 'Turns a HubSpot Closed Won deal into a documented customer handoff with validation, duplicate prevention, a welcome email and status logging.',
    href: 'https://minaflow-888.github.io/02-order-handoff-automation/',
    action: 'Explore Project',
  },
];

function RelatedSection() {
  return (
    <Shell tone="navy" pad="md" id="related">
      <SectionHead eyebrow="More case studies" title="Related work" />
      <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {RELATED.map((r) => (
          <a
            key={r.title}
            href={r.href}
            className="panel-dark hover-lift"
            style={{ display: 'block', padding: '30px 32px', textDecoration: 'none' }}
          >
            <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 12 }}>
              {r.tag}
            </div>
            <div style={{ font: 'var(--text-heading-m)', color: 'var(--text-on-dark)', marginBottom: 8 }}>{r.title}</div>
            <div style={{ font: 'var(--text-body-s)', color: 'var(--text-on-dark-muted)', textWrap: 'pretty', marginBottom: 18 }}>{r.text}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: 'var(--text-body-s)', fontWeight: 600, color: 'var(--brand-300)' }}>
              {r.action} <Icon name="arrow-right" size={14} />
            </div>
          </a>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Final CTA + footer ---------------- */
function FinalCTA() {
  return (
    <Shell tone="ink" grid pad="lg" id="contact">
      <window.Glow x="50%" y="40%" size={760} opacity={0.22} />
      <div className="reveal-up" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <window.Eyebrow>
          <span style={{ margin: '0 auto' }}>Let's talk</span>
        </window.Eyebrow>
        <h2 style={{ font: 'var(--text-display-m)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-on-dark)', margin: '0 0 18px' }}>
          Looking for someone who can map, build and clearly document practical workflows?
        </h2>
        <p style={{ font: 'var(--text-body-l)', color: 'var(--text-on-dark-muted)', margin: '0 0 34px', textWrap: 'pretty' }}>
          I am looking for an internship, practice placement or junior opportunity in Malmö or Skåne
          where I can continue learning while contributing practical automation work.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" href={V2_PORTFOLIO_URL}>Back to Portfolio</Button>
          <Button variant="onDark" size="lg" href={V2_LEAD_CAPTURE_URL}>View Lead Capture Case Study</Button>
        </div>
      </div>
    </Shell>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--ink-950)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '26px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <img src="assets/mina-logo.png" alt="Mina" style={{ height: 20, display: 'block' }} />
        <span style={{ font: 'var(--text-body-s)', color: 'var(--gray-500)' }}>
          AI Research Agent — functional portfolio demonstration
        </span>
        <a href={V2_PORTFOLIO_URL} style={{ font: 'var(--text-body-s)', fontWeight: 600 }}>Back to Portfolio</a>
      </div>
    </footer>
  );
}

Object.assign(window, { StatesSection, LimitationsSection, PlannedV2Section, LearnedSection, RelatedSection, FinalCTA, Footer });
