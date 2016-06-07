import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AccountsComponent } from './account/accounts.component';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account/account.service';
import { BudgetService } from './budget/budget.service';
import { BudgetsComponent } from './budget/budgets.component';
import { TransactionService } from './transaction/transaction.service';
import { TransactionsComponent } from './transaction/transactions.component';
import { CategoryService } from './category/category.service';
import { CategoriesComponent } from './category/categories.component';
import * as _ from 'underscore';
import * as lf from 'lf';

@Component({
    selector: 'b4a',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        AccountService,
        BudgetService,
        TransactionService,
        CategoryService
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
    },
    {
        path: '/account/:id',
        component: AccountComponent
    },
    {
        path: '/budgets',
        component: BudgetsComponent
    },
    {
        path: '/transactions',
        component: TransactionsComponent
    },
    {
        path: '/categories',
        component: CategoriesComponent
    }
])

export class AppComponent implements OnInit {
    title = 'Budget 4 All'
    test = 0;
    
    constructor(private router: Router) {
        _(5).times((n) => {
            this.test += n;
        });
        
        this.router.navigate
    }
    
    ngOnInit() {
        this.router.navigate(['/categories'])
    }
}
