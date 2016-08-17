import { Component, OnInit } from '@angular/core';
import { Router, RouterConfig, ROUTER_DIRECTIVES} from '@angular/router';
import * as _ from 'underscore';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './account/accounts.component';
import { AccountComponent } from './account/account.component';
import { LocalStorageService } from './common/local-storage.service';
import { DatabaseService } from './common/database.service';
import { AccountService } from './account/account.service';
import { BudgetService } from './budget/budget.service';
import { BudgetsComponent } from './budget/budgets.component';
import { TransactionService } from './transaction/transaction.service';
import { TransactionsComponent } from './transaction/transactions.component';
import { CategoriesComponent } from './category/categories.component';
import { CategoryService } from "./category/category.service";

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
        LocalStorageService,
        DatabaseService,
        AccountService,
        BudgetService,
        TransactionService,
        CategoryService
    ]
})
export class AppComponent implements OnInit {
    public appTitle: string = 'Budget 4 All'
    public activeBudget: string = null;
    public budgets: string[] = [];

    constructor(
        private localStorageService: LocalStorageService,
        private databaseService: DatabaseService,
        private budgetService: BudgetService,
        private router: Router) { }

    ngOnInit() {
        this.budgets = this.localStorageService.getBudgets();
        this.activeBudget = this.localStorageService.getActiveBudget();
        this.databaseService.connect();    
    }

    setTargetBudget(budget: string): void {
        this.localStorageService.setActiveBudget(budget);
    }
}
