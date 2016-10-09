import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../shared/local-storage.service';

@Component({
    selector: 'budget-select',
    templateUrl: 'budget-select.component.html',
    styleUrls: ['budget-select.component.css']
})
export class BudgetSelectComponent implements OnInit {
    public budgets: string[];

    constructor(private localStorageService: LocalStorageService,
                private router: Router) {
    }

    ngOnInit() {
        this.budgets = this.localStorageService.getBudgets();
    }

    addBudget(budget) {
        this.localStorageService.addBudget(budget);
        this.budgets = this.localStorageService.getBudgets();
    }

    setActiveBudget(budget) {
        this.localStorageService.setActiveBudget(budget);
        this.router.navigate(['/']);
    }
}
