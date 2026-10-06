// Bilingual nav, hero and project snapshot.
const { Button } = window.MinaFlowDesignSystem_a5074e;
const { Icon, Shell, V2_PORTFOLIO_URL } = window;

const HERO_COPY = {
  en: {
    back: 'Back to Portfolio', eyebrow: 'Portfolio demonstration',
    titleA: 'From scattered company research to a ', titleB: 'checked, structured report.',
    lede: 'I built a three-scenario workflow for repeated company research. It collects selected website content, creates an analysis, checks whether the result is specific enough, and then prepares a final report.',
    view: 'View the workflow', stages: [
      ['Website content','HTTP retrieval'], ['Company analysis','Groq · saved to Supabase'], ['Quality check','approved / needs_improvement'], ['Final report','structured master report']
    ],
    feedback: 'feedback saved for revision',
    snapshot: [
      ['Project type','Functional portfolio demonstration','flask-conical'],
      ['Structure','3 connected Make.com scenarios','git-branch'],
      ['Main differentiator','Separate quality-control layer','badge-check'],
      ['Tools','Make.com · Supabase · HTTP · Groq','layers']
    ]
  },
  sv: {
    back: 'Tillbaka till Portfolio', eyebrow: 'Portfoliodemonstration',
    titleA: 'Från utspridd företagsresearch till en ', titleB: 'kontrollerad, strukturerad rapport.',
    lede: 'Jag byggde ett arbetsflöde med tre scenarier för återkommande företagsresearch. Det hämtar utvalt innehåll från webbplatsen, skapar en analys, kontrollerar om resultatet är tillräckligt konkret och skapar sedan en slutrapport.',
    view: 'Visa arbetsflödet', stages: [
      ['Webbplatsinnehåll','Hämtas via HTTP'], ['Företagsanalys','Groq · sparas i Supabase'], ['Kvalitetskontroll','approved / needs_improvement'], ['Slutrapport','strukturerad masterrapport']
    ],
    feedback: 'feedback sparas för förbättring',
    snapshot: [
      ['Projekttyp','Fungerande portfoliodemonstration','flask-conical'],
      ['Struktur','3 sammankopplade Make.com-scenarier','git-branch'],
      ['Viktig skillnad','Separat lager för kvalitetskontroll','badge-check'],
      ['Verktyg','Make.com · Supabase · HTTP · Groq','layers']
    ]
  }
};

