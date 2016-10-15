import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {Category} from '../categories/shared/category.model';
import {Transaction} from '../transactions/shared/transaction.model';
import {DatabaseService} from '../shared/database.service';
import {CategoryService} from '../categories/shared/category.service';
import {TransactionService} from '../transactions/shared/transaction.service';

@Component({
    selector: 'b4a-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
    public categories: Category[];
    public transactions: Transaction[];

    public labels: string[] = [];
    public data: number[] = [];
    public type: string = 'doughnut';

    constructor(private databaseService: DatabaseService,
                private categoryService: CategoryService,
                private transactionService: TransactionService,
                private ngZone: NgZone) {
    }

    ngOnInit() {
        this.databaseService.connect()
            .flatMap((database) => {
                this.transactionService.init(database);
                this.categoryService.init(database);

                const handler = (changes: Object[]) => {
                    this.ngZone.run(() => {
                        this.transactions = Transaction.parseRows(changes.pop()['object']);
                    });
                };

                return this.transactionService.observe(handler);
            })
            .flatMap((transactionsJson) => {
                this.ngZone.run(() => {
                    this.transactions = Transaction.parseRows(transactionsJson);
                });

                const handler = (changes: Object[]) => {
                    this.ngZone.run(() => {
                        this.categories = Category.parseRows(changes.pop()['object']);
                    });
                };

                return this.categoryService.observe(handler);
            })
            .subscribe((categoriesJson) => {
                this.ngZone.run(() => {
                    this.categories = Category.parseRows(categoriesJson);
                    this.buildSpendingChart(this.categories, this.transactions);
                });
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
                }, 0);

            this.data.push(spent);
        }
    }
}
