import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { DatabaseService } from '../common/database.service';
import { AccountService } from './account.service';
import { Account } from './account.model';

@Component({
    selector: 'accounts',
    templateUrl: 'app/account/accounts.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AccountsComponent implements OnInit {
    public accounts: Account[];

    constructor(
        private databaseService: DatabaseService,
        private accountService: AccountService) { }

    ngOnInit() {
        this.databaseService.connect()
            .flatMap((database) => {
                this.accountService.init(database);

                return this.accountService.observe((changes: Object[]) => {
                    this.accounts = Account.parseRows(changes.pop()['object']);
                })
            })
            .subscribe((accountsJson) => {
                this.accounts = Account.parseRows((accountsJson));
            });
    }

    ngOnDestroy() {
        // this.databaseService
        //     .connect()
        //     .then((database) => {
        //         this.accountService.unobserve();
        //     })
    }

    addAccount(name: string) {
        this.accountService.add(new Account(name));
    }

    removeAccount(index: number) {
        const account = this.accounts[index];
        this.accountService
            .remove(account)
            .then((value: Object[]) => {
                console.log(value);
            })
            .catch((reason) => {
                console.log(reason);
            });
    }
}
