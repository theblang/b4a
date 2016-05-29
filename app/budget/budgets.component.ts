import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { BudgetComponent } from './budget.component';
import { BudgetService } from './budget.service';
import { Budget } from './budget.model';

@Component({
    selector: 'budgets',
    templateUrl: 'app/budget/budgets.component.html',
    directives: [BudgetComponent]
})

export class BudgetsComponent {
    public budgets: FirebaseListObservable<Budget[]>;
    
    constructor(private budgetService: BudgetService) { }
    ngOnInit() { 
        this.budgets = this.getBudgets();
    }

    getBudgets(): FirebaseListObservable<Budget[]> {
        return this.budgetService.getBudgets();
    }
    
    addBudget(name: string): FirebaseWithPromise<void> {
        return this.budgetService.addBudget(new Budget(name));
    }
}
