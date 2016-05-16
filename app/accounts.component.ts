import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Account } from './account'
import { AccountService } from './account.service'

@Component({
    selector: 'accounts',
    templateUrl: 'app/accounts.component.html'
})

export class AccountsComponent {
    accounts: Account[];

    constructor(
        private _router: Router,
        private _accountService: AccountService) { }

    ngOnInit() {
        this._accountService.getAccounts()
            .then(accounts => this.accounts = accounts);
    }
    
}