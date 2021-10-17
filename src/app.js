const path=require('path');
const hbs=require('hbs');
const express=require('express');
const { hasSubscribers } = require('diagnostics_channel');

//Define paths for Express config
const publicDirPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../template/views');
const partialsPath=path.join(__dirname,'../template/partials')
const app=express();

//Setup handlebar engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

// app.get('/',(req,res)=>{
//     res.send('hi');
// });

app.get('/',(req,res)=>{
   res.render('index',{
       title:'Weather App',
       name:"Dharambir Kumar"
   });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About weather",
        name:"Dharambir Kumar"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Weather-app help page",
        name:"Dharambir Kumar"
    })
})
app.get('/weather',(req,res)=>{
    res.send({
        location:'New Delhi',
        forecast:'It is raining'
    })
});


app.get('*',(req,res)=>{
    res.render('404');
})
app.listen(8000,()=>{
    console.log("Server start running on post : 8000");
});