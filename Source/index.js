function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
          <div class="forecast-date">${day}</div>
            <img src="cloudy.png" alt="cloudy" class="weather-image"/>
          <div class="forecast-temps">
            <span class="temp-max">10</span>
            <span class="unit" id="unit-1">°C</span>
            <span class="temp-min">5</span>
            <span class="unit" id="unit-2">°C</span>
          </div>
        </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function cityTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = temperature;
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + " km/h";
}
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#display-city");
  let cityInput = document.querySelector("#search-bar");
  let cities = cityInput.value;
  city.innerHTML = cities;
  let apiKey = "875151569447f92cdc976aa45de70124";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${apiKey}&units=metric`;
  document.querySelector("#search-bar").value = "";
  axios.get(apiUrl).then(cityTemp);
}
let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", showCity);

function currentLocationTemp(response) {
  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + " km/h";
}
function searchLocation(position) {
  let apiKey = "875151569447f92cdc976aa45de70124";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentLocationTemp);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let myLocation = document.querySelector("#location");
myLocation.addEventListener("click", currentLocation);
displayForecast();
