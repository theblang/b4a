import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Account } from './account';
import { AccountService } from './account.service';
import { BudgetComponent } from './budget.component';
import { Budget } from './budget';

@Component({
    selector: 'budgets',
    templateUrl: 'app/budgets.component.html',
    directives: [BudgetComponent]
})

export class BudgetsComponent {
    
    constructor() { }
    ngOnInit() { }
}
