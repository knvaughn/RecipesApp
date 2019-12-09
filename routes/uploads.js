var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null,file.fieldname +  '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
        storage: storage,
        limits: {fileSize: 1000000},
        fileFilter: function(req, file, cb){
            checkFileType(file, cb)
        }
}).single('uploadedImage');

function checkFileType(file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var extName = filetypes.test(path.extname(file.originalname).toLowerCase());
    var mimetype = filetypes.test(file.mimetype);
    if(mimetype && extName) {
        return cb(null,true)
    } else {
        cb('Error: Images only!');
    }
}

// ==================
// UPLOADS ROUTES
// ==================

router.post('/upload', middleware.isLoggedIn, function(req, res){
    upload(req, res, function(err) {
        if(err) {
            console.log(err);
            res.render('recipes/new', {
                msg: err
            });
        } else {
            console.log(req.file);
            res.render('recipes/new', {
                successMsg: "Upload Successful",
                fileUrl: "/uploads/" + req.file.filename
            });
        }
    });
});

module.exports = router;