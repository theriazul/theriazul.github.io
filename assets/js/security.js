/* ===========================================
   PREMIUM SECURITY.JS
   For Static Portfolio Website
=========================================== */

(function () {
    "use strict";

    // Disable Right Click
    document.addEventListener("contextmenu", e => e.preventDefault());

    // Disable Copy / Cut / Paste
    ["copy", "cut", "paste"].forEach(evt => {
        document.addEventListener(evt, e => e.preventDefault());
    });

    // Disable Drag
    document.addEventListener("dragstart", e => e.preventDefault());

    // Disable Text Selection
    document.addEventListener("selectstart", e => e.preventDefault());

    // Disable Common Shortcut Keys
    document.addEventListener("keydown", function (e) {

        const key = e.key.toUpperCase();

        if (
            key === "F12" ||
            (e.ctrlKey && e.shiftKey &&
                ["I", "J", "C", "K"].includes(key)) ||
            (e.ctrlKey &&
                ["U", "S", "A", "P"].includes(key))
        ) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

    });

    // Console Warning
    console.clear();

    console.log(
        "%cSTOP!",
        "color:red;font-size:50px;font-weight:bold;"
    );

    console.log(
        "%cUnauthorized inspection is discouraged.",
        "color:#00d4ff;font-size:18px;"
    );

    // DevTools Detection
    function showSecurityScreen() {

        document.body.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            background:#050816;
            color:#00d4ff;
            font-family:Arial,sans-serif;
            text-align:center;
        ">
            <div>
                <h1>⚠ SECURITY ALERT</h1>
                <p>Developer Tools Detected</p>
                <p>Please close Developer Tools.</p>
            </div>
        </div>`;
    }

    setInterval(() => {

        const width = window.outerWidth - window.innerWidth;
        const height = window.outerHeight - window.innerHeight;

        if (width > 160 || height > 160) {
            showSecurityScreen();
        }

    }, 1000);

    // Detect debugger pause
    setInterval(function () {

        const start = performance.now();

        debugger;

        const end = performance.now();

        if (end - start > 100) {
            showSecurityScreen();
        }

    }, 2000);

})();