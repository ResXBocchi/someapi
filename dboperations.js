var config = require('./dbconfig');
const sql = require('mssql');
const { request } = require('express');

    async function getInventory(){
        try{
            let pool = await sql.connect(config);
            let inventory = await pool.request().query("SELECT TOP (1000) * FROM Inventory")
            return inventory.recordsets;
        }
        catch(error){
            console.log(error);
        }
    };

    async function getItem(id){
        try{
            let pool = await sql.connect(config);
            let item = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * FROM Inventory where ID = @input_parameter")
            return item.recordsets;
        }
        catch(error){
            console.log(error);
        }
    };

    async function delItem(id){
        try{
            let pool = await sql.connect(config);
            let item = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("DELETE Inventory where ID = @input_parameter")
            return item.recordsets;
        }
        catch(error){
            console.log(error);
        }
    };

    async function addItem(item){
        try{
            let pool = await sql.connect(config);
            let insertItem = await pool.request()
                .input('name', sql.NVarChar, item.name)
                .input('quantity', sql.Int, item.quantity)
                .query('INSERT INTO Inventory (name,quantity) VALUES (@name,@quantity)');
                return insertItem.recordsets;
        }
        catch(err){
            console.log(err);
        }

    } 


    module.exports={
        getInventory:getInventory,
        getItem:getItem,
        addItem:addItem,
        delItem:delItem
    }