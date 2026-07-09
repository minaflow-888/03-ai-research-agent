/* @ds-bundle: {"format":4,"namespace":"MinaFlowDesignSystem_a5074e","components":[{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"MetricStat","sourcePath":"components/content/MetricStat.jsx"},{"name":"ProcessStep","sourcePath":"components/content/ProcessStep.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"ToolChip","sourcePath":"components/core/ToolChip.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"}],"sourceHashes":{"components/content/Card.jsx":"d80f912d5d62","components/content/MetricStat.jsx":"9740b905c585","components/content/ProcessStep.jsx":"053cb3e1ac62","components/core/Badge.jsx":"608ecfe6f6f0","components/core/Button.jsx":"8e2ec8530eb1","components/core/ToolChip.jsx":"de72a629a696","components/feedback/Accordion.jsx":"b2ca8777b96e","components/feedback/Callout.jsx":"d54eecde63d7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MinaFlowDesignSystem_a5074e = window.MinaFlowDesignSystem_a5074e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Card.jsx
try { (() => {
/**
 * Generic rounded content card — the base surface for workflow steps,
 * lesson-learned notes, and general content blocks on case study pages.
 */
function Card({
  children,
  tone = 'light',
  padding = 'md',
  style
}) {
  const paddings = {
    sm: '18px 20px',
    md: '28px 32px',
    lg: '40px 44px'
  };
  const tones = {
    light: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-m)',
      color: 'var(--text-body)'
    },
    alt: {
      background: 'var(--surface-card-alt)',
      border: '1px solid var(--border-subtle)',
      color: 'var(--text-body)'
    },
    dark: {
      background: 'var(--surface-dark)',
      boxShadow: 'var(--inset-line-dark)',
      color: 'var(--text-on-dark)'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-l)',
      padding: paddings[padding],
      ...tones[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/MetricStat.jsx
try { (() => {
/**
 * Big before/after or impact number — a qualitative or verified-figure stat
 * used at the top of a case study. Only ever populated with figures the
 * project owner has explicitly confirmed — never an invented or estimated number.
 */
function MetricStat({
  value,
  label,
  delta,
  tone = 'light'
}) {
  const isDark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-display-m)',
      color: isDark ? 'var(--text-on-dark)' : 'var(--text-heading)',
      marginBottom: 4,
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, value, delta && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-heading-s)',
      color: 'var(--success-500)'
    }
  }, delta)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: isDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, label));
}
Object.assign(__ds_scope, { MetricStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/MetricStat.jsx", error: String((e && e.message) || e) }); }

// components/content/ProcessStep.jsx
try { (() => {
/**
 * Numbered step used in "How I turn a manual process into a working system"
 * style sequences (Audit & Map, Architect Logic, Build & Sync, Handover).
 */
function ProcessStep({
  number,
  title,
  description,
  tone = 'light'
}) {
  const isDark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 44,
      height: 44,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--text-heading-s)',
      background: isDark ? 'rgba(255,255,255,0.1)' : 'var(--brand-100)',
      color: isDark ? 'var(--brand-300)' : 'var(--brand-700)',
      border: isDark ? '1px solid var(--border-on-dark)' : 'none'
    }
  }, number), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-heading-s)',
      color: isDark ? 'var(--text-on-dark)' : 'var(--text-heading)',
      marginBottom: 6
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-m)',
      color: isDark ? 'var(--text-on-dark-muted)' : 'var(--text-body)'
    }
  }, description)));
}
Object.assign(__ds_scope, { ProcessStep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProcessStep.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = 'brand',
  variant = 'soft'
}) {
  const tones = {
    brand: {
      fg: 'var(--brand-700)',
      bg: 'var(--brand-100)',
      bgOnDark: 'rgba(166,93,252,0.18)',
      fgOnDark: 'var(--brand-300)'
    },
    success: {
      fg: 'var(--success-500)',
      bg: 'var(--success-100)'
    },
    warning: {
      fg: 'var(--warning-500)',
      bg: 'var(--warning-100)'
    },
    danger: {
      fg: 'var(--danger-500)',
      bg: 'var(--danger-100)'
    },
    neutral: {
      fg: 'var(--gray-600)',
      bg: 'var(--gray-100)'
    }
  };
  const t = tones[tone] || tones.brand;
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '5px 12px',
    borderRadius: 'var(--radius-pill)',
    font: 'var(--text-label)',
    letterSpacing: 'var(--tracking-wide)',
    textTransform: variant === 'eyebrow' ? 'uppercase' : 'none',
    color: t.fg,
    background: variant === 'outline' ? 'transparent' : t.bg,
    border: variant === 'outline' ? `1px solid ${t.fg}` : '1px solid transparent'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: style
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  icon
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    borderRadius: 'var(--radius-pill)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    minHeight: 44,
    transition: 'transform var(--duration-base) var(--ease-standard), background var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), filter var(--duration-base) var(--ease-standard)',
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  };
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 14
    },
    md: {
      padding: '12px 22px',
      fontSize: 15
    },
    lg: {
      padding: '15px 28px',
      fontSize: 16
    }
  };
  const variants = {
    primary: {
      background: 'var(--brand-gradient)',
      color: 'var(--text-on-brand)',
      boxShadow: 'var(--shadow-m)'
    },
    secondary: {
      background: 'var(--surface-page)',
      color: 'var(--text-heading)',
      borderColor: 'var(--border-default)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-heading)'
    },
    onDark: {
      background: 'rgba(255,255,255,0.1)',
      color: 'var(--text-on-dark)',
      borderColor: 'var(--border-on-dark)'
    }
  };
  const style = {
    ...base,
    ...sizes[size],
    ...variants[variant]
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    className: `ds-button ds-button--${variant}${disabled ? ' is-disabled' : ''}`,
    style: style
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/ToolChip.jsx
try { (() => {
/**
 * Small tool/tech reference chip — icon + label, used to show the stack
 * a workflow connects (Webflow, Google Sheets, Outlook, HubSpot, Make.com,
 * Supabase, Groq, etc).
 * Icon is passed in by the consumer (e.g. an <img> or lucide <i> element)
 * — ToolChip does not ship its own icon set.
 */
function ToolChip({
  label,
  icon,
  tone = 'light'
}) {
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 14px 8px 10px',
    borderRadius: 'var(--radius-pill)',
    font: 'var(--text-body-s)',
    fontWeight: 500,
    background: tone === 'dark' ? 'rgba(255,255,255,0.08)' : 'var(--surface-page)',
    color: tone === 'dark' ? 'var(--text-on-dark)' : 'var(--text-heading)',
    border: tone === 'dark' ? '1px solid var(--border-on-dark)' : '1px solid var(--border-subtle)',
    boxShadow: tone === 'dark' ? 'none' : 'var(--shadow-s)'
  };
  const iconWrap = {
    width: 22,
    height: 22,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: tone === 'dark' ? 'rgba(255,255,255,0.12)' : 'var(--surface-page-alt)',
    flexShrink: 0
  };
  return /*#__PURE__*/React.createElement("span", {
    style: style
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: iconWrap
  }, icon), label);
}
Object.assign(__ds_scope, { ToolChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ToolChip.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Expand/collapse row — used for FAQ-style "Limitations & edge cases" or
 * "Testing" lists at the end of a case study.
 */
function Accordion({
  items,
  defaultOpenIndex = -1
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, items.map((item, i) => {
    const isOpen = openIndex === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpenIndex(isOpen ? -1 : i),
      style: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '18px 4px',
        font: 'var(--text-heading-s)',
        color: 'var(--text-heading)',
        textAlign: 'left'
      }
    }, item.question, /*#__PURE__*/React.createElement("span", {
      style: {
        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform var(--duration-base) var(--ease-standard)',
        fontSize: 20,
        color: 'var(--brand-500)',
        flexShrink: 0,
        marginLeft: 12
      }
    }, "+")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height var(--duration-slow) var(--ease-standard)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 4px 18px',
        font: 'var(--text-body-m)',
        color: 'var(--text-body)'
      }
    }, item.answer)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Callout.jsx
try { (() => {
/**
 * Colored inline note — used for "Tested scenario", "Known limitation", "Lesson learned",
 * "Quality check passed" call-outs inside a case study's explanatory copy. Content
 * should only state what was actually built/tested — never an invented metric.
 */
function Callout({
  children,
  kind = 'note',
  title
}) {
  const kinds = {
    note: {
      bg: 'var(--brand-100)',
      fg: 'var(--brand-700)',
      label: title || 'Note'
    },
    limitation: {
      bg: 'var(--warning-100)',
      fg: 'var(--warning-500)',
      label: title || 'Limitation'
    },
    success: {
      bg: 'var(--success-100)',
      fg: 'var(--success-500)',
      label: title || 'Result'
    },
    lesson: {
      bg: 'var(--gray-100)',
      fg: 'var(--gray-700)',
      label: title || 'Lesson learned'
    }
  };
  const k = kinds[kind] || kinds.note;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: k.bg,
      borderRadius: 'var(--radius-m)',
      padding: '18px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: k.fg,
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, k.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-body-m)',
      color: 'var(--text-body)'
    }
  }, children));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Callout.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.MetricStat = __ds_scope.MetricStat;

__ds_ns.ProcessStep = __ds_scope.ProcessStep;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ToolChip = __ds_scope.ToolChip;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Callout = __ds_scope.Callout;

})();
