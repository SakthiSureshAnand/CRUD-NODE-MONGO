const dotenv = require('dotenv')
const path =require('path')

const express = require('express')
const ejs = require('ejs')
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const app = express();
const indexRouter = require("./routes/index.js")

if(process.env.NODE_ENV !== 'production'){
  dotenv.config({path:path.join(__dirname,'.env')})
}
// Database setup
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;

db.on('error', (error) => console.error(error))
db.once('open', ()=>console.log('Conneted to mongoose'))


app.set("view engine","ejs");
app.set("views", __dirname+"/views");
app.set("layout", "layouts/layout");

app.use(ejsLayouts);
app.use(express.static('public'))



app.use('/',indexRouter);

app.listen(process.env.PORT || 3000);
