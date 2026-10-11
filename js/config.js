/* js/config.js */

const ADB_DATA = {
  philippines: {
    gdpGrowth: 5.6,          
    perCapitaGdpUsd: 3800,   
    perCapitaPhp: 212000,
    inflationRate: 3.3,      
    unemploymentRate: 3.1,   
    underemploymentRate: 12.1,
    povertyRate: 15.5,
    debtToGdp: 60.2,
    ofwRemittancesUsd: 37.2, // Billions USD
    population: 114.5,       
    laborForce: 52.5,        
  },
  aseanPeers: {
    labels: ['Philippines', 'Vietnam', 'Indonesia', 'Thailand', 'Cambodia'],
    growthRates: [5.6, 5.8, 5.0, 2.5, 5.3],
    gdpCapita: [3800, 4300, 4900, 7200, 1900],
    inflation: [3.3, 3.5, 2.8, 1.2, 2.5]
  },
  historicalTrends: {
    years: ['2022', '2023', '2024', '2025', '2026 (Est.)'],
    gdpGrowth: [7.6, 5.6, 5.8, 5.6, 6.0],
    inflation: [5.8, 6.0, 3.5, 3.3, 3.1]
  },
  regions: [
    { name: 'National Capital Region (NCR)', share: '31.5%', driver: 'Services, IT-BPO, Finance' },
    { name: 'CALABARZON (Region IV-A)', share: '14.7%', driver: 'Manufacturing, Automotive, Tech' },
    { name: 'Central Luzon (Region III)', share: '11.2%', driver: 'Agriculture, Commerce, Logistics' },
    { name: 'Other Regions', share: '42.6%', driver: 'Agri-business, Tourism, Fisheries' }
  ]
};

const analogyData = {
    family: [
        { title: 'Family Income (Gross Output)', icon: 'fa-sack-dollar', color: 'text-emerald-600', text: 'Total money earned by all working family members in a year from jobs or business.' },
        { title: 'Household Spending (C)', icon: 'fa-basket-shopping', color: 'text-sky-600', text: 'Daily expenses on food, tuition, rent, electricity bills, and healthcare.' },
        { title: 'Savings & Investments (I)', icon: 'fa-piggy-bank', color: 'text-purple-600', text: 'Money put into buying a motor vehicle, house repairs, or starting a sari-sari store.' },
        { title: 'Net External Remittances', icon: 'fa-plane-departure', color: 'text-amber-600', text: 'Money sent home by family members working abroad minus goods bought abroad.' }
    ],
    nation: [
        { title: 'Gross Domestic Product (GDP)', icon: 'fa-chart-pie', color: 'text-phBlue', text: 'The total monetary value of all goods and services produced inside the Philippines in a year.' },
        { title: 'Personal Household Consumption', icon: 'fa-shop', color: 'text-sky-600', text: 'Spending by 115+ million Filipinos on food, clothes, transportation, and gadgets.' },
        { title: 'Capital Investments & Construction', icon: 'fa-building-user', color: 'text-purple-600', text: 'Private enterprise investments in factories, commercial towers, software, and machinery.' },
        { title: 'Net Exports & Overseas Remittances', icon: 'fa-ship', color: 'text-amber-600', text: 'Dollar revenues from exports and BPO/OFW remittances minus foreign imports.' }
    ]
};
