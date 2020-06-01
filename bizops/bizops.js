//const express = require('express');
//const router = express.Router();
const path = require('path');
const readline = require('readline');
const multer = require("multer")

const twitBot = require('../twitbot/twitBot');

const fs = require('fs');

var assetsDir = path.join(process.cwd(), '/assets/');

exports.readFile = (req, res, next) => {
    
    var fileName = req.body.filename;

    filePath = path.join(assetsDir, fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) { return next(err); }
        if (data.toString()=='') { // No results.
            var err = new Error('File is empty.');
            err.status = 404;
            return next(err);
        }

        var jsonData = JSON.parse(data);

        // 
        twitBot.sendTweet(jsonData);

        // Successful, so render.
        res.render('index', { filename: fileName, error: null, message: 'Thread succesfully created.' });
    });
    
    // Successful, so render.
    //res.render('index', { filename: fileName, error: null, message: 'Thread succesfully created.' });
};

exports.uploadFile = (req, res, next) => {
    // var upload = multer({ dest: "Upload_folder_name" }) 
    // If you do not want to use diskStorage then uncomment it 
    var fileName = ""; //req.body.filename;

    var storage = multer.diskStorage({ 
        destination: (req, file, cb) => { 
    
            // Uploads is the Upload_folder_name 
            //cb(null, "uploads");
            cb(null, assetsDir) 
        }, 
        filename: (req, file, cb) => { 
            //cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
            fileName = file.originalname; 
            cb(null, file.originalname) 
        } 
    }) 
        
    // Define the maximum size for uploading 
    // picture i.e. 1 MB. it is optional 
    const maxSize = 1 * 1000 * 1000; 
        
    var upload = multer({  
        storage: storage, 
        limits: { fileSize: maxSize }, 
        fileFilter: (req, file, cb) => { 
        
            // Set the filetypes, it is optional 
            var filetypes = /jpeg|jpg|png|json|txt/; 
            var mimetype = filetypes.test(file.mimetype); 
    
            var extname = filetypes.test(path.extname( 
                        file.originalname).toLowerCase()); 
            
            if (mimetype && extname) { 
                return cb(null, true); 
            } 
        
            cb("Error: File upload only supports the "
                    + "following filetypes - " + filetypes); 
        }  
    
    // mypic is the name of file attribute 
    }).single('fileupload');

    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req, res, (err) => { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 

            //res.send(err) 
            //var err = new Error('File is empty.');
            //err.status = 404;
            return next(err);
        } 
        else { 
            // on file upload success, start tweet.
            if(req.body.tweetnow)
            {
                req.body.filename = fileName;
                this.readFile(req, res, next);
            }

            // SUCCESS, image successfully uploaded 
            //res.send("Success, File uploaded!") 
            res.render('index', { filename: fileName, error: null, message: 'File uploaded succesfully.' });
        } 
    }) 
};