let totalslide = document.querySelectorAll('.slide--item').length;
let currentSlide = 0;

// configurando a largura do slide
let btnmobile = document.getElementById('btn-menu');
let sliderWidth = document.querySelector('.slider--width').style.width = `calc(100vw * ${totalslide}`;

// ajustando a altura dos controles de slides - centralizar eles
document.querySelector('.slider-controls-colection').style.height = `${document.querySelector('.slides--colection').clientHeight}px`;


// Seletor
document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu nav ul li a');

    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Evita o comportamento padrão do link
            e.preventDefault();

            // Remove a classe 'active' de todos os itens
            document.querySelectorAll('.menu nav ul li').forEach(li => {
                li.classList.remove('active');
            });

            // Adiciona a classe 'active' ao <li> pai do <a> clicado
            this.parentNode.classList.add('active');
        });
    });
});
// gerador de indicadores de slides
let indicatorsContainer = document.querySelector('.slider-indicators');
for (let i = 0; i < totalslide; i++) {
    let indicator = document.createElement('span');
    indicator.classList.add('indicator');
    if (i == 0) indicator.classList.add('active');
    indicator.addEventListener('click', function () { goToSlide(i); });
    indicatorsContainer.appendChild(indicator);
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateMargin();
    updateIndicators();
}

function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}


// navegação entre slides
function goPrev() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = totalslide - 1;
    }
    updateMargin();
    updateIndicators();
}

function goNext() {
    currentSlide++;
    if (currentSlide > (totalslide - 1)) {
        currentSlide = 0;
    }
    updateMargin();
    updateIndicators();
}
// atualizando a margem para mostrar o slide atual
function updateMargin() {
    let sliderItemWidth = document.querySelector('.slide--item').clientWidth;
    let newMargin = (currentSlide * sliderItemWidth);
    document.querySelector('.slider--width').style.marginLeft = `-${newMargin}px`;
}
 // Define o intervalo de troca de slide
setInterval(goNext, 5000);

// slideshow das fotos do meio do site
document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.slider--colection');
    const slidesColetion = document.querySelectorAll('.slide--colection');

    let currentIndex = 0;

    // Calcula a largura total dos slides
    const slideWidth = slidesColetion.length * 260; // 260 é o tamanho de cada slide
    // Define a largura máxima do slider container
    sliderContainer.style.maxWidth = `${slideWidth}px`;
    // Defina a posição inicial do slider
    updateSlidePosition();
    window.prevSlide = function () {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slidesColetion.length - 4;
        }
        updateSlidePosition();
    }

    window.nextSlide = function () {
        currentIndex++;
        if (currentIndex > slidesColetion.length - 4) {
            currentIndex = 0;
        }
        updateSlidePosition();
    }
    function updateSlidePosition() {
        sliderContainer.style.transform = `translateX(-${currentIndex * 260}px)`;
    }
    // Altera a largura máxima do contêiner do slider se a janela for redimensionada
    window.addEventListener('resize', function () {
        const slideWidth = slidesColetion.length * 260;
        sliderContainer.style.maxWidth = `${slideWidth}px`;
    });

    

    // Define o intervalo de troca de slides
    setInterval(nextSlide, 5000);
});

    function openMenu(event) {
        // esse if previne que o touchstart feche o menu 
        if (event.type === 'touchstart') event.preventDefault();
        const nav  = document.querySelector('#nav');
        nav.classList.toggle('actived');
    }
btnmobile.addEventListener('click', openMenu);
// o touchstart previne que o menu demore para abrir
btnmobile.addEventListener('touchstart', openMenu);

window.addEventListener('load', () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false})});