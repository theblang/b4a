import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from './account.service';
import { Account } from './account.model';

@Component({
    selector: 'account',
    templateUrl: 'app/account/account.component.html',
})
export class AccountComponent implements OnInit {
    public account: Account;

    constructor(private route: ActivatedRoute, private accountService: AccountService) { }

    ngOnInit() {
        this.route.params
            .map(params => params['id']);
    }

    getAccounts() {
        return this.accountService.getAccounts();
    }

    addAccount(name: string) {
        return this.accountService.addAccount(new Account(name));
    }

    removeAccount(key: string) {
    }
}
