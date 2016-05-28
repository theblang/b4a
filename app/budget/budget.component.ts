import { Component, Input } from '@angular/core';
import { Budget } from './budget.model';

@Component({
    selector: 'budget',
    templateUrl: 'app/budget/budget.component.html'
})

export class BudgetComponent {
    @Input() budget: Budget;
    
    constructor() { }
    
    ngOnInit() { }
}
