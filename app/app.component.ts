import {Component, OnInit} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {LocalStorageService} from "./common/local-storage.service";
import {DatabaseService} from "./common/database.service";
import {AccountService} from "./account/account.service";
import {BudgetService} from "./budget/budget.service";
import {TransactionService} from "./transaction/transaction.service";
import {CategoryService} from "./category/category.service";

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: []
})
export class AppComponent implements OnInit {
    public appTitle: string = 'Budget 4 All'
    public activeBudget: string = null;
    public budgets: string[] = [];

    constructor(private localStorageService: LocalStorageService,
                private databaseService: DatabaseService,
                private budgetService: BudgetService,
                private router: Router) {
    }

    ngOnInit() {
        this.budgets = this.localStorageService.getBudgets();
        this.activeBudget = this.localStorageService.getActiveBudget();
        this.databaseService.connect();
    }

    setTargetBudget(budget: string): void {
        this.localStorageService.setActiveBudget(budget);
    }
}
