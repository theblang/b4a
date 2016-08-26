import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {appRoutingProviders, appRouting} from "./app.routing";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AccountsComponent} from "./account/accounts.component";
import {AccountComponent} from "./account/account.component";
import {TransactionsComponent} from "./transaction/transactions.component";
import {CategoriesComponent} from "./category/categories.component";
import {BudgetSelectComponent} from "./budget/budget-select.component";
import {CategoryService} from "./category/category.service";
import {TransactionService} from "./transaction/transaction.service";
import {AccountService} from "./account/account.service";
import {DatabaseService} from "./common/database.service";
import {LocalStorageService} from "./common/local-storage.service";
import {ActiveBudgetGuard} from "./active-budget.guard";
import {BudgetNavComponent} from "./budget/budget-nav.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        appRouting
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        AccountsComponent,
        AccountComponent,
        TransactionsComponent,
        CategoriesComponent,
        BudgetSelectComponent,
        BudgetNavComponent
    ],
    providers: [
        appRoutingProviders,
        LocalStorageService,
        DatabaseService,
        AccountService,
        TransactionService,
        CategoryService,
        ActiveBudgetGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
