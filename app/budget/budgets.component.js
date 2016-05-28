"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var budget_component_1 = require('./budget.component');
var budget_service_1 = require('./budget.service');
var budget_model_1 = require('./budget.model');
var BudgetsComponent = (function () {
    function BudgetsComponent(budgetsService) {
        this.budgetsService = budgetsService;
    }
    BudgetsComponent.prototype.ngOnInit = function () {
        this.budgets = this.getBudgets();
    };
    BudgetsComponent.prototype.getBudgets = function () {
        return this.budgetsService.getBudgets();
    };
    BudgetsComponent.prototype.addBudget = function () {
        return this.budgetsService.addBudget(new budget_model_1.Budget(name));
    };
    BudgetsComponent = __decorate([
        core_1.Component({
            selector: 'budgets',
            templateUrl: 'app/budget/budgets.component.html',
            directives: [budget_component_1.BudgetComponent]
        }), 
        __metadata('design:paramtypes', [budget_service_1.BudgetService])
    ], BudgetsComponent);
    return BudgetsComponent;
}());
exports.BudgetsComponent = BudgetsComponent;
//# sourceMappingURL=budgets.component.js.map