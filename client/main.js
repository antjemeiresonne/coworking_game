import { FormValidator } from "./src/formValidator.js";
import { KitchenQuest } from "./src/gameFunctions.js";

const kitchenQuest = new KitchenQuest('chef', 'game-container');
console.log(kitchenQuest.chef)
const form = document.querySelector('form')
const overlay = document.getElementById('spelregels')

const formValidator = new FormValidator(form)
formValidator.addValidator({
    name: 'name',
    method: field => field.value.trim().length > 0,
    message: 'Naam is verplicht in te vullen.'
})
const playButtons = document.querySelectorAll('.playButton');
playButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        if (!formValidator.validate()) {
            return;
        }

        const formData = new FormData(form);
        const playerName = formData.get('name');
        kitchenQuest.spelernaam = playerName;

        console.log(`Spelernaam is ${kitchenQuest.spelernaam}`);

        const level = event.target.id;
        kitchenQuest.level = level;
        //kitchenQuest.setLevel(level);

        overlay.style.display = 'none'
        kitchenQuest.startTimer()
        kitchenQuest.generateIngredient()
        kitchenQuest.startIngredientGeneration()
        kitchenQuest.startObstacleGeneration()
        kitchenQuest.checkCollision()
        setTimeout(function () {
            kitchenQuest.stopIngredientGeneration()
            kitchenQuest.stopObstacleGeneration()
            document.querySelector('#score').innerText = kitchenQuest.score.toString()

        }, kitchenQuest.time)

    });
    document.addEventListener('keydown', (event) => {
        kitchenQuest.walk(event)
    })
});