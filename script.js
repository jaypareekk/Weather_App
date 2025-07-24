const apiKey = '#####3#####33####3##'; 

async function getWeather() {
  let city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  if (!city.includes(",")) {
    city = `${city},IN`;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Filter forecasts to get data around 12:00 PM each day
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    let output = `<h2>${data.city.name}, ${data.city.country}</h2>`;

    dailyForecasts.forEach(day => {
      const date = new Date(day.dt_txt).toDateString();
      output += `
        <div style="margin-bottom: 10px;">
          <strong>${date}</strong><br>
          🌡️ Temp: ${day.main.temp}°C<br>
          ☁️ Weather: ${day.weather[0].description}<br>
          💧 Humidity: ${day.main.humidity}%<br>
          🌬️ Wind: ${day.wind.speed} m/s
        </div>
      `;
    });

    resultDiv.innerHTML = output;

  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
