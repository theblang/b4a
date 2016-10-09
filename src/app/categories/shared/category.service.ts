import {Injectable} from '@angular/core';
import {Category} from './category.model';
import {Observable} from 'rxjs';
import * as lf from 'lovefield';
import {QueryState} from '../../shared/query-state.model';

@Injectable()
export class CategoryService {
    private database: lf.Database;
    private table: lf.schema.Table;
    private queryStates: QueryState[] = [];

    constructor() {
    }

    init(database: lf.Database) {
        this.database = database;
        this.table = database.getSchema().table(Category.TABLE_NAME);
    }

    observe(handler: Function): Observable<Object[]> {
        const query = this.database
            .select()
            .from(this.table);

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

    add(category: Category): Observable<Object[]> {
        const query = this.database
            .insert()
            .into(this.table)
            .values([this.table.createRow(category.toRow())]);

        return Observable.fromPromise(query.exec());
    }

    remove(category: Category): Observable<Object[]> {
        const query = this.database
            .delete()
            .from(this.table)
            .where(this.table['id'].eq(category.id));

        return Observable.fromPromise(query.exec());
    }
}

