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
        CategoriesComponent
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
