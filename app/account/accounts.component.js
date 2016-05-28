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
var account_service_1 = require('./account.service');
var account_model_1 = require('./account.model');
var AccountsComponent = (function () {
    function AccountsComponent(accountService) {
        this.accountService = accountService;
    }
    AccountsComponent.prototype.getAccounts = function () {
        return this.accountService.getAccounts();
    };
    AccountsComponent.prototype.addAccount = function (name) {
        return this.accountService.addAccount(new account_model_1.Account(name));
    };
    AccountsComponent.prototype.removeAccount = function (key) {
        return this.accountService.removeAccount(key);
    };
    AccountsComponent.prototype.ngOnInit = function () {
        this.accounts = this.getAccounts();
    };
    AccountsComponent = __decorate([
        core_1.Component({
            selector: 'accounts',
            templateUrl: 'app/account/accounts.component.html'
        }), 
        __metadata('design:paramtypes', [account_service_1.AccountService])
    ], AccountsComponent);
    return AccountsComponent;
}());
exports.AccountsComponent = AccountsComponent;
//# sourceMappingURL=accounts.component.js.map