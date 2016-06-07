import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Budget } from './budget.model';
import { Category } from '../category/category.model';

@Injectable()
export class BudgetService {
    private list: FirebaseListObservable<Budget[]>;

    constructor(private angularFire: AngularFire) {
        this.list = angularFire.database.list('/budgets');
    }

    getBudgets(): FirebaseListObservable<Budget[]> {
        return this.list;
    }

    getBudget(budgetId: string) {
        return this.angularFire.database.object('/budgets/' + budgetId);
    }

    addBudget(budget: Budget): FirebaseWithPromise<void> {
        return this.list.push(budget.toJSON());
    }

    updateBudget(budget: Budget) {
        return this.list.update(budget.$key, budget.toJSON());
    }

    removeBudget($key: string): Promise<void> {
        if ($key) {
            return this.list.remove($key);
        }
        else {
            throw Error("Must have a key to remove a budget");
        }
    }
}