const mainContainer = document.getElementById("main-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
let slideNum, slides, dots;
let interval = 6;

function initGallery() {
    slideNum = 0;
    slides = document.getElementsByClassName("slide-img");
    slides[slideNum].style.opacity = 1;

    dots = [];
    const dotsContainer = document.getElementById("dots-container");

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.setAttribute("onClick", "moveSlide("+i+")");
        dotsContainer.append(dot);
        dots.push(dot);
    }

    dots[slideNum].style.backgroundColor = "#7a7a7a";
}

initGallery();

function moveByOne(n) {
    moveSlide(slideNum + n)
}

btnPrev.addEventListener("click", () => {
    moveByOne(-1);
});

btnNext.addEventListener("click", () => {
    moveByOne(1);
});

function moveLeftCurrent(elem) {  
    let pos = 0;
    let id = setInterval(frame, interval);
    function frame() {
        if (pos == -100) {
            clearInterval(id);
        } else {
            pos--; 
            elem.style.left = pos + '%'; 
        }
    }
}

function moveLeftNext(elem) { 
    let pos = 100;
    let id = setInterval(frame, interval);
    function frame() {
        if (pos == 0) {
            clearInterval(id);
        } else {
            pos--; 
            elem.style.left = pos + '%'; 
            elem.style.opacity = 1;
        }
    }
}

function moveRightCurrent(elem) {  
    let pos = 0;
    let id = setInterval(frame, interval);
    function frame() {
        if (pos == 100) {
            clearInterval(id);
        } else {
            pos++; 
            elem.style.left = pos + '%'; 
      }
    }
}

function moveRightNext(elem) { 
    let pos = -100;
    let id = setInterval(frame, interval);
    function frame() {
        if (pos == 0) {
            clearInterval(id);
        } else {
            pos++; 
            elem.style.left = pos + '%'; 
            elem.style.opacity = 1;
        }
    }
}

function moveSlide(n) {
    let next = slides[n];
    let current = slides[slideNum];

    if (n > slideNum) {
        if (n >= slides.length) {
            n = 0;
            next = slides[0];
        }

        moveLeftNext(next);
        moveLeftCurrent(current);
    }
    else if (n < slideNum) {
        if (n < 0) {
            n = slides.length - 1;
            next = slides[slides.length-1]
        }

        moveRightNext(next);
        moveRightCurrent(current);
    }
    if (n !== slideNum) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].className = "slide-img";
            dots[i].style.backgroundColor = "#b0b0b0";
        }
        dots[n].style.backgroundColor = "#7a7a7a";
        slideNum = n;
    }
}

let timer = null;

function start() {
    timer = setInterval(() => moveByOne(1), 2500)
};

function pause() {
    clearInterval(timer)
};

mainContainer.addEventListener("mouseenter", pause);
mainContainer.addEventListener("mouseleave", start);

start();