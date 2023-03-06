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
			dataDiv.style.visibility = 'visible'
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
	dataDiv.style.visibility = 'hidden'
	weatherIconBox.innerHTML = ''
	searchCity.textContent = ''
}

const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block'
		modalShadow.classList.toggle('modal-animation')
	} else {
		modalShadow.style.display = 'none'
	}
}

const closeModal = () => {
	modalShadow.style.display = 'none'
}

window.addEventListener('click', e => (e.target === modalShadow ? showModal() : false))
infoBtn.addEventListener('click', showModal)
closeBtn.addEventListener('click', closeModal)
searchBtn.addEventListener('click', getWeather)
searchInput.addEventListener('keyup', e => {
	if (e.key == 'Enter') {
		getWeather()
	}
})
