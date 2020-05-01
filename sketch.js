let dots = [];
let n = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let x = 0; x < n; x++) {
    dots.push(new Dot(random(width), random(height), random(1, 3), random(0, 360)));
  }
}

function draw() {
  background(255);
  for (let dot of dots) {
    dot.draw();
    dot.move();
    if (dot.x > width || dot.x < 0 || dot.y > height || dot.y < 0) {
      dots.splice(dots.indexOf(dot), 1);
      dots.push(new Dot(random(width), random(height), random(1, 3), random(0, 360)));
    }

    for (let d of dots) {
      let dis1 = sqrt(d.x * d.x + d.y * d.y)
      let dis2 = sqrt(dot.x * dot.x + dot.y * dot.y)
      let dis = abs(dis1 - dis2);
      if (dis < 100) {
        stroke('rgba(157, 164, 176,'+ map(dis, 100, 0, 0, 1, true) + ')');
        strokeWeight(0.3);
        line(d.x, d.y, dot.x, dot.y);
        if (mouseX < width && mouseX > 30 && mouseY < height && mouseY > 30) {
          line(d.x, d.y, mouseX, mouseY);
        }
      }
    }
  }
}

function mousePressed() {
  dots.push(new Dot(mouseX, mouseY, random(1, 3), random(0, 360)));
}

class Dot {
  constructor(x, y, vel, angle) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.angle = angle;
    this.size = random(3, 10);
  }

  draw() {
    fill(150, 150, 150);
    circle(this.x, this.y, this.size);
  }

  move() {
    angleMode(degrees)
    this.x += cos(this.angle) * this.vel;
    this.y += sin(this.angle) * this.vel;
  }
}