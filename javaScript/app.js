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
			searchCity.textContent = ''
			dataDiv.style.visibility = 'visible'
			// ! Using API to
			createWeatherImg(data.weather[0].icon)
			showCity(data.sys.country, data.name)
			showTemp(data.main.temp.toFixed(0))
			showFeelLike(data.main.feels_like.toFixed(0))
			showHum(data.main.humidity)
		})
		.catch(err => {
			// ! When 'fetch()' encounter an error, it calls the showError() function
			showError()
		})
}

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

const createWeatherImg = code => {
	// ! Third API in the app - OpenWeather - this time it fetching the weather image
	const API_Icon = `https://openweathermap.org/img/wn/${code}@2x.png`
	fetch(API_Icon).then(data => {
		const newImg = document.createElement('img')
		newImg.setAttribute('src', data.url)
		newImg.style.width = '100px'
		weatherIconBox.appendChild(newImg)
	})
}

// * Function witch show temperature to UI
const showTemp = temp => {
	tempDiv.textContent = `${temp} °C`
}

// * Function witch show perceived temperature to UI
const showFeelLike = feel => {
	feelDiv.textContent = `${feel} °C`
}

// * Function witch show humidity to UI
const showHum = hum => {
	humDiv.textContent = hum
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
// * Listeners on pressing the enter key
searchInput.addEventListener('keyup', e => {
	if (e.key == 'Enter') {
		getWeather()
	}
})
