import { Injectable } from '@angular/core';
import { AngularFire, FirebaseDatabase, FirebaseListObservable } from 'angularfire2';
import { Category } from './category.model'
import { Transaction } from '../transaction/transaction.model'

@Injectable()
export class CategoryService {
    private database: FirebaseDatabase;

    constructor(private angularFire: AngularFire) {
        this.database = this.angularFire.database;
    }

    getCategoriesObservable(startAt: number = 0, endAt: number = 50): FirebaseListObservable<Category[]> {
        return this.database.list(Category.DB_NAME);
    }

    addCategory(category: Category): firebase.database.ThenableReference {
        return this.database.list(Category.DB_NAME).push(category.toJSON());
    }

    removeCategory($key: string): firebase.Promise<void> {
        if ($key) {
            return this.database.list(Category.DB_NAME).remove($key);
        }
        else {
            throw Error("Must have a key to remove a category");
        }
    }

    addTransactionToCategory(transaction: Transaction) {
        return this.database.object(Category.DB_NAME + '/' + transaction.category + Transaction.DB_NAME).update({
            [transaction.$key]: transaction.amount
        });
    }

    removeTransactionFromCategory(transaction: Transaction): firebase.Promise<void> {
        return this.database
            .object(Category.DB_NAME + '/' + transaction.category + Transaction.DB_NAME + '/' + transaction.$key)
            .remove();
    }
}