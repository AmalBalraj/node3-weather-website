console.log("Browser Console")




const weatherForm = document.querySelector('form')
const adress = document.querySelector('input')
const weather = document.querySelector('#weather-info')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = adress.value

    weather.textContent = "Loading..."

    fetch(`/weather?adress=${location}`).then((response)=>{
        response.json().then((data) => {
            if (data[0].error) {
                weather.textContent = "Unable to find the weather info for your desired location"
            }else{
                console.log(data)
                weather.textContent = `Today at ${data[0].time} its pretty ${data[0].desc} here in ${data[0].place} with a temprature of ${data[0].temp}c`
            }
        })
    })
})