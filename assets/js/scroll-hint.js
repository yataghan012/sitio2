/* -------------------------------------------
   SCROLL HINT LOGIC
   Shows green arrows after 5s of inactivity, 
   ONLY on the initial load and BEFORE the first scroll.
   ------------------------------------------- */

(function () {
    let scrollTimer;
    let hasInteracted = false;
    const hint = document.getElementById('scroll-hint');

    if (!hint) return;

    function showHint() {
        // Only show if the user hasn't interacted/scrolled yet
        if (!hasInteracted) {
            hint.classList.add('active');
        }
    }

    function hideHintPermanently() {
        hasInteracted = true;
        hint.classList.remove('active');
        clearTimeout(scrollTimer);

        // Remove listeners once we've interacted to save resources
        removeListeners();
    }

    function resetTimer() {
        if (!hasInteracted) {
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

    // Special handling for fullPage.js events
    $(document).on('onLeave afterLoad afterSlideLoad onSlideLeave', function () {
        hideHintPermanently();
    });

    // Start the initial timer
    resetTimer();
})();
