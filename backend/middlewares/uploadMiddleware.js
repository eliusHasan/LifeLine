const multer = require('multer');
const path = require("path");

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
        }
        cb(null,'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null,uniqueName);
    },
});

const upload = multer({storage});
 
module.exports= upload;