class GameComponent {
    constructor(x, y, width, height, color, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.color = color;
        this.flapState = 0;
        this.angle = 0;

        this.birdImages = [
            'yellowbird-upflap.png',
            'yellowbird-midflap.png',
            'yellowbird-downflap.png'
        ];

        if (this.type === 'pipe') {
            this.image = new Image();
            this.image.src = color;
        }
 
        // Setting up velocity, gravity and lift for bird
        this.velocity = 0;
        this.gravity = 0.9;
        this.lift = -4;
    }

    handleBirdVelocity = () => {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
    }

    handleTopCollision = () => {
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    // Stop the game if bird is collided to bottom, top has no effect
    handleBottomCollision = () => {
        const bottomSurface = gameArea.canvas.height - this.height;
        if (this.y > bottomSurface) {
            this.y = bottomSurface;
            this.velocity = 0;
            gameArea.stop();
            gameOver();
        }
    }

    // Animating bird flapping
    checkFlapState = () => {
        if (this.flapState === 0) {
            this.flapState = 1;
        } else if (this.flapState === 1) {
            this.flapState = 2;
        } else {
            this.flapState = 0;
        }
    }

    update = () => {

        if (this.type === 'bird') {

            this.checkFlapState();

            const ctx = gameArea.context;
            this.image = new Image();
            this.image.src = `images/${this.birdImages[this.flapState]}`;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);


            this.handleBirdVelocity();

            this.handleBottomCollision();

            this.handleTopCollision();
        }

        if (this.type === 'text') {
            const ctx = gameArea.context;
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        }

        if (this.type === 'pipe') {
            const ctx = gameArea.context;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

    }

    // collision detection
    birdPipeCollision = (pipes) => {
        const birdLeft = this.x;
        const birdRight = this.x + this.width;
        const birdTop = this.y;
        const birdBottom = this.y + this.height;

        const pipesLeft = pipes.x;
        const pipesRight = pipes.x + pipes.width;
        const pipesTop = pipes.y;
        const pipesBottom = pipes.y + pipes.height;

        let collide = true;
        if ((birdBottom < pipesTop)
            || (birdTop > pipesBottom)
            || (birdRight < pipesLeft)
            || (birdLeft > pipesRight)) {
            collide = false;
        }

        return collide;
    }

    offScreen = () => {
        return this.x < - this.width;
    }

    upForce = () => {
        this.velocity += this.lift;
    }

}
