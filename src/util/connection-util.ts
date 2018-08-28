import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
    user: 'postgres',
    host: 'revature-1808.caxggqcyvxvq.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'Jbpjungin!22',
    port: 5432,

})