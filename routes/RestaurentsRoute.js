const express = require("express")
const router = express.Router()
const {addrest, deleterestbyid} = require("../controllers/RestaurentController")
const  Auth = require("../middleware/verifiedtoken")

router.post("/newrestaurent", Auth ,addrest)
// route to upload images
router.get("/uploads/:imageName", (req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('content-Type', "image/jpeg")
    res.sendFile(path.join(__dirname,"..", 'uploads', imageName));
})
router.delete("/:id",deleterestbyid)
module.exports = router;