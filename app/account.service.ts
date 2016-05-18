import { Injectable } from '@angular/core';
import { Account } from './account';

@Injectable()
export class AccountService {
    accounts: Account[];
    
    constructor() {
        this.accounts = [
            new Account('test1'),
            new Account('test2'),
            new Account('test3')
        ]
    }
    
    getAccounts() {
        return Promise.resolve(this.accounts)
    }
}