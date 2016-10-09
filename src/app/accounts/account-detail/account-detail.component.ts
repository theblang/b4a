import {Component, OnInit, OnDestroy} from '@angular/core';
import {Account} from '../shared/account.model';
import {Transaction} from '../../transactions/shared/transaction.model';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../../shared/database.service';
import {AccountService} from '../shared/account.service';
import {TransactionService} from '../../transactions/shared/transaction.service';

@Component({
    selector: 'app-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit, OnDestroy {
    public account: Account;
    public accountId: number;
    public transactions: Transaction[];

    constructor(private route: ActivatedRoute,
                private databaseService: DatabaseService,
                private accountService: AccountService,
                private transactionService: TransactionService) {
    }

    ngOnInit() {
        this.route.params
            .flatMap((params) => {
                this.accountId = params['id'];

                return this.databaseService.connect();
            })
            .flatMap((database) => {
                this.accountService.init(database);

                const handler = (changes: Object[]) => {
                    // this.account = _.first(Account.parseRows(changes.pop()['object']));
                };

                return this.accountService.observe(handler, this.accountId);
            })
            .subscribe((accountsJson) => {
                // this.account = _.first(Account.parseRows((accountsJson)));
            });
    }

    ngOnDestroy() {
        this.accountService.unobserve();
    }

    removeAccount(account: Account) {
        this.accountService.remove(account);
    }
}
