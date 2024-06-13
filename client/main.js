class KitchenQuest {
    obstaclespawner;
    constructor(spelernaam, chef, container, obstacleClass, spawnX, spawnY) {
        this.spelernaam = spelernaam;
        this.chef = document.getElementById(chef);
        this.container = document.getElementById(container);
        this.score = 0;
        this.speed = 16;
        this.obstacleClass = obstacleClass;
        this.spawnX = spawnX;
        this.spawnY = spawnY;
    }



    startGame() {
        // Game start logic goes here
    }

    startTimer() {
        // Start timer logic goes here
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
        const ingredients = document.querySelectorAll('.ingredient');
        ingredients.forEach(ingredient => {
            if (this.isColliding(this.chef, ingredient)) {
                ingredient.remove();
                this.score++;
                // Update score display if necessary
            }
        });
    }

    playGame() {
        this.obstaclespawner = new ObstacleSpawner(this.container)
        document.addEventListener('keydown', (event) => this.walk(event));
        const rules = document.querySelector('.BUTTONPLAYGAME');
        if (rules) {
            rules.addEventListener('click', () => this.startGame());
        }
        setInterval(() => this.generateIngredient(), 500);
        setInterval(() => this.checkCollision(), 10);
        setInterval(() => this.obstaclespawner.generateObstacle(), 500);
    }
}

class ObstacleSpawner {
    constructor(container) {
        this.container = container;
    }

    startSpawning(minTime, maxTime) {
        const spawn = () => {
            this.generateObstacle();
            const randomTime = Math.random() * (maxTime - minTime) + minTime;
            setTimeout(spawn, randomTime);
        };
        spawn();
    }

    generateObstacle() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.addEventListener('click', () =>{
            obstacle.remove();
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
        // Add click event to remove obstacle and increase score
    }
    checkClicks() {
        const obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach(obstacle => {
                obstacle.addEventListener('click', () =>{
                    obstacle.remove();
                });
        });
    }
}



// Usage example
const kitchenQuest = new KitchenQuest('spelernaam', 'chef', 'game-container', 'obstacle', 100, 150);
kitchenQuest.playGame();
