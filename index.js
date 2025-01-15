const searchInput = document.querySelector(".search-input")
const searchButton = document.querySelector(".search-btn")
const form = document.querySelector("form")
const descriptionText = document.querySelector(".description-text")
const descriptionIcon = document.querySelector(".description-icon")
const region = document.querySelector(".region")
const mainTemperature = document.querySelector(".temperature")
const feltTemperature = document.querySelector(".feel-like")
const wind = document.querySelector(".wind")
const humidity = document.querySelector(".humidity")
const loadingSpinner = document.querySelector(".loading-spinner")

const API_KEY = "f21f8c44106544e5813131954251501"
const base_url = "http://api.weatherapi.com/v1/current.json"

async function loadWeatherData(location) {
    try {
        loadingSpinner.style.display = "block";
        const response = await fetch(`${base_url}?key=${API_KEY}&q=${location}&aqi=no`,{mode: 'cors'})
        if (!response.ok) {
            throw new Error("Error fetching weather data")
        }
        const data = await response.json()
        displayWeather(data)
        loadingSpinner.style.display = "none";
    } catch(error) {
        console.error("Error fetchcing Weather data")
        loadingSpinner.style.display = "none";
    }
}

function displayWeather(data) {
    descriptionText.textContent = `${data.current.condition.text}`
    descriptionIcon.src = data.current.condition.icon
    region.textContent = `${data.location.region}, ${data.location.country.toUpperCase()}`;
    mainTemperature.textContent = `${Math.round(data.current.temp_c)}°C`;
    feltTemperature.textContent = `Feels like: ${data.current.feelslike_c} °C`;
    wind.textContent = `Wind: ${data.current.wind_kph} kph`;
    humidity.textContent = `Humidity: ${data.current.humidity} %`;
}

searchButton.addEventListener('click', (e)=>{
    e.preventDefault()
    const query = searchInput.value
    form.reset()
    if (query) {
        loadWeatherData(query)
    } else {
        console.error('Please enter a valid location')
    }
})

loadWeatherData("Dakar")
