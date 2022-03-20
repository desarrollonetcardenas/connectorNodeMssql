const {mssqlConnector} = require('./repository/mssqlv2');

const connector = mssqlConnector();
connector.exec('select * from myDatabase2;')