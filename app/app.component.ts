import { Component, OnInit } from '@angular/core';
import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AccountsComponent } from './accounts.component';
import { AccountService } from './account.service';

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
    
    constructor(private router: Router) {}
    
    ngOnInit() {
        this.router.navigate(['/dashboard'])
    }
}
