function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

const industries = ['Fintech', 'Analytics', 'HR SaaS', 'DevTools', 'E-commerce', 'CRM', 'BI / Reporting', 'ERP', 'Healthcare SaaS', 'EdTech', 'Cybersecurity', 'Marketing SaaS']
const stacks = ['React + MUI', 'React + custom', 'React only', 'React + Tailwind', 'Angular', 'Vue']
const grids = ['MUI X', 'AG Grid', 'Custom', 'Bryntum', 'Kendo', 'TanStack Table', 'None yet']
const statuses = ['Customer', 'Evaluating', 'Prospect', 'Churned', 'Disqualified']
const regions = ['NA', 'EU', 'APAC', 'LATAM']
const teamSizes = ['< 10 devs', '10–50 devs', '50–200 devs', '200–500 devs', '500+ devs']

const namedCompanies = [
  { company: 'Stripe', industry: 'Fintech', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Evaluating', arrPotential: 48000, region: 'NA', teamSize: '500+ devs', lastContact: '2025-04-14' },
  { company: 'Datadog', industry: 'Analytics', stack: 'React + custom', currentGrid: 'AG Grid', evalStatus: 'Customer', arrPotential: 24000, region: 'NA', teamSize: '500+ devs', lastContact: '2025-03-30' },
  { company: 'Personio', industry: 'HR SaaS', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 18000, region: 'EU', teamSize: '50–200 devs', lastContact: '2025-04-02' },
  { company: 'Linear', industry: 'DevTools', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Prospect', arrPotential: 9000, region: 'NA', teamSize: '10–50 devs', lastContact: '2025-04-18' },
  { company: 'Vercel', industry: 'DevTools', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Disqualified', arrPotential: 0, region: 'NA', teamSize: '50–200 devs', lastContact: '2025-02-10' },
  { company: 'Figma', industry: 'DevTools', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Disqualified', arrPotential: 0, region: 'NA', teamSize: '200–500 devs', lastContact: '2025-01-20' },
  { company: 'HubSpot', industry: 'CRM', stack: 'React only', currentGrid: 'AG Grid', evalStatus: 'Evaluating', arrPotential: 36000, region: 'NA', teamSize: '500+ devs', lastContact: '2025-04-22' },
  { company: 'Monday.com', industry: 'CRM', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Customer', arrPotential: 29700, region: 'EU', teamSize: '200–500 devs', lastContact: '2025-04-08' },
  { company: 'Zendesk', industry: 'CRM', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 21600, region: 'NA', teamSize: '500+ devs', lastContact: '2025-03-15' },
  { company: 'Intercom', industry: 'CRM', stack: 'React + Tailwind', currentGrid: 'TanStack Table', evalStatus: 'Prospect', arrPotential: 14400, region: 'EU', teamSize: '50–200 devs', lastContact: '2025-04-19' },
  { company: 'Atlassian', industry: 'DevTools', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Evaluating', arrPotential: 42000, region: 'APAC', teamSize: '500+ devs', lastContact: '2025-04-25' },
  { company: 'Shopify', industry: 'E-commerce', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Disqualified', arrPotential: 0, region: 'NA', teamSize: '500+ devs', lastContact: '2025-01-05' },
  { company: 'Aircall', industry: 'CRM', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 12000, region: 'EU', teamSize: '50–200 devs', lastContact: '2025-04-01' },
  { company: 'Qonto', industry: 'Fintech', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 17400, region: 'EU', teamSize: '50–200 devs', lastContact: '2025-03-28' },
  { company: 'Spendesk', industry: 'Fintech', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 11700, region: 'EU', teamSize: '10–50 devs', lastContact: '2025-04-10' },
  { company: 'Pennylane', industry: 'Fintech', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 9600, region: 'EU', teamSize: '10–50 devs', lastContact: '2025-04-05' },
  { company: 'Alan', industry: 'Healthcare SaaS', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 14400, region: 'EU', teamSize: '10–50 devs', lastContact: '2025-03-22' },
  { company: 'Gymlib', industry: 'HR SaaS', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 7200, region: 'EU', teamSize: '< 10 devs', lastContact: '2025-04-12' },
  { company: 'Brex', industry: 'Fintech', stack: 'React + custom', currentGrid: 'AG Grid', evalStatus: 'Evaluating', arrPotential: 28800, region: 'NA', teamSize: '200–500 devs', lastContact: '2025-04-20' },
  { company: 'Ramp', industry: 'Fintech', stack: 'React + custom', currentGrid: 'AG Grid', evalStatus: 'Prospect', arrPotential: 24000, region: 'NA', teamSize: '50–200 devs', lastContact: '2025-04-17' },
  { company: 'Notion', industry: 'DevTools', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Disqualified', arrPotential: 0, region: 'NA', teamSize: '50–200 devs', lastContact: '2025-02-28' },
  { company: 'Airtable', industry: 'BI / Reporting', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Disqualified', arrPotential: 0, region: 'NA', teamSize: '200–500 devs', lastContact: '2025-01-15' },
  { company: 'Retool', industry: 'DevTools', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 19200, region: 'NA', teamSize: '50–200 devs', lastContact: '2025-03-18' },
  { company: 'Metabase', industry: 'BI / Reporting', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Evaluating', arrPotential: 15600, region: 'NA', teamSize: '50–200 devs', lastContact: '2025-04-23' },
  { company: 'Tableau', industry: 'BI / Reporting', stack: 'React + custom', currentGrid: 'AG Grid', evalStatus: 'Customer', arrPotential: 36000, region: 'NA', teamSize: '500+ devs', lastContact: '2025-03-10' },
  { company: 'Looker', industry: 'BI / Reporting', stack: 'Angular', currentGrid: 'AG Grid', evalStatus: 'Churned', arrPotential: 0, region: 'NA', teamSize: '200–500 devs', lastContact: '2024-12-01' },
  { company: 'dbt Labs', industry: 'Analytics', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Prospect', arrPotential: 16800, region: 'NA', teamSize: '50–200 devs', lastContact: '2025-04-16' },
  { company: 'Amplitude', industry: 'Analytics', stack: 'React + custom', currentGrid: 'AG Grid', evalStatus: 'Customer', arrPotential: 21600, region: 'NA', teamSize: '200–500 devs', lastContact: '2025-03-25' },
  { company: 'Mixpanel', industry: 'Analytics', stack: 'React only', currentGrid: 'Custom', evalStatus: 'Evaluating', arrPotential: 18000, region: 'NA', teamSize: '50–200 devs', lastContact: '2025-04-11' },
  { company: 'Segment', industry: 'Analytics', stack: 'React + custom', currentGrid: 'TanStack Table', evalStatus: 'Prospect', arrPotential: 12000, region: 'NA', teamSize: '50–200 devs', lastContact: '2025-04-21' },
  { company: 'Workday', industry: 'ERP', stack: 'Angular', currentGrid: 'Kendo', evalStatus: 'Evaluating', arrPotential: 48000, region: 'NA', teamSize: '500+ devs', lastContact: '2025-04-09' },
  { company: 'SAP', industry: 'ERP', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Evaluating', arrPotential: 60000, region: 'EU', teamSize: '500+ devs', lastContact: '2025-04-24' },
  { company: 'Rippling', industry: 'HR SaaS', stack: 'React + custom', currentGrid: 'AG Grid', evalStatus: 'Evaluating', arrPotential: 32400, region: 'NA', teamSize: '200–500 devs', lastContact: '2025-04-15' },
  { company: 'Lattice', industry: 'HR SaaS', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 13200, region: 'NA', teamSize: '50–200 devs', lastContact: '2025-03-20' },
  { company: 'Leapsome', industry: 'HR SaaS', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 9000, region: 'EU', teamSize: '10–50 devs', lastContact: '2025-04-03' },
  { company: 'Factorial', industry: 'HR SaaS', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 8400, region: 'EU', teamSize: '10–50 devs', lastContact: '2025-03-31' },
  { company: 'Lucca', industry: 'HR SaaS', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 7800, region: 'EU', teamSize: '10–50 devs', lastContact: '2025-04-07' },
  { company: 'Contentful', industry: 'DevTools', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 16800, region: 'EU', teamSize: '50–200 devs', lastContact: '2025-03-14' },
  { company: 'Sanity', industry: 'DevTools', stack: 'React + custom', currentGrid: 'TanStack Table', evalStatus: 'Prospect', arrPotential: 8400, region: 'EU', teamSize: '10–50 devs', lastContact: '2025-04-26' },
  { company: 'Storyblok', industry: 'DevTools', stack: 'Vue', currentGrid: 'Custom', evalStatus: 'Disqualified', arrPotential: 0, region: 'EU', teamSize: '10–50 devs', lastContact: '2025-03-05' },
  { company: 'Klarna', industry: 'Fintech', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Evaluating', arrPotential: 42000, region: 'EU', teamSize: '500+ devs', lastContact: '2025-04-28' },
  { company: 'Adyen', industry: 'Fintech', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Prospect', arrPotential: 36000, region: 'EU', teamSize: '200–500 devs', lastContact: '2025-04-13' },
  { company: 'Wise', industry: 'Fintech', stack: 'React + custom', currentGrid: 'AG Grid', evalStatus: 'Customer', arrPotential: 19200, region: 'EU', teamSize: '200–500 devs', lastContact: '2025-03-08' },
  { company: 'Revolut', industry: 'Fintech', stack: 'React + custom', currentGrid: 'Custom', evalStatus: 'Evaluating', arrPotential: 48000, region: 'EU', teamSize: '500+ devs', lastContact: '2025-04-27' },
  { company: 'N26', industry: 'Fintech', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 16200, region: 'EU', teamSize: '50–200 devs', lastContact: '2025-03-26' },
  { company: 'Pretto', industry: 'Fintech', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 6600, region: 'EU', teamSize: '< 10 devs', lastContact: '2025-04-04' },
  { company: 'Swile', industry: 'HR SaaS', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 8400, region: 'EU', teamSize: '10–50 devs', lastContact: '2025-03-17' },
  { company: 'Payfit', industry: 'HR SaaS', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 12000, region: 'EU', teamSize: '10–50 devs', lastContact: '2025-03-29' },
  { company: 'Axonaut', industry: 'ERP', stack: 'React + MUI', currentGrid: 'MUI X', evalStatus: 'Customer', arrPotential: 5400, region: 'EU', teamSize: '< 10 devs', lastContact: '2025-04-06' },
]

const companyPrefixes = ['Nova', 'Apex', 'Flux', 'Arc', 'Orion', 'Echo', 'Helix', 'Vega', 'Prism', 'Nexus', 'Atlas', 'Cora', 'Zeta', 'Lyra', 'Orbit', 'Sigma', 'Kite', 'Forge', 'Basalt', 'Cedar', 'Drift', 'Eigen', 'Fable', 'Grove', 'Haven', 'Ionic', 'Jasper', 'Kinetic', 'Lumen', 'Marble']
const companySuffixes = ['HQ', 'AI', 'Labs', 'Works', 'Hub', 'Desk', 'Cloud', 'Base', 'Mind', 'Sync', 'Flow', 'Grid', 'Stack', 'Ops', 'Dash', 'Lens', 'Path', 'Core', 'Spot', 'Edge']

const months = ['2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03', '2025-04']

export function generateProspects() {
  const rand = seeded(99)
  const pick = (arr) => arr[Math.floor(rand() * arr.length)]
  const rows = [...namedCompanies]

  while (rows.length < 200) {
    const industry = pick(industries)
    const stack = pick(stacks)
    const currentGrid = pick(grids)
    const evalStatus = pick(statuses)
    const arrRaw = evalStatus === 'Customer'
      ? Math.round((rand() * 40000 + 6000) / 600) * 600
      : evalStatus === 'Evaluating'
      ? Math.round((rand() * 30000 + 5000) / 600) * 600
      : evalStatus === 'Prospect'
      ? Math.round((rand() * 20000 + 3000) / 600) * 600
      : 0
    const day = String(Math.floor(rand() * 28) + 1).padStart(2, '0')
    const month = pick(months)

    rows.push({
      company: `${pick(companyPrefixes)}${pick(companySuffixes)}`,
      industry,
      stack,
      currentGrid,
      evalStatus,
      arrPotential: arrRaw,
      region: pick(regions),
      teamSize: pick(teamSizes),
      lastContact: `${month}-${day}`,
    })
  }

  return rows.map((r, i) => ({ id: i + 1, ...r }))
}
