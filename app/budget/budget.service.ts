import {Injectable} from "@angular/core";
import {Budget} from "./budget.model";
import {LocalStorageService} from "../common/local-storage.service";

@Injectable()
export class BudgetService {

    constructor(private localStorageService: LocalStorageService) {
    }

    getBudgets() {
    }

    getBudget(budgetId: string) {
    }

    addBudget(budget: Budget) {
    }

    updateBudget(budget: Budget) {
    }

    removeBudget() {
    }
}
