import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
    constructor() {
    }

    getBudgets(): string[] {
        const budgets = JSON.parse(window.localStorage.getItem('budgets')) || [];
        return budgets;
    }

    addBudget(budget: string): string[] {
        const budgets = this.getBudgets();
        budgets.push(budget);
        window.localStorage.setItem('budgets', JSON.stringify(budgets));
        return budgets;
    }

    getActiveBudget(): string {
        return JSON.parse(window.localStorage.getItem('active_budget'));
    }

    setActiveBudget(name: string): void {
        window.localStorage.setItem('active_budget', JSON.stringify(name));
    }
}
