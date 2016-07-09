import { Injectable } from '@angular/core';
import { DatabaseService } from '../common/database.service';
import { TableService } from '../common/table.service';
import { Transaction } from './transaction.model';
import { Category } from '../category/category.model';
import * as lf from 'lf';

@Injectable()
export class TransactionService implements TableService {
    private database: lf.Database;
    private table: lf.schema.Table;
    private categoryTable: lf.schema.Table;
    private query: lf.query.Select;
    private handler: Function;

    constructor() { }

    init(database: lf.Database) {
        this.database = database;
        this.table = database.getSchema().table(Transaction.TABLE_NAME);
        this.categoryTable = database.getSchema().table(Category.TABLE_NAME);
    }

    /**
     * Configures a handler function to observe changes to the database and
     * immediately returns a promise containing an array of Transactions.
     * 
     * @handler Function to be called when changes are observed
     * @return Promise containing an array of Transaction JSON
     */
    observe(handler): Promise<Object[]> {
        this.query = this.database
            .select()
            .from(this.table)
            .leftOuterJoin(this.categoryTable, this.categoryTable['id'].eq(this.table['categoryId']))
        this.handler = handler;
        this.database.observe(this.query, this.handler);

        return this.query.exec();
    }
    
    unobserve() {
        this.database.unobserve(this.query, this.handler);
    }

    add(transaction: Transaction): void {
        this.database
            .insert()
            .into(this.table)
            .values([this.table.createRow(transaction.toRow())])
            .exec()
            .catch((reason) => {
                console.error(reason.message);
            })
    }

    remove(transaction: Transaction): void {
        this.database
            .delete()
            .from(this.table)
            .where(this.table['id'].eq(transaction.id))
            .exec();
    }
}
