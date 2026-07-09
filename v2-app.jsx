// App assembly: reveal-on-scroll observer + lucide icon hydration.
function runLucideV2() {
  if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
}

function App() {
  // Re-scan for icons on every render so conditional UI (tabs, lightbox) gets converted.
  React.useEffect(() => {
    runLucideV2();
  });

  // Reveal-on-scroll: hide .reveal-up elements, then reveal as they enter the viewport.
  // Reveal-on-scroll: content is visible by default in CSS (safe with JS disabled).
  // Primary mechanism is IntersectionObserver (threshold: 0, unobserve-once) —
  // it is driven by the browser's compositor thread independently of the page's
  // main-thread frame cadence, so it reliably fires even when a rAF-based poll
  // would not. A low-frequency setInterval sweep is kept as a belt-and-braces
  // safety net: it force-reveals any `.reveal-up` whose bounding rect shows it
  // is on-screen or already scrolled past, guaranteeing nothing can be stuck
  // permanently invisible even under adverse conditions.
  React.useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const els = Array.from(document.querySelectorAll('.reveal-up'));
    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    const isOnOrPastScreen = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < vh(); // in view, or already scrolled above the viewport
    };

    const toObserve = els.filter((el) => {
      if (isOnOrPastScreen(el) && el.getBoundingClientRect().bottom > 0) return false; // already visible at mount
      el.classList.add('is-hidden');
      return true;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-hidden');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );
    toObserve.forEach((el) => io.observe(el));

    // Safety-net sweep: catches anything IO missed (e.g. scrolled straight past).
    const sweep = setInterval(() => {
      let remaining = 0;
      document.querySelectorAll('.reveal-up.is-hidden').forEach((el) => {
        if (isOnOrPastScreen(el)) {
          el.classList.remove('is-hidden');
          io.unobserve(el);
        } else {
          remaining++;
        }
      });
      if (remaining === 0) clearInterval(sweep);
    }, 800);

    return () => { io.disconnect(); clearInterval(sweep); };
  }, []);

  return (
    <div>
      <window.NavBar />
      <main>
        <div data-screen-label="Hero"><window.Hero /></div>
        <div data-screen-label="Project snapshot"><window.Snapshot /></div>
        <div data-screen-label="Business problem"><window.ProblemSection /></div>
        <div data-screen-label="System map"><window.SystemMap /></div>
        <div data-screen-label="Three-scenario workflow"><window.WorkflowSection /></div>
        <div data-screen-label="Workflow evidence"><window.EvidenceSection /></div>
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Retries in case the lucide CDN script loads after first commit.
for (const delay of [0, 150, 400, 900, 1800]) {
  setTimeout(runLucideV2, delay);
}
