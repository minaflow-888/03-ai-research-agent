// Content data for the AI Research Agent case study.
// Keep all editable copy here so section files stay focused on layout.

const PROBLEM_CARDS = [
  {
    icon: 'refresh-cw',
    title: 'Repeated manual research',
    description: 'Opening several pages, collecting details and writing an analysis, one company at a time.',
  },
  {
    icon: 'shuffle',
    title: 'Inconsistent structure',
    description: 'Notes and write-ups look different each time, which makes them harder to compare or review.',
  },
  {
    icon: 'file-question',
    title: 'Generic AI output',
    description: 'AI-generated text can sound convincing while staying too general to be useful.',
  },
];

const SOLUTION_FLOW = [
  'Company queued',
  'Website content collected',
  'Company analysis created',
  'Quality checked',
  'Approved or returned for improvement',
  'Final report generated',
];

const SCENARIOS = [
  {
    tag: 'Scenario 1',
    title: 'Company Analysis',
    description:
      'The first scenario finds a queued company, marks it as processing, retrieves selected website content and sends the relevant information to Groq. The generated analysis is then saved in Supabase.',
    flow: ['Queued company', 'Website content', 'AI analysis', 'Saved result'],
    highlight: false,
  },
  {
    tag: 'Scenario 2',
    title: 'Quality Check',
    description:
      'The second scenario reviews the generated analysis separately. It checks whether the output is specific and useful enough. The result is then marked as approved or needs improvement.',
    routes: [
      { label: 'Approved', tone: 'success', text: 'The analysis can continue to final reporting.' },
      { label: 'Needs improvement', tone: 'warning', text: 'Feedback is saved so the analysis can be strengthened.' },
    ],
    highlight: true,
  },
  {
    tag: 'Scenario 3',
    title: 'Final Master Report',
    description:
      'The third scenario finds an approved analysis and turns it into a final structured report. The result and its final status are saved in Supabase.',
    flow: ['Approved analysis', 'Master report', 'Final saved output'],
    highlight: false,
  },
];

const TOO_GENERIC = [
  'Repeats common company information',
  'Lacks company-specific strengths or challenges',
  'Sounds useful but gives little practical value',
];

const READY_TO_APPROVE = [
  'Uses relevant website information',
  'Gives more company-specific observations',
  'Follows the expected structure',
  'Is clear enough for the next step',
];

const TOOLS = [
  { label: 'Make.com', icon: 'workflow', color: '#7A2FF8', description: 'Connects and controls the three workflow scenarios.' },
  { label: 'Supabase', icon: 'database', color: '#3ECF8E', description: 'Stores company records, analysis, feedback, reports and workflow statuses.' },
  { label: 'HTTP', icon: 'globe', color: '#3B82C4', description: 'Retrieves selected content from the company website.' },
  { label: 'Groq', icon: 'cpu', color: '#F0662A', description: 'Generates the company analysis, checks its quality and creates the final report.' },
];

const WORKFLOW_STATES = [
  'queued',
  'processing',
  'analyzed',
  'quality_checking',
  'approved',
  'needs_improvement',
  'report_generating',
];

const LIMITATIONS = [
  'AI output can still contain weak or incorrect conclusions.',
  'Website content may be incomplete or difficult to retrieve.',
  'Quality control reduces weak output but does not replace human review.',
  'The current version is a portfolio demonstration rather than a production deployment.',
  'Production use would require stronger monitoring, security, source handling and error management.',
];

const NEXT_IMPROVEMENTS = [
  'Stronger company-specific research instructions',
  'Clearer source references',
  'Better retry and error handling',
  'Additional human review controls',
  'Testing with a broader range of company websites',
];

const HERO_STAGES = [
  { label: 'Research', detail: 'Website content collected and analysed' },
  { label: 'Quality check', detail: 'Approved or sent back for improvement' },
  { label: 'Final report', detail: 'Structured report saved to Supabase' },
];

window.CaseStudyContent = {
  HERO_STAGES,
  PROBLEM_CARDS,
  SOLUTION_FLOW,
  SCENARIOS,
  TOO_GENERIC,
  READY_TO_APPROVE,
  TOOLS,
  WORKFLOW_STATES,
  LIMITATIONS,
  NEXT_IMPROVEMENTS,
};
