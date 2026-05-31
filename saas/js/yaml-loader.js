async function loadYAML() {

    const res = await fetch("./config/dashboard.yml");

    const text = await res.text();

    return jsyaml.load(text);
}
