const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

  await supabase.from('search_history').insert({
    city,
    temperature: weather.temp_C,
    weather_desc: weatherDesc,
    humidity: weather.humidity,
    wind_speed: weather.windspeedKmph,
  });

  loadHistory();
}

async function loadHistory() {
  const { data } = await supabase
    .from('search_history')
    .select('city, searched_at')
    .order('searched_at', { ascending: false })
    .limit(10);

  const list = document.getElementById('historyList');
  list.innerHTML = (data || [])
    .map(h => `<li>${h.city} — ${new Date(h.searched_at).toLocaleString('pt-BR')}</li>`)
    .join('');
}

loadHistory();
