const WIDTH = 640;
const HEIGHT = 640;

const FORCE_GRAVITY = 0.098;

const COEFFICIENT_RESTITUTION = 0.9;

function createBall() {
    return {
        size: Math.random() * 8 + 8,
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        ax: 0,
        ay: 0,
    };
}

let n = 10;
let balls = [];

for (let i = 0; i < n; i++) {
    balls.push(createBall());
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
}

function draw() {
    background(24);
    fill(215);
    textSize(16);
    text('Click to apply force', 8, 24);

    updatePosition();

    balls.forEach(ball => {
        ellipse(ball.x, ball.y, ball.size, ball.size);
    });
}

function mousePressed() {
    balls.forEach(ball => {
        let fx = (mouseX - ball.x) / WIDTH * 32 / ball.size;
        let fy = (mouseY - ball.y) / HEIGHT * 32 / ball.size;

        ball.ax += fx;
        ball.ay += fy;
    });
}

function updatePosition() {
    balls.forEach(ball => {
        const half_size = ball.size / 2;

        ball.vx += ball.ax;
        ball.vy += ball.ay;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x > WIDTH - half_size) {
            ball.x = WIDTH - half_size;
            ball.vx = -ball.vx * COEFFICIENT_RESTITUTION;
        }

        if (ball.x < half_size) {
            ball.x = half_size;
            ball.vx = -ball.vx * COEFFICIENT_RESTITUTION;
        }

        if (ball.y > HEIGHT - half_size) {
            ball.y = HEIGHT - half_size;
            ball.vy = -ball.vy * COEFFICIENT_RESTITUTION;
        }

        if (ball.y < half_size) {
            ball.y = half_size;
            ball.vy = -ball.vy * COEFFICIENT_RESTITUTION;
        }

        ball.ax = 0;
        ball.ay = FORCE_GRAVITY;
    });
}