# Kita & Bayan — Philippine Economy & GDP Simplified

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Hosting](https://img.shields.io/badge/GitHub%20Pages-Live-emerald.svg)](https://pages.github.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.0-38bdf8.svg)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-v4.0-ff6384.svg)](https://www.chartjs.org/)

**Kita & Bayan** is a citizen-centric web dashboard built to make macroeconomic concepts—such as Gross Domestic Product (GDP), inflation, labor metrics, and regional growth—accessible and intuitive for every Filipino.

By combining source data from the **Asian Development Bank (ADB)** and the **Philippine Statistics Authority (PSA)** with interactive tools, everyday household analogies, and dynamic visual charts, this platform bridges the gap between complex economic data and daily financial reality.

---

## 🌟 Key Features

### 1. 💡 Conceptual Framework & Household Analogy Switcher
* **Dual-View Learning:** Toggle between a familiar **Family Household Budget** view and a **National Macro View** to grasp fundamental economic components (Gross Income, Spending/Consumption, Savings/Investment, and Remittances).
* **Expenditure Formula Breakdown:** Clickable interactive visual components explaining the standard macroeconomic formula:  
  $$\text{GDP} = C + I + G + (X - M)$$

### 2. 📊 Key Macroeconomic Pulse Check
Live indicator cards featuring standard national metrics paired with plain-English contextual explanations:
* **Real GDP Growth Rate:** ~5.6%
* **GDP Per Capita:** ~$3,800 USD / ₱212,000 PHP
* **Inflation Rate:** ~3.3% (within the BSP 2–4% target band)
* **Labor & Fiscal Context:** Unemployment (~3.1%), Underemployment (~12.1%), Debt-to-GDP Ratio (~60.2%), and National Poverty Rate (~15.5%).

### 3. 🌏 ASEAN Peers & Historical Trend Visualizer
* **Peer Comparisons:** Compare Philippine growth, per capita income, and inflation directly with regional neighbors (Vietnam, Indonesia, Thailand, Cambodia).
* **Formatted Visuals:** Clean y-axis labels (e.g., *Amount in USD ($)*) and shortened numerical scales ($1k, $2k, $7k$) for optimal mobile readability.
* **Side-by-Side Dynamic Insights:** Integrated analytical commentary right beside the chart canvas that dynamically updates when toggling metrics or switching to the **5-Year Historical Trajectory (2022–2026)** view.

### 4. 🧮 Interactive Economic Simulators & Calculators
* **GDP Growth Sector Simulator:** Adjust weighted sliders for Household Consumption, BPO/OFW Inflows, Public Infrastructure Spending, and Agriculture/Industry to observe projected GDP impacts.
* **Personal Inflation "Basket of Goods" Calculator:** Precision float-input textboxes that calculate estimated monthly price increases across food, utilities, and transportation based on weighted CPI inflation indexes.
* **Regional Economic Explorer:** Select Philippine regions (NCR, CALABARZON, Central Luzon, etc.) to view local GDP contribution shares and core industrial growth drivers.

---

## 📂 Project Architecture

The project is organized into a clean, modular file structure:

```text
kita-and-bayan/
├── index.html          # Main HTML structure, hero section, layout grid, and component wrappers
├── css/
│   └── styles.css      # Custom glassmorphism styles, gradient typography, and custom scrollbar rules
└── js/
    ├── config.js       # Core dataset definitions (ADB indicators, ASEAN peers, historical trends, regional data)
    ├── charts.js       # Chart.js initialization, mode toggling, "k" tick formatting, and dynamic side insights
    └── interactive.js  # Float-parsing calculator logic, GDP simulator calculations, and analogy view switchers
