import { Injectable } from '@angular/core';
import { AngularFire, FirebaseDatabase, FirebaseListObservable } from 'angularfire2';
import { Transaction } from './transaction.model'

@Injectable()
export class TransactionService {
    private database: FirebaseDatabase;
    
    constructor(private angularFire: AngularFire) {
        this.database = this.angularFire.database;
    }
    
    getTransactions(startAt: number = 0, endAt: number = 50): FirebaseListObservable<Transaction[]> {
         return this.angularFire.database.list('/transactions');
        // return this.angularFire.database.list('/transactions', {
        //     query: {
        //         startAt: startAt,
        //         endAt: endAt
        //     }
        // });
    }
    
    addTransaction(transaction: Transaction) {
        return this.database.list('/transactions').push(transaction);
    }
    
    // getBudgets(): FirebaseListObservable<Budget[]> {
    //     return this.list;
    // }

    // getBudget(budgetId: string) {
    //     return this.angularFire.database.object('/budgets/' + budgetId);
    // }

    // addBudget(budget: Budget): FirebaseWithPromise<void> {
    //     return this.list.push(budget.toJSON());
    // }

    // updateBudget(budget: Budget) {
    //     return this.list.update(budget.$key, budget.toJSON());
    // }

    // removeBudget($key: string): Promise<void> {
    //     if ($key) {
    //         return this.list.remove($key);
    //     }
    //     else {
    //         throw Error("Must have a key to remove a budget");
    //     }
    // }
}