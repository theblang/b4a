import { Observable } from 'rxjs';

export interface LovefieldService {
    init(database: lf.Database): void;
    observe(handler: Function): Observable<Object[]>;
    unobserve(): void;
    add(item: Object): void;
    remove(item: Object): void;
}
