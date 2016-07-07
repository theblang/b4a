import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AccountService } from './account.service';
import { Account } from './account.model';

@Component({
    selector: 'accounts',
    templateUrl: 'app/account/accounts.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AccountsComponent implements OnInit {
    public accounts: Account[];

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.accountService.getAccounts();
    }

    addAccount(name: string) {
        return this.accountService.addAccount(new Account(name));
    }

    removeAccount(key: string) {
    }
}
