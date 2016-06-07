import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';
import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { Category } from '../budget/category.model';

@Component({
    selector: 'transactions',
    templateUrl: 'app/transaction/transactions.component.html'
})

export class TransactionsComponent {
    public transactions: FirebaseListObservable<Transaction[]>;
    public accountsObservable: FirebaseListObservable<Account[]>;
    public accounts: Account[];
    public now: number;

    constructor(
        private transactionService: TransactionService,
        private accountService: AccountService) { }

    ngOnInit() {
        this.transactions = this.transactionService.getTransactions();
        this.accountsObservable = this.accountService.getAccountsObservable();
        this.now = Date.now();

        this.accountsObservable.subscribe((accountsJson) => {
            this.accounts = Account.parseJsonArray(accountsJson);
        });
    }

    addTransaction(
        amount: number,
        payee: string,
        date: Date,
        memo: string,
        category: Category,
        accountId: string): FirebaseWithPromise<void> {

        return this.transactionService.addTransaction(new Transaction(amount, payee, date, memo, category, accountId));
    }

    removeTransaction($key: string) {
        this.transactionService.removeTransaction($key);
    }
}
