// ========================================
// HACKER MODE FUNCTIONALITY
// ========================================

// Initialize Hacker Mode when page loads
window.addEventListener('DOMContentLoaded', function() {
  initHackerMode();
});

function initHackerMode() {
  var isActive = false;
  var latestInfo = null;
  var consentGranted = localStorage.getItem('hackerConsent') === 'granted';

  var overlay = document.getElementById('hacker-overlay');
  var exitBtn = document.getElementById('exit-hacker');
  var hackerSound = document.getElementById('hacker-sound');
  var fabButton = document.getElementById('fab');
  var consentModal = document.getElementById('consent-modal');
  var allowBtn = document.getElementById('allow-btn');
  var cancelBtn = document.getElementById('cancel-btn');
  var infoPanel = document.getElementById('info-panel');
  var infoBody = document.getElementById('info-body');
  var sendEmailBtn = document.getElementById('send-email-btn');
  var closePanelBtn = document.getElementById('close-panel-btn');

  if (!overlay) {
    console.error('Hacker Mode: Overlay element not found!');
    return;
  }

  if (!fabButton || !consentModal || !allowBtn || !cancelBtn || !infoPanel || !infoBody || !sendEmailBtn || !closePanelBtn) {
    console.warn('Hacker Mode: Some UI elements are missing, but core mode will still work.');
  }

  var ipApiUrl = 'https://ipapi.co/json/';

  function openConsentModal() {
    if (consentModal) {
      consentModal.classList.add('active');
      consentModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeConsentModal() {
    if (consentModal) {
      consentModal.classList.remove('active');
      consentModal.setAttribute('aria-hidden', 'true');
    }
  }

  function showInfoPanel() {
    if (infoPanel) {
      infoPanel.classList.add('active');
    }
  }

  function hideInfoPanel() {
    if (infoPanel) {
      infoPanel.classList.remove('active');
    }
  }

  function getDeviceType() {
    var ua = navigator.userAgent || '';
    if (/mobile|tablet|iphone|ipad|android|windows phone|kindle/i.test(ua)) {
      return 'Mobile/Tablet';
    }
    return 'Desktop/Laptop';
  }

  function renderInfo(info) {
    if (!infoBody) {
      return;
    }

    if (info.error) {
      infoBody.innerHTML = '<p style="color:#ff8a80;">Unable to collect full info: ' + info.error + '</p>';
      return;
    }

    var locationText = info.location || 'Not available';
    var organizationText = info.org || 'Not available';
    var postalText = info.postal || 'Not available';

    infoBody.innerHTML = '<dl>' +
      '<dt>Browser</dt><dd>' + sanitize(info.userAgent) + '</dd>' +
      '<dt>Device</dt><dd>' + sanitize(info.deviceType) + '</dd>' +
      '<dt>IP</dt><dd>' + sanitize(info.ip) + '</dd>' +
      '<dt>Location</dt><dd>' + sanitize(locationText) + '</dd>' +
      '<dt>Network</dt><dd>' + sanitize(organizationText) + '</dd>' +
      '<dt>Postal</dt><dd>' + sanitize(postalText) + '</dd>' +
      '<dt>Consent</dt><dd>' + sanitize(info.consentTimestamp) + '</dd>' +
      '</dl>';
  }

  function sanitize(value) {
    return String(value || '').replace(/[<>&"']/g, function(ch) {
      return {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;'
      }[ch];
    });
  }

  function composeMailBody(info) {
    return encodeURIComponent(
      'Hello,%0D%0A%0D%0AHere is the collected device information:%0D%0A%0D%0A' +
      'Browser: ' + info.userAgent + '%0D%0A' +
      'Device type: ' + info.deviceType + '%0D%0A' +
      'IP address: ' + info.ip + '%0D%0A' +
      'Location: ' + (info.location || 'Not available') + '%0D%0A' +
      'Network: ' + (info.org || 'Not available') + '%0D%0A' +
      'Postal: ' + (info.postal || 'Not available') + '%0D%0A' +
      'Consent granted: ' + info.consentTimestamp + '%0D%0A%0D%0A'
    );
  }

  async function collectUserInfo() {
    if (!infoBody) return null;

    infoBody.innerHTML = '<p>Fetching device information…</p>';
    showInfoPanel();

    var info = {
      userAgent: navigator.userAgent || 'Unknown',
      deviceType: getDeviceType(),
      consentTimestamp: new Date().toLocaleString(),
      ip: 'Unknown',
      location: 'Unknown',
      org: 'Unknown',
      postal: 'Unknown'
    };

    try {
      var response = await fetch(ipApiUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('API returned ' + response.status);
      }
      var data = await response.json();
      info.ip = data.ip || info.ip;
      info.location = [data.city, data.region, data.country_name].filter(Boolean).join(', ') || info.location;
      info.org = data.org || info.org;
      info.postal = data.postal || info.postal;
    } catch (error) {
      info.error = error.message || 'Unable to reach public IP service';
    }

    latestInfo = info;
    renderInfo(info);
    return info;
  }

  function openMailClient() {
    if (!latestInfo) {
      return;
    }

    var subject = encodeURIComponent('Collected device information');
    var body = composeMailBody(latestInfo);
    window.location.href = 'mailto:info.riazulislam99@gmail.com?subject=' + subject + '&body=' + body;
  }

  function activateHackerMode() {
    isActive = true;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    playHackingMusic();
  }

  function deactivateHackerMode() {
    isActive = false;
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    hideInfoPanel();
    if (hackerSound) {
      hackerSound.pause();
      hackerSound.currentTime = 0;
    }
  }

  function playHackingMusic() {
    if (!hackerSound) {
      return;
    }

    hackerSound.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    hackerSound.loop = true;
    hackerSound.volume = 0.65;
    hackerSound.load();

    var playPromise = hackerSound.play();
    if (playPromise !== undefined) {
      playPromise.catch(function(error) {
        console.log('Audio playback prevented by browser:', error);
      });
    }
  }

  function handleFabClick() {
    if (isActive) {
      deactivateHackerMode();
      return;
    }

    if (consentGranted) {
      activateHackerMode();
      collectUserInfo();
      return;
    }

    openConsentModal();
  }

  function handleAllow() {
    consentGranted = true;
    localStorage.setItem('hackerConsent', 'granted');
    closeConsentModal();
    activateHackerMode();
    collectUserInfo();
  }

  function handleCancel() {
    closeConsentModal();
  }

  if (fabButton) {
    fabButton.addEventListener('click', function() {
      handleFabClick();
    });
  }

  if (allowBtn) {
    allowBtn.addEventListener('click', function() {
      handleAllow();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      handleCancel();
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', function() {
      openMailClient();
    });
  }

  if (closePanelBtn) {
    closePanelBtn.addEventListener('click', function() {
      hideInfoPanel();
    });
  }

  if (exitBtn) {
    exitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      deactivateHackerMode();
    });
  }

  document.addEventListener('keydown', function(e) {
    if ((e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.altKey && !e.metaKey) {
      var tag = e.target.tagName.toLowerCase();
      if (tag !== 'input' && tag !== 'textarea') {
        handleFabClick();
        e.preventDefault();
      }
    }

    if (e.key === 'Escape' && isActive) {
      deactivateHackerMode();
    }
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      deactivateHackerMode();
    }
  });

  console.log('✓ Hacker Mode initialized');
  console.log('Use the green FAB to activate Hacker Mode with consent.');
}


