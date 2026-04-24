// ========================================
// ADVANCED HACKER MODE FUNCTIONALITY
// ========================================

// Initialize Hacker Mode when page loads
window.addEventListener('DOMContentLoaded', function() {
  initHackerMode();
});

function initHackerMode() {
  // DOM Elements
  const fabButton = document.getElementById('fab');
  const overlay = document.getElementById('hacker-overlay');
  const activationScreen = overlay.querySelector('.hacker-activation');
  const modal = overlay.querySelector('.hacker-modal');
  const exitContainer = document.getElementById('hacker-exit-container');
  const exitBtn = document.getElementById('exit-hacker-mode');
  const deviceInfo = document.getElementById('device-info');
  const browserInfo = document.getElementById('browser-info');
  const ipInfo = document.getElementById('ip-info');
  const locationInfo = document.getElementById('location-info');
  const datetimeInfo = document.getElementById('datetime-info');

  let isActive = false;
  let timeInterval;
  let audioContext;
  let musicPlaying = false;
  let glitchInterval;
  let glitchActive = false;

  // Cyberpunk-style background music using Web Audio API
  function startCyberMusic() {
    if (musicPlaying) return;

    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      // Create a cyberpunk-style sound
      oscillator1.frequency.setValueAtTime(220, audioContext.currentTime); // A3
      oscillator1.type = 'sawtooth';

      oscillator2.frequency.setValueAtTime(330, audioContext.currentTime); // E4
      oscillator2.type = 'square';

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.5);

      oscillator1.connect(filter);
      oscillator2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator1.start();
      oscillator2.start();

      // Create a repeating pattern
      setInterval(() => {
        if (musicPlaying) {
          const now = audioContext.currentTime;
          oscillator1.frequency.setValueAtTime(220 + Math.random() * 50, now);
          oscillator2.frequency.setValueAtTime(330 + Math.random() * 50, now);
        }
      }, 2000);

      musicPlaying = true;
    } catch (e) {
      console.log('Web Audio API not supported, no background music');
    }
  }

  function stopCyberMusic() {
    if (audioContext && musicPlaying) {
      audioContext.close();
      musicPlaying = false;
    }
  }

  // Sound effect function
  function playClickSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Fallback: no sound if Web Audio API not supported
    }
  }

  // Detect Browser
  function detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
    return 'Unknown';
  }

  // Detect OS
  function detectOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Unknown';
  }

  // Fetch IP and Location
  async function fetchIPInfo() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        ip: data.ip || 'Unable to fetch',
        location: `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`
      };
    } catch (error) {
      console.error('Error fetching IP info:', error);
      return {
        ip: 'Unable to fetch',
        location: 'Unable to fetch'
      };
    }
  }

  // Update Date and Time
  function updateDateTime() {
    const now = new Date();
    datetimeInfo.textContent = now.toLocaleString();
  }

  // Glitch Effect - Triggers every 2 seconds (ONLY on System Information panel)
  function triggerGlitch() {
    // Apply glitch ONLY to modal (System Information), NOT to exit button
    if (modal) modal.classList.add('glitching');
    
    // Add scanlines effect
    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    scanlines.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 5002;
      background: repeating-linear-gradient(
        0deg,
        rgba(255, 0, 0, 0.03),
        rgba(255, 0, 0, 0.03) 1px,
        transparent 1px,
        transparent 2px
      );
      opacity: 0;
      animation: scanlineGlitch 0.3s ease;
    `;
    document.body.appendChild(scanlines);
    
    // RGB shift effect on text (only in modal)
    const textElements = modal.querySelectorAll('*');
    textElements.forEach(el => {
      const originalText = el.textContent;
      if (originalText.length > 0) {
        el.style.textShadow = `
          2px 0 0 rgba(255, 0, 0, 0.7),
          -2px 0 0 rgba(0, 255, 255, 0.7),
          0 0 10px rgba(0, 255, 200, 0.5)
        `;
      }
    });
    
    // Random shake (only on modal)
    const shakeAmount = 3;
    const randomX = (Math.random() - 0.5) * shakeAmount;
    const randomY = (Math.random() - 0.5) * shakeAmount;
    
    modal.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Remove glitch class after animation
    setTimeout(() => {
      if (modal) modal.classList.remove('glitching');
      
      modal.style.transform = '';
      textElements.forEach(el => {
        el.style.textShadow = '';
      });
      
      if (scanlines.parentNode) {
        scanlines.parentNode.removeChild(scanlines);
      }
    }, 300);
  }

  // Start glitch effect loop
  function startGlitchEffect() {
    if (glitchActive) return;
    glitchActive = true;
    
    // Trigger glitch immediately
    triggerGlitch();
    
    // Then every 2 seconds
    glitchInterval = setInterval(() => {
      if (isActive) {
        triggerGlitch();
      }
    }, 2000);
  }

  // Stop glitch effect loop
  function stopGlitchEffect() {
    glitchActive = false;
    if (glitchInterval) {
      clearInterval(glitchInterval);
      glitchInterval = null;
    }
  }

  // Update all info
  async function updateInfo() {
    // Device/OS
    deviceInfo.textContent = detectOS();

    // Browser
    browserInfo.textContent = detectBrowser();

    // IP and Location
    const ipData = await fetchIPInfo();
    ipInfo.textContent = ipData.ip;
    locationInfo.textContent = ipData.location;

    // Start live time update
    updateDateTime();
    timeInterval = setInterval(updateDateTime, 1000);
    
    // Start glitch effect loop
    startGlitchEffect();
  }

  // Open Hacker Mode - Two Step Process
  function openHackerMode() {
    if (isActive) return;
    isActive = true;

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    fabButton.classList.add('hidden');
    document.body.style.overflow = 'hidden'; // Disable background scrolling

    // Start background music
    startCyberMusic();

    // Play click sound
    playClickSound();

    // After 3 seconds, transition to system information
    setTimeout(() => {
      activationScreen.style.opacity = '0';
      activationScreen.style.transform = 'translate(-50%, -50%) scale(0.9)';

      setTimeout(() => {
        activationScreen.style.display = 'none';
        modal.classList.remove('hidden');
        modal.classList.add('show');

        // Show the exit button
        exitContainer.classList.remove('hidden');
        exitContainer.classList.add('show');

        // Update system information
        updateInfo();
      }, 500);
    }, 3000);
  }

  // Close Hacker Mode
  function closeHackerMode() {
    if (!isActive) return;
    isActive = false;

    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    fabButton.classList.remove('hidden');
    document.body.style.overflow = 'auto'; // Re-enable background scrolling

    // Hide the exit button
    exitContainer.classList.add('hidden');
    exitContainer.classList.remove('show');

    // Reset screens
    activationScreen.style.display = 'block';
    activationScreen.style.opacity = '1';
    activationScreen.style.transform = 'translate(-50%, -50%) scale(0.8)';
    modal.classList.add('hidden');
    modal.classList.remove('show');

    // Stop music, glitch effects, and clear intervals
    stopCyberMusic();
    stopGlitchEffect();
    if (timeInterval) {
      clearInterval(timeInterval);
    }
  }

  // Event Listeners
  if (fabButton) {
    fabButton.addEventListener('click', openHackerMode);
  }

  if (exitBtn) {
    exitBtn.addEventListener('click', closeHackerMode);
  }

  // IMPORTANT: Background clicks do NOT close hacker mode
  // Only the EXIT button closes the interface
  // No click event on overlay to prevent accidental exits

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isActive) {
      closeHackerMode();
    }
    if (e.key === 'h' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const tag = e.target.tagName.toLowerCase();
      if (tag !== 'input' && tag !== 'textarea') {
        if (isActive) {
          closeHackerMode();
        } else {
          openHackerMode();
        }
        e.preventDefault();
      }
    }
  });

  console.log('✓ Advanced Hacker Mode initialized');
  console.log('Press H or click the floating button to activate');
}