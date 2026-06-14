async function searchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  const url = `https://wttr.in/${city}?format=j1`;
  const response = await fetch(url);
  const data = await response.json();

  const weather = data.current_condition[0];
  const weatherDesc = weather.weatherDesc[0].value;

  document.getElementById('weatherResult').innerHTML = `
    <h2>${city}</h2>
    <p>Temperatura: ${weather.temp_C}°C</p>
    <p>Clima: ${weatherDesc}</p>
    <p>Umidade: ${weather.humidity}%</p>
    <p>Vento: ${weather.windspeedKmph} km/h</p>
  `;

  const days = data.weather.slice(0, 3);
  document.getElementById('forecast').innerHTML = days.map(d => {
    const desc = d.hourly[4]?.weatherDesc[0]?.value || d.hourly[0]?.weatherDesc[0]?.value || '';
    return `
      <div class="forecast-card">
        <div class="forecast-day">${new Date(d.date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}</div>
        <div class="forecast-desc">${desc}</div>
        <div class="forecast-temp">${d.mintempC}° / ${d.maxtempC}°</div>
      </div>
    `;
  }).join('');
}

