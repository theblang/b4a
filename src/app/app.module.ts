import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ChartsModule} from 'ng2-charts';
import {MaterialModule} from "@angular/material";
import {TranslateModule} from "ng2-translate";
import 'chart.js';

import {AppComponent} from './app.component';
import {CategoryListComponent} from './categories/category-list/category-list.component';
import {DatabaseService} from './shared/database.service';
import {CategoryService} from './categories/shared/category.service';
import {LocalStorageService} from './shared/local-storage.service';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountListComponent} from './accounts/account-list/account-list.component';
import {AccountDetailComponent} from './accounts/account-detail/account-detail.component';
import {TransactionListComponent} from './transactions/transaction-list/transaction-list.component';
import {ActiveBudgetGuard} from './shared/active-budget.guard';
import {AccountService} from './accounts/shared/account.service';
import {TransactionService} from './transactions/shared/transaction.service';
import {BudgetSelectDialogComponent} from './budgets/budget-select-dialog/budget-select-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        CategoryListComponent,
        DashboardComponent,
        AccountListComponent,
        AccountDetailComponent,
        TransactionListComponent,
        CategoryListComponent,
        BudgetSelectDialogComponent
    ],
    entryComponents: [
        BudgetSelectDialogComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([]),
        MaterialModule.forRoot(),
        TranslateModule.forRoot(),
        ChartsModule
    ],
    providers: [
        DatabaseService,
        LocalStorageService,
        CategoryService,
        AccountService,
        TransactionService,
        ActiveBudgetGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
