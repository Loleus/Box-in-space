class Scene {

  constructor() {
    this.cube = document.querySelector('.cardsCube');
    this.bottom = document.body.querySelector('.lines__bottom');
    this.back = document.body.querySelector('.lines__back');
    this.top = document.body.querySelector('.lines__top');
    this.posZ, this.posX, this.posY, this.rotX, this.rotY = 0;
    this.deep = 600;
  }

  getWallPos() {
    return `translateX(${-this.posX * .5}px)`;
  }

  getPersp() {
    return `perspective(${this.deep}px)`;
  }

  getCubePos() {
    return `translate(${this.posX}px, ${this.posY}px) ${this.getPersp()} translateZ(${this.posZ}px) rotateY(${this.rotY}deg) rotateX(${this.rotX}deg)`;
  }

  getBgcPos(el) {
    if (el == 'back') {
      return `translateZ(-50vh)`;
    } else if (el == 'top') {
      return `rotateX(90deg) translateZ(50vh)`;
    } else if (el == 'bottom') {
      return `rotateX(-90deg) translateZ(50vh)`;
    } else return
  }

  listenMove(e) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const posX = e.clientX - centerX;
    const posY = e.clientY - centerY;
    this.posX = posX;
    this.posY = posY;
    this.rotX = posY * -(360 / centerY);
    this.rotY = posX * (360 / centerX);
    this.posZ = posY * (this.deep / centerY);
    this.posZ = Math.min(Math.max(-(this.deep), this.posZ), this.deep / 2);
    this.update();
  }

  update() {
    this.cube.style.transform = this.getCubePos();
    this.bottom.style.transform = `${this.getPersp()} ${this.getBgcPos('bottom')} ${this.getWallPos()}`;
    this.top.style.transform = `${this.getPersp()} ${this.getBgcPos('top')} ${this.getWallPos()}`;
    this.back.style.transform = `${this.getPersp()} ${this.getBgcPos('back')} ${this.getWallPos()}`;
  }

}

const scene = new Scene();

starfield();
octo();
const wrapper = document.querySelector('.sceneWrapper');
const near = document.querySelector('.cardsCube__card--near')
const button = document.querySelector('.button');

const unblock = () => {
  wrapper.addEventListener('mousemove', mouseMove, false);
  button.classList.add('button__active');
  button.textContent = "click to lock";
  button.parentElement.classList.remove('btn');
  near.classList.remove('active');
}

const block = () => {
  wrapper.removeEventListener('mousemove', mouseMove, false);
  button.classList.remove('button__active');
  button.textContent = "click to unlock";
  button.parentElement.classList.add('btn');
  near.classList.add('active');
}

function mouseMove(e) {
  scene.listenMove(e);
};

document.addEventListener("DOMContentLoaded", function () {

  let lock = true;

  button.onclick = () => {

    lock ? unblock() : block();

    lock = !lock;

  };

});

function starfield() {
  // Set up canvas with full screen width and height
  var canvas = document.getElementById('starfield');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var ctx = canvas.getContext('2d');
  // Set the number of stars to draw
  var stars = [];
  var numStars = 100;
  var speed = 10;
  // Reset a star
  function makeStar() {
    return {
      x: Math.random(),
      y: Math.random(),
      distance: Math.sqrt(Math.random()),
      color: 'hsl(' + Math.random() * 40 + ',100%,' + (70 + Math.random() * 30) + '%)'
    };
  }
  // Initialise stars
  for (let i = 0; i < numStars; i++) {
    stars[i] = makeStar();
  }
  // Draw stars
  function updateStars() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw each star
    for (let i = 0; i < numStars; i++) {

      // Move the star first
      stars[i].x -= Math.pow(stars[i].distance, 2) / canvas.width * speed;

      // If it's off-screen, reset it
      if (stars[i].x <= 0) {
        stars[i] = makeStar();
        stars[i].x = 1;
      }

      // Draw the star
      ctx.beginPath();
      ctx.arc(stars[i].x * canvas.width, stars[i].y * canvas.height, stars[i].distance * 2.3, 0, 2 * Math.PI, false);
      ctx.lineWidth = stars[i].distance * 4;
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.stroke();
      ctx.fillStyle = stars[i].color;
      ctx.fill();
    }
  }
  const animate = () => {
    requestAnimationFrame(animate)
    updateStars()
  }
  animate()
};

function octo() {
  var c = document.querySelector('.octo') /* the canvas element */, 
    
    ctx = c.getContext('2d') /* canvas context */, 
    w /* canvas height */, h /* canvas height */, 
    
    t = 0, 
        
    max = Math.max, 
    pow = Math.pow, sqrt = Math.sqrt, 
    PI = Math.PI, 
    sin = Math.sin, cos = Math.cos /* just me being lazy */,

    /* spiral vars */
    /* https://twitter.com/jackrugile/status/420459385505079296 */
    n = 32 /* shades */, 
    m = 4 /* shade repetitions */, 
    p = 20   /* dots on each branch */, 
    r,
    beta /* branch specific */, gamma /* dot specific */, 
    x0, y0, x1, y1, 
    hue,  
    t_step = 1/30, 
    requestID;

/* FUNCTIONS */
var trimUnit = function(input_str, unit) {
  return parseInt(input_str.split(unit)[0], 10);
};

var spiral = function() {  
  ctx.clearRect(0, 0, w, h);
    
  for(var i = 0; i < n*m; i++) {
    beta = i*2*PI/(n*m);
    x0 = 0;
    
    /* Begin the path up here */
    ctx.beginPath();
    hue = i*360/n;
    ctx.translate(w/2, h/2);
    ctx.rotate(t/3);
    /* only need to set the fillstyle once up here now */
    ctx.fillStyle = 'hsl(' + hue + ', 100%, 65%)';
        
    for(var j = 0; j < p; j++) {      
      gamma = j*2*PI/p;
      r = max(1, pow(2*(j*(p - j)), .43) - 10);
      
      x0 += 3.1*r;
      y0 = x0*sin(gamma + 2*t + x0/99)/2;
      
      /* change of coordinates */
      x1 = x0*cos(beta) - y0*sin(beta);
      y1 = x0*sin(beta) + y0*cos(beta);
      
      /* move it to the position of the arc */ 
      /* (remove this for a cool effect) */
      ctx.moveTo(x1,y1);
      /* setup the arc path here */
      ctx.arc(x1, y1, r, 0, 2*PI);
    }
    
    /* close the 1 path that now is a combination of all the arcs */
    ctx.closePath();
    /* fill the whole path only once now */
    ctx.fill();
    /* 
     * reason for moving the fill out of the inner loop:
     * see https://twitter.com/loktar00/status/420369245378076672
     * (thanks!)
     */
    ctx.rotate(-t/3);
    ctx.translate(-w/2, -h/2);
  }
  
  t += t_step;
  
  requestID = requestAnimationFrame(spiral)
};

var initCanvas = function() {
  var s /* canvas style set via CSS */ ;
  
  setTimeout(function() {
    s = getComputedStyle(c);
    w = c.width = trimUnit(s.width, 'px');
    h = c.height = trimUnit(s.height, 'px');
    
    /* if resizing, make sure to stop the previous animation 
     * before starting a new one */
    /* cancelAnimationFrame(requestID) should be 
     * the requestID returned by requestAnimationFrame 
     * thanks @FWeinb! */
    if(requestID) {
      cancelAnimationFrame(requestID);
    }
    spiral();
  }, 0);
};

/* STEPS */
initCanvas();

/* fix looks on resize */
addEventListener('resize', initCanvas, false);
}
