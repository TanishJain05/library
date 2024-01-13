const track=document.querySelector(".corousal-images");
const slides=Array.from(track.children);
const left_button=document.querySelector("#left");
const right_button=document.querySelector("#right");
const nav_dots=document.querySelector(".corousal_nav");
const dots=Array.from(nav_dots.children);

const slideSize= slides[0].getBoundingClientRect().width;

const setSlidePosition= (slide,index)=>{
    slide.style.left=slideSize * index + 'px';
}
slides.forEach(setSlidePosition);
let i=1;
const moveToNextSlide=()=>{
    if(i<=slides.length){
        const customEvent=new Event('click');
        right_button.dispatchEvent(customEvent);
        i++;
    }else{
        i=1;
        moveToSlide(track,slides[slides.length-1],slides[0],dots[dots.length-1],dots[0]);
        dot_appearance(0);
    }
    
    
}
window.setInterval(moveToNextSlide,5000);

const moveToSlide=(track,currentSlide,nextSlide,currentDot,targetDot)=>{
    track.style.transform='translateX(-'+nextSlide.style.left+')';
    currentSlide.classList.remove("current");
    nextSlide.classList.add("current");
    currentDot.classList.remove("current");
    targetDot.classList.add("current");
}
const dot_appearance=(targetIndex)=>{
    if(targetIndex===0){
        left_button.classList.add("is-hidden");
        right_button.classList.remove("is-hidden");
    }else if(targetIndex===dots.length-1){
        right_button.classList.add("is-hidden");
        left_button.classList.remove("is-hidden");
    }else{
        left_button.classList.remove("is-hidden");
        right_button.classList.remove("is-hidden");
    }
}

right_button.addEventListener('click',e=>{
    const currentSlide= track.querySelector(".current");
    const nextSlide=currentSlide.nextElementSibling;  
    const currentDot= document.querySelector(".nav_button.current");
    const nextDot= currentDot.nextElementSibling;  
    moveToSlide(track,currentSlide,nextSlide,currentDot,nextDot);
    const targetIndex=dots.findIndex(dot=> nextDot===dot);
    i=targetIndex;
    dot_appearance(targetIndex);
})
left_button.addEventListener('click',e=>{
    const currentSlide=track.querySelector(".current");
    const prevSlide=currentSlide.previousElementSibling;
    const currentDot= document.querySelector(".nav_button.current");
    const nextDot= currentDot.previousElementSibling;
    moveToSlide(track,currentSlide,prevSlide,currentDot,nextDot);
    const targetIndex=dots.findIndex(dot=> nextDot===dot);
    dot_appearance(targetIndex);
})

nav_dots.addEventListener('click',e=>{

    const nextSlide= e.target.closest('button');
    if(!nextSlide) return;
    const targetIndex=dots.findIndex(dot=> nextSlide===dot);
    
    const currentDot=nav_dots.querySelector(".current");
    const targetDot=dots[targetIndex];

    const currentSlide= track.querySelector('.current');
    const targetSlide= slides[targetIndex];

    moveToSlide(track,currentSlide,targetSlide,currentDot,targetDot); 
    dot_appearance(targetIndex);
})