var bodyParser = require('body-parser');
var fs = require("fs");
var multer = require('multer');
var path = require('path');
var mime = require('mime');
var magic = require('stream-mmmagic');
var request = require('request');

module.exports = function(app, express) {


	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
	

	app.use("/", express.static(__dirname + '/public'));
	app.set('root', __dirname + '/public');

	var upload = multer({
		dest: app.set('root') + '/uploads/'
	});



	app.get('/', function(req, res) {

		
		res.sendFile(app.set('root') + '/index.html');


	});



	//request to get the images url from the server
	app.get('/images/get', function(req, res) {

		var uploadsDir = 'uploads';
		fs.readdir(__dirname + '/public/uploads', function(err, files) {

			for (var i = 0; i < files.length; ++i) {
				files[i] = `${uploadsDir}/${files[i]}`;

			}
			// console.log("all files: ", files);
			res.end(JSON.stringify({
				filesUrl: files
			}));
		});
	});

	//run request to run the neural style program
	app.post('/neural-style/run', function(req, res) {



	});

	//upload files 
	app.post('/upload', upload.array('uploads', 12), function(req, res, next) {
		// req.files is array of `photos` files
		// req.body will contain the text fields, if there were any
		console.log("post multiple /upload hit");
		res.end("you have upload files");
	});



	app.post('/upload/url', function(req, res) {
		console.log("/upload/url/ upload file by url hit");
		console.log("req: ", req.body);
		

		var file = req.body.imageUrl;
		var dest = app.set("root") + "/uploads/";
		var filename = path.basename(file);
		var mimetype = mime.lookup(file);
		var destFilePath = dest + filename;
		console.log("filename: ", filename);
		console.log("mimetype: ", mimetype);
		console.log("dest+filename : ", dest + filename);




		function isVaildImageType(type){
			console.log("type: ",type);
			if(type == "image/jpeg" ||
				type == "image/png")
				return true;

			return false;
		}

		if(isVaildImageType(mimetype))
		{

			
			var validUrl = require('valid-url');
			suspect = file;
			if (validUrl.isUri(suspect)){
				console.log('Looks like an URI');

				var r = request(file);

				r.on('response',function(resp) {

					if(resp.statusCode === 200)
					{
						var uploadsDir = 'uploads';
						
						var stream = r.pipe(fs.createWriteStream(destFilePath));
						
						stream.on('finish',function(){

							res.end(JSON.stringify({
								uploadedImageUrl: `${uploadsDir}/${filename}`
							}));
							
						});
						
					}
				});
				r.on('err',function(err) {

					if(err) throw err;
				});


			} else {
				console.log('Not a URI');
			}


			

		}


	
	});
	
	app.get('/*', function(req, res) {

		return false;

	});



}