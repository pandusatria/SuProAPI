'use strict';

const Response = require('../config/response');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');
const logger = require('../config/log');
const supplierModel = require('../models/suppliers.model');
const productModel = require('../models/products.model');

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
                    "CreatedDate" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$CreatedDate" } },
                    "CreatedBy" : "$CreatedBy",
                    "UpdateDate" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$UpdateDate" } },
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
    GetAllHandlerSearch : (req, res, next) => {
        logger.info("Initialized Supplier : GetAllHandlerSearch" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        let search = req.body;
        console.log("Request");
        console.log(search.filter);

        var myMatch = {};
        for (var i = 0; i < search.filter.length; i++) 
        {
            myMatch[search.filter[i].id] = search.filter[i].value;
        }

        console.log("My Match : ");
        console.log(myMatch);


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
                    "CreatedDate" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$CreatedDate" } },
                    "CreatedBy" : "$CreatedBy",
                    "UpdateDate" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$UpdateDate" } },
                    "UpdateBy" : "$UpdateBy",
                    "FullAddress" : { $concat: [ "$Address", " ", "$City", " ", "$PostalCode", " ", "$Country" ] },
                    "Code" : "$Code",
                    "ContactNameTitleId" : "$ContactNameTitleId",
                    "ContactNameTitle" : "$SuppliersTitle.Name"
                }
            },
            {
                $match: {
                    $and:
                    [
                        myMatch
                    ]
                }
            }
        ]).toArray((err, data) => {
            if(err)
            {
                logger.info("Supplier : GetAllHandlerSearch Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Supplier : GetAllHandlerSearch successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : data}, "Supplier : GetAllHandlerSearch content");
            Response.send(res, 200, data);
        });
    },
    GetDetailBySupplierIDHandler : (req, res, next) => {
        logger.info("Initialized Supplier : GetDetailBySupplierIDHandler" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
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
                    "IsDelete": false,
                    "_id" : ObjectID(id)
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
                    "CreatedDate" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$CreatedDate" } },
                    "CreatedBy" : "$CreatedBy",
                    "UpdateDate" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$UpdateDate" } },
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
                logger.info("Supplier : GetDetailBySupplierIDHandler Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Supplier : GetDetailBySupplierIDHandler successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : data}, "Supplier : GetDetailBySupplierIDHandler content");
            Response.send(res, 200, data);
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
                    "CreatedDate" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$CreatedDate" } },
                    "CreatedBy" : "$CreatedBy",
                    "UpdateDate" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$UpdateDate" } },
                    "UpdateBy" : "$UpdateBy",
                    "FullAddress" : { $concat: [ "$Address", " ", "$City", " ", "$PostalCode", " ", "$Country" ] },
                    "Code" : "$Code",
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
    },
    GetListContactTitleName : (req, res, next) => {
        logger.info("Initialized Supplier : GetListContactTitleName" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        global.dbo.collection('Titles').aggregate([]).toArray((err, data) => {
            if(err)
            {
                logger.info("Supplier : GetListContactTitleName Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Supplier : GetListContactTitleName successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : data}, "Supplier : GetListContactTitleName content");
            Response.send(res, 200, data);
        });
    },
    GetProductBySupplierID : (req, res, next) => {
        logger.info("Initialized Supplier : GetProductBySupplierID" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        let id = req.params.id;

        global.dbo.collection('Suppliers').aggregate([
            {
                $lookup:
                {
                    from: 'Products',
                    localField: '_id',
                    foreignField: 'SupplierID',
                    as: 'Suppliers_Products'
                }
            },
            {
                $match:
                {
                    "IsDelete": false,
                    "_id" : ObjectID(id)
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
                    "CreatedDate" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$CreatedDate" } },
                    "CreatedBy" : "$CreatedBy",
                    "UpdateDate" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$UpdateDate" } },
                    "UpdateBy" : "$UpdateBy",
                    "FullAddress" : { $concat: [ "$Address", " ", "$City", " ", "$PostalCode", " ", "$Country" ] },
                    "Code" : "$Code",
                    "ContactNameTitleId" : "$ContactNameTitleId",
                    "DetailProduct" : "$Suppliers_Products"
                }
            }
        ]).toArray((err, data) => {
            if(err)
            {
                logger.info("Supplier : GetProductBySupplierID Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Supplier : GetProductBySupplierID successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({data : data}, "Supplier : GetProductBySupplierID content");
            Response.send(res, 200, data);
        });
    },
    CreateNewSupplierHandler : (req, res, next) => {
        let reqdata = req.body;
        var data = {};

        data.CompanyName = reqdata.CompanyName;
        data.ContactName = reqdata.ContactName;
        data.ContactEmail = reqdata.ContactEmail;
        data.ContactTitle = reqdata.ContactTitle;
        data.Address = reqdata.Address;
        data.City = reqdata.City;
        data.PostalCode = reqdata.PostalCode;
        data.Country = reqdata.Country;
        data.Phone = reqdata.Phone;
        data.Fax = reqdata.Fax;
        data.Code = reqdata.Code;
        data.ContactNameTitleId = ObjectID(reqdata.ContactNameTitleId);

        data.CreatedDate = now;
        data.CreatedBy = global.user.UserName;
        data.UpdateDate = null;
        data.UpdateBy = null;
        data.IsDelete = false;

        var model = new supplierModel(data);

        console.log("Data : ");
        console.log(data);

        console.log("Model : ");
        console.log(model);

        global.dbo.collection('Suppliers').insertOne(model, function(err, data){
            if(err)
            {
                return next(new Error());
            }

            Response.send(res, 200, data);
        });
    },
    EditSupplierProductHandler : (req, res, next) => {
        let id = req.params.id;
        let reqdata = req.body;
        var updatemodel = {};
        var ListProduct = [];
        var oldmodel = {};

        console.log("ID Supplier : ");
        console.log(id);

        ListProduct = reqdata.DetailProduct;

        console.log("List Product : ");
        console.log(ListProduct);

        global.dbo.collection('Suppliers').find({IsDelete : false, '_id' : ObjectID(id)}).toArray((err, data) => {
            if(err)
            {
                return next(new Error());
            }

            oldmodel = data.map((entity) => {
                return new supplierModel(entity);
            });

            console.log("Old Model : ");
            console.log(oldmodel);

            updatemodel._id = ObjectID(id);

            updatemodel.CompanyName = reqdata.CompanyName;
            updatemodel.ContactName = reqdata.ContactName;
            updatemodel.ContactEmail = reqdata.ContactEmail;
            updatemodel.ContactTitle = reqdata.ContactTitle;
            updatemodel.Address = reqdata.Address;
            updatemodel.City = reqdata.City;
            updatemodel.PostalCode = reqdata.PostalCode;
            updatemodel.Country = reqdata.Country;
            updatemodel.Phone = reqdata.Phone;
            updatemodel.Fax = reqdata.Fax;
            updatemodel.Code = reqdata.Code;
            updatemodel.ContactNameTitleId = ObjectID(reqdata.ContactNameTitleId);

            updatemodel.CreatedDate = oldmodel[0].CreatedDate;
            updatemodel.CreatedBy = oldmodel[0].CreatedBy;
            updatemodel.UpdateDate = now;
            updatemodel.UpdateBy =  global.user.UserName;
            updatemodel.IsDelete = false;

            console.log("Update Model : ");
            console.log(updatemodel);

            var model = new supplierModel(updatemodel);

            console.log("Model : ");
            console.log(model);

            // First Update Supplier
            console.log("First : Update Supplier");
            global.dbo.collection('Suppliers').findOneAndUpdate
            (
                {'_id' : ObjectID(id)},
                {$set: model},
                function(err, data){
                    if(err)
                    {
                        return next(new Error());
                    }

                    // Second Delete Detail Product By Supplier ID
                    console.log("Second : Delete Detail Product By Supplier ID");
                    global.dbo.collection('Products').deleteMany
                    (
                        {'SupplierID' : ObjectID(id)},
                        function(err, data){
                            if(err)
                            {
                                return next(new Error());
                            }

                            // Third Insert All Product from List Product
                            var ListProductModel = [];

                            console.log("List Product to Mapping");
                            console.log(ListProduct);

                            for (var counter=0; counter < ListProduct.length; counter++){
                                    var modelInsert = {};

                                    modelInsert.ProductName     =   ListProduct[counter].ProductName;
                                    modelInsert.SupplierID      =   ObjectID(id);
                                    modelInsert.CategoryName    =   ListProduct[counter].CategoryName;
                                    modelInsert.QuantityPerUnit =   ListProduct[counter].QuantityPerUnit;
                                    modelInsert.UnitPrice       =   ListProduct[counter].UnitPrice;
                                    modelInsert.UnitInStock     =   ListProduct[counter].UnitInStock;

                                    modelInsert.IsDelete        =   false;
                                    modelInsert.CreatedDate     =   now;
                                    modelInsert.CreatedBy       =   global.user.UserName;
                                    modelInsert.UpdateDate      =   null;
                                    modelInsert.UpdateBy        =   null;

                                    var model = new productModel(modelInsert);
                                    ListProductModel.push(model);
                            }

                            console.log("List Model to Add in Database");
                            console.log(ListProductModel);

                            global.dbo.collection('Products').insertMany(ListProductModel, function(err, data){
                                if(err)
                                {
                                    return next(new Error());
                                }

                                Response.send(res, 200, data);
                            });
                        }
                    );
                }
            );
        });
    }
};

module.exports = SupplierController;