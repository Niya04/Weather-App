const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const statusMessage = document.querySelector("#status-message");
const weatherCard = document.querySelector("#weather-card");

const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");

const celsiusButton = document.querySelector("#celsius-button");
const fahrenheitButton = document.querySelector("#fahrenheit-button");

// Fake temperature stored internally in Celsius.
const fakeWeather = {
  temperatureCelsius: 22,
  description: "Clear sky",
  humidity: 45,
  windSpeed: 8,
  icon: "☀️"
};

let currentUnit = "celsius";

searchForm.addEventListener("submit", handleSearch);

celsiusButton.addEventListener("click", () => {
  currentUnit = "celsius";
  updateTemperature();
  updateUnitButtons();
});

fahrenheitButton.addEventListener("click", () => {
  currentUnit = "fahrenheit";
  updateTemperature();
  updateUnitButtons();
});

function handleSearch(event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  showLoading();

  // Simulates the delay of a real API request.
  window.setTimeout(() => {
    displayFakeWeather(city);
  }, 600);
}

function displayFakeWeather(city) {
  cityName.textContent = formatCityName(city);

  document.querySelector("#weather-description").textContent =
    fakeWeather.description;

  document.querySelector("#humidity").textContent =
    `${fakeWeather.humidity}%`;

  document.querySelector("#wind-speed").textContent =
    `${fakeWeather.windSpeed} mph`;

  document.querySelector("#weather-icon").textContent =
    fakeWeather.icon;

  updateTemperature();

  weatherCard.classList.remove("hidden");

  statusMessage.textContent =
    "Showing placeholder weather data.";

  statusMessage.className = "status-message";
}

function showLoading() {
  weatherCard.classList.add("hidden");

  statusMessage.textContent = "Loading weather...";
  statusMessage.className = "status-message loading";
}

function showError(message) {
  weatherCard.classList.add("hidden");

  statusMessage.textContent = message;
  statusMessage.className = "status-message error";
}

function updateTemperature() {
  const celsius = fakeWeather.temperatureCelsius;

  if (currentUnit === "fahrenheit") {
    const fahrenheit = celsiusToFahrenheit(celsius);
    temperature.textContent = `${Math.round(fahrenheit)}°F`;
    return;
  }

  temperature.textContent = `${Math.round(celsius)}°C`;
}

function updateUnitButtons() {
  const isCelsius = currentUnit === "celsius";

  celsiusButton.classList.toggle("active", isCelsius);
  fahrenheitButton.classList.toggle("active", !isCelsius);
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function formatCityName(city) {
  return city
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}