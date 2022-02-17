let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 3;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1;
let dy = -1;
let paddleWidth = 100
let paddleHeight = 10
let paddleX = (canvas.width - paddleWidth) / 2
let rightPress = false;
let leftPress = false;

let brickWidth = 20;
let brickHeight = 20;

let bricks = []

let isGameStart = false;

const score = document.querySelector('span');

for (let x = 10; x < canvas.width; x += brickWidth + 10 ) {
    for (let y = 10; y < 100; y += brickHeight + 10 ) {
        bricks.push({
            x,
            y
        })
    }
}

let bricksAmount = bricks.length

function drawBrick(x, y) {
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.fillRect(x, y, brickWidth, brickHeight);
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "pink";
    ctx.fill();
    ctx.closePath();
}

function drawpaddle() {
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bricks.length; i++) {
        drawBrick(bricks[i].x, bricks[i].y)
    }

    drawpaddle();
    drawBall();

    if(!isGameStart) return;

    if(x >= paddleX && x <= paddleX + paddleWidth/2 && y + dy > canvas.height - ballRadius - paddleHeight) {
        dx = -1;
        dy = -dy;
    }

    if(x >= paddleX + paddleWidth/2 && x <= paddleX + paddleWidth && y + dy > canvas.height - ballRadius - paddleHeight) {
        dx = 1;
        dy = -dy;
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if(y + dy > canvas.height - ballRadius) {
        alert('Game Over');
        init();
    }

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    bricks.forEach((brick, index) => {
        if( x + ballRadius  >= brick.x && x - ballRadius <= brick.x + brickWidth && y + ballRadius >= brick.y && y - ballRadius <= brick.y + brickHeight) {
            if(x + ballRadius === brick.x || x - ballRadius === brick.x + brickWidth) {
                dx = -dx;
            }

            if(y + ballRadius === brick.y || y - ballRadius === brick.y + brickHeight) {
                dy = -dy;
            }

            bricks.splice(index, 1);
        }
    }) 

    if(bricks.length === 0) {
        alert('You Win!!!');
        init();
    }

    if(rightPress && paddleX <= canvas.width - paddleWidth) {
        paddleX += 7;
    }

    if(leftPress && paddleX >= 0) {
        paddleX -= 7;
    }

    score.innerText = bricksAmount - bricks.length
    x += dx;
    y += dy;
}

function init() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 1;
    dy = -1;
    paddleX = (canvas.width - paddleWidth) / 2
    rightPress = false;
    leftPress = false;
    bricks = []

    isGameStart = false;
    score.innerText = 0;
    for (let x = 10; x < canvas.width; x += brickWidth + 10 ) {
        for (let y = 10; y < 100; y += brickHeight + 10 ) {
            bricks.push({
                x,
                y
            })
        }
    }
}

document.addEventListener('keyup', (e) => {
    if(e.code === "ArrowLeft") {
        leftPress = false;
    }

    if(e.code === "ArrowRight") {
        rightPress = false;
    }
})

document.addEventListener('keydown', (e) => {
    isGameStart = true;

    if(e.code === "ArrowLeft") {
        leftPress = true;
    }

    if(e.code === "ArrowRight") {
        rightPress = true;
    }
})



setInterval(draw, 10);