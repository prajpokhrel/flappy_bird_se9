let bird;
let pipes;
let animation;
let newScore;
let pipeSpeed = 2;

const startScreen = __('.start-screen');
const startScreenImage = __('.start-screen-image');
const gameOverScreen = __('.game-over-screen');
const currentScore = __('.current-score');
const bestScore = __('.best-score');
const restartButton = __('.restart-button');


let highScore = localStorage.getItem('flappyBirdScore') || 0;

const gameArea = {
    canvas: __('canvas'),
    start: function() {
        this.canvas.width = 480; // 480
        this.canvas.height = 600; // 600
        this.context = this.canvas.getContext('2d');
        this.frameNo = 0;
        this.score = 0;
        window.addEventListener('keydown', function (event) {
            gameArea.keyCode = event.code;
        });

        window.addEventListener('keyup', function (event) {
            gameArea.keyCode = false;
        });
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        cancelAnimationFrame(animation);
    }
}

function updateScore() {
    if (gameArea.frameNo % 130 === 125 && gameArea.frameNo > 125) {
        gameArea.score++;
    }

    if (gameArea.score > highScore) {
        highScore = gameArea.score;
        localStorage.setItem('flappyBirdScore', highScore);
    }

    newScore.text = gameArea.score;
    newScore.update();
}

function updateGameArea() {
    let x, cH, minHeight, maxHeight, height, gap;

    // Check for bird and pipe collision
    for (let i = 0; i < pipes.length; i++) {
        if (bird.birdPipeCollision(pipes[i])) {
            gameArea.stop();
            gameOver();
        }
    }

    gameArea.clear();
    gameArea.frameNo += 1;
    // Pipes will generate every 130th frame.
    if (gameArea.frameNo % 130 === 0) {
        x = gameArea.canvas.width;
        cH = gameArea.canvas.height;
        minHeight = 50;
        maxHeight = 370;
        height = randomIntFromRange(minHeight, maxHeight);
        gap = 150;

        pipes.push(new GameComponent(x, 0, 80, height, 'images/pipe-bottom.png', 'pipe'));
        pipes.push(new GameComponent(x, height + gap, 80, cH - height - gap, 'images/pipe-top.png', 'pipe'));
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= pipeSpeed;
        pipes[i].update();

        // remove the pipes if they go off-screen to free-up array
        if (pipes[i].offScreen()) {
            pipes.splice(i, 1);
        }
    }

    if (gameArea.keyCode && gameArea.keyCode === "Space") {
        bird.upForce();
    }

    // updates the score and if its high score, adds it to local storage
    updateScore();
}

// Game initializer
function init() {
    pipes = [];
    gameArea.start();
    bird = new GameComponent(200, gameArea.canvas.height / 2, 50, 34,'', 'bird');
    newScore = new GameComponent(20, 70, '60px', 'Verdana', '#F7F7F7', 'text');
}


function animate() {
    animation = requestAnimationFrame(animate);
    gameArea.clear();

    updateGameArea();
    bird.update();
}

// Start the game
startScreenImage.addEventListener('click', () => {
    startScreen.classList.add('hide');
    animate();
});

// End the game
restartButton.addEventListener('click', () => {
    gameArea.clear();
    gameOverScreen.classList.add('hide');
    init();
    animate();
});

// Handle game over condition
function gameOver() {
    gameOverScreen.classList.remove('hide');
    currentScore.innerHTML = "SCORE <br>" + gameArea.score;
    bestScore.innerHTML = "BEST SCORE <br>" + localStorage.getItem('flappyBirdScore');
}


init();
// animate();