function getWeather () {
	return new Promise((resolve, reject) => {
		fetch("https://api.openweathermap.org/data/2.5/weather?lat=37.27&lon=49.59&appid=68b966f612ad001d3dc4c841dd2d25b8")
			.then(response => response.json())
			.then(data => resolve(data))
			.catch(error => reject(error))
	})
}

function showWeather (data) {
	// console.log(data.weather[0]);
	// console.log(data.name);
	document.getElementsByTagName("img")[0].src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
	document.getElementsByTagName("h1")[0].innerText = data.name;
	document.getElementsByTagName("h2")[0].innerText = Math.round(data.main.temp - 273.15);
	document.getElementsByTagName("h3")[0].innerText = data.weather[0].main;
	document.getElementsByTagName("b")[0].style.display = "none";
	document.getElementById("weather").style.display = "block";
}

function showError (error) {
	document.getElementsByTagName("b")[0].innerText = "Oops! somthing went wrong :(";
	console.log(error)
}

getWeather()
	.then(showWeather, showError)