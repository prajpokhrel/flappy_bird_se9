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


        this.velocity = 0;
        this.gravity = 0.9;
        this.lift = -4;
    }

    draw = () => {
        // const ctx = gameArea.context;
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.fill();

    }

    update = () => {
        // this.draw();

        if (this.type === 'bird') {
            // add flapping images here
            if (this.flapState === 0) {
                this.flapState = 1;
            } else if (this.flapState === 1) {
                this.flapState = 2;
            } else {
                this.flapState = 0;
            }

            const ctx = gameArea.context;
            this.image = new Image();
            this.image.src = `images/${this.birdImages[this.flapState]}`;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);


            // this can go on new function
            this.velocity += this.gravity;
            this.velocity *= 0.9;
            this.y += this.velocity;

            // this too
            const bottomSurface = gameArea.canvas.height - this.height;
            if (this.y > bottomSurface) {
                this.y = bottomSurface;
                this.velocity = 0;
            }

            // Top Collision
            if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
            }
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


// function GameComponent(x, y, width, height, color, type) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.type = type;
//
//     this.velocity = 0;
//     this.gravity = 0.9;
//     this.lift = -4;
//
//     this.draw = () => {
//         const ctx = gameArea.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//         ctx.fill();
//     }
//
//     this.update = () => {
//         this.draw();
//
//         if (this.type === 'bird') {
//             // this can go on new function
//             this.velocity += this.gravity;
//             this.velocity *= 0.9;
//             this.y += this.velocity;
//
//             // this too
//             const bottomSurface = gameArea.canvas.height - this.height;
//             if (this.y > bottomSurface) {
//                 this.y = bottomSurface;
//                 this.velocity = 0;
//             }
//
//             // Top Collision
//             if (this.y < 0) {
//                 this.y = 0;
//                 this.velocity = 0;
//             }
//         }
//
//         if (this.type === "text") {
//             const ctx = gameArea.context;
//             ctx.font = this.width + " " + this.height;
//             ctx.fillStyle = color;
//             ctx.fillText(this.text, this.x, this.y);
//         }
//
//     }
//
//     this.birdPipeCollision = (pipes) => {
//         const birdLeft = this.x;
//         const birdRight = this.x + this.width;
//         const birdTop = this.y;
//         const birdBottom = this.y + this.height;
//
//         const pipesLeft = pipes.x;
//         const pipesRight = pipes.x + pipes.width;
//         const pipesTop = pipes.y;
//         const pipesBottom = pipes.y + pipes.height;
//
//         let collide = true;
//         if ((birdBottom < pipesTop)
//             || (birdTop > pipesBottom)
//             || (birdRight < pipesLeft)
//             || (birdLeft > pipesRight)) {
//             collide = false;
//         }
//
//         return collide;
//     }
//
//     this.offScreen = () => {
//         return this.x < - this.width;
//     }
//
//     this.upForce = () => {
//         this.velocity += this.lift;
//     }
//
// }