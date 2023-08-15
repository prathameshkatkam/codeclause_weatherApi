//making object of weatherapi
const weatherApi = {
    key: '9f23b56e8dcad8299bf4e5a2a3fc932b',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

//anonymous function
//adding event listener on search button click
let searchInputBox = document.getElementById('input-box');
let searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    getWeatherReport(searchInputBox.value);
});

//adding event listener on input box key press
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        getWeatherReport(searchInputBox.value);
    }
});

//get weather report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

//show weather report
function showWeatherReport(weather) {
    let cityCode = weather.cod;
    if (cityCode === '400') {
        swal("Empty Input", "Please enter a city", "error");
        reset();
    } else if (cityCode === '404') {
        swal("Bad Input", "Entered city not found", "warning");
        reset();
    } else {
        let todayDate = new Date();
        let weatherBody = document.getElementById('weather-body');
        weatherBody.innerHTML =
            `
        <div class="location-deatils">
            <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
            <div class="date" id="date">${dateManage(todayDate)}</div>
        </div>
        <div class="weather-status">
            <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C</div>
            <div class="weather" id="weather">${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i></div>
            <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)</div>
            <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
        </div>
        <hr>
        <div class="day-details">
            <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
        </div>
        `;
        weatherBody.style.display = 'block';
        changeBg(weather.weather[0].main);
        reset();
    }
}

// Function to get the current time
function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

// Function to format the current date
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

// Function to change the background image based on weather status
function changeBg(Status) {
    let body = document.body;
    if (Status === 'Clouds') {
        body.style.backgroundImage = 'url(img/clouds.jpg)';
    } else if (Status === 'Rain') {
        body.style.backgroundImage = 'url(img/rainy.jpg)';
    } else if (Status === 'Clear') {
        body.style.backgroundImage = 'url(img/clear.jpg)';
    } else if (Status === 'Snow') {
        body.style.backgroundImage = 'url(img/snow.jpg)';
    } else if (Status === 'Sunny') {
        body.style.backgroundImage = 'url(img/sunny.jpg)';
    } else if (Status === 'Thunderstorm') {
        body.style.backgroundImage = 'url(img/thunderstrom.jpg)';
    } else if (Status === 'Drizzle') {
        body.style.backgroundImage = 'url(img/drizzle.jpg)';
    } else if (Status === 'Mist' || Status === 'Haze' || Status === 'Fog') {
        body.style.backgroundImage = 'url(img/mist.jpg)';
    } else {
        body.style.backgroundImage = 'url(img/bg.jpg)';
    }
}

// Function to get the class name of the weather icon
function getIconClass(weatherStatus) {
    if (weatherStatus === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    } else if (weatherStatus === 'Clouds') {
        return 'fas fa-cloud';
    } else if (weatherStatus === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (weatherStatus === 'Snow') {
        return 'fas fa-snowman';
    } else if (weatherStatus === 'Sunny') {
        return 'fas fa-sun';
    } else if (weatherStatus === 'Mist') {
        return 'fas fa-smog';
    } else if (weatherStatus === 'Thunderstorm' || weatherStatus === 'Drizzle') {
        return 'fas fa-thunderstorm';
    } else {
        return 'fas fa-cloud-sun';
    }
}

// Function to reset the input box
function reset() {
    let inputBox = document.getElementById('input-box');
    inputBox.value = '';
}

// Function to add leading zero if hour/minute is less than 10
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
