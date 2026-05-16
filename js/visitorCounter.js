// Visitor Counter - Reliable localStorage + optional backend sync
// Works on any static host, with optional server integration

// Format number with commas
function formatNumber(num) {
  return Number(num).toLocaleString('en-US');
}

// Storage keys
const STORAGE_TOTAL_KEY = 'visitor_total_count';
const STORAGE_TODAY_KEY = 'visitor_today_count';
const STORAGE_TODAY_DATE_KEY = 'visitor_today_date';
const STORAGE_VISITED_KEY = 'visitor_visited_today';

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// Get visitor counts from localStorage
function getLocalCounts() {
  const today = getTodayDate();
  const storedDate = localStorage.getItem(STORAGE_TODAY_DATE_KEY);
  
  // Reset today's count if date changed
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

// Increment counts
function incrementCounts() {
  const counts = getLocalCounts();
  counts.total += 1;
  counts.today += 1;
  saveCounts(counts.total, counts.today);
  return counts;
}

// Check if user already visited today
function hasVisitedToday() {
  return localStorage.getItem(STORAGE_VISITED_KEY) === getTodayDate();
}

// Mark today's visit
function markVisited() {
  localStorage.setItem(STORAGE_VISITED_KEY, getTodayDate());
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

// Try to sync with backend server (optional)
async function syncWithServer() {
  try {
    const endpoints = ['/api/visit', 'http://localhost:3000/api/visit'];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          timeout: 2000
        });
        if (response.ok) {
          console.debug('[visitorCounter] Synced with server:', endpoint);
          return true;
        }
      } catch (e) {
        // Continue to next endpoint
      }
    }
  } catch (error) {
    console.debug('[visitorCounter] Server sync skipped (no server available)');
  }
  return false;
}

// Main visitor counter initialization
async function initVisitorCounter() {
  try {
    console.debug('[visitorCounter] Initializing visitor counter');
    
    // Check if user already visited today
    if (!hasVisitedToday()) {
      console.debug('[visitorCounter] First visit today - incrementing counters');
      const counts = incrementCounts();
      markVisited();
      
      // Try to sync with server in background
      syncWithServer().catch(e => console.debug('[visitorCounter] Sync failed:', e));
    } else {
      console.debug('[visitorCounter] Return visitor - using localStorage');
    }
    
    // Display counts from localStorage
    const counts = getLocalCounts();
    updateDOMCounts(counts.total, counts.today);
    
  } catch (error) {
    console.error('[visitorCounter] Error initializing counter:', error);
    updateDOMCounts(0, 0);
  }
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisitorCounter);
} else {
  initVisitorCounter();
}
