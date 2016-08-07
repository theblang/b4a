import * as lf from 'lf';

export interface QueryState {
    query: lf.query.Select,
    handler: Function
}
