import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../shared/local-storage.service';
import {DatabaseService} from '../shared/database.service';

@Component({
    selector: 'b4a-budget-select',
    templateUrl: 'budget-select.component.html',
    styleUrls: ['budget-select.component.css']
})
export class BudgetSelectComponent implements OnInit {
    public budgets: string[];

    constructor(private localStorageService: LocalStorageService,
                private databaseService: DatabaseService,
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
        this.databaseService.connect(true);
        this.router.navigate(['/']);
    }
}
