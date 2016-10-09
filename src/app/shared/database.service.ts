import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as lf from 'lovefield';
import {LocalStorageService} from './local-storage.service';
import {Transaction} from '../transactions/shared/transaction.model';
import {Account} from '../accounts/shared/account.model';
import {Category} from '../categories/shared/category.model';

@Injectable()
export class DatabaseService {

    private database: lf.Database;
    private connectPromise: Promise<lf.Database>;
    private schemaBuilder: lf.schema.Builder;
    private options: lf.schema.ConnectOptions = {
        storeType: lf.schema.DataStoreType.INDEXED_DB
    };

    constructor(private localStorageService: LocalStorageService) {
    }

    /**
     * @throws Will throw an error if active_budget not found in local storage
     */
    connect(force = false): Observable<lf.Database> {
        if (!this.connectPromise || force) {
            const activeBudget = this.localStorageService.getActiveBudget();
            if (!activeBudget) {
                throw new Error('No active budget available');
            }
            this.schemaBuilder = this.createSchemaBuilder(activeBudget);

            this.connectPromise = this.schemaBuilder.connect(this.options)
                .then((database: lf.Database) => {
                    console.log('Database connected');
                    this.database = database;
                    return this.database;
                }).catch((reason) => {
                    console.error(reason);
                });
        }

        return Observable.fromPromise(this.connectPromise);
    }

    private createSchemaBuilder(name: string): lf.schema.Builder {
        const schemaBuilder = lf.schema.create(name, new Date().getTime()); // FIXME: Only do this in dev

        schemaBuilder.createTable(Transaction.TABLE_NAME)
            .addColumn('id', lf.Type.INTEGER)
            .addColumn('amount', lf.Type.INTEGER)
            .addColumn('categoryId', lf.Type.INTEGER)
            .addColumn('accountId', lf.Type.INTEGER)
            .addForeignKey('fk_CategoryId', {
                local: 'categoryId',
                ref: 'categories.id',
                action: lf.ConstraintAction.RESTRICT,
                timing: lf.ConstraintTiming.DEFERRABLE
            })
            .addForeignKey('fk_AccountId', {
                local: 'accountId',
                ref: 'accounts.id',
                action: lf.ConstraintAction.RESTRICT,
                timing: lf.ConstraintTiming.DEFERRABLE
            })
            .addNullable(['amount', 'categoryId'])
            .addPrimaryKey(['id'], true);

        schemaBuilder.createTable(Category.TABLE_NAME)
            .addColumn('id', lf.Type.INTEGER)
            .addColumn('allocated', lf.Type.INTEGER)
            .addColumn('name', lf.Type.STRING)
            .addNullable(['allocated', 'name'])
            .addPrimaryKey(['id'], true);

        schemaBuilder.createTable(Account.TABLE_NAME)
            .addColumn('id', lf.Type.INTEGER)
            .addColumn('name', lf.Type.STRING)
            .addNullable(['name'])
            .addPrimaryKey(['id'], true);

        return schemaBuilder;
    }

}
