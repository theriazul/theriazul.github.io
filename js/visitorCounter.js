// Visitor Counter using CountAPI (free, no backend required)
// Works on GitHub Pages and static hosting

const COUNTAPI_BASE = 'https://api.countapi.xyz';
const NAMESPACE = 'theriazul_portfolio';
const TOTAL_KEY = 'total_visitors';
const TODAY_KEY = 'today_visitors';

// Get today's date in YYYY-MM-DD format
function getTodayKey() {
  const today = new Date().toISOString().split('T')[0];
  return `${TODAY_KEY}_${today}`;
}

// Format number with commas
function formatNumber(num) {
  return Number(num).toLocaleString('en-US');
}

// Increment total visitor count
async function incrementTotalVisitors() {
  try {
    console.debug('[visitorCounter] Incrementing total count');
    const url = `${COUNTAPI_BASE}/hit/${NAMESPACE}/${TOTAL_KEY}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Failed to increment total: ' + resp.status);
    const data = await resp.json();
    console.debug('[visitorCounter] Total count updated:', data.value);
    return data.value;
  } catch (error) {
    console.warn('[visitorCounter] Failed to increment total:', error);
    return null;
  }
}

// Increment today's visitor count
async function incrementTodayVisitors() {
  try {
    console.debug('[visitorCounter] Incrementing today count');
    const todayKey = getTodayKey();
    const url = `${COUNTAPI_BASE}/hit/${NAMESPACE}/${todayKey}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Failed to increment today: ' + resp.status);
    const data = await resp.json();
    console.debug('[visitorCounter] Today count updated:', data.value);
    return data.value;
  } catch (error) {
    console.warn('[visitorCounter] Failed to increment today:', error);
    return null;
  }
}

// Get current stats
async function getVisitorStats() {
  try {
    console.debug('[visitorCounter] Fetching stats');
    const todayKey = getTodayKey();
    
    // Fetch total count
    const totalUrl = `${COUNTAPI_BASE}/get/${NAMESPACE}/${TOTAL_KEY}`;
    const totalResp = await fetch(totalUrl);
    const totalData = totalResp.ok ? await totalResp.json() : { value: 0 };
    
    // Fetch today's count
    const todayUrl = `${COUNTAPI_BASE}/get/${NAMESPACE}/${todayKey}`;
    const todayResp = await fetch(todayUrl);
    const todayData = todayResp.ok ? await todayResp.json() : { value: 0 };
    
    console.debug('[visitorCounter] Stats fetched:', { total: totalData.value, today: todayData.value });
    return { total: totalData.value || 0, today: todayData.value || 0 };
  } catch (error) {
    console.warn('[visitorCounter] Failed to fetch stats:', error);
    return { total: 0, today: 0 };
  }
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

// Check if user already visited today (to avoid double-counting)
function hasVisitedToday() {
  const lastVisitDate = localStorage.getItem('visitor_last_visit_date');
  const today = new Date().toISOString().split('T')[0];
  
  if (lastVisitDate === today) {
    console.debug('[visitorCounter] User already visited today');
    return true;
  }
  return false;
}

// Mark today's visit
function markTodayVisit() {
  const today = new Date().toISOString().split('T')[0];
  localStorage.setItem('visitor_last_visit_date', today);
  console.debug('[visitorCounter] Marked visit for today');
}

// Main visitor counter initialization
async function initVisitorCounter() {
  try {
    console.debug('[visitorCounter] Initializing visitor counter');
    
    // Check if user already visited today
    const hasVisited = hasVisitedToday();
    
    if (!hasVisited) {
      // Increment both counts if first visit today
      console.debug('[visitorCounter] First visit today - incrementing counters');
      await incrementTotalVisitors();
      await incrementTodayVisitors();
      markTodayVisit();
    } else {
      // Just fetch current stats
      console.debug('[visitorCounter] Return visitor - fetching current stats');
    }
    
    // Fetch and display current stats
    const stats = await getVisitorStats();
    updateDOMCounts(stats.total, stats.today);
    
  } catch (error) {
    console.error('[visitorCounter] Error initializing counter:', error);
    // Fallback: show 0 instead of blank
    updateDOMCounts(0, 0);
  }
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisitorCounter);
} else {
  initVisitorCounter();
}

// Optional: Refresh stats every 30 seconds
setInterval(async () => {
  try {
    const stats = await getVisitorStats();
    updateDOMCounts(stats.total, stats.today);
  } catch (error) {
    console.warn('[visitorCounter] Auto-refresh failed:', error);
  }
}, 30000);
