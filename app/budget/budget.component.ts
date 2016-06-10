import { Component, Input, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2';
import { Budget } from './budget.model';
import { BudgetService } from './budget.service';
import { Category } from '../category/category.model';

@Component({
    selector: 'budget',
    templateUrl: 'app/budget/budget.component.html'
})
export class BudgetComponent implements OnInit {
    @Input() budgetJson;
    public budget: Budget;
    public hasChanges: boolean;
    private originalBudget: Budget;

    constructor(private budgetService: BudgetService) { }

    ngOnInit() {
        this.originalBudget = new Budget(this.budgetJson.name, this.budgetJson.categories, this.budgetJson.$key);
        this.budget = new Budget(this.budgetJson.name, this.budgetJson.categories, this.budgetJson.$key);
    }

    removeBudget(budget: Budget) {
        this.budgetService.removeBudget(budget.$key);
    }

    addCategory(name: string, budget: Budget) {
        throw Error('Fix this');
        //budget.categories.push(new Category(name));
        //this.budgetService.updateBudget(budget);
    }

    saveBudget(budget: Budget) {
        this.budgetService.updateBudget(budget);
    }
}
