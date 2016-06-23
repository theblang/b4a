import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { AppComponent, ROUTES } from './app.component';
import { AppConfig } from './app.config';

bootstrap(AppComponent, [
    provideRouter(ROUTES),
    HTTP_PROVIDERS,
    FIREBASE_PROVIDERS,
    // provide(APP_BASE_HREF, { useValue: '/' }),
    // provide(LocationStrategy, {useClass: HashLocationStrategy}),
    defaultFirebase({
        apiKey: AppConfig.API_KEY,
        databaseURL: AppConfig.DATABASE_URL,
        authDomain: AppConfig.AUTH_DOMAIN,
        storageBucket: AppConfig.STORAGE_BUCKET,
    })
]);
