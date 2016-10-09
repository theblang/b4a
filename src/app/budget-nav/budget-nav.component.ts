import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../shared/local-storage.service';

@Component({
    selector: 'b4a-budget-nav',
    templateUrl: 'budget-nav.component.html',
    styleUrls: ['budget-nav.component.css']
})
export class BudgetNavComponent implements OnInit {
    public activeBudget: string;

    constructor(private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this.activeBudget = this.localStorageService.getActiveBudget();
    }
}
