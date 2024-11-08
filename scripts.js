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
  let actualTemperature = document.querySelector(".temperature-value");
  actualTemperature.innerHTML = `${Math.round(city.data.temperature.current)}`;

  let feelsLikeTemperature = document.querySelector(".temperature-feels-like");
  // console.log(city.data.temperature.feels_like);
  feelsLikeTemperature.innerHTML = `${Math.round(
    city.data.temperature.feels_like
  )}`;

  let windSpeed = document.querySelector(".wind-speed .condition .values");
  windSpeed.innerHTML = `${city.data.wind.speed}km/h`;

  let humidity = document.querySelector(".humidity .condition .values");
  humidity.innerHTML = `${city.data.temperature.humidity}%`;

  let weather_description = document.querySelector(".description");
  weather_description.innerHTML = `${city.data.condition.description}`;
  let weather_icon = document.querySelector(".current-city-weather-icon");
  weather_icon.innerHTML = `<img src="${city.data.condition.icon_url}"
                        alt="few-clouds-day">`;

  formatDate();
}

function update_min_max_temp(city) {
  let minimum_temp = document.querySelector(
    ".min-temperature .condition .values"
  );
  let maximum_temp = document.querySelector(
    ".max-temperature .condition .values"
  );

  // console.log(minimum_temp);
  // console.log(maximum_temp);
  // minimum_temp.innerHTML = `${city.data.daily.temperature.minimum}`;
  // maximum_temp.innerHTML = `${city.data.daily.temperature.maximum}`;
}

function searchCity(response) {
  response.preventDefault();
  let apiKey = "2d8o4b96bdta6ee065c85fc43853285d";
  let cityElement = document.querySelector(".input-search-text");
  cityElement = cityElement.value;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = cityElement;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement}&key=${apiKey}`;
  let foreCastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityElement}&key=${apiKey}`;
  console.log(foreCastApiUrl);
  axios.get(apiUrl).then(updateWeather);
  axios.get(foreCastApiUrl).then(update_min_max_temp);
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
axios.get(apiUrl).then(updateWeather);
