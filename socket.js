var port = 4000;


var express = require("express");
app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var mkdirp = require('mkdirp');

var exec = require('child_process').exec;
var execFile = require('child_process').execFile;

var spawn = require('child_process').spawn;
// var app = require('express')


var routes = require('./routes')(app, express);

//autoIncrement
var autoIncrement = require('./init-database').getNextCounter;

function User(socketId) {
	this.socketId = socketId;
	this.isLive = true;
	this.ProcessIds = null;
	this.outputDirBaseName = null;

}
var users = [];



function filesInDir(dir, rootDir, callback) {
	// var rootDir = __dirname + '/public';
	fs.readdir(`${rootDir}/${dir}`, function(err, files) {

		for (var i = 0; i < files.length; ++i) {
			files[i] = `${dir}/${files[i]}`;

		}
		// console.log("all files: ", files);
		callback(files);
	});
}
// find the user index associated with the socketId
function socketIdToUserIdx(socketId, usres) {
	for (var i = 0; i < users.length; ++i) {
		if (users[i].socketId == socketId)
			return i;
	}

	return -1;
}

function removeUserDependencies(users, userIdx) {
	pid = users[userIdx].ProcessIds;
	if (pid != null)
		spawn("sh", ["-c", "kill -TERM " + pid]);
}


function sendOutputImages(socket) {

	userIdx = socketIdToUserIdx(socket.id);
	if (users[userIdx] == undefined)
		return;

	filesInDir(users[userIdx].outputDirBaseName, app.set('root'),
		function(files) {
			if (files.length < 1)
				return;


			//wait the images 10secs to be written
			setTimeout(function() {
				userIdx = socketIdToUserIdx(socket.id);
				if (userIdx > -1) {

					var resData = {
						outputDirBaseName: users[userIdx].outputDirBaseName,
						outputImages: files
					};
					socket.emit('outputDirUpdateEvent', resData);

				}

			}, 5000);


		});



}

function runNeuralStyle(socket,
	style_images,
	content_image,
	output_image,
	model_file,
	proto_file,
	gpu,
	backend,
	num_iterations,
	seed,
	content_layers,
	style_layers,
	content_weight,
	style_weight,
	image_size,
	optimizer) 

{

	var base_dir = "./neural-style";
	var imgs_base_dir = app.set('root');
	for (var i = 0; i < style_images.length; ++i) {
		style_images[i] = `${imgs_base_dir}/${style_images[i]}`;
	}

	style_images = style_images.join();
	


	filename_output = output_image + "/result.png"; //'./public/bio.png' //`${imgs_base_dir}/${outputDir}/bio.png`;
	
	

	var command = `th ${base_dir}/neural_style.lua -style_image ${style_images} -content_image ${imgs_base_dir}/${content_image} -output_image ${filename_output} -model_file ${base_dir}/${model_file} -proto_file ${base_dir}/${proto_file} -gpu ${gpu} -backend ${base_dir}/${backend} -num_iterations ${num_iterations} -seed ${seed} -content_layers ${content_layers} -style_layers ${style_layers} -content_weight ${content_weight} -style_weight ${style_weight} -image_size ${image_size} -optimizer ${optimizer}`;


	commandArry = command.split(' ');
	commandName = commandArry[0];
	commandParms = commandArry.slice(1);
	// var shell_process = execFile(commandName,commandParms,function(err, out, code) {
	// var shell_process = spawn(commandName,commandParms,function(err, out, code) {


	// 	if (err instanceof Error)
	// 	{
	// 		console.log("error: ",err);
	// 		throw err;
	// 	}

	// 	console.log(out);

	// 	// process.exit(code);
	// });

	userIdx = socketIdToUserIdx(socket.id);



	var shell_process = spawn(commandName, commandParms);

	if (userIdx > -1) {
		removeUserDependencies(users, userIdx);
		users[userIdx].ProcessIds = shell_process.pid;
	}


	shell_process.stdout.on('data', function(data) {
		console.log(data.toString());
		console.log(+shell_process.pid);
		socket.emit("LogLiveEvent", {
			user_id: socket.id,
			command: command,
			log: data.toString()
		});
		sendOutputImages(socket);

	});

	shell_process.stdout.on('end', () => sendOutputImages(socket));

	// shell_process.on('exit', function (code, signal) {
	// 	console.log('child process terminated due to receipt of signal '+signal);
	// });
	// shell_process.exit();
	// shell_process.kill();
}



io.on('connection', function(socket) {
	// socket.setNoDelay(true);
	console.log('a user connected');
	users.push(new User(socket.id));


	socket.on('disconnect', function() {
		console.log('user disconnected');
		userIdx = socketIdToUserIdx(socket.id);

		if (userIdx > -1) {
			removeUserDependencies(users, userIdx);

			users.splice(userIdx, 1);
		}
		//	console.log('all users:', users);
	});

	socket.on('submitEvent', function(data) {
		console.log('recieved a submition');

		console.log("submitEvent data \n\n", data);

		
		

		var submitId = autoIncrement(function(count) {
			console.log('submitId: ', count);

			
			// var styleUrls = [data.styleUrls,"uploads/fruit-04.jpg"];
			// runNeuralStyle(socket,
			// 	data.contentUrl,
			// 	data.styleUrls,
			// 	numItr,
			// 	styleWeight,
			// 	outputDir);

			// var styleUrls = data.styleUrls;
			// 	contentUrl
			// 	outputName, 
			// 	modelFile, 
			// 	ProtoFile, 
			// 	gpuId,
			// 	backend, 
			// 	numItr, 
			// 	seed , 
			// 	contentLayers, 
			// 	styleLayers, 
			// 	contentWeight ,
			// 	styleWeight, 
			// 	imageSize, 
			// 	optimizer

			//output image will always be "result*.png" 
			outputDir = app.set('root') + `/output/${count}`;
			mkdirp(outputDir);

			userIdx = socketIdToUserIdx(socket.id);
			if (userIdx > -1)
				users[userIdx].outputDirBaseName = `output/${count}`;

			var outputName = outputDir;

			 // round to the nearest hundred 
			 var numItr = Math.floor(data.numItr / 100) * 100;
			 var contentWeight = Math.floor(data.contentWeight);
			 var styleWeight = Math.floor(data.styleWeight);
			 var imageSize = Math.floor(data.imageSize);

			 runNeuralStyle(socket,
			 	data.styleUrls,
			 	data.contentUrl, 
			 	outputName, 
			 	data.modelFile, 
			 	data.ProtoFile, 
			 	data.gpuId,
			 	data.backend, 
			 	numItr, 
			 	data.seed , 
			 	data.contentLayers, 
			 	data.styleLayers, 
			 	contentWeight ,
			 	styleWeight, 
			 	imageSize, 
			 	data.optimizer);

			// socket.emit('outputDirUpdateEvent',{outputDir:outputDir});

		});

	});


	socket.on('cancelEvent', function(data) {
		console.log('recieved a cancellation request');

		console.log("cancelEvent data \n\n", data);

		userIdx = socketIdToUserIdx(socket.id);
		if (userIdx > -1) {
			removeUserDependencies(users, userIdx);
		}

		// runNeuralStyle(socket, data.contentUrl, data.styleUrl, numItr);
		// socket.emit("submit_result",{user_id:socket.id,command:command});
	});

	console.log("user_id: ", socket.id);
	
	});

http.listen(port, function() {

	console.log(`the server is up on http://localhost:${port}`);
});
