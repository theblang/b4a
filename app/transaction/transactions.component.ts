import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';
import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';

@Component({
    selector: 'transactions',
    templateUrl: 'app/transaction/transactions.component.html'
})
export class TransactionsComponent implements OnInit {
    public transactions: Transaction[];
    public accounts: Account[];
    public categories: Category[];
    public transactionsObservable: FirebaseListObservable<Transaction[]>;
    public accountsObservable: FirebaseListObservable<Account[]>;
    public categoriesObservable: FirebaseListObservable<Category[]>;
    public now: number;

    constructor(
        private transactionService: TransactionService,
        private accountService: AccountService,
        private categoryService: CategoryService) { }

    ngOnInit() {
        this.transactionsObservable = this.transactionService.getTransactionsObservable();
        this.accountsObservable = this.accountService.getAccountsObservable();
        this.categoriesObservable = this.categoryService.getCategoriesObservable();
        this.now = Date.now();

        this.transactionsObservable.subscribe((transactionsJson) => {
            this.transactions = Transaction.parseJsonArray(transactionsJson);
        });

        this.accountsObservable.subscribe((accountsJson) => {
            this.accounts = Account.parseJsonArray(accountsJson);
        });

        this.categoriesObservable.subscribe((categoriesJson) => {
            this.categories = Category.parseJsonArray(categoriesJson);
        });
    }

    addTransaction(
        amount: string,
        payee: string,
        date: Date,
        memo: string,
        category: string,
        account: string) {

        return this.transactionService.addTransaction(new Transaction(Number.parseFloat(amount), payee, date, memo, category, account));
    }

    removeTransaction(transaction: Transaction) {
        this.transactionService.removeTransaction(transaction);
    }
}
