import initSqlJs, { Database } from 'sql.js';

export interface ProductRecord{
    id: number; 
    name: string; 
    price: number; 
    stock: number;
}

export class AppDatabase{
    private db: Database | null = null;

    async init(): Promise<void>{
        const SQL = await initSqlJs();
        this.db = new SQL.Database();
        this.initTables();
    }

    private initTables(): void{
        if(!this.db) return;

        this.db.run(`
            CREATE TABLE products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                stock INTEGER NOT NULL
            );
        `);

        this.db.run(`
            INSERT INTO products (name, price, stock) VALUES 
                ('Sauce Labs Backpack', 29.99, 10);
        `);
    }

    getProductByName(name: string): ProductRecord | undefined{
        if(!this.db) return undefined;
        const stmt = this.db.prepare(`SELECT id, name, price, stock FROM products WHERE name = :name`);
        const result = stmt.getAsObject({ ':name': name }) as unknown as ProductRecord;
        stmt.free();
        return result.id ? result : undefined;
    }

    close(): void{
        if(this.db){
            this.db.close();
            this.db = null;
        }
    }
}