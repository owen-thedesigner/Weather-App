// API variables
const apiKey = "e59fc793a428f80ace4415ca7c2b14a2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";

// Search variables
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// Image variable
const weatherIcon = document.querySelector(".weather-icon");

// Function to check weather
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            // If the city is not found or another error occurs
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        // Update DOM elements with weather data
        document.querySelector(".city").innerHTML = data.name || "N/A";
        document.querySelector(".temp").innerHTML = 
            data.main?.temp !== undefined ? Math.round(data.main.temp) + "°F" : "N/A";
        document.querySelector(".humidity").innerHTML = 
            data.main?.humidity !== undefined ? data.main.humidity + "%" : "N/A";
        document.querySelector(".wind").innerHTML = 
            data.wind?.speed !== undefined ? Math.round(data.wind.speed) + " m/h" : "N/A";

        // Weather icon mapping
        const weatherIcons = {
            Clouds: "images/clouds.png",
            Clear: "images/clear.png",
            Rain: "images/rain.png",
            Drizzle: "images/drizzle.png",
            Mist: "images/mist.png",
            Snow: "images/snow.png",
        };
        weatherIcon.src = weatherIcons[data.weather[0].main] || "images/default.png";

        // Show weather and hide error
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});
