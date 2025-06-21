const countryData = {
  india:   { total: 1500, realtime: 300, ads: 50, profiles: 200, banner: 390, video: 590, home: 490 },
  usa:     { total: 2500, realtime: 767, ads: 109, profiles: 589, banner: 488, video: 332, home: 702 },
  germany: { total: 120, realtime: 289, ads: 30, profiles: 180, banner: 244, video: 157, home: 167 },
  brazil:  { total: 18000, realtime: 468, ads: 60, profiles: 409, banner: 345, video: 290, home: 563 },
  japan:   { total: 2000, realtime: 697, ads: 70, profiles: 309, banner: 388, video: 224, home: 782 }
};
let currentCountry = 'india';
let simulationInterval;

function updateDashboard() {
  currentCountry = document.getElementById('countrySelect').value;
  const data = countryData[currentCountry];
  
  // Update values with animation
  animateValue('totalUsers', data.total, 1000, v => v.toString().padStart(3, '0'));
  animateValue('realtimeUsers', data.realtime, 1000, v => v.toString().padStart(3, '0'));
  animateValue('ads', data.ads, 1000);
  animateValue('profiles', data.profiles, 1000);
  animateValue('banner', data.banner, 1000);
  animateValue('video', data.video, 1000);
  animateValue('home', data.home, 1000);
  
  // Clear and restart simulation
  clearInterval(simulationInterval);
  simulationInterval = setInterval(simulateRealtime, 2500);
}

function animateValue(id, end, duration, formatter = v => v) {
  const obj = document.getElementById(id);
  const start = parseInt(obj.textContent) || 0;
  const startTime = performance.now();
  
  function updateValue(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(start + progress * (end - start));
    
    obj.textContent = formatter(value);
    
    if (progress < 1) {
      requestAnimationFrame(updateValue);
    }
  }
  
  requestAnimationFrame(updateValue);
}

function simulateRealtime() {
  const base = countryData[currentCountry].realtime;
  const randomChange = Math.floor(Math.random() * 21) - 10; // ±10
  const newValue = Math.max(0, base + randomChange);
  
  animateValue('realtimeUsers', newValue, 500, v => v.toString().padStart(3, '0'));
}

// Initialize
updateDashboard();