/* js/config.js */

// Asian Development Bank (ADB) & PSA Data Configuration
const ADB_DATA = {
  philippines: {
    gdpGrowth: 6.0,          // ADB Forecast (% annual growth)
    perCapitaGdpUsd: 3800,   // Per Capita Income Baseline
    inflationRate: 3.3,      // Inflation Rate (%)
    unemploymentRate: 4.0,   // Unemployment Rate (%)
    population: 114,         // Total Population (Millions)
    laborForce: 52.5,        // Total Active Labor Force (Millions)
    participationRate: 64.8  // Labor Force Participation Rate (%)
  },
  aseanPeers: {
    labels: ['Philippines', 'Vietnam', 'Indonesia', 'Cambodia', 'Thailand'],
    growthRates: [6.0, 6.0, 5.0, 5.8, 2.6],
    perCapitaUsd: [3800, 4300, 4900, 1900, 7200]
  }
};
