const g = 0.098;
const bouncyness = 0.9;

let n = 100;
const balls = [];

for (let i = 0; i < n; i++) {
  balls.push({
    x: Math.random() * 800,
    y: Math.random() * 800,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    size: Math.random() * 16 + 16,
  })
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(24);

  balls.forEach(ball => {
    ball.vx += ball.ax;
    ball.vy += ball.ay;
    ball.ax = 0;
    ball.ay = 0;
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y < 0) {
      ball.y = 0;
      ball.vy = -ball.vy * bouncyness;
    }

    if (ball.y > 800) {
      ball.y = 800;
      ball.vy = -ball.vy * bouncyness;
    }

    if (ball.x < 0) {
      ball.x = 0;
      ball.vx = -ball.vx * bouncyness;
    }

    if (ball.x > 800) {
      ball.x = 800;
      ball.vx = -ball.vx * bouncyness;
    }

    ball.ay += g;

    ellipse(ball.x, ball.y, ball.size, ball.size);
  });
}

function mousePressed() {
  balls.forEach(ball => {
    fx = mouseX - ball.x;
    fy = mouseY - ball.y;

    if (fx > 5) {
      fx = 5;
    }

    if (fx < -5) {
      fx = -5;
    }

    if (fy > 5) {
      fy = 5;
    }

    if (fy < -5) {
      fy = -5;
    }

    ball.ax += fx;
    ball.ay += fy;
  });
}


