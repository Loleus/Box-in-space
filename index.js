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
// octo();
const wrapper = document.querySelector('.sceneWrapper');
const near = document.querySelector('.cardsCube__card--near')
const button = document.querySelector('.button');

const unblock = () => {
  wrapper.addEventListener('mousemove', mouseMove, false);
  button.classList.add('button__active');
  button.textContent = "CLICK TO LOCK";
  button.parentElement.classList.remove('btn');
  near.classList.remove('active');
}

const block = () => {
  wrapper.removeEventListener('mousemove', mouseMove, false);
  button.classList.remove('button__active');
  button.textContent = "CLICK TO UNLOCK";
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
