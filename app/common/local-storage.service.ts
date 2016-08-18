import {Injectable} from "@angular/core";

@Injectable()
export class LocalStorageService {
    constructor() {
    }

    getBudgets(): string[] {
        return window.localStorage.getItem('budgets') || [];
    }

    addBudget(budget: string): string[] {
        const budgets = window.localStorage.getItem('budgets') || [];
        budgets.push(budget);
        return budgets;
    }

    getActiveBudget(): string {
        return window.localStorage.getItem('active_budget');
    }

    setActiveBudget(name: string): void {
        window.localStorage.setItem('active_budget', name);
    }
}
