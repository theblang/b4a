import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
])
