export interface TableService {
    init(database: lf.Database): void;
    observe(handler: Function): Promise<Object[]>;
    unobserve(): void;
    add(item: Object): void;
    remove(item: Object): void;
}