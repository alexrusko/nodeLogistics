/**
 * Delete product from db
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let productModel = requireOption(objectRepository, 'productModel');

    return function (req, res, next) {

        if (typeof res.locals.product === 'undefined') {
            return next();
        }

        res.locals.product.remove((err) => {
            if (err) {
                return next(err);
            }

            console.log('removed from db:' + res.locals.product);
            return next();
        });
    };
};