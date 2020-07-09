function checkToday(date) {
	document.getElementById("media").innerHTML = "<img src='./loading.gif'>"
	fetch(`https://api.nasa.gov/planetary/apod?api_key=yzDv7B1Fy3caTaVaFMfKxafmqOdCVqg2VgMVmSqj&date=${date}`)
	.then(response => response.json())
	.then(data => {
		// console.log(data);
		if (data["media_type"] === undefined || data["code"] === 400) {
			document.getElementById("media").innerHTML = "<img src='https://api.nasa.gov/planetary/apod/static/default_apod_image.jpg'>"
			document.getElementById("date").innerText = "404"
			document.getElementById("explanation").innerText = "404"
		} else {
			if (data["media_type"] === "image") {
				document.getElementById("media").innerHTML = `<img src="${data["url"]}">`;
			} else if (data["media_type"] === "video") {
				document.getElementById("media").innerHTML = `<iframe width="560" height="315" src="${data["url"]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
			}
			if (data["date"] === today()) {
				document.getElementById("date").innerText = `This APOD is for today (${data["date"]})`
			} else {
				document.getElementById("date").innerText = `This APOD is for ${data["date"]}`
			}
			document.getElementById("explanation").innerText = data["explanation"];
		}
	})
	.catch(err => {
		console.log(err)
	})
}

function customApod() {
	// document.getElementById("img").setAttribute("src", "./loading.gif")
	var date = document.getElementById("date-input").value;
	checkToday(date)
}

function today() {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd;
	return today
	// checkToday(today)
}

document.getElementById("date-input").setAttribute("max", today());
checkToday(today());