var express = require("express")
var multer = require('multer')
var app = express()
var path = require('path')
var ejs = require('ejs')
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index')
});
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

var s3 = new aws.S3({
    "accessKeyId": "XXXXXXXXXXXXXXXXXXXX",
    "secretAccessKey": "XXXXXXXXXXXXXXXXXXXXXXXXXX"
})

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'BUCKETNAME',
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, req.body));
        },
        key: function (req, file, cb) {
            console.log('file' + JSON.stringify(file));
            console.log('param');
            console.log(req.body);
            console.log(req.params);
            cb(null, file.fieldname + "/" + Date.now().toString() + "_" + file.originalname)
        }
    })
}).any()

app.post('/', function (req, res) {
    console.log(req.body);
    console.log(req.params);
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading 
            return
        }
        res.send('Successfully uploaded ' + req.files + ' files!')
        // Everything went fine 
    })
})

var port = process.env.PORT || 8008
app.listen(port, function () {
    console.log('Node.js listening on port ' + port)
});