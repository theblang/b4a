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
        // this.route.params.take(1).toPromise()
        //     .then((params) => {
        //         this.accountId = params['id'];
        //         return this.databaseService.connect()
        //     })
        //     .then((database) => {
        //         this.accountService.init(database);
        //         this.transactionService.init(database);

        //         return this.accountService.observe((changes: Object[]) => {
        //             this.account = _.first(Account.parseRows(changes.pop()['object']));
        //         }, this.accountId);
        //     })
        //     .then((rows) => {
        //         this.account = _.first(Account.parseRows(rows));

        //         return this.transactionService.observe((changes: Object[]) => {
        //             this.transactions = Transaction.parseRows(changes.pop()['object']);
        //         }, null, this.account.id);
        //     })
        //     .catch((reason) => {
        //         console.log(reason);
        //     });
    }

    ngOnDestroy() {
        // this.databaseService
        //     .connect()
        //     .then((database) => {
        //         this.accountService.unobserve();
        //     })
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
