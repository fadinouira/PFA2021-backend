const path = require("path");
const exp = require('express');
const bodeyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const deliveriesRoutes = require('./routes/deliveries');
const demandesRoutes =  require('./routes/demandes');
const itemsRoutes =  require('./routes/items');
const app = exp();

mongoose.connect('mongodb+srv://root:fedifedi@mydelevry.grnig.mongodb.net/mydelevry', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log("connected successfully !");
})
.catch(()=> {
  console.log("connection failed !");
})

app.use(bodeyParser.json());
app.use(bodeyParser.urlencoded({ extended: false}));
app.use("/images",exp.static(path.join("./images")));

app.use((req,res,next)=> {
  res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept,authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();

});

app.use('/api/auth',authRoutes);
app.use('/api/deliveries',deliveriesRoutes);
app.use('/api/demandes',demandesRoutes);
app.use('/api/items',itemsRoutes);



module.exports = app;
