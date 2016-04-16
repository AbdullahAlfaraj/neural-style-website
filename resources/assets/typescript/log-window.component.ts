import {Component, Injectable, OnInit, AfterContentInit} from 'angular2/core';
// import {LogService} from './log.service';
import {SocketService} from './socket.service';

import {NeuralStyleDataService} from './neural-style-data.service';
import {NeuralStyleDataModel} from './neural-style-data.model';
@Component({
	selector:'log-window',
	templateUrl:'app/html/log-window.component.html',
	providers:[]
	// providers:[LogService,SocketService]

})

// var socket = io();

export class LogWindowComponent implements OnInit{
	// log: string;
	private _socket;
	// log = "this is a log message";
	nsData:NeuralStyleDataModel;
	command:string ="";

	
	// getLog(){
	// 	this._logService.getLog().then(log => this.log = log);
	// }
	resetLog(){this.nsData.log = "";}

	constructor(private _socketService:SocketService,private _neuralStyleDataService:NeuralStyleDataService){
		
		this._socket = _socketService.getSocket();
		this.nsData = _neuralStyleDataService.getNeuralStyleData();
		this._socket.on('LogLiveEvent', data => {
			this.nsData.log  += data.log;
			this.command = data.command;

		});



		// this._socket.emit('submitEvent');
		
	}	


	ngOnInit(){
			// this.getLog();
		}

	}


