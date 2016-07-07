import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent, ROUTES } from './app.component';

bootstrap(AppComponent, [
    provideRouter(ROUTES),
    HTTP_PROVIDERS,
    // provide(APP_BASE_HREF, { useValue: '/' }),
    // provide(LocationStrategy, {useClass: HashLocationStrategy}),
]);
