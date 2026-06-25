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
    // Connects to an unprotected CORS-compliant open forecast proxy
    const response = await fetch('https://wttr.in');
    if (!response.ok) throw new Error('Proxy connection drop state');
    
    const data = await response.json();
    
    // Extract real-time metrics safely from JSON schema
    const currentCondition = data.current_condition[0];
    const currentTemp = currentCondition.temp_C;
    const weatherDesc = currentCondition.weatherDesc[0].value;
    
    // Scan future hourly windows to aggregate exact rainfall projections
    const todayWeather = data.weather[0];
    const rainChancePercent = todayWeather.hourly[0].chanceofrain;
    
    document.getElementById('temperature').textContent = `${currentTemp}°C`;
    document.getElementById('condition').textContent = weatherDesc;
    
    // Map custom text alerts based on rain percentage outputs
    let rainStatus = "Unlikely to disturb your studies";
    if (parseInt(rainChancePercent) > 70) {
      rainStatus = `Heavy downpours imminent (${rainChancePercent}% chance)`;
    } else if (parseInt(rainChancePercent) > 35) {
      rainStatus = `Showers expected nearby (${rainChancePercent}% chance)`;
    } else if (parseInt(rainChancePercent) > 15) {
      rainStatus = `Overcast skies formatting (${rainChancePercent}% chance)`;
    }
    document.getElementById('rain-prediction').textContent = `Rain Forecast: ${rainStatus}`;
    
    // Match definitions to assign artwork strings and visual weather markers
    const lowerDesc = weatherDesc.toLowerCase();
    let chosenMood = moodDatabase.default;
    let chosenIcon = iconDatabase.cloudy;
    
    if (lowerDesc.includes('sunny') || lowerDesc.includes('clear')) {
      chosenMood = moodDatabase.clear;
      chosenIcon = iconDatabase.clear;
    } else if (lowerDesc.includes('partly cloudy')) {
      chosenMood = moodDatabase.cloudy;
      chosenIcon = iconDatabase.partlyCloudy;
    } else if (lowerDesc.includes('cloudy') || lowerDesc.includes('overcast')) {
      chosenMood = moodDatabase.cloudy;
      chosenIcon = iconDatabase.cloudy;
    } else if (lowerDesc.includes('thunder') || lowerDesc.includes('storm')) {
      chosenMood = moodDatabase.thunderstorm;
      chosenIcon = iconDatabase.thunderstorm;
    } else if (lowerDesc.includes('light rain') || lowerDesc.includes('drizzle') || lowerDesc.includes('patchy')) {
      chosenMood = moodDatabase.rain;
      chosenIcon = iconDatabase.lightRain;
    } else if (lowerDesc.includes('rain') || lowerDesc.includes('shower')) {
      chosenMood = moodDatabase.rain;
      chosenIcon = iconDatabase.heavyRain;
    } else if (lowerDesc.includes('mist') || lowerDesc.includes('fog') || lowerDesc.includes('haze')) {
      chosenMood = moodDatabase.default;
      chosenIcon = iconDatabase.mist;
    }
    
    document.getElementById('weather-icon-box').textContent = chosenIcon;
    document.getElementById('renaissance-mood').textContent = chosenMood;
    
  } catch (error) {
    console.error('Proxy loading channel alert exception:', error);
    document.getElementById('condition').textContent = "Sky unreadable";
    document.getElementById('rain-prediction').textContent = "Rain Forecast: Disconnected";
    document.getElementById('weather-icon-box').textContent = "🕯️";
    document.getElementById('renaissance-mood').textContent = "“The horizons are temporarily lost to our view.”";
  }
}

// Notion system canvas background detection script element
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
