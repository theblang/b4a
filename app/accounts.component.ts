import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Account } from './account'
import { AccountService } from './account.service'
import { AngularFire, FirebaseListObservable } from 'angularfire2'

@Component({
    selector: 'accounts',
    templateUrl: 'app/accounts.component.html'
})

export class AccountsComponent {
    accounts: FirebaseListObservable<Account[]>;

    constructor(
        private _angularFire: AngularFire,
        private _router: Router,
        private _accountService: AccountService) {
        
        this.accounts = _angularFire.database.list('/accounts');        
    }

    ngOnInit() {}
    
    addAccount(name: string) {
        console.log(name);
        this.accounts.push(new Account(name));
    }
}