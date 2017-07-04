const path=require('path');

const express=require('express');

const port=process.env.Port||3000;

const app=express();

const publicPath=path.join(__dirname,'../public');




app.use(express.static(publicPath));

app.listen(3000,()=>{
    console.log('server is on');
})