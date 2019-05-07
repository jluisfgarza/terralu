const multer = require('multer');
const path   = require('path');
const express = require('express');
var router    = express.Router();

const storageEngine = multer.diskStorage({
  destination: './public/files',
  filename: function(req, file, fn){
    fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
  }
}); 

const upload =  multer({
  storage: storageEngine,
  limits: { fileSize:200000 },
  fileFilter: function(req, file, callback){
    validateFile(file, callback);
  }
}).single('image');

var validateFile = function(file, cb ){
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}

router.post('', upload, (req, res, next) => {
  const file = req.file
  if (!file) {
      return res.status(400).send(`Something unexpected occured ${err}`);
  }
  var fullPath = "files/"+ req.file.filename;
  res.status(201).json({path: fullPath});
})

module.exports = router;