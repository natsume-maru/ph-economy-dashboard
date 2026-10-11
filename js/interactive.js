/* js/interactive.js */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. GDP Simulator Logic ---
  const sliderC = document.getElementById('sliderC');
  const sliderI = document.getElementById('sliderI');
  const sliderRemittance = document.getElementById('sliderRemittance');

  const valC = document.getElementById('valC');
  const valI = document.getElementById('valI');
  const valRemittance = document.getElementById('valRemittance');
  const calcGdp = document.getElementById('calcGdp');

  function updateSimulator() {
    if (!sliderC || !sliderI || !sliderRemittance) return;

    const c = parseFloat(sliderC.value);
    const i = parseFloat(sliderI.value);
    const r = parseFloat(sliderRemittance.value);

    valC.textContent = (c > 0 ? '+' : '') + c + '%';
    valI.textContent = (i > 0 ? '+' : '') + i + '%';
    valRemittance.textContent = (r > 0 ? '+' : '') + r + '%';

    // Baseline ADB forecast (6.0%) adjusted by weighted inputs
    const simulatedGrowth = (ADB_DATA.philippines.gdpGrowth + (c * 0.5) + (i * 0.3) + (r * 0.2)).toFixed(1);
    calcGdp.textContent = simulatedGrowth + '%';
  }

  if (sliderC && sliderI && sliderRemittance) {
    sliderC.addEventListener('input', updateSimulator);
    sliderI.addEventListener('input', updateSimulator);
    sliderRemittance.addEventListener('input', updateSimulator);
    updateSimulator();
  }

  // --- 2. Household Calculator Logic ---
  const hhInput = document.getElementById('hhMembers');
  const hhCapitaShare = document.getElementById('hhCapitaShare');
  const hhLaborShare = document.getElementById('hhLaborShare');

  function updateHouseholdCalc() {
    if (!hhInput) return;
    const members = Math.max(1, parseInt(hhInput.value) || 1);
    
    // Per Capita GDP total for household
    const totalShareUsd = members * ADB_DATA.philippines.perCapitaUsd;
    hhCapitaShare.textContent = `$${totalShareUsd.toLocaleString()} USD`;

    // Statistically estimated labor force contributors for household size
    const estimatedWorkers = (members * (ADB_DATA.philippines.laborForce / ADB_DATA.philippines.population)).toFixed(1);
    hhLaborShare.textContent = `~${estimatedWorkers} active workers`;
  }

  if (hhInput) {
    hhInput.addEventListener('input', updateHouseholdCalc);
    updateHouseholdCalc();
  }
});
