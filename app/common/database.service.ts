import { Injectable } from '@angular/core';
import * as lf from 'lf';
import { Transaction } from '../transaction/transaction.model';
import { Category } from '../category/category.model';
import { Account } from '../account/account.model';

@Injectable()
export class DatabaseService {
    private database: lf.Database;
    private schemaBuilder: lf.schema.Builder;
    private options: lf.schema.ConnectOptions = {
        storeType: lf.schema.DataStoreType.INDEXED_DB
    };

    constructor() {
        this.schemaBuilder = lf.schema.create('b4a', 4);

        this.schemaBuilder.createTable(Transaction.TABLE_NAME)
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

        this.schemaBuilder.createTable(Category.TABLE_NAME)
            .addColumn('id', lf.Type.INTEGER)
            .addColumn('allocated', lf.Type.INTEGER)
            .addColumn('name', lf.Type.STRING)
            .addNullable(['allocated', 'name'])
            .addPrimaryKey(['id'], true)

        this.schemaBuilder.createTable(Account.TABLE_NAME)
            .addColumn('id', lf.Type.INTEGER)
            .addColumn('name', lf.Type.STRING)
            .addNullable(['name'])
            .addPrimaryKey(['id'], true)

        this.schemaBuilder.connect(this.options)
            .then((database: lf.Database) => {
                console.log('Database connected');
                this.database = database;
            }).catch((reason) => {
                console.error(reason);
            })
    }

    connect(): Promise<lf.Database> {
        if (!this.database) {
            return this.schemaBuilder.connect(this.options)
        }

        return new Promise((resolve, reject) => {
            resolve(this.database);
        })
    }
}
