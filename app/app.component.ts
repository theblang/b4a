import {Component, OnInit} from "@angular/core";
import {LocalStorageService} from "./common/local-storage.service";

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent implements OnInit {
    public appTitle: string = 'Budget 4 All';
    public activeBudget: string = null;
    public budgets: string[] = [];

    constructor(private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this.budgets = this.localStorageService.getBudgets();
        this.activeBudget = this.localStorageService.getActiveBudget();
    }
}
