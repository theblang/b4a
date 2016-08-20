import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {appRoutingProviders, routing} from "./app.routing";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AccountsComponent} from "./account/accounts.component";
import {AccountComponent} from "./account/account.component";
import {BudgetsComponent} from "./budget/budgets.component";
import {TransactionsComponent} from "./transaction/transactions.component";
import {CategoriesComponent} from "./category/categories.component";
import {BudgetSelectComponent} from "./budget/budget-select.component";
import {BudgetGuard} from "./app.budget-guard.service";
import {CategoryService} from "./category/category.service";
import {TransactionService} from "./transaction/transaction.service";
import {BudgetService} from "./budget/budget.service";
import {AccountService} from "./account/account.service";
import {DatabaseService} from "./common/database.service";
import {LocalStorageService} from "./common/local-storage.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        AccountsComponent,
        AccountComponent,
        BudgetsComponent,
        TransactionsComponent,
        CategoriesComponent,
        BudgetSelectComponent
    ],
    providers: [
        appRoutingProviders,
        BudgetGuard,
        LocalStorageService,
        DatabaseService,
        AccountService,
        BudgetService,
        TransactionService,
        CategoryService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
