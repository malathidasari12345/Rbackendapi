const express = require("express")
const router = express.Router()
const {addrest} = require("../controllers/RestaurentController")
const  Auth = require("../middleware/verifiedtoken")
router.post("/newrestaurent", Auth ,addrest)

module.exports = router;