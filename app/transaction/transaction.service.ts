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
        //  return this.angularFire.database.list(Transaction.DB_NAME);
        return this.angularFire.database.list(Transaction.DB_NAME, {
            query: {
                limitToFirst: 50
                // startAt: startAt,
                // endAt: endAt
            }
        });
    }

    addTransaction(transaction: Transaction) {
        return this.database.list(Transaction.DB_NAME).push(transaction);
    }
    
    removeTransaction($key: string) {
        return this.database.list(Transaction.DB_NAME).remove($key);
    }
}