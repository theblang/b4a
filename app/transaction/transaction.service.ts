import { Injectable } from '@angular/core';
import { AngularFire, FirebaseDatabase, FirebaseListObservable } from 'angularfire2';
import { Transaction } from './transaction.model';
import { Category } from '../category/category.model';
import 'rxjs/add/operator/first';

@Injectable()
export class TransactionService {
    private database: FirebaseDatabase;

    constructor(private angularFire: AngularFire) {
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

    addTransaction(transaction: Transaction) {
        let transactionKey = this.database.list(Transaction.DB_NAME).push(transaction.toJSON()).key();
        this.database.object(Category.DB_NAME + '/' + transaction.category + Transaction.DB_NAME).update({
            [transactionKey]: true
        });
    }

    removeTransaction($key: string) {
        if ($key) {
            return this.database.list(Transaction.DB_NAME).remove($key);
        }
        else {
            throw Error("Must have a key to remove a transaction");
        }
    }
}