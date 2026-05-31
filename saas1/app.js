/* =========================
   DADOS
========================= */

let DATA = {};

/* =========================
   INIT
========================= */

async function init(){

    const res = await fetch('./data.json');
    DATA = await res.json();

    renderTabs();
    renderSections();
    updateClock();

    setInterval(updateClock, 1000);
}

init();

/* =========================
   RENDER TABS
========================= */

function renderTabs(){

    const tabs = document.getElementById("tabs");

    tabs.innerHTML = Object.keys(DATA).map((key, index) => {
        const active = index === 0 ? "active" : "";
        return `
            <button class="tab ${active}" onclick="show('${key}', this)">
                ${DATA[key].tab}
            </button>
        `;
    }).join("");
}

/* =========================
   RENDER SECTIONS
========================= */

function renderSections(){

    const container = document.getElementById("container");

    const keys = Object.keys(DATA);

    container.innerHTML = keys.map((key, index) => {

        const section = DATA[key];

        return `
        <div id="${key}" class="section ${index === 0 ? 'active' : ''}">

            ${section.categories.map(cat => `
                <h2 class="category-title" onclick="toggleCategory(this)">
                    ${cat.name}
                    <button class="toggle-btn">◀</button>
                </h2>

                <div class="category-content">
                    <div class="grid">
                        ${cat.items.map(item => `
                            <a class="card" href="${item.url}">
                                <img src="${item.icon}" alt="${item.name}">
                                <span>${item.name}</span>
                            </a>
                        `).join("")}
                    </div>
                </div>
            `).join("")}

        </div>
        `;

    }).join("");
}

/* =========================
   TOGGLE CATEGORIA
========================= */

function toggleCategory(el){

    const btn = el.querySelector(".toggle-btn");
    const content = el.nextElementSibling;

    const isOpen = content.classList.contains("open");

    if(isOpen){
        content.classList.remove("open");
        btn.textContent = "◀";
    } else {
        content.classList.add("open");
        btn.textContent = "▼";
    }
}

/* =========================
   TROCA DE ABAS
========================= */

function show(id, btn){

    document.querySelectorAll(".section")
        .forEach(s => s.classList.remove("active"));

    document.getElementById(id)
        .classList.add("active");

    document.querySelectorAll(".tab")
        .forEach(t => t.classList.remove("active"));

    btn.classList.add("active");
}

/* =========================
   CLOCK
========================= */

function updateClock(){

    const now = new Date();

    document.getElementById('clock').textContent =
        now.toLocaleTimeString('pt-BR',{
            hour:'2-digit',
            minute:'2-digit'
        });

    document.getElementById('date').textContent =
        now.toLocaleDateString('pt-BR',{
            weekday:'long',
            day:'2-digit',
            month:'long',
            year:'numeric'
        });
}
