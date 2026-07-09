// Why quality control matters (light) + core capabilities + technology stack (dark).
const { Icon, Shell, SectionHead } = window;
const QC_CONTENT = window.CaseStudyContent;

/* ---------------- Why quality control matters ---------------- */
function QualitySection() {
  return (
    <Shell tone="lightAlt" pad="lg" id="quality">
      <SectionHead
        dark={false}
        center
        eyebrow="Why quality control matters"
        title="Generating text is not the same as checking it."
        lede="A separate scenario evaluates every analysis before anything moves forward."
      />

      {/* process line */}
      <div className="reveal-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
        {['Generated analysis', 'Quality evaluation', 'Approved or Needs improvement'].map((step, i) => (
          <React.Fragment key={step}>
            {i > 0 && <Icon name="arrow-right" size={18} color="var(--brand-500)" />}
            <span
              style={{
                font: 'var(--text-body-s)', fontWeight: 600, color: 'var(--text-heading)',
                padding: '12px 20px', borderRadius: 'var(--radius-pill)',
                background: 'var(--gray-0)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-s)',
              }}
            >
              {step}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* comparison */}
      <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 940, margin: '0 auto' }}>
        <div style={{ background: 'var(--gray-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-l)', padding: '30px 32px', boxShadow: 'var(--shadow-s)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Icon name="x-circle" size={18} color="var(--danger-500)" />
            <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--danger-500)' }}>Too generic</span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {QC_CONTENT.TOO_GENERIC.map((t) => (
              <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'baseline', font: 'var(--text-body-m)', color: 'var(--text-body)' }}>
                <span style={{ color: 'var(--danger-500)', flexShrink: 0 }}>—</span>
                <span style={{ textWrap: 'pretty' }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            background: 'var(--gray-0)', borderRadius: 'var(--radius-l)', padding: '30px 32px',
            border: '1px solid var(--brand-300)', boxShadow: '0 8px 40px rgba(122,47,248,0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <Icon name="check-circle-2" size={18} color="var(--success-500)" />
            <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--success-500)' }}>Ready to approve</span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {QC_CONTENT.READY_TO_APPROVE.map((t) => (
              <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'baseline', font: 'var(--text-body-m)', color: 'var(--text-body)' }}>
                <Icon name="check" size={15} color="var(--success-500)" style={{ transform: 'translateY(2px)' }} />
                <span style={{ textWrap: 'pretty' }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="reveal-up" style={{ font: 'var(--text-body-s)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 640, margin: '36px auto 0', textWrap: 'pretty' }}>
        This check reduces weak output. It does not guarantee perfect factual accuracy — important
        results should still be reviewed by a person.
      </p>
    </Shell>
  );
}

/* ---------------- Core capabilities ---------------- */
const CAPABILITIES = [
  { icon: 'globe', label: 'Website content retrieval' },
  { icon: 'file-text', label: 'Company analysis generation' },
  { icon: 'badge-check', label: 'Separate quality check' },
  { icon: 'split', label: 'Approved / needs-improvement routing' },
  { icon: 'file-output', label: 'Final master report creation' },
  { icon: 'database', label: 'Saved workflow states' },
];

function CapabilitiesSection() {
  return (
    <Shell tone="ink" pad="md" id="capabilities">
      <SectionHead
        eyebrow="Core capabilities"
        title="What the system actually does"
      />
      <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
        {CAPABILITIES.map((c, i) => (
          <div key={c.label} className="panel-dark" style={{ padding: '22px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
            <Icon name={c.icon} size={20} color="var(--brand-400)" />
            <span style={{ font: 'var(--text-body-m)', fontWeight: 600, color: 'var(--text-on-dark)' }}>{c.label}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Technology stack ---------------- */
function StackSection() {
  return (
    <Shell tone="navy" pad="md" id="stack">
      <SectionHead
        eyebrow="Technology stack"
        title="Four tools, four clear responsibilities"
      />
      <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {QC_CONTENT.TOOLS.map((t) => (
          <div key={t.label} className="panel-dark" style={{ padding: '26px 26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${t.color}22`, border: `1px solid ${t.color}55`,
                }}
              >
                <Icon name={t.icon} size={19} color={t.color} />
              </span>
              <span style={{ font: 'var(--text-heading-s)', color: 'var(--text-on-dark)' }}>{t.label}</span>
            </div>
            <p style={{ font: 'var(--text-body-s)', color: 'var(--text-on-dark-muted)', margin: 0, textWrap: 'pretty' }}>{t.description}</p>
          </div>
        ))}
      </div>
    </Shell>
  );
}

Object.assign(window, { QualitySection, CapabilitiesSection, StackSection });
