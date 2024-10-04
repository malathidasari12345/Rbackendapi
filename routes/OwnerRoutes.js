const {VendorRegister, login, getAllUsers} = require("../controllers/OwnerControllers")
const express = require("express")
const router = express.Router()

router.post("/register", VendorRegister);
router.post("/login", login);
router.get("/allvendors", getAllUsers)

module.exports = router