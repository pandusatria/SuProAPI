'use strict';

const Middleware = require('../middleware/tokenauthorization');
const corsMiddleware = require('restify-cors-middleware');
const moment = require('moment');
const logger = require('../config/log');

const UserController = require('../controllers/user');
const SupplierController = require('../controllers/suppliers');
const ProductController = require('../controllers/products');

module.exports = exports = function(server){

    logger.info("Initializing Route Path" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

    var cors = corsMiddleware({
        origins : ['*'],
        allowHeaders : ['suproapptoken']
    });

    server.pre(cors.preflight);

    logger.info("Restify Cors Middleware already set" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
    logger.info("Route already accessed" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

    // User
    server.post('/api/user/login', UserController.LoginHandler);
    server.get('/api/user/logout', Middleware.checkToken, UserController.LogoutHandler);

    // Supplier
    server.get('/api/supplier/', Middleware.checkToken, SupplierController.GetAllHandler);
    server.get('/api/supplier/:id', Middleware.checkToken, SupplierController.GetDetailBySupplierIDHandler);
    server.get('/api/supplier/orderdesc', Middleware.checkToken, SupplierController.GetAllHandlerSortByDescending);
    server.get('/api/supplier/gettitle', Middleware.checkToken, SupplierController.GetListContactTitleName);
    server.post('/api/supplier/search', Middleware.checkToken, SupplierController.GetAllHandlerSearch);
    server.get('/api/supplier/getsupplierproduct/:id', Middleware.checkToken, SupplierController.GetProductBySupplierID);

    server.post('/api/supplier/', Middleware.checkToken, SupplierController.CreateNewSupplierHandler);
    server.put('/api/supplier/:id', Middleware.checkToken, SupplierController.EditSupplierProductHandler);

    // Product
    server.get('/api/product/', Middleware.checkToken, ProductController.GetAllHandler);
    server.get('/api/product/bysupplier/:id', Middleware.checkToken, ProductController.GetAllBySupplierIDHandler);
};