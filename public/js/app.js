const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageTwo.textContent = ""
    messageOne.textContent = "Loading..."

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            setTimeout(() => {
                if (data.error) {
                    messageTwo.textContent = ""
                    messageOne.textContent = data.error
                }
                else {
                    messageOne.textContent = ""
                    messageTwo.innerHTML = `<div><img src="${data.icon}"></div><div>Weather report for ${data.address}</div><div>The temperature is ${data.temp}. Feels like ${data.feelsLike}. Weather is ${data.weather}.</div>`
                }
            }, 1000)
        })
    })
})