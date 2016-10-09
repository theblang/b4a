import {Component, OnInit, OnDestroy} from '@angular/core';
import {DatabaseService} from '../../shared/database.service';
import {AccountService} from '../shared/account.service';
import {Account} from '../shared/account.model';

@Component({
    selector: 'b4a-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit, OnDestroy {
    public accounts: Account[];

    constructor(private databaseService: DatabaseService,
                private accountService: AccountService) {
    }

    ngOnInit() {
        this.databaseService.connect()
            .flatMap((database) => {
                this.accountService.init(database);

                const handler = (changes: Object[]) => {
                    this.accounts = Account.parseRows(changes.pop()['object']);
                };

                return this.accountService.observe(handler);
            })
            .subscribe((accountsJson) => {
                this.accounts = Account.parseRows((accountsJson));
            });
    }

    ngOnDestroy() {
        this.accountService.unobserve();
    }

    addAccount(name: string) {
        this.accountService.add(new Account(name));
    }

    removeAccount(index: number) {
        const account = this.accounts[index];
        this.accountService
            .remove(account);
    }
}

