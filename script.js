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
    // Connects directly to the live environment 24-hour weather data channel
    const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast');
    if (!response.ok) throw new Error('API server link broke');
    
    const resPayload = await response.json();
    
    // Extract parameters from the internal response format structure
    const record = resPayload.data.records[0];
    const generalForecast = record.general.forecast;
    const lowTemp = record.general.temperature.low;
    const highTemp = record.general.temperature.high;
    const humidityHigh = record.general.relativeHumidity.high;
    
    const computedTemp = Math.round((lowTemp + highTemp) / 2);
    document.getElementById('temperature').textContent = `${computedTemp}°C`;
    document.getElementById('condition').textContent = generalForecast;
    
    // Calculate rain predictions based on conditions and humidity data points
    let rainStatus = "Unlikely to disrupt your day";
    const conditionLower = generalForecast.toLowerCase();
    
    if (conditionLower.includes('thundery') || conditionLower.includes('heavy')) {
      rainStatus = "Heavy downpours imminent";
    } else if (conditionLower.includes('rain') || conditionLower.includes('shower') || conditionLower.includes('passing')) {
      rainStatus = "Showers rolling through the region";
    } else if (humidityHigh > 85) {
      rainStatus = "High humidity indicates oncoming dampness";
    } else if (conditionLower.includes('cloudy')) {
      rainStatus = "Overcast overcast; rain possibility low";
    }
    document.getElementById('rain-prediction').textContent = `Rain Forecast: ${rainStatus}`;
    
    // Assign icons and literary mood quotes based on parsed metrics
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
    console.error('Data pipeline exception triggered:', error);
    document.getElementById('condition').textContent = "Sky unreadable";
    document.getElementById('rain-prediction').textContent = "Rain Forecast: Disconnected";
    document.getElementById('weather-icon-box').textContent = "🕯️";
    document.getElementById('renaissance-mood').textContent = "“The horizons are temporarily lost to our view.”";
  }
}

// System color adaptation function
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

fetchSingaporeWeather();
setInterval(fetchSingaporeWeather, 15 * 60 * 1000); // Check updates every 15 minutes
