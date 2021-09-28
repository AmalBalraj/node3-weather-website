const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const pathToPublicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(pathToPublicDir))


app.get('' , (req,res) =>{
    res.render('index',{
        title:"Weather",
        content:"This website is made using express in node js using handlebars for dynamic pages!!"
    })
})

app.get('/help' , (req,res) =>{
    res.render('help',{
        title:"Help",
        content:"This is the help page for express website"
    })
})

app.get('/about' , (req,res) =>{
    res.render('about',{
        title:"About me",
        content:"My information will be passed on here"
    })
})


app.get('/weather', (req,res) => {
    if (!req.query.adress) {
        return res.send([{
            error:"Please input an Adress"
        }])
    }

    const {getFinal} = require("./utils/weatherData")
    getFinal(req.query.adress, (error , final = {}) => {
        if (error) {
            res.send([{
                error
            }])
        }else{
            res.send([{
                place : req.query.adress,
                time : final.time,
                temp : final.temp,
                desc : final.desc
            }])
        }
    })
})

app.get('/help/*',(req , res) => {
    res.render('error',{
        title:"404",
        content:"Help page not found"
    })
})

app.get('*',(req , res) => {
    res.render('error',{
        title:"404",
        content:"page not found"
    })
})

app.listen(port,()=>{
    console.log("server is up and running at port "+port)
})