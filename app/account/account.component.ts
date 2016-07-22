import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../common/database.service';
import { AccountService } from './account.service';
import { Account } from './account.model';
import { Observable} from 'rxjs';

@Component({
    selector: 'account',
    templateUrl: 'app/account/account.component.html',
})
export class AccountComponent implements OnInit {
    public account: Account;
    public accountId: number;

    constructor(
        private route: ActivatedRoute,
        private databaseService: DatabaseService,
        private accountService: AccountService) { }

    ngOnInit() {
        debugger
        this.route.params.toPromise()
            .catch((reason) => {
                console.error(reason);
            })
            .then((params) => {
                debugger
                this.accountId = params['id'];
                return this.databaseService.connect()
            })
            .then((database) => {
                debugger
                this.accountService.init(database);
                return this.accountService.observe((changes: Object[]) => {
                    this.account = _.first(Account.parseRows(changes.pop()['object']));
                }, this.accountId);
            })
            .then((rows) => {
                debugger
                this.account = _.first(Account.parseRows(rows));
            });
    }

    getAccounts() {
    }

    addAccount(name: string) {
        return this.accountService.add(new Account(name));
    }

    removeAccount(account: Account) {
        this.accountService.remove(account);
    }
}
