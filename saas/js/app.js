async function init() {

    const data = await loadYAML();

    const app = document.getElementById("app");

    app.innerHTML = "";

    // tabs
    const tabs = document.createElement("div");
    tabs.className = "tabs";

    const content = document.createElement("div");

    data.tabs.forEach((tab, index) => {

        // botão tab
        const btn = document.createElement("button");
        btn.className = "tab" + (index === 0 ? " active" : "");
        btn.innerText = tab.title;

        btn.onclick = () => switchTab(tab.id);

        tabs.appendChild(btn);

        // conteúdo tab
        const tabContent = document.createElement("div");
        tabContent.className = "tab-content";
        tabContent.id = tab.id;

        if (index === 0) tabContent.classList.add("active");

        tab.sections.forEach(section => {

            const sectionEl = document.createElement("div");

            sectionEl.innerHTML = `
                <h3>${section.title}</h3>
                <div class="grid">
                    ${section.links.map(link => `
                        <a class="card" href="${link.url}" target="_blank">
                            <img src="https://www.google.com/s2/favicons?sz=128&domain=${link.icon}">
                            <span>${link.name}</span>
                        </a>
                    `).join("")}
                </div>
            `;

            tabContent.appendChild(sectionEl);
        });

        content.appendChild(tabContent);
    });

    app.appendChild(tabs);
    app.appendChild(content);
}

function switchTab(id) {

    document.querySelectorAll(".tab-content")
        .forEach(t => t.classList.remove("active"));

    document.getElementById(id)
        .classList.add("active");

    document.querySelectorAll(".tab")
        .forEach(t => t.classList.remove("active"));

    event.target.classList.add("active");
}

init();
