// Footer-only live clock and year update.
document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.getElementById('footer-year');
    var timeEl = document.getElementById('footer-time');

    if (!yearEl || !timeEl) {
        return;
    }

    if (timeEl.dataset.clockInitialized === 'true') {
        return;
    }
    timeEl.dataset.clockInitialized = 'true';

    function updateFooterInfo() {
        var now = new Date();
        var year = now.getFullYear();
        var time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        yearEl.innerHTML = '&copy; ' + year + ' <a href="index.html" target="_self">Riazul Islam Tusar</a>. All Rights Reserved.';
        timeEl.textContent = time;
    }

    updateFooterInfo();
    setInterval(updateFooterInfo, 1000);
});
