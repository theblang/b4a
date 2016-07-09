import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {
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
        this.databaseService
            .connect()
            .then((database) => {
                this.transactionService.init(database);
                this.transactionService.observe((changes: Object[]) => {
                    this.transactions = Transaction.parseRows(changes.pop()['object']);
                }).then((jsonArray) => {
                    this.transactions = Transaction.parseRows(jsonArray);

                    this.categoryService.init(database);
                    return this.categoryService.observe((changes: Object[]) => {
                        this.categories = Category.parseRows(changes.pop()['object']);
                    })
                }).then((jsonArray) => {
                    this.categories = Category.parseRows(jsonArray);

                    this.buildSpendingChart(this.categories, this.transactions);
                });
            })
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
