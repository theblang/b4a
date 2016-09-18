import {Component, OnInit, OnDestroy} from "@angular/core";
import {DatabaseService} from "../common/database.service";
import {AccountService} from "./account.service";
import {Account} from "./account.model";

@Component({
    selector: 'accounts',
    templateUrl: 'app/account/accounts.component.html'
})
export class AccountsComponent implements OnInit, OnDestroy {
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

                return this.accountService.observe(handler)
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
