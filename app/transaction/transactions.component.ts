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
    public categories: Category[];
    public accounts: Account[];
    public now: number;

    constructor(
        private databaseService: DatabaseService,
        private transactionService: TransactionService,
        private categoryService: CategoryService,
        private accountService: AccountService) { }

    ngOnInit() {
        this.now = Date.now();

        // this.databaseService
        //     .connect()
        //     .then((database) => {
        //         this.transactionService.init(database);
        //         this.transactionService.observe((changes: Object[]) => {
        //             this.transactions = Transaction.parseRows(changes.pop()['object']);
        //         }).then((jsonArray) => {
        //             this.transactions = Transaction.parseRows(jsonArray);
        //         });

        //         this.categoryService.init(database);
        //         this.categoryService.observe((changes: Object[]) => {
        //             this.categories = Category.parseRows(changes.pop()['object']);
        //         }).then((jsonArray) => {
        //             this.categories = Category.parseRows(jsonArray);
        //         });

        //         this.accountService.init(database);
        //         this.accountService.observe((changes: Object[]) => {
        //             this.accounts = Account.parseRows(changes.pop()['object']);
        //         }).then((jsonArray) => {
        //             this.accounts = Account.parseRows(jsonArray);
        //         })
        //     })
    }

    ngOnDestroy() {
        // this.databaseService
        //     .connect()
        //     .then((database) => {
        //         this.transactionService.unobserve();
        //     })
    }

    addTransaction(amount: string, categoryIndex: number, accountIndex: number) {
        this.transactionService.add(
            new Transaction(
                Number.parseFloat(amount),
                this.categories[categoryIndex],
                this.accounts[accountIndex])
        );
    }

    removeTransaction(transaction: Transaction) {
        this.transactionService
            .remove(transaction)
            .then((value: Object[]) => {
                console.log(value);
            })
            .catch((reason) => {
                console.log(reason);
            });
    }
}
