
const express = require("express")
const router = express.Router()
const Auth = require("../middleware/verifiedtoken")
const { addProduct } = require("../controllers/ProductController")
const { getproductbyid } = require("../controllers/ProductController")
const { deleteProductbyid } = require("../controllers/ProductController")

router.post("/addproduct/:id", addProduct)
router.get("/:id/products",getproductbyid)
// route to upload images
router.get("/uploads/:imageName", (req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('content-Type', "image/jpeg")
    res.sendFile(path.join(__dirname,"..", 'uploads', imageName));
})
router.delete("/:id",deleteProductbyid)


module.exports = router;