require('dotenv').config();

const {
    execQueryRaw,
    execProcedure } = require('./db/mssql.dataservice')

/**
 * Execute a raw sql query
 */
const query = async () => {
    const query = 'SELECT * FROM dbo.cat_areas;';
    const result = await execQueryRaw(query);

    console.log(result);
}
/**
 * Execute a stored procedure. Parameters are optionally
 */
const procedureWithParameters = async () => {
    const sql = require('mssql');

    const paramsArray = [
        {
            name: 'area_id',
            dbType: sql.Int,
            value: 1
        },
        {
            name: 'rows_count',
            dbType: sql.Int,
            output: true
        }
    ];

    try {

        const result = await execProcedure('getAreaById', paramsArray);
        console.log(result);
        
    } catch (error) {
        console.error( error );   
    }

}

/**
 * Execute a stored procedure. Parameters are optionally
 */
const procedure = async () => {
    try {
        const result = await execProcedure('getAllAreas');

        console.log(result);
    } catch (error) {
        console.error(error);
    }

}

// query();
procedureWithParameters();
procedure();