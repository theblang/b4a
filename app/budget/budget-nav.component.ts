import {Component, OnInit} from "@angular/core";
import {LocalStorageService} from "../common/local-storage.service";

@Component({
    selector: 'budget-nav',
    templateUrl: 'app/budget/budget-nav.component.html'
})
export class BudgetNavComponent implements OnInit {
    public activeBudget: string;

    constructor(private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this.activeBudget = this.localStorageService.getActiveBudget();
    }
}
