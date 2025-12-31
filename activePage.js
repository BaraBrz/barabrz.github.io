const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").forEach(link => {
    if(link.href.includes(`${activePage}`) & activePage != "/"){
        console.log(`${activePage}`);
        link.classList.add("active", "disabled");
        makeFloatingNavBar();
    }
})

function makeFloatingNavBar() {
    const navBar = document.getElementById("Navbar");
    navBar.classList.add("fl");
}    
