import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

bootstrap(AppComponent, [
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    FIREBASE_PROVIDERS,
    defaultFirebase('https://b4a.firebaseio.com/')
]);
