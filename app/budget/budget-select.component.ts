import {Component, OnInit} from "@angular/core";
import {LocalStorageService} from "../common/local-storage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'budget-select',
    templateUrl: 'app/budget/budget-select.component.html'
})
export class BudgetSelectComponent implements OnInit {
    public budgets: string[];

    constructor(private localStorageService: LocalStorageService,
                private router: Router) {
    }

    ngOnInit() {
        this.budgets = this.localStorageService.getBudgets();
    }

    addBudget(budget) {
        this.localStorageService.addBudget(budget);
        this.budgets = this.localStorageService.getBudgets();
    }

    setActiveBudget(budget) {
        this.localStorageService.setActiveBudget(budget);
        this.router.navigate(['/']);
    }
}
