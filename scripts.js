let slideNum, slides, dots;

function initGallery() {
    slideNum = 0;
    slides = document.getElementsByClassName("slide-img");
    slides[slideNum].style.opacity = 1;

    dots = [];
    const dotsContainer = document.getElementById("dots-container");

    for (let i=0; i < slides.length; i++) {
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

function moveSlide(n) {
    let i, current, next;
    const moveSlideAnimClass = {
        forCurrent: "",
        forNext: ""
    }

    if (n>slideNum) {
        if (n>=slides.length) {
            n = 0;
        }
        moveSlideAnimClass.forCurrent = "move-left-current-slide";
        moveSlideAnimClass.forNext = "move-left-next-slide";
    }
    else if (n<slideNum) {
        if (n<0) {
            n = slides.length - 1;
        }
        moveSlideAnimClass.forCurrent = "move-right-current-slide";
        moveSlideAnimClass.forNext = "move-right-next-slide";
    }
    if (n !== slideNum) {
        next=slides[n];
        current=slides[slideNum];
        for (i=0; i<slides.length; i++) {
            slides[i].className = "slide-img";
            slides[i].style.opacity = 0;
            dots[i].style.backgroundColor = "#b0b0b0";
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        dots[n].style.backgroundColor = "#7a7a7a";
        slideNum = n;
    }
}

let timer = null;

function start() {
    timer = setInterval(() => moveByOne(1), 2000)
};

function pause() {
    clearInterval(timer)
}

start();