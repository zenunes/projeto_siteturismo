document.querySelectorAll('#menu li a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelector('#menu li.active')?.classList.remove('active');
        this.parentElement.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');

    // Mostra/esconde botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Ação de rolagem suave ao clicar
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});