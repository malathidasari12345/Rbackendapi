
const express = require("express")
const router = express.Router()
const Auth = require("../middleware/verifiedtoken")
const { addProduct } = require("../controllers/ProductController")

router.post("/addproduct/:id", addProduct)

module.exports = router;