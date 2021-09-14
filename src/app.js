const path = require('path')
const express = require("express")
const app = express()
const hbs = require('hbs')

//paths and config
app.use(express.static(path.join(__dirname,'../public'))) // static
app.set('view engine' , 'hbs') // dynamic
const viewPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')
app.set('views' , viewPath)
hbs.registerPartials(partialPath)

//functions

const geocode = require('./Geocode')
const forecast = require('./forecast')


app.get('/weather' , (req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'No address provided!'
        })
    }
    geocode(req.query.address , (error ,{Latitude , Longitude , Location}={} )=>{   
        if(error){
           return res.send({
                error : error
            })
        }
        forecast(Latitude,Longitude,(error, Forecastdata)=>{
            if(error){
               return   res.send({
                error : error
            })
            }
            res.send({ 
                Location : Location,
                Address : req.query.address,
                Longitude : Latitude,
                Latitude:  Longitude,
                forecast :  Forecastdata[0]
            })
        })

    })
})
 

app.get('/about' , (req,res)=>{
    res.render('about' , {
        page : 'about',
        title:'About'
    })
})
app.get('' , (req ,res)=>{
    res.render('index' , {
        title : 'Weather-App',
        organization : 'Weather-Buzz'
    })
})
app.get('/help' , (req , res)=>{
    res.render('help')
})

app.get('*', (req,res)=>{
     res.render('error')
})
app.listen(3000 , ()=>{
    console.log('server is up and running')
}) // starts your application