import { Component, OnInit } from '@angular/core';
import { RouteSegment } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';
import { AccountService } from './account.service';
import { Account } from './account.model';

@Component({
    selector: 'account',
    templateUrl: 'app/account/account.component.html',
})
export class AccountComponent implements OnInit {
    public accountObservable: FirebaseObjectObservable<Account>;
    public account: Account;

    constructor(private routeSegment: RouteSegment, private accountService: AccountService) { }

    ngOnInit() {
        this.accountObservable = this.accountService.getAccountObservable(this.routeSegment.getParam('id'));
        
        this.accountObservable.subscribe(accountJson => {
            this.account = new Account(accountJson['name']);
        });
    }

    getAccounts() {
        return this.accountService.getAccountsObservable();
    }

    addAccount(name: string) {
        return this.accountService.addAccount(new Account(name));
    }

    removeAccount(key: string) {
        return this.accountService.removeAccount(key);
    }
}
