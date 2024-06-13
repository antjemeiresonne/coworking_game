    const overlay = document.getElementById('spelregels')
    const closeOverlayBtnX = document.getElementById('closeOverlayBtnX')
    const overlayBtnPlay1 = document.getElementById('overlayBtnPlay1')
    const overlayBtnPlay2 = document.getElementById('overlayBtnPlay2')
    const overlayBtnPlay3 = document.getElementById('overlayBtnPlay3')
    const endGame = document.getElementById('endGame')

    closeOverlayBtnX.addEventListener('click', function () {
        overlay.style.display = 'none'
    })

    overlayBtnPlay1.addEventListener('click', function () {
        overlay.style.display = 'none'
        timer()
    })

    overlayBtnPlay2.addEventListener('click', function () {
        overlay.style.display = 'none'
        timer()
    })

    overlayBtnPlay3.addEventListener('click', function () {
        overlay.style.display = 'none'
        timer()
    })

    function timer() {
        setTimeout(function () {
            endGame.style.display = 'flex'
        }, 30000) // = 30 seconds
}
