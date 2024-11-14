function formatDate() {
  let cityTime = document.querySelector("#current-city-time");
  let today = new Date();
  let day = today.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = today.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = today.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  cityTime.innerHTML = `${days[day]}, ${date} ${months[month]}`;
}
function updateWeather(city) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${city.data.city}`;

  let actualTemperature = document.querySelector(".temperature-value");
  actualTemperature.innerHTML = `${Math.round(city.data.temperature.current)}`;

  let feelsLikeTemperature = document.querySelector(".temperature-feels-like");
  // console.log(city.data.temperature.feels_like);
  feelsLikeTemperature.innerHTML = `${Math.round(
    city.data.temperature.feels_like
  )}`;

  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = `${Math.round(city.data.wind.speed)}km/h`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${Math.round(city.data.temperature.humidity)}%`;

  let weather_description = document.querySelector(".description");
  let updated_description = city.data.condition.description;

  weather_description.innerHTML = `${updated_description
    .charAt(0)
    .toUpperCase()}${updated_description.slice(1)}`;
  let weather_icon = document.querySelector(".current-city-weather-icon");
  weather_icon.innerHTML = `<img src="${city.data.condition.icon_url}"
                        alt="${city.data.condition.icon}">`;

  formatDate();
}

function updateCards(city) {
  let weatherForecastContainer = document.querySelector(
    ".weather-forecast-container"
  );

  let today = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const totalCards = 5;
  weatherForecastContainer.innerHTML = "";
  for (i = 1; i <= totalCards; i++) {
    let forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + i);
    let dayName = days[forecastDate.getDay()];
    let date = forecastDate.getDate();
    if (date < 10) {
      date = `0${date}`;
    } else {
      date = `${date}`;
    }
    weatherForecastContainer.innerHTML += `<div class="weather-forecast-cards">
                <div class="forecast-time">
                ${dayName},${date}
                </div>
                <div class="forecast-icon">
                <img src="${city.data.daily[i].condition.icon_url}"
                alt="${city.data.daily[i].condition.icon}">
                </div>
                <div class="forecast-temperatures"><p>
                <span class="temp-container"><span class="min-temperature temp-update">${Math.round(
                  city.data.daily[i].temperature.minimum
                )}</span><span>º</span></span><span class="back-slash">/</span><strong>
                
                <span class="temp-container"><span class="max-temperature temp-update">${Math.round(
                  city.data.daily[i].temperature.maximum
                )}</span><span>º</span></span></strong>
                </p></div>
                </div>`;
  }
}

function searchCity(response) {
  response.preventDefault();
  let apiKey = "2d8o4b96bdta6ee065c85fc43853285d";
  let cityElement = document.querySelector(".input-search-text");
  cityElement = cityElement.value;
  // let cityName = document.querySelector("#city-name");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement}&key=${apiKey}`;
  let foreCastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityElement}&key=${apiKey}`;
  // cityName.innerHTML = cityElement;
  // console.log(foreCastApiUrl);
  axios.get(apiUrl).then(updateWeather);
  axios.get(foreCastApiUrl).then(updateCards);
}

let searchButton = document.querySelector(".input-search-submit");
searchButton.addEventListener("click", searchCity);

let temp_update = document.querySelectorAll(".temp-update");
let temp_unit = document.querySelectorAll(".temp-unit");
temp_update.forEach((temp) => {
  temp.addEventListener("dblclick", () => {
    convertAllTemperatures();
  });
});
function convertAllTemperatures() {
  let isCelsius = temp_unit[0].innerHTML === "ºC";
  temp_update.forEach((temp) => {
    let current_temp = parseFloat(temp.innerHTML);
    isCelsius
      ? (temp.innerHTML = Math.round((9 / 5) * current_temp + 32))
      : (temp.innerHTML = Math.round((current_temp - 32) * (5 / 9)));
  });

  temp_unit.forEach((unit) => {
    isCelsius ? (unit.innerHTML = "ºF") : (unit.innerHTML = "ºC");
  });
}

let defaultCity = "India";
let apiKey = "2d8o4b96bdta6ee065c85fc43853285d";
let cityName = document.querySelector("#city-name");
cityName.innerHTML = defaultCity;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}`;
let foreCastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${defaultCity}&key=${apiKey}`;
axios.get(apiUrl).then(updateWeather);
axios.get(foreCastApiUrl).then(updateCards);
