const moodDatabase = {
  clear: "“A golden sky reminiscent of a Florentine noon, bathed in pure, clear light.”",
  cloudy: "“Chiaroscuro skies weave dramatic shadows, casting a solemn grace over the city below.”",
  rain: "“Soft, melancholic weeping from the heavens—like oil paint running gently across an ancient canvas.”",
  thunderstorm: "“Divine tempests echo through the firmament, staging a performance of wild, unbridled romanticism.”",
  default: "“Nature composes its ever-shifting tapestry, changing the colors of our earthly realm.”"
};

const iconDatabase = {
  clear: "☀️",
  partlyCloudy: "⛅",
  cloudy: "☁️",
  lightRain: "🌦️",
  heavyRain: "🌧️",
  thunderstorm: "⛈️",
  mist: "🌫️"
};

async function fetchSingaporeWeather() {
  try {
    // Queries the corrected real-time 24-hr data feed endpoint architecture
    const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast');
    if (!response.ok) throw new Error('API operational gateway mismatch');
    
    const resPayload = await response.json();
    
    // Fallback and deep scanning parsing layer to ensure stability across structural updates
    let records = null;
    if (resPayload && resPayload.data && resPayload.data.records) {
      records = resPayload.data.records;
    } else if (resPayload && resPayload.records) {
      records = resPayload.records;
    }
    
    if (!records || !records.general) throw new Error('Invalid metadata configuration format');
    
    const generalData = records.general;
    const generalForecast = generalData.forecast || "Cloudy";
    const lowTemp = generalData.temperature ? generalData.temperature.low : 26;
    const highTemp = generalData.temperature ? generalData.temperature.high : 32;
    
    // Look up humidity safe boundaries to predict local precipitation
    const humidityHigh = (generalData.relativeHumidity && generalData.relativeHumidity.high) ? generalData.relativeHumidity.high : 80;
    
    const computedTemp = Math.round((lowTemp + highTemp) / 2);
    document.getElementById('temperature').textContent = `${computedTemp}°C`;
    document.getElementById('condition').textContent = generalForecast;
    
    // Parse predictions and map descriptive summaries
    let rainStatus = "Unlikely to disturb your studies";
    const conditionLower = generalForecast.toLowerCase();
    
    if (conditionLower.includes('thunder') || conditionLower.includes('heavy')) {
      rainStatus = "Heavy downpours imminent";
    } else if (conditionLower.includes('rain') || conditionLower.includes('shower') || conditionLower.includes('passing')) {
      rainStatus = "Showers rolling through the region";
    } else if (humidityHigh > 85) {
      rainStatus = "High humidity indicates oncoming dampness";
    } else if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
      rainStatus = "Overcast; precipitation risk is minimal";
    }
    document.getElementById('rain-prediction').textContent = `Rain Forecast: ${rainStatus}`;
    
    // Set icons and literary matches
    let chosenMood = moodDatabase.default;
    let chosenIcon = iconDatabase.cloudy; 
    
    if (conditionLower.includes('clear') || conditionLower.includes('fair')) {
      chosenMood = moodDatabase.clear;
      chosenIcon = iconDatabase.clear;
    } else if (conditionLower.includes('partly cloudy')) {
      chosenMood = moodDatabase.cloudy;
      chosenIcon = iconDatabase.partlyCloudy;
    } else if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
      chosenMood = moodDatabase.cloudy;
      chosenIcon = iconDatabase.cloudy;
    } else if (conditionLower.includes('thunder')) {
      chosenMood = moodDatabase.thunderstorm;
      chosenIcon = iconDatabase.thunderstorm;
    } else if (conditionLower.includes('light rain') || conditionLower.includes('light shower') || conditionLower.includes('passing')) {
      chosenMood = moodDatabase.rain;
      chosenIcon = iconDatabase.lightRain;
    } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
      chosenMood = moodDatabase.rain;
      chosenIcon = iconDatabase.heavyRain;
    } else if (conditionLower.includes('mist') || conditionLower.includes('haze')) {
      chosenMood = moodDatabase.default;
      chosenIcon = iconDatabase.mist;
    }
    
    document.getElementById('weather-icon-box').textContent = chosenIcon;
    document.getElementById('renaissance-mood').textContent = chosenMood;
    
  } catch (error) {
    console.error('Data layout pipeline warning state:', error);
    document.getElementById('condition').textContent = "Sky unreadable";
    document.getElementById('rain-prediction').textContent = "Rain Forecast: Disconnected";
    document.getElementById('weather-icon-box').textContent = "🕯️";
    document.getElementById('renaissance-mood').textContent = "“The horizons are temporarily lost to our view.”";
  }
}

// Notion system container interface matching algorithm
(function() {
  function matchNotionTheme() {
    try {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.style.setProperty('background', isDark ? '#191919' : 'transparent', 'important');
      document.documentElement.style.setProperty('background', isDark ? '#191919' : 'transparent', 'important');
    } catch(e) {
      document.body.style.background = 'transparent';
    }
  }
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(matchNotionTheme);
  }
  matchNotionTheme();
})();

fetchSingaporeWeather();
setInterval(fetchSingaporeWeather, 15 * 60 * 1000);
