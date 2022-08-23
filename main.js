function time(date) {
  let currentTime = new Date(date);

  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentTime.getDay()];
  return `${day} ${hour} : ${minutes}`;
}

function searchBtn(event) {
  event.preventDefault();
  let cityInput = document.getElementById("cityInput");
  let city = document.getElementById("city");
  city.InnerHTML = cityInput.value;
  citySearch(cityInput.value);
}

function citySearch(city) {
  let apiKey = "bea8e5cfc09f2c80726c878f5fd81290";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weather);
}

function callForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bea8e5cfc09f2c80726c878f5fd81290";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(forecasting);
}

function weather(response) {
  console.log(response.data.main.temp);
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let date = document.getElementById("date");
  let currentLocation = document.getElementById("current-location");
  let cityInput = document.getElementById("cityInput");
  let city = document.getElementById("city");
  let btnCurrentLocation = document.getElementById("btn-current-location");
  let humidity = document.getElementById("humidity");
  let wind = document.getElementById("wind");

  callForecast(response.data.coord);

  date.innerHTML = time(response.data.dt * 1000);
  description.innerHTML = response.data.weather[0].description;
  temperature.innerHTML = Math.round(response.data.main.temp);
  btnCurrentLocation.addEventListener("click", btncurrent);
  function btncurrent() {
    currentLocation.innerHTML = response.data.name;
  }
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  city.innerHTML = cityInput.value;
}

// let fiveDays = document.getElementById("five-days");
// fiveDays.addEventListener("click", days);

// function days(formatDays) {
//   alert("")
// }

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  return days[day];
}

function forecasting(response) {
  let forecastData = response.data.daily;
  console.log(forecastData);

  let forecastElement = document.getElementById("forecast");

  let forecast = `<div class="row flex-nowrap">`;

  forecastData.forEach(function day(forecastDay, index) {
    if (index < 5) {
      forecast =
        forecast +
        `<div class="col">
      <div class="forecast-days" id="last-day">${formatDay(
        forecastDay.dt
      )}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt="bottom-img" width="42px"
      class="bottom-img"
      id="bottom-img" 
      />
      <div class="min-max-temp">
      <span class="min-temp" id="min-temp">${Math.round(
        forecastDay.temp.min
      )}°</span>
      <span class="max-temp" id="max-temp">${Math.round(forecastDay.temp.max)}°
      </span>
        </div>
        </div>
        `;
    }
  });
  forecast = forecast + `</div>`;
  forecastElement.innerHTML = forecast;
}

let input = document.getElementById("input");
let form = document.getElementById("form");
form.addEventListener("submit", searchBtn);

// forecasting();
citySearch("Lagos");
