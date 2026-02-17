/* -------------------------------------------
   SCROLL HINT LOGIC
   Shows green arrows after 5s of inactivity, 
   ONLY on the initial load at the TOP section (#top).
   ------------------------------------------- */

(function () {
    let scrollTimer;
    let hasInteractedAtTop = false;
    const hint = document.getElementById('scroll-hint');

    if (!hint) return;

    function isAtTop() {
        // Since fullPage.js is used, we check if the first section is active.
        // Usually, fullPage adds the 'active' class to the current section.
        const firstSection = document.querySelector('.section');
        return firstSection && firstSection.classList.contains('active');
    }

    function showHint() {
        // Only show if we are still at the top and hasn't interacted yet
        if (!hasInteractedAtTop && isAtTop()) {
            hint.classList.add('active');
        }
    }

    function hideHintPermanently() {
        hasInteractedAtTop = true;
        hint.classList.remove('active');
        clearTimeout(scrollTimer);

        // Remove listeners to clean up
        removeListeners();
    }

    function resetTimer() {
        if (!hasInteractedAtTop) {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(showHint, 5000);
        }
    }

    const eventTypes = ['scroll', 'wheel', 'touchmove', 'keydown', 'mousedown'];

    function removeListeners() {
        eventTypes.forEach(eventType => {
            window.removeEventListener(eventType, hideHintPermanently);
        });
        $(document).off('onLeave afterLoad afterSlideLoad onSlideLeave', hideHintPermanently);
    }

    // Listen for any interaction to permanently disable the hint
    eventTypes.forEach(eventType => {
        window.addEventListener(eventType, hideHintPermanently, { passive: true });
    });

    // Also hide if fullPage transitions away from the first section
    $(document).on('onLeave', function (index, nextIndex, direction) {
        // nextIndex is 1-based. If moving away from 1, hide it.
        hideHintPermanently();
    });

    // Start the initial timer
    resetTimer();
})();
