const showHighscore = function (score){
const li = document.createElement("li")
    li.classList.add("highscores")

    li.innerHTML = `
    <p>${score.name}</p>
    `
    return li
}

//todo: export
