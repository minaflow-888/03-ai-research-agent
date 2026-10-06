// Bilingual business problem + system map.
const { Icon, Shell, SectionHead } = window;

const MAP_COPY = {
  en: {
    problemEyebrow:'The business problem', problemTitle:'Researching one company is easy. Researching many is not.',
    problemP1:'Researching one company may involve opening several pages, collecting relevant details, organising notes, writing an analysis and checking whether it actually contains useful company-specific information.',
    problemP2:'When that is repeated for several companies, the process becomes slow and inconsistent — and AI-generated text can sound convincing while staying too generic to act on.',
    cards:[['Repeated manual research','The same research steps are repeated for every company.','refresh-cw'],['Inconsistent output','Manual write-ups vary in structure, which makes comparison and handoff harder.','shuffle'],['Generic AI output','AI can sound useful while still being too general. A separate quality check helps catch that.','file-question']],
    mapEyebrow:'System map', mapTitle:'One system, five connected responsibilities', mapLede:'Every stage reads and writes workflow state, so the system knows where each company is. Weak analyses do not continue to the final report.',
    groups:[['Input','queued company · website URL','inbox'],['Collection','website content · HTTP retrieval','globe'],['Analysis','Groq company analysis · saved analysis','file-text'],['Quality control','quality evaluation · approved / needs improvement','badge-check'],['Output','master report · saved final result','file-output']],
    feedback:'feedback saved for revision'
  },
  sv: {
    problemEyebrow:'Affärsproblemet', problemTitle:'Att undersöka ett företag är enkelt. Många företag är något annat.',
    problemP1:'Research om ett företag kan innebära att öppna flera sidor, samla relevanta detaljer, ordna anteckningar, skriva en analys och kontrollera om den verkligen innehåller användbar företagsspecifik information.',
    problemP2:'När samma process upprepas för flera företag blir arbetet långsamt och ojämnt — och AI-text kan låta övertygande men ändå vara för generell för att använda.',
    cards:[['Upprepad manuell research','Samma researchsteg upprepas för varje företag.','refresh-cw'],['Ojämnt resultat','Manuella analyser får olika struktur och blir svårare att jämföra eller lämna över.','shuffle'],['Generell AI-text','AI kan låta användbar men ändå vara för generell. En separat kvalitetskontroll hjälper till att fånga det.','file-question']],
    mapEyebrow:'Systemkarta', mapTitle:'Ett system, fem sammankopplade ansvarsområden', mapLede:'Varje steg läser och uppdaterar arbetsflödets status, så systemet vet var varje företag befinner sig. Svaga analyser går inte vidare till slutrapporten.',
    groups:[['Input','queued företag · webbplats-URL','inbox'],['Insamling','webbplatsinnehåll · HTTP-hämtning','globe'],['Analys','Groq företagsanalys · sparad analys','file-text'],['Kvalitetskontroll','kvalitetsbedömning · approved / needs improvement','badge-check'],['Output','masterrapport · sparat slutresultat','file-output']],
    feedback:'feedback sparas för förbättring'
  }
};

function ProblemSection(){ const {lang}=window.useApp(); const c=MAP_COPY[lang]; return <Shell tone="light" pad="lg" id="problem"><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:64,alignItems:'start'}}><div><SectionHead dark={false} eyebrow={c.problemEyebrow} title={c.problemTitle}/><div className="reveal-up" style={{font:'var(--text-body-l)',color:'var(--text-body)',maxWidth:480,marginTop:-22}}><p>{c.problemP1}</p><p>{c.problemP2}</p></div></div><div className="reveal-up">{c.cards.map((x,i)=><div key={x[0]} style={{display:'flex',gap:22,padding:'28px 0',borderTop:i===0?'none':'1px solid var(--border-subtle)'}}><div style={{width:46,height:46,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--brand-100)',color:'var(--brand-600)',flexShrink:0}}><Icon name={x[2]} size={20}/></div><div><h3 style={{font:'var(--text-heading-s)',margin:0}}>{x[0]}</h3><p style={{font:'var(--text-body-m)',margin:'8px 0 0'}}>{x[1]}</p></div></div>)}</div></div></Shell>; }

function SystemMap(){ const {lang}=window.useApp(); const c=MAP_COPY[lang]; return <Shell tone="ink" grid pad="lg" id="system-map"><window.Glow x="50%" y="46%" size={880} opacity={.16}/><SectionHead center eyebrow={c.mapEyebrow} title={c.mapTitle} lede={c.mapLede}/><div className="reveal-up" style={{maxWidth:980,margin:'0 auto'}}><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16}}>{c.groups.map((g,i)=><React.Fragment key={g[0]}><div className="panel-dark" style={{padding:20}}><div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}><Icon name={g[2]} size={18} color="var(--brand-300)"/><strong style={{color:'var(--text-on-dark)'}}>{g[0]}</strong></div><div style={{font:'var(--text-mono-s)',fontSize:'.72rem',color:'var(--gray-400)'}}>{g[1]}</div>{g[0].toLowerCase().includes('quality')||g[0].toLowerCase().includes('kvalitets')?<div style={{marginTop:12,color:'#F0C878',font:'var(--text-mono-s)',fontSize:'.72rem'}}>{c.feedback}</div>:null}</div>{i<c.groups.length-1&&<div className="only-mobile" style={{textAlign:'center',color:'var(--brand-300)'}}>↓</div>}</React.Fragment>)}</div></div></Shell>; }

Object.assign(window,{ProblemSection,SystemMap});
