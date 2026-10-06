// Bilingual three-scenario workflow, real workflow evidence and project resources.
const { Badge } = window.MinaFlowDesignSystem_a5074e;
const { Icon, Shell, SectionHead } = window;

const FLOW_COPY = {
  en: {
    workflowEyebrow: 'Three-scenario workflow',
    workflowTitle: 'One continuous process, split into three scenarios',
    workflowLede: 'Each scenario picks up where the previous one left off, using Supabase status fields as the handoff. The lock step at the start of each scenario reduces the risk of the same record being processed twice.',
    qualityLayer: 'quality layer',
    approved: 'Approved',
    approvedText: 'Status set to approved. Scenario 3 picks it up for the final master report.',
    needs: 'Needs improvement',
    needsText: 'Feedback is saved and status set to needs_improvement. The analysis does not continue to the final report.',
    scenarios: [
      { tag: 'SCENARIO 1', title: 'Company Analysis', icon: 'file-text', steps: [
        'Finds a queued company in Supabase.',
        'Marks the record as processing before the research starts.',
        'HTTP retrieves content from the company website.',
        'Groq creates a structured company analysis from the website text.',
        'The analysis is saved to Supabase with status analyzed.'
      ]},
      { tag: 'SCENARIO 2', title: 'Quality Check', icon: 'badge-check', hot: true, steps: [
        'Finds a record with status analyzed.',
        'Marks it as quality_checking before the review starts.',
        'A second Groq call checks whether the analysis is specific and useful or too generic.',
        'Make.com reads the structured JSON result and routes the record to the correct branch.',
        'Approved records continue. Weak analyses are stopped and feedback is saved.'
      ]},
      { tag: 'SCENARIO 3', title: 'Final Master Report', icon: 'file-output', steps: [
        'Finds an approved record.',
        'Marks it as report_generating.',
        'Groq creates the final structured report from the approved analysis.',
        'The report is saved to Supabase and the status becomes final.'
      ]}
    ],
    evidenceEyebrow: 'Real workflow evidence',
    evidenceTitle: 'The actual Make.com scenarios, not a mockup',
    evidenceLede: 'This screenshot shows the real three-scenario build. Use the tabs to inspect each part or open the full workflow larger.',
    tabs: ['Full workflow', 'Scenario 1', 'Scenario 2', 'Scenario 3'],
    viewLarger: 'View larger',
    evidenceNote: 'Scenario 2 is the branching step: Make.com reads Groq’s JSON output and routes the record to approved or needs improvement. Make controls the next step; the AI only provides the structured result.',
    resourcesEyebrow: 'Project resources',
    resourcesTitle: 'Plan, documentation and demo',
    resourcesLede: 'Explore the hand-drawn workflow sketch, the project documentation and the planned video walkthrough.',
    sketchTitle: 'Workflow planning sketch',
    sketchText: 'A hand-drawn overview of how company research, quality review and final report generation are connected.',
    sketchAlt: 'Hand-drawn AI Research Agent workflow sketch in English',
    demoTitle: 'Demo coming soon',
    demoText: 'A walkthrough video will be added later to show how all three Make.com scenarios work together in practice.',
    docsTitle: 'Project documentation',
    docsText: 'The documentation explains the workflow logic, AI quality check, report generation, data handling, limitations and planned improvements.',
    enDoc: 'Documentation — EN',
    svDoc: 'Documentation — SV'
  },
  sv: {
    workflowEyebrow: 'Arbetsflöde i tre scenarier',
    workflowTitle: 'En sammanhängande process, uppdelad i tre scenarier',
    workflowLede: 'Varje scenario tar vid där det föregående slutade. Statusfält i Supabase används som överlämning mellan stegen. Låsningssteget i början av varje scenario minskar risken att samma post behandlas två gånger.',
    qualityLayer: 'kvalitetslager',
    approved: 'Godkänd',
    approvedText: 'Status sätts till approved. Scenario 3 tar sedan över och skapar slutrapporten.',
    needs: 'Behöver förbättras',
    needsText: 'Feedback sparas och status sätts till needs_improvement. Analysen går inte vidare till slutrapporten.',
    scenarios: [
      { tag: 'SCENARIO 1', title: 'Företagsanalys', icon: 'file-text', steps: [
        'Hittar ett företag med status queued i Supabase.',
        'Markerar posten som processing innan researchen startar.',
        'HTTP hämtar innehåll från företagets webbplats.',
        'Groq skapar en strukturerad företagsanalys från webbplatsens innehåll.',
        'Analysen sparas i Supabase med status analyzed.'
      ]},
      { tag: 'SCENARIO 2', title: 'Kvalitetskontroll', icon: 'badge-check', hot: true, steps: [
        'Hittar en post med status analyzed.',
        'Markerar den som quality_checking innan kontrollen börjar.',
        'Ett andra Groq-anrop kontrollerar om analysen är konkret och användbar eller för generell.',
        'Make.com läser det strukturerade JSON-resultatet och skickar posten till rätt gren.',
        'Godkända analyser går vidare. Svagare analyser stoppas och feedback sparas.'
      ]},
      { tag: 'SCENARIO 3', title: 'Slutrapport', icon: 'file-output', steps: [
        'Hittar en godkänd post.',
        'Markerar den som report_generating.',
        'Groq skapar den slutliga strukturerade rapporten från den godkända analysen.',
        'Rapporten sparas i Supabase och status ändras till final.'
      ]}
    ],
    evidenceEyebrow: 'Bevis från det riktiga arbetsflödet',
    evidenceTitle: 'De faktiska Make.com-scenarierna, inte en mockup',
    evidenceLede: 'Skärmbilden visar den verkliga lösningen med tre scenarier. Använd flikarna för att se varje del eller öppna hela flödet större.',
    tabs: ['Hela flödet', 'Scenario 1', 'Scenario 2', 'Scenario 3'],
    viewLarger: 'Visa större',
    evidenceNote: 'Scenario 2 är förgreningen: Make.com läser Groqs JSON-resultat och skickar posten till godkänd eller behöver förbättras. Make styr nästa steg; AI:n levererar bara det strukturerade resultatet.',
    resourcesEyebrow: 'Projektmaterial',
    resourcesTitle: 'Plan, dokumentation och demo',
    resourcesLede: 'Här finns den handritade skissen, projektdokumentationen och platsen för en kommande videogenomgång.',
    sketchTitle: 'Planeringsskiss',
    sketchText: 'En handritad översikt som visar hur företagsresearch, kvalitetskontroll och slutrapport hänger ihop.',
    sketchAlt: 'Handritad skiss av AI Research Agent-flödet på svenska',
    demoTitle: 'Demo kommer snart',
    demoText: 'En videogenomgång läggs till senare för att visa hur de tre Make.com-scenarierna fungerar tillsammans i praktiken.',
    docsTitle: 'Projektdokumentation',
    docsText: 'Dokumentationen beskriver arbetsflödets logik, AI-kvalitetskontroll, rapportgenerering, datahantering, begränsningar och planerade förbättringar.',
    enDoc: 'Dokumentation — EN',
    svDoc: 'Dokumentation — SV'
  }
};

