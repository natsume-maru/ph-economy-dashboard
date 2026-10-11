/* js/charts.js */
let currentChartInstance = null;
let currentChartType = 'bar';

function initASEANChart() {
    const canvasEl = document.getElementById('aseanChart');
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    
    const metricKey = document.getElementById('chart-metric-select').value;
    const dataValues = aseanData[metricKey];

    currentChartInstance = new Chart(ctx, {
        type: currentChartType,
        data: {
            labels: aseanData.countries,
            datasets: [{
                label: 'GDP Growth Rate (%)',
                data: dataValues,
                backgroundColor: [
                    '#0038A8',
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
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const metricKey = document.getElementById('chart-metric-select').value;
                            const unit = metricKey === 'gdpCapita' ? ' USD $' : '%';
                            return ` ${context.dataset.label}: ${context.raw}${unit}`;
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
        }
    });
}

function updateASEANChart() {
    if (!currentChartInstance) return;
    const metricKey = document.getElementById('chart-metric-select').value;
    const labelsMap = {
        gdpGrowth: 'GDP Growth Rate (%)',
        gdpCapita: 'GDP Per Capita (USD $)',
        inflation: 'Inflation Rate (%)'
    };

    currentChartInstance.data.datasets[0].data = aseanData[metricKey];
    currentChartInstance.data.datasets[0].label = labelsMap[metricKey];
    currentChartInstance.update();
}

function setChartType(type) {
    currentChartType = type;
    document.getElementById('btn-chart-bar').className = type === 'bar' 
        ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-phBlue text-white' 
        : 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200';
    document.getElementById('btn-chart-line').className = type === 'line' 
        ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-phBlue text-white' 
        : 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200';

    if (currentChartInstance) {
        currentChartInstance.destroy();
    }
    initASEANChart();
}
