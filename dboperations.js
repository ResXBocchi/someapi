var config = require('./dbconfig');
const sql = require('mssql');

    async function getCustomers(){
        try{
            let pool = await sql.connect(config);
            let customeraddresses = await pool.request().query("SELECT TOP (1000) * FROM [SalesLT].[Customer]")
            return customeraddresses.recordsets;
        }
        catch(error){
            console.log(error);
        }
    };

    async function getCustomer(customerId){
        try{
            let pool = await sql.connect(config);
            let customeraddress = await pool.request()
            .input('input_parameter', sql.Int, customerId)
            .query("SELECT * FROM [SalesLT].[Customer] where CustomerID = @input_parameter")
            return customeraddress.recordsets;
        }
        catch(error){
            console.log(error);
        }
    };

    async function addCustomer(customer){
        try{
            let pool = await sql.connect(config);
            let insertCustomer = await pool.request()
                .input('CustomerID', sql.Int, customer.CustomerId)
                .input('FirstName', sql.NVarChar, customer.FirstName)
                .input('MiddleName', sql.NVarChar, customer.MiddleName)
                .input('LastName', sql.NVarChar, customer.LastName)
                .input('EmailAddress', sql.NVarChar, customer.EmailAddress)
                .input('Phone', sql.NVarChar, customer.Phone)
                .input('NameStyle', sql.NameStyle, customer.NameStyle)
                .input('Title', sql.NVarChar, customer.Title)
                .input('Suffix', sql.NVarChar, customer.Suffix)
                .input('CompanyName', sql.NVarChar, customer.CompanyName)
                .input('SalesPerson', sql.NVarChar, customer.SalesPerson)
                .input('PasswordHash', sql.VarChar, customer.PasswordHash)
                .input('PasswordSalt', sql.varchar, customer.PasswordSalt)
                .input('rowguid', sql.UniqueIdentifier, customer.rowguid)
                .input('ModifiedDate', sql.DateTime, customer.ModifiedDate)
                .execute('InsertCustomers');
            return insertCustomer.recordsets;
        }
        catch(err){
            console.log(err);
        }
    } 


    module.exports={
        getCustomers:getCustomers,
        getCustomer:getCustomer,
        addCustomer:addCustomer
    }