function ScenarioPanel({ s, index, copy }) {
  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
      <div className="only-desktop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 46, flexShrink: 0 }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--text-heading-s)', background: s.hot ? 'var(--brand-gradient)' : 'rgba(255,255,255,0.06)', border: s.hot ? 'none' : '1px solid rgba(255,255,255,0.14)', color: 'var(--gray-0)', boxShadow: s.hot ? '0 0 44px rgba(122,47,248,0.5)' : 'none' }}>{index + 1}</div>
        {index < 2 && <div className="rail-v" style={{ flex: 1, marginTop: 10 }}><div className="fill"></div></div>}
      </div>
      <div className={`panel-dark${s.hot ? ' raised' : ''}`} style={{ flex: 1, padding: s.hot ? '38px 40px' : '30px 34px', marginBottom: 34, ...(s.hot ? { borderColor: 'rgba(166,93,252,0.5)', boxShadow: '0 0 0 1px rgba(166,93,252,0.28), 0 18px 70px rgba(122,47,248,0.28)' } : {}) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span className="mono-tag">{s.tag}</span><h3 style={{ font: 'var(--text-heading-m)', color: 'var(--text-on-dark)', margin: 0 }}>{s.title}</h3>
          {s.hot && <Badge tone="brand" variant="eyebrow">{copy.qualityLayer}</Badge>}
          <Icon name={s.icon} size={20} color="var(--brand-400)" style={{ marginLeft: 'auto' }} />
        </div>
        <ol style={{ margin: '20px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {s.steps.map((step, i) => <li key={step} style={{ display: 'flex', gap: 12, alignItems: 'baseline', font: 'var(--text-body-m)', color: 'var(--text-on-dark-muted)' }}><span style={{ font: 'var(--text-mono-s)', fontSize: '0.72rem', color: 'var(--gray-500)', width: 22, flexShrink: 0 }}>{index + 1}.{i + 1}</span><span>{step}</span></li>)}
        </ol>
        {s.hot && <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 220px', border: '1px solid rgba(47,174,107,0.4)', borderRadius: 'var(--radius-m)', padding: '14px 18px', background: 'rgba(47,174,107,0.07)' }}><strong style={{ color: '#7BDCA8' }}><Icon name="check" size={14} /> {copy.approved}</strong><div style={{ font: 'var(--text-body-s)', color: 'var(--text-on-dark-muted)', marginTop: 6 }}>{copy.approvedText}</div></div>
          <div style={{ flex: '1 1 220px', border: '1px dashed rgba(229,165,54,0.5)', borderRadius: 'var(--radius-m)', padding: '14px 18px', background: 'rgba(229,165,54,0.06)' }}><strong style={{ color: '#F0C878' }}><Icon name="rotate-ccw" size={14} /> {copy.needs}</strong><div style={{ font: 'var(--text-body-s)', color: 'var(--text-on-dark-muted)', marginTop: 6 }}>{copy.needsText}</div></div>
        </div>}
      </div>
    </div>
  );
}

function WorkflowSection() {
  const { lang } = window.useApp(); const copy = FLOW_COPY[lang];
  return <Shell tone="navy" pad="lg" id="workflow"><window.Glow x="86%" y="16%" size={620} opacity={0.14} /><SectionHead eyebrow={copy.workflowEyebrow} title={copy.workflowTitle} lede={copy.workflowLede} /><div className="reveal-up">{copy.scenarios.map((s, i) => <ScenarioPanel key={s.tag} s={s} index={i} copy={copy} />)}</div></Shell>;
}

const EVI_TABS = [
  { id: 'full', y0: 0, y1: 1 }, { id: 's1', y0: 0, y1: 0.267 }, { id: 's2', y0: 0.272, y1: 0.733 }, { id: 's3', y0: 0.738, y1: 1 },
];
const EVI_RATIO = 831 / 682;

function EvidenceSection() {
  const { lang } = window.useApp(); const copy = FLOW_COPY[lang];
  const [tab, setTab] = React.useState('full'); const [zoom, setZoom] = React.useState(false);
  const t = EVI_TABS.find((x) => x.id === tab); const frac = t.y1 - t.y0;
  React.useEffect(() => { if (!zoom) return; const onKey = (e) => e.key === 'Escape' && setZoom(false); window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [zoom]);
  return <Shell tone="ink" grid pad="lg" id="evidence"><SectionHead eyebrow={copy.evidenceEyebrow} title={copy.evidenceTitle} lede={copy.evidenceLede} />
    <div className="reveal-up"><div className="panel-dark raised" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}><span style={{ font: 'var(--text-mono-s)', fontSize: '0.74rem', color: 'var(--gray-400)' }}>make.com — AI Research Agent</span><div role="tablist" style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>{EVI_TABS.map((x, i) => <button key={x.id} type="button" role="tab" aria-selected={tab === x.id} className={`evi-tab${tab === x.id ? ' on' : ''}`} onClick={() => setTab(x.id)}>{copy.tabs[i]}</button>)}</div></div>
      <button type="button" onClick={() => setZoom(true)} style={{ position: 'relative', overflow: 'hidden', display: 'block', width: '100%', aspectRatio: `1 / ${EVI_RATIO * frac}`, background: '#F4F4F4', cursor: 'zoom-in', border: 'none', padding: 0 }}><img src="assets/workflow-screenshot.png" alt="Three Make.com scenarios" style={{ position: 'absolute', width: '100%', top: `-${(t.y0 / frac) * 100}%`, left: 0, display: 'block' }} /><span className="evi-viewlarger" style={{ position: 'absolute', right: 14, bottom: 14, padding: '8px 14px', borderRadius: 'var(--radius-pill)', background: 'rgba(10,6,18,0.8)', color: 'var(--gray-100)', font: 'var(--text-label)' }}><Icon name="maximize-2" size={14} /> {copy.viewLarger}</span></button>
    </div><p style={{ font: 'var(--text-body-s)', color: 'var(--gray-500)', marginTop: 16 }}>{copy.evidenceNote}</p></div>
    {zoom && <div onClick={() => setZoom(false)} role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,6,18,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflow: 'auto' }}><div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: 'min(1100px,94vw)' }}><button className="evi-close" type="button" onClick={() => setZoom(false)} style={{ position: 'absolute', top: -18, right: -18, zIndex: 1, width: 40, height: 40, borderRadius: '50%' }}><Icon name="x" size={18} /></button><img src="assets/workflow-screenshot.png" alt="Make.com workflow enlarged" style={{ maxWidth: '100%', maxHeight: '92vh', display: 'block', borderRadius: 'var(--radius-l)' }} /></div></div>}
  </Shell>;
}

