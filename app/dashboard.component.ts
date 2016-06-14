import { Component, OnInit } from '@angular/core';
import { CHART_DIRECTIVES } from 'ng2-charts';
import { CategoryService } from './category/category.service';
import { Category } from './category/category.model';
import { Transaction } from './transaction/transaction.model';
import { TransactionService } from './transaction/transaction.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard.component.html',
    directives: [CHART_DIRECTIVES]
})

export class DashboardComponent implements OnInit {
    public categories: Category[];
    public transactions: Transaction

    public testLabels: string[] = ['foo', 'bar', 'test'];
    public testData: number[] = [150, 100, 50];
    public testType: string = 'doughnut';

    constructor(
        private categoryService: CategoryService,
        private transactionService: TransactionService) { }

    ngOnInit() {
        this.categoryService.getCategoriesObservable()
            .subscribe((categoriesJson) => {
                this.categories = Category.parseJsonArray(categoriesJson);
            });
            
        this.transactionService.getTransactionsObservable();
    }
}