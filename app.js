const path = require("path");
const exp = require('express') ;
const bodeyParser = require('body-parser') ;
const mongoose = require('mongoose') ;
const authRoutes = require('./routes/auth');
const deliveriesRoutes = require('./routes/deliveries');
const demandesRoutes =  require('./routes/demandes');
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
app.use("/images",exp.static(path.join("backend/images")));

app.use((req,res,next)=> {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept,authorization");
  res.setHeader('Access-Control-Allow-Methods','GET , POST , PATCH , DELETE , OPTIONS,PUT');

  next();

});

app.use('/api/auth',authRoutes);
app.use('/api/deliveries',deliveriesRoutes);
app.use('/api/demandes',demandesRoutes);
module.exports = app;
