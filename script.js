

//smooth scrolling
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//removing right click
window.addEventListener('contextmenu',(e) =>{
	e.preventDefault();
	console.log("right clicked");
});

//cursor design
var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor-scale'),
    mouseX = 0,
    mouseY = 0

gsap.to({}, 0.016, {
    repeat: -1,

    onRepeat: function () {
        gsap.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        })
    }
});

window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY
});


//text-animation to big btext
gsap.to(".text p", {
    backgroundPositionX: "0%",
    stagger: 1,
    duration: 5,
    scrollTrigger: {
      trigger: ".text p",
      scrub: 1,
      start: "top center",
      end: "bottom top",
    },
  });


//projects
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const links = [...document.querySelectorAll('li')];

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}



let imgIndex = 0;
// Load images into an array for reference
const images = [
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg'
]

let imgArr = [];

// Canvas mousemove varaibles

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener('mousemove', (e)=> {
    targetX = e.clientX;
    targetY = e.clientY;
    
})

images.forEach((image, idx) => {
    let elImage = new Image(300);
    elImage.src = image;
    elImage.classList.add('project-image');
    document.body.append(elImage);
    imgArr.push(elImage)
})

// Draw images to the canvas

let percent = 0;
let target = 0;

function drawImage(idx){
    let {width, height} = imgArr[idx].getBoundingClientRect();

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // pixelate by diabling the smoothing
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    if(target === 1){ // Link has been hovered
        // 2 speeds to make the effect more gradual
        if(percent < 0.2){
            percent += .01;
        }else if(percent < 1){
            percent += .1;
        }
    }else if(target === 0){
        if(percent > 0.2){
            percent -= .3
        }else if( percent > 0){
            percent -= .01;
        }
    }

    let scaledWidth = width * percent;
    let scaledHeight = height * percent;

    if(percent >= 1){
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.drawImage(imgArr[idx], 0, 0, width, height);
    }else{
        ctx.drawImage(imgArr[idx], 0, 0, scaledWidth, scaledHeight);
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        if(canvas.width !== 0 && canvas.height !== 0){
            ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height)
        }
    }
}

for(let i = 0; i < links.length; i++){
    links[i].addEventListener('mouseover', () => {
        for(let j = 0; j < links.length; j++){
            if(j !== i){
                links[j].style.opacity = 0.2;
                links[j].style.zIndex = 0;
            }else{
                links[j].style.opacity = 1;
                links[j].style.zIndex = 3;
            }
        }
    })

    links[i].addEventListener('mouseleave', () => {
        for(let i = 0; i < links.length; i++){
            links[i].style.opacity = 1;
        }
    })

    links[i].addEventListener('mouseenter', () => {
        imgIndex = i;
        target = 1
    });

    links[i].addEventListener('mouseleave', () => {
        target = 0;
    })
}

function animate(){
    currentX = lerp(currentX, targetX, 0.075);
    currentY = lerp(currentY, targetY, 0.075);
    let { width, height} = imgArr[imgIndex].getBoundingClientRect();
    canvas.style.transform = `translate3d(${currentX - (width / 2)}px, ${currentY - (height / 2)}px, 0)`;
    drawImage(imgIndex);
    window.requestAnimationFrame(animate);
}

animate()



//animation for text
gsap.from(".name h1, .email-me-animation, .position-1 p, .position-2", 1, {
    delay: 0,
    y: '100%',
    ease: "power4.inOut",
    stagger:{
      amount: 0.3,
    },
  });

gsap.from(".line-1", 2.5, {
    scrollTrigger: {
      trigger: ".home",
      scrub: false,
      pin: false,
      start: "top center",
      end: "+=100%",
    },
    scaleX: 0, 
    transformOrigin: "left center", 
    ease: "none"
  });

  gsap.from(".line-2", 2.5, {
    scrollTrigger: {
      trigger: ".experience",
      scrub: false,
      pin: false,
      start: "top bottom",
      end: "+=100%",
    },
    scaleX: 0, 
    transformOrigin: "left center", 
    ease: "none"
  });

  gsap.from(".line-3", 2.5, {
    scrollTrigger: {
      trigger: ".projects-section",
      scrub: false,
      pin: false,
      start: "top bottom",
      end: "+=100%",
    },
    scaleX: 0, 
    transformOrigin: "left center", 
    ease: "none"
  });

  gsap.from(".upper-footer, .personal-portfolio", 0.5, {
    scrollTrigger: {
      trigger: ".footer",
      scrub: false,
      pin: false,
      start: "center bottom",
      end: "+=100%",
    },
    stagger:{
      amount: 0.5,
    },
    y: '100%',
    ease: "power4.inOut",
  });

  gsap.from(".lower-footer, .email-footer", 0.5, {
    scrollTrigger: {
      trigger: ".footer",
      scrub: false,
      pin: false,
      start: "center bottom",
      end: "+=100%",
    },
    stagger:{
      amount: 0.5,
    },
    y: '100%',
    ease: "power4.inOut",
  });
