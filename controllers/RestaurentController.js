const RestaurentDetails = require("../models/Restaurents");
const Vendor = require("../models/Owner");
const multer = require("multer");
const path = require('path'); 

// multer to add upload files
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// add restaurant
const addrest = async (req, res) => {
    try {
        const { RestaurentName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const vendor = await Vendor.findById(req.vendorid); 

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found'
            });
        }

        const restaurent = new RestaurentDetails({
            RestaurentName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        const savedrest = await restaurent.save(); 
       // Push the saved restaurant to the vendor's restaurant list
        vendor.RestaurentDetails.push(savedrest);
        await vendor.save(); 

        res.status(201).json({
            success: true,
            message: 'Restaurant added successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addrest: [upload.single('image'), addrest]
};
