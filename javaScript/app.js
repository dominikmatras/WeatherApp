// * Puting data into variables
const searchInput = document.querySelector('.search')
const searchBtn = document.querySelector('.search-btn')
const searchCity = document.querySelector('.city')
const weatherIconBox = document.querySelector('.weather-icon')
const errorParagraph = document.querySelector('.error')
const flagImg = document.querySelector('.flag')
const dataDiv = document.querySelector('.weather-data')
const tempDiv = document.querySelector('.temp')
const feelDiv = document.querySelector('.feel')
const humDiv = document.querySelector('.hum')
const modalShadow = document.querySelector('.modal-shadow')
const infoBtn = document.querySelector('.info')
const closeBtn = document.querySelector('.close')
const forcastBox = document.querySelectorAll('.forcast-box')
const forcastDayBox = document.querySelectorAll('.forcast-date')
const forcastIconBox = document.querySelectorAll('.forcast-weather-icon')
const forcastDayTempBox = document.querySelectorAll('.forcast-dayTemp')
const forcastNightTempBox = document.querySelectorAll('.forcast-nightTemp')

// * Function getWeather() is main function of the app
const getWeather = () => {
	// ! Main API - OpenWeather - fetching data about the current weather in a location specified by user
	const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=0afa8eac72743cd870905591989f976c&units=metric`

	fetch(API_URL)
		.then(res => res.json())
		.then(data => {
			// * Cleaning varables and the data contained in them
			searchInput.value = ''
			flagImg.removeAttribute('src')
			weatherIconBox.innerHTML = ''
			errorParagraph.textContent = ''
			searchCity.textContent = `${data.name}`
			dataDiv.style.visibility = 'visible'
			if (data.name !== undefined) {
				forcastBox.forEach(box => (box.style.visibility = 'visible'))
			} else {
				forcastBox.forEach(box => (box.style.visibility = 'hidden'))
			}
			getForcastWeather(data.name)
			createWeatherImg(data.weather[0].icon, weatherIconBox)
			showCity(data.sys.country, data.name)
			showDayTemp(data.main.temp.toFixed(0), tempDiv)
			showFeelLike(data.main.feels_like.toFixed(0))
			showHum(data.main.humidity)
		})
		.catch(err => {
			// ! When 'fetch()' encounter an error, it calls the showError() function
			showError()
		})
}

// * Function getFlag() gets a country name and shows the flag of this country
const getFlag = country => {
	// ! Second API in the app - flagsAPI - search for the flag for the country where the weather is shown
	const flagIcon = `https://flagsapi.com/${country}/flat/32.png`
	flagImg.setAttribute('src', flagIcon)
}

// * This function gets two params and showing city and flag for a country
const showCity = (country, city) => {
	getFlag(country)
	searchCity.textContent = city
	searchCity.style.visibility = 'visible'
}

// * Function witch create weather image
const createWeatherImg = (code, box) => {
	// ! Third API in the app - OpenWeather - this time it fetching the weather image
	const API_ICON = `https://openweathermap.org/img/wn/${code}@2x.png`
	fetch(API_ICON).then(data => {
		const newImg = document.createElement('img')
		newImg.setAttribute('src', data.url)
		newImg.style.width = '100px'
		box.appendChild(newImg)
	})
}

// * Function witch show day temperature to UI
const showDayTemp = (temp, box) => {
	box.textContent = `${temp}°C`
}

// * Function witch show night temperature to UI
const showNightTemp = (temp, box) => {
	box.textContent = `${temp}°C`
}

// * Function witch show perceived temperature to UI
const showFeelLike = feel => {
	feelDiv.textContent = `${feel}°C`
}

// * Function witch show humidity to UI
const showHum = hum => {
	humDiv.textContent = `${hum}%`
}

// * Function witch get forcast weather
const getForcastWeather = cityName => {
	// ! Fourth API in the app - OpenWeather - fetching the weather forecast for the next 5 days
	const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=0afa8eac72743cd870905591989f976c&units=metric`

	fetch(API_URL)
		.then(res => res.json())
		.then(data => {
			const forcastDataDay = data.list.filter((item, index) => item.dt_txt.includes('12:00:00'))
			const forcastDataNight = data.list.filter((item, index) => item.dt_txt.includes('00:00:00'))
			const daysOfWeek = [
				'Niedziela',
				'Poniedziałek',
				'Wtorek',
				'Środa',
				'Czwartek',
				'Piątek',
				'Sobota',
			]

			forcastDataDay.forEach((item, index) => {
				forcastDayBox[index].textContent = ''
				forcastIconBox[index].innerHTML = ''
				forcastDayTempBox[index].textContent = ''
				const forcastDate = new Date(item.dt * 1000)
				const forcastDayName = daysOfWeek[forcastDate.getDay()]
				forcastDayBox[index].innerHTML = forcastDayName
				createWeatherImg(item.weather[0].icon, forcastIconBox[index])
				showDayTemp(item.main.temp.toFixed(0), forcastDayTempBox[index])
			})

			forcastDataNight.forEach((item, index) => {
				forcastNightTempBox[index].textContent = ''
				showNightTemp(item.main.temp.toFixed(0), forcastNightTempBox[index])
			})
		})
		.catch(err => {
			showError()
		})
}

// ! This function shows an error to the UI
const showError = () => {
	errorParagraph.textContent = 'Podaj poprawną nazwę miasta!'
	dataDiv.style.visibility = 'hidden'
	weatherIconBox.innerHTML = ''
	searchCity.textContent = ''
}

// * The showModal() function shows the weather icons legend
const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block'
		modalShadow.classList.toggle('modal-animation')
	} else {
		modalShadow.style.display = 'none'
	}
}

// * The function that closes the window with the legend
const closeModal = () => {
	modalShadow.style.display = 'none'
}

// * Listeners for user move in the app
window.addEventListener('click', e => (e.target === modalShadow ? showModal() : false))
infoBtn.addEventListener('click', showModal)
closeBtn.addEventListener('click', closeModal)
searchBtn.addEventListener('click', getWeather)
searchInput.addEventListener('keyup', e => {
	if (e.key == 'Enter') {
		getWeather()
	}
})
