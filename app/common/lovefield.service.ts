import {Observable} from "rxjs";
import * as lf from "lf";

export interface LovefieldService {
    init(database: lf.Database): void;
    observe(handler: Function): Observable<Object[]>;
    unobserve(): void;
    add(item: Object): void;
    remove(item: Object): void;
}
