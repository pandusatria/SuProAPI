'use strict';

const Response = require('../config/response');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');
const logger = require('../config/log');

var now = new Date();

const ProductController = {
    GetAllHandler : (req, res, next) => {
        logger.info("Initialized Product : GetAllHandler" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        global.dbo.collection('Products').aggregate([
            {
                $lookup:
                {
                    from: 'Suppliers',
                    localField: 'SupplierID',
                    foreignField: '_id',
                    as: 'Products_Suppliers'
                }
            },
            {
                $unwind: "$Products_Suppliers"
            },
            {
                $match:
                {
                    "IsDelete": false,
                }
            },
            {
                $project:
                {
                    "_id" : "$_id", 
                    "ProductName" : "$ProductName", 
                    "SupplierID" : "$SupplierID",
                    "CategoryName" : "$CategoryName", 
                    "QuantityPerUnit" : "$QuantityPerUnit",
                    "UnitPrice" : "$UnitPrice", 
                    "UnitInStock" : "$UnitInStock", 
                    "IsDelete" : "$IsDelete",
                    "CreatedDate" : "$CreatedDate",
                    "CreatedBy" : "$CreatedBy",
                    "UpdateDate" : "$UpdateDate",
                    "UpdateBy" : "$UpdateBy",
                    "SupplierName" : "$Products_Suppliers.CompanyName"
                }
            }
        ]).toArray((err, data) => {
            if(err)
            {
                logger.info("Product : GetAllHandler Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Product : GetAllHandler successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : data}, "Product : GetAllHandler content");
            Response.send(res, 200, data);
        });
    },
    GetAllBySupplierIDHandler : (req, res, next) => {
        logger.info("Initialized Product : GetAllBySupplierIDHandler" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        let id = req.params.id;

        global.dbo.collection('Products').aggregate([
            {
                $lookup:
                {
                    from: 'Suppliers',
                    localField: 'SupplierID',
                    foreignField: '_id',
                    as: 'Products_Suppliers'
                }
            },
            {
                $unwind: "$Products_Suppliers"
            },
            {
                $match:
                {
                    "IsDelete": false,
                    "SupplierID" : ObjectID(id)
                }
            },
            {
                $project:
                {
                    "_id" : "$_id", 
                    "ProductName" : "$ProductName", 
                    "SupplierID" : "$SupplierID",
                    "CategoryName" : "$CategoryName", 
                    "QuantityPerUnit" : "$QuantityPerUnit",
                    "UnitPrice" : "$UnitPrice", 
                    "UnitInStock" : "$UnitInStock", 
                    "IsDelete" : "$IsDelete",
                    "CreatedDate" : "$CreatedDate",
                    "CreatedBy" : "$CreatedBy",
                    "UpdateDate" : "$UpdateDate",
                    "UpdateBy" : "$UpdateBy",
                    "SupplierName" : "$Products_Suppliers.CompanyName"
                }
            }
        ]).toArray((err, data) => {
            if(err)
            {
                logger.info("Product : GetAllBySupplierIDHandler Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Product : GetAllBySupplierIDHandler successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : data}, "Product : GetAllBySupplierIDHandler content");
            Response.send(res, 200, data);
        });
    }
};

module.exports = ProductController;