const request = require('request')

const geocode = (address , callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGl5dXNoMDc3IiwiYSI6ImNrc3ltbWRzOTBlOXIyb3A5dWt5cnlhODYifQ.OjrLCKkqU0Dut6bXar5fCw&limit=1'

    request({url:url , json:true} , (error , response)=>{
            if(error){
                   callback('Error Occured, please check the connectivity of your device.' , undefined)
            }
            else if(!response.body.features[0]){
                    callback('Error Occured - Location not found!' , undefined)
            }
            else{
                    callback(undefined , {
                        Latitude : response.body.features[0].center[0],
                        Longitude : response.body.features[0].center[1],
                        Location : response.body.features[0].place_name })
                    
                }
}
    )
}

module.exports = geocode