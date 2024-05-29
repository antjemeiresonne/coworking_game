document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('spelregels');
    const openOverlayBtn = document.getElementById('show-rulesknop');
    const closeOverlayBtnX = document.getElementById('closeOverlayBtnX');
    const closeOverlayBtnPlay = document.getElementById('closeOverlayBtnPlay');

    overlay.style.display = 'flex';

    openOverlayBtn.addEventListener('click', function() {
        overlay.style.display = 'flex';
    });

    closeOverlayBtnX.addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    closeOverlayBtnPlay.addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    // Close overlay when clicking outside of the content
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});