function ResourcesSection() {
  const { lang } = window.useApp(); const copy = FLOW_COPY[lang];
  const sketch = lang === 'sv' ? 'assets/ai-research-agent-workflow-sketch-sv.png' : 'assets/ai-research-agent-workflow-sketch-en.png';
  const card = { borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(148,163,184,.16)', height: '100%', display: 'flex', flexDirection: 'column' };
  const btn = { display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, padding: '0 16px', borderRadius: 12, textDecoration: 'none', fontWeight: 700, border: '1px solid rgba(255,255,255,.2)', color: '#fff', background: 'rgba(255,255,255,.06)' };
  return <Shell tone="navy" grid pad="lg" id="resources"><SectionHead eyebrow={copy.resourcesEyebrow} title={copy.resourcesTitle} lede={copy.resourcesLede} />
    <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 24, alignItems: 'stretch' }}>
      <article className="panel-dark" style={card}><div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#f7f3ea' }}><img src={sketch} alt={copy.sketchAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div><div style={{ padding: 22, flex: 1 }}><h3 style={{ margin: '0 0 8px' }}>{copy.sketchTitle}</h3><p style={{ margin: 0, opacity: .82 }}>{copy.sketchText}</p></div></article>
      <article className="panel-dark" style={card}><div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg,#120c08,#19110c 55%,#3a1e0d)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}><div><span style={{ width: 72, height: 72, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(249,115,22,.25)', border: '1px solid rgba(255,255,255,.18)', marginBottom: 12 }}><Icon name="video" size={30} /></span><strong style={{ display: 'block', color: '#fff', fontSize: '1.05rem' }}>{copy.demoTitle}</strong><span style={{ opacity: .65 }}>AI Research Agent · Loom</span></div></div><div style={{ padding: 22, flex: 1 }}><h3 style={{ margin: '0 0 8px' }}>{copy.demoTitle}</h3><p style={{ margin: 0, opacity: .82 }}>{copy.demoText}</p></div></article>
    </div>
    <article className="panel-dark reveal-up" style={{ ...card, marginTop: 24, height: 'auto', padding: 22 }}><h3 style={{ margin: '0 0 8px' }}>{copy.docsTitle}</h3><p style={{ margin: '0 0 16px', opacity: .82 }}>{copy.docsText}</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}><a href="assets/AI_Research_Agent_Documentation_EN.pdf" target="_blank" rel="noopener noreferrer" style={btn}><Icon name="file-text" size={16} /> {copy.enDoc}</a><a href="assets/AI_Research_Agent_Documentation_SV.pdf" target="_blank" rel="noopener noreferrer" style={btn}><Icon name="file-text" size={16} /> {copy.svDoc}</a></div></article>
  </Shell>;
}

Object.assign(window, { WorkflowSection, EvidenceSection, ResourcesSection });