function NavBar() {
  const { lang, setLang } = window.useApp(); const c = HERO_COPY[lang];
  return <header style={{ position:'sticky', top:0, zIndex:50, background:'rgba(10,6,18,.82)', backdropFilter:'var(--blur-m)', borderBottom:'1px solid rgba(255,255,255,.08)' }}>
    <div style={{ maxWidth:1160, margin:'0 auto', padding:'14px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
      <div style={{ display:'flex', alignItems:'center', gap:14 }}><a href={V2_PORTFOLIO_URL} style={{ display:'flex', alignItems:'center' }}><img src="assets/mina-logo.png" alt="Mina" style={{ height:26, display:'block' }} /></a><span aria-hidden="true" style={{ width:1, height:20, background:'rgba(255,255,255,.16)' }}></span><span style={{ font:'var(--text-label)', letterSpacing:'var(--tracking-wide)', textTransform:'uppercase', color:'var(--gray-300)' }}>AI Research Agent</span></div>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div aria-label="Language" style={{ display:'flex', padding:3, border:'1px solid rgba(255,255,255,.14)', borderRadius:999, background:'rgba(255,255,255,.04)' }}>
          {['en','sv'].map((x)=><button key={x} type="button" onClick={()=>setLang(x)} aria-pressed={lang===x} style={{ border:0, cursor:'pointer', borderRadius:999, padding:'7px 11px', font:'var(--text-label)', background:lang===x?'var(--brand-gradient)':'transparent', color:lang===x?'#fff':'var(--gray-400)' }}>{x.toUpperCase()}</button>)}
        </div>
        <Button variant="onDark" size="sm" href={V2_PORTFOLIO_URL} icon={<Icon name="arrow-left" size={15} />}>{c.back}</Button>
      </div>
    </div>
  </header>;
}

const HERO_SEQUENCE = [0,1,2,3,null];
function HeroPipeline({ copy }) {
  const [active, setActive] = React.useState(0);
  React.useEffect(()=>{ if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; let i=0; const id=setInterval(()=>{i=(i+1)%HERO_SEQUENCE.length; setActive(HERO_SEQUENCE[i]);},1600); return()=>clearInterval(id);},[]);
  const pos=[{x:10,y:8,w:300,icon:'globe'},{x:218,y:132,w:310,icon:'file-text'},{x:34,y:258,w:320,icon:'badge-check'},{x:226,y:394,w:300,icon:'file-output'}];
  const W=540,H=490;
  return <div className="reveal-up" style={{ position:'relative', width:'100%', maxWidth:560, aspectRatio:`${W}/${H}`, margin:'0 auto' }}>
    <svg viewBox={`0 0 ${W} ${H}`} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} aria-hidden="true"><path className="hero-path" d="M160 100 C160 132,366 96,372 132"/><path className="hero-path" d="M366 224 C366 258,200 224,194 258"/><path className="hero-path" d="M194 350 C194 392,372 352,376 394"/><path className="hero-feedback-path" d="M46 350 C8 300,90 176,214 172" strokeDasharray="5 5"/></svg>
    <span style={{ position:'absolute', left:'1%', top:'42%', font:'var(--text-mono-s)', fontSize:'.66rem', color:'#F0C878', transform:'rotate(-14deg)' }}>{copy.feedback}</span>
    {pos.map((n,i)=><div key={i} className={`panel-dark raised hero-pipeline-card${active===i?' hero-pipeline-card--active':''}`} style={{ position:'absolute', left:`${n.x/W*100}%`, top:`${n.y/H*100}%`, width:`${n.w/W*100}%`, padding:'14px 18px', display:'flex', alignItems:'center', gap:14 }}><span style={{ width:38,height:38,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,.06)' }}><Icon name={n.icon} size={19} color="var(--brand-300)" /></span><span style={{ minWidth:0 }}><strong style={{ display:'block', color:'var(--text-on-dark)' }}>{copy.stages[i][0]}</strong><span style={{ display:'block', font:'var(--text-mono-s)', fontSize:'.72rem', color:'var(--gray-400)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{copy.stages[i][1]}</span></span></div>)}
  </div>;
}

function Hero() {
  const { lang } = window.useApp(); const c = HERO_COPY[lang];
  return <Shell tone="ink" grid pad="lg" style={{ paddingTop:84 }}><window.Glow x="18%" y="8%" size={720} opacity={.2}/><div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(330px,1fr))', gap:64, alignItems:'center' }}><div className="reveal-up"><window.Eyebrow>{c.eyebrow}</window.Eyebrow><h1 style={{ font:'var(--text-display-xl)', letterSpacing:'var(--tracking-tight)', color:'var(--text-on-dark)', margin:'0 0 22px' }}>{c.titleA}<span style={{ background:'linear-gradient(115deg,var(--brand-300),var(--brand-500))', WebkitBackgroundClip:'text', color:'transparent' }}>{c.titleB}</span></h1><p style={{ font:'var(--text-body-l)', color:'var(--text-on-dark-muted)', margin:0, maxWidth:520 }}>{c.lede}</p><div style={{ display:'flex', gap:14, marginTop:34, flexWrap:'wrap' }}><Button variant="primary" size="lg" href="#workflow" icon={<Icon name="git-branch" size={17}/>}>{c.view}</Button><Button variant="onDark" size="lg" href={V2_PORTFOLIO_URL}>{c.back}</Button></div></div><HeroPipeline copy={c}/></div></Shell>;
}

function Snapshot() {
  const { lang } = window.useApp(); const c = HERO_COPY[lang];
  return <Shell tone="ink" pad="sm" style={{ borderTop:'1px solid rgba(255,255,255,.07)', borderBottom:'1px solid rgba(255,255,255,.07)' }}><div className="reveal-up" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))' }}>{c.snapshot.map((s,i)=><div key={s[0]} style={{ padding:'10px 24px', borderLeft:i===0?'none':'1px solid rgba(255,255,255,.08)', display:'flex', gap:14 }}><Icon name={s[2]} size={18} color="var(--brand-400)" style={{ marginTop:3 }}/><div><div style={{ font:'var(--text-label)', textTransform:'uppercase', color:'var(--gray-500)', marginBottom:5 }}>{s[0]}</div><div style={{ font:'var(--text-body-s)', fontWeight:600, color:'var(--text-on-dark)' }}>{s[1]}</div></div></div>)}</div></Shell>;
}

Object.assign(window,{ NavBar, Hero, Snapshot });
