// Vehicle Models Data & Dynamic Accordion Renderer
import { partsData } from './parts-data.js';

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modelModal');
  const modalContent = document.getElementById('modalPartsList');
  const modalTitle = document.getElementById('modalModelName');
  const closeModal = document.querySelector('.close-modal');

  // Close modal logic
  if (closeModal) {
    closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
  }
  window.addEventListener('click', (e) => {
    if (e.target === modal) { modal.style.display = 'none'; }
  });

  function openModelModal(modelName) {
    if (!modal) return;
    modalTitle.textContent = modelName;
    modalContent.innerHTML = '';

    // Search logic: 'partsData' has ~ thousands of items.
    // We match if the part's vehicle string contains the model name.
    // e.g. Model "Corolla" matches "Toyota Corolla, Coro 1NZ-121"
    const relevantParts = partsData.filter(p => {
      return p.vehicle.toLowerCase().includes(modelName.toLowerCase());
    });

    if (relevantParts.length === 0) {
      modalContent.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">No specific parts listed for this model. Please make an inquiry.</p>';
    } else {
      // Group by category
      const groups = {};
      relevantParts.forEach(p => {
        if (!groups[p.category]) groups[p.category] = [];
        groups[p.category].push(p);
      });

      for (const [cat, items] of Object.entries(groups)) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'part-category-group';

        const title = document.createElement('div');
        title.className = 'part-category-title';
        title.textContent = cat;
        groupDiv.appendChild(title);

        items.forEach(item => {
          const row = document.createElement('div');
          row.className = 'part-item';
          row.innerHTML = `
                    <div class="part-info">
                        <span class="part-number">${item.partNumber} <span class="part-brand">${item.brand}</span></span>
                        <span class="part-meta">${item.vehicle}</span>
                    </div>
                `;
          groupDiv.appendChild(row);
        });
        modalContent.appendChild(groupDiv);
      }
    }
    modal.style.display = 'block';
  }

  setTimeout(function () {
    const brands = [
      { name: "Toyota", count: 48, models: ["Allion", "Alphard", "Altezza", "Avanza", "Avensis", "Cami", "Camry", "Carina", "Celica", "Celsior", "CH-R", "Coaster", "Corolla", "Corona", "Corsa", "Cresta", "Crown", "Echo", "Estima", "Harrier", "HiAce", "Hilux", "Innova", "Kluger", "Land Cruiser", "LiteAce", "Mark II", "MR2", "Opa", "Passo", "Prado", "Premio", "Prius", "RAV4", "Regius", "Rush", "Sparky", "Starlet", "Supra", "Tercel", "Townace", "Toyoace", "Verossa", "Vios", "Vitz", "Windom", "Wish", "Yaris"] },
      { name: "Honda", count: 13, models: ["Accord", "Civic", "CR-V", "CR-Z", "Fit GP5", "Insight Hybrid ZE2 / ZE3", "Life JB3 / JB4", "Lift", "Odyssey / Avancier", "Odyssey RV6 / RV7 / RV8 / RV9", "Rover", "Stream RN3 / RN4", "Vezel"] },
      { name: "Nissan", count: 26, models: ["AD", "Almera", "Bluebird", "Caravan", "Cedric", "Cefiro", "Cima", "Civilian", "Hypermini", "Laurel", "Leaf", "March", "Murano", "Page", "Pathfinder", "Patrol", "Presea", "Primera", "Pulsar", "Rasheen", "Serena", "Silvia", "Skyline", "Sunny", "Venette", "X-Trail"] },
      { name: "Mitsubishi", count: 18, models: ["Canter", "Carisma", "Challenger", "Chariot", "Colt", "Cordia", "Delica L300", "Delica L400", "Eclipse", "Galant", "Lancer", "Legnum", "Pajero", "Pajero Mini", "Minica", "Minicab", "Mirage", "Montero"] },
      { name: "Daihatsu", count: 10, models: ["Charade G10 / G200", "Cuore L700S", "Hijet S100C", "Hijet S120V", "Hijet S200", "Leeza", "Mira L200", "Mira", "Sirion M300", "Terios"] },
      { name: "Suzuki", count: 13, models: ["Alto", "Baleno", "Carry", "Cervo", "Cultus", "Escudo", "Esteem", "Every", "Grand Vitara", "Liana", "Swift / Swift RS", "Vitara", "Wagon R"] },
      { name: "Mazda", count: 16, models: ["3 (2013-)", "6 (2012-)", "Atenza / Sedan", "Axela", "AZ-3", "Bongo (SGEW)", "Bongo Lion Face", "Brawny", "Capella", "Capella / Telstar", "CX-3 / CX-5", "Demio DY3R / DY5R / DY5W", "Familia / Astina", "MR90", "Titan Truck", "Tribute"] },
      { name: "Hyundai", count: 3, models: ["Accent", "H100", "Santa Fe"] },
      { name: "Isuzu", count: 8, models: ["Begin VFR", "D-Max", "Elf 350 NKR / NPR / NHR", "Fargo", "Gemini JT600", "Gemini JT641", "Pickup KB211 / KB22", "Trooper"] },
      { name: "Subaru", count: 5, models: ["Impreza", "Legacy", "Leone", "Sambar", "Vivio"] },
      { name: "Kia", count: 1, models: ["Carens"] },
      { name: "Tata", count: 2, models: ["207", "Sumo"] },
      { name: "Perodua", count: 4, models: ["Axia", "Kelisa", "Kenari", "Viva Elite"] },
      { name: "Micro", count: 1, models: ["Panda"] },
      { name: "Land Rover", count: 1, models: ["110"] },
      { name: "Caterpillar", count: 1, models: ["910"] }
    ];

    const wrap = document.getElementById('accordionWrap');
    if (!wrap) return;

    brands.forEach(b => {
      const item = document.createElement('div');
      item.className = 'accordion-item animate-on-scroll';
      item.innerHTML = `
      <button class="accordion-header" aria-expanded="false">
        <span><i class="fas fa-car-side" style="margin-right:12px;color:var(--green);"></i><span class="brand-name">${b.name}</span> <span style="font-weight:400;font-size:0.85rem;color:rgba(255,255,255,0.6);margin-left:8px;">(${b.count} model${b.count > 1 ? 's' : ''})</span></span>
        <span class="arrow">▼</span>
      </button>
      <div class="accordion-body">
        <div class="accordion-body-inner">
        </div>
      </div>`;
      
      const bodyInner = item.querySelector('.accordion-body-inner');
      b.models.forEach(model => {
        const tag = document.createElement('span');
        tag.className = 'model-tag';
        tag.textContent = model;
        tag.addEventListener('click', (e) => {
            e.stopPropagation(); 
            openModelModal(model);
        });
        bodyInner.appendChild(tag);
      });

      wrap.appendChild(item);
    });

    // Re-bind accordion & scroll-animate for dynamically added elements
    const accordionHeaders = wrap.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const itm = header.parentElement;
        const body = itm.querySelector('.accordion-body');
        const isOpen = itm.classList.contains('open');
        wrap.querySelectorAll('.accordion-item.open').forEach(o => {
          if (o !== itm) { o.classList.remove('open'); o.querySelector('.accordion-body').style.maxHeight = '0'; }
        });
        if (isOpen) { itm.classList.remove('open'); body.style.maxHeight = '0'; }
        else { itm.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px'; }
      });
    });

    // Model Search Logic
    const modelSearch = document.getElementById('modelSearch');
    if (modelSearch) {
      modelSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const accordionItems = wrap.querySelectorAll('.accordion-item');
        let anyVisible = false;

        accordionItems.forEach(item => {
          const tags = item.querySelectorAll('.model-tag');
          const brandName = item.querySelector('.brand-name')?.textContent.toLowerCase() || '';
          let hasMatch = false;

          if (!query) {
            item.style.display = '';
            tags.forEach(t => t.style.display = '');
            item.classList.remove('open');
            item.querySelector('.accordion-body').style.maxHeight = '0';
            anyVisible = true;
            return;
          }

          if (brandName.includes(query)) {
            hasMatch = true;
            tags.forEach(t => t.style.display = '');
          } else {
            tags.forEach(tag => {
              const match = tag.textContent.toLowerCase().includes(query);
              tag.style.display = match ? '' : 'none';
              if (match) hasMatch = true;
            });
          }

          item.style.display = hasMatch ? '' : 'none';
          if (hasMatch) {
            item.classList.add('open');
            item.querySelector('.accordion-body').style.maxHeight = item.querySelector('.accordion-body').scrollHeight + 'px';
            anyVisible = true;
          } else {
            item.classList.remove('open');
            item.querySelector('.accordion-body').style.maxHeight = '0';
          }
        });

        let noResults = document.querySelector('.no-results');
        if (!anyVisible && query) {
          if (!noResults) {
            noResults = document.createElement('p');
            noResults.className = 'no-results text-center text-grey';
            noResults.style.padding = '30px';
            noResults.textContent = 'No models found matching your search.';
            wrap.appendChild(noResults);
          }
          noResults.style.display = '';
        } else if (noResults) {
          noResults.style.display = 'none';
        }
      });
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    wrap.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));
  }, 0);
});
