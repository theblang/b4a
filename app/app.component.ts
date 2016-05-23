import { Component, OnInit } from '@angular/core';
import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AccountsComponent } from './accounts.component.ts';
import { AccountService } from './account.service.ts';
import * as _ from 'underscore';
import * as lf from 'lf';

@Component({
    selector: 'b4a',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        AccountService
    ]
})

@Routes([
    {
        path: '/dashboard',
        component: DashboardComponent
    },
    {
        path: '/accounts',
        component: AccountsComponent
    }
])

export class AppComponent implements OnInit {
    title = 'Budget 4 All'
    test = 0;
    
    constructor(private router: Router) {
        _(5).times((n) => {
            this.test += n;
            console.log(n);
        });
    }
    
    ngOnInit() {
        this.router.navigate(['/accounts'])
    }
}
