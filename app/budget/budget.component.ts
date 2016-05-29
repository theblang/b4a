import { Component, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Budget } from './budget.model';

@Component({
    selector: 'budget',
    templateUrl: 'app/budget/budget.component.html'
})

export class BudgetComponent {
    @Input() budgetId: string;
    private budget: FirebaseObjectObservable<Budget>;
    
    constructor(private angularFire: AngularFire) { }
    
    ngOnInit() { 
        this.budget = this.angularFire.database.object('/budgets/' + this.budgetId);
    }
}
