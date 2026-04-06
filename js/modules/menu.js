export function initMenu() {
    const nav = document.getElementById("nav");
    const menuButton = document.getElementById("btn-menu");
    const menuLinks = document.querySelectorAll("#menu li a");
    const overlay = document.getElementById("menu-overlay");

    function closeMenu() {
        if (nav && nav.classList.contains("active-menu")) nav.classList.remove("active-menu");
        if (overlay && overlay.classList.contains("active")) overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }

    menuLinks.forEach((link) => {
        link.addEventListener("click", function () {
            const currentActive = document.querySelector("#menu li.active");
            if (currentActive) currentActive.classList.remove("active");
            this.parentElement.classList.add("active");
            closeMenu();
        });
    });

    if (menuButton && nav) {
        const toggleMenu = function (event) {
            if (event && event.type === "touchstart") event.preventDefault();
            nav.classList.toggle("active-menu");
            if (overlay) overlay.classList.toggle("active");
            document.body.classList.toggle("no-scroll");
        };
        menuButton.addEventListener("click", toggleMenu);
        menuButton.addEventListener("touchstart", toggleMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
}
