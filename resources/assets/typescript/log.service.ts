// import {Injectable,OnInit,AfterContentInit} from 'angular2/core';

// @Injectable()
// export class LogService{
// 	private _socket;
// 	constructor(){
// 		// this._socket = socketConnetction();

// 		var command = "";
		

		

// 		// var Ref = this;
// 		// socketFunc(function(data){
// 		// 	Ref.log = data.command;
// 		// });
// 		// this._socket = socketFunc({});

// 	}
// 	// getLog(){
// 	// 	// this._socket.emit('submit');
// 	// 	var Ref = this;
// 	// 	return new Promise<string>(resolve =>

// 	// 		// resolve("promise has been resolved!")
// 	// 		// socketFunc(data => resolve(data.command))
// 	// 		// this._socket = socketFunc(data => resolve(data.command))

// 	// 		// this.onSubmitResultEvent(data => resolve(data.command))
// 	// 		// setTimeout(()=>this.onSubmitResultEvent(data => resolve(data.command)),5000)
// 	// 		// setTimeout(()=> resolve("this took 5 sec"),5000)
			
// 	// 		setTimeout(() => {
// 	// 			._socket.emit('submit');
// 	// 			// this.onSubmitResultEvent(data => resolve(data.command),5000)
// 	// 			// resolve("what 5 sec!, that's too long.")
// 	// 			// Ref.onSubmitResultEvent(function(){	
// 	// 				Ref.onSubmitResultEvent(function(data){
// 	// 				// resolve(data.command);
// 	// 				// resolve("what 5 sec!, that's too long.")
// 	// 				resolve(data.command);
// 	// 			});
// 	// 			// resolve("what 5 sec!, that's too long.")

// 	// 		},5000)
// 	// 		);


// 	// 	// return Promise.resolve()
// 	// }

// 	// private onSubmitResultEvent(callbackFunc){
// 	// 	this._socket.on('submit_result',function(data){
// 	// 		console.log("data: %o",data);
// 	// 		//command = data.command;
// 	// 		callbackFunc(data);
// 	// 	});
// 	// }

// 	// ngAfterContentInit() {

// 	// 	this._socket.on('submit_result',function(data){
// 	// 		console.log("data: %o",data);
// 	// 		//command = data.command;
// 	// 		callbackFunc(data);
// 	// 	});

		
//     // // for emit to the server
//     // this._socket.on('connect', () =>
//     // 	this._socket.emit('myCssData',this.cssData);
//     // 	);
//     // // for listening to the server
//     // this._socket.on('recordOK', (data) =>
//     // 	console.log(data);
//     // 	);
// // }


// // ngOnInit(){
// // 	this._socket = socketConnetction();
// // }
// }

// // function socketFunc(callbackFunc){
// // 	var socket = io();
// // 	var command = "";
// // 	socket.on('submit_result',function(data){
// // 		console.log("data: %o",data);
// // 		command = data.command;
// // 		callbackFunc(data);
// // 	});

// // 	socket.emit('submit');
// // 	return socket;
// // }

// // function socketConnetction(){
// // 	var socket = io();
// // 	return socket;
// // }

