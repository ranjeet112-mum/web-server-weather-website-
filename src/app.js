const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geo = require('./utils/gecode.js')
const forecast = require('./utils/forecast.js')
const port = process.env.PORT || 3000;
// console.log(__dirname);
// console.log(__filename);
const app = express();
const publicDirec = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../template/views');
const partialsPath = path.join(__dirname, '../template/partials')


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirec))   //-- to load static web pages

//=====================================================
app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'Ranjit'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About us',

    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        value:'shitty'
    })
})

app.post('/www' ,(req,res) => {
    
})

app.get('/weather',(req,res) => {

    

    if(!req.query.location)
     return res.send({err : 'please enter the Location!!'})
    
     geo.geoCode(req.query.location,(err,data) => {
         if(err) {
             res.send({err});
         } else {
             forecast.forecast(data.lat,data.lon,(err,resp) => {
                 if(err) {
                     res.send({err});
                 } else {
                     resp.location = data.location;
                     res.send(resp);
                 }

             })
         }
     })

    //  var obj = {
    //     place : req.query.location,
    //     temp : -10101
    // } 
    // res.send(obj);
})

// app.get('/product', (req,res) => {
//     if(!req.query.name) {
//         return res.send('Please enter the name of the product!');
//     }

//     var arr = [{
//         name : 'apple',
//         rating : 4.5 
//     },{
//         name : 'ball',
//         rating : 3.5
//     }];
//     // console.log(arr)
//     var hola =  arr.filter((product) => product.name === req.query.name);
// // 
//     console.log(hola);
//     res.send(hola)

// })

app.get('/help/*',(req , res ) => {
    res.render('err',{
        title : 'help not found',
        errCode : 405
    })
})

app.get('*',(req,res) => {
    res.render('err',{
        title: 'error page!',
        errCode : 404

    })
})
//=====================================================
app.get('', (req,res) => {
    res.send('<h1>hello bitchesss!!!</h1>')  // html rendering
})

app.get('/help',(req,res) => {
    res.send('Help is here');
})

app.get('/about',(req,res) => {
    res.send('<html><head><title>about the page</title></head></html>');
})

app.get('/weather',(req,res) => {
    res.send({weather : 'shitty', temp: '2000'})
})

app.listen(port,() => {
    console.log('hello there, express is up!!');
})