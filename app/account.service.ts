import { Injectable } from '@angular/core';
import { Account } from './account';

@Injectable()
export class AccountService {
    accounts: Account[];
    
    constructor() {
        this.accounts = [
            new Account(Math.random(), 'test1'),
            new Account(Math.random(), 'test2'),
            new Account(Math.random(), 'test3')
        ]
    }
    
    getAccounts() {
        return Promise.resolve(this.accounts)
    }
}