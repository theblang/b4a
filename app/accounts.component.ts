import { Component, OnInit } from '@angular/core'
import { FirebaseListObservable } from 'angularfire2';
import { AccountService } from './account.service'
import { Account } from './account'

@Component({
    selector: 'accounts',
    templateUrl: 'app/accounts.component.html'
})

export class AccountsComponent {
    public accounts: FirebaseListObservable<Account[]>;

    constructor(private accountService: AccountService) {
        this.accounts = this.accountService.getAccounts();
    }

    ngOnInit() {}
}