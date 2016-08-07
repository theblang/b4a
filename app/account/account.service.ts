import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from '../common/database.service';
import { LovefieldService } from '../common/lovefield.service';
import { QueryState} from '../common/query-state.model';
import { Account } from '../account/account.model';
import * as lf from 'lf';

@Injectable()
export class AccountService {
    private database: lf.Database;
    private table: lf.schema.Table;
    private queryStates: QueryState[] = [];

    constructor() { }

    init(database: lf.Database) {
        this.database = database;
        this.table = database.getSchema().table(Account.TABLE_NAME);
    }

    observe(handler: Function, id?: number): Observable<Object[]> {
        const query = this.database
            .select()
            .from(this.table)

        if(id) {
            query.where(this.table['id'].eq(id))
        }

        this.database.observe(query, handler);
        this.queryStates.push({
            query: query,
            handler: handler
        });

        return Observable.fromPromise(query.exec());
    }

    unobserve(): void {
        for (const [index, queryState] of this.queryStates.entries()) {
            this.database.unobserve(queryState.query, queryState.handler);
            this.queryStates.splice(index, 1);
        }
    }

    add(account: Account): Observable<Object[]> {
        const query = this.database
            .insert()
            .into(this.table)
            .values([this.table.createRow(account.toRow())])

        return Observable.fromPromise(query.exec());
    }

    remove(account: Account): Observable<Object[]> {
        const query = this.database
            .delete()
            .from(this.table)
            .where(this.table['id'].eq(account.id));
        
        return Observable.fromPromise(query.exec());
    }
}
