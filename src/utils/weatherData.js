const { get } = require('postman-request')
const request = require('postman-request')

// request({ url:url, json:true},(error,response)=>{
//     const time = response.body.current.observation_time
//     const temp = response.body.current.temperature
//     const desc = response.body.current.weather_descriptions[0]
//     console.log(`current at ${time} it is ${temp} degrees outside and its ${desc} `)
// })
const getLatlong = (location,callback)=>{

    const locationData = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYW1hbGJhbHJhaiIsImEiOiJja3R6Z3cxZ3IybmUyMm9xZWZ4M244NzFnIn0.1_xjXN1fqVVsz01uNTQTXA&limit=1`

    request({url:locationData,json:true},(error,response)=>{
        if (error) {
            callback('Location does not exist',undefined)
        }else if (response.body.features.length === 0){
            callback("Unable to obtain the weather for your location",undefined)
        }
        else{
            const loc = response.body.features[0].center
            callback(undefined , loc)
        }
    })
}

const getWeatherInfo = (coordinates,callback)=>{
    // getLatlong(location,(loc)=>{

    //     console.log(loc)
        const [x,y] = coordinates
        const url = `http://api.weatherstack.com/current?access_key=a3342746bbc69c6ffa37773e2c244be8&query=${y},${x}`
        
        request({ url:url, json:true},(error,response)=>{
            if (error) {
                callback(error , undefined)
            }else {
                const data = {
                    place : response.body.location.name,
                    time : response.body.current.observation_time,
                    temp :response.body.current.temperature,
                    desc : response.body.current.weather_descriptions[0]
                }
                callback(undefined, data)
            }
        })
}

// const getFinal = (adress, callback) => {
//     getLatlong(adress, (error , loc) => {
//         if (error){
//             callback(error , undefined)
//         }
//         else{
//             getWeatherInfo(loc , (error , answer) => {
//                 if (error) {
//                     callback(error , undefined)
//                 }else{
//                     callback(undefined , answer)
//                 }
//             })
//         }
//     })
// }
// getFinal(adress, (error , final) => {
//     if (error) {
//             console.log(error)
//         }else{
//                 console.log(final)
//             }
//         })

const getFinal = (adress, callback) => {
    getLatlong(adress, (error , loc) => {
        if (error){
            callback(error , undefined)
        }
        else{
            getWeatherInfo(loc , (error , answer) => {
                if (error) {
                    callback(error , undefined)
                }else{
                    callback(undefined , answer)
                }
            })
        }
    })
}

module.exports = {
    getFinal:getFinal,
    getWeatherInfo:getWeatherInfo,
    getLatlong:getLatlong
}

