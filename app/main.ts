import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    FIREBASE_PROVIDERS,
    // provide(APP_BASE_HREF, { useValue: '/' }),
    // provide(LocationStrategy, {useClass: HashLocationStrategy}),
    defaultFirebase(AppSettings.API_ENDPOINT)
]);
