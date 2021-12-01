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
let dateElement = document.querySelector("#today");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function cityTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${temperature}° C`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#display-city");
  let cityInput = document.querySelector("#search-bar");
  let cities = cityInput.value;
  city.innerHTML = cities;
  let apiKey = "875151569447f92cdc976aa45de70124";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityTemp);
}
let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", showCity);

function currentLocationTemp(response) {
  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function searchLocation(position) {
  let apiKey = "875151569447f92cdc976aa45de70124";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentLocationTemp);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.currentLocation(searchLocation);
}
let myLocation = document.querySelector("#location");
myLocation.addEventListener("click", currentLocation);
