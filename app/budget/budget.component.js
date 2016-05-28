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
var angularFire2_1 = require('angularFire2');
var BudgetComponent = (function () {
    function BudgetComponent(angularFire) {
        this.angularFire = angularFire;
    }
    BudgetComponent.prototype.ngOnInit = function () {
        this.budget = this.angularFire.database.object('/budgets/' + this.budgetId);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BudgetComponent.prototype, "budgetId", void 0);
    BudgetComponent = __decorate([
        core_1.Component({
            selector: 'budget',
            templateUrl: 'app/budget/budget.component.html'
        }), 
        __metadata('design:paramtypes', [angularFire2_1.AngularFire])
    ], BudgetComponent);
    return BudgetComponent;
}());
exports.BudgetComponent = BudgetComponent;
//# sourceMappingURL=budget.component.js.map