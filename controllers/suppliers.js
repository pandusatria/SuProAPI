'use strict';

const Response = require('../config/response');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');
const logger = require('../config/log');

var now = new Date();

const SupplierController = {
    GetAllHandler : (req, res, next) => {
        logger.info("Initialized Supplier : GetAllHandler" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        global.dbo.collection('Suppliers').aggregate([
            {
                $match:
                {
                    "IsDelete": false
                }
            },
            {
                $project:
                {
                    "_id" : "$_id",
                    "CompanyName" : "$CompanyName",
                    "ContactName" : "$ContactName",
                    "ContactEmail" : "$ContactEmail",
                    "ContactTitle" : "$ContactTitle",
                    "Address" : "$Address",
                    "City" : "$City",
                    "PostalCode" : "$PostalCode",
                    "Country" : "$Country",
                    "Phone" : "$Phone",
                    "Fax" : "$Fax",
                    "IsDelete" : "$IsDelete",
                    "CreatedDate" : "$CreatedDate",
                    "CreatedBy" : "$CreatedBy",
                    "UpdateDate" : "$UpdateDate",
                    "UpdateBy" : "$UpdateBy",
                    "FullAddress" : { $concat: [ "$Address", " ", "$City", " ", "$PostalCode", " ", "$Country" ] }
                }
            }
        ]).toArray((err, data) => {
            if(err)
            {
                logger.info("Supplier : GetAllHandler Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Supplier : GetAllHandler successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : data}, "Supplier : GetAllHandler content");
            Response.send(res, 200, data);
        });
    }
};

module.exports = SupplierController;