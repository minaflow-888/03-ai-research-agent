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

const HERO_SV_LAYOUT_FIX = `
  /* Swedish copy needs a slightly tighter heading so it stays inside the left column. */
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

  @media (max-width: 760px) {
    html[lang="sv"] [data-screen-label="Hero"] h1 {
      font-size: clamp(2.7rem, 12vw, 4rem) !important;
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
      <style>{HERO_SV_LAYOUT_FIX}</style>
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