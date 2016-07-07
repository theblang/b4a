import { Injectable } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Transaction } from './transaction.model';
import { Category } from '../category/category.model';
import * as lf from 'lf';

@Injectable()
export class TransactionService {
    private database: lf.Database;
    private table: lf.schema.Table;
    private query: lf.query.Select;
    private handler: Function;

    constructor() { }

    init(database: lf.Database) {
        this.database = database;
        this.table = database.getSchema().table(Transaction.TABLE_NAME);
    }

    /**
     * Configures a handler function to observe changes to the database and
     * immediately returns a promise containing an array of Transactions.
     * 
     * @handler Function to be called when changes are observed
     * @return Promise containing an array of Transaction Json
     */
    observeTransactions(handler): Promise<Object[]> {
        this.query = this.database
            .select()
            .from(this.table)
        this.handler = handler;
        this.database.observe(this.query, this.handler);

        return this.query.exec();
    }

    /**
     * Stop observing changes to the database
     */
    unobserveTransactions() {
        this.database.unobserve(this.query, this.handler);
    }

    addTransaction(transaction: Transaction): void {
        console.log(transaction.toJson());

        this.database
            .insert()
            .into(this.table)
            .values([this.table.createRow(transaction.toJson())])
            .exec()
            .catch((reason) => {
                console.error(reason.message);
            })
    }

    removeTransaction(transaction: Transaction): void {
        this.database
            .delete()
            .from(this.table)
            .where(this.table['id'].eq(transaction.id))
            .exec();
    }
}