import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../common/database.service';
import { TransactionService } from './transaction.service';
import { AccountService } from '../account/account.service';
import { CategoryService } from '../category/category.service';
import { Transaction } from './transaction.model';
import { Account } from '../account/account.model';
import { Category } from '../category/category.model';

@Component({
    selector: 'transactions',
    templateUrl: 'app/transaction/transactions.component.html'
})
export class TransactionsComponent implements OnInit, OnDestroy {
    public transactions: Transaction[];
    public accounts: Account[];
    public categories: Category[];
    public now: number;

    constructor(
        private databaseService: DatabaseService,
        private transactionService: TransactionService) { }

    ngOnInit() {
        this.now = Date.now();
        this.databaseService
            .connect()
            .then((database) => {
                this.transactionService.init(database);
                this.transactionService.observeTransactions((changes: Object[]) => {
                    this.transactions = Transaction.parseJsonArray(changes.pop()['object']);
                }).then((jsonArray) => {
                    this.transactions = Transaction.parseJsonArray(jsonArray);
                });
            })
    }

    ngOnDestroy() {
        this.databaseService
            .connect()
            .then((database) => {
                this.transactionService.unobserveTransactions();
            })
    }

    addTransaction(amount: string) {
        this.transactionService.addTransaction(new Transaction(Number.parseFloat(amount)));
    }

    removeTransaction(transaction: Transaction) {
        this.transactionService.removeTransaction(transaction);
    }
}
