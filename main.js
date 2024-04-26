'use strict';

(function(){

class KitchenQuest{
    constructor(spelernaam, chef, container){
        this.spelernaam = spelernaam;
        this.chef = document.getElementById(`${chef}`);
        this.container = document.getElementById(`${container}`);
        this.score = 0;
        //walking speed chef
        this.speed = 20;
    }
    startgame(){
        document.addEventListener('keydown', (event) => this.walk(event));
    }
    //chef walking around
    walk(event){
        switch (event.key){
            case 'ArrowUp':
                //moves chef up by *speed* rem, diminishes the position of chef and the top of the parent element by 5 rem
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
    generateIngredient(){
        const ingredient = document.createElement('div');
        ingredient.classList.add('ingredient');
        const randomX = Math.floor(Math.random() * (this.container.offsetWidth - 3));
        const randomY = Math.floor(Math.random() * (this.container.offsetHeight - 3));
        ingredient.style.left = `${randomX}rem`;
        ingredient.style.top = `${randomY}rem`;
        this.container.appendChild(ingredient);
    }
    isColliding(element1, element2){
        const bound1 = element1.getBoundingClientRect();
        const bound2 = element2.getBoundingClientRect();
        return !(bound1.right < bound2.left || 
            bound1.left > bound2.right || 
            bound1.bottom < bound2.top || 
            bound1.top > bound2.bottom);
    }

    checkCollision(){
        const ingredients = document.querySelectorAll('.ingredient');
        ingredients.forEach(ingredient => {
            if (this.isColliding(this.chef, ingredient)) {
                ingredient.remove();
                this.score++;
                //maybe update score display in html? or can we connect this to this.score and do it automatically?
            }
        })
    }
}

const kitchenQuest = new KitchenQuest('spelernaam', 'chef', 'container');
kitchenQuest.startgame();
})();