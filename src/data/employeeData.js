const departments = ['Engineering', 'Product', 'Design', 'Sales', 'Marketing', 'Finance', 'HR', 'Operations', 'Legal', 'Support']
const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Australia', 'Netherlands', 'Sweden', 'Singapore', 'Japan']
const statuses = ['Active', 'Active', 'Active', 'Active', 'On Leave', 'Departed']
const firstNames = ['Alex','Jordan','Morgan','Taylor','Casey','Riley','Drew','Quinn','Avery','Blake','Cameron','Dana','Elliot','Finley','Grey','Harper','Indigo','Jamie','Kendall','Lane','Mason','Nova','Oliver','Parker','Reed','Sage','Skylar','Tatum','Emery','River','Reese','Peyton','Marlowe','Lennon','Ellis','Devon','Darcy','Corey','Brooks','Aspen','Arden','Aiden','Sloane','Rowan','Remi','Phoenix','Logan','Lee','Kai','Hayden']
const lastNames = ['Anderson','Chen','Williams','Johnson','Brown','Davis','Garcia','Miller','Wilson','Moore','Taylor','Martin','Jackson','Lee','Thompson','White','Harris','Clark','Lewis','Hall','Young','Allen','Wright','King','Hill','Scott','Torres','Nguyen','Mitchell','Reed','Carter','Roberts','Phillips','Evans','Turner','Campbell','Parker','Collins','Edwards','Stewart','Sanchez','Morris','Rogers','Reed','Cook','Morgan','Bell','Bailey','Cooper','Howard']

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

export function generateEmployees(count = 500) {
  const rng = seededRandom(42)
  const rand = () => rng()
  const pick = (arr) => arr[Math.floor(rand() * arr.length)]
  const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min

  const startBase = new Date('2015-01-01').getTime()
  const startEnd = new Date('2024-12-31').getTime()

  return Array.from({ length: count }, (_, i) => {
    const dept = pick(departments)
    const salaryBase = {
      Engineering: 95000, Product: 105000, Design: 85000,
      Sales: 75000, Marketing: 80000, Finance: 90000,
      HR: 70000, Operations: 72000, Legal: 110000, Support: 60000,
    }[dept]

    const startTs = startBase + rand() * (startEnd - startBase)
    const startDate = new Date(startTs)
    const formattedDate = startDate.toISOString().split('T')[0]

    return {
      id: i + 1,
      name: `${pick(firstNames)} ${pick(lastNames)}`,
      department: dept,
      country: pick(countries),
      salary: salaryBase + randInt(-20000, 30000),
      startDate: formattedDate,
      performance: randInt(42, 100),
      status: pick(statuses),
    }
  })
}
