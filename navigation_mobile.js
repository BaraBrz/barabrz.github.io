const menu = document.getElementById("Menuvpravo");
const menuiconBtn = document.querySelector(".menuicon");
const menuopeniconBtn = document.querySelector(".menuopenicon");

function openSidebar () {
    menu.classList.add("show");
    if (menuiconBtn) {
        menuiconBtn.style.setProperty("opacity", "0", "important");
        menuiconBtn.style.setProperty("pointer-events", "none", "important");
    }
    if (menuopeniconBtn) {
        menuopeniconBtn.style.setProperty("opacity", "1", "important");
        menuopeniconBtn.style.setProperty("pointer-events", "auto", "important");
    }
    console.log("Menu otevřeno");
}

function closeSidebar () {
    menu.classList.remove("show");
    if (menuopeniconBtn) {
        menuopeniconBtn.style.setProperty("opacity", "0", "important");
        menuopeniconBtn.style.setProperty("pointer-events", "none", "important");
    }
    if (menuiconBtn) {
        menuiconBtn.style.setProperty("opacity", "1", "important");
        menuiconBtn.style.setProperty("pointer-events", "auto", "important");
    }
    console.log("Menu zavřeno");
}