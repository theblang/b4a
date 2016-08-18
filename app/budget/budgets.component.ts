import {Component} from "@angular/core";
import {BudgetComponent} from "./budget.component";
import {BudgetService} from "./budget.service";
import {Budget} from "./budget.model";

@Component({
    selector: 'budgets',
    templateUrl: 'app/budget/budgets.component.html',
    directives: [BudgetComponent]
})

export class BudgetsComponent {
    public budgets;

    constructor(private budgetService: BudgetService) {
    }

    ngOnInit() {
        this.budgets = this.getBudgets();
    }

    getBudgets() {
        return this.budgetService.getBudgets();
    }

    addBudget(name: string) {
        return this.budgetService.addBudget(new Budget(name));
    }
}
