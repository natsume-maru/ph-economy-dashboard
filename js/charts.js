/* js/charts.js */
let currentChartInstance = null;
let currentChartType = 'bar';
let currentMode = 'peer'; // 'peer' or 'historical'

function initASEANChart() {
    const canvasEl = document.getElementById('aseanChart');
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    
    if (currentChartInstance) {
        currentChartInstance.destroy();
    }

    if (currentMode === 'peer') {
        const metricKey = document.getElementById('chart-metric-select').value;
        const dataValues = ADB_DATA.aseanPeers[metricKey];

        const labelsMap = {
            growthRates: 'GDP Growth Rate (%)',
            gdpCapita: 'GDP Per Capita (USD $)',
            inflation: 'Inflation Rate (%)'
        };

        currentChartInstance = new Chart(ctx, {
            type: currentChartType,
            data: {
                labels: ADB_DATA.aseanPeers.labels,
                datasets: [{
                    label: labelsMap[metricKey],
                    data: dataValues,
                    backgroundColor: [
                        '#0038A8', // PH
                        '#38bdf8',
                        '#a855f7',
                        '#f59e0b',
                        '#10b981'
                    ],
                    borderColor: '#0038A8',
                    borderWidth: currentChartType === 'line' ? 3 : 0,
                    borderRadius: 8,
                    tension: 0.3
                }]
            },
            options: getChartOptions(metricKey === 'gdpCapita' ? ' USD $' : '%')
        });
    } else {
        // Historical Trend Mode
        currentChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ADB_DATA.historicalTrends.years,
                datasets: [
                    {
                        label: 'GDP Growth (%)',
                        data: ADB_DATA.historicalTrends.gdpGrowth,
                        borderColor: '#0038A8',
                        backgroundColor: '#0038A8',
                        borderWidth: 3,
                        tension: 0.3,
                        fill: false
                    },
                    {
                        label: 'Inflation Rate (%)',
                        data: ADB_DATA.historicalTrends.inflation,
                        borderColor: '#CE1126',
                        backgroundColor: '#CE1126',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        tension: 0.3,
                        fill: false
                    }
                ]
            },
            options: getChartOptions('%')
        });
    }
}

function getChartOptions(unitSuffix) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: currentMode === 'historical' },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return ` ${context.dataset.label}: ${context.raw}${unitSuffix}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' }
            },
            x: {
                grid: { display: false }
            }
        }
    };
}

function updateModeButtons() {
    const peerBtn = document.getElementById('btn-mode-peer');
    const histBtn = document.getElementById('btn-mode-historical');

    if (!peerBtn || !histBtn) return;

    if (currentMode === 'peer') {
        peerBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-phBlue text-white';
        histBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200';
    } else {
        histBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-phBlue text-white';
        peerBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200';
    }
}

function updateASEANChart() {
    currentMode = 'peer';
    updateModeButtons();
    initASEANChart();
}

function showHistoricalTrend() {
    currentMode = 'historical';
    updateModeButtons();
    initASEANChart();
}

function setChartType(type) {
    if (currentMode === 'historical') return; // Historical forces line chart
    currentChartType = type;
    document.getElementById('btn-chart-bar').className = type === 'bar' 
        ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-phBlue text-white' 
        : 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200';
    document.getElementById('btn-chart-line').className = type === 'line' 
        ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-phBlue text-white' 
        : 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200';

    initASEANChart();
}
