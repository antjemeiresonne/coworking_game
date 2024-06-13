const overlayEnd = document.getElementById("end-game")

export class KitchenQuest {

    #level = null

    constructor(chef, container) {
        this.chef = document.getElementById(chef);
        this.container = document.getElementById(container);
        this.score = 0;
        this.speed = 16;
        this.level = null;
        this.spelernaam = null;
        this.ingredientInterval = null;
        this.collisionInterval = null;
        this.obstacleInterval = null;
    }

    set level(value){
        console.log(value)
        this.#level = +value
        console.log(`gekozen level is ${this.level}`)
    }



    // setLevel(level) {
    //     this.level = level;
        
    // }
    startTimer() {
        setTimeout(function () {
            //  wheelContainer.style.display = 'flex'
            // drawWheel()
            overlayEnd.style.display = "flex"
        }, 10000)}

    get level() {
        return this.#level
    }

    walk(event) {
        switch (event.key) {
            case 'z':
                this.chef.style.top = `${Math.max(120, this.chef.offsetTop - this.speed)}px`;
                break;
            case 's':
                this.chef.style.top = `${Math.min(this.container.offsetHeight - this.chef.offsetHeight - 120, this.chef.offsetTop + this.speed)}px`;
                break;
            case 'q':
                this.chef.style.left = `${Math.max(120, this.chef.offsetLeft - this.speed)}px`;
                break;
            case 'd':
                this.chef.style.left = `${Math.min(this.container.offsetWidth - this.chef.offsetWidth - 120, this.chef.offsetLeft + this.speed)}px`;
                break;
            default:
                console.log("Ongeldige toets ingedrukt");
        }
    }

    generateIngredient() {
        const ingredient = document.createElement('div');
        ingredient.classList.add('ingredient');
        ingredient.style.width = '2rem';
        ingredient.style.height = '2rem';
        ingredient.style.position = 'absolute';
        const imageCount = 8;
        const randomImageIndex = Math.floor(Math.random() * imageCount) + 1;
        const randomImage = `./images/ingredients/ing${randomImageIndex}.png`;
        ingredient.style.backgroundImage = `url(${randomImage})`;
        ingredient.style.backgroundSize = 'contain';
        const minX = 120;
        const minY = 120;
        const maxX = this.container.offsetWidth - 120 - 32;
        const maxY = this.container.offsetHeight - 120 - 32;

        const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
        const randomY = Math.floor(Math.random() * (maxY - minY)) + minY;
        ingredient.style.left = `${randomX}px`;
        ingredient.style.top = `${randomY}px`;
        this.container.appendChild(ingredient);

        setTimeout(() => {
            ingredient.remove();
        }, 5000);
    }

    startIngredientGeneration() {
        const interval = 30000 / this.level;
        this.ingredientInterval = setInterval(() => {
            this.generateIngredient();
        }, interval);
    }

    stopIngredientGeneration(){
        clearInterval(this.ingredientInterval)
    }

    isColliding(element1, element2) {
        const bound1 = element1.getBoundingClientRect();
        const bound2 = element2.getBoundingClientRect();
        return !(bound1.right < bound2.left ||
            bound1.left > bound2.right ||
            bound1.bottom < bound2.top ||
            bound1.top > bound2.bottom);
    }

    checkCollision() {
        this.collisionInterval = setInterval(() => {
            const ingredients = document.querySelectorAll('.ingredient');
            ingredients.forEach(ingredient => {
                if (this.isColliding(this.chef, ingredient)) {
                    ingredient.remove();
                    this.score = this.score + 200;
                    console.log(`Collision detected! Huidige score: ${this.score}`);
                }
            });
        }, 100);
    }

    generateObstacle() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.addEventListener('click', () => {
            obstacle.remove();
            clearInterval(obstacle.timerInterval);
        });
        const spawnX = Math.floor(Math.random() * (this.container.offsetWidth - 50));
        const spawnY = Math.floor(Math.random() * (this.container.offsetHeight - 50));
        obstacle.style.left = `${spawnX}px`;
        obstacle.style.top = `${spawnY}px`;
        const imageCount = 1;
        const randomImageIndex = Math.floor(Math.random() * imageCount) + 1;
        const randomImage = `./images/obstacles/obstacle${randomImageIndex}.gif`;
        obstacle.style.backgroundImage = `url(${randomImage})`;
        obstacle.style.backgroundSize = 'contain';

        this.container.appendChild(obstacle);

        const startTime = Date.now();
        obstacle.timerInterval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 1000;
    
            this.score -= 20;
            console.log(`Obstakel! Score verminderd! Huidige score: ${this.score}`);
            },2000)
    }

    startObstacleGeneration() {
        const level = +this.level+2
        const interval = 30000 / (level)
        console.log(interval, this.level +2)

        if (this.obstacleInterval) clearInterval(this.obstacleInterval)

        this.obstacleInterval = setInterval(() => {
            this.generateObstacle();
        }, interval);
    }

    stopObstacleGeneration(){
        clearInterval(this.obstacleInterval)
    }
}