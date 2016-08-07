import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../common/database.service';
import { AccountService } from './account.service';
import { TransactionService } from '../transaction/transaction.service';
import { Account } from './account.model';
import { Transaction } from '../transaction/transaction.model';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/take';

@Component({
    selector: 'account',
    templateUrl: 'app/account/account.component.html',
})
export class AccountComponent implements OnInit, OnDestroy {
    public account: Account;
    public accountId: number;
    public transactions: Transaction[];

    constructor(
        private route: ActivatedRoute,
        private databaseService: DatabaseService,
        private accountService: AccountService,
        private transactionService: TransactionService) { }

    ngOnInit() {
        this.route.params
            .flatMap((params) => {
                this.accountId = params['id'];

                return this.databaseService.connect();
            })
            .flatMap((database) => {
                this.accountService.init(database);

                const handler = (changes: Object[]) => {
                    this.account = _.first(Account.parseRows(changes.pop()['object']));
                };

                return this.accountService.observe(handler, this.accountId);
            })
            .subscribe((accountsJson) => {
                this.account = _.first(Account.parseRows((accountsJson)));
            });
    }

    ngOnDestroy() {
        this.accountService.unobserve();
    }

    removeAccount(account: Account) {
        this.accountService.remove(account);
    }
}
