const supabaseClient = window.supabase.createClient(
  "https://crpdixjvsaicijzuqrly.supabase.co",
  "sb_publishable_q-iv7aaRX81kGp08egW0EQ_Cj4IsEQh"
);

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

  await supabaseClient.from('search_history').insert({
    city,
    temperature: weather.temp_C,
    weather_desc: weatherDesc,
    humidity: weather.humidity,
    wind_speed: weather.windspeedKmph,
  });

  loadHistory();
}

let historyData = [];

function showHistoryWeather(id) {
  document.getElementById('forecast').innerHTML = '';

  const h = historyData.find(item => item.id === id);
  if (!h) return;
  document.getElementById('weatherResult').innerHTML = `
    <h2>${h.city}</h2>
    <p>Temperatura: ${h.temperature}°C</p>
    <p>Clima: ${h.weather_desc}</p>
    <p>Umidade: ${h.humidity}%</p>
    <p>Vento: ${h.wind_speed} km/h</p>
    <small style="color:#94a3b8">${new Date(h.searched_at).toLocaleString('pt-BR')}</small>
  `;
}

async function loadHistory() {
  const { data } = await supabaseClient
    .from('search_history')
    .select('id, city, temperature, weather_desc, humidity, wind_speed, searched_at')
    .order('searched_at', { ascending: false })
    .limit(10);

  historyData = data || [];

  const list = document.getElementById('historyList');
  list.innerHTML = historyData
    .map(h => `<li onclick="showHistoryWeather(${h.id})">${h.city} — ${new Date(h.searched_at).toLocaleString('pt-BR')}</li>`)
    .join('');
}

loadHistory();
