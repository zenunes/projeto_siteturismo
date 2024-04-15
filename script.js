let totalslide = document.querySelectorAll('.slide--item').length;
let currentSlide = 0;

// configurando a largura do slide
let sliderWidth = document.querySelector('.slider--width').style.width = `calc(100vw * ${totalslide}`;

// ajustando a altura dos controles de slides - centralizar eles
document.querySelector('.slider-controls').style.height = `${document.querySelector('.sliders').clientHeight}px`;


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

// configurando o avanço automatico dos slides
setInterval(goNext, 5000);