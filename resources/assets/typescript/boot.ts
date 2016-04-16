import {bootstrap}    from 'angular2/platform/browser';
import {MasterComponent} from './master.component';
// import {LogWindowComponent} from './log-window.component';
// import {MetaDataFormComponent} from './metadata-form.component';
// import {UploadsImgsComponent} from './uploads-imgs.component';

import {HTTP_PROVIDERS} from 'angular2/http';

// import {AppComponent} from './app.component';
bootstrap(MasterComponent,[HTTP_PROVIDERS]);


// bootstrap(LogWindowComponent);
// bootstrap(MetaDataFormComponent);
// bootstrap(UploadsImgsComponent,[HTTP_PROVIDERS]);
