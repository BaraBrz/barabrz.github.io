/* LIGHT / DARK MODE - safe to load multiple times */
(function () {
    if (window.__lightDarkThemeInitialized) return;
    window.__lightDarkThemeInitialized = true;

    const savedTheme = localStorage.getItem("theme");
    // select elements that should receive the transition class: regular pages (".bg")
    const bgr = document.querySelectorAll(".bg");

    // Track which elements originally had the `border` class so we only
    // restore it for those elements when returning to light mode.
    const ORIGINAL_BORDER_ATTR = 'data-original-border';
    function markOriginalBorders(root = document) {
        try {
            const nodes = (root.querySelectorAll && root.querySelectorAll('.border')) || [];
            nodes.forEach((el) => el.setAttribute(ORIGINAL_BORDER_ATTR, 'true'));
        } catch (e) {
            // if root isn't an Element supporting querySelectorAll, ignore
        }
    }

    function applyTheme() {
        const current = document.body.getAttribute("theme");
        const list = document.querySelectorAll(".exchangeable");
        if (current === "dark") {
            list.forEach((exchangeable) => {
                const alt = exchangeable.getAttribute("src-dark");
                if (alt) exchangeable.src = alt;
            });
            // remove `border` from elements that originally had it
            const bordered = document.querySelectorAll('[' + ORIGINAL_BORDER_ATTR + '="true"]');
            bordered.forEach((el) => el.classList.remove('border'));
        } else {
            list.forEach((exchangeable) => {
                const alt = exchangeable.getAttribute("src-light");
                if (alt) exchangeable.src = alt;
            });
            // restore `border` only to elements that originally had it
            const bordered = document.querySelectorAll('[' + ORIGINAL_BORDER_ATTR + '="true"]');
            bordered.forEach((el) => el.classList.add('border'));
        }
    }

    // mark original bordered elements from the initial DOM
    markOriginalBorders(document);

    if (savedTheme === "dark") {
        setDarkMode();
    }

    function handleThemeBtnClick(message) {
        console.log("Externí funkce dostala:", message);
        setTheme();
    }

    function setTheme() {
        const currentTheme = document.body.getAttribute("theme");

        if (currentTheme === "dark") {
            setLightMode();
        } else {
            setDarkMode();
        }
    }

    function setDarkMode() {
        document.body.setAttribute("theme", "dark");
        localStorage.setItem("theme", "dark");
        bgr.forEach((el) => el.classList.add("change"));
        applyTheme();
        setTimeout(() => {
            bgr.forEach((el) => el.classList.remove("change"));
        }, 500); // matches the 0.5s transition in CSS
    }

    function setLightMode() {
        document.body.removeAttribute("theme");
        localStorage.setItem("theme", "light");
        bgr.forEach((el) => el.classList.add("change"));
        applyTheme();
        setTimeout(() => {
            bgr.forEach((el) => el.classList.remove("change"));
        }, 500); // matches the 0.5s transition in CSS
    }

    // Watch for elements added after initial load (e.g. loaded via AJAX)
    const observer = new MutationObserver((mutations) => {
        let added = false;
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.nodeType !== 1) continue;
                // if new elements include exchangeable images or border class, mark/apply
                if (node.matches && (node.matches('.exchangeable') || node.matches('.border'))) {
                    // if the added node itself has a border, remember it as original
                    if (node.matches('.border')) node.setAttribute(ORIGINAL_BORDER_ATTR, 'true');
                    added = true; break;
                }
                if (node.querySelector) {
                    if (node.querySelector('.exchangeable') || node.querySelector('.border')) {
                        // mark any nested elements that have `border` as original
                        markOriginalBorders(node);
                        added = true; break;
                    }
                }
            }
            if (added) break;
        }
        if (added) applyTheme();
    });
    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

    // expose public API if other scripts need to call these
    window.setTheme = setTheme;
    window.handleThemeBtnClick = handleThemeBtnClick;
})();