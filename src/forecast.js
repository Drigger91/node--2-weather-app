const request = require("request")

const forecast = (Latitude , Longitude ,  callback )=>{
    const url = 'http://api.weatherstack.com/current?access_key=3749d296a523f708d88d1181b00a33c2&query='+encodeURIComponent(Longitude)+','+encodeURIComponent(Latitude)
    request({ url : url , json: true} , (error,response)=>{
        if(error){
                callback('Unable to connect to weather service!' , undefined)
        }
       
        else{
        callback(undefined, response.body.current.weather_descriptions)
        }
})
}

module.exports = forecast