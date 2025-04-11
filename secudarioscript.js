document.querySelectorAll('#menu li a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelector('#menu li.active')?.classList.remove('active');
        this.parentElement.classList.add('active');
    });
});