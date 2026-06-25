// Aesthetic, romanticized Renaissance mood mapping based on current weather text strings
const moodDatabase = {
  clear: "“A golden sky reminiscent of a Florentine noon, bathed in pure, clear light.”",
  cloudy: "“Chiaroscuro skies weave dramatic shadows, casting a solemn grace over the city below.”",
  rain: "“Soft, melancholic weeping from the heavens—like oil paint running gently across an ancient canvas.”",
  thunderstorm: "“Divine tempests echo through the firmament, staging a performance of wild, unbridled romanticism.”",
  default: "“Nature composes its ever-shifting tapestry, changing the colors of our earthly realm.”"
};

async function fetchSingaporeWeather() {
  try {
    // Queries the live 24-hour Singapore weather forecast API
    const response = await fetch('https://data.gov.sg');
    if (!response.ok) throw new Error('Network response failure');
    
    const data = await response.json();
    
    // Extract weather metrics safely from the payload architecture
    const generalForecast = data.items[0].general.forecast;
    const lowTemp = data.items[0].general.temperature.low;
    const highTemp = data.items[0].general.temperature.high;
    
    // Compute an active estimated baseline temperature standard
    const currentEstimate = Math.round((lowTemp + highTemp) / 2);
    
    // Update interface nodes directly
    document.getElementById('temperature').textContent = `${currentEstimate}°C`;
    document.getElementById('condition').textContent = generalForecast;
    
    // Match up the classical mood text string strings smoothly
    const lowerCondition = generalForecast.toLowerCase();
    let selectedMood = moodDatabase.default;
    
    if (lowerCondition.includes('clear') || lowerCondition.includes('fair')) {
      selectedMood = moodDatabase.clear;
    } else if (lowerCondition.includes('cloudy') || lowerCondition.includes('overcast')) {
      selectedMood = moodDatabase.cloudy;
    } else if (lowerCondition.includes('thunderstorm')) {
      selectedMood = moodDatabase.thunderstorm;
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('shower')) {
      selectedMood = moodDatabase.rain;
    }
    
    document.getElementById('renaissance-mood').textContent = selectedMood;
    
  } catch (error) {
    console.error('Weather error:', error);
    document.getElementById('condition').textContent = "Atmosphere obscured";
    document.getElementById('renaissance-mood').textContent = "“The horizons are temporarily lost to our view.”";
  }
}

// --- SECURE INLINE CODE TO ELIMINATE FLASHING BACKGROUNDS ---
(function() {
  function matchNotionTheme() {
    try {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.style.background = isDark ? '#191919' : 'transparent';
      document.documentElement.style.background = isDark ? '#191919' : 'transparent';
    } catch(e) {
      document.body.style.background = 'transparent';
    }
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(matchNotionTheme);
  }
  matchNotionTheme();
})();

// Initialize system metrics on application load
fetchSingaporeWeather();

// Check for live meteorological updates automatically every 15 minutes
setInterval(fetchSingaporeWeather, 15 * 60 * 1000);
