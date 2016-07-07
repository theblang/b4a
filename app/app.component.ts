import { Component, OnInit } from '@angular/core';
import { Router, RouterConfig, ROUTER_DIRECTIVES} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './account/accounts.component';
import { AccountComponent } from './account/account.component';
import { DatabaseService } from './common/database.service';
import { AccountService } from './account/account.service';
import { BudgetService } from './budget/budget.service';
import { BudgetsComponent } from './budget/budgets.component';
import { TransactionService } from './transaction/transaction.service';
import { TransactionsComponent } from './transaction/transactions.component';
import { CategoryService } from './category/category.service';
import { CategoriesComponent } from './category/categories.component';
import * as _ from 'underscore';

export const ROUTES: RouterConfig = [
    { path: '', component: DashboardComponent, terminal: true },
    { path: 'accounts', component: AccountsComponent },
    { path: 'account/:id', component: AccountComponent },
    { path: 'budgets', component: BudgetsComponent },
    { path: 'transactions', component: TransactionsComponent },
    { path: 'categories', component: CategoriesComponent }
];

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        DatabaseService,
        AccountService,
        BudgetService,
        TransactionService,
        CategoryService
    ]
})
export class AppComponent implements OnInit {
    title = 'Budget 4 All'
    test = 0;

    constructor(private databaseService: DatabaseService, private router: Router) {
        _(5).times((n) => {
            this.test += n;
        });
    }

    ngOnInit() { }
}
