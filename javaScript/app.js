const searchInput = document.querySelector('.search')
const searchBtn = document.querySelector('.search-btn')
const searchCity = document.querySelector('.city')
const weatherIconBox = document.querySelector('.weather-icon')
const errorParagraph = document.querySelector('.error')
const flagImg = document.querySelector('.flag')
const telemetryDiv = document.querySelector('.telemetry')
const tempDiv = document.querySelector('.temp')
const feelDiv = document.querySelector('.feel')
const humDiv = document.querySelector('.hum')

const getWeather = () => {
	const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=0afa8eac72743cd870905591989f976c&units=metric`

	fetch(API_URL)
		.then(res => res.json())
		.then(data => {
			searchInput.value = ''
			flagImg.removeAttribute('src')
			weatherIconBox.innerHTML = ''
			errorParagraph.textContent = ''
			searchCity.textContent = ''
			telemetryDiv.style.visibility = 'visible'

			createWeatherImg(data.weather[0].icon)
			showCity(data.sys.country, data.name)
			showTemp(data.main.temp.toFixed(0))
			showFeelLike(data.main.feels_like.toFixed(0))
			showHum(data.main.humidity)
		})
		.catch(err => {
			showError()
		})
}

const getFlag = country => {
	const flagIcon = `https://flagsapi.com/${country}/flat/32.png`
	flagImg.setAttribute('src', flagIcon)
}

const showCity = (country, city) => {
	getFlag(country)
	searchCity.textContent = city
	searchCity.style.visibility = 'visible'
}

const createWeatherImg = code => {
	const API_Icon = `https://openweathermap.org/img/wn/${code}@2x.png`
	fetch(API_Icon).then(data => {
		const newImg = document.createElement('img')
		newImg.setAttribute('src', data.url)
		newImg.style.width = '100px'
		weatherIconBox.appendChild(newImg)
	})
}

const showTemp = temp => {
	tempDiv.textContent = `${temp} °C`
}

const showFeelLike = feel => {
	feelDiv.textContent = `${feel} °C`
}

const showHum = hum => {
	humDiv.textContent = hum
}

const showError = () => {
	errorParagraph.textContent = 'Podaj poprawną nazwę miasta!'
	telemetryDiv.style.visibility = 'hidden'
	weatherIconBox.innerHTML = ''
	searchCity.textContent = ''
}

searchBtn.addEventListener('click', getWeather)
searchInput.addEventListener('keyup', e => {
	if (e.key == 'Enter') {
		getWeather()
	}
})
