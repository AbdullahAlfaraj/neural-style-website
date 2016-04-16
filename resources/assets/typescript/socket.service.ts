import {Injectable} from 'angular2/core';

@Injectable()
export class SocketService{
	
	private _socket;
	constructor() {
		this._socket = io();
	}
	public getSocket(){
		return this._socket;
	}
}