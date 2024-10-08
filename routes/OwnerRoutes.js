const {VendorRegister, login, getAllUsers, getUser} = require("../controllers/OwnerControllers")
const express = require("express")
const router = express.Router()
const Auth = require("../middleware/verifiedtoken")

router.post("/register", VendorRegister);
router.post("/login", login);
router.get("/allvendors", getAllUsers)
router.get ("/vendor/:id",getUser)

module.exports = router;