async function searchWeather() {

  const city = document.getElementById('cityInput').value;

  const url = `https://wttr.in/${city}?format=j1`;

  const response = await fetch(url);

  const data = await response.json();

  const weather = data.current_condition[0];

  document.getElementById('weatherResult').innerHTML = `
    <h2>${city}</h2>
    <p>Temperatura: ${weather.temp_C}°C</p>
    <p>Clima: ${weather.weatherDesc[0].value}</p>
    <p>Umidade: ${weather.humidity}%</p>
    <p>Vento: ${weather.windspeedKmph} km/h</p>
  `;
}
