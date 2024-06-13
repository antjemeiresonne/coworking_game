document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('spelregels')
    const closeOverlayBtnX = document.getElementById('closeOverlayBtnX')
    const overlayBtnPlay1 = document.getElementById('overlayBtnPlay1')
    const overlayBtnPlay2 = document.getElementById('overlayBtnPlay2')
    const overlayBtnPlay3 = document.getElementById('overlayBtnPlay3')
    const endGame = document.getElementById('endGame')

    overlay.style.display = 'flex'

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

    // Close overlay when clicking outside of the content
    // overlay.addEventListener('click', function (event) {
    //     if (event.target === overlay) {
    //         overlay.style.display = 'none'
    //     }
    // })

    function timer() {
        setTimeout(function () {
            endGame.style.display = 'flex'
        }, 5000) // = 30 seconds
    }
})
