class KitchenQuest {
    constructor(spelernaam, chef, container, obstacleClass, spawnX, spawnY) {
        this.spelernaam = spelernaam;
        this.chef = document.getElementById(`${chef}`);
        this.container = document.getElementById(`${container}`);
        this.score = 0;
        //walking speed chef
        this.speed = 1;
        this.container = container;
        this.obstacleClass = obstacleClass;
        this.spawnX = spawnX;
        this.spawnY = spawnY;
    }
    playGame() {
        document.addEventListener('keydown', (event) => this.walk(event));
        //show rules and hide them if start playing is clicked
        this.showRules();
        const rules = document.querySelector('BUTTONPLAYGAME')
        rules.addEventListener('click', this.startGame);
    }
    startGame() {
        //let player pick a recipe (maybe linked to levels? harder recipies, harder level?)
        //timer starts
        //let player get pots and pans from pantry. berghoff pots and pans return more points
        //ingredients start spawning, player must get them before they disappear after x seconds, catching an ingredient earns points
        //timer ends after x time, it's not relevant if the player is ready or not
        //total score and wheel of fortune appears on screen, player can spin it. each spin costs x points.
    }
    
    startTimer() {
        //start timer and put it on the screen in the html
    }

    walk(event) {
        //bijwerken naar zqsd
        //chef walking around
        switch (event.key) {
            case 'ArrowUp':
                //moves chef up by *speed* rem
                this.chef.style.top = `${Math.max(0, this.chef.offsetTop - this.speed)}rem`;
                break;
            case 'ArrowDown':
                this.chef.style.top = `${Math.min(this.container.offsetHeight - this.chef.offsetHeight, this.chef.offsetTop + this.speed)}rem`;
                break;
            case 'ArrowLeft':
                this.chef.style.left = `${Math.max(0, this.chef.offsetLeft - this.speed)}rem`;
                break;
            case 'ArrowRight':
                this.chef.style.left = `${Math.min(this.container.offsetWidth - this.chef.offsetWidth, this.chef.offsetLeft + this.speed)}rem`;
                break;
            default:
                console.log("invalid key pressed")
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
        const randomX = Math.floor(Math.random() * (this.container.offsetWidth - 48));
        const randomY = Math.floor(Math.random() * (this.container.offsetHeight - 48));
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
                //maybe update score display in html? or can we connect this to this.score and do it automatically?
            }
        })
    }


    generateObstacle() {
                const obstacle = document.createElement('div');
                // Obstakel toevoegen aan de div
                obstacle.classList.add(this.obstacleClass);

                // Set de vaste positie van het obstakel
                obstacle.style.left = `${this.spawnX}px`;
                obstacle.style.top = `${this.spawnY}px`;

                // Voeg het obstakel toe aan de container
                this.container.appendChild(obstacle);
            }

            startSpawning(minTime, maxTime) {
                const spawn = () => {
                    this.generateObstacle();
                    const randomTime = Math.random() * (maxTime - minTime) + minTime;
                    setTimeout(spawn, randomTime);
                };
                spawn();
            }
        }

// Gebruik het ObstacleSpawner klasse
        const container = document.querySelector('.container');
        const obstacleClass = 'obstacle'; 
        const spawnX = 100;
        const spawnY = 150;

        const spawner = new ObstacleSpawner(container, obstacleClass, spawnX, spawnY);
        spawner.startSpawning(1000, 5000);


    }

    fixObstacle()
{
        // Voeg een event listener om het obstakel te verwijderen
        obstacle.addEventListener('click', () => {
            obstacle.remove();

            this.score++;
        });


}

const kitchenQuest = new KitchenQuest('spelernaam', 'chef', 'game-container');

kitchenQuest.playGame();
