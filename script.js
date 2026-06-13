const search = document.querySelector("i");
const input = document.querySelector(".enter-city");
const dark = document.querySelector(".container");
const image = document.querySelector(".weather img");

const apiKey = "941adbdd90452fb11967c3b4f316b7af";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=";

input.placeholder = "Enter city name...";

search.addEventListener("click", (e) => {
  input.style.display = "block";

  dark.style.setProperty(
    "--after-display",
    "block"
  );

  input.focus();

  e.stopPropagation();
});

input.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", (e) => {
  if (
    e.target !== input &&
    e.target !== search
  ) {
    input.style.display = "none";

    dark.style.setProperty(
      "--after-display",
      "none"
    );
  }
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    const city =
      input.value.trim();

    if (city === "") {
      alert(
        "Please enter a city name."
      );
      return;
    }

    input.style.display = "none";

    dark.style.setProperty(
      "--after-display",
      "none"
    );

    checkWeather(city);
  }
});

function formatTime(
  timestamp,
  timezoneOffset
) {
  const date = new Date(
    (timestamp + timezoneOffset) * 1000
  );

  let hours =
    date.getUTCHours();

  const minutes =
    date
      .getUTCMinutes()
      .toString()
      .padStart(2, "0");

  const ampm =
    hours >= 12 ? "PM" : "AM";

  hours =
    hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
}

async function checkWeather(city) {
  try {
    const response =
      await fetch(
        `${apiUrl}${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );

    const data =
      await response.json();

    console.log(data);

    if (!response.ok) {
      alert(
        data.message ||
          "City not found!"
      );
      return;
    }

    const today =
      new Date();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    document.querySelector(
      ".date"
    ).innerHTML =
      today.toLocaleDateString(
        "en-IN",
        options
      );

    document.querySelector(
      ".city"
    ).innerHTML =
      data.name;

    document.querySelector(
      ".temp"
    ).innerHTML =
      Math.round(
        data.main.temp
      ) + "°C";

    document.querySelector(
      ".condition"
    ).innerHTML =
      data.weather[0].main;

    document.querySelector(
      ".sunrise .time"
    ).innerHTML =
      formatTime(
        data.sys.sunrise,
        data.timezone
      );

    document.querySelector(
      ".sunset .time"
    ).innerHTML =
      formatTime(
        data.sys.sunset,
        data.timezone
      );

    document.querySelector(
      ".pressure .value"
    ).innerHTML =
      data.main.pressure +
      " hPa";

    document.querySelector(
      ".humidity .value"
    ).innerHTML =
      data.main.humidity +
      "%";

    document.querySelector(
      ".speed .value"
    ).innerHTML =
      data.wind.speed +
      " m/s";

    document.querySelector(
      ".degree .value"
    ).innerHTML =
      data.wind.deg +
      "°";

    const weather =
      data.weather[0].main;

    switch (weather) {
      case "Clear":
        image.src =
          "images/clear.png";
        break;

      case "Clouds":
      case "Haze":
        image.src =
          "images/clouds.png";
        break;

      case "Rain":
        image.src =
          "images/rain.png";
        break;

      case "Drizzle":
        image.src =
          "images/drizzle.png";
        break;

      case "Mist":
      case "Fog":
        image.src =
          "images/Mist.png";
        break;

      default:
        image.src =
          "images/clouds.png";
    }

    input.value = "";
  } catch (error) {
    console.error(error);

    alert(
      "Network error. Please try again."
    );
  }
}

window.addEventListener(
  "load",
  () => {
    checkWeather(
      "Kathmandu"
    );
  }
);