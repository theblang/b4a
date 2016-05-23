import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Account } from './account'
import { AccountService } from './account.service.ts'
import { AngularFire, FirebaseListObservable } from 'angularfire2'

@Component({
    selector: 'budget',
    templateUrl: 'app/budget.component.html'
})

export class BudgetComponent {
    constructor() { }
    
    ngOnInit() { }
}
