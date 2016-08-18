import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DatabaseService} from "../common/database.service";
import {Transaction} from "./transaction.model";
import {Category} from "../category/category.model";
import {Account} from "../account/account.model";
import * as lf from "lf";

@Injectable()
export class TransactionService {
    private database: lf.Database;
    private table: lf.schema.Table;
    private categoryTable: lf.schema.Table;
    private accountTable: lf.schema.Table;
    private queries: lf.query.Select[] = [];
    private handler: Function;

    constructor(private databaseService: DatabaseService) {
    }

    init(database: lf.Database) {
        this.database = database;
        this.table = database.getSchema().table(Transaction.TABLE_NAME);
        this.categoryTable = database.getSchema().table(Category.TABLE_NAME);
        this.accountTable = database.getSchema().table(Account.TABLE_NAME);
    }

    /**
     * Configures a handler function to observe changes to the database and
     * immediately returns an Observable containing a JSON array of Transactions.
     *
     * @handler Function to be called when changes are observed
     * @args Optional id or accountId
     * @return Observable containing a JSON array of Transactions
     */
    observe(handler: Function, ...args): Observable<Object[]> {
        const query = this.database
            .select()
            .from(this.table)
            .leftOuterJoin(this.categoryTable, this.categoryTable['id'].eq(this.table['categoryId']))
            .leftOuterJoin(this.accountTable, this.accountTable['id'].eq(this.table['accountId']));

        if (args['id']) {
            query.where(this.table['id'].eq(args['id']));
        }

        if (args['accountId']) {
            query.where(this.table['accountId'].eq(args['accountId']));
        }

        this.handler = handler;
        this.database.observe(query, this.handler);
        this.queries.push(query);

        return Observable.fromPromise(query.exec());
    }

    unobserve(): void {
        for (const [index, query] of this.queries.entries()) {
            this.database.unobserve(query, this.handler);
            this.queries.splice(index, 1);
        }
    }

    add(transaction: Transaction): Observable<Object[]> {
        const query = this.database
            .insert()
            .into(this.table)
            .values([this.table.createRow(transaction.toRow())]);

        return Observable.fromPromise(query.exec());
    }

    remove(transaction: Transaction): Observable<Object[]> {
        const query = this.database
            .delete()
            .from(this.table)
            .where(this.table['id'].eq(transaction.id));

        return Observable.fromPromise(query.exec());
    }
}
