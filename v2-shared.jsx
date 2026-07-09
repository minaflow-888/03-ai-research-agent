// Shared primitives for the redesigned AI Research Agent case study.
const DS = window.MinaFlowDesignSystem_a5074e;

const V2_PORTFOLIO_URL = 'https://portfolio-site-9d14e9.webflow.io/';
const V2_LEAD_CAPTURE_URL = 'https://minaflow-888.github.io/01-lead-capture-automation-case-study/';

function Icon({ name, size = 18, color, style, className }) {
  return (
    <i
      data-lucide={name}
      className={className}
      style={{ width: size, height: size, display: 'inline-block', color, flexShrink: 0, ...style }}
    ></i>
  );
}

/* Full-width section wrapper. tone: 'ink' (near-black), 'navy' (violet-navy), 'light', 'lightAlt' */
function Shell({ id, tone = 'ink', grid = false, children, style, pad = 'lg' }) {
  const tones = {
    ink: { background: 'var(--ink-950)', color: 'var(--text-on-dark-muted)' },
    navy: { background: 'var(--gray-900)', color: 'var(--text-on-dark-muted)' },
    light: { background: 'var(--gray-0)', color: 'var(--text-body)' },
    lightAlt: { background: 'var(--gray-50)', color: 'var(--text-body)' },
  };
  const pads = { lg: '110px 0', md: '80px 0', sm: '48px 0' };
  return (
    <section
      id={id}
      className={grid ? 'dotgrid' : undefined}
      style={{ ...tones[tone], padding: pads[pad], position: 'relative', overflow: 'hidden', ...style }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
        {children}
      </div>
    </section>
  );
}

function Eyebrow({ children, dark = true }) {
  return (
    <div
      style={{
        font: 'var(--text-eyebrow)',
        letterSpacing: 'var(--tracking-widest)',
        textTransform: 'uppercase',
        color: dark ? 'var(--brand-300)' : 'var(--brand-600)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 18,
      }}
    >
      <span style={{ width: 26, height: 2, background: dark ? 'var(--brand-400)' : 'var(--brand-500)', display: 'inline-block' }}></span>
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, lede, dark = true, center = false, maxWidth = 660 }) {
  return (
    <div
      className="reveal-up"
      style={{
        marginBottom: 52,
        maxWidth,
        marginLeft: center ? 'auto' : 0,
        marginRight: center ? 'auto' : 0,
        textAlign: center ? 'center' : 'left',
      }}
    >
      {eyebrow && (
        <div style={{ display: center ? 'flex' : 'block', justifyContent: 'center' }}>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        style={{
          font: 'var(--text-display-m)',
          letterSpacing: 'var(--tracking-tight)',
          color: dark ? 'var(--text-on-dark)' : 'var(--text-heading)',
          margin: 0,
        }}
      >
        {title}
      </h2>
      {lede && (
        <p style={{ font: 'var(--text-body-l)', color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-body)', marginTop: 18, marginBottom: 0 }}>
          {lede}
        </p>
      )}
    </div>
  );
}

/* Soft radial purple glow, positioned absolutely by the caller */
function Glow({ x = '50%', y = '50%', size = 640, opacity = 0.22, color = '122, 47, 248' }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, transparent 65%)`,
        pointerEvents: 'none',
      }}
    ></div>
  );
}

Object.assign(window, {
  V2_PORTFOLIO_URL,
  V2_LEAD_CAPTURE_URL,
  Icon,
  Shell,
  Eyebrow,
  SectionHead,
  Glow,
});
