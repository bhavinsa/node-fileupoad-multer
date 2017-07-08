var express = require("express")
var multer = require('multer')
var app = express()
var path = require('path')
var ejs = require('ejs')
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
	res.render('index')
})

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads')
	},
	filename: function (req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

var upload = multer({
	storage: storage,
	fileFilter: function (req, file, callback) {
		var ext = path.extname(file.originalname)
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.txt') {
			return callback(res.end('Only images are allowed'), null)
		}
		callback(null, true)
	}
}).array('userFile', 2);

app.post('/', function (req, res) {
	upload(req, res, function (err) {
		res.end('File is uploaded')
	});
})

var port = process.env.PORT || 80
app.listen(port, function () {
	console.log('Node.js listening on port ' + port)
});