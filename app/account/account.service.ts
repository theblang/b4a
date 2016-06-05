import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Account } from './account.model';

@Injectable()
export class AccountService {
    private list: FirebaseListObservable<Account[]>;
    
    constructor(private angularFire: AngularFire) { 
        this.list = angularFire.database.list('/accounts');
    }

    getAccounts(): FirebaseListObservable<Account[]> {
        return this.list;
    }
    
    getAccount(accountId: string): FirebaseObjectObservable<Account> {
        return this.angularFire.database.object('/accounts/' + accountId);
    }

    addAccount(account: Account): FirebaseWithPromise<void> {
        return this.list.push(account);
    }

    removeAccount(key: string): Promise<void> {
        return this.list.remove(key);
    }
}
