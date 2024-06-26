
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
        this.time = 10000
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
        const overlayEnd = document.getElementById("end-game")
        const tips = document.querySelectorAll(".tip");
        const randomIndex = Math.floor(Math.random() * 9);
        setTimeout(function () {
            tips[randomIndex].style.display = 'flex';
            overlayEnd.style.display = "flex"
        }, this.time)}

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

    updateScore(){
        const scorevak = document.querySelector('#currentscore p')
        scorevak.innerText = `score: ${this.score.toString()}`
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
        const interval = this.time / this.level;
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
                    this.updateScore()
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
        const spawnX = Math.floor(Math.random() * (this.container.offsetWidth - 120));
        const spawnY = Math.floor(Math.random() * (this.container.offsetHeight - 120));
        obstacle.style.left = `${spawnX}px`;
        obstacle.style.top = `${spawnY}px`;
        const imageCount = 1;
        const randomImageIndex = Math.floor(Math.random() * imageCount) + 1;
        const randomImage = `./images/obstacles/obstacle${randomImageIndex}.gif`;
        obstacle.style.backgroundImage = `url(${randomImage})`;
        obstacle.style.backgroundSize = 'contain';

        this.container.appendChild(obstacle);


        obstacle.timerInterval = setInterval(() => {
            this.score -= 20;
            this.updateScore()
            console.log(`Obstakel! Score verminderd! Huidige score: ${this.score}`);
            },2000)
    }

    startObstacleGeneration() {
        const level = +this.level+2
        const interval = this.time / (level)
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