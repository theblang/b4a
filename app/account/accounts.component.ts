import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AccountService } from './account.service';
import { Account } from './account.model';

@Component({
    selector: 'accounts',
    templateUrl: 'app/account/accounts.component.html'
})

export class AccountsComponent {
    public accounts: FirebaseListObservable<Account[]>;

    constructor(private accountService: AccountService) { }
    ngOnInit() {
        this.accounts = this.getAccounts();
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
