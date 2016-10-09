import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CategoryListComponent} from './categories/category-list/category-list.component';
import {DatabaseService} from './shared/database.service';
import {CategoryService} from './categories/shared/category.service';
import {LocalStorageService} from './shared/local-storage.service';
import {RouterModule} from '@angular/router';
import {BudgetNavComponent} from './budget-nav/budget-nav.component';
import {BudgetSelectComponent} from './budget-select/budget-select.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountListComponent} from './accounts/account-list/account-list.component';
import {AccountDetailComponent} from './accounts/account-detail/account-detail.component';
import {TransactionListComponent} from './transactions/transaction-list/transaction-list.component';
import {ActiveBudgetGuard} from './shared/active-budget.guard';
import {AccountService} from './accounts/shared/account.service';
import {TransactionService} from './transactions/shared/transaction.service';

@NgModule({
    declarations: [
        AppComponent,
        CategoryListComponent,
        BudgetNavComponent,
        BudgetSelectComponent,
        DashboardComponent,
        AccountListComponent,
        AccountDetailComponent, TransactionListComponent, CategoryListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {path: '', component: DashboardComponent, canActivate: [ActiveBudgetGuard]},
            {path: 'accounts', component: AccountListComponent, canActivate: [ActiveBudgetGuard]},
            {path: 'account/:id', component: AccountDetailComponent, canActivate: [ActiveBudgetGuard]},
            {path: 'transactions', component: TransactionListComponent, canActivate: [ActiveBudgetGuard]},
            {path: 'categories', component: CategoryListComponent, canActivate: [ActiveBudgetGuard]},
            {path: 'budget-select', component: BudgetSelectComponent}
        ])
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
