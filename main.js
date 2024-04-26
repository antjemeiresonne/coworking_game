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
}

const kitchenQuest = new KitchenQuest('spelernaam', 'chef', 'container');
kitchenQuest.startgame();
})();