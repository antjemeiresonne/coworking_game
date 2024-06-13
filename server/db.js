import * as mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Azerty123',
    database: 'kitchenquest'
})