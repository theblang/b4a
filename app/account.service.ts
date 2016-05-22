import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Account } from './account';
import { AppSettings } from './app.settings'

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