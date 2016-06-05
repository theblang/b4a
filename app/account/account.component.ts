import { Component } from '@angular/core';
import { RouteSegment } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';
import { AccountService } from './account.service';
import { Account } from './account.model';

@Component({
    selector: 'account',
    templateUrl: 'app/account/account.component.html',
})
export class AccountComponent {
    public account: FirebaseObjectObservable<Account>;

    constructor(private routeSegment: RouteSegment, private accountService: AccountService) { }

    ngOnInit() {
        console.log(this.routeSegment.getParam('id'));
        this.account = this.accountService.getAccount(this.routeSegment.getParam('id'));
    }

    getAccounts() {
        return this.accountService.getAccounts();
    }

    addAccount(name: string) {
        return this.accountService.addAccount(new Account(name));
    }

    removeAccount(key: string) {
        return this.accountService.removeAccount(key);
    }
}
