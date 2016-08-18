import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AccountsComponent} from "./account/accounts.component";
import {AccountComponent} from "./account/account.component";
import {BudgetsComponent} from "./budget/budgets.component";
import {TransactionsComponent} from "./transaction/transactions.component";
import {CategoriesComponent} from "./category/categories.component";

const appRoutes: Routes = [
    {path: '', component: DashboardComponent, terminal: true},
    {path: 'accounts', component: AccountsComponent},
    {path: 'account/:id', component: AccountComponent},
    {path: 'budgets', component: BudgetsComponent},
    {path: 'transactions', component: TransactionsComponent},
    {path: 'categories', component: CategoriesComponent}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
