import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../../shared/database.service";
import {LocalStorageService} from "../../shared/local-storage.service";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'b4a-budget-select-dialog',
  templateUrl: './budget-select-dialog.component.html',
  styleUrls: ['./budget-select-dialog.component.css']
})
export class BudgetSelectDialogComponent implements OnInit {
    public budgets: string[];

    constructor(private localStorageService: LocalStorageService,
                private databaseService: DatabaseService,
                private router: Router,
                public dialogRef: MdDialogRef<BudgetSelectDialogComponent>) {
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
