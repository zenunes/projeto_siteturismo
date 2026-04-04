document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("nav");
    const menuButton = document.getElementById("btn-menu");
    const menuLinks = document.querySelectorAll("#menu li a");
    const backToTopButton = document.getElementById("back-to-top");

    menuLinks.forEach((link) => {
        link.addEventListener("click", function () {
            const currentActive = document.querySelector("#menu li.active");
            if (currentActive) currentActive.classList.remove("active");
            this.parentElement.classList.add("active");

            // Fecha o menu no mobile ao navegar
            if (nav && nav.classList.contains("actived")) {
                nav.classList.remove("actived");
            }
        });
    });

    if (menuButton && nav) {
        const toggleMenu = function (event) {
            if (event.type === "touchstart") event.preventDefault();
            nav.classList.toggle("actived");
        };

        menuButton.addEventListener("click", toggleMenu);
        menuButton.addEventListener("touchstart", toggleMenu);
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
