const express = require("express")
const app = express()
const db = require('./data/database');
const Vendorroute = require("./routes/OwnerRoutes")
const RestaurantRoute = require("./routes/RestaurentsRoute")
const ProductRoute = require("./routes/ProductsRoute")
const bodyparser = require("body-parser")
const path = require('path')
// middleware
app.use(express.json());
app.use( bodyparser.json());

// routes
// Vendor Route
app.use("/vendors", Vendorroute)
// restaurent Route
app.use("/restaurent", RestaurantRoute )
// product route
app.use ("/products", ProductRoute)
// route for uploading images
app.use("/uploads", express.static('uploads'))
app.use("/",(req,res)=>{
    res.send("<center><h1>welcome to HomePage</h1></center>")
})


app.listen(4001,()=>{
    console.log("working...")
})