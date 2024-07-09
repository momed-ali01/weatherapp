let valueSearch = document.getElementById("valueSearch");
let city = document.getElementById("city");

let temperature = document.querySelector(".temperature");
let description = document.querySelector(".description");

let clouds = document.getElementById("clouds");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (valueSearch.value != "") {
    searchWeather();
  }
});

let apiKey = "255c7549955d253fc1d5844f03a9b211";
let url =
  "http://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apiKey;

async function searchWeather() {
  fetch(url + "&q=" + valueSearch.value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.cod == 200) {
        city.querySelector("figcaption").innerText = data.name;
        city.querySelector(
          "img"
        ).src = `https://flagsapi.com/${data.sys.country}/shiny/24.png`;
        temperature.querySelector(
          "img"
        ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        temperature.querySelector("figcaption span").innerText = data.main.temp;
        description.innerText = data.weather[0].description;
        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;
      } else {
        document.querySelector("main").classList.add("error");
        setTimeout(() => {
          document.querySelector("main").classList.remove("error");
        }, 500);
      }
      valueSearch.value = "";
    });
}

const initApp = () => {
  valueSearch.value = "Djibouti";
  searchWeather();
};

initApp();
