let totalslide = document.querySelectorAll('.slide--item').length;
let currentSlide = 0;

// configurando a largura do slide
let sliderWidth = document.querySelector('.slider--width').style.width = `calc(100vw * ${totalslide}`;

// ajustando a altura dos controles de slides - centralizar eles
document.querySelector('.slider-controls').style.height = `${document.querySelector('.sliders').clientHeight}px`;

document.querySelector('.slider-controls-colection').style.height = `${document.querySelector('.slides--colection').clientHeight}px`;

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




document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.slider--colection');
    const slidesColetion = document.querySelectorAll('.slide--colection');

    let currentIndex = 0;
    // window estão sendo definidos para garantir 
    // que estas funções estejam acessíveis globalmente, 
    // o que é necessário quando você usa onclick diretamente nos elementos HTML
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
    setInterval(nextSlide, 5000);
});

// configurando o avanço automatico dos slides
setInterval(goNext, 5000); 