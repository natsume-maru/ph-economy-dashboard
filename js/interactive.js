/* js/interactive.js */
function switchGDPAnalogy(type) {
    const container = document.getElementById('analogy-container');
    const familyBtn = document.getElementById('btn-analogy-family');
    const nationBtn = document.getElementById('btn-analogy-nation');

    if (!container || !familyBtn || !nationBtn) return;

    if (type === 'family') {
        familyBtn.className = 'px-5 py-2 rounded-lg text-sm font-bold transition shadow-sm bg-white text-phBlue';
        nationBtn.className = 'px-5 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 transition';
    } else {
        nationBtn.className = 'px-5 py-2 rounded-lg text-sm font-bold transition shadow-sm bg-white text-phBlue';
        familyBtn.className = 'px-5 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 transition';
    }

    container.innerHTML = analogyData[type].map(item => `
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center ${item.color} text-lg font-bold mb-3">
                <i class="fa-solid ${item.icon}"></i>
            </div>
            <h4 class="font-bold text-slate-900 text-sm mb-1">${item.title}</h4>
            <p class="text-xs text-slate-500 leading-relaxed">${item.text}</p>
        </div>
    `).join('');
}

function calculateSimulatedGDP() {
    const consEl = document.getElementById('range-consumption');
    if (!consEl) return;
    const vCons = parseInt(consEl.value);
    const vServ = parseInt(document.getElementById('range-services').value);
    const vInfra = parseInt(document.getElementById('range-infra').value);
    const vAgri = parseInt(document.getElementById('range-agri').value);

    document.getElementById('val-consumption').innerText = `Level ${vCons} (+${(vCons * 1).toFixed(1)}%)`;
    document.getElementById('val-services').innerText = `Level ${vServ} (+${(vServ * 1).toFixed(1)}%)`;
    document.getElementById('val-infra').innerText = `Level ${vInfra} (+${(vInfra * 1).toFixed(1)}%)`;
    document.getElementById('val-agri').innerText = `Level ${vAgri} (+${(vAgri * 1).toFixed(1)}%)`;

    const simGDP = (vCons * 0.6) + (vServ * 0.2) + (vInfra * 0.1) + (vAgri * 0.1);
    const formattedGDP = simGDP.toFixed(1) + '%';

    document.getElementById('simulated-gdp-number').innerText = formattedGDP;

    const badge = document.getElementById('simulated-status-badge');
    const desc = document.getElementById('simulated-description');

    if (simGDP >= 6.5) {
        badge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
        badge.innerText = 'High Growth Trajectory';
        desc.innerText = 'At 6.5%+ growth, jobs expand quickly, government revenues increase for social programs, and business expansion reaches peak momentum.';
    } else if (simGDP >= 4.5) {
        badge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30';
        badge.innerText = 'Stable & Healthy Growth';
        desc.innerText = 'At around 5.0% - 6.0% growth, the economy remains resilient and stable, matching target ADB growth estimates for developing ASEAN peers.';
    } else {
        badge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30';
        badge.innerText = 'Slower Growth Pace';
        desc.innerText = 'Below 4.5% growth, job creation may slow down, and household purchasing power could feel pressure if inflation isn\'t kept low.';
    }
}

function highlightGDPFormula(code) {
    // Interactive feedback visual for formula selection
}

window.addEventListener('DOMContentLoaded', () => {
    switchGDPAnalogy('family');
    initASEANChart();
    calculateSimulatedGDP();
});
