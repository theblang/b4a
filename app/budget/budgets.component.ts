import { Component, OnInit } from '@angular/core';
import { BudgetComponent } from './budget.component';

@Component({
    selector: 'budgets',
    templateUrl: 'app/budget/budgets.component.html',
    directives: [BudgetComponent]
})

export class BudgetsComponent {
    
    constructor() { }
    ngOnInit() { }
}
