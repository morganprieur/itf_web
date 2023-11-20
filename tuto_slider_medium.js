


/* === tuto Medium ==== */ 
var slider = document.getElementById('slider'), 
    wrapper = document.getElementsByClassName('wrapper')[0], 
    sliderItems = document.getElementById('slides'), 
    prev = document.getElementById('prev'), 
    next = document.getElementById('next'); 
slide(slider, sliderItems, prev, next); 

function slide(wraper, items, prev, next) { 
    var posX1 = 0, 
        posX2 = 0, 
        posInitial, 
        posFinal, 
        threshold = 100, // ? 
        slides = items.getElementsByClassName('slide'), 
        slidesLength = slides.length, 
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth, 
        firstSlide = slides[0], 
        lastSlide = slides[slidesLength - 1], 
        cloneFirst = firstSlide.cloneNode(true), 
        cloneLast = lastSlide.cloneNode(true), 
        index = 0, 
        allowShift = true; 
    
        items.appendChild(cloneFirst); 
        items.insertBefore(cloneLast, firstSlide); 
} 
wrapper.classList.add('loaded'); 
/* === /tuto Medium ==== */ 


