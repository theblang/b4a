import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AccountsComponent} from "./account/accounts.component";
import {AccountComponent} from "./account/account.component";
import {TransactionsComponent} from "./transaction/transactions.component";
import {CategoriesComponent} from "./category/categories.component";
import {BudgetSelectComponent} from "./budget/budget-select.component";
import {ActiveBudgetGuard} from "./active-budget.guard";

const appRoutes: Routes = [
    {path: '', component: DashboardComponent, terminal: true, canActivate: [ActiveBudgetGuard]},
    {path: 'accounts', component: AccountsComponent, canActivate: [ActiveBudgetGuard]},
    {path: 'account/:id', component: AccountComponent, canActivate: [ActiveBudgetGuard]},
    {path: 'transactions', component: TransactionsComponent, canActivate: [ActiveBudgetGuard]},
    {path: 'categories', component: CategoriesComponent, canActivate: [ActiveBudgetGuard]},
    {path: 'budget-select', component: BudgetSelectComponent},
];

export const appRoutingProviders: any[] = [];

export const appRouting = RouterModule.forRoot(appRoutes);
