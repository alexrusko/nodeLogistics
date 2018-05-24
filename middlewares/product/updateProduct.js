/**
 * Updates the product and save it to db
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let productModel = requireOption(objectRepository, 'productModel');

    return function (req, res, next) {

        if (typeof res.locals.product === 'undefined') {
            return next();
        }

        res.locals.product.name = req.body.name;
        res.locals.product.unitPrice = req.body.unitPrice;

        if (req.body.imageUrl === '') {
            res.locals.product.imageUrl = 'https://www.2checkout.com/upload/images/graphic_product_tangible.png';
        } else {
            res.locals.product.imageUrl = req.body.imageUrl;
        }

        res.locals.product.save((err) => {
            if (err) {
                return next(err);
            }

            return next();
        });
    };
};