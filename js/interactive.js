/* js/interactive.js */
function switchGDPAnalogy(type) {
    const container = document.getElementById('analogy-container');
    const familyBtn = document.getElementById('btn-analogy-family');
    const nationBtn = document.getElementById('btn-analogy-nation');

    if (!container || !familyBtn || !nationBtn) return;

    if (type === 'family') {
        familyBtn.className = 'flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-bold transition shadow-sm bg-white text-phBlue';
        nationBtn.className = 'flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 transition';
    } else {
        nationBtn.className = 'flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-bold transition shadow-sm bg-white text-phBlue';
        familyBtn.className = 'flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 transition';
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
