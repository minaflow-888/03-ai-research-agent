// App assembly: language state, reveal-on-scroll observer + lucide icon hydration.
function runLucideV2() {
  if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
}

const AppContext = React.createContext(null);

function AppProvider({ children }) {
  const [lang, setLang] = React.useState(() => {
    try { return window.localStorage.getItem('mina-ai-research-lang') === 'sv' ? 'sv' : 'en'; }
    catch (_) { return 'en'; }
  });

  React.useEffect(() => {
    document.documentElement.lang = lang === 'sv' ? 'sv' : 'en';
    try { window.localStorage.setItem('mina-ai-research-lang', lang); } catch (_) {}
  }, [lang]);

  return <AppContext.Provider value={{ lang, setLang }}>{children}</AppContext.Provider>;
}

function useApp() {
  return React.useContext(AppContext) || { lang: 'en', setLang: () => {} };
}

Object.assign(window, { useApp });

const RESPONSIVE_FIXES = `
  /* Swedish desktop copy needs a slightly tighter heading so it stays inside the left column. */
  html[lang="sv"] [data-screen-label="Hero"] h1 {
    font-size: clamp(3.15rem, 4vw, 4.1rem) !important;
    line-height: 1.03 !important;
    letter-spacing: -0.045em !important;
    max-width: 96% !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
  }

  /* Keep the four workflow cards clearly separated on Swedish desktop copy. */
  html[lang="sv"] .hero-pipeline-card:nth-of-type(1) {
    left: 2% !important;
    top: 1% !important;
    width: 48% !important;
  }
  html[lang="sv"] .hero-pipeline-card:nth-of-type(2) {
    left: 52% !important;
    top: 27% !important;
    width: 46% !important;
  }
  html[lang="sv"] .hero-pipeline-card:nth-of-type(3) {
    left: 2% !important;
    top: 53% !important;
    width: 52% !important;
  }
  html[lang="sv"] .hero-pipeline-card:nth-of-type(4) {
    left: 52% !important;
    top: 80% !important;
    width: 46% !important;
  }

  html[lang="sv"] .hero-pipeline-card {
    transform-origin: center center;
  }

  /* Full mobile pass: never let desktop min-width grids force content outside the viewport. */
  @media (max-width: 640px) {
    body {
      width: 100%;
      overflow-x: hidden !important;
    }

    section {
      padding-top: 72px !important;
      padding-bottom: 72px !important;
    }

    section > div {
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 18px !important;
      padding-right: 18px !important;
    }

    [data-screen-label] * {
      min-width: 0;
      max-width: 100%;
    }

    /* Any inline auto-fit grid becomes one safe mobile column. */
    [data-screen-label] [style*="grid-template-columns"] {
      grid-template-columns: minmax(0, 1fr) !important;
      gap: 24px !important;
    }

    [data-screen-label] h1,
    [data-screen-label] h2,
    [data-screen-label] h3,
    [data-screen-label] p,
    [data-screen-label] li,
    [data-screen-label] blockquote,
    [data-screen-label] span {
      overflow-wrap: anywhere;
      word-break: normal;
    }

    [data-screen-label="Hero"] section {
      padding-top: 52px !important;
    }

    [data-screen-label="Hero"] h1,
    html[lang="sv"] [data-screen-label="Hero"] h1 {
      font-size: clamp(2.2rem, 11.2vw, 3.2rem) !important;
      line-height: 1.0 !important;
      letter-spacing: -0.04em !important;
      max-width: 100% !important;
      width: 100% !important;
      overflow-wrap: anywhere !important;
      word-break: break-word !important;
      hyphens: auto !important;
    }

    /* Hero becomes text first, then a readable vertical pipeline. */
    [data-screen-label="Hero"] .reveal-up:has(> .hero-pipeline-card) {
      aspect-ratio: auto !important;
      height: auto !important;
      max-width: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 12px !important;
      margin-top: 8px !important;
    }

    [data-screen-label="Hero"] .reveal-up:has(> .hero-pipeline-card) > svg,
    [data-screen-label="Hero"] .reveal-up:has(> .hero-pipeline-card) > span:not(.hero-pipeline-card) {
      display: none !important;
    }

    [data-screen-label="Hero"] .hero-pipeline-card,
    html[lang="sv"] [data-screen-label="Hero"] .hero-pipeline-card {
      position: relative !important;
      left: auto !important;
      top: auto !important;
      width: 100% !important;
      min-height: 72px !important;
      transform: none !important;
      padding: 14px 16px !important;
      margin: 0 !important;
    }

    [data-screen-label="Hero"] .hero-pipeline-card strong,
    [data-screen-label="Hero"] .hero-pipeline-card span {
      text-overflow: ellipsis;
    }

    /* Navigation: keep language + portfolio controls inside the screen. */
    header > div {
      padding: 12px 18px !important;
      gap: 10px !important;
    }

    header > div > div:last-child {
      width: 100% !important;
      justify-content: space-between !important;
      gap: 8px !important;
    }

    header .ds-button {
      min-height: 40px !important;
      padding-left: 14px !important;
      padding-right: 14px !important;
      font-size: 0.82rem !important;
    }

    /* Section headings and long Swedish/English copy. */
    [data-screen-label="Business problem"] h2,
    [data-screen-label="System map"] h2,
    [data-screen-label="Three-scenario workflow"] h2,
    [data-screen-label="Workflow evidence"] h2,
    [data-screen-label="Project resources"] h2,
    [data-screen-label="Quality control"] h2,
    [data-screen-label="Core capabilities"] h2,
    [data-screen-label="Technology stack"] h2,
    [data-screen-label="Workflow states"] h2,
    [data-screen-label="Limitations"] h2,
    [data-screen-label="Planned V2"] h2,
    [data-screen-label="What I learned"] h2,
    [data-screen-label="Related work"] h2,
    [data-screen-label="Final CTA"] h2 {
      font-size: clamp(2rem, 10vw, 2.8rem) !important;
      line-height: 1.05 !important;
    }

    /* Workflow scenario cards were designed with desktop padding. */
    [data-screen-label="Three-scenario workflow"] .panel-dark {
      padding: 22px 18px !important;
      margin-bottom: 20px !important;
    }

    /* Evidence toolbar/tabs and lightbox must wrap instead of widening the page. */
    [data-screen-label="Workflow evidence"] [role="tablist"] {
      width: 100% !important;
      margin-left: 0 !important;
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 8px !important;
    }

    [data-screen-label="Workflow evidence"] .evi-tab {
      width: 100% !important;
      justify-content: center !important;
      padding: 8px 10px !important;
      white-space: normal !important;
      text-align: center !important;
    }

    /* Quality, limitations, learned and related cards: reduce desktop padding. */
    [data-screen-label="Quality control"] [style*="padding: 30px 32px"],
    [data-screen-label="What I learned"] [style*="padding: 28px 30px"],
    [data-screen-label="Related work"] [style*="padding: 30px 32px"] {
      padding: 22px 18px !important;
    }

    /* Resources: images stay contained and buttons stack when needed. */
    [data-screen-label="Project resources"] img {
      width: 100% !important;
      height: auto !important;
      object-fit: contain !important;
    }

    [data-screen-label="Project resources"] a {
      max-width: 100% !important;
    }

    /* Mobile lifecycle already switches layouts at 700px; ensure pills can shrink. */
    [data-screen-label="Workflow states"] .state-pill {
      white-space: normal !important;
      text-align: center !important;
      max-width: 100% !important;
    }
  }
`;

