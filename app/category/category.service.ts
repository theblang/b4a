import { Injectable } from '@angular/core';
import { DatabaseService } from '../common/database.service';
import { LovefieldService } from '../common/lovefield.service';
import { Category } from '../category/category.model';
import * as lf from 'lf';

@Injectable()
export class CategoryService {
    private database: lf.Database;
    private table: lf.schema.Table;
    private query: lf.query.Select;
    private handler: Function;

    constructor() { }

    init(database: lf.Database) {
        this.database = database;
        this.table = database.getSchema().table(Category.TABLE_NAME);
    }

    observe(handler): Promise<Object[]> {
        this.query = this.database
            .select()
            .from(this.table)
        this.handler = handler;
        this.database.observe(this.query, this.handler);

        return this.query.exec();
    }

    unobserve() {
        this.database.unobserve(this.query, this.handler);
    }

    add(category: Category): void {
        this.database
            .insert()
            .into(this.table)
            .values([this.table.createRow(category.toRow())])
            .exec()
            .catch((reason) => {
                console.error(reason.message);
            })
    }

    remove(category: Category): Promise<Object[]> {
        return this.database
            .delete()
            .from(this.table)
            .where(this.table['id'].eq(category.id))
            .exec();
    }
}
