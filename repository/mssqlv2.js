'use strict';
require('dotenv').config({path: '../config/.env'});
const sql  = require('mssql');

const config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: `${process.env.MSSQL_HOST}`,
    database: process.env.MSSQL_DATABASE,
    port: parseInt(process.env.MSSQL_PORT),
    pool: {
        max: parseInt(process.env.MSSQL_MAX_POOL_CONNECTIONS), /**The maximum number of connections there can be in the pool (default: 10)*/
        min: parseInt(process.env.MSSQL_MIN_POOL_CONNECTIONS),  /**The minimum number of connections there can be in the pool (default: 0) */
        idleTimeoutMillis: 30000    /**The number of milliseconds before closing an unused connection (default: 30000) */
    }
}
const pool = new sql.ConnectionPool(config);

if (!pool.connected)
    throw 'Error no se pudo establecer conexion';

module.exports.mssqlConnector = () => {

    return {
        exec: async function(query){
            const request = pool.request();

            const rows = await request.query(query);

            if (pool.connected)
                pool.close();
                
            return rows;
        },
        execWithParams: function(procedure, params){
            console.log('Execution with params');
        }
    }
}