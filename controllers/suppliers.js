'use strict';

const Response = require('../config/response');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');
const logger = require('../config/log');
const supplierModel = require('../models/suppliers.model');

var now = new Date();

const SupplierController = {
    GetAllHandler : (req, res, next) => {
        logger.info("Initialized Supplier : GetAllHandler" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        global.dbo.collection('Suppliers').aggregate([
            {
                  $lookup :
                  {
                    "localField" : "ContactNameTitleId", 
                    "from" : "Titles", 
                    "foreignField" : "_id", 
                    "as" : "SuppliersTitle"
                  }
            },
            { 
                $unwind : "$SuppliersTitle"
            },
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
                    "FullAddress" : { $concat: [ "$Address", " ", "$City", " ", "$PostalCode", " ", "$Country" ] },
                    "Code" : "$Code",
                    "ContactNameTitleId" : "$ContactNameTitleId",
                    "ContactNameTitle" : "$SuppliersTitle.Name"
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
    },
    GetDetailBySupplierIDHandler : (req, res, next) => {
        logger.info("Initialized Supplier : GetAllHandler" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        let id = req.params.id;

        global.dbo.collection('Suppliers').aggregate([
            {
                $lookup :
                {
                    "localField" : "ContactNameTitleId",
                    "from" : "Titles",
                    "foreignField" : "_id",
                    "as" : "SuppliersTitle"
                }
            },
            {
                $unwind : "$SuppliersTitle"
            },
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
                    "Code" : "$Code",
                    "FullAddress" : { $concat: [ "$Address", " ", "$City", " ", "$PostalCode", " ", "$Country" ] },
                    "ContactNameTitleId" : "$ContactNameTitleId",
                    "ContactNameTitle" : "$SuppliersTitle.Name"
                }
            }
        ]).toArray((err, data) => {
            if(err)
            {
                logger.info("Supplier : GetAllHandler Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            let model = data.map((entity) => {
                return new supplierModel(entity);
            });

            logger.info("Supplier : GetAllHandler successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : model}, "Supplier : GetAllHandler content");
            Response.send(res, 200, model);
        });
    },
    GetAllHandlerSortByDescending : (req, res, next) => {
        logger.info("Initialized Supplier : GetAllHandlerSortByDescending" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        global.dbo.collection('Suppliers').aggregate([
            {
                $lookup :
                {
                    "localField" : "ContactNameTitleId",
                    "from" : "Titles",
                    "foreignField" : "_id",
                    "as" : "SuppliersTitle"
                }
            },
            {
                $unwind : "$SuppliersTitle"
            },
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
                    "Code" : "$Code",
                    "FullAddress" : { $concat: [ "$Address", " ", "$City", " ", "$PostalCode", " ", "$Country" ] },
                    "ContactNameTitleId" : "$ContactNameTitleId",
                    "ContactNameTitle" : "$SuppliersTitle.Name"
                }
            },
            {
              $sort:{"_id":-1}
            },
            { 
              $limit : 1 
            },
        ]).toArray((err, data) => {
            if(err)
            {
                logger.info("Supplier : GetAllHandlerSortByDescending Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Supplier : GetAllHandlerSortByDescending successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : data}, "Supplier : GetAllHandlerSortByDescending content");
            Response.send(res, 200, data);
        });
    }
};

module.exports = SupplierController;