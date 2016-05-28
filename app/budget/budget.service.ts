import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Budget } from './budget.model';

@Injectable()
export class BudgetService {
    private list: FirebaseListObservable<Budget[]>;

    constructor(private angularFire: AngularFire) {
        this.list = angularFire.database.list('/budgets');
    }

    getBudgets(): FirebaseListObservable<Budget[]> {
        return this.list;
    }
    
    getBudget() {
        
    }
    
    addBudget(budget: Budget): FirebaseWithPromise<void> {
        return this.list.push(budget);
    }

    updateBduget() {
    }
    
    

    // updateBudget() {
    //     return this.list;
    // }

    // getAccounts(): FirebaseListObservable<Account[]> {
    //     return this.angularFire.database.list('/accounts');
    // }

    // addAccount(account: Account): FirebaseWithPromise<void> {
    //     return this.angularFire.database.list('/accounts').push(account);
    // }

    // removeAccount(key: string): Promise<void> {
    //     return this.angularFire.database.list('/accounts').remove(key);
    // }
}