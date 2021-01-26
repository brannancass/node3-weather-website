console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageTwo.textContent = ""
    messageOne.textContent = "Loading..."

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            setTimeout(() => {
                if (data.error) {
                    messageTwo.textContent = ""
                    messageOne.textContent = data.error
                }
                else {
                    messageOne.textContent = ""
                    messageTwo.textContent = `Weather report for ${data.address}\nThe temperature is ${data.temp}. Feels like ${data.feelsLike}. Weather is ${data.weather}.`
                }
            }, 1000)
        })
    })
})