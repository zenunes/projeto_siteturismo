document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("nav");
    const menuButton = document.getElementById("btn-menu");
    const menuLinks = document.querySelectorAll("#menu li a");
    const backToTopButton = document.getElementById("back-to-top");
    const overlay = document.getElementById("menu-overlay");

    function closeMenu() {
        if (nav && nav.classList.contains("actived")) {
            nav.classList.remove("actived");
        }
        if (overlay && overlay.classList.contains("active")) {
            overlay.classList.remove("active");
        }
    }

    menuLinks.forEach((link) => {
        link.addEventListener("click", function () {
            const currentActive = document.querySelector("#menu li.active");
            if (currentActive) currentActive.classList.remove("active");
            this.parentElement.classList.add("active");

            // Fecha o menu no mobile ao navegar
            closeMenu();
        });
    });

    if (menuButton && nav) {
        const toggleMenu = function (event) {
            if (event.type === "touchstart") event.preventDefault();
            nav.classList.toggle("actived");
            if (overlay) overlay.classList.toggle("active");
        };

        menuButton.addEventListener("click", toggleMenu);
        menuButton.addEventListener("touchstart", toggleMenu);
    }
    
    // Fecha o menu ao clicar fora dele (no overlay)
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    if (backToTopButton) {
        window.addEventListener("scroll", function () {
            backToTopButton.style.display = window.pageYOffset > 300 ? "flex" : "none";
        });

        backToTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }
});
