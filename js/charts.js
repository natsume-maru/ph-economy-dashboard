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
        const selectEl = document.getElementById('chart-metric-select');
        const metricKey = selectEl ? selectEl.value : 'growthRates';
        const dataValues = ADB_DATA.aseanPeers[metricKey];

        const labelsMap = {
            growthRates: 'GDP Growth Rate (%)',
            gdpCapita: 'GDP Per Capita (USD $)',
            inflation: 'Inflation Rate (%)'
        };

        const yAxisTitle = metricKey === 'gdpCapita' ? 'Amount in USD ($)' : 'Percentage Rate (%)';

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
            options: getChartOptions(yAxisTitle, metricKey === 'gdpCapita')
        });

        updateChartInsights(metricKey);
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
            options: getChartOptions('Percentage Rate (%)', false)
        });

        updateChartInsights('historical');
    }
}

function getChartOptions(yAxisTitle, formatK) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: currentMode === 'historical' },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const val = context.raw;
                        return formatK && val >= 1000 
                            ? ` ${context.dataset.label}: $${(val / 1000).toFixed(1)}k` 
                            : ` ${context.dataset.label}: ${val}${formatK ? ' USD $' : '%'}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                title: {
                    display: true,
                    text: yAxisTitle,
                    color: '#64748b',
                    font: { size: 11, weight: 'bold' }
                },
                ticks: {
                    callback: function(value) {
                        if (formatK && value >= 1000) {
                            return (value / 1000) + 'k';
                        }
                        return value;
                    }
                }
            },
            x: {
                grid: { display: false }
            }
        }
    };
}

function updateChartInsights(key) {
    const titleEl = document.getElementById('chart-insight-title');
    const bodyEl = document.getElementById('chart-insight-body');
    const badgeEl = document.getElementById('chart-insight-badge');

    if (!titleEl || !bodyEl || !badgeEl) return;

    if (key === 'gdpCapita') {
        badgeEl.innerText = 'Income Benchmark';
        titleEl.innerText = 'Per Capita Comparison';
        bodyEl.innerHTML = 'Thailand leads regional per capita income (~$7.2k USD), while the Philippines (~$3.8k USD) and Vietnam (~$4.3k USD) represent fast-growing mid-tier ASEAN consumer markets.';
    } else if (key === 'growthRates') {
        badgeEl.innerText = 'Regional Momentum';
        titleEl.innerText = 'GDP Growth Leadership';
        bodyEl.innerHTML = 'The Philippines (5.6%) and Vietnam (5.8%) maintain top-tier growth trajectories in Southeast Asia, driven by strong domestic consumption and services export expansion.';
    } else if (key === 'inflation') {
        badgeEl.innerText = 'Price Stability';
        titleEl.innerText = 'Consumer Price Control';
        bodyEl.innerHTML = 'At 3.3%, Philippine inflation sits safely within the Central Bank target range (2–4%), comparable to regional peers like Vietnam (3.5%) and Indonesia (2.8%).';
    } else if (key === 'historical') {
        badgeEl.innerText = '5-Year Trajectory';
        titleEl.innerText = 'Post-Pandemic Realignment';
        bodyEl.innerHTML = 'After sharp post-pandemic growth (7.6% in 2022), PH GDP growth stabilizes at ~5.6–6.0% through 2026 as inflation gradually cools down toward ~3.1%.';
    }
}

function updateModeButtons() {
    const peerBtn = document.getElementById('btn-mode-peer');
    const histBtn = document.getElementById('btn-mode-historical');
    const selectEl = document.getElementById('chart-metric-select');

    if (!peerBtn || !histBtn) return;

    if (currentMode === 'peer') {
        peerBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-phBlue text-white';
        histBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200';
        if (selectEl) selectEl.disabled = false;
    } else {
        histBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-phBlue text-white';
        peerBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200';
        if (selectEl) selectEl.disabled = true;
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
    if (currentMode === 'historical') return;
    currentChartType = type;
    initASEANChart();
}
