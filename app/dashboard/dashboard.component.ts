import { Component, OnInit } from '@angular/core';
import { CHART_DIRECTIVES } from 'ng2-charts';
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
    public transactions: Transaction;

    public labels: string[] = [];
    public data: number[] = [];
    public type: string = 'doughnut';

    constructor(
        private categoryService: CategoryService,
        private transactionService: TransactionService) { }

    ngOnInit() {
        this.categoryService.getCategories();
    }

    private buildSpendingChart(categories: Category[]) {
        this.labels = [];
        this.data = [];
        
        Array.from(this.categories, (category: Category) => {
            this.labels.push(category.name);
            this.data.push(category.spent);
        });
    }
}