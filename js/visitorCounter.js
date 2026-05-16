// Visitor Counter with backend support, CountAPI fallback, and local fallback

// Format number with commas
function formatNumber(num) {
  return Number(num).toLocaleString('en-US');
}

// Storage keys
const STORAGE_TOTAL_KEY = 'visitor_total_count';
const STORAGE_TODAY_KEY = 'visitor_today_count';
const STORAGE_TODAY_DATE_KEY = 'visitor_today_date';

// Backend endpoints
const SERVER_VISIT_ENDPOINT = '/api/visit';
const SERVER_STATS_ENDPOINT = '/api/stats';

// CountAPI configuration (fallback for static hosting)
const COUNTAPI_BASE = 'https://api.countapi.xyz';
const COUNTAPI_NAMESPACE = 'theriazul_portfolio';
const COUNTAPI_TOTAL_KEY = 'total_visitors';
const COUNTAPI_TODAY_KEY_PREFIX = 'today_visitors_';

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// Get visitor counts from localStorage
function getLocalCounts() {
  const today = getTodayDate();
  const storedDate = localStorage.getItem(STORAGE_TODAY_DATE_KEY);

  if (storedDate !== today) {
    localStorage.setItem(STORAGE_TODAY_DATE_KEY, today);
    localStorage.setItem(STORAGE_TODAY_KEY, '0');
  }

  const total = parseInt(localStorage.getItem(STORAGE_TOTAL_KEY) || '0', 10);
  const todayCount = parseInt(localStorage.getItem(STORAGE_TODAY_KEY) || '0', 10);

  return { total, today: todayCount };
}

// Save counts to localStorage
function saveCounts(total, today) {
  localStorage.setItem(STORAGE_TOTAL_KEY, String(total));
  localStorage.setItem(STORAGE_TODAY_KEY, String(today));
  localStorage.setItem(STORAGE_TODAY_DATE_KEY, getTodayDate());
}

// Increment counts locally
function incrementCounts() {
  const counts = getLocalCounts();
  counts.total += 1;
  counts.today += 1;
  saveCounts(counts.total, counts.today);
  return counts;
}

// Update DOM with visitor counts
function updateDOMCounts(total, today) {
  console.debug('[visitorCounter] Updating DOM:', { total, today });

  const totalElement = document.getElementById('visitor-total');
  const todayElement = document.getElementById('visitor-today');

  if (totalElement) {
    totalElement.textContent = formatNumber(total || 0);
    totalElement.setAttribute('data-value', total || 0);
  }

  if (todayElement) {
    todayElement.textContent = formatNumber(today || 0);
    todayElement.setAttribute('data-value', today || 0);
  }
}

// POST visit to backend server
async function recordServerVisit() {
  try {
    const response = await fetch(SERVER_VISIT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.ok;
  } catch (error) {
    console.debug('[visitorCounter] Server visit failed:', error);
    return false;
  }
}

// GET stats from backend server
async function fetchServerStats() {
  try {
    const response = await fetch(SERVER_STATS_ENDPOINT);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    return {
      total: parseInt(data.total || 0, 10),
      today: parseInt(data.today || 0, 10)
    };
  } catch (error) {
    console.debug('[visitorCounter] Server stats failed:', error);
    return null;
  }
}

// POST visit to CountAPI for static fallback
async function recordCountApiVisit() {
  try {
    const todayKey = `${COUNTAPI_TODAY_KEY_PREFIX}${getTodayDate()}`;
    const [totalResponse, todayResponse] = await Promise.all([
      fetch(`${COUNTAPI_BASE}/hit/${COUNTAPI_NAMESPACE}/${COUNTAPI_TOTAL_KEY}`),
      fetch(`${COUNTAPI_BASE}/hit/${COUNTAPI_NAMESPACE}/${todayKey}`)
    ]);

    if (!totalResponse.ok || !todayResponse.ok) {
      throw new Error('CountAPI hit failed');
    }

    const totalData = await totalResponse.json();
    const todayData = await todayResponse.json();

    return {
      total: parseInt(totalData.value || 0, 10),
      today: parseInt(todayData.value || 0, 10)
    };
  } catch (error) {
    console.debug('[visitorCounter] CountAPI visit failed:', error);
    return null;
  }
}

// Fallback local initialization when backend and CountAPI are unavailable
function initLocalVisitorCounts() {
  const counts = incrementCounts();
  updateDOMCounts(counts.total, counts.today);
}

// Main visitor counter initialization
async function initVisitorCounter() {
  try {
    console.debug('[visitorCounter] Initializing visitor counter');

    let stats = null;

    if (await recordServerVisit()) {
      stats = await fetchServerStats();
    }

    if (!stats) {
      stats = await recordCountApiVisit();
    }

    if (stats) {
      updateDOMCounts(stats.total, stats.today);
      return;
    }

    initLocalVisitorCounts();
  } catch (error) {
    console.error('[visitorCounter] Error initializing counter:', error);
    initLocalVisitorCounts();
  }
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisitorCounter);
} else {
  initVisitorCounter();
}
