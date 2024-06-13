const showHighscore = function (score){
const li = document.createElement("li")
    li.classList.add("highscores")

    li.innerHTML = `
    <p>${score.name}</p>
    <p>${score.score}</p>
    `
    return li
}

export const addHighscore = (highscore, container) => container.appendChild(showHighscore(highscore))