function PageContent() {
  const { lang } = useApp();

  React.useEffect(() => {
    runLucideV2();
    const timers = [0, 150, 400, 900].map((delay) => setTimeout(runLucideV2, delay));
    return () => timers.forEach(clearTimeout);
  }, [lang]);

  React.useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const els = Array.from(document.querySelectorAll('.reveal-up'));
    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    const isOnOrPastScreen = (el) => el.getBoundingClientRect().top < vh();

    const toObserve = els.filter((el) => {
      const r = el.getBoundingClientRect();
      if (isOnOrPastScreen(el) && r.bottom > 0) return false;
      el.classList.add('is-hidden');
      return true;
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-hidden');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });

    toObserve.forEach((el) => io.observe(el));

    const sweep = setInterval(() => {
      let remaining = 0;
      document.querySelectorAll('.reveal-up.is-hidden').forEach((el) => {
        if (isOnOrPastScreen(el)) {
          el.classList.remove('is-hidden');
          io.unobserve(el);
        } else remaining++;
      });
      if (remaining === 0) clearInterval(sweep);
    }, 800);

    return () => { io.disconnect(); clearInterval(sweep); };
  }, [lang]);

  return (
    <div>
      <style>{RESPONSIVE_FIXES}</style>
      <window.NavBar />
      <main>
        <div data-screen-label="Hero"><window.Hero /></div>
        <div data-screen-label="Project snapshot"><window.Snapshot /></div>
        <div data-screen-label="Business problem"><window.ProblemSection /></div>
        <div data-screen-label="System map"><window.SystemMap /></div>
        <div data-screen-label="Three-scenario workflow"><window.WorkflowSection /></div>
        <div data-screen-label="Workflow evidence"><window.EvidenceSection /></div>
        <div data-screen-label="Project resources"><window.ResourcesSection /></div>
        <div data-screen-label="Quality control"><window.QualitySection /></div>
        <div data-screen-label="Core capabilities"><window.CapabilitiesSection /></div>
        <div data-screen-label="Technology stack"><window.StackSection /></div>
        <div data-screen-label="Workflow states"><window.StatesSection /></div>
        <div data-screen-label="Limitations"><window.LimitationsSection /></div>
        <div data-screen-label="Planned V2"><window.PlannedV2Section /></div>
        <div data-screen-label="What I learned"><window.LearnedSection /></div>
        <div data-screen-label="Related work"><window.RelatedSection /></div>
        <div data-screen-label="Final CTA"><window.FinalCTA /></div>
      </main>
      <window.Footer />
    </div>
  );
}

function App() {
  return <AppProvider><PageContent /></AppProvider>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

for (const delay of [0, 150, 400, 900, 1800]) setTimeout(runLucideV2, delay);