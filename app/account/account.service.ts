import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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

    addAccount(account: Account): FirebaseWithPromise<void> {
        return this.list.push(account);
    }

    removeAccount(key: string): Promise<void> {
        return this.list.remove(key);
    }
}
