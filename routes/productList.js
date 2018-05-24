let renderMW = require('../middlewares/generic/render');
let getProductListMW = require('../middlewares/product/getProductList');
let createOrUpdateProductMW = require('../middlewares/product/createOrUpdateProduct');
let deleteProductMW = require('../middlewares/product/deleteProduct');
let updateProductMW = require('../middlewares/product/updateProduct');
let getProductMW = require('../middlewares/product/getProduct');

let productModel = require('../models/Product');

module.exports = function (app) {

    let objectRepository = {
        productModel: productModel
    };

    /**
     * Render the form
     */
    app.get('/products/add',
        renderMW(objectRepository, 'newProduct')
    );

    /**
     * Add new product and save to db
     */
    app.post('/products/add',
        createOrUpdateProductMW(objectRepository),
        function(req, res, next) {
            res.redirect('/products'); 
        }
    );

    /**
     * Render the form and pre-fill with data
     */
    app.get('/products/:id/edit',
        getProductMW(objectRepository),
        renderMW(objectRepository, 'newProduct')
    );

    /**
     * Update the product and save to db
     */
    app.post('/products/:id/edit',
        getProductMW(objectRepository),
        createOrUpdateProductMW(objectRepository),
        function(req, res, next) {
            res.redirect('/products'); 
        }
    );

    /**
     * Delete product
     */
    app.get('/products/:id/delete',
        getProductMW(objectRepository),
        deleteProductMW(objectRepository),
        function(req, res, next) {
            res.redirect('/products'); 
        }
    );

    /**
     * List all products
     */
    app.get('/products',
        getProductListMW(objectRepository),
        renderMW(objectRepository, 'products')
    );
};