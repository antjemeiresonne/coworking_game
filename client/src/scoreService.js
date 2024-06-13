export const getScores = async function(){
    const response = await fetch(`${import.meta.env.VITE_API_URL}`);

    if (!response.ok){
        throw new Error("Network response was not ok" + response.statusText)
    }
    const json = await response.json();

    return json.data
}
export const postHighscore = async (payload) =>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if(!response.ok){
        throw new Error('Network response was not ok ' + response.statusText)
    }
    const json = await response.json()
    return json.data.id
}
