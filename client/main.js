class KitchenQuest {
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

    playGame() {
        document.addEventListener('keydown', (event) => this.walk(event));
        const rules = document.querySelector('.BUTTONPLAYGAME');
        if (rules) {
            rules.addEventListener('click', () => this.startGame());
        }
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
        const randomX = Math.floor(Math.random() * (this.container.offsetWidth - 120));
        const randomY = Math.floor(Math.random() * (this.container.offsetHeight - 120));
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
}

    class ObstacleSpawner {
        constructor(container, obstacleClass, spawnX, spawnY, imagePath) {
            this.container = container;
            this.obstacleClass = obstacleClass;
            this.spawnX = spawnX;
            this.spawnY = spawnY;
            this.imagePath = imagePath;
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
        obstacle.classList.add(this.obstacleClass);
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
        obstacle.addEventListener('click', () => {
            obstacle.remove();
            // Handle score increment if necessary
        });
    }
}



// Usage example
const kitchenQuest = new KitchenQuest('spelernaam', 'chef', 'game-container', 'obstacle', 100, 150);
kitchenQuest.playGame();
kitchenQuest.generateIngredient();
kitchenQuest.checkCollision();
