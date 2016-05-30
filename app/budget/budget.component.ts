import { Component, Input } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2';
import { Budget } from './budget.model';
import { BudgetService } from './budget.service';
import { Category } from './category.model';

@Component({
    selector: 'budget',
    templateUrl: 'app/budget/budget.component.html'
})

export class BudgetComponent {
    @Input() budgetJson;
    public budget: Budget;

    constructor(private budgetService: BudgetService) { }
    ngOnInit() {
        this.budget = new Budget(this.budgetJson.name, this.budgetJson.categories, this.budgetJson.$key);
    }

    removeBudget(key) {
        this.budgetService.removeBudget(key);
    }

    addCategory(name: string, budget: Budget) {
        budget.categories.push(new Category(name));
        this.budgetService.updateBudget(budget);
    }
}
