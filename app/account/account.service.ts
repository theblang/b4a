import { Injectable } from '@angular/core';
import { DatabaseService } from '../common/database.service';
import { LovefieldService } from '../common/lovefield.service';
import { Account } from '../account/account.model';
import * as lf from 'lf';

@Injectable()
export class AccountService implements LovefieldService {
    private database: lf.Database;
    private table: lf.schema.Table;
    private query: lf.query.Select;
    private handler: Function;

    constructor() { }

    init(database: lf.Database) {
        this.database = database;
        this.table = database.getSchema().table(Account.TABLE_NAME);
    }

    observe(handler, id?: number): Promise<Object[]> {
        this.query = this.database
            .select()
            .from(this.table)

        if(id) {
            this.query.where(this.table['id'].eq(id))
        }

        this.handler = handler;
        this.database.observe(this.query, this.handler);

        return this.query.exec();
    }

    unobserve() {
        this.database.unobserve(this.query, this.handler);
    }

    add(account: Account): void {
        this.database
            .insert()
            .into(this.table)
            .values([this.table.createRow(account.toRow())])
            .exec()
            .catch((reason) => {
                console.error(reason.message);
            })
    }

    remove(account: Account): Promise<Object[]> {
        return this.database
            .delete()
            .from(this.table)
            .where(this.table['id'].eq(account.id))
            .exec();
    }
}
