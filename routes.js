var fs = require("fs");
// app = express();



module.exports = function(app, express) {


	app.use("/", express.static(__dirname + '/public'));
	app.set('root', __dirname + '/public');
	// console.log("public dir: " + app.set("root"));



	app.get('/', function(req, res) {

		// res.sendFile(__dirname +'/'+inPublicDir('index.html'));
		res.sendFile(app.set('root') + '/index.html');


	});
	// app.get('/nsw', function(req, res) {

	// 	// res.sendFile(__dirname + '/'+inPublicDir('index2.html'));
	// 	// res.sendFile(__dirname + '/public/index2.html');
	// 	res.sendFile(app.set('root') + '/index2.html');

	// 	// res.sendFile('index2.html');


	// });


	//request to get the images url from the server
	app.get('/images/get', function(req, res) {

		var uploadsDir = 'uploads';
		fs.readdir(__dirname + '/public/uploads', function(err, files) {

			for (var i = 0; i < files.length; ++i) {
				files[i] = `${uploadsDir}/${files[i]}`;

			}
			// console.log("all files: ", files);
			res.end(JSON.stringify({filesUrl: files}));
		});
	});

	//run request to run the neural style program
	app.post('/neural-style/run', function(req, res) {



	});

	app.get('/*', function(req, res) {

		// res.sendFile(__dirname + '/'+inPublicDir('index2.html'));
		// res.sendFile(__dirname + '/public/index2.html');
		// res.sendFile(app.set('root')+ '/index2.html');

		// res.sendFile('index2.html');
		return false;

	});



}