const express = require("express")
const app = express()
const db = require('./data/database');
const Vendorroute = require("./routes/OwnerRoutes")
const RestaurantRoute = require("./routes/RestaurentsRoute")
const ProductRoute = require("./routes/ProductsRoute")
const bodyparser = require("body-parser")
const path = require('path')
const cors = require('cors')
// middleware
app.use(express.json());
app.use( bodyparser.json());
app.use(cors())

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
    res.send("welcome to HomePage")
})


app.listen(4001,()=>{
    console.log("working...")
})
