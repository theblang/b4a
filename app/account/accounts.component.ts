import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
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
        this.accountService.getAccounts()
            .subscribe((accountsJson) => {
                this.accounts = Account.parseJsonArray(accountsJson);
            });
    }

    addAccount(name: string) {
        return this.accountService.addAccount(new Account(name));
    }

    removeAccount(key: string) {
        return this.accountService.removeAccount(key);
    }
}
