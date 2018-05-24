/**
 * Get a specific product from db
 */

const requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    let productModel = requireOption(objectRepository, 'productModel');

    return function (req, res, next) {

        productModel.findOne({_id: req.params.id}, (err, result) => {
            if (err) {
                return next(err);
            }

            res.locals.product = result;

            return next();
        });
    };
};