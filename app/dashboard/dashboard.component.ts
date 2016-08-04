import { Component, OnInit, OnDestroy } from '@angular/core';
import { CHART_DIRECTIVES } from 'ng2-charts';
import { DatabaseService } from '../common/database.service';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category.model';
import { Transaction } from '../transaction/transaction.model';
import { TransactionService } from '../transaction/transaction.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls: ['app/dashboard/dashboard.component.css'],
    directives: [CHART_DIRECTIVES]
})
export class DashboardComponent implements OnInit, OnDestroy {
    public categories: Category[];
    public transactions: Transaction[];

    public labels: string[] = [];
    public data: number[] = [];
    public type: string = 'doughnut';

    constructor(
        private databaseService: DatabaseService,
        private categoryService: CategoryService,
        private transactionService: TransactionService) { }

    ngOnInit() {
        this.databaseService.connect()
            .flatMap((database) => {
                this.transactionService.init(database);
                this.categoryService.init(database);

                return this.transactionService.observe((changes: Object[]) => {
                    this.transactions = Transaction.parseRows(changes.pop()['object']);
                })
            })
            .flatMap((transactionsJson) => {
                this.transactions = Transaction.parseRows(transactionsJson);

                    return this.categoryService.observe((changes: Object[]) => {
                        this.categories = Category.parseRows(changes.pop()['object']);
                    })
            })
            .subscribe((categoriesJson) => {
                    this.categories = Category.parseRows(categoriesJson);
                    this.buildSpendingChart(this.categories, this.transactions);
            });
    }

    ngOnDestroy() {
        this.transactionService.unobserve();
    }

    private buildSpendingChart(categories: Category[], transactions: Transaction[]) {
        this.labels = [];
        this.data = [];

        for (let category of categories) {
            this.labels.push(category.name);

            let spent = transactions
                .filter((transaction) => {
                    return transaction.category.id === category.id;
                })
                .map(transaction => transaction.amount)
                .reduce((previous, current) => {
                    return previous + current;
                }, 0)

            this.data.push(spent);
        }
    }
}
