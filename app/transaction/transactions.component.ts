import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';

@Component({
    selector: 'transactions',
    templateUrl: 'app/transaction/transactions.component.html'
})

export class TransactionsComponent {
    public transactions: FirebaseListObservable<Transaction[]>;
    
    constructor(private transactionService: TransactionService) { }
    ngOnInit() { 
        this.transactions = this.getTransactions();
    }

    getTransactions(): FirebaseListObservable<Transaction[]> {
        return this.transactionService.getTransactions();
    }
    
    addTransaction(amount: number, payee: string, date: Date): FirebaseWithPromise<void> {
        return this.transactionService.addTransaction(new Transaction(amount, payee, date));
    }
}
