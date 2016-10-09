import * as lf from 'lovefield';

export interface QueryState {
    query: lf.query.Select;
    handler: Function;
}
