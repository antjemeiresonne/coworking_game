export const getScores = async function () {
    return fetch(import.meta.env.API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('highscores opgehaald')
            return response.json();
        })
        .then(json => json.data)
        .catch(() => {
            throw new Error('Error fetching cats');
        });
}


export const postHighscore = async (payload) => {
    const response = await fetch(`${import.meta.env.API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
    }
    const json = await response.json()
    return json.data.id
}
