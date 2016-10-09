import {Component, OnInit, OnDestroy} from '@angular/core';
import {Transaction} from '../shared/transaction.model';
import {Category} from '../../categories/shared/category.model';
import {Account} from '../../accounts/shared/account.model';
import {DatabaseService} from '../../shared/database.service';
import {TransactionService} from '../shared/transaction.service';
import {CategoryService} from '../../categories/shared/category.service';
import {AccountService} from '../../accounts/shared/account.service';

@Component({
  selector: 'b4a-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit, OnDestroy {
    public transactions: Transaction[];
    public categories: Category[];
    public accounts: Account[];
    public now: number;

    constructor(private databaseService: DatabaseService,
                private transactionService: TransactionService,
                private categoryService: CategoryService,
                private accountService: AccountService) {
    }

    ngOnInit() {
        this.now = Date.now();

        this.databaseService.connect()
            .flatMap((database) => {
                this.transactionService.init(database);
                this.categoryService.init(database);
                this.accountService.init(database);

                return this.transactionService.observe((changes: Object[]) => {
                    this.transactions = Transaction.parseRows(changes.pop()['object']);
                });
            })
            .flatMap((transactionsJson) => {
                this.transactions = Transaction.parseRows((transactionsJson));

                return this.categoryService.observe((changes: Object[]) => {
                    this.categories = Category.parseRows(changes.pop()['object']);
                });
            })
            .flatMap((categoriesJson) => {
                this.categories = Category.parseRows((categoriesJson));

                const handler = (changes: Object[]) => {
                    this.accounts = Account.parseRows(changes.pop()['object']);
                };

                return this.accountService.observe(handler);
            })
            .subscribe((accountsJson) => {
                this.accounts = Account.parseRows(accountsJson);
            });
    }

    ngOnDestroy() {
        this.transactionService.unobserve();
        this.accountService.unobserve();
        this.categoryService.unobserve();
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
            .remove(transaction);
    }
}
