'use strict';

const sql  = require('mssql');

/**
 * MSSQL Configuration connection
 */
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

/**
 * Recommended: Open a single connection pool by application. The subsequents opened
 * connections are iddle managed inside the pool. 
 * 
 * Built-in healt check connection are performed.
 */
const pool = new sql.ConnectionPool(config, function(err){
    throw new Error(err);
});

/**
 * 
 * @param {string} queryRaw The sql query sentence to be executed
 * @results Array
 */
module.exports.execQueryRaw = async (queryRaw) => {
    pool.connect(err => err);

    console.log('connected..');
}

/**
 * Execute a MSSQL stored procedure using parameters
 * 
 * @name execProcedure
 * @param {string} procedureName The name to be executed
 * @param {Array} paramsArray 
 * @param {string} paramsArray.name Stored procedure parameter name
 * @param {sql.dbType} paramsArray.dbType Stored procedure parameter Database Type. Obtained from npm 'mssql'
 * @param {any} paramsArray.value Stored procedure parameter value
 * @param {boolean} paramsArray.output If supplied, the parameter is considered as an output
 * 
 * @returns Promise {recordset: Array(n), output: Object }
 */
// const execProcedure = async (procedureName, paramsArray = []) => {
//     await poolConnect();  /**Ensures the iddle connection is opened */
//     const request = pool.request();

//     try {
//         /**
//          * Determines if the output field was supplied, then
//          * the parameter configuration is established, otherwise, the field
//          * is considered as an input parameter.
//          */
//         if (paramsArray.length > 0) {

//             paramsArray.forEach(e => {
//                 if (typeof e.output === "boolean" || e.output)
//                 request.output(e.name, e.dbType, e.value || null);
//                 else
//                 request.input( e.name, e.dbType, e.value );
//             });

//         }
        
//         const result = await request.execute(procedureName);

//         return {recordset: result.recordset, output: result.output};

//     } catch (error) {
//         throw new Error( error );
//     } finally {
//         if (request)
//             request.cancel();
//     }
// }

// module.exports.execQueryRaw = execQueryRaw;
// module.exports.execProcedure = execProcedure;

