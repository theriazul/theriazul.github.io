// Footer-only live clock and year update.
document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.getElementById('footer-year');
    var timeEl = document.getElementById('footer-time');

    if (!yearEl || !timeEl) {
        return;
    }

    function updateFooterInfo() {
        var now = new Date();
        var year = now.getFullYear();
        var time = now.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
        });

        yearEl.innerHTML = '&copy; ' + year + ' <a href="index.html" target="_self">Riazul Islam Tusar</a>. All Rights Reserved.';
        timeEl.textContent = time;
    }

    updateFooterInfo();
    setInterval(updateFooterInfo, 1000);
});
