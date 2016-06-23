import { Injectable } from '@angular/core';
import { AngularFire, FirebaseDatabase, FirebaseListObservable } from 'angularfire2';
import { Transaction } from './transaction.model';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';
import 'rxjs/add/operator/first';

@Injectable()
export class TransactionService {
    private database: FirebaseDatabase;

    constructor(private angularFire: AngularFire, private categoryService: CategoryService) {
        this.database = this.angularFire.database;
    }

    getTransactionsObservable(startAt: number = 0, endAt: number = 50): FirebaseListObservable<Transaction[]> {
        return this.angularFire.database.list(Transaction.DB_NAME, {
            query: {
                limitToFirst: 50
                // startAt: startAt,
                // endAt: endAt
            }
        });
    }

    /**
     * Adds a new Transaction and creates an index in the Category
     */
    addTransaction(transaction: Transaction) {
        transaction.$key = this.database.list(Transaction.DB_NAME).push(transaction.toJSON()).key;
        this.categoryService.addTransactionToCategory(transaction);
    }

    /**
     * Removes a transaction and deletes the corresponding index value in Category
     */
    removeTransaction(transaction: Transaction) {
        this.database.list(Transaction.DB_NAME).remove(transaction.$key);
        this.categoryService.removeTransactionFromCategory(transaction);
    }
}