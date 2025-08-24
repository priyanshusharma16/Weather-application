const apiKey = "729c8875d15403d78f9a8792a184580e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("cityInput");
const weatherBox = document.querySelector(".weather-box");
const errorBox = document.querySelector(".error");

const tempEl = document.getElementById("temperature");
const cityEl = document.getElementById("cityName");
const descEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
      weatherBox.classList.add("hide");
      errorBox.classList.remove("hide");
    } else {
      const data = await response.json();

      tempEl.innerText = Math.round(data.main.temp) + "°C";
      cityEl.innerText = data.name;
      descEl.innerText = data.weather[0].description;
      humidityEl.innerText = data.main.humidity + "%";
      windEl.innerText = data.wind.speed + " km/h";

      // Convert main weather to lowercase for safe comparison
      const weatherMain = data.weather[0].main.toLowerCase();

      // Weather icon selection
      switch (weatherMain) {
        case "clouds":
          weatherIcon.src = "cloud.png";
          break;
        case "clear":
          weatherIcon.src = "clear.png";
          break;
        case "rain":
        case "drizzle":
          weatherIcon.src = "rain.png";
          break;
        case "mist":
          weatherIcon.src = "mist.png";
          break;
        case "snow":
          weatherIcon.src = "snow.png";
          break;
        default:
          weatherIcon.src = "clear.png";
      }

      errorBox.classList.add("hide");
      weatherBox.classList.remove("hide");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
