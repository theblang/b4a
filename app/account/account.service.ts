import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Account } from './account.model';

@Injectable()
export class AccountService {
    constructor(private angularFire: AngularFire) { }

    getAccounts(): FirebaseListObservable<Account[]> {
        return this.angularFire.database.list('/accounts');
    }

    addAccount(account: Account): FirebaseWithPromise<void> {
        return this.angularFire.database.list('/accounts').push(account);
    }

    removeAccount(key: string): Promise<void> {
        return this.angularFire.database.list('/accounts').remove(key);
    }
}
