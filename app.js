window.addEventListener('load', () => {
  document.querySelector('.preloader').classList.add('hide');
})

let weather = {
  fetchWeather: function(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=34e29c21e43d5599c2d0f4a3ac49d0cd`)
    .then(response => response.json())
    .then(data => this.displayWeather(data))
  },
  displayWeather: function(data) {
    const { name } = data,
          { icon, description } = data.weather[0],
          { temp, humidity } = data.main,
          { speed } = data.wind;
    const city = document.querySelector('.city span'),
          weatherIcon = document.querySelector('.icon'),
          weatherDescription = document.querySelector('.description span'),
          weatherTemp = document.querySelector('.temperature'),
          weatherHumidity = document.querySelector('.humidity span'),
          weatherWind = document.querySelector('.wind span'),
          weatherBlock = document.querySelector('.weather'),
          dateEl = document.querySelector('.date'),
          timeEl = document.querySelector('.time');
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov'];
    
    setInterval(() => {
      const time = new Date(),
            month = time.getMonth(),
            day = time.getDay(),
            date = time.getDate();
            hours = time.getHours(),
            minutes = time.getMinutes(),
            hoursIn12HrFormat = hours >= 13 ? hours % 12 : hours,
            amOrPmFormat = hours >= 12 ? 'PM' : 'AM';

      timeEl.innerHTML = `${hoursIn12HrFormat}:${this.getZero(minutes)} <span id="am-pm">${amOrPmFormat}</span>`;
      dateEl.innerHTML = `${days[day]}, ${date} ${months[month]}`;
    }, 1000);

    city.textContent = `${name}`;
    weatherDescription.textContent = description;
    weatherTemp.textContent = `${Math.round(temp - 273.15)}˚C`;
    weatherHumidity.textContent = `Humidity: ${humidity}%`;
    weatherWind.textContent = `Wind speed: ${speed}km/h`;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt"Weather icon"/>`;
    document.querySelector('.card__img-container').style = `
    background: url('https://source.unsplash.com/900x1600/?"${name}"')center center no-repeat`;


  },
  getZero(num) {
    if(num >= 0 && num < 10) {
      return `0${num}`;
    }else {
      return num;
    }
  }, 
  search: function() {
     const searchBar = document.querySelector('.search__bar');
     this.fetchWeather(searchBar.value);
  }
}

const searchBtn = document.querySelector('.search button');
const searchBar = document.querySelector('.search__bar');
searchBtn.addEventListener('click', () => {
  weather.search();
});
searchBar.addEventListener('keyup', e => {
  if(e.key === 'Enter') {
    weather.search();
  }
});

weather.fetchWeather('bishkek');