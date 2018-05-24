/**
 * Gets all the products from the db
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let productModel = requireOption(objectRepository, 'productModel');

    return function (req, res, next) {

        productModel.find({}, (err, result) => {
            if (err) {
                return next(err);
            }

            res.locals.productList = result;
            return next();
        });
    };
};