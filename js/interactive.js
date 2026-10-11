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
    if (!sliderC || !sliderI || !sliderRemittance || !calcGdp) return;

    const c = parseFloat(sliderC.value) || 0;
    const i = parseFloat(sliderI.value) || 0;
    const r = parseFloat(sliderRemittance.value) || 0;

    if (valC) valC.textContent = (c > 0 ? '+' : '') + c + '%';
    if (valI) valI.textContent = (i > 0 ? '+' : '') + i + '%';
    if (valRemittance) valRemittance.textContent = (r > 0 ? '+' : '') + r + '%';

    const baseGrowth = (typeof ADB_DATA !== 'undefined' && ADB_DATA.philippines) 
      ? ADB_DATA.philippines.gdpGrowth 
      : 6.0;

    const simulatedGrowth = (baseGrowth + (c * 0.5) + (i * 0.3) + (r * 0.2)).toFixed(1);
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
    
    const members = Math.max(1, parseInt(hhInput.value, 10) || 1);
    
    // Safely pull perCapitaGdpUsd (3800)
    const perCapitaUsd = (typeof ADB_DATA !== 'undefined' && ADB_DATA.philippines && ADB_DATA.philippines.perCapitaGdpUsd) 
      ? ADB_DATA.philippines.perCapitaGdpUsd 
      : 3800;

    const popTotal = (typeof ADB_DATA !== 'undefined' && ADB_DATA.philippines && ADB_DATA.philippines.population)
      ? ADB_DATA.philippines.population
      : 114;

    const laborTotal = (typeof ADB_DATA !== 'undefined' && ADB_DATA.philippines && ADB_DATA.philippines.laborForce)
      ? ADB_DATA.philippines.laborForce
      : 52.5;

    const totalShareUsd = members * perCapitaUsd;
    if (hhCapitaShare) {
      hhCapitaShare.textContent = `$${totalShareUsd.toLocaleString()} USD`;
    }

    const estimatedWorkers = (members * (laborTotal / popTotal)).toFixed(1);
    if (hhLaborShare) {
      hhLaborShare.textContent = `~${estimatedWorkers} active workers`;
    }
  }

  if (hhInput) {
    hhInput.addEventListener('input', updateHouseholdCalc);
    // Initial execution to make sure default value (4) calculates properly
    updateHouseholdCalc();
  }
});
