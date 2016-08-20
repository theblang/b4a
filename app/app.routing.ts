import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AccountsComponent} from "./account/accounts.component";
import {AccountComponent} from "./account/account.component";
import {BudgetsComponent} from "./budget/budgets.component";
import {TransactionsComponent} from "./transaction/transactions.component";
import {CategoriesComponent} from "./category/categories.component";
import {BudgetSelectComponent} from "./budget/budget-select.component";
import {BudgetGuard} from "./app.budget-guard.service";

const appRoutes: Routes = [
    {path: '', component: DashboardComponent, terminal: true, canActivate: [BudgetGuard]},
    {path: 'accounts', component: AccountsComponent},
    {path: 'account/:id', component: AccountComponent},
    {path: 'budgets', component: BudgetsComponent},
    {path: 'transactions', component: TransactionsComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'budget-select', component: BudgetSelectComponent},
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
