/**
 * Create a new product and save it to db
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let productModel = requireOption(objectRepository, 'productModel');

    return function (req, res, next) {

        if ((req.body.name === '') ||
            (req.body.unitPrice === '')) {
            return next();
        }

        let product = {};

        if (typeof res.locals.product !== 'undefined') {
            product = res.locals.product;
        } else {
            product = new productModel();
        }
        
        product.name = req.body.name;
        product.unitPrice = req.body.unitPrice;

        if (req.body.imageUrl === '') {
            product.imageUrl = 'https://www.2checkout.com/upload/images/graphic_product_tangible.png';
        } else {
            product.imageUrl = req.body.imageUrl;
        }

        product.save((err, result) => {
            if (err) {
                return next(err);
            }

            return next();
        });
    };
};