import {Component} from 'angular2/core';

import {LogWindowComponent} from './log-window.component';
import {SubmitFormComponent} from './submit-form.component';

// import {AllImagesComponent} from './all-images.component';
import {PopupStylesComponent} from './popup-styles.component';
import {PopupContentComponent} from './popup-content.component';

import {NeuralStyleDataService} from './neural-style-data.service';
import {SocketService} from './socket.service';


@Component({	
	selector: 'master',
	
	
	templateUrl:'app/html/master.component.html',
	styleUrls: [],
	directives: [
	LogWindowComponent,
	SubmitFormComponent,
	PopupStylesComponent,
	PopupContentComponent
	],

	providers: [SocketService,NeuralStyleDataService]
})

export class MasterComponent {
	


}

