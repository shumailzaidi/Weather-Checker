const apiKey = "e37aa27c1118f6fbb1824b6207f3c0f7";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const errorMsg = document.getElementById("errorMsg");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    errorMsg.textContent = "Please Enter Correct City Name";
    weatherResult.style.display = "none";
    return;
  }
  getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      errorMsg.textContent = "Please Enter Correct City Name";
      weatherResult.style.display = "none";
    } else {
      errorMsg.textContent = "";
      displayWeather(data);
    }
  } catch (error) {
    errorMsg.textContent = "Error fetching data. Try again later.";
    weatherResult.style.display = "none";
  }
}

function displayWeather(data) {
  const cityName = document.getElementById("cityName");
  const weatherCondition = document.getElementById("weatherCondition");
  const temperature = document.getElementById("temperature");
  const wind = document.getElementById("wind");
  const humidity = document.getElementById("humidity");
  const weatherIcon = document.getElementById("weatherIcon");

  cityName.textContent = data.name;
  weatherCondition.textContent = data.weather[0].main;
  temperature.textContent = Math.round(data.main.temp);
  wind.textContent = data.wind.speed;
  humidity.textContent = data.main.humidity;

  const condition = data.weather[0].main.toLowerCase();
  let iconClass = "fa-cloud";

  if (condition.includes("clear")) iconClass = "fa-sun";
  else if (condition.includes("cloud")) iconClass = "fa-cloud";
  else if (condition.includes("rain")) iconClass = "fa-cloud-showers-heavy";
  else if (condition.includes("drizzle")) iconClass = "fa-cloud-rain";
  else if (condition.includes("snow")) iconClass = "fa-snowflake";
  else if (condition.includes("thunder")) iconClass = "fa-bolt";
  else if (condition.includes("mist") || condition.includes("fog")) iconClass = "fa-smog";

  weatherIcon.className = `fa ${iconClass}`;
  weatherResult.style.display = "block";
